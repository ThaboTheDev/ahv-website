import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "About",
  description:
    "The origins of the African Hidden Voices emanate from the divine and visionary inspiration of Imboni Dr. uZwi-Lezwe Radebe.",
};

const PILLARS = [
  {
    title: "The Vision",
    body: "To retrace the steps and works of our gallant IImboni, kings and spiritual leaders, with a view to resuscitating the authenticity of their gifts — past and present within the continent.",
  },
  {
    title: "The Platform",
    body: "Imboni uZwi-Lezwe Radebe established a dialogue platform called the AHV to assure that the voices of these gallant IImboni are no longer suppressed, and that their interaction is revived to create an even stronger hold.",
  },
  {
    title: "The Research Team",
    body: "A team of young warriors — the African Hidden Voices research team — was assembled and tasked to search every nook and cranny within Southern Africa for the forgotten IImboni.",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Retracing the works of Africa's spiritual leaders"
        intro="The African Hidden Voices exists so that the IImboni — the seers and spiritual guides of this continent — are honoured, recorded and heard."
      />

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="prose-ahv max-w-2xl">
            <p className="lead">
              The origins of the African Hidden Voices (AHV) emanate from the
              divine and visionary inspiration of{" "}
              <strong>Imboni Dr. uZwi-Lezwe Radebe</strong>. The objective of
              this vision is to retrace the steps and works of our gallant
              IImboni, kings and spiritual leaders with a view to resuscitating
              the authenticity of their gifts — past and present within the
              continent.
            </p>
            <p>
              It is of course these IImboni who were and are still being given
              visions by The Creator to charter the future of our motherland.
              Unfortunately, foreign influences and the passage of time drew a
              cloud of doubt and uncertainty over our African trail blazers —
              IImboni irrespective of the period.
            </p>
            <p>
              It is during this time that Imboni uZwi-Lezwe Radebe established a
              dialogue platform called the AHV to assure that the voices of
              these gallant IImboni are no longer suppressed and that their
              interaction is revived to create an even stronger hold, so that
              their advisory role to our government in South Africa — and by
              extension the continent — is restored.
            </p>
            <p>
              To ensure that this visionary inspiration is brought to bear,
              Imboni Dr. uZwi-Lezwe Radebe established a team of young warriors
              called the African Hidden Voices research team and tasked them to
              search every nook and cranny within Southern Africa for the
              forgotten IImboni. The zealous African Hidden Voices research team
              came to the party and are ready to assemble IImboni under one roof
              with a view to give them honour and praise.
            </p>
          </div>

          <aside className="lg:pt-2">
            <div className="rounded-sm border border-sand/70 bg-parchment p-7">
              <h2 className="font-wordmark text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
                In short
              </h2>
              <dl className="mt-5 space-y-5 text-sm">
                <div>
                  <dt className="font-semibold text-ink">Founder</dt>
                  <dd className="mt-1 text-ash">
                    Imboni Dr. uZwi-Lezwe Radebe
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Founded as</dt>
                  <dd className="mt-1 text-ash">
                    A dialogue platform for previously unheard African voices
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Based in</dt>
                  <dd className="mt-1 text-ash">
                    Marshalltown, Johannesburg, South Africa
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Scope</dt>
                  <dd className="mt-1 text-ash">
                    Southern Africa and the wider continent
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-ink">Affiliation</dt>
                  <dd className="mt-1 text-ash">B Radebe Foundation</dd>
                </div>
              </dl>
              <Link
                href="/voices"
                className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
              >
                See the archive
                <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5">
                  <path
                    d="M1 8h13M9 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </aside>
        </div>
      </Section>

      <Section
        tone="parchment"
        eyebrow="What we do"
        title="Three movements, one purpose"
      >
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.title}
              className="relative rounded-sm border border-sand/70 bg-cream p-7"
            >
              <span
                aria-hidden
                className="font-wordmark text-5xl font-semibold text-brand-100"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl leading-snug text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
