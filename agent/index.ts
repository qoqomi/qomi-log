import { pollMessages } from '../.claude/skills/slack-poller/scripts/poll_messages';
import { sendResponse } from '../.claude/skills/slack-poller/scripts/send_response';
import {
  isValidUrl,
  detectContentType,
  isAccessible,
} from '../.claude/skills/content-fetcher/scripts/validate_url';
import { checkDuplicate } from '../.claude/skills/content-fetcher/scripts/check_duplicate';
import { fetchArticle } from '../.claude/skills/content-fetcher/scripts/fetch_article';
import { fetchArticlePlaywright } from '../.claude/skills/content-fetcher/scripts/fetch_article_playwright';
import { fetchYouTube } from '../.claude/skills/content-fetcher/scripts/fetch_youtube';
import { saveItem } from '../.claude/skills/db-publisher/scripts/save_item';
import { getOffset, setOffset } from '../.claude/skills/db-publisher/scripts/manage_offset';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface AIResult {
  title: string;
  summary: string;
  tags: string[];
}

async function processWithAI(
  content: string,
  retries = 2,
): Promise<AIResult | null> {
  for (let i = 0; i <= retries; i++) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'user',
            content: `다음 콘텐츠를 분석하여 JSON으로만 응답하세요.

콘텐츠:
${content.slice(0, 3000)}

응답 형식:
{
  "title": "읽기 좋게 정제된 제목",
  "summary": "핵심 인사이트 중심 3~5문장 요약",
  "tags": ["태그1", "태그2", "태그3"]
}

규칙:
- title: 원문을 읽기 좋게 정제 (과도한 특수문자 제거)
- summary: 핵심 인사이트 3~5문장, 한국어
- tags: 3~5개 토픽 키워드`,
          },
        ],
        response_format: { type: 'json_object' },
      });

      const result = JSON.parse(
        response.choices[0].message.content ?? '{}',
      ) as Partial<AIResult>;

      if (
        result.title &&
        result.summary &&
        Array.isArray(result.tags) &&
        result.tags.length > 0
      ) {
        return result as AIResult;
      }
    } catch (e) {
      console.error(`AI 처리 실패 (시도 ${i + 1}):`, e);
      if (i === retries) return null;
    }
  }
  return null;
}

async function main() {
  console.log('[agent] 시작');

  const lastTs = await getOffset();
  console.log(`[agent] 마지막 처리 ts: ${lastTs}`);

  const messages = await pollMessages(lastTs);

  if (messages.length === 0) {
    console.log('[agent] 새 메시지 없음. 종료.');
    return;
  }

  console.log(`[agent] ${messages.length}개 메시지 처리 시작`);

  let newLastTs = lastTs;

  for (const message of messages) {
    const url = message.text.trim();
    newLastTs = message.ts;

    console.log(`[agent] 처리 중: ${url}`);

    // ① URL 유효성
    if (!isValidUrl(url)) {
      await sendResponse(`❌ 유효하지 않은 URL입니다: ${url}`);
      continue;
    }

    const accessible = await isAccessible(url);
    if (!accessible) {
      await sendResponse(`❌ 접근할 수 없는 URL입니다: ${url}`);
      continue;
    }

    // ③ 중복 확인
    const { isDuplicate, existingTitle } = await checkDuplicate(url);
    if (isDuplicate) {
      await sendResponse(`⚠️ 이미 저장된 링크입니다.\n📌 ${existingTitle}`);
      continue;
    }

    // ④ 타입 판별
    const type = detectContentType(url);

    // ⑤ 콘텐츠 수집
    let rawContent: string | null = null;

    if (type === 'youtube') {
      const yt = await fetchYouTube(url);
      if (yt) rawContent = `제목: ${yt.title}\n채널: ${yt.channelName}\n\n${yt.transcript}`;
    } else {
      const article = await fetchArticle(url);
      if (article) {
        rawContent = `제목: ${article.title}\n\n${article.content}`;
      } else {
        try {
          const pw = await fetchArticlePlaywright(url);
          if (pw) rawContent = `제목: ${pw.title}\n\n${pw.content}`;
        } catch (e) {
          console.error('[agent] Playwright 폴백 실패:', e);
        }
      }
    }

    if (!rawContent) {
      await sendResponse('❌ 콘텐츠를 가져올 수 없습니다.');
      continue;
    }

    // ⑥ AI 처리
    const aiResult = await processWithAI(rawContent);
    if (!aiResult) {
      await sendResponse('❌ AI 처리에 실패했습니다. 잠시 후 다시 시도해주세요.');
      continue;
    }

    // ⑧ DB 저장
    try {
      await saveItem({
        url,
        type,
        title: aiResult.title,
        summary: aiResult.summary,
        tags: aiResult.tags,
        queue: 'Later',
      });
    } catch (e) {
      console.error('[agent] DB 저장 실패:', e);
      await sendResponse('❌ 저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
      continue;
    }

    // ⑨ 완료 응답
    const siteUrl = process.env.SITE_URL ?? 'https://example.com';
    await sendResponse(
      `✅ 저장 완료!\n\n📌 *${aiResult.title}*\n🏷️ ${aiResult.tags.map(t => `#${t}`).join(' ')}\n\n🔗 ${siteUrl}/archive`,
    );

    console.log(`[agent] 완료: ${aiResult.title}`);
  }

  await setOffset(newLastTs);
  console.log(`[agent] ts 업데이트: ${newLastTs}`);
}

main().catch(e => {
  console.error('[agent] 치명적 오류:', e);
  process.exit(1);
});
