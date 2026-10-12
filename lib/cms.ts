/**
 * Institutional CMS store for the AHV website.
 *
 * Seeds from packages/content (the canonical baseline) and persists runtime
 * additions and edits to data/cms-store.json so changes made in the /admin
 * Editorial & Research Administration Desk appear immediately across the site.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { BLOG_POSTS, type BlogPost } from "@content/blog";
import {
  CONFERENCES,
  CONFERENCE_PAPERS,
  WORKING_PAPERS,
  type Conference,
  type ConferencePaper,
  type WorkingPaper,
} from "@content/research";
import {
  IN_PREPARATION,
  PUBLICATIONS,
  type ForthcomingPublication,
  type Publication,
} from "@content/publications";
import { DATABASE_RECORDS, type DatabaseRecord } from "@content/database";
import { ANNOUNCEMENTS, type Announcement } from "@content/newsroom";
import { LEXICON, type LexiconEntry } from "@content/lexicon";
import { POSITIONS, type Position } from "@content/positions";
import { DEPARTMENTS } from "@content/departments";

export interface CmsStore {
  blogPosts: BlogPost[];
  workingPapers: WorkingPaper[];
  conferencePapers: ConferencePaper[];
  conferences: Conference[];
  publications: Publication[];
  forthcomingPublications: ForthcomingPublication[];
  databaseRecords: DatabaseRecord[];
  announcements: Announcement[];
  lexicon: LexiconEntry[];
  positions: Position[];
  updatedAt: string;
}

const STORE_PATH = resolve(process.cwd(), "data/cms-store.json");

export function getDefaultCmsStore(): CmsStore {
  return {
    blogPosts: structuredClone(BLOG_POSTS),
    workingPapers: structuredClone(WORKING_PAPERS),
    conferencePapers: structuredClone(CONFERENCE_PAPERS),
    conferences: structuredClone(CONFERENCES),
    publications: structuredClone(PUBLICATIONS),
    forthcomingPublications: structuredClone(IN_PREPARATION),
    databaseRecords: structuredClone(DATABASE_RECORDS),
    announcements: structuredClone(ANNOUNCEMENTS),
    lexicon: structuredClone(LEXICON),
    positions: structuredClone(POSITIONS),
    updatedAt: new Date().toISOString(),
  };
}

export function getCmsStore(): CmsStore {
  const defaults = getDefaultCmsStore();

  if (!existsSync(STORE_PATH)) {
    return defaults;
  }

  try {
    const raw = readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Partial<CmsStore>;
    return {
      blogPosts: Array.isArray(parsed.blogPosts)
        ? parsed.blogPosts
        : defaults.blogPosts,
      workingPapers: Array.isArray(parsed.workingPapers)
        ? parsed.workingPapers
        : defaults.workingPapers,
      conferencePapers: Array.isArray(parsed.conferencePapers)
        ? parsed.conferencePapers
        : defaults.conferencePapers,
      conferences: Array.isArray(parsed.conferences)
        ? parsed.conferences
        : defaults.conferences,
      publications: Array.isArray(parsed.publications)
        ? parsed.publications
        : defaults.publications,
      forthcomingPublications: Array.isArray(parsed.forthcomingPublications)
        ? parsed.forthcomingPublications
        : defaults.forthcomingPublications,
      databaseRecords: Array.isArray(parsed.databaseRecords)
        ? parsed.databaseRecords
        : defaults.databaseRecords,
      announcements: Array.isArray(parsed.announcements)
        ? parsed.announcements
        : defaults.announcements,
      lexicon: Array.isArray(parsed.lexicon)
        ? parsed.lexicon
        : defaults.lexicon,
      positions: Array.isArray(parsed.positions)
        ? parsed.positions
        : defaults.positions,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : defaults.updatedAt,
    };
  } catch {
    return defaults;
  }
}

export function saveCmsStore(store: CmsStore): CmsStore {
  const next: CmsStore = {
    ...store,
    updatedAt: new Date().toISOString(),
  };
  mkdirSync(dirname(STORE_PATH), { recursive: true });
  writeFileSync(STORE_PATH, JSON.stringify(next, null, 2), "utf8");
  return next;
}

export function resetCmsStore(): CmsStore {
  const defaults = getDefaultCmsStore();
  return saveCmsStore(defaults);
}

export function getLiveTickerFigures(store: CmsStore = getCmsStore()) {
  const countries = new Set(
    store.databaseRecords.map((record) => record.country),
  );

  return [
    {
      value: store.databaseRecords.length,
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
      value: store.positions.length,
      label: "positions, with the counter-case",
      href: "/positions",
      note: "objection and answer",
    },
    {
      value: store.lexicon.length,
      label: "terms restored",
      href: "/lexicon",
      note: "defined from within",
    },
    {
      value: store.conferences.length,
      label: "conference appearances",
      href: "/institution/record",
      note: "with sources",
    },
    {
      value: store.blogPosts.length,
      label: "essays published",
      href: "/blog",
      note: "six departments",
    },
  ];
}
