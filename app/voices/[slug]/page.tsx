import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Portrait } from "@/components/Portrait";
import { getVoice, voicesByEra } from "@/lib/voices";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return voicesByEra().map((voice) => ({ slug: voice.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const voice = getVoice(slug);

  if (!voice) return { title: "Voice not found" };

  return {
    title: voice.name,
    description: voice.summary,
    openGraph: {
      title: `${voice.honorific} ${voice.name}`,
      description: voice.summary,
      type: "article",
    },
  };
}

export default async function VoicePage({ params }: Props) {
  const { slug } = await params;
  const voice = getVoice(slug);

  if (!voice) notFound();

  const ordered = voicesByEra();
  const index = ordered.findIndex((v) => v.slug === voice.slug);
  const previous = index > 0 ? ordered[index - 1] : undefined;
  const next = index < ordered.length - 1 ? ordered[index + 1] : undefined;
  const isOngoing = voice.slug === "madzibaba-wimbo";

  return (
    <>
      {/* ------------------------------------------------------------- Header */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-ink"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(209,58,72,0.22),transparent_60%)]"
        />

        <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-18">
          <nav aria-label="Breadcrumb" className="text-xs text-sand/60">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-cream">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link
                  href="/voices"
                  className="transition-colors hover:text-cream"
                >
                  The Voices
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-sand/85">{voice.name}</li>
            </ol>
          </nav>

          <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start lg:gap-14">
            <Portrait
              name={voice.name}
              image={voice.image}
              priority
              className="aspect-[4/5] w-40 rounded-sm border border-cream/15 sm:w-52 lg:w-full"
              sizes="(min-width: 1024px) 220px, 208px"
            />

            <div className="max-w-2xl">
              <p className="eyebrow text-ochre-soft">{voice.honorific}</p>
              <h1 className="mt-3 text-4xl leading-tight text-cream sm:text-5xl">
                {voice.name}
              </h1>
              <div className="rule-ochre mt-6" />
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wide text-sand/50">
                    Era
                  </dt>
                  <dd className="mt-0.5 text-sand/90">{voice.lifespan}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wide text-sand/50">
                    Origin
                  </dt>
                  <dd className="mt-0.5 text-sand/90">{voice.origin}</dd>
                </div>
              </dl>
              <p className="mt-7 text-lg leading-relaxed text-sand/85">
                {voice.standfirst}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------- Body */}
      <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
            <article className="prose-ahv max-w-2xl">
              {isOngoing && (
                <p className="mb-10 rounded-sm border-l-2 border-ochre bg-parchment px-5 py-4 text-sm text-ink-soft">
                  <strong className="font-semibold text-ink">
                    Research in progress.
                  </strong>{" "}
                  This profile is being expanded by the AHV research team. If you
                  hold knowledge of this prophet&rsquo;s life, please{" "}
                  <Link
                    href="/contact"
                    className="text-brand-700 underline underline-offset-4"
                  >
                    get in touch
                  </Link>
                  .
                </p>
              )}

              {voice.sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </section>
              ))}

              {voice.quote && <blockquote>{voice.quote}</blockquote>}

              {voice.references && voice.references.length > 0 && (
                <section>
                  <h3>References</h3>
                  <ul className="mt-3 space-y-2 text-sm text-ash">
                    {voice.references.map((reference) => (
                      <li key={reference}>{reference}</li>
                    ))}
                  </ul>
                </section>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-sm border border-sand/70 bg-parchment p-6">
                <h2 className="eyebrow">Contribute</h2>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  Do you know more about {voice.name.split(" ")[0]}? The research
                  team welcomes testimony, documents and photographs.
                </p>
                <Link
                  href="/contact"
                  className="mt-5 inline-flex text-sm font-semibold text-brand-700 transition-colors hover:text-brand-900"
                >
                  Share what you know
                </Link>
              </div>

              <nav aria-label="Other voices" className="text-sm">
                <h2 className="eyebrow">More voices</h2>
                <ul className="mt-4 space-y-3">
                  {ordered
                    .filter((v) => v.slug !== voice.slug)
                    .map((v) => (
                      <li key={v.slug}>
                        <Link
                          href={`/voices/${v.slug}`}
                          className="group block"
                        >
                          <span className="block text-ink-soft transition-colors group-hover:text-brand-700">
                            {v.name}
                          </span>
                          <span className="block text-xs text-ash/80">
                            {v.lifespan}
                          </span>
                        </Link>
                      </li>
                    ))}
                </ul>
              </nav>
            </aside>
          </div>

          {/* Prev / next */}
          <nav
            aria-label="Profile navigation"
            className="mt-16 grid gap-4 border-t border-sand/70 pt-8 sm:grid-cols-2"
          >
            {previous ? (
              <Link
                href={`/voices/${previous.slug}`}
                className="group rounded-sm border border-sand/70 bg-parchment p-5 transition-colors hover:border-brand-800/30"
              >
                <span className="text-xs uppercase tracking-wide text-ash">
                  ← Previous
                </span>
                <span className="mt-1.5 block font-display text-xl text-ink transition-colors group-hover:text-brand-700">
                  {previous.name}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link
                href={`/voices/${next.slug}`}
                className="group rounded-sm border border-sand/70 bg-parchment p-5 text-right transition-colors hover:border-brand-800/30 sm:col-start-2"
              >
                <span className="text-xs uppercase tracking-wide text-ash">
                  Next →
                </span>
                <span className="mt-1.5 block font-display text-xl text-ink transition-colors group-hover:text-brand-700">
                  {next.name}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </>
  );
}
