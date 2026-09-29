import type { MetadataRoute } from "next";
import { PRIMARY_NAV, UTILITY_NAV } from "@content/global";
import { DEPARTMENTS } from "@content/departments";
import { ENGAGE_CHANNELS } from "@content/engage";
import { absoluteUrl } from "@/lib/site";

const INSTITUTION_PAGES = [
  "/institution/framework",
  "/institution/imboni",
  "/institution/record",
];

const RESEARCH_PAGES = ["/database/method", "/database/submit"];

/**
 * Every indexable page, once.
 *
 * Positions and lexicon entries are anchors on their index pages, not pages
 * of their own, so they are not listed: search engines ignore URL fragments
 * and would read them as duplicates of the index URL.
 *
 * `lastModified` is left out on purpose. Nothing here tracks when a page last
 * changed, and a date that is always "now" teaches crawlers to ignore the
 * field. Add it if page dates are ever recorded in the content package.
 *
 * `/account` is excluded because it is noindex.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    ...PRIMARY_NAV.map((item) => ({ path: item.href, priority: 0.9 })),
    ...DEPARTMENTS.map((d) => ({
      path: `/departments/${d.slug}`,
      priority: 0.9,
    })),
    ...INSTITUTION_PAGES.map((path) => ({ path, priority: 0.8 })),
    ...UTILITY_NAV.map((item) => ({ path: item.href, priority: 0.7 })),
    { path: "/lexicon", priority: 0.7 },
    ...RESEARCH_PAGES.map((path) => ({ path, priority: 0.7 })),
    ...ENGAGE_CHANNELS.map((c) => ({
      path: `/engage/${c.slug}`,
      priority: 0.7,
    })),
  ];

  // First occurrence wins, so a page listed twice keeps its higher priority.
  const seen = new Set<string>();
  return entries
    .filter(({ path }) => !seen.has(path) && !!seen.add(path))
    .map(({ path, priority }) => ({
      url: absoluteUrl(path),
      changeFrequency: "monthly" as const,
      priority,
    }));
}
