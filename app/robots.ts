import type { MetadataRoute } from "next";

const SITE_URL = "https://africanhiddenvoices.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Registration is not open, so the access page is kept out of the index.
      disallow: "/account",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
