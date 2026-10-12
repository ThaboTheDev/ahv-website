import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/site";
import { countWord } from "@/lib/format";
import { PageHero } from "@/components/PageHero";
import { Section, Split } from "@/components/Section";
import { BlogCatalog } from "@/components/BlogCatalog";
import { getCmsStore } from "@/lib/cms";
import { BLOG_HERO } from "@content/blog";
import { DEPARTMENTS } from "@content/departments";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Blog",
  description:
    "Essays, research notes and commentary from the six departments of African Hidden Voices.",
  path: "/blog",
});

export default function BlogPage() {
  const { blogPosts } = getCmsStore();
  const departmentCount = new Set(blogPosts.map((post) => post.department))
    .size;

  return (
    <>
      <PageHero
        eyebrow={BLOG_HERO.eyebrow}
        title={BLOG_HERO.title}
        lede={BLOG_HERO.lede}
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        meta={[
          {
            label: "Published record",
            value: `${countWord(blogPosts.length)} essays across ${countWord(departmentCount)} departments`,
          },
          {
            label: "Evidentiary standard",
            value: "Every claim of fact carries a checkable source",
          },
          {
            label: "The naming rule",
            value: (
              <>
                <em className="italic">izwi lilandela umoya</em>, the word
                follows the spirit
              </>
            ),
          },
        ]}
      />

      <Section tone="paper">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="max-w-3xl font-serif text-lg leading-relaxed text-ink-soft">
            {BLOG_HERO.intro}
          </p>
          <Link
            href="/admin"
            className="border border-rule bg-wash px-3.5 py-2 font-mono text-xs uppercase tracking-[0.12em] text-brand-700 transition-colors hover:border-brand-700"
          >
            + Publish or edit in Admin →
          </Link>
        </div>

        <div className="mt-10">
          <BlogCatalog posts={blogPosts} departments={DEPARTMENTS} />
        </div>
      </Section>

      {/* Editorial standard */}
      <Section tone="wash" size="tight">
        <Split eyebrow="Editorial rule" title="How these essays are written">
          <div className="space-y-4">
            <p className="font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {BLOG_HERO.editorialRule}
            </p>
            <p className="font-mono text-xs leading-relaxed text-ash">
              To receive new essays and research notes as they are published,
              subscribe to{" "}
              <Link href="/newsletter" className="link-brand">
                The Research Digest
              </Link>{" "}
              or consult the full{" "}
              <Link href="/positions" className="link-brand">
                Standing Positions
              </Link>{" "}
              and{" "}
              <Link href="/lexicon" className="link-brand">
                Restored Lexicon
              </Link>
              .
            </p>
          </div>
        </Split>
      </Section>
    </>
  );
}
