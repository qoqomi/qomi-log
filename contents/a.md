---
date: '2026-04-17'
title: 'React Native 이미지 프리로딩, 렌더 파이프라인부터 이해하기'
category: 'React Native'
summary: '카드 스와이프 앱에서 이미지가 뚝뚝 뜨는 flicker 현상의 원인을 RN 렌더 파이프라인 구조로 이해하고, Image.prefetch로 해결하는 방법을 알아보자.'
thumbnail: './thumbnail.jpeg'
---

## 왜 이미지가 뚝뚝 뜰까?

카드 스와이프 앱을 만들다 보면 카드가 전환될 때 이미지가 잠깐 비었다가 뜨는 현상을 겪는다.
이걸 flicker라고 하는데, 원인을 이해하려면 RN의 렌더 파이프라인부터 알아야 한다.

<br/>

## 렌더 파이프라인이란?

> React 로직을 호스트 플랫폼(Android/iOS)에 렌더링하기 위한 일련의 작업

렌더 파이프라인은 세 단계로 나뉜다.

```
Render Phase → Commit Phase → Mount Phase
```


## 1단계: Render Phase

React가 JS에서 컴포넌트를 실행해 **React Element Tree**를 만든다.
동시에 RN 렌더러(C++)가 이를 보고 **Shadow Tree**를 생성한다.

### Shadow Node란?

컴포넌트 하나를 C++로 표현한 객체다.

```jsx
<View style={{ width: 100, height: 50, backgroundColor: 'red' }} />
```

위 컴포넌트는 C++에서 이렇게 표현된다.

```
ViewShadowNode {
  style: { width: 100, height: 50, backgroundColor: 'red' }
  layout: { x: ?, y: ?, width: ?, height: ? }  ← Commit 단계에서 채워짐
  children: []
}
```

### Shadow Tree란?

Shadow Node들이 부모-자식 관계로 연결된 트리 전체다.

```jsx
<View>
  <Text>Hello</Text>
  <Image uri="..." />
</View>
```

```
ViewShadowNode          ← 루트
  ├── TextShadowNode    ← 자식 1
  └── ImageShadowNode  ← 자식 2
```


## 2단계: Commit Phase

Shadow Tree가 완성되면 **Yoga**(C++ 레이아웃 엔진)가 각 노드를 순회하며 위치/크기를 계산한다.

```
ViewShadowNode  →  x: 0,  y: 0,  width: 390, height: 200
TextShadowNode  →  x: 10, y: 10, width: 100, height: 20
ImageShadowNode →  x: 10, y: 40, width: 100, height: 100
```

계산이 완료된 Shadow Tree를 "next tree"로 올려두고 Mount 단계를 대기한다.

> Yoga가 Shadow Tree를 생성하는 게 아니다. 이미 만들어진 Shadow Tree의 레이아웃을 계산하는 역할이다.


## 3단계: Mount Phase

완성된 Shadow Tree를 실제 네이티브 뷰로 변환해 화면에 붙인다.

```
ViewShadowNode   →   android.view.ViewGroup  (iOS: UIView)
TextShadowNode   →   android.widget.TextView (iOS: UILabel)
ImageShadowNode  →   (이미지 컴포넌트 화면에 붙음)
```

**여기서 문제가 생긴다.**

`<Image source={{ uri: '...' }} />`가 Mount되는 순간, RN은 그때서야 이미지 파일을 요청한다.

```
Mount 완료
  → ImageShadowNode 화면에 붙음
  → uri 확인 → 기기 캐시 조회
      ├── 캐시 있음 → 즉시 렌더
      └── 캐시 없음 → HTTP GET 요청 시작  ← 여기서 flicker 발생
```


## Image 컴포넌트의 요청은 API 요청이 아니다

헷갈릴 수 있는 부분인데, `<Image />`가 하는 요청은 이미지 파일(jpg/png) 자체를 받아오는 HTTP 요청이다.

```
API 요청    →  https://api.myapp.com/cards      →  JSON 텍스트 반환
이미지 요청  →  https://cdn.myapp.com/photo.jpg  →  jpg 바이너리 반환
```

둘 다 HTTP GET이지만 응답으로 뭐가 오느냐가 다르다.

RN 공식 문서의 콜백 순서가 이를 증명한다.

```jsx
<Image
  source={{ uri: 'https://cdn.../photo.jpg' }}
  onLoadStart={() => console.log('jpg 다운로드 시작')}  // Mount 시점에 호출
  onProgress={...}                                      // 다운로드 중
  onLoad={() => console.log('jpg 다운로드 완료')}
/>
```

`onLoadStart`가 Mount 시점에 호출된다는 것 자체가 "그때서야 요청 시작"임을 의미한다.


## 해결: Image.prefetch

`Image.prefetch`는 렌더 파이프라인과 무관하게 백그라운드에서 미리 이미지를 다운로드해 기기 캐시에 저장한다.

```js
// 카드 목록을 받아오는 시점에 미리 캐시
useEffect(() => {
  cards.forEach(card => {
    Image.prefetch(card.imageUrl);
  });
}, [cards]);
```

이후 Mount 단계에서 `<Image />`가 붙을 때 캐시에서 즉시 로드되므로 flicker가 사라진다.

```
Image.prefetch 호출
  → 파이프라인 밖에서 백그라운드 다운로드
  → 기기 캐시에 저장

나중에 Mount 시점
  → uri 확인 → 캐시 조회 → 이미 있음 → 즉시 렌더  ✓
```

캐시 여부는 `queryCache()`로 직접 확인할 수 있다.

```js
const result = await Image.queryCache(['https://cdn.../photo.jpg']);
// { 'https://cdn.../photo.jpg': 'disk' }
```


## API 응답에 이미지 URL이 5개 있어도 flicker는 발생한다

API 응답에 이미지 URL이 포함되어 있어도 flicker는 그대로 발생한다.
API가 주는 건 **주소(문자열)** 이지 **이미지 파일 자체**가 아니기 때문이다.

```
API 응답
{
  cards: [
    { id: 1, imageUrl: 'https://cdn.../photo1.jpg' },  // 문자열만 있음
    { id: 2, imageUrl: 'https://cdn.../photo2.jpg' },
    { id: 3, imageUrl: 'https://cdn.../photo3.jpg' },
  ]
}
```

이 시점에 기기에 저장된 건 URL 문자열뿐이다. 이미지 파일은 아직 서버에 있다.

```
API 응답 수신 (5개 URL 있음)
  → cards 상태에 저장
  → 카드 1 렌더 시작 → Mount 완료
  → 그때서야 photo1.jpg 요청  ← flicker 발생
  → 카드 2로 스와이프 → Mount 완료
  → 그때서야 photo2.jpg 요청  ← flicker 발생
```

해결 방법은 API 응답을 받는 시점에 바로 prefetch를 걸어두는 것이다.

```js
const { data } = useQuery({ queryKey: ['cards'], queryFn: fetchCards });

useEffect(() => {
  if (data) {
    data.cards.forEach(card => {
      Image.prefetch(card.imageUrl);  // URL 받자마자 백그라운드 다운로드
    });
  }
}, [data]);
```

API 응답 → URL 확보 → 즉시 prefetch → 사용자가 스와이프하기 전에 캐시 완료.


## React Query로는 해결이 안 될까?

React Query의 prefetch는 API 응답(JSON)을 캐시하는 것이지, 이미지 파일을 캐시하는 게 아니다.

```js
// React Query prefetch → JSON 데이터 캐시
await queryClient.prefetchQuery({
  queryKey: ['cards'],
  queryFn: fetchCards,
});
// 결과: { id: 1, imageUrl: 'https://cdn.../photo.jpg' } 가 캐시됨
// 이미지 파일 자체는 아직 없음
```

React Query를 써도 Mount 시점에 이미지 파일 요청은 그대로 발생한다.
flicker를 없애려면 `Image.prefetch`를 별도로 사용해야 한다.

| | React Query prefetch | Image.prefetch |
|---|---|---|
| 대상 | API 응답 (JSON) | 이미지 파일 (jpg/png) |
| 저장 위치 | React Query 캐시 | 기기 이미지 캐시 |
| flicker 해결 | X | O |


## 정리

flicker의 근본 원인은 **렌더 파이프라인의 Mount 시점과 이미지 다운로드 시점이 같기 때문**이다.
`Image.prefetch`는 이 두 시점을 분리해서, Mount될 때는 이미 캐시에 있는 상태를 만든다.

```
프리로딩 없음: Mount → 요청 시작 → 다운로드 → 렌더  (flicker 발생)
프리로딩 있음: 미리 다운로드 → 캐시 저장 → Mount → 즉시 렌더  (flicker 없음)
```

## 참고 문서

- https://reactnative.dev/architecture/render-pipeline
- https://reactnative.dev/docs/image#prefetch