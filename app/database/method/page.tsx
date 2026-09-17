import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { DATABASE_LIMITS, DOCUMENTARY_METHOD } from "@content/database";

export const metadata: Metadata = {
  title: "Documentary Method",
  description: "How each Iimboni Database record is made.",
};

export default function DocumentaryMethodPage() {
  return (
    <>
      <PageHero
        eyebrow="The Iimboni Database"
        title="How each record is made"
        lede="Four stages, applied to every record, and a plain statement of what this database does not do."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Iimboni Database", href: "/database" },
          { label: "Documentary Method" },
        ]}
      />

      <Section tone="paper">
        <ol className="space-y-10">
          {DOCUMENTARY_METHOD.map((stage, i) => (
            <li
              key={stage.title}
              className="grid gap-x-10 gap-y-3 border-t-2 border-ink/85 pt-6 sm:grid-cols-[140px_1fr]"
            >
              <div>
                <span className="font-mono text-xs text-brand-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-serif text-xl leading-snug text-ink">
                  {stage.title}
                </h2>
              </div>
              <p className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {stage.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="wash">
        <div className="max-w-2xl">
          <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
            What this database does not do
          </h2>
          <ul className="mt-8 space-y-4">
            {DATABASE_LIMITS.map((limit) => (
              <li
                key={limit}
                className="flex gap-4 border-t border-rule pt-4 font-serif text-[1.0625rem] leading-relaxed text-ink-soft"
              >
                <span aria-hidden className="text-brand-700">
                  ·
                </span>
                {limit}
              </li>
            ))}
          </ul>

          <p className="mt-10 font-serif text-[1.0625rem] leading-relaxed text-ash">
            Every record carries the same fields, and the fields are shown even
            when empty, because an empty field is itself information. The field
            stating what is not established is compulsory.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <Link href="/database" className="link-brand font-mono text-sm">
              The records
            </Link>
            <Link
              href="/database/submit"
              className="link-brand font-mono text-sm"
            >
              Submit a voice
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
