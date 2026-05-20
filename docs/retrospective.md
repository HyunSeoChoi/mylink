# Retrospective

## 프로젝트 요약

MyLink는 개인 프로필과 여러 외부 링크를 한 페이지에 모아 공유하는 웹 서비스입니다. 초기에는 정적 프로필 페이지로 시작했고, 이후 Firebase를 연결해 로그인, 링크 관리, 공개 프로필, 클릭 통계, 배포와 SEO까지 확장했습니다.

## 구현한 것

- Next.js 프로젝트 생성과 GitHub 저장소 연결
- 프로필 카드와 링크 목록 UI 구현
- 반응형 Neobrutalism 스타일 적용
- PRD, 사용자 시나리오, 와이어프레임 문서 작성
- `/mypage` 관리 페이지 구현
- Firestore 기반 링크 저장, 수정, 삭제
- Google 로그인과 사용자별 데이터 분리
- username 기반 공개 프로필 페이지 구현
- Firestore Security Rules 작성
- 공개 링크 클릭 수 저장과 통계 표시
- 랜딩 페이지, sitemap, Open Graph metadata와 이미지 추가
- Vercel 배포와 Firebase Auth Authorized domain 설정
- README, 최종 테스트 기록, 회고 문서 정리

## 해결한 문제

- Firestore Rules 권한 문제로 프로필 저장과 username 중복 체크가 실패하던 문제를 규칙과 데이터 구조로 해결
- `NEXT_PUBLIC_SITE_URL`에 프로토콜이 없을 때 Open Graph metadata 생성에서 `Invalid URL`이 발생하던 문제를 URL 정규화 함수로 해결
- 공개 username 조회를 안정적으로 하기 위해 `usernames/{username}` 매핑 문서를 추가
- 공개 링크 클릭 수는 소유자 로그인 없이도 `clickCount`만 1씩 증가하도록 Rules를 분리
- Firebase Auth Google 로그인을 위해 배포 도메인을 Authorized domains에 추가

## 배운 점

- 기능 구현보다 데이터 구조와 권한 설계가 먼저 안정적이어야 한다는 점
- 배포 환경에서는 로컬에서 보이지 않던 환경 변수와 도메인 설정 문제가 자주 발생한다는 점
- AI가 만든 코드는 실행 결과, 빌드 로그, 브라우저 콘솔, Firebase 권한 오류로 반드시 검증해야 한다는 점
- README와 테스트 기록은 프로젝트를 설명하는 포트폴리오 자료가 된다는 점

## 아쉬운 점과 개선 방향

- 링크 순서를 직접 바꾸는 기능이 아직 없음
- 프로필 이미지 업로드 기능이 아직 없음
- 클릭 통계가 누적 숫자 중심이라 일별 변화 그래프가 없음
- 테마 커스터마이징과 다크 모드를 추가하면 개인화 수준을 높일 수 있음
