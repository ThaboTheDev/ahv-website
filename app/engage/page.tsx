import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { ENGAGE_CHANNELS, ENGAGE_INTRO, ENGAGE_LEDE } from "@content/engage";

export const metadata: Metadata = {
  title: "Engage",
  description:
    "AHV works with universities, research councils, government bodies, spiritual institutions and interdisciplinary research sectors.",
};

export default function EngagePage() {
  return (
    <>
      <PageHero
        eyebrow="Engage"
        title="Partnership here means the frame is shared"
        lede={ENGAGE_LEDE}
        crumbs={[{ label: "Home", href: "/" }, { label: "Engage" }]}
      />

      <Section tone="paper">
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
          {ENGAGE_INTRO}
        </p>

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          {ENGAGE_CHANNELS.map((channel) => (
            <li key={channel.slug} className="border-t-2 border-ink/85 pt-5">
              <Link href={`/engage/${channel.slug}`} className="group block">
                <h2 className="font-serif text-xl leading-snug text-ink transition-colors group-hover:text-brand-800">
                  {channel.title}
                </h2>
                <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ash">
                  {channel.summary}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-brand-700">
                  Enquire
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
