# Final Test

## 테스트 일자

- 2026-05-21

## 로컬 검증

```bash
npm run lint
npm run build
```

- ESLint 통과
- Next.js production build 통과

## 배포 URL 검증

- `https://mylink-hazel.vercel.app`: 랜딩 페이지 정상 응답
- `https://mylink-hazel.vercel.app/hyunseochoi`: 공개 프로필 페이지 정상 응답
- `https://mylink-hazel.vercel.app/mypage`: Google 로그인 화면 정상 응답
- `https://mylink-hazel.vercel.app/sitemap.xml`: sitemap 정상 응답
- `https://mylink-hazel.vercel.app/opengraph-image`: Open Graph 이미지 정상 응답
- `https://mylink-hazel.vercel.app/hyunseochoi/opengraph-image`: username별 Open Graph 이미지 정상 응답

## 기능 검증

- Google 로그인 동작 확인
- Firebase Authorized domain 설정 확인
- 프로필 저장 동작 확인
- username 중복 체크 동작 확인
- 공개 프로필에서 Instagram, Blog, Portfolio, GitHub 링크 표시 확인
- 공개 프로필 링크 클릭 시 새 탭 이동 확인
- 링크 클릭 수 증가와 마이페이지 통계 표시 확인
- Firestore Rules 게시 후 공개 읽기, 소유자 쓰기, 클릭 수 증가 권한 확인
- sitemap과 Open Graph metadata 배포 확인

## 수동 확인이 필요한 항목

- Firebase Console의 Firestore Rules 게시 상태
- Vercel Environment Variables 값
- Google 검색 결과와 SNS 미리보기 캐시는 외부 서비스 반영 시간이 걸릴 수 있음
