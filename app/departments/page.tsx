import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { DepartmentCard } from "@/components/Cards";
import { DEPARTMENTS } from "@content/departments";

export const metadata: Metadata = {
  title: "Departments",
  description:
    "Six departments, holding African Indigenous Spirituality across the disciplines that govern modern life.",
};

export default function DepartmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Departments"
        title="Six departments. One order."
        lede="Six departments, holding African Indigenous Spirituality across the disciplines that govern modern life."
        crumbs={[{ label: "Home", href: "/" }, { label: "Departments" }]}
      />

      <Section tone="paper">
        <div className="max-w-2xl space-y-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
          <p className="lead">
            The departments are not subject areas that AHV happens to cover.
            They are the systematic examination of a single problem.
          </p>
          <p>
            Every discipline that studies human beings begins after a concession
            has already been made without examination: that the human being can
            be adequately studied without first understanding spirit. Economics
            concedes it and studies interest. Governance concedes it and studies
            power. Philosophy concedes it and studies reason. Knowledge systems
            concede it and study transmission. Sociology concedes it and studies
            behaviour. The natural sciences concede it and study matter.
          </p>
          <p>
            AHV does not concede it. Each department takes one of those
            disciplines, restores what was conceded, and works out what the
            discipline looks like when spirit is placed where it belongs, which
            is first.
          </p>
          <p>
            The order they follow: Spirit, then Revelation, then Practice, then
            Knowledge Systems. Each department states where in that order its
            material sits, because that is what determines how it may be
            studied.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((department) => (
            <DepartmentCard key={department.slug} department={department} />
          ))}
        </div>

        <p className="mt-12 max-w-2xl border-t border-rule pt-6 font-serif text-[1.0625rem] leading-relaxed text-ash">
          AHV welcomes joint appointments, visiting researchers and
          co-supervised work in every department.{" "}
          <Link href="/engage/universities" className="link-brand">
            Academic partnership
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
