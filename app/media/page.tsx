import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { DIALOGUE_SERIES } from "@content/media";

export const metadata: Metadata = {
  title: "The Dialogue Series",
  description:
    "#UnmaskingAfricanTruths. Long-form recorded dialogue on African Indigenous Spirituality.",
};

export default function MediaPage() {
  return (
    <>
      <PageHero
        eyebrow="The AHV Dialogue Series"
        title={DIALOGUE_SERIES.hashtag}
        lede={DIALOGUE_SERIES.lede}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "The Dialogue Series" },
        ]}
      />

      <Section tone="paper">
        <div className="max-w-2xl space-y-6">
          <p className="font-serif text-lg leading-relaxed text-ink-soft">
            {DIALOGUE_SERIES.body}
          </p>

          <div className="border-l-2 border-ochre pl-5">
            <p className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {DIALOGUE_SERIES.status}
            </p>
          </div>

          <div className="border-t border-rule pt-6">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
              Channel
            </p>
            <a
              href={DIALOGUE_SERIES.channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-brand mt-2 inline-block font-serif text-lg"
            >
              {DIALOGUE_SERIES.channel.label}
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
