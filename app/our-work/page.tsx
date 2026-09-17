import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Section } from "@/components/Section";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "The research, dialogues and convenings through which African Hidden Voices restores the record of Africa's indigenous spiritual leaders.",
};

const METHODS = [
  {
    title: "Field research",
    body: "The AHV research team travels across Southern Africa to locate the IImboni, record testimony first-hand, and trace the lineages of spiritual gifts from one generation to the next.",
  },
  {
    title: "Archival work",
    body: "We read against the grain of the colonial archive — commissions of inquiry, district records, mission correspondence — to recover African voices from documents written to contain them.",
  },
  {
    title: "Publication",
    body: "Profiles, papers and books, including Restoring Africa's Spiritual Identity, so that this knowledge is available to scholars, learners and the public alike.",
  },
  {
    title: "Convening",
    body: "Dialogues and scholars' conferences that bring indigenous spiritual leaders, academics and the public into the same room.",
  },
] as const;

const MILESTONES = [
  {
    year: "2016",
    title: "The AHV platform is established",
    body: "Following the inaugural Universal Peace Federation South Africa chapter dialogue on politics and religion, Imboni Dr. S. B. Radebe establishes African Hidden Voices as a digital platform for previously unheard African views.",
  },
  {
    year: "2017",
    title: "The research organisation takes shape",
    body: "AHV formalises as a research organisation aimed at retracing the steps of Africa's indigenous spiritual heroes and heroines, and opens its Johannesburg office in Marshalltown.",
  },
  {
    year: "2025",
    title: "CESNUR scholars' conference, Cape Town",
    body: "AHV co-hosts the first annual South African CESNUR scholars conference at the CTICC, gathering scholars of African indigenous spirituality, religion and new religious movements.",
  },
  {
    year: "2025",
    title: "Restoring Africa's Spiritual Identity",
    body: "A book signing at Exclusive Books, Melrose Arch marks the publication of a major work on Africa's spiritual identity.",
  },
] as const;

export default function OurWorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="How the hidden voices are found"
        intro="Recovering a suppressed history takes patience, scholarship and the willingness to travel. This is how the AHV research team does it."
      />

      <Section tone="light">
        <div className="grid gap-px overflow-hidden rounded-sm bg-sand/70 sm:grid-cols-2">
          {METHODS.map((method, i) => (
            <div key={method.title} className="bg-parchment p-7 sm:p-8">
              <span
                aria-hidden
                className="font-wordmark text-sm font-semibold tracking-[0.16em] text-brand-300"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-3 text-2xl leading-snug text-ink">
                {method.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {method.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="parchment"
        eyebrow="Milestones"
        title="A decade of recovering the record"
      >
        <ol className="mt-12 max-w-3xl">
          {MILESTONES.map((milestone, i) => (
            <li
              key={milestone.title}
              className="relative grid gap-x-8 gap-y-2 border-l-2 border-sand pl-8 pb-10 last:pb-0 sm:grid-cols-[80px_1fr]"
            >
              <span
                aria-hidden
                className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-parchment bg-brand-700"
              />
              <span className="font-wordmark text-sm font-semibold tracking-[0.1em] text-brand-700">
                {milestone.year}
              </span>
              <div>
                <h3 className="text-xl leading-snug text-ink">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">
                  {milestone.body}
                </p>
              </div>
              {i === MILESTONES.length - 1 && null}
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="light" align="center">
        <h2 className="text-3xl leading-tight sm:text-4xl">
          Help us find the next voice
        </h2>
        <div className="rule-ochre mx-auto mt-6" />
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ash">
          Every profile on this site began with someone willing to tell a story
          that had gone unheard. If you know of a leader, a place or a practice
          at risk of being lost, we would like to hear from you.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-900"
          >
            Contact the research team
          </Link>
          <Link
            href="/voices"
            className="rounded-full border border-brand-800/25 px-6 py-3 text-sm font-semibold text-brand-800 transition-colors hover:border-brand-800/60 hover:bg-brand-800/5"
          >
            Browse the archive
          </Link>
        </div>
      </Section>
    </>
  );
}
