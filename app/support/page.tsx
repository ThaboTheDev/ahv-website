import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { Quotation } from "@/components/Source";
import { SUPPORT } from "@content/support";

export const metadata: Metadata = {
  title: "Support the Research",
  description:
    "Field documentation, archival research and publication are the cost of restoring a record that was deliberately closed.",
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Support"
        title="Support the research"
        lede={SUPPORT.lede}
        crumbs={[{ label: "Home", href: "/" }, { label: "Support" }]}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <p className="max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
              {SUPPORT.intro}
            </p>

            <Quotation
              className="mt-10"
              text={SUPPORT.quote.text}
              attribution={SUPPORT.quote.attribution}
            />

            <h2 className="mt-14 text-2xl leading-tight text-ink sm:text-3xl">
              What support funds
            </h2>

            <ul className="mt-8 space-y-px">
              {SUPPORT.tiers.map((tier) => (
                <li
                  key={tier.amount}
                  className="grid gap-x-8 gap-y-1 border-t border-rule py-4 sm:grid-cols-[120px_1fr]"
                >
                  <span className="font-mono text-sm font-semibold text-brand-700">
                    {tier.amount}
                  </span>
                  <span className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                    {tier.body}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside>
            <div className="border-l-2 border-ochre bg-wash px-6 py-6">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre">
                Before this page takes a payment
              </h2>
              <p className="mt-4 font-serif text-sm leading-relaxed text-ink-soft">
                The following must be confirmed and published. A donation page
                without them will not be used by any institution and should not
                be used by the public.
              </p>
              <ul className="mt-5 space-y-2.5">
                {SUPPORT.requiredBeforePayments.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 font-serif text-sm leading-relaxed text-ink-soft"
                  >
                    <span aria-hidden className="text-ochre">
                      ·
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 font-mono text-xs leading-relaxed text-ash">
                No payment route is offered on this page until these are in
                place.
              </p>
            </div>

            <div className="mt-8 border-t-2 border-ink/85 pt-5">
              <h2 className="font-serif text-xl leading-snug text-ink">
                {SUPPORT.majorGiving.title}
              </h2>
              <p className="mt-3 font-serif text-sm leading-relaxed text-ink-soft">
                {SUPPORT.majorGiving.body}
              </p>
              <a
                href="mailto:office@africanhiddenvoices.org"
                className="link-brand mt-4 inline-block font-mono text-xs"
              >
                office@africanhiddenvoices.org
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
