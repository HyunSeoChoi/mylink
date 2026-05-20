# MyLink Wireframe

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
└── anonymous
    └── links
        └── {linkId}
            ├── title
            ├── description
            ├── url
            ├── icon
            ├── color
            ├── createdAt
            └── updatedAt
```

## Link Management Page

```text
┌────────────────────────────────────┐
│ MyLink Admin                       │
│ 내 링크 관리                        │
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
