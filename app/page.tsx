import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { Section } from "@/components/Section";
import { VoiceCard } from "@/components/VoiceCard";
import { voicesByEra } from "@/lib/voices";
import { CONTACT } from "@/lib/site";

const PILLARS = [
  {
    title: "Retrace",
    body: "Our researchers search every corner of Southern Africa for the IImboni, kings and spiritual leaders whose stories were suppressed, misrecorded or forgotten.",
  },
  {
    title: "Restore",
    body: "We document their gifts, visions and teachings in their own terms — freeing the record from the cloud of doubt cast over Africa's trail blazers by foreign influence and the passage of time.",
  },
  {
    title: "Revive",
    body: "We convene these voices in one another's company, reviving their dialogue so that their advisory role to government and society can be felt once more.",
  },
] as const;

const EPISODES = [
  {
    title: "What informs Afrocentric indigenous spiritual guiders?",
    href: "https://www.mixcloud.com/AfricanHiddenVoices/what-informs-afrocentric-indigenous-spiritual-guiders-part-2/",
  },
  {
    title: "What informs Eurocentric religious leaders?",
    href: "https://www.mixcloud.com/AfricanHiddenVoices/what-informs-afrocentric-indigenous-spiritual-guiders-part-1/",
  },
] as const;

export default function HomePage() {
  const voices = voicesByEra();

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-ink"
        />
        {/* Oversized watermark of the mark */}
        <BrandMark
          idSuffix="hero-watermark"
          title=""
          className="pointer-events-none absolute -right-16 top-1/2 hidden h-[135%] w-auto -translate-y-1/2 opacity-[0.13] lg:block"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(209,58,72,0.22),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <BrandMark
              idSuffix="hero-mark"
              title="African Hidden Voices"
              className="h-24 w-auto lg:hidden"
            />
            <p className="eyebrow text-ochre-soft lg:mt-0">
              Inyoni ezindiza — the birds take flight
            </p>
            <h1 className="mt-4 text-4xl leading-[1.08] text-cream sm:text-5xl lg:text-6xl">
              The voices that were{" "}
              <span className="italic text-brand-300">hidden</span> will be
              heard.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-sand/85">
              African Hidden Voices retraces the steps and works of Africa&rsquo;s
              IImboni, kings and spiritual leaders — past and present — so that
              their gifts are honoured and their counsel reaches the continent
              once more.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/voices"
                className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-white"
              >
                Meet the voices
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream/60 hover:bg-cream/10"
              >
                Our story
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Mission */}
      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div>
            <p className="eyebrow">Origins</p>
            <h2 className="mt-3 text-3xl leading-tight sm:text-4xl">
              A vision to give honour where honour was withheld
            </h2>
            <div className="rule-ochre mt-6" />
            <div className="prose-ahv mt-7">
              <p>
                The origins of the African Hidden Voices emanate from the divine
                and visionary inspiration of{" "}
                <strong>Imboni Dr. uZwi-Lezwe Radebe</strong>. The objective of
                this vision is to retrace the steps and works of our gallant
                IImboni, kings and spiritual leaders with a view to
                resuscitating the authenticity of their gifts — past and present
                within the continent.
              </p>
              <p>
                It is these IImboni who were, and still are, given visions by
                The Creator to charter the future of our motherland.
                Unfortunately, foreign influences and the passage of time drew a
                cloud of doubt and uncertainty over our African trail blazers.
              </p>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
            >
              Read the full account
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

          <div className="grid gap-px overflow-hidden rounded-sm bg-sand/70 sm:grid-cols-2 lg:grid-cols-1">
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="bg-parchment p-6 sm:p-7">
                <h3 className="font-wordmark text-sm font-semibold uppercase tracking-[0.16em] text-brand-700">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* --------------------------------------------------------- The Voices */}
      <Section
        tone="parchment"
        eyebrow="The Archive"
        title="Voices no longer suppressed"
        intro="From Lake Malawi to the streets of Johannesburg, these are the prophets and prophetesses whose vision shaped — and continues to shape — the spiritual identity of the continent."
      >
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {voices.slice(0, 3).map((voice, i) => (
            <VoiceCard key={voice.slug} voice={voice} priority={i === 0} />
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/voices"
            className="inline-flex items-center gap-2 rounded-full border border-brand-800/25 px-6 py-3 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-800/60 hover:bg-brand-800/5"
          >
            Explore all {voices.length} profiles
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
      </Section>

      {/* ------------------------------------------------------------ Podcast */}
      <Section
        tone="light"
        eyebrow="Listen"
        title="Dialogues from the platform"
        intro="AHV began as a dialogue platform — a place where previously unheard African views on social, political, religious and economic matters could be aired. Our recorded conversations continue that work."
      >
        <ul className="mt-12 grid gap-6 md:grid-cols-2">
          {EPISODES.map((episode) => (
            <li
              key={episode.href}
              className="flex flex-col justify-between gap-6 rounded-sm border border-sand/70 bg-parchment p-7"
            >
              <div className="flex items-start gap-4">
                <span
                  aria-hidden
                  className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-800 text-cream"
                >
                  <svg viewBox="0 0 16 16" className="h-4 w-4">
                    <path d="M4 2.5v11l9-5.5-9-5.5z" fill="currentColor" />
                  </svg>
                </span>
                <div>
                  <p className="eyebrow">Episode</p>
                  <h3 className="mt-1.5 text-xl leading-snug text-ink">
                    {episode.title}
                  </h3>
                </div>
              </div>
              <a
                href={episode.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
              >
                Listen on Mixcloud
                <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5">
                  <path
                    d="M5 11L11 5M11 5H6M11 5v5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---------------------------------------------------------- Final CTA */}
      <section className="relative isolate overflow-hidden bg-brand-950 px-5 py-16 sm:px-8 sm:py-20">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_100%,rgba(209,58,72,0.3),transparent_65%)]"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-3xl leading-tight text-cream sm:text-4xl">
              Do you carry a story that has gone unheard?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sand/80">
              If you know of an Imboni, a spiritual leader or a piece of our
              history that is at risk of being lost, write to us. The research
              team follows up on every lead.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <a
              href={`mailto:${CONTACT.archiveEmail}`}
              className="rounded-full bg-cream px-6 py-3 text-sm font-semibold text-brand-900 transition-colors hover:bg-white"
            >
              tell-us@africanhiddenvoices.co.za
            </a>
            <Link
              href="/contact"
              className="rounded-full border border-cream/30 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:border-cream/60 hover:bg-cream/10"
            >
              Contact details
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
