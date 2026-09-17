import type { MetadataRoute } from "next";
import { SITE, NAV } from "@/lib/site";
import { voicesByEra } from "@/lib/voices";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = NAV.map((item) => ({
    url: `${SITE.url}${item.href === "/" ? "" : item.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: item.href === "/" ? 1 : 0.8,
  }));

  const voices = voicesByEra().map((voice) => ({
    url: `${SITE.url}/voices/${voice.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...pages, ...voices];
}
