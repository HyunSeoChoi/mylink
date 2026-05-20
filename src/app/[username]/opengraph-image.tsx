import { ImageResponse } from "next/og"

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

type OpenGraphImageProps = {
  params: Promise<{
    username: string
  }>
}

export default async function Image({ params }: OpenGraphImageProps) {
  const { username } = await params
  const decodedUsername = decodeURIComponent(username)

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#5B5FC7",
          color: "#000",
          fontFamily: "Arial, sans-serif",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "8px solid #000",
            background: "#FEF08A",
            boxShadow: "18px 18px 0 #000",
            padding: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div
              style={{
                width: 112,
                height: 112,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "8px solid #000",
                borderRadius: "999px",
                background: "#FF8FAB",
                fontSize: 48,
                fontWeight: 900,
              }}
            >
              {decodedUsername.slice(0, 1).toUpperCase()}
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", fontSize: 36, fontWeight: 900 }}>
                MyLink
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 8,
                  fontSize: 30,
                  fontWeight: 700,
                }}
              >
                공유 가능한 개인 링크 페이지
              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", fontSize: 88, fontWeight: 900 }}>
              @{decodedUsername}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 34,
                fontWeight: 800,
              }}
            >
              링크와 프로필을 한 곳에서 확인하세요.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              border: "6px solid #000",
              borderRadius: 999,
              background: "#8DD3C7",
              padding: "16px 28px",
              fontSize: 28,
              fontWeight: 900,
            }}
          >
            mylink/{decodedUsername}
          </div>
        </div>
      </div>
    ),
    size
  )
}
