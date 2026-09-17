import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { LexiconCard } from "@/components/Cards";
import { LEXICON } from "@content/lexicon";

export const metadata: Metadata = {
  title: "The Lexicon",
  description:
    "The restored vocabulary of African Indigenous Spirituality, defined from within.",
};

export default function LexiconPage() {
  const pending = LEXICON.filter((entry) => entry.confirmationPending).length;

  return (
    <>
      <PageHero
        eyebrow="The Lexicon"
        title="The naming belongs to Africa"
        lede="The restored vocabulary of African Indigenous Spirituality, defined from within."
        crumbs={[{ label: "Home", href: "/" }, { label: "The Lexicon" }]}
        meta={[
          { label: "Terms", value: String(LEXICON.length) },
          { label: "For confirmation", value: String(pending) },
          { label: "Governing rule", value: "izwi lilandela umoya" },
        ]}
      />

      <Section tone="paper">
        <div className="max-w-2xl space-y-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
          <p className="lead">
            A people that has lost the naming of its own spirituality has lost
            more than words. It has lost the right to define what it practises,
            because the definition now lives in someone else&rsquo;s dictionary
            and answers to someone else&rsquo;s history.
          </p>
          <p>
            Every term below is defined from inside African Indigenous
            Spirituality, in the tongue that carries it, and never through the
            etymology of another system. Where a term has been persistently
            mistranslated, the mistranslation is named and the reason it fails
            is given, because a correction that does not say what it is
            correcting teaches nobody.
          </p>
          <p>
            The governing rule is <em>izwi lilandela umoya</em>: the word
            follows the spirit. Spirit reveals, and the word gives testament to
            the spirit. It does not run the other way, and a vocabulary
            assembled in the reverse order will describe something that was
            never there.
          </p>
        </div>
      </Section>

      {/* The linguistic test */}
      <Section tone="wash" size="tight">
        <div className="max-w-2xl border-l-2 border-brand-700 pl-6">
          <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
            The linguistic test
          </h2>
          <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            This lexicon also carries a research instrument, and every
            department uses it. If a spiritual concept is real and native to a
            people, their languages carry its name. If it arrived by teaching,
            the languages have no word for it and speakers must force a borrowed
            one into service. Where a concept has no indigenous name, it is a
            taught import rather than a revealed reality, and the absence of the
            word is the evidence.
          </p>
        </div>
      </Section>

      <Section tone="paper">
        <h2 className="eyebrow">The terms</h2>
        <div className="mt-8 space-y-10">
          {LEXICON.map((entry) => (
            <LexiconCard key={entry.slug} entry={entry} />
          ))}
        </div>

        {pending > 0 && (
          <p className="mt-12 max-w-2xl border-t border-rule pt-6 font-mono text-xs leading-relaxed text-ash">
            {pending} entries marked for confirmation carry a definition drawn
            from the published corpus that AHV has not yet settled in its final
            published form. They are shown rather than hidden, because a lexicon
            that conceals its unfinished entries cannot be trusted on its
            finished ones.
          </p>
        )}
      </Section>
    </>
  );
}
