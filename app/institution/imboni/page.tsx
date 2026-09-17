import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Prose, Section, Split } from "@/components/Section";
import { Quotation } from "@/components/Source";
import {
  FOUNDING_SCHOLAR_EDITORIAL_RULE,
  FOUNDING_SCHOLAR,
  PUBLIC_RECORD,
} from "@content/institution";

export const metadata: Metadata = {
  title: "The Founding Scholar",
  description:
    "HSRM Imboni Dr uZwi-Lezwe Radebe, iNkosi yamaKhosi oMoya, Founding Scholar of African Hidden Voices.",
};

export default function FoundingScholarPage() {
  return (
    <>
      <PageHero
        eyebrow="The Founding Scholar"
        title={FOUNDING_SCHOLAR.title}
        lede={FOUNDING_SCHOLAR.subtitle}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "The Institution", href: "/institution" },
          { label: "The Founding Scholar" },
        ]}
      />

      <Section tone="paper">
        <Prose paragraphs={[FOUNDING_SCHOLAR.lede]} lead />
      </Section>

      <Section tone="wash">
        <Split
          eyebrow="The office of the Imboni"
          title={FOUNDING_SCHOLAR.officeOfImboni.heading}
        >
          <Prose paragraphs={FOUNDING_SCHOLAR.officeOfImboni.body} />
          <Quotation
            className="mt-8"
            text={FOUNDING_SCHOLAR.officeOfImboni.pullQuote}
            attribution="HSRM Imboni Dr uZwi-Lezwe Radebe"
          />
        </Split>
      </Section>

      <Section tone="paper">
        <Split eyebrow="The office" title={FOUNDING_SCHOLAR.theOffice.heading}>
          <Prose paragraphs={FOUNDING_SCHOLAR.theOffice.body} />
          <p className="mt-6 font-mono text-xs leading-relaxed text-ash">
            The office of ubukhosi boMoya is set out in full in the{" "}
            <Link href="/lexicon#ubukhosi-bomoya" className="link-brand">
              Lexicon
            </Link>{" "}
            and in{" "}
            <Link href="/positions#authority-is-conferred" className="link-brand">
              Position 09
            </Link>
            .
          </p>
        </Split>
      </Section>

      {/* Public record */}
      <Section tone="wash">
        <header className="max-w-2xl">
          <p className="eyebrow">The public record</p>
          <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
            The public record
          </h2>
          <p className="mt-5 font-mono text-xs leading-relaxed text-ash">
            {FOUNDING_SCHOLAR_EDITORIAL_RULE}
          </p>
        </header>

        <ol className="mt-10">
          {PUBLIC_RECORD.map((entry) => (
            <li
              key={`${entry.date}-${entry.body.slice(0, 24)}`}
              className="grid gap-x-8 gap-y-2 border-t border-rule py-5 sm:grid-cols-[160px_1fr]"
            >
              <span className="font-mono text-xs font-semibold text-brand-700">
                {entry.date}
              </span>
              <span className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {entry.body}
              </span>
            </li>
          ))}
        </ol>

        <div className="mt-10 max-w-2xl border-l-2 border-ochre bg-paper px-5 py-4">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre">
            Note on the record
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            The conferring institution gives the honorary doctorate as January
            2026; a secondary account gives 2025. The date above follows the
            conferring institution. External sources occasionally render the
            name as Dr Samuel Radebe; on AHV pages the forms of address given
            here are used.
          </p>
        </div>
      </Section>
    </>
  );
}
