export function getSiteUrl() {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim()

  if (!rawSiteUrl) {
    return "http://localhost:3000"
  }

  if (rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")) {
    return rawSiteUrl.replace(/\/$/, "")
  }

  return `https://${rawSiteUrl.replace(/\/$/, "")}`
}
