# 마이링크 (MyLink)

MyLink는 개인 프로필, 자주 사용하는 링크, 링크별 클릭 통계를 한 페이지에 모아 공유할 수 있는 Linktree 스타일 웹 서비스입니다.

- Live Demo: https://mylink-hazel.vercel.app
- Public Profile: https://mylink-hazel.vercel.app/hyunseochoi
- GitHub Repository: https://github.com/HyunSeoChoi/mylink

## 주요 기능

- 랜딩 페이지와 공개 프로필 페이지 제공
- username 기반 개인 URL 제공 (`/{username}`)
- Google 로그인 기반 마이페이지
- 프로필 정보 수정: username, 표시 이름, 소개글
- 링크 추가, 수정, 삭제
- 공개 프로필에서 링크 클릭 시 새 탭으로 이동
- 링크별 클릭 수 저장 및 마이페이지 통계 표시
- Firestore Security Rules로 공개 읽기, 소유자 쓰기, 클릭 수 증가 권한 분리
- SEO metadata, Open Graph 이미지, sitemap 제공
- 모바일과 데스크톱을 고려한 반응형 UI

## 기술 스택

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Firebase Authentication
- Firebase Firestore
- Vercel
- AI coding workflow

## 데이터 구조

```txt
users/{userId}/profile/main
users/{userId}/links/{linkId}
usernames/{username}
```

- `profile/main`: 공개 프로필 정보
- `links/{linkId}`: 링크 제목, URL, 설명, 색상, 클릭 수
- `usernames/{username}`: username 중복 확인과 공개 페이지 조회용 매핑

## 실행 방법

```bash
npm install
npm run dev
```

로컬 개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.

## 환경 변수

`.env.local`에 아래 값을 설정합니다.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_SITE_URL=
```

배포 환경에서는 Vercel Project Settings의 Environment Variables에 같은 값을 등록합니다. Firebase Authentication을 사용할 도메인은 Firebase Console의 Authorized domains에도 추가해야 합니다.

## 검증

```bash
npm run lint
npm run build
```

최종 검증 기록은 [docs/final-test.md](docs/final-test.md)에 정리했습니다.

## 기획 문서

- [PRD](docs/PRD.md)
- [User Scenarios](docs/user-scenarios.md)
- [Wireframe](docs/wireframe.md)
- [Final Test](docs/final-test.md)
- [Retrospective](docs/retrospective.md)

## 배운 점

- 요구사항을 작은 기능 단위로 나누고 구현, 테스트, 배포까지 연결하는 흐름
- Firebase Auth와 Firestore Security Rules를 함께 설계하는 방법
- username 기반 공개 페이지와 소유자 전용 관리 페이지의 데이터 구조
- Vercel 배포 환경 변수와 Firebase Authorized domain 설정의 중요성
- AI가 생성한 코드를 그대로 믿기보다 직접 실행하고 오류 메시지를 기준으로 검증하는 과정

## 개선 아이디어

- 링크 순서 드래그 앤 드롭
- 프로필 이미지 업로드
- 일별 클릭 통계 차트
- 다크 모드
- 커스텀 테마 설정
