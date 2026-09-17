import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Split } from "@/components/Section";
import { Quotation } from "@/components/Source";
import {
  CITATIONS,
  INDEPENDENT_STUDY,
  IN_PREPARATION,
  PUBLICATIONS,
  RECORD_NOTE,
} from "@content/publications";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "AHV's books, and the independent scholarship that cites them.",
};

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Publications"
        title="Books, and the scholarship that cites them"
        lede="AHV's books, and the independent scholarship that cites them."
        crumbs={[{ label: "Home", href: "/" }, { label: "Publications" }]}
      />

      {/* AHV publications */}
      <Section tone="paper">
        <Split eyebrow="AHV publications" title="AHV publications">
          <div className="space-y-10">
            {PUBLICATIONS.map((book) => (
              <article key={book.isbn} className="border-t-2 border-ink/85 pt-6">
                <h3 className="font-serif text-xl leading-snug text-ink">
                  {book.title}
                </h3>
                <p className="mt-2 font-mono text-xs leading-relaxed text-ash">
                  {book.publisher}, {book.place}, {book.year} · ISBN {book.isbn}
                </p>
                {book.byline && (
                  <p className="mt-3 font-serif text-sm italic text-ink-soft">
                    {book.byline}
                  </p>
                )}
                <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                  {book.body}
                </p>
              </article>
            ))}
          </div>
        </Split>
      </Section>

      {/* Independent scholarship */}
      <Section tone="wash" id="independent-study">
        <Split
          eyebrow="Independent scholarship"
          title="Independent scholarship on The Revelation Spiritual Home"
        >
          <article className="border-t-2 border-ink/85 pt-6">
            <h3 className="font-serif text-xl leading-snug text-ink">
              {INDEPENDENT_STUDY.title}
            </h3>
            <p className="mt-2 font-serif text-sm text-ink-soft">
              {INDEPENDENT_STUDY.authors}
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-ash">
              {INDEPENDENT_STUDY.series} · {INDEPENDENT_STUDY.publisher},{" "}
              {INDEPENDENT_STUDY.year}
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-ash">
              DOI {INDEPENDENT_STUDY.doi} · ISBN {INDEPENDENT_STUDY.isbn}
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-ash">
              Italian edition: {INDEPENDENT_STUDY.italianEdition}
            </p>
            <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
              {INDEPENDENT_STUDY.body}
            </p>
          </article>
        </Split>

        {/* How AHV is cited */}
        <div className="mt-14">
          <h2 className="text-2xl leading-tight text-ink sm:text-[1.75rem]">
            How AHV is cited in it
          </h2>
          <p className="mt-4 max-w-2xl font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            The passages below are quoted from the published text. This is the
            single most persuasive thing AHV can put on its website for an
            academic reader, and it costs nothing but accuracy.
          </p>

          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {CITATIONS.map((citation) => (
              <Quotation
                key={citation.source}
                text={citation.quote}
                attribution={citation.source}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* In preparation */}
      <Section tone="paper">
        <Split eyebrow="In preparation" title="In preparation">
          {IN_PREPARATION.map((item) => (
            <article key={item.title} className="border-t border-rule pt-6">
              <h3 className="font-serif text-xl leading-snug text-ink">
                {item.title}
              </h3>
              <p className="mt-2 font-mono text-xs text-ash">{item.author}</p>
              <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </article>
          ))}
        </Split>
      </Section>

      <Section tone="wash" size="tight">
        <div className="max-w-2xl border-l-2 border-ochre pl-6">
          <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre">
            A note on the record
          </h2>
          <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {RECORD_NOTE}
          </p>
        </div>
      </Section>
    </>
  );
}
