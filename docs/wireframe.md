# MyLink Wireframe

## Landing Page

```text
┌────────────────────────────────────┐
│ MyLink                  [시작하기] │
│                                    │
│          마이링크                   │
│ 나만의 링크 페이지를 만들고 공유    │
│                                    │
│ [ 시작하기 ] [ GitHub ]             │
│                                    │
│ 링크 관리 | 클릭 통계 | 개인 URL    │
│                                    │
│ ┌──────── 공개 페이지 미리보기 ────┐│
│ │ @hyunseochoi                    ││
│ │ Instagram                       ││
│ │ Blog                            ││
│ └────────────────────────────────┘│
└────────────────────────────────────┘
```

## Current Public Profile Page

```text
┌────────────────────────────────────┐
│                                    │
│          [ Profile Image ]         │
│                                    │
│               MYLINK               │
│               최현서               │
│                                    │
│   한 곳에서 나를 소개하고, 자주     │
│   사용하는 링크를 모아두는 페이지   │
│                                    │
│   ┌────────────────────────────┐   │
│   │ Instagram               >  │   │
│   │ Daily photos...            │   │
│   └────────────────────────────┘   │
│                                    │
│   ┌────────────────────────────┐   │
│   │ Blog                    >  │   │
│   │ Notes about study...       │   │
│   └────────────────────────────┘   │
│                                    │
│   ┌────────────────────────────┐   │
│   │ Portfolio               >  │   │
│   │ Projects, experiments...   │   │
│   └────────────────────────────┘   │
│                                    │
│   ┌────────────────────────────┐   │
│   │ GitHub Repository       >  │   │
│   │ Source code...             │   │
│   └────────────────────────────┘   │
│                                    │
│          yourname.vercel.app       │
│                                    │
└────────────────────────────────────┘
```

## Layout Notes

- Profile image area stays at the top.
- Name and introduction sit directly under the profile image.
- Link buttons are stacked vertically.
- Each link button has a title, description, and arrow.
- Footer shows the future public URL.
- On desktop, the whole page stays centered in a narrow card.
- On mobile, the card uses most of the screen width.

## Firestore Data Structure

```text
users
└── {userId}
    ├── profile
    │   └── main
    │       ├── username
    │       ├── displayName
    │       ├── bio
    │       ├── createdAt
    │       └── updatedAt
    └── links
        └── {linkId}
            ├── title
            ├── description
            ├── url
            ├── icon
            ├── color
            ├── clickCount
            ├── createdAt
            └── updatedAt

usernames
└── {username}
    ├── userId
    ├── username
    └── updatedAt
```

## Link Management Page

```text
┌────────────────────────────────────┐
│ MyLink Admin                       │
│ 내 링크 관리                        │
│ [ Google 로그인 / 로그아웃 ]        │
│                                    │
│ 프로필 수정                         │
│ [ username                     ]   │
│ [ 표시 이름                    ]   │
│ [ 소개글                       ]   │
│ [ 프로필 저장 ]                    │
│                                    │
│ Title                              │
│ [ YouTube                      ]   │
│                                    │
│ URL                                │
│ [ https://youtube.com          ]   │
│                                    │
│ [ 추가하기 ]                       │
│                                    │
│ 링크 목록                           │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Instagram                      │ │
│ │ https://instagram.com          │ │
│ │ [수정] [삭제]                  │ │
│ └────────────────────────────────┘ │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ Blog                           │ │
│ │ https://velog.io               │ │
│ │ [수정] [삭제]                  │ │
│ └────────────────────────────────┘ │
│                                    │
│ 클릭 통계                           │
│ 총 234 클릭                         │
│ Instagram           123 클릭        │
│ YouTube              67 클릭        │
└────────────────────────────────────┘
```

## Delete Confirmation Modal

```text
┌────────────────────────────────────┐
│ 정말 삭제하시겠습니까?             │
│                                    │
│ "Instagram" 링크가 삭제됩니다.     │
│ 이 작업은 되돌릴 수 없습니다.      │
│                                    │
│ [취소]                  [삭제하기] │
└────────────────────────────────────┘
```

## Future Add/Edit Link Form

```text
┌────────────────────────────────────┐
│ Add Link                           │
│                                    │
│ Title                              │
│ [ Instagram                    ]   │
│                                    │
│ URL                                │
│ [ https://instagram.com        ]   │
│                                    │
│ Description                        │
│ [ Daily photos and moments     ]   │
│                                    │
│ [Cancel]                 [Save]    │
└────────────────────────────────────┘
```
