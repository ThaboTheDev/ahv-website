import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/admin"],
      // /admin and /account are deliberately not disallowed here. They carry
      // noindex tags, and a crawler blocked by robots.txt never sees that tag,
      // so a blocked URL can still be indexed from links alone. The admin API
      // is disallowed outright because it is not a browsable page.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
