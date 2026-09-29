/**
 * schema.org structured data builders.
 *
 * Every value is derived from the content package, so the structured data
 * cannot drift from what the pages say.
 */

import { INSTITUTION, SOCIALS } from "@content/global";
import { ADMIN_PHONE, INSTITUTION_EMAILS } from "@content/contacts";
import { absoluteUrl, SITE_URL } from "@/lib/site";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/** The institution, as a research organisation. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ResearchOrganization"],
    "@id": ORGANIZATION_ID,
    name: INSTITUTION.name,
    alternateName: [INSTITUTION.shortName, INSTITUTION.abbreviation],
    description: INSTITUTION.description,
    url: SITE_URL,
    logo: absoluteUrl("/icon.svg"),
    foundingDate: String(INSTITUTION.founded),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Johannesburg",
      addressCountry: "ZA",
    },
    email: INSTITUTION_EMAILS.admin,
    telephone: ADMIN_PHONE.href.replace(/^tel:/, ""),
    sameAs: SOCIALS.map((social) => social.href.split("?")[0]),
  };
}

/** The website, tied to the organisation that publishes it. */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: INSTITUTION.name,
    description: INSTITUTION.description,
    inLanguage: "en-ZA",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** A breadcrumb trail. The final crumb is the current page and has no link. */
export function breadcrumbSchema(
  crumbs: { label: string; href?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: absoluteUrl(crumb.href) } : {}),
    })),
  };
}
