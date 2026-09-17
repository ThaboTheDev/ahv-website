import type { ReactNode } from "react";
import { BrandMark } from "@/components/Logo";

/**
 * Compact interior-page banner: dark brand field with the mark as a watermark.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-ink"
      />
      <BrandMark
        idSuffix="page-hero"
        title=""
        className="pointer-events-none absolute -right-10 -top-10 hidden h-[150%] w-auto opacity-[0.11] lg:block"
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-ochre-soft">{eyebrow}</p>}
          <h1 className="mt-3 text-3xl leading-tight text-cream sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <div className="rule-ochre mt-6" />
          {intro && (
            <div className="mt-6 max-w-2xl text-base leading-relaxed text-sand/80 sm:text-lg">
              {intro}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
