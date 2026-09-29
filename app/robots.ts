import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /account is deliberately not disallowed here. It carries a noindex
      // tag, and a crawler blocked by robots.txt never sees that tag, so a
      // blocked URL can still be indexed from links alone.
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
