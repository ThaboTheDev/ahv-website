import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { RESEARCH_DIGEST } from "@content/media";

export const metadata: Metadata = {
  title: "The Research Digest",
  description:
    "Monthly. New research, new database records, and institutional notes.",
};

export default function NewsletterPage() {
  return (
    <>
      <PageHero
        eyebrow="Research Digest"
        title={RESEARCH_DIGEST.title}
        lede={RESEARCH_DIGEST.lede}
        crumbs={[{ label: "Home", href: "/" }, { label: "Research Digest" }]}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,400px)] lg:gap-16">
          <div>
            <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
              What arrives
            </h2>

            <dl className="mt-8 space-y-px">
              {RESEARCH_DIGEST.streams.map((stream) => (
                <div
                  key={stream.name}
                  className="grid gap-x-8 gap-y-2 border-t border-rule py-5 sm:grid-cols-[200px_1fr]"
                >
                  <div>
                    <dt className="font-serif text-lg text-ink">
                      {stream.name}
                    </dt>
                    <dd className="font-mono text-xs text-ash">
                      {stream.cadence}
                    </dd>
                  </div>
                  <dd className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                    {stream.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <aside>
            <div className="border-t-2 border-ink/85 pt-5">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                Subscribe
              </h2>
              <p className="mt-3 font-serif text-sm leading-relaxed text-ink-soft">
                Send your name and address, and the digest will reach you from
                the first issue.
              </p>
              <div className="mt-6">
                <SubmissionForm
                  fields={["Your name", "Email"]}
                  to="office@africanhiddenvoices.org"
                  subject="Research Digest: subscribe"
                  submitLabel="Subscribe"
                />
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* Past issues */}
      <Section tone="wash">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="eyebrow">Past issues</p>
            <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
              Past issues
            </h2>
          </div>
          <p className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {RESEARCH_DIGEST.archiveNote}
          </p>
        </div>
      </Section>
    </>
  );
}
