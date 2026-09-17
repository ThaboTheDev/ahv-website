import Link from "next/link";
import { getDepartment, type Department } from "@content/departments";
import type { Position } from "@content/positions";
import type { LexiconEntry } from "@content/lexicon";
import type { DatabaseRecord } from "@content/database";

/* ---------------------------------------------------------------- */

export function DepartmentCard({
  department,
}: {
  department: Department;
}) {
  return (
    <article className="group flex flex-col border-t-2 border-ink/85 pt-5 transition-colors hover:border-brand-700">
      <Link href={`/departments/${department.slug}`} className="flex flex-1 flex-col">
        <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand-700">
          {department.number}
        </p>
        <h3 className="mt-2 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-brand-800">
          {department.title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ash">
          {department.mandate}
        </p>
        <p className="mt-5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash/80">
          {department.shortTitle}
        </p>
      </Link>
    </article>
  );
}

/* ---------------------------------------------------------------- */

/**
 * A standing position, with the objection stated at full strength.
 *
 * The objection is never hidden behind a disclosure control: it is set at the
 * same level as the position, because that is what the institution does.
 */
export function PositionBlock({
  position,
  showDepartment = true,
}: {
  position: Position;
  showDepartment?: boolean;
}) {
  const department = getDepartment(position.department);

  return (
    <article
      id={position.slug}
      className="scroll-mt-32 border-t border-rule pt-8 first:border-t-0 first:pt-0"
    >
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-mono text-sm font-semibold text-brand-700">
          {position.number}
        </span>
        <h2 className="font-serif text-2xl leading-snug text-ink sm:text-[1.75rem]">
          {position.title}
        </h2>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-10">
        <div>
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
            The position
          </h3>
          <p className="mt-2.5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {position.position}
          </p>
        </div>

        <div>
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
            The ground
          </h3>
          <p className="mt-2.5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {position.ground}
          </p>
        </div>

        <div className="border-l-2 border-ash/40 pl-5">
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
            The objection, at full strength
          </h3>
          <p className="mt-2.5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {position.objection}
          </p>
        </div>

        <div className="border-l-2 border-brand-700 pl-5">
          <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-700">
            AHV&rsquo;s answer
          </h3>
          <p className="mt-2.5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {position.answer}
          </p>
        </div>
      </div>

      {showDepartment && department && (
        <p className="mt-6 font-mono text-xs text-ash">
          Department: {" "}
          <Link
            href={`/departments/${department.slug}`}
            className="text-brand-700 underline decoration-1 underline-offset-2"
          >
            {department.title}
          </Link>
        </p>
      )}
    </article>
  );
}

/* ---------------------------------------------------------------- */

export function LexiconCard({ entry }: { entry: LexiconEntry }) {
  return (
    <article
      id={entry.slug}
      className="scroll-mt-32 border-t border-rule pt-7"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-serif text-xl italic leading-snug text-ink">
          {entry.term}
        </h3>
        <p className="font-mono text-xs text-brand-700">{entry.gloss}</p>
        {entry.confirmationPending && (
          <span className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ochre">
            For confirmation
          </span>
        )}
      </div>

      <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
        {entry.definition}
      </p>

      <p className="mt-4 font-serif text-[1.0625rem] leading-relaxed text-ash">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.1em] text-ink-soft">
          What it is not.{" "}
        </span>
        {entry.whatItIsNot}
      </p>
    </article>
  );
}

/* ---------------------------------------------------------------- */

const STATUS_TONE: Record<DatabaseRecord["status"], string> = {
  Verified: "border-verdigris text-verdigris",
  "Single source": "border-ochre text-ochre",
  "Under verification": "border-ash text-ash",
};

export function RecordCard({ record }: { record: DatabaseRecord }) {
  return (
    <article className="border-t border-rule pt-7">
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
        <div>
          <h3 className="font-serif text-xl leading-snug text-ink">
            {record.name}
          </h3>
          <p className="mt-1.5 text-sm text-ink-soft">{record.office}</p>
        </div>
        <span
          className={`shrink-0 border px-2.5 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] ${STATUS_TONE[record.status]}`}
        >
          {record.status}
        </span>
      </div>

      <p className="mt-4 font-mono text-xs leading-relaxed text-ash">
        {record.lifespan} · {record.place} · {record.country} · {record.region}
      </p>

      <p className="mt-5 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
        {record.summary}
      </p>

      <dl className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
            Named in the colonial and mission record as
          </dt>
          <dd className="mt-1.5 text-sm text-ink-soft">
            {record.colonialLabel}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-brand-800">
            What is not established
          </dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-brand-800">
            {record.notEstablished}
          </dd>
        </div>
      </dl>
    </article>
  );
}

/* ---------------------------------------------------------------- */

/** A numbered list of research programmes, used on department pages. */
export function ProgrammeList({
  programmes,
}: {
  programmes: { title: string; body: string }[];
}) {
  return (
    <ol className="grid gap-8">
      {programmes.map((programme, i) => (
        <li key={programme.title} className="border-t border-rule pt-6">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-brand-700">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="font-serif text-lg leading-snug text-ink">
              {programme.title}
            </h3>
          </div>
          <p className="mt-3 font-serif text-[1.0625rem] leading-relaxed text-ink-soft">
            {programme.body}
          </p>
        </li>
      ))}
    </ol>
  );
}
