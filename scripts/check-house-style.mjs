/**
 * House-style check.
 *
 * The terminology and mechanics rules in the copy document are binding on
 * every page. This script enforces the ones that can be checked mechanically,
 * so that the rules are applied by the build rather than remembered by
 * whoever is writing.
 *
 *   node scripts/check-house-style.mjs
 *
 * Hard failures (exit code 1):
 *   - em dashes and en dashes, which house style forbids
 *
 * Warnings (reported, exit code 0):
 *   - forbidden terms, which may appear inside a direct quotation from a
 *     source. Each warning is listed for review rather than blocked.
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const SCAN_DIRS = ["app", "components", "lib", "packages/content"];
const EXTENSIONS = new Set([".ts", ".tsx", ".mjs", ".js", ".md"]);

/** Terms the house style forbids, with the replacement required. */
const FORBIDDEN = [
  { pattern: /\bAfrican Traditional Religion\b/gi, instead: "African Indigenous Spirituality, or Ezomoya Zakwantu" },
  { pattern: /\bATR\b/g, instead: "AIS" },
  { pattern: /\bnew religious movements?\b/gi, instead: "institution" },
  { pattern: /\bwitch ?doctors?\b/gi, instead: "healer, or the specific office in its own term" },
  { pattern: /\bancestor worship\b/gi, instead: "honouring, or ukuphahla" },
  { pattern: /\bHoly Spirit\b/g, instead: "umoya" },
  { pattern: /\btribes?\b/gi, instead: "nation, people, or clan where a clan is meant" },
  { pattern: /\bcults?\b/gi, instead: "institution" },
  { pattern: /\bsuperstition\b/gi, instead: "the specific practice, named" },
  { pattern: /\baward-winning\b/gi, instead: "state the record" },
  { pattern: /\bworld-class\b/gi, instead: "state the record" },
  { pattern: /\bprestigious\b/gi, instead: "state the record" },
  { pattern: /\brenowned\b/gi, instead: "state the record" },
];

/**
 * Lines where a forbidden term is legitimate: a quotation from the colonial
 * record, a source title, or a scholarly label being named in order to be
 * corrected. Matched case-insensitively against the whole line.
 */
const ALLOWLIST = [
  // Naming the term in order to correct it, which the Lexicon does throughout.
  /Not ancestor worship\. Africa honours/,
  /A healer is not a witchdoctor/,
  /Umoya is not the Holy Spirit/,
  /reclassification of spiritual authority as superstition/,
  // The published series title of the Cambridge University Press volume.
  /Elements in New Religious Movements/,
  // Quotations from, and titles in, the colonial and scholarly record.
  /named in the colonial and mission record/i,
  /Permitted only inside a direct quotation/i,
  /external labels failed to name/i,
  /The imported word arrived with the missions/i,
  /Prophets and Spiritual Guides/i,
  /comparison of prophets and spiritual guides/i,
  /African Initiated Churches/,
  /invention and construction of African religion/i,
  /anthropology of African religion/i,
  /studied comparatively as religious-system/i,
];

/**
 * Files exempt from the forbidden-term check, because they exist to name the
 * terms. The em-dash check still applies to them.
 */
const TERM_EXEMPT = [/HOUSE-STYLE\.md$/];

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry === ".next" || entry.startsWith(".")) {
      continue;
    }
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      walk(full, files);
    } else if (EXTENSIONS.has(extname(entry))) {
      files.push(full);
    }
  }
  return files;
}

const files = SCAN_DIRS.flatMap((dir) => {
  try {
    return walk(resolve(root, dir));
  } catch {
    return [];
  }
});

const hardFailures = [];
const warnings = [];

for (const file of files) {
  const rel = relative(root, file);
  const lines = readFileSync(file, "utf8").split("\n");

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;

    // Em dash and en dash. Both are forbidden by house style.
    const dash = line.match(/[\u2014\u2013]/g);
    if (dash) {
      hardFailures.push({ at, rule: "no em dashes", line: line.trim() });
    }

    // The rulebook itself names the forbidden terms, so it is checked for
    // dashes only.
    if (TERM_EXEMPT.some((exempt) => exempt.test(rel))) return;

    for (const { pattern, instead } of FORBIDDEN) {
      const matches = line.match(pattern);
      if (!matches) continue;
      if (ALLOWLIST.some((allowed) => allowed.test(line))) continue;

      warnings.push({
        at,
        term: matches[0],
        instead,
        line: line.trim(),
      });
    }
  });
}

console.log(
  `House style: checked ${files.length} files across ${SCAN_DIRS.length} directories.`,
);

if (hardFailures.length > 0) {
  console.error(`\n✗ ${hardFailures.length} hard failure(s):\n`);
  for (const failure of hardFailures) {
    console.error(`  ${failure.at}  [${failure.rule}]`);
    console.error(`    ${failure.line.slice(0, 120)}`);
  }
}

if (warnings.length > 0) {
  console.log(`\n! ${warnings.length} term(s) to review:\n`);
  for (const warning of warnings) {
    console.log(`  ${warning.at}  "${warning.term}" → ${warning.instead}`);
    console.log(`    ${warning.line.slice(0, 120)}`);
  }
}

if (hardFailures.length === 0 && warnings.length === 0) {
  console.log("\n✓ No em dashes, and no forbidden terms outside a quotation.");
}

process.exit(hardFailures.length > 0 ? 1 : 0);
