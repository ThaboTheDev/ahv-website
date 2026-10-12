/**
 * House-style validation for the AHV Editorial & Research Administration Desk.
 *
 * Mirrors the rules in packages/content/HOUSE-STYLE.md and
 * scripts/check-house-style.mjs so editors receive immediate feedback before
 * publishing an essay, paper, database record or announcement.
 */

export interface StyleIssue {
  kind: "error" | "warning";
  message: string;
  suggestion: string;
}

const FORBIDDEN_RULES: { pattern: RegExp; instead: string }[] = [
  {
    pattern: /\bAfrican Traditional Religion\b/gi,
    instead: "African Indigenous Spirituality, or Ezomoya Zakwantu",
  },
  {
    pattern: /\bATR\b/g,
    instead: "AIS",
  },
  {
    pattern: /\bnew religious movements?\b/gi,
    instead: "institution (unless citing the Cambridge series title)",
  },
  {
    pattern: /\bwitch ?doctors?\b/gi,
    instead: "healer, or the specific office in its own term",
  },
  {
    pattern: /\bancestor worship\b/gi,
    instead: "honouring, or ukuphahla",
  },
  {
    pattern: /\bHoly Spirit\b/g,
    instead: "umoya",
  },
  {
    pattern: /\btribes?\b/gi,
    instead: "nation, people, or clan where a clan is meant",
  },
  {
    pattern: /\bcults?\b/gi,
    instead: "institution",
  },
  {
    pattern: /\bsuperstition\b/gi,
    instead: "the specific practice, named",
  },
  {
    pattern: /\b(award-winning|world-class|prestigious|renowned)\b/gi,
    instead: "state the record and let the reader conclude",
  },
];

/**
 * Inspect a string or structured object for house-style violations.
 */
export function checkHouseStyleText(text: string): StyleIssue[] {
  const issues: StyleIssue[] = [];

  if (/[\u2014\u2013]/.test(text)) {
    issues.push({
      kind: "error",
      message: "Contains an em dash or en dash (forbidden by AHV house style).",
      suggestion: "Use a comma, colon, semicolon, 'to' for ranges, or a new sentence.",
    });
  }

  for (const rule of FORBIDDEN_RULES) {
    const match = text.match(rule.pattern);
    if (match) {
      issues.push({
        kind: "warning",
        message: `Restricted term "${match[0]}" detected.`,
        suggestion: `Write instead: ${rule.instead}.`,
      });
    }
  }

  return issues;
}

/**
 * Replace any em dashes or en dashes in a string with house-style punctuation.
 */
export function sanitiseDashes(text: string): string {
  return text
    .replace(/(\d+)\s*[\u2014\u2013]\s*(\d+)/g, "$1 to $2")
    .replace(/\s*[\u2014\u2013]\s*/g, ", ");
}

/**
 * Create a URL-safe slug from a title.
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
