import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#7dd3fc",
          border: "24px solid #000",
          color: "#000",
          fontFamily: "Arial, sans-serif",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
            border: "8px solid #000",
            background: "#FEF08A",
            boxShadow: "18px 18px 0 #000",
            padding: 56,
          }}
        >
          <div style={{ fontSize: 44, fontWeight: 900 }}>MyLink</div>
          <div style={{ marginTop: 28, fontSize: 82, fontWeight: 900 }}>
            나만의 링크 페이지
          </div>
          <div style={{ marginTop: 28, fontSize: 34, fontWeight: 700 }}>
            링크 관리 · 개인 URL · 클릭 통계
          </div>
        </div>
      </div>
    ),
    size
  )
}
