import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Prose, Section, Split } from "@/components/Section";
import { ProgrammeList } from "@/components/Cards";
import {
  COMPARATIVE_PROGRAMME,
  DEPARTMENTS,
  getDepartment,
} from "@content/departments";
import { POSITIONS } from "@content/positions";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return DEPARTMENTS.map((department) => ({ slug: department.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const department = getDepartment(slug);

  if (!department) return { title: "Department not found" };

  return {
    title: department.title,
    description: department.mandate,
  };
}

export default async function DepartmentPage({ params }: Props) {
  const { slug } = await params;
  const department = getDepartment(slug);

  if (!department) notFound();

  // Positions that name this department as their home.
  const relatedPositions = POSITIONS.filter(
    (position) => position.department === department.slug,
  );

  return (
    <>
      <PageHero
        eyebrow={`Department ${department.number}`}
        title={department.title}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Departments", href: "/departments" },
          { label: department.shortTitle },
        ]}
        meta={[
          { label: "Mandate", value: department.mandate },
          {
            label: "The governing question",
            value: <em className="italic">{department.governingQuestion}</em>,
          },
          { label: "Position in the order", value: department.orderPosition },
        ]}
      />

      <Section tone="paper">
        <Prose paragraphs={department.opening} lead />
      </Section>

      <Section tone="wash">
        <Split eyebrow="The position" title="The position">
          <div className="space-y-8">
            {department.position.map((block) => (
              <div key={block.heading ?? block.body.slice(0, 32)}>
                {block.heading && (
                  <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                    {block.heading}
                  </h3>
                )}
                <p className="mt-2.5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </Split>
      </Section>

      <Section tone="paper">
        <Split
          eyebrow="Research programmes"
          title={
            department.slug === "science"
              ? "Research units and the method"
              : "Research programmes"
          }
        >
          <ProgrammeList programmes={department.programmes} />
        </Split>
      </Section>

      {/* The Science Division's method and comparative programme */}
      {department.slug === "science" && (
        <>
          <Section tone="wash" size="tight">
            <Split eyebrow="Method" title="The method, in full">
              <p className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {department.method}
              </p>
            </Split>
          </Section>

          <Section tone="paper">
            <header className="max-w-2xl">
              <p className="eyebrow">The comparative programme</p>
              <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
                {COMPARATIVE_PROGRAMME.title}
              </h2>
              <p className="mt-5 font-serif text-[1.0625rem] leading-relaxed text-ash">
                {COMPARATIVE_PROGRAMME.intro}
              </p>
            </header>

            <p className="mt-8 max-w-2xl font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {COMPARATIVE_PROGRAMME.premise}
            </p>

            <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {COMPARATIVE_PROGRAMME.cases.map((item) => (
                <div key={item.title} className="border-t-2 border-ink/85 pt-5">
                  <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                  <p className="mt-2 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 max-w-2xl border-l-2 border-ochre pl-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {COMPARATIVE_PROGRAMME.conclusion}
            </p>
          </Section>
        </>
      )}

      {/* Method, engagement, vocabulary */}
      <Section tone="wash">
        <dl className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {department.slug !== "science" && (
            <div>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                Method
              </dt>
              <dd className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {department.method}
              </dd>
            </div>
          )}

          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
              What this department engages
            </dt>
            <dd className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {department.engages}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
              Vocabulary
            </dt>
            <dd className="mt-3 flex flex-wrap gap-x-2 gap-y-2">
              {department.vocabulary.map((term) => (
                <span
                  key={term}
                  className="border border-rule px-2 py-1 font-mono text-xs text-ink-soft"
                >
                  {term}
                </span>
              ))}
            </dd>
          </div>

          <div>
            <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
              Current work
            </dt>
            <dd className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {department.currentWork.length > 0 ? (
                <ul className="space-y-3">
                  {department.currentWork.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                "No work in progress is listed publicly. This department lists real items, or nothing."
              )}
            </dd>
          </div>
        </dl>

        {relatedPositions.length > 0 && (
          <div className="mt-12 border-t border-rule pt-8">
            <h2 className="eyebrow">Positions held by this department</h2>
            <ul className="mt-4 grid gap-x-10 gap-y-2 sm:grid-cols-2">
              {relatedPositions.map((position) => (
                <li key={position.slug}>
                  <Link
                    href={`/positions#${position.slug}`}
                    className="group flex items-baseline gap-3 py-1.5"
                  >
                    <span className="font-mono text-xs text-brand-700">
                      {position.number}
                    </span>
                    <span className="font-serif text-[0.9375rem] text-ink-soft transition-colors group-hover:text-brand-800">
                      {position.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>
    </>
  );
}
