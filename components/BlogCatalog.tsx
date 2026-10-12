"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogCard } from "@/components/Cards";
import { MediaFigure, SourceLine } from "@/components/Source";
import type { BlogPost } from "@content/blog";
import type { Department } from "@content/departments";

export function BlogCatalog({
  posts,
  departments,
}: {
  posts: BlogPost[];
  departments: Department[];
}) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const filtered =
    selectedDepartment === "all"
      ? posts
      : posts.filter((post) => post.department === selectedDepartment);

  const featured = selectedDepartment === "all" ? filtered[0] : undefined;
  const remaining = selectedDepartment === "all" ? filtered.slice(1) : filtered;
  const featuredDept = featured
    ? departments.find((d) => d.slug === featured.department)
    : undefined;

  return (
    <div>
      {/* Department filter controls */}
      <div className="flex flex-wrap items-center gap-2 border-b border-rule pb-6">
        <span className="mr-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
          Filter by department:
        </span>
        <button
          type="button"
          onClick={() => setSelectedDepartment("all")}
          aria-pressed={selectedDepartment === "all"}
          className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
            selectedDepartment === "all"
              ? "border-brand-800 bg-brand-800 text-paper"
              : "border-rule bg-paper text-ink-soft hover:border-brand-700 hover:text-brand-700"
          }`}
        >
          All ({posts.length})
        </button>
        {departments.map((department) => {
          const count = posts.filter(
            (post) => post.department === department.slug,
          ).length;
          const active = selectedDepartment === department.slug;
          return (
            <button
              key={department.slug}
              type="button"
              onClick={() => setSelectedDepartment(department.slug)}
              aria-pressed={active}
              className={`border px-3 py-1.5 font-mono text-xs transition-colors ${
                active
                  ? "border-brand-800 bg-brand-800 text-paper"
                  : "border-rule bg-paper text-ink-soft hover:border-brand-700 hover:text-brand-700"
              }`}
            >
              {department.shortTitle} ({count})
            </button>
          );
        })}
      </div>

      {/* Lead essay when viewing all */}
      {featured && (
        <article className="mt-10 border-b border-rule pb-12">
          <p className="eyebrow">Latest essay</p>

          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <time
              dateTime={featured.isoDate}
              className="font-mono text-xs font-semibold text-brand-700"
            >
              {featured.date}
            </time>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ochre">
              {featured.category}
            </span>
            <span className="font-mono text-xs text-ash">
              · {featured.readingTime}
            </span>
            {featuredDept && (
              <Link
                href={`/departments/${featuredDept.slug}`}
                className="font-mono text-xs text-ash underline decoration-rule decoration-1 underline-offset-2 transition-colors hover:text-brand-700"
              >
                {featuredDept.title}
              </Link>
            )}
          </div>

          <h2 className="mt-3 max-w-3xl font-serif text-2xl leading-snug text-ink sm:text-3xl">
            <Link
              href={`/blog/${featured.slug}`}
              className="transition-colors hover:text-brand-800"
            >
              {featured.title}
            </Link>
          </h2>

          {featured.image && (
            <MediaFigure
              image={featured.image}
              className="mt-6 max-w-3xl"
            />
          )}

          <p className="mt-4 max-w-3xl font-serif text-lg leading-relaxed text-ink-soft">
            {featured.excerpt}
          </p>

          <div className="mt-6 max-w-3xl border-l-2 border-brand-700 pl-5">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
              Central claim
            </p>
            <p className="mt-1.5 font-serif text-[1.0625rem] leading-relaxed text-ink">
              {featured.keyClaim}
            </p>
          </div>

          {featured.sources[0] && (
            <SourceLine
              className="mt-5"
              label={featured.sources[0].label}
              href={featured.sources[0].href}
            />
          )}

          <div className="mt-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="inline-flex items-center gap-2 bg-brand-800 px-4 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-paper transition-colors hover:bg-brand-900"
            >
              <span>Read full essay</span>
              <span aria-hidden className="text-ochre-soft">
                →
              </span>
            </Link>
          </div>
        </article>
      )}

      {/* Grid of essays */}
      <div className="mt-10 grid gap-x-10 gap-y-12 md:grid-cols-2">
        {remaining.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
