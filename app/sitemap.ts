import type { MetadataRoute } from "next";
import { PRIMARY_NAV, UTILITY_NAV } from "@content/global";
import { DEPARTMENTS } from "@content/departments";
import { ENGAGE_CHANNELS } from "@content/engage";
import { POSITIONS } from "@content/positions";
import { LEXICON } from "@content/lexicon";

const SITE_URL = "https://africanhiddenvoices.org";

const INSTITUTION_PAGES = [
  "/institution/framework",
  "/institution/imboni",
  "/institution/record",
];

const RESEARCH_PAGES = ["/database/method", "/database/submit", "/lexicon"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const fixed = [
    { url: SITE_URL, priority: 1 },
    ...PRIMARY_NAV.map((item) => ({ url: `${SITE_URL}${item.href}`, priority: 0.9 })),
    ...UTILITY_NAV.map((item) => ({ url: `${SITE_URL}${item.href}`, priority: 0.7 })),
    ...INSTITUTION_PAGES.map((href) => ({ url: `${SITE_URL}${href}`, priority: 0.8 })),
    ...RESEARCH_PAGES.map((href) => ({ url: `${SITE_URL}${href}`, priority: 0.7 })),
    ...DEPARTMENTS.map((department) => ({
      url: `${SITE_URL}/departments/${department.slug}`,
      priority: 0.9,
    })),
    ...ENGAGE_CHANNELS.map((channel) => ({
      url: `${SITE_URL}/engage/${channel.slug}`,
      priority: 0.7,
    })),
    ...POSITIONS.map((position) => ({
      url: `${SITE_URL}/positions#${position.slug}`,
      priority: 0.5,
    })),
    ...LEXICON.map((entry) => ({
      url: `${SITE_URL}/lexicon#${entry.slug}`,
      priority: 0.5,
    })),
  ];

  return fixed.map((entry) => ({
    url: entry.url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: entry.priority,
  }));
}
