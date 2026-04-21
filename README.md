export const vs export default 

export const: 여러 개 가능, 이름 그대로 import 


gatsby-plugin-image
1. Lazy Loading(지연 로딩)
화면에 보이는 이미지를 먼저 로드하여, 스크롤 내려야 보이는 이미지는 나중에 로드하도록 처리 
2. Blur placeholder 
- 이미지 로딩 중에 흐릿한 이미지를 먼저 보여주도록 설정 
3. 자동 리사이징 
- getsbyImageData(width:220): 원본이 5MB여도 220px 크기로 잘라줌

4. WebP 자동변환 
지원하는 브라우저에는 WebP(더 가벼운 포맷)로, 아니면 jpg/png로 자동 제공한다. 