/**
 * Global elements: the institution, navigation, ticker, footer and contacts.
 *
 * Binding house style is documented in packages/content/HOUSE-STYLE.md.
 * Every string here is subject to it: South African English, no em dashes,
 * dates as 15 May 2026, figures for ten and above.
 */

import { DEPARTMENTS } from "./departments";
import { POSITIONS } from "./positions";
import { LEXICON } from "./lexicon";
import { DATABASE_RECORDS } from "./database";
import { CONFERENCES } from "./research";

export const INSTITUTION = {
  name: "African Hidden Voices (AHV) Research Institution",
  shortName: "African Hidden Voices",
  abbreviation: "AHV",
  description:
    "An independent research institution advancing African Indigenous Spirituality as a global academic discipline.",
  founded: 2009,
  location: "Johannesburg, South Africa",
  /** Set once the registered entity details are confirmed. See README. */
  registration: {
    entityName: null as string | null,
    registrationNumber: null as string | null,
  },
} as const;

/**
 * The standing line. Appears on every page, in the footer.
 */
export const STANDING_LINE =
  "African Hidden Voices (AHV) Research Institution. Cited as a primary source in The Revelation Spiritual Home: The Revival of African Indigenous Spirituality, Cambridge University Press, 2025.";

export interface NavItem {
  label: string;
  href: string;
  /** Short description, used on hub pages and in the footer. */
  blurb?: string;
}

export const PRIMARY_NAV: NavItem[] = [
  {
    label: "Departments",
    href: "/departments",
    blurb: "Six departments holding AIS across the disciplines.",
  },
  {
    label: "Positions",
    href: "/positions",
    blurb: "Ten positions, published with the case against them.",
  },
  {
    label: "Research",
    href: "/research",
    blurb: "Working papers, conference papers and research method.",
  },
  {
    label: "Publications",
    href: "/publications",
    blurb: "AHV's books, and the scholarship that cites them.",
  },
  {
    label: "Iimboni Database",
    href: "/database",
    blurb: "A research record of Africa's spiritual authorities.",
  },
  {
    label: "The Institution",
    href: "/institution",
    blurb: "What AHV is, and the authority under which it works.",
  },
  {
    label: "Engage",
    href: "/engage",
    blurb: "Partnership, policy and media work.",
  },
];

export const UTILITY_NAV: NavItem[] = [
  { label: "Foundations", href: "/foundations" },
  { label: "Newsroom", href: "/newsroom" },
  { label: "Media", href: "/media" },
  { label: "Research Digest", href: "/newsletter" },
  { label: "Support", href: "/support" },
];

export const CONTACTS = [
  { label: "General", address: "office@africanhiddenvoices.org" },
  { label: "Research", address: "research@africanhiddenvoices.org" },
  { label: "Partnerships", address: "partnerships@africanhiddenvoices.org" },
  { label: "Press", address: "press@africanhiddenvoices.org" },
  { label: "Database", address: "database@africanhiddenvoices.org" },
] as const;

/**
 * Header ticker figures. Every figure is derived from the site's own content
 * rather than typed by hand, and each links to the page that proves it.
 */
export function tickerFigures() {
  const countries = new Set(
    DATABASE_RECORDS.map((record) => record.country),
  );

  return [
    {
      value: DATABASE_RECORDS.length,
      label: "records published",
      href: "/database",
      note: `${countries.size} countries`,
    },
    {
      value: DEPARTMENTS.length,
      label: "departments",
      href: "/departments",
      note: "one order",
    },
    {
      value: POSITIONS.length,
      label: "positions, with the counter-case",
      href: "/positions",
      note: "objection and answer",
    },
    {
      value: LEXICON.length,
      label: "terms restored",
      href: "/lexicon",
      note: "defined from within",
    },
    {
      value: CONFERENCES.length,
      label: "conference appearances",
      href: "/institution/record",
      note: "with sources",
    },
  ];
}

export const FOOTER_COLUMNS: { heading: string; links: NavItem[] }[] = [
  {
    heading: "Departments",
    links: DEPARTMENTS.map((department) => ({
      label: department.title,
      href: `/departments/${department.slug}`,
    })),
  },
  {
    heading: "Research",
    links: [
      { label: "Research Programme", href: "/research" },
      { label: "Publications", href: "/publications" },
      { label: "Iimboni Database", href: "/database" },
      { label: "The Lexicon", href: "/lexicon" },
      { label: "Documentary Method", href: "/database/method" },
      { label: "Foundations", href: "/foundations" },
    ],
  },
  {
    heading: "Institution",
    links: [
      { label: "The Institution", href: "/institution" },
      { label: "Standing Positions", href: "/positions" },
      { label: "The Framework", href: "/institution/framework" },
      { label: "The Founding Scholar", href: "/institution/imboni" },
      { label: "Institutional Record", href: "/institution/record" },
      { label: "Newsroom", href: "/newsroom" },
      { label: "Engage", href: "/engage" },
    ],
  },
];

export const MOTTO = "Unmasking African Truths";

/**
 * Redirects from the previous site.
 *
 * The list itself lives in redirects.mjs so that next.config.mjs can load it
 * before compilation. Re-exported here so that the site has one source.
 */
export { LEGACY_REDIRECTS } from "./redirects.mjs";
