import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { FOUNDATIONS } from "@content/foundations";

export const metadata: Metadata = {
  title: "Foundations",
  description:
    "Where to begin, for readers new to African Indigenous Spirituality.",
};

export default function FoundationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Foundations"
        title="Where to begin"
        lede={FOUNDATIONS.lede}
        crumbs={[{ label: "Home", href: "/" }, { label: "Foundations" }]}
      />

      <Section tone="paper">
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
          {FOUNDATIONS.intro}
        </p>
      </Section>

      <Section tone="wash">
        <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
          The eight distinctions
        </h2>

        <ol className="mt-10 space-y-px">
          {FOUNDATIONS.distinctions.map((distinction) => (
            <li
              key={distinction.number}
              className="grid gap-x-8 gap-y-2 border-t border-rule py-5 sm:grid-cols-[60px_1fr]"
            >
              <span className="font-mono text-sm font-semibold text-brand-700">
                {distinction.number}
              </span>
              <span className="font-serif text-lg leading-relaxed text-ink">
                {distinction.body}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="paper">
        <h2 className="text-2xl leading-tight text-ink sm:text-3xl">Then read</h2>
        <ul className="mt-8 grid gap-x-10 gap-y-px sm:grid-cols-3">
          {FOUNDATIONS.thenRead.map((item) => (
            <li key={item.href} className="border-t-2 border-ink/85 pt-4">
              <Link href={item.href} className="group block">
                <span className="block font-serif text-lg text-ink transition-colors group-hover:text-brand-800">
                  {item.label}
                </span>
                <span className="mt-1.5 block font-serif text-sm text-ash">
                  {item.body}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
