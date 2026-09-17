import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Quotation, SourceLine } from "@/components/Source";
import {
  INSTITUTIONAL_RECORD,
  RECORD_INTRO,
  RECORD_LEDE,
} from "@content/institution";
import { CONFERENCES } from "@content/research";

export const metadata: Metadata = {
  title: "The Institutional Record",
  description:
    "Recognition, partnerships and appearances, with sources. Every item can be checked.",
};

export default function RecordPage() {
  return (
    <>
      <PageHero
        eyebrow="The Institution"
        title="The institutional record"
        lede={RECORD_LEDE}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "The Institution", href: "/institution" },
          { label: "The Institutional Record" },
        ]}
      />

      <Section tone="paper">
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
          {RECORD_INTRO}
        </p>
      </Section>

      {INSTITUTIONAL_RECORD.map((group, i) => (
        <Section key={group.title} tone={i % 2 === 0 ? "wash" : "paper"}>
          <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
            {group.title}
          </h2>
          <div className="mt-10 space-y-10">
            {group.items.map((item) => (
              <article
                key={item.heading}
                className="border-t border-rule pt-6"
              >
                <p className="font-mono text-xs font-semibold text-brand-700">
                  {item.date}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-snug text-ink">
                  {item.heading}
                </h3>
                <p className="mt-3 max-w-3xl font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                  {item.body}
                </p>
                {item.quote && (
                  <Quotation
                    className="mt-6"
                    text={item.quote.text}
                    attribution={item.quote.attribution}
                  />
                )}
                {item.source && (
                  <SourceLine label={item.source.label} href={item.source.href} />
                )}
              </article>
            ))}
          </div>
        </Section>
      ))}

      {/* Conference record */}
      <Section tone="wash">
        <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
          Conference record
        </h2>
        <div className="mt-10 space-y-10">
          {CONFERENCES.map((conference) => (
            <article
              key={conference.title}
              className="border-t border-rule pt-6"
            >
              <p className="font-mono text-xs font-semibold text-brand-700">
                {conference.date}
              </p>
              <h3 className="mt-2 font-serif text-xl leading-snug text-ink">
                {conference.title}
              </h3>
              <p className="mt-3 max-w-3xl font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {conference.body}
              </p>
              {conference.source && (
                <SourceLine
                  label={conference.source.label}
                  href={conference.source.href}
                />
              )}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
