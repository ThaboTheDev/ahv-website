import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";
import { PositionBlock } from "@/components/Cards";
import { POSITIONS } from "@content/positions";

export const metadata: Metadata = {
  title: "Standing Positions",
  description:
    "Ten positions African Hidden Voices holds, each with the objection against it stated at full strength.",
};

export default function PositionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Standing Positions"
        title="Ten positions, published with the case against them"
        lede="Ten positions African Hidden Voices holds, each with the objection against it stated at full strength."
        crumbs={[{ label: "Home", href: "/" }, { label: "Positions" }]}
      />

      <Section tone="paper">
        <div className="max-w-2xl space-y-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
          <p>
            These are the institution's positions. They govern what its
            departments research, what its publications argue, and what it will
            and will not concede in a seminar room.
          </p>
          <p>
            Each is set out in the same form: the position, the ground it rests
            on, the strongest objection AHV knows of, and AHV&rsquo;s answer. The
            objections are stated as their best defenders would state them.
            Where an answer is partial, the page says so rather than closing the
            gap with confidence.
          </p>
          <p>
            An institution that publishes only its conclusions asks to be taken
            on trust. This page asks to be argued with.
          </p>
        </div>

        {/* Contents */}
        <nav aria-label="The positions" className="mt-12 border-t border-rule pt-8">
          <h2 className="eyebrow">Contents</h2>
          <ol className="mt-4 grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {POSITIONS.map((position) => (
              <li key={position.slug}>
                <a
                  href={`#${position.slug}`}
                  className="group flex items-baseline gap-3 py-1.5"
                >
                  <span className="font-mono text-xs text-brand-700">
                    {position.number}
                  </span>
                  <span className="font-serif text-[0.9375rem] text-ink-soft transition-colors group-hover:text-brand-800">
                    {position.title}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </Section>

      <Section tone="wash">
        <div className="space-y-14">
          {POSITIONS.map((position) => (
            <PositionBlock key={position.slug} position={position} />
          ))}
        </div>
      </Section>

      <Section tone="paper" size="tight">
        <div className="max-w-2xl border-t-2 border-ink/85 pt-6">
          <h2 className="font-serif text-2xl leading-snug text-ink">
            How to disagree with this
          </h2>
          <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            AHV would rather be engaged than agreed with. Scholars who hold a
            different position on any of these are invited to say so in writing,
            and AHV will publish a serious reply alongside the position it
            concerns.
          </p>
        </div>
      </Section>
    </>
  );
}
