import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Prose, Section } from "@/components/Section";
import { FRAMEWORK } from "@content/institution";

export const metadata: Metadata = {
  title: "The Framework",
  description:
    "How African Hidden Voices knows what it knows, stated in full, so that it can be examined.",
};

export default function FrameworkPage() {
  return (
    <>
      <PageHero
        eyebrow="The Institution"
        title="How we know what we know, stated in full"
        lede="Most research institutions leave their epistemology implicit and let readers infer it. AHV states its own at the front, because the framework is not a preliminary to the research. It is the research position."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "The Institution", href: "/institution" },
          { label: "The Framework" },
        ]}
      />

      <Section tone="paper">
        <div className="space-y-16">
          {FRAMEWORK.map((section) => (
            <article
              key={section.number}
              id={`section-${section.number}`}
              className="scroll-mt-32 border-t border-rule pt-8"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-sm font-semibold text-brand-700">
                  {section.number}
                </span>
                <h2 className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
                  {section.title}
                </h2>
              </div>

              {section.intro && (
                <p className="mt-5 max-w-2xl font-serif text-lg leading-relaxed text-ink-soft">
                  {section.intro}
                </p>
              )}

              <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {section.subsections.map((subsection) => (
                  <div key={subsection.title}>
                    <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
                      {subsection.title}
                    </h3>
                    <p className="mt-2.5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
                      {subsection.body}
                    </p>
                  </div>
                ))}
              </div>

              {section.outro && (
                <Prose className="mt-8 max-w-2xl" paragraphs={[section.outro]} />
              )}
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
