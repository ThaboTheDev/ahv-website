import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Prose, Section, Split } from "@/components/Section";
import {
  COMMITMENTS,
  INSTITUTION_PAGE,
  STRUCTURE,
} from "@content/institution";
import { DEPARTMENTS } from "@content/departments";

export const metadata: Metadata = {
  title: "The Institution",
  description:
    "What African Hidden Voices is, what it was established to do, and the authority under which it works.",
};

export default function InstitutionPage() {
  const sections = [
    INSTITUTION_PAGE.whatAhvIs,
    INSTITUTION_PAGE.whyItExists,
    INSTITUTION_PAGE.howItBegan,
  ];

  return (
    <>
      <PageHero
        eyebrow="The Institution"
        title="An institution, and the word is chosen with care"
        lede={INSTITUTION_PAGE.lede}
        crumbs={[{ label: "Home", href: "/" }, { label: "The Institution" }]}
        meta={[
          { label: "Established", value: "2009, Johannesburg" },
          { label: "Departments", value: String(DEPARTMENTS.length) },
          { label: "Standing", value: "Independent research institution" },
        ]}
      />

      {sections.map((section, i) => (
        <Section key={section.heading} tone={i % 2 === 0 ? "paper" : "wash"}>
          <Split eyebrow={i === 0 ? "The institution" : undefined} title={section.heading}>
            <Prose paragraphs={section.body} />
          </Split>
        </Section>
      ))}

      {/* The four commitments */}
      <Section tone="paper">
        <header className="max-w-2xl">
          <p className="eyebrow">Commitments</p>
          <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
            What it holds
          </h2>
          <p className="mt-5 font-serif text-[1.0625rem] leading-relaxed text-ash">
            Four commitments govern the work and are not negotiable.
          </p>
        </header>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {COMMITMENTS.map((commitment) => (
            <article
              key={commitment.number}
              className="border-t-2 border-ink/85 pt-5"
            >
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                {commitment.number}
              </p>
              <h3 className="mt-2 font-serif text-xl leading-snug text-ink">
                {commitment.title}
              </h3>
              <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {commitment.body}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Structure */}
      <Section tone="wash">
        <header className="max-w-2xl">
          <p className="eyebrow">Structure</p>
          <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
            The structure
          </h2>
        </header>

        <ul className="mt-10 grid gap-x-10 gap-y-px sm:grid-cols-2">
          {STRUCTURE.map((item) => (
            <li key={item.title} className="border-t border-rule">
              {item.href ? (
                <Link
                  href={item.href}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span>
                    <span className="block font-serif text-lg text-ink transition-colors group-hover:text-brand-800">
                      {item.title}
                    </span>
                    <span className="mt-1 block text-sm text-ash">
                      {item.body}
                    </span>
                  </span>
                  <span aria-hidden className="text-ochre">
                    →
                  </span>
                </Link>
              ) : (
                <div className="py-4">
                  <span className="block font-serif text-lg text-ink">
                    {item.title}
                  </span>
                  <span className="mt-1 block text-sm text-ash">
                    {item.body}
                  </span>
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/institution/framework" className="link-brand font-mono text-sm">
            The Framework
          </Link>
          <Link href="/institution/imboni" className="link-brand font-mono text-sm">
            The Founding Scholar
          </Link>
          <Link href="/institution/record" className="link-brand font-mono text-sm">
            The Institutional Record
          </Link>
        </div>
      </Section>
    </>
  );
}
