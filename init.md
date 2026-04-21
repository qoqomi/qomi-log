# 링크 아카이빙 에이전트 시스템 설계서 v4

> Claude Code 구현 참조용 계획서  
> 작성일: 2026-04-21  
> v4 변경: 상시 서버 제거 → GitHub Actions 스케줄 폴링 방식으로 전환

---

## 0. 구조 결정 및 근거

### 실행 방식: GitHub Actions 스케줄 폴링

상시 실행 서버 불필요. GitHub Actions가 5분마다 깨어나 텔레그램 메시지를 확인하고, 새 메시지가 있으면 처리 후 종료.

```
[GitHub Actions - 5분마다 스케줄 실행]
    │
    ├── 텔레그램 폴링 (새 메시지 확인)
    │   ├── 없으면 → 즉시 종료
    │   └── 있으면 → 처리 시작
    │
    ├── 콘텐츠 수집 + AI 처리 + Supabase 저장
    │
    └── 텔레그램으로 완료 응답 후 종료
```

| 항목 | 내용 |
|------|------|
| 실행 주기 | 5분마다 (cron: `*/5 * * * *`) |
| 응답 지연 | 최대 5분 |
| 비용 | 완전 무료 (GitHub 무료 플랜 2,000분/월, 실제 소모 약 900분/월) |
| 서버 | 불필요 |

### Gatsby → Next.js 전환 (유지)

Pages Router로 통일. Emotion SSR 설정 호환. 기존 마크다운 콘텐츠 그대로 이전.

---

## 1. 작업 컨텍스트

### 시스템 전체 구성

```
[텔레그램]
    │  URL 전송 (메시지 큐에 쌓임)
    │
[GitHub Actions - 5분마다]
    │  폴링 → 처리 → Supabase 저장 → 텔레그램 응답
    ▼
[Supabase PostgreSQL]
    │  데이터 읽기
    ▼
[Next.js 블로그 - Vercel]
    ├── /blog      기존 마크다운 블로그
    └── /archive   아카이빙 탭 (신규)
```

### 입출력 정의

| 구분 | 내용 |
|------|------|
| **입력** | 텔레그램 메시지 (아티클 URL 또는 YouTube URL) |
| **출력** | Supabase DB 저장 아이템 + `/archive` 탭 표시 + 텔레그램 완료 응답 |

### 콘텐츠 타입 분류

| 타입 | 판별 기준 | 수집 방식 |
|------|----------|----------|
| `youtube` | `youtube.com` / `youtu.be` 도메인 | YouTube Data API v3 + `youtube-transcript` (npm) |
| `article` | 그 외 모든 URL | Cheerio + mozilla/readability (폴백: Playwright) |

### 주요 제약조건

- 응답 지연 최대 5분 (GitHub Actions 스케줄 간격)
- Playwright 폴백 사용 시 Actions 실행 시간 증가 가능 → 타임아웃 설정 필요
- GitHub Actions runner는 에페머럴 환경 → 파일 기반 상태 관리 불가 (인메모리)
- 텔레그램 `getUpdates` 폴링 시 `offset` 관리 필요 (이미 처리한 메시지 재처리 방지)

### 용어 정의

| 용어 | 정의 |
|------|------|
| **아이템** | 아카이빙된 URL 1건 (DB 레코드 단위) |
| **큐** | `Later` / `Shortlist` / `Archive` 세 가지 상태 |
| **Later** | 기본값. 나중에 읽을 것 |
| **Shortlist** | 중요하게 보관할 것 |
| **Archive** | 읽고 처리 완료된 것 |
| **태그** | AI가 추출한 토픽 키워드 |
| **메모** | 사용자가 직접 입력하는 개인 노트 |
| **offset** | 텔레그램 폴링에서 마지막으로 처리한 update_id. 중복 처리 방지용 |

---

## 2. 워크플로우 정의

### 전체 흐름도

```
[GitHub Actions 스케줄 실행 (5분마다)]
        │
        ▼
[① 텔레그램 폴링]
  getUpdates(offset) 호출
        │
        ├── 새 메시지 없음 → 종료
        │
        └── 새 메시지 있음
                │
                ▼
        [② URL 유효성 검사]  ──실패──▶ [텔레그램 에러 응답]
                │ 성공
                ▼
        [③ 중복 URL 확인]  ──중복──▶ [텔레그램 "이미 저장된 링크" 안내]
                │ 신규
                ▼
        [④ 콘텐츠 타입 판별]
                │
           ┌────┴────┐
           │         │
        youtube    article
           │         │
           ▼         ▼
        [⑤-A       [⑤-B
        YouTube     Cheerio +
        메타데이터]  본문 추출]
           │         │ 실패
           │         ▼
           │    [⑤-B' Playwright 폴백]
           │         │
           └────┬────┘
                │
                ▼
        [⑥ AI 처리: 제목 정제 + 요약 + 태그]
                │
                ▼
        [⑦ 스키마 검증]  ──실패(최대 2회)──▶ [스킵 + 로그]
                │ 성공
                ▼
        [⑧ Supabase DB 저장 (queue: Later)]
                │
                ▼
        [⑨ 텔레그램 완료 응답]
                │
                ▼
        [offset 업데이트 → 종료]
```

### offset 관리 방식

텔레그램 `getUpdates`는 offset 없이 호출하면 이미 처리한 메시지를 반복 반환함.  
마지막 처리한 `update_id + 1`을 다음 호출의 offset으로 전달해야 중복 처리 방지.

**저장 위치**: Supabase `agent_state` 테이블 (key-value)

```
agent_state 테이블
  key: "telegram_offset"
  value: "12345678"  ← 마지막 처리한 update_id + 1
```

Actions 실행 시작 → offset 조회 → 폴링 → 처리 → offset 업데이트 → 종료

### 단계별 상세 정의

#### ① 텔레그램 폴링
- **처리 주체**: 스크립트
- **내용**: `getUpdates(offset)` 호출, 새 메시지 파싱
- **성공 기준**: API 응답 정상
- **실패 시**: Actions 로그에 기록 후 종료

#### ② URL 유효성 검사
- **처리 주체**: 스크립트
- **내용**: URL 형식 정규식 + HTTP 응답 확인
- **실패 시**: 텔레그램 에러 응답 후 해당 메시지 스킵

#### ③ 중복 URL 확인
- **처리 주체**: 스크립트 (Supabase 조회)
- **중복 시**: 텔레그램으로 "이미 저장된 링크 + 기존 제목" 안내 후 스킵
- **신규 시**: 다음 단계 진행

#### ④ 콘텐츠 타입 판별
- **처리 주체**: 스크립트 (URL 도메인 파싱)
- **실패 시**: `article`로 폴백

#### ⑤-A YouTube 메타데이터 수집
- **처리 주체**: 스크립트 (YouTube Data API v3 + `youtube-transcript`)
- **수집 항목**: 제목, 채널명, 설명, 자막 (없으면 description 폴백)
- **성공 기준**: 제목 필드 존재
- **실패 시**: 재시도 1회 → 스킵 + 로그

#### ⑤-B 웹 크롤링 + 본문 추출
- **처리 주체**: 스크립트 (Cheerio + mozilla/readability)
- **성공 기준**: 본문 텍스트 200자 이상
- **실패 시**: ⑤-B' Playwright 폴백

#### ⑤-B' Playwright 폴백
- **처리 주체**: 스크립트 (Playwright)
- **주의**: Actions 실행 시간 증가. `timeout: 30s` 설정 필수
- **실패 시**: 스킵 + 로그

#### ⑥ AI 처리 (핵심 LLM 단계)
- **처리 주체**: LLM (`gpt-4o-mini`)
- **LLM 판단 영역**: 제목 정제 / 3~5문장 요약 / 토픽 태그 3~5개
- **출력 형식**: JSON `{ title, summary, tags[] }`
- **성공 기준**: 세 필드 모두 존재, tags 1개 이상
- **실패 시**: 재시도 최대 2회 → 스킵 + 로그

#### ⑦ 스키마 검증
- **처리 주체**: 스크립트
- **실패 시**: ⑥ 재시도 (최대 2회)

#### ⑧ DB 저장
- **처리 주체**: 스크립트 (Supabase JS Client)
- **큐 기본값**: `Later`
- **실패 시**: 재시도 1회 → 텔레그램 저장 실패 알림

#### ⑨ 텔레그램 완료 응답
- **처리 주체**: 스크립트
- **내용**: 정제된 제목 + 태그 + `/archive` 페이지 링크

---

## 3. 보안 설계

| 항목 | 방법 |
|------|------|
| 텔레그램 봇 토큰 | GitHub Actions Secret에 저장 (`TELEGRAM_BOT_TOKEN`) |
| Supabase 키 분리 | 에이전트(Actions): service_role 키 / 프론트(Vercel): anon 키 |
| Supabase RLS | `archive` 테이블 SELECT는 anon 허용, INSERT/UPDATE는 service_role만 |
| `/api/archive` POST | Vercel 환경에서는 프론트→API 내부 호출만 허용 (외부 직접 호출 차단) |

### GitHub Actions Secrets 목록

```
TELEGRAM_BOT_TOKEN
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
YOUTUBE_API_KEY
OPENAI_API_KEY
```

### Vercel Environment Variables 목록

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

---

## 4. 구현 스펙

### 폴더 구조

```
/my-blog
  ├── CLAUDE.md                                 # 에이전트 메인 지침
  ├── /.claude
  │   └── /skills
  │       ├── /telegram-poller                  # 텔레그램 폴링 + 응답
  │       │   ├── SKILL.md
  │       │   └── /scripts
  │       │       ├── poll_messages.ts          # getUpdates + offset 관리
  │       │       └── send_response.ts          # 완료/에러 응답 전송
  │       ├── /content-fetcher                  # 콘텐츠 수집
  │       │   ├── SKILL.md
  │       │   └── /scripts
  │       │       ├── validate_url.ts
  │       │       ├── check_duplicate.ts        # Supabase 중복 확인
  │       │       ├── fetch_article.ts          # Cheerio + readability
  │       │       ├── fetch_article_playwright.ts
  │       │       └── fetch_youtube.ts
  │       └── /db-publisher                     # Supabase 저장
  │           ├── SKILL.md
  │           └── /scripts
  │               ├── save_item.ts              # archive 테이블 insert
  │               └── manage_offset.ts          # agent_state offset 읽기/쓰기
  ├── /.github
  │   └── /workflows
  │       └── archive-agent.yml                 # 5분마다 실행되는 Actions 워크플로우
  ├── /src
  │   ├── /pages
  │   │   ├── /blog
  │   │   │   ├── index.tsx
  │   │   │   └── [slug].tsx
  │   │   ├── /archive
  │   │   │   ├── index.tsx                     # 아이템 목록 + 필터
  │   │   │   └── [id].tsx                      # 아이템 상세 (요약, 태그, 메모)
  │   │   └── /api
  │   │       └── archive.ts                    # GET(목록) / PATCH(큐·메모 수정)
  │   ├── /components
  │   │   ├── ArchiveItem.tsx
  │   │   └── QueueBadge.tsx
  │   └── /lib
  │       └── supabase.ts                       # anon 클라이언트 (프론트용)
  ├── /content                                  # 기존 마크다운 파일
  └── /docs
      ├── db-schema.md
      ├── migration-gatsby.md
      └── api-reference.md
```

### GitHub Actions 워크플로우 (`archive-agent.yml`) 구조

```yaml
# 핵심 섹션만 명시 (상세 내용은 구현 시 작성)
# 주의: 비공개 저장소 기준 무료 플랜 한도 2,000분/월
#   - 개발 중 (비공개): */15 사용 → 월 ~1,440분 소모
#   - 배포 후 공개 전환 시: */5 로 변경
on:
  schedule:
    - cron: '*/15 * * * *'  # 개발 중 비공개 저장소용 (배포 후 공개 전환 시 */5 로 변경)
  workflow_dispatch:          # 수동 실행도 가능

jobs:
  run-agent:
    runs-on: ubuntu-latest
    timeout-minutes: 4        # 다음 스케줄 전에 반드시 종료
    concurrency:
      group: archive-agent
      cancel-in-progress: false
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'        # node_modules 캐싱으로 실행 시간 단축
      - 의존성 설치
      - 에이전트 실행 (ts-node agent/index.ts)
```

### CLAUDE.md 핵심 섹션 목록

1. 역할 및 목적
2. 워크플로우 실행 순서 (9단계)
3. offset 관리 방식
4. 콘텐츠 타입별 분기 조건
5. Playwright 폴백 타임아웃 기준
6. AI 처리 프롬프트 템플릿
7. 에러 처리 원칙
8. 출력 JSON 형식 명세
9. 환경변수 목록

### 에이전트 구조

**단일 에이전트** — 선형 워크플로우, 스킬 3개로 역할 분리 충분.

### 스킬 목록

| 스킬 | 역할 | 트리거 조건 |
|------|------|-----------|
| `telegram-poller` | getUpdates 폴링, offset 관리, 응답 전송 | Actions 실행 시작 / 처리 완료·실패 시 |
| `content-fetcher` | URL 검증, 중복 확인, 타입 판별, 콘텐츠 수집 | 새 메시지 확인 후 |
| `db-publisher` | Supabase insert, offset 업데이트 | AI 처리 + 스키마 검증 통과 후 |

### DB 스키마 (Supabase PostgreSQL)

**archive 테이블**

| 필드 | 타입 | 비고 |
|------|------|------|
| `id` | uuid | PK, 자동 생성 |
| `url` | text | UNIQUE |
| `type` | enum | `youtube` / `article` |
| `title` | text | |
| `summary` | text | |
| `tags` | text[] | |
| `queue` | enum | `Later` / `Shortlist` / `Archive` |
| `memo` | text | nullable |
| `created_at` | timestamptz | |
| `read_at` | timestamptz | nullable |

**agent_state 테이블** (offset 관리용)

| 필드 | 타입 | 비고 |
|------|------|------|
| `key` | text | PK (예: `"telegram_offset"`) |
| `value` | text | offset 값 |
| `updated_at` | timestamptz | |

---

## 5. 마이그레이션 계획 (Gatsby → Next.js)

### 선행 조건

진행 중인 컴포넌트 리팩토링(Profile, PostList, Layout 등) 완료 또는 커밋 후 시작.

### 이전 대상

| 항목 | Gatsby | Next.js (Pages Router) |
|------|--------|----------------------|
| 마크다운 콘텐츠 | `/content` | `/content` 그대로 |
| 블로그 라우팅 | `gatsby-node.js` | `pages/blog/[slug].tsx` + `getStaticPaths` |
| 이미지 | `gatsby-plugin-image` | `next/image` |
| MDX/마크다운 | `gatsby-remark-*` | `next-mdx-remote` |
| 스타일 (Emotion) | `gatsby-plugin-emotion` | `@emotion/react` + `_document.tsx` |

### 신규 추가

- `pages/archive/` — 아카이빙 탭
- `pages/api/archive.ts` — GET / PATCH API
- `src/lib/supabase.ts` — anon 클라이언트
- `.github/workflows/archive-agent.yml` — Actions 워크플로우
- `/.claude/` — 에이전트 스킬 전체

---

## 6. 배포 구성

| 컴포넌트 | 서비스 | 비용 |
|----------|--------|------|
| Next.js 블로그 | Vercel | 무료 |
| 에이전트 실행 | GitHub Actions | 무료 (월 ~900분 소모) |
| DB | Supabase | 무료 (500MB) |
| 텔레그램 봇 | Telegram BotFather | 무료 |
| YouTube API | Google Cloud | 무료 (10,000유닛/일) |
| **Claude API** | OpenAI | **유일한 유료 항목** |

---

## 7. 기술 스택

| 항목 | 선택값 | 근거 |
|------|--------|------|
| 라우터 | Pages Router | Emotion SSR 호환, 복잡도 최소화 |
| 에이전트 실행 환경 | GitHub Actions (cron) | 상시 서버 불필요 |
| 텔레그램 수신 | 폴링 (getUpdates) | 웹훅 불필요, 서버리스 환경 적합 |
| offset 저장 | Supabase agent_state 테이블 | Actions 에페머럴 환경 대응 |
| 웹 크롤링 | Cheerio + mozilla/readability | 대부분 정적 페이지로 충분 |
| JS 렌더링 폴백 | Playwright (timeout: 30s) | Actions timeout 4분 이내 완료 필수 |
| YouTube 자막 | `youtube-transcript` (npm) | TypeScript 환경 적합 |
| AI 모델 | `gpt-4o-mini` | 최신 버전 |
| 언어 | TypeScript | Next.js 코드베이스 통일 |

---

## 8. 성공 기준

- URL 전송 후 **최대 5분 이내** 텔레그램 완료 응답
- GitHub Actions 실행 시간 **4분 이내** 완료 (다음 스케줄 전 종료)
- `/archive` 탭에서 타입 / 태그 / 큐 기준 필터링 동작
- 중복 URL 전송 시 기존 아이템 정보 안내
- offset 관리로 메시지 중복 처리 없음
- 기존 `/blog` 마크다운 콘텐츠 이전 손실 없음