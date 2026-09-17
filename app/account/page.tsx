import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { RESEARCHER_ACCESS as RA } from "@content/support";

export const metadata: Metadata = {
  title: "Researcher Access",
  description:
    "Access to the parts of the archive held under conditions, and to records under verification.",
  // Not a public entry point: see the note on the page.
  robots: { index: false, follow: true },
};

export default function ResearcherAccessPage() {
  return (
    <>
      <PageHero
        eyebrow="Researcher Access"
        title={RA.title}
        lede={RA.lede}
        crumbs={[{ label: "Home", href: "/" }, { label: "Researcher Access" }]}
      />

      <Section tone="paper">
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
          {RA.notAMemberArea}
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          <div className="border-t-2 border-verdigris pt-5">
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-verdigris">
              {RA.open.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {RA.open.items.map((item) => (
                <li
                  key={item}
                  className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-2 border-ink/85 pt-5">
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
              {RA.restricted.title}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {RA.restricted.items.map((item) => (
                <li
                  key={item}
                  className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-rule pt-8 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
              {RA.whoMayRegister.title}
            </h2>
            <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {RA.whoMayRegister.body}
            </p>
          </div>
          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
              {RA.undertaking.title}
            </h2>
            <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {RA.undertaking.body}
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-2xl border-l-2 border-ochre pl-5">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre">
            Registration is not yet open
          </p>
          <p className="mt-2 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            Accounts are not yet issued, so this page states what access will
            involve rather than offering a form that cannot be completed. It is
            deliberately not linked from the navigation until registration
            opens. Named researchers and community members who need material
            now should write to{" "}
            <a href="mailto:research@africanhiddenvoices.org" className="link-brand">
              research@africanhiddenvoices.org
            </a>
            .
          </p>
        </div>
      </Section>
    </>
  );
}
