import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-url"

const siteUrl = getSiteUrl()

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/hyunseochoi`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/mypage`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]
}
