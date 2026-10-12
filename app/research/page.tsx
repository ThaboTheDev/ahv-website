import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section, Split } from "@/components/Section";
import { MediaFigure, SourceLine } from "@/components/Source";
import { getCmsStore } from "@/lib/cms";
import { WORKING_PAPER_SERIES } from "@content/research";
import { DEPARTMENTS, getDepartment } from "@content/departments";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Research",
  description:
    "Working papers, conference papers and research method from the six departments.",
  path: "/research",
});

export default function ResearchPage() {
  const { workingPapers, conferencePapers } = getCmsStore();

  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Working papers, conference papers and method"
        lede="This page holds AHV's research output. Books are listed under Publications; this is where the papers are."
        crumbs={[{ label: "Home", href: "/" }, { label: "Research" }]}
      />

      <Section tone="paper">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="max-w-2xl font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            Every item carries its department, its status, its date and its
            author. Work in preparation is listed as in preparation and is not
            linked as though it were published. AHV would rather show a short list
            of real papers than a long one that cannot be opened.
          </p>
          <Link
            href="/admin"
            className="border border-rule bg-wash px-3.5 py-2 font-mono text-xs uppercase tracking-[0.12em] text-brand-700 transition-colors hover:border-brand-700"
          >
            + Manage research in Admin →
          </Link>
        </div>
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

          {workingPapers.length > 0 && (
            <ol className="mt-8 space-y-8">
              {workingPapers.map((paper) => {
                const department = getDepartment(paper.department);
                return (
                  <li key={paper.id} className="border-t border-rule pt-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-brand-700">
                        {paper.id}
                      </span>
                      <span
                        className={`border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] ${
                          paper.status === "Published"
                            ? "border-verdigris text-verdigris"
                            : "border-ochre text-ochre"
                        }`}
                      >
                        {paper.status}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-lg leading-snug text-ink">
                      {paper.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-relaxed text-ash">
                      {paper.author}
                      {department ? (
                        <>
                          {" · "}
                          <Link
                            href={`/departments/${department.slug}`}
                            className="underline decoration-rule decoration-1 underline-offset-2 hover:text-brand-700"
                          >
                            {department.title}
                          </Link>
                        </>
                      ) : null}
                      {" · "}
                      {paper.date}
                    </p>
                    <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                      {paper.abstract}
                    </p>
                    {paper.image && (
                      <MediaFigure
                        image={paper.image}
                        className="mt-4 max-w-xl"
                      />
                    )}
                    {paper.pdfUrl && paper.status === "Published" && (
                      <SourceLine label="Download working paper (PDF)" href={paper.pdfUrl} />
                    )}
                  </li>
                );
              })}
            </ol>
          )}
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
            {conferencePapers.map((paper) => (
              <li key={paper.title} className="border-t border-rule pt-5">
                <h3 className="font-serif text-lg leading-snug text-ink">
                  {paper.title}
                </h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-ash">
                  {paper.author} · African Hidden Voices · {paper.venue} ·{" "}
                  {paper.date}
                </p>
                {paper.image && (
                  <MediaFigure image={paper.image} className="mt-4 max-w-xl" />
                )}
                {paper.source && (
                  <SourceLine
                    label={paper.source.label}
                    href={paper.source.href}
                  />
                )}
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
