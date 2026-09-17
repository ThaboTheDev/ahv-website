import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { SubmissionForm } from "@/components/SubmissionForm";
import { ENGAGE_CHANNELS, getEngageChannel } from "@content/engage";

type Props = { params: Promise<{ channel: string }> };

export function generateStaticParams() {
  return ENGAGE_CHANNELS.map((channel) => ({ channel: channel.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { channel: slug } = await params;
  const channel = getEngageChannel(slug);

  if (!channel) return { title: "Not found" };

  return { title: channel.title, description: channel.summary };
}

export default async function EngageChannelPage({ params }: Props) {
  const { channel: slug } = await params;
  const channel = getEngageChannel(slug);

  if (!channel) notFound();

  return (
    <>
      <PageHero
        eyebrow="Engage"
        title={channel.title}
        lede={channel.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Engage", href: "/engage" },
          { label: channel.title },
        ]}
      />

      <Section tone="paper">
        <div className="grid gap-14 lg:grid-cols-[1fr_minmax(0,440px)] lg:gap-16">
          <div>
            <div className="max-w-xl space-y-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {channel.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {channel.precedent && (
              <div className="mt-8 max-w-xl border-l-2 border-ochre pl-5">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre">
                  Documented precedent
                </p>
                <p className="mt-2 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                  {channel.precedent}
                </p>
              </div>
            )}

            <h2 className="mt-14 text-2xl leading-tight text-ink sm:text-3xl">
              Make an enquiry
            </h2>
            <p className="mt-4 max-w-xl font-serif text-[1.0625rem] leading-relaxed text-ash">
              Every field is required. Enquiries route to{" "}
              <a href={`mailto:${channel.routesTo}`} className="link-brand">
                {channel.routesTo}
              </a>
              .
            </p>

            <div className="mt-8">
              <SubmissionForm
                fields={channel.fields}
                to={channel.routesTo}
                subject={`${channel.title}: enquiry from the website`}
                submitLabel="Send enquiry"
              />
            </div>
          </div>

          <aside className="space-y-8 lg:pt-2">
            <div className="border-t-2 border-ink/85 pt-5">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                How AHV engages
              </h2>
              <p className="mt-3 font-serif text-sm leading-relaxed text-ink-soft">
                AHV collaborates in research, co-supervises, publishes jointly
                and advises. It does not supply informants for work in which
                African Indigenous Spirituality is the object and the frame
                belongs to someone else.
              </p>
            </div>

            <div className="border-t border-rule pt-5">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                The institutional record
              </h2>
              <p className="mt-3 font-serif text-sm leading-relaxed text-ink-soft">
                Recognitions, partnerships and conference appearances, each with
                its source.
              </p>
              <a
                href="/institution/record"
                className="mt-4 inline-block font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4"
              >
                Read the record
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
