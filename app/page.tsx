import Link from "next/link";
import { BrandMark } from "@/components/Logo";
import { Quotation } from "@/components/Source";
import { DepartmentCard } from "@/components/Cards";
import { HOME } from "@content/home";
import { DEPARTMENTS } from "@content/departments";
import { POSITIONS } from "@content/positions";
import { DIALOGUE_SERIES } from "@content/media";
import { INSTITUTION } from "@content/global";

export default function HomePage() {
  return (
    <>
      {/* ------------------------------------------------------------- Hero */}
      <section className="relative isolate overflow-hidden bg-ink">
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-900 to-ink"
        />
        <BrandMark
          idSuffix="hero"
          title=""
          className="pointer-events-none absolute -right-16 top-1/2 hidden h-[140%] w-auto -translate-y-1/2 opacity-[0.11] lg:block"
        />

        <div className="relative mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-24">
          <BrandMark
            idSuffix="hero-mark"
            title="African Hidden Voices"
            className="h-20 w-auto lg:hidden"
          />
          <p className="eyebrow mt-6 max-w-xl leading-relaxed text-ochre-soft lg:mt-0">
            {HOME.eyebrow}
          </p>

          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.1] text-paper sm:text-5xl lg:text-6xl">
            {HOME.hero.title}
          </h1>
          <div className="mt-7 h-0.5 w-16 bg-brand-600" />

          <p className="mt-8 max-w-2xl font-serif text-lg leading-relaxed text-rule-soft/85 sm:text-xl">
            {HOME.hero.body}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            {HOME.hero.buttons.map((button) => (
              <Link
                key={button.href}
                href={button.href}
                className="group inline-flex items-center gap-2 font-mono text-sm text-paper"
              >
                <span className="underline decoration-ochre decoration-1 underline-offset-4 transition-colors group-hover:decoration-brand-400">
                  {button.label}
                </span>
                <span aria-hidden className="text-ochre">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------- The Core Research Position */}
      <section className="border-b border-rule bg-paper px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow">Position</p>
              <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
                {HOME.corePosition.title}
              </h2>
            </div>

            <div className="prose-ahv">
              <p className="lead">{HOME.corePosition.lead}</p>
              {HOME.corePosition.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <Quotation
                className="mt-8"
                text={HOME.corePosition.quote.text}
                attribution={HOME.corePosition.quote.attribution}
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------- Religion is taught. Spirituality is revealed */}
      <section className="bg-wash px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow">The founding distinction</p>
              <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
                {HOME.taughtRevealed.title}
              </h2>
            </div>
            <div className="prose-ahv">
              <p className="lead">{HOME.taughtRevealed.lead}</p>
              {HOME.taughtRevealed.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p>
                <Link
                  href={HOME.taughtRevealed.link.href}
                  className="link-brand font-sans text-sm font-medium"
                >
                  {HOME.taughtRevealed.link.label}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Six departments */}
      <section className="border-y border-rule bg-paper px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <header className="max-w-2xl">
            <p className="eyebrow">Departments</p>
            <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
              {HOME.departmentsSection.title}
            </h2>
            <p className="mt-5 font-serif text-[1.0625rem] leading-relaxed text-ash">
              {HOME.departmentsSection.lead}
            </p>
          </header>

          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((department) => (
              <DepartmentCard key={department.slug} department={department} />
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Ten positions */}
      <section className="bg-paper px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow">Positions</p>
              <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
                {HOME.positionsSection.title}
              </h2>
            </div>
            <div>
              <div className="prose-ahv">
                {HOME.positionsSection.body.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <ol className="mt-8 grid gap-x-10 gap-y-px sm:grid-cols-2">
                {POSITIONS.map((position) => (
                  <li key={position.slug} className="border-t border-rule-soft">
                    <Link
                      href={`/positions#${position.slug}`}
                      className="group flex items-baseline gap-3 py-3"
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
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- The naming */}
      <section className="border-y border-rule bg-wash px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow">The Lexicon</p>
              <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
                {HOME.naming.title}
              </h2>
            </div>
            <div className="prose-ahv">
              {HOME.naming.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p>
                <Link
                  href="/lexicon"
                  className="link-brand font-sans text-sm font-medium"
                >
                  The restored vocabulary
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ The founding scholar */}
      <section className="bg-paper px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow">The founding scholar</p>
              <h2 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                {HOME.founding.title}
              </h2>
            </div>
            <div className="prose-ahv">
              {HOME.founding.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p>
                <Link
                  href={HOME.founding.link.href}
                  className="link-brand font-sans text-sm font-medium"
                >
                  {HOME.founding.link.label}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- The database */}
      <section className="border-y border-rule bg-ink px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow text-ochre-soft">The Iimboni Database</p>
              <h2 className="mt-3 text-2xl leading-tight text-paper sm:text-3xl">
                {HOME.archive.title}
              </h2>
            </div>
            <div>
              <div className="font-serif text-[1.0625rem] leading-relaxed text-rule-soft/85">
                {HOME.archive.body.map((paragraph, i) => (
                  <p key={i} className={i > 0 ? "mt-5" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
              <Link
                href={HOME.archive.link.href}
                className="mt-7 inline-flex items-center gap-2 font-mono text-sm text-paper"
              >
                <span className="underline decoration-ochre decoration-1 underline-offset-4">
                  {HOME.archive.link.label}
                </span>
                <span aria-hidden className="text-ochre">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- Read from outside */}
      <section className="bg-paper px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow">The record</p>
              <h2 className="mt-3 text-2xl leading-tight text-ink sm:text-3xl">
                {HOME.outside.title}
              </h2>
            </div>
            <div className="prose-ahv">
              {HOME.outside.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
              <p>
                <Link
                  href={HOME.outside.link.href}
                  className="link-brand font-sans text-sm font-medium"
                >
                  {HOME.outside.link.label}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Dialogue */}
      <section className="border-y border-rule bg-wash px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow">The Dialogue Series</p>
              <h2 className="mt-3 font-mono text-xl leading-tight text-ink sm:text-2xl">
                {HOME.dialogue.title}
              </h2>
            </div>
            <div className="prose-ahv">
              <p>{HOME.dialogue.body}</p>
              <p className="font-sans text-sm">
                <a
                  href={DIALOGUE_SERIES.channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-brand font-medium"
                >
                  {DIALOGUE_SERIES.channel.label}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ Work with us */}
      <section className="bg-ink px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
            <div>
              <p className="eyebrow text-ochre-soft">Engage</p>
              <h2 className="mt-3 text-2xl leading-tight text-paper sm:text-3xl">
                {HOME.workWith.title}
              </h2>
            </div>
            <div>
              <p className="font-serif text-[1.0625rem] leading-relaxed text-rule-soft/85">
                {HOME.workWith.body}
              </p>
              <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-2">
                {HOME.workWith.channels.map((channel) => (
                  <li key={channel.href}>
                    <Link
                      href={channel.href}
                      className="font-mono text-sm text-paper underline decoration-ochre decoration-1 underline-offset-4"
                    >
                      {channel.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ Footnote */}
      <section className="bg-paper px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="font-mono text-xs leading-relaxed text-ash">
            {INSTITUTION.name}. {INSTITUTION.description}
          </p>
        </div>
      </section>
    </>
  );
}
