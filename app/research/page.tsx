import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, Split } from "@/components/Section";
import {
  CONFERENCE_PAPERS,
  WORKING_PAPER_SERIES,
} from "@content/research";
import { DEPARTMENTS } from "@content/departments";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Working papers, conference papers and research method from the six departments.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Working papers, conference papers and method"
        lede="This page holds AHV's research output. Books are listed under Publications; this is where the papers are."
        crumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
      />

      <Section tone="paper">
        <p className="max-w-2xl font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
          Every item carries its department, its status, its date and its
          author. Work in preparation is listed as in preparation and is not
          linked as though it were published. AHV would rather show a short list
          of real papers than a long one that cannot be opened.
        </p>
      </Section>

      {/* Working papers */}
      <Section tone="wash">
        <Split eyebrow="Working papers" title="Working papers">
          <p className="font-mono text-xs text-ash">
            Numbering: {WORKING_PAPER_SERIES.prefix}-[year]-[nn]
          </p>
          <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {WORKING_PAPER_SERIES.note}
          </p>
        </Split>
      </Section>

      {/* Conference papers */}
      <Section tone="paper">
        <Split
          eyebrow="Conference papers"
          title="Conference papers"
        >
          <p className="font-serif text-[1.0625rem] leading-relaxed text-ash">
            These exist and are documented.
          </p>

          <ol className="mt-8 space-y-8">
            {CONFERENCE_PAPERS.map((paper) => (
              <li key={paper.title} className="border-t border-rule pt-5">
                <h3 className="font-serif text-lg leading-snug text-ink">
                  {paper.title}
                </h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-ash">
                  {paper.author} · African Hidden Voices · {paper.venue} ·{" "}
                  {paper.date}
                </p>
              </li>
            ))}
          </ol>
        </Split>
      </Section>

      {/* Departments */}
      <Section tone="wash">
        <Split eyebrow="By department" title="Research by department">
          <ul className="grid gap-x-10 gap-y-px sm:grid-cols-2">
            {DEPARTMENTS.map((department) => (
              <li key={department.slug} className="border-t border-rule">
                <Link
                  href={`/departments/${department.slug}`}
                  className="group flex items-baseline justify-between gap-4 py-3.5"
                >
                  <span className="font-serif text-[0.9375rem] text-ink-soft transition-colors group-hover:text-brand-800">
                    {department.title}
                  </span>
                  <span aria-hidden className="text-ochre">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Split>
      </Section>
    </>
  );
}
