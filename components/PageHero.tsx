import type { ReactNode } from "react";
import Link from "next/link";
import { BrandMark } from "@/components/Logo";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Interior-page banner: the dark brand field, the page title, and a
 * breadcrumb trail.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  meta,
  children,
}: {
  eyebrow?: string;
  title: string;
  lede?: ReactNode;
  crumbs?: Crumb[];
  /** Small key/value pairs shown beneath the lede, e.g. mandate and question. */
  meta?: { label: string; value: ReactNode }[];
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
        className="pointer-events-none absolute -right-20 -top-24 hidden h-[165%] w-auto opacity-[0.1] lg:block"
      />

      <div className="relative mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-[0.6875rem] text-rule-soft/55">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden>/</span>}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-paper"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-rule-soft/80">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && <p className="eyebrow text-ochre-soft">{eyebrow}</p>}
          <h1 className="mt-3 text-3xl leading-[1.15] text-paper sm:text-4xl">
            {title}
          </h1>
          <div className="mt-6 h-0.5 w-12 bg-brand-600" />
          {lede && (
            <div className="mt-6 max-w-2xl font-serif text-lg leading-relaxed text-rule-soft/85">
              {lede}
            </div>
          )}
        </div>

        {meta && meta.length > 0 && (
          <dl className="mt-10 grid gap-6 border-t border-rule-soft/20 pt-6 sm:grid-cols-2 lg:grid-cols-3">
            {meta.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-rule-soft/85">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {children}
      </div>
    </section>
  );
}
