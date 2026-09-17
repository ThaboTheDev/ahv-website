import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { SUBMIT_A_VOICE } from "@content/support";

export const metadata: Metadata = {
  title: "Submit a Voice",
  description:
    "If your family or community holds the memory of an Imboni whose work is not in the record, AHV would like to document it.",
};

export default function SubmitVoicePage() {
  return (
    <>
      <PageHero
        eyebrow="The Iimboni Database"
        title={SUBMIT_A_VOICE.title}
        lede={SUBMIT_A_VOICE.body}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Iimboni Database", href: "/database" },
          { label: "Submit a Voice" },
        ]}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          <div>
            <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
              Tell us what you know
            </h2>
            <p className="mt-4 max-w-xl font-serif text-[1.0625rem] leading-relaxed text-ash">
              Every field is required. Nothing is published before it is
              returned to you, and nothing is published that you have not agreed
              to.
            </p>

            <div className="mt-8">
              <SubmissionForm
                fields={SUBMIT_A_VOICE.fields}
                to="database@africanhiddenvoices.org"
                subject="Iimboni Database: submission from the website"
                submitLabel="Send to the research team"
                assurance={SUBMIT_A_VOICE.assurance}
              />
            </div>
          </div>

          <aside className="space-y-8">
            <div className="border-t-2 border-ink/85 pt-5">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                The documentary method
              </h2>
              <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                Locate, document, corroborate, return. The same four stages
                apply to every record in the database.
              </p>
              <a
                href="/database/method"
                className="mt-4 inline-block font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4"
              >
                Read the method
              </a>
            </div>

            <div className="border-t border-rule pt-5">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                What we will not do
              </h2>
              <ul className="mt-3 space-y-2.5 font-serif text-sm leading-relaxed text-ink-soft">
                <li>Publish material given in confidence.</li>
                <li>Present a claim as established because it is repeated.</li>
                <li>
                  Resolve disputes between communities about lineage or
                  standing.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
