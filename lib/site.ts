/**
 * Site-wide SEO constants and helpers.
 *
 * One source for the canonical origin and for the per-page metadata shape, so
 * that layout, robots, sitemap, structured data and every page agree.
 */

import type { Metadata } from "next";
import { INSTITUTION } from "@content/global";

/**
 * The canonical origin, with no trailing slash.
 *
 * Set NEXT_PUBLIC_SITE_URL to change it without a code edit (for example when
 * the institutional domain is settled, or for a staging deploy). See README.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://africanhiddenvoices.org"
).replace(/\/+$/, "");

/** Absolute URL for a site path such as "/departments". */
export function absoluteUrl(path = "/"): string {
  return path === "/" ? SITE_URL : `${SITE_URL}${path}`;
}

/**
 * Share image. The root opengraph-image and twitter-image files are dropped
 * by Next.js as soon as a page sets its own openGraph or twitter object, so
 * pages point at them explicitly.
 */
const SHARE_IMAGE = {
  width: 1200,
  height: 630,
  alt: `${INSTITUTION.name}. ${INSTITUTION.description}`,
};

/**
 * Metadata for a page.
 *
 * Next.js merges metadata shallowly, so a page that sets only `title` and
 * `description` would inherit the home page's Open Graph title, description
 * and URL. This helper sets the canonical URL and a matching Open Graph and
 * Twitter card for the page instead.
 *
 * `title` is the page title without the site suffix; the layout's title
 * template adds " · AHV Research Institution".
 */
export function pageMetadata({
  title,
  description,
  path,
  noindex = false,
}: {
  title: string;
  description: string;
  /** Path from the site root, for example "/departments/economics". */
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      siteName: INSTITUTION.name,
      title: `${title} · ${INSTITUTION.abbreviation} Research Institution`,
      description,
      url,
      images: [{ url: absoluteUrl("/opengraph-image"), ...SHARE_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      site: "@african_voices",
      title: `${title} · ${INSTITUTION.abbreviation} Research Institution`,
      description,
      images: [{ url: absoluteUrl("/twitter-image"), ...SHARE_IMAGE }],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
