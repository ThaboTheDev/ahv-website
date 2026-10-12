import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { MediaFigure, SourceLine } from "@/components/Source";
import { BlogCard } from "@/components/Cards";
import { getCmsStore } from "@/lib/cms";
import {
  MEDIA_KIT,
  NEWSROOM_INTRO,
  NEWSROOM_LEDE,
  RESEARCH_NOTES_NOTE,
} from "@content/newsroom";
import { INSTITUTION_EMAILS } from "@content/contacts";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Newsroom",
  description:
    "Announcements, research notes and institutional appearances from African Hidden Voices.",
  path: "/newsroom",
});

export default function NewsroomPage() {
  const { announcements, blogPosts } = getCmsStore();

  return (
    <>
      <PageHero
        eyebrow="Newsroom"
        title="Announcements and research notes"
        lede={NEWSROOM_LEDE}
        crumbs={[{ label: "Home", href: "/" }, { label: "Newsroom" }]}
      />

      <Section tone="paper">
        <p className="max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
          {NEWSROOM_INTRO}
        </p>
        <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-ash">
          Every release carries a date, a named contact, and a source or
          supporting link. Nothing is announced that has not happened.
        </p>
      </Section>

      {/* Announcements */}
      <Section tone="wash">
        <h2 className="text-2xl leading-tight text-ink sm:text-3xl">
          Announcements
        </h2>

        <div className="mt-10 space-y-10">
          {announcements.map((item) => (
            <article key={item.title} className="border-t border-rule pt-6">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <span className="font-mono text-xs font-semibold text-brand-700">
                  {item.date}
                </span>
                <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ochre">
                  {item.category}
                </span>
              </div>
              <h3 className="mt-2 max-w-3xl font-serif text-xl leading-snug text-ink">
                {item.title}
              </h3>
              {item.image && (
                <MediaFigure image={item.image} className="mt-4 max-w-2xl" />
              )}
              <p className="mt-3 max-w-3xl font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
              {item.source && (
                <SourceLine label={item.source.label} href={item.source.href} />
              )}
            </article>
          ))}
        </div>
      </Section>

      {/* Research notes */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <p className="eyebrow">Research notes</p>
            <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
              Research notes and essays
            </h2>
            <p className="mt-4">
              <Link
                href="/blog"
                className="font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4"
              >
                Open the AHV Blog →
              </Link>
            </p>
          </div>
          <div>
            <p className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              Short pieces from the departments: a finding, a source recovered,
              a site visited, a position stated. Each carries its department and
              its author.
            </p>
            <p className="mt-5 border-l-2 border-ochre pl-5 font-serif text-[1.0625rem] leading-relaxed text-ash">
              {RESEARCH_NOTES_NOTE}
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {blogPosts.slice(0, 4).map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {/* Media kit */}
      <Section tone="wash" size="tight">
        <div className="max-w-2xl border-t-2 border-ink/85 pt-6">
          <h2 className="font-serif text-2xl leading-snug text-ink">
            {MEDIA_KIT.title}
          </h2>
          <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {MEDIA_KIT.body}
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {MEDIA_KIT.items.map((item) => (
              <li
                key={item}
                className="border border-rule px-2.5 py-1 font-mono text-xs text-ash"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-xs text-ash">
            Press enquiries:{" "}
            <a href={`mailto:${INSTITUTION_EMAILS.admin}`} className="link-brand">
              {INSTITUTION_EMAILS.admin}
            </a>
          </p>
        </div>
      </Section>
    </>
  );
}
