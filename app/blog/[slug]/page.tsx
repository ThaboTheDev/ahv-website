import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/site";
import { blogPostingSchema } from "@/lib/structured-data";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Prose, Section } from "@/components/Section";
import { MediaFigure, Quotation, SourceLine } from "@/components/Source";
import { getCmsStore } from "@/lib/cms";
import { BLOG_POSTS } from "@content/blog";
import { getDepartment } from "@content/departments";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { blogPosts } = getCmsStore();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) return { title: "Essay not found" };

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { blogPosts, positions, lexicon } = getCmsStore();
  const index = blogPosts.findIndex((item) => item.slug === slug);

  if (index === -1) notFound();

  const post = blogPosts[index];
  const department = getDepartment(post.department);
  const relatedPositions = post.relatedPositions
    .map((posSlug) => positions.find((p) => p.slug === posSlug))
    .filter((pos): pos is NonNullable<typeof pos> => Boolean(pos));
  const relatedTerms = post.relatedTerms
    .map((termSlug) => lexicon.find((t) => t.slug === termSlug))
    .filter((term): term is NonNullable<typeof term> => Boolean(term));

  const newerPost = index > 0 ? blogPosts[index - 1] : undefined;
  const olderPost =
    index < blogPosts.length - 1 ? blogPosts[index + 1] : undefined;

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />

      <PageHero
        eyebrow={
          department
            ? `${department.title} · ${post.category}`
            : post.category
        }
        title={post.title}
        lede={post.excerpt}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
        meta={[
          {
            label: "Published",
            value: <time dateTime={post.isoDate}>{post.date}</time>,
          },
          {
            label: "Department & Author",
            value: department ? (
              <Link
                href={`/departments/${department.slug}`}
                className="underline decoration-ochre/60 decoration-1 underline-offset-4 transition-colors hover:text-paper"
              >
                {post.author}
              </Link>
            ) : (
              post.author
            ),
          },
          {
            label: "Reading time",
            value: post.readingTime,
          },
        ]}
      />

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.75fr_1fr] lg:gap-16">
          {/* Article body */}
          <article>
            {/* Central claim */}
            <div className="border-l-2 border-brand-700 bg-wash px-6 py-5">
              <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                The central claim
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-ink">
                {post.keyClaim}
              </p>
            </div>

            {post.image && (
              <MediaFigure image={post.image} className="mt-8" />
            )}

            {/* Sections */}
            <div className="mt-10 space-y-10">
              {post.sections.map((section, idx) => (
                <div
                  key={section.heading ?? `section-${idx}`}
                  className="space-y-5"
                >
                  {section.heading && (
                    <h2 className="font-serif text-2xl leading-snug text-ink">
                      {section.heading}
                    </h2>
                  )}

                  {section.image && (
                    <MediaFigure image={section.image} className="my-5" />
                  )}

                  <Prose paragraphs={section.paragraphs} lead={idx === 0} />

                  {section.quote && (
                    <Quotation
                      className="my-6"
                      text={section.quote.text}
                      attribution={section.quote.attribution}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Sources */}
            <div className="mt-12 border-t-2 border-ink/85 pt-6">
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                Sources and references
              </h2>
              <div className="mt-3 space-y-2">
                {post.sources.map((source) => (
                  <SourceLine
                    key={source.label}
                    label={source.label}
                    href={source.href}
                  />
                ))}
              </div>
            </div>
          </article>

          {/* Scholarly context sidebar */}
          <aside className="space-y-8">
            {department && (
              <div className="border-t-2 border-ink/85 pt-5">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                  Department {department.number}
                </p>
                <h2 className="mt-2 font-serif text-xl leading-snug text-ink">
                  <Link
                    href={`/departments/${department.slug}`}
                    className="transition-colors hover:text-brand-800"
                  >
                    {department.title}
                  </Link>
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-ash">
                  {department.mandate}
                </p>
                <p className="mt-4 font-serif text-sm italic text-ink-soft">
                  {department.governingQuestion}
                </p>
                <p className="mt-4">
                  <Link
                    href={`/departments/${department.slug}`}
                    className="font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4"
                  >
                    Department programme →
                  </Link>
                </p>
              </div>
            )}

            {relatedPositions.length > 0 && (
              <div className="border-t border-rule pt-5">
                <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
                  Standing positions engaged
                </h2>
                <ul className="mt-3 divide-y divide-rule-soft">
                  {relatedPositions.map((position) => (
                    <li key={position.slug} className="py-2.5">
                      <Link
                        href={`/positions#${position.slug}`}
                        className="group flex items-baseline gap-3"
                      >
                        <span className="font-mono text-xs text-brand-700">
                          {position.number}
                        </span>
                        <span className="font-serif text-[0.9375rem] text-ink-soft transition-colors group-hover:text-brand-800">
                          {position.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedTerms.length > 0 && (
              <div className="border-t border-rule pt-5">
                <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
                  Restored vocabulary
                </h2>
                <ul className="mt-3 divide-y divide-rule-soft">
                  {relatedTerms.map((term) => (
                    <li key={term.slug} className="py-2.5">
                      <Link
                        href={`/lexicon#${term.slug}`}
                        className="group block"
                      >
                        <span className="font-serif text-[0.9375rem] italic text-ink transition-colors group-hover:text-brand-800">
                          {term.term}
                        </span>
                        <span className="mt-0.5 block font-mono text-xs text-ash">
                          {term.gloss}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Section>

      {/* Adjacent essays navigation */}
      <Section tone="wash" size="tight">
        <nav
          aria-label="Essay navigation"
          className="grid gap-8 sm:grid-cols-2"
        >
          <div>
            {newerPost ? (
              <Link
                href={`/blog/${newerPost.slug}`}
                className="group block border-t border-rule pt-4"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
                  ← Newer essay
                </span>
                <span className="mt-2 block font-serif text-lg leading-snug text-ink transition-colors group-hover:text-brand-800">
                  {newerPost.title}
                </span>
              </Link>
            ) : (
              <div className="border-t border-rule pt-4">
                <Link
                  href="/blog"
                  className="font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4"
                >
                  ← All essays and research notes
                </Link>
              </div>
            )}
          </div>

          <div className="sm:text-right">
            {olderPost ? (
              <Link
                href={`/blog/${olderPost.slug}`}
                className="group block border-t border-rule pt-4"
              >
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
                  Older essay →
                </span>
                <span className="mt-2 block font-serif text-lg leading-snug text-ink transition-colors group-hover:text-brand-800">
                  {olderPost.title}
                </span>
              </Link>
            ) : (
              <div className="border-t border-rule pt-4">
                <Link
                  href="/blog"
                  className="font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4"
                >
                  All essays and research notes →
                </Link>
              </div>
            )}
          </div>
        </nav>
      </Section>
    </>
  );
}
