/**
 * Generates AHV-Final-Page-Copy.md from packages/content.
 *
 * The site's copy document is generated from the files the website renders,
 * so it cannot fall out of step with the site. Regenerate with:
 *
 *   npm run export:copy
 */

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const content = await import(resolve(root, "packages/content/index.ts"));

const {
  INSTITUTION,
  STANDING_LINE,
  PRIMARY_NAV,
  UTILITY_NAV,
  CONTACTS,
  MOTTO,
  LEGACY_REDIRECTS,
  tickerFigures,
  HOME,
  INSTITUTION_PAGE,
  COMMITMENTS,
  STRUCTURE,
  FRAMEWORK,
  FOUNDING_SCHOLAR,
  PUBLIC_RECORD,
  FOUNDING_SCHOLAR_EDITORIAL_RULE,
  INSTITUTIONAL_RECORD,
  DEPARTMENTS,
  POSITIONS,
  LEXICON,
  CONFERENCE_PAPERS,
  CONFERENCES,
  WORKING_PAPER_SERIES,
  PUBLICATIONS,
  INDEPENDENT_STUDY,
  CITATIONS,
  IN_PREPARATION,
  RECORD_NOTE,
  DATABASE_RECORDS,
  DOCUMENTARY_METHOD,
  DATABASE_LIMITS,
  FOUNDATIONS,
  ENGAGE_CHANNELS,
  ENGAGE_LEDE,
  ENGAGE_INTRO,
  ANNOUNCEMENTS,
  MEDIA_KIT,
  RESEARCH_NOTES_NOTE,
  DIALOGUE_SERIES,
  RESEARCH_DIGEST,
  SUPPORT,
  SUBMIT_A_VOICE,
} = content;

const out = [];

const h = (level, text) => out.push(`${"#".repeat(level)} ${text}`, "");
const p = (text) => out.push(text, "");
const bullets = (items) => {
  for (const item of items) out.push(`- ${item}`);
  out.push("");
};
const label = (name, value) => out.push(`**${name}:** ${value}`, "");
const quote = (text, attribution) => out.push(`> ${text}`, `> *${attribution}*`, "");

/* ---------------------------------------------------------------- */

h(1, `${INSTITUTION.name}`);
h(2, "Final website copy, every page");

p(
  "This document is generated from packages/content, the site's own source of truth. It is not a separate draft, and it cannot fall out of step with the live site. Regenerate it with `npm run export:copy` after any change to the copy.",
);

h(3, "The institution");
label("Name", INSTITUTION.name);
label("Short form", INSTITUTION.shortName);
label("Description", INSTITUTION.description);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "Global elements");
p("These appear on every page.");
h(2, "Standing line");
out.push(`> ${STANDING_LINE}`, "");
h(2, "Primary navigation");
p(PRIMARY_NAV.map((item) => item.label).join(" · "));
h(2, "Utility navigation");
p(UTILITY_NAV.map((item) => item.label).join(" · "));
h(2, "Header ticker");
label("Label", "The record, as it stands");
for (const figure of tickerFigures()) {
  out.push(`- **${figure.value}** ${figure.label} (${figure.note})`);
}
out.push("");
p(
  "Every figure is derived from the site's own content, not typed by hand, and each links to the page that proves it.",
);
h(2, "Contact");
for (const contact of CONTACTS) {
  out.push(`- ${contact.label}: ${contact.address}`);
}
out.push("");
h(2, "Redirects from the old site");
for (const redirect of LEGACY_REDIRECTS) {
  out.push(`- \`${redirect.source}\` → \`${redirect.destination}\``);
}
out.push("");

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "1. Home");
p("`/`");
label("Eyebrow", HOME.eyebrow);
h(2, HOME.hero.title);
p(HOME.hero.body);
p(`Buttons: ${HOME.hero.buttons.map((b) => b.label).join(" · ")}`);

h(2, HOME.corePosition.title);
p(HOME.corePosition.lead);
for (const paragraph of HOME.corePosition.body) p(paragraph);
quote(HOME.corePosition.quote.text, HOME.corePosition.quote.attribution);

h(2, HOME.taughtRevealed.title);
p(HOME.taughtRevealed.lead);
for (const paragraph of HOME.taughtRevealed.body) p(paragraph);
p(`Link: ${HOME.taughtRevealed.link.label}`);

h(2, HOME.departmentsSection.title);
p(HOME.departmentsSection.lead);
for (const department of DEPARTMENTS) {
  out.push(
    `- **${department.number} ${department.title}.** ${department.mandate}`,
  );
}
out.push("");

h(2, HOME.positionsSection.title);
for (const paragraph of HOME.positionsSection.body) p(paragraph);
for (const position of POSITIONS) {
  out.push(`- **${position.number}.** ${position.title}`);
}
out.push("");

h(2, HOME.naming.title);
for (const paragraph of HOME.naming.body) p(paragraph);

h(2, HOME.founding.title);
for (const paragraph of HOME.founding.body) p(paragraph);

h(2, HOME.archive.title);
for (const paragraph of HOME.archive.body) p(paragraph);
p(
  `Live figures: ${DATABASE_RECORDS.length} records published · ${new Set(DATABASE_RECORDS.map((r) => r.country)).size} countries · ${DATABASE_RECORDS.filter((r) => r.status === "Under verification").length} under verification`,
);

h(2, HOME.outside.title);
for (const paragraph of HOME.outside.body) p(paragraph);

h(2, HOME.dialogue.title);
p(HOME.dialogue.body);

h(2, HOME.workWith.title);
p(HOME.workWith.body);
p(HOME.workWith.channels.map((c) => c.label).join(" · "));

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "2. The Institution");
p("`/institution`");
p(INSTITUTION_PAGE.lede);
for (const section of [
  INSTITUTION_PAGE.whatAhvIs,
  INSTITUTION_PAGE.whyItExists,
  INSTITUTION_PAGE.howItBegan,
]) {
  h(2, section.heading);
  for (const paragraph of section.body) p(paragraph);
}
h(2, "What it holds");
p("Four commitments govern the work and are not negotiable.");
for (const commitment of COMMITMENTS) {
  h(3, `${commitment.number}. ${commitment.title}`);
  p(commitment.body);
}
h(2, "The structure");
for (const item of STRUCTURE) {
  out.push(`- **${item.title}.** ${item.body}`);
}
out.push("");

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "3. The Framework");
p("`/institution/framework`");
p(
  "How African Hidden Voices knows what it knows, stated in full, so that it can be examined.",
);
for (const section of FRAMEWORK) {
  h(2, `${section.number}. ${section.title}`);
  if (section.intro) p(section.intro);
  for (const subsection of section.subsections) {
    h(3, subsection.title);
    p(subsection.body);
  }
  if (section.outro) p(section.outro);
}

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "4. The Founding Scholar");
p("`/institution/imboni`");
label("Title", FOUNDING_SCHOLAR.title);
label("Subtitle", FOUNDING_SCHOLAR.subtitle);
p(FOUNDING_SCHOLAR.lede);

h(2, FOUNDING_SCHOLAR.officeOfImboni.heading);
for (const paragraph of FOUNDING_SCHOLAR.officeOfImboni.body) p(paragraph);
quote(
  FOUNDING_SCHOLAR.officeOfImboni.pullQuote,
  "HSRM Imboni Dr uZwi-Lezwe Radebe",
);

h(2, FOUNDING_SCHOLAR.theOffice.heading);
for (const paragraph of FOUNDING_SCHOLAR.theOffice.body) p(paragraph);

h(2, "The public record");
for (const entry of PUBLIC_RECORD) {
  out.push(`**${entry.date}.** ${entry.body}`, "");
}
p(`Editorial rule for this page: ${FOUNDING_SCHOLAR_EDITORIAL_RULE}`);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "5. The Institutional Record");
p("`/institution/record`");
p(
  "Recognition, partnerships and appearances, with sources. Every item on this page can be checked, and the links are provided so that it is.",
);
for (const group of INSTITUTIONAL_RECORD) {
  h(2, group.title);
  for (const item of group.items) {
    h(3, item.date);
    out.push(`**${item.heading}**`, "");
    p(item.body);
    if (item.quote) quote(item.quote.text, item.quote.attribution);
    if (item.source) p(`Source: ${item.source.label}, ${item.source.href}`);
  }
}
h(2, "Conference record");
for (const conference of CONFERENCES) {
  h(3, conference.date);
  out.push(`**${conference.title}**`, "");
  p(conference.body);
  if (conference.source) p(`Source: ${conference.source.label}, ${conference.source.href}`);
}

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "6. The Departments");
p("`/departments`");
p(
  "Six departments, holding African Indigenous Spirituality across the disciplines that govern modern life.",
);

for (const [index, department] of DEPARTMENTS.entries()) {
  out.push("---", "");
  // The document numbers departments 7 to 12; the pages label them 01 to 06.
  h(1, `${index + 7}. ${department.title}`);
  p(`\`/departments/${department.slug}\` · Department ${department.number}`);
  label("Mandate", department.mandate);
  label("The governing question", `*${department.governingQuestion}*`);
  label("Position in the order", department.orderPosition);

  h(2, "Opening");
  for (const paragraph of department.opening) p(paragraph);

  h(2, "The position");
  for (const block of department.position) {
    if (block.heading) h(3, block.heading);
    p(block.body);
  }

  h(2, department.slug === "science" ? "Research units" : "Research programmes");
  for (const [i, programme] of department.programmes.entries()) {
    h(3, `${i + 1}. ${programme.title}`);
    p(programme.body);
  }

  h(2, "Method");
  p(department.method);
  h(2, "What this department engages");
  p(department.engages);
  h(2, "Vocabulary");
  p(department.vocabulary.join(" · "));
  h(2, "Current work");
  if (department.currentWork.length > 0) {
    bullets(department.currentWork);
  } else {
    p(
      "No work in progress is listed publicly. This department lists real items, or nothing.",
    );
  }
}

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "13. Standing Positions");
p("`/positions`");
p(
  "Ten positions African Hidden Voices holds, each with the objection against it stated at full strength.",
);
for (const position of POSITIONS) {
  h(2, `${position.number}. ${position.title}`);
  label("The position", position.position);
  label("The ground", position.ground);
  label("The objection, at full strength", position.objection);
  label("AHV's answer", position.answer);
  label("Department", position.department);
}
h(2, "How to disagree with this");
p(
  "AHV would rather be engaged than agreed with. Scholars who hold a different position on any of these are invited to say so in writing, and AHV will publish a serious reply alongside the position it concerns.",
);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "14. The Lexicon");
p("`/lexicon`");
p(
  "The restored vocabulary of African Indigenous Spirituality, defined from within.",
);
h(2, "The terms");
for (const entry of LEXICON) {
  h(3, entry.term);
  out.push(`*${entry.gloss}*`, "");
  p(entry.definition);
  label("What it is not", entry.whatItIsNot);
}
const pending = LEXICON.filter((entry) => entry.confirmationPending);
if (pending.length > 0) {
  p(
    `${pending.length} entries marked for confirmation carry a definition drawn from the published corpus that AHV has not yet settled in its final published form. They are shown rather than hidden, because a lexicon that conceals its unfinished entries cannot be trusted on its finished ones.`,
  );
}

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "15. Research");
p("`/research`");
h(2, "Working papers");
p(`Numbering: ${WORKING_PAPER_SERIES.prefix}-[year]-[nn]`);
p(WORKING_PAPER_SERIES.note);
h(2, "Conference papers");
p("These exist and are documented.");
for (const paper of CONFERENCE_PAPERS) {
  out.push(`**${paper.title}**`, "");
  p(`${paper.author}, African Hidden Voices · ${paper.venue} · ${paper.date}`);
}

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "16. Publications");
p("`/publications`");
h(2, "AHV publications");
for (const book of PUBLICATIONS) {
  h(3, book.title);
  p(
    `${book.publisher}, ${book.place}, ${book.year} · ISBN ${book.isbn}`,
  );
  if (book.byline) p(book.byline);
  p(book.body);
}
h(2, "Independent scholarship on The Revelation Spiritual Home");
h(3, INDEPENDENT_STUDY.title);
p(INDEPENDENT_STUDY.authors);
p(
  `${INDEPENDENT_STUDY.series} · ${INDEPENDENT_STUDY.publisher}, ${INDEPENDENT_STUDY.year}`,
);
p(`DOI ${INDEPENDENT_STUDY.doi} · ISBN ${INDEPENDENT_STUDY.isbn}`);
p(`Italian edition: ${INDEPENDENT_STUDY.italianEdition}`);
p(INDEPENDENT_STUDY.body);
h(3, "How AHV is cited in it");
for (const citation of CITATIONS) {
  quote(citation.quote, citation.source);
}
h(2, "In preparation");
for (const item of IN_PREPARATION) {
  h(3, item.title);
  p(item.author);
  p(item.body);
}
h(2, "A note on the record");
p(RECORD_NOTE);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "17. The Iimboni Database");
p("`/database`");
p(
  "A research record of Africa's spiritual authorities: Iimboni, spiritual kings, healers, guiders and founders of institutions, documented from oral testimony, archival evidence and field research.",
);
p("They were not forgotten. They were removed.");
h(2, "The records currently held");
for (const record of DATABASE_RECORDS) {
  h(3, record.name);
  p(
    `${record.office} · ${record.lifespan} · ${record.place} · ${record.region} · ${record.status}`,
  );
  p(`Named in the colonial and mission record as: ${record.colonialLabel}`);
  p(record.summary);
  label("What is not established", record.notEstablished);
}

out.push("---", "");
h(1, "18. Documentary Method");
p("`/database/method`");
p("How each record is made.");
for (const stage of DOCUMENTARY_METHOD) {
  h(2, stage.title);
  p(stage.body);
}
h(2, "What this database does not do");
bullets(DATABASE_LIMITS);

out.push("---", "");
h(1, "19. Submit a Voice");
p("`/database/submit`");
h(2, SUBMIT_A_VOICE.title);
p(SUBMIT_A_VOICE.body);
p(SUBMIT_A_VOICE.assurance);
p(`Form fields: ${SUBMIT_A_VOICE.fields.join(", ")}`);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "20. Foundations");
p("`/foundations`");
p(FOUNDATIONS.lede);
p(FOUNDATIONS.intro);
h(2, "The eight distinctions");
for (const distinction of FOUNDATIONS.distinctions) {
  out.push(`**${distinction.number}.** ${distinction.body}`, "");
}
h(2, "Then read");
for (const item of FOUNDATIONS.thenRead) {
  out.push(`- ${item.label}, ${item.body}`);
}
out.push("");

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "21. Engage");
p("`/engage`");
p(ENGAGE_LEDE);
p(ENGAGE_INTRO);
for (const channel of ENGAGE_CHANNELS) {
  h(2, channel.title);
  p(`\`/engage/${channel.slug}\``);
  for (const paragraph of channel.body) p(paragraph);
  if (channel.precedent) p(`Documented precedent: ${channel.precedent}`);
  p(`Form fields: ${channel.fields.join(", ")}`);
}

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "22. Newsroom");
p("`/newsroom`");
p(
  "Announcements, research notes and institutional appearances.",
);
h(2, "Announcements");
for (const item of ANNOUNCEMENTS) {
  h(3, `${item.date} · ${item.category}`);
  out.push(`**${item.title}**`, "");
  p(item.body);
  if (item.source) p(`Source: ${item.source.label}, ${item.source.href}`);
}
h(2, "Research notes");
p(RESEARCH_NOTES_NOTE);
h(2, MEDIA_KIT.title);
p(MEDIA_KIT.body);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "23. The AHV Dialogue Series");
p("`/media`");
h(2, DIALOGUE_SERIES.hashtag);
p(DIALOGUE_SERIES.lede);
p(DIALOGUE_SERIES.body);
p(DIALOGUE_SERIES.status);
p(`Channel: ${DIALOGUE_SERIES.channel.label}, ${DIALOGUE_SERIES.channel.href}`);

out.push("---", "");
h(1, "24. The Research Digest");
p("`/newsletter`");
p(RESEARCH_DIGEST.lede);
for (const stream of RESEARCH_DIGEST.streams) {
  out.push(`**${stream.name}** (${stream.cadence}). ${stream.body}`, "");
}
h(2, "Past issues");
p(RESEARCH_DIGEST.archiveNote);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "25. Support the Research");
p("`/support`");
p(SUPPORT.lede);
p(SUPPORT.intro);
quote(SUPPORT.quote.text, SUPPORT.quote.attribution);
h(2, "What support funds");
bullets(SUPPORT.tiers.map((tier) => `**${tier.amount}.** ${tier.body}`));
h(2, "Institutional identity");
p(
  "The following must be confirmed and published before this page takes a single payment. A donation page without them will not be used by any institution and should not be used by the public.",
);
bullets(SUPPORT.requiredBeforePayments);
h(2, SUPPORT.majorGiving.title);
p(SUPPORT.majorGiving.body);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "26. Researcher Access");
p("`/account`");
p(
  "Access to the parts of the archive that are not open: material held under conditions set by the families and communities who gave it, and records under verification.",
);
p(
  "DEVELOPER NOTE: registration is not yet open, so the route is not linked from the navigation. The page states what access will involve rather than offering a form that cannot be completed.",
);

/* ---------------------------------------------------------------- */

out.push("---", "");
h(1, "Appendix. Terminology and house style");
p("Binding on every page, every release, every paper and every piece of correspondence.");
h(2, "The naming rule");
p("**izwi lilandela umoya.** The word follows the spirit.");
p(
  "African spiritual terms are never defined through religious or Christian etymology, because that method is the misrepresentation AHV exists to correct.",
);
h(2, "Mechanics");
p(
  "South African English. No em dashes. Dates as 15 May 2026. Numbers: spell out one to nine in prose, figures for ten and above. Currency: R1 000. Indigenous terms are italic on first use on a page.",
);
p(
  "Enforced mechanically by `npm run check:style`, which fails the build on an em dash and lists any forbidden term outside a quotation.",
);

/* ---------------------------------------------------------------- */

out.push("---", "");
p(
  `Generated from packages/content on ${new Date().toISOString().slice(0, 10)}. ${MOTTO}.`,
);

const markdown = out.join("\n").replace(/\n{3,}/g, "\n\n");
writeFileSync(resolve(root, "AHV-Final-Page-Copy.generated.md"), markdown, "utf8");

console.log(
  `Wrote AHV-Final-Page-Copy.generated.md (${markdown.length} characters, ${markdown.split("\n").length} lines)`,
);
