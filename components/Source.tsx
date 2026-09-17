import type { ReactNode } from "react";

/**
 * A source line.
 *
 * House style requires every claim of fact to carry a source or not appear.
 * This component is the single place a source is rendered, so that the
 * requirement is visible in the markup as well as in the copy.
 */
export function SourceLine({
  label,
  href,
  className,
}: {
  label: string;
  href?: string;
  className?: string;
}) {
  return (
    <p className={`mt-3 font-mono text-xs text-ash ${className ?? ""}`}>
      <span className="text-ash/70">Source: </span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="break-words underline decoration-rule decoration-1 underline-offset-2 transition-colors hover:text-brand-700 hover:decoration-brand-700"
        >
          {label}
        </a>
      ) : (
        <span className="text-ink-soft">{label}</span>
      )}
    </p>
  );
}

/** A block quotation with its attribution. Both parts are required. */
export function Quotation({
  text,
  attribution,
  className,
}: {
  text: string;
  attribution: string;
  className?: string;
}) {
  return (
    <figure className={`border-l-2 border-brand-700 pl-5 ${className ?? ""}`}>
      <blockquote className="font-serif text-lg leading-snug text-ink">
        {text}
      </blockquote>
      <figcaption className="mt-2 font-mono text-xs text-ash">
        {attribution}
      </figcaption>
    </figure>
  );
}

/**
 * A field of a database record. The field is shown even when empty, because
 * an empty field is itself information.
 */
export function RecordField({
  label,
  children,
  tone = "default",
}: {
  label: string;
  children: ReactNode;
  tone?: "default" | "alert";
}) {
  return (
    <div>
      <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
        {label}
      </dt>
      <dd
        className={`mt-1.5 text-sm leading-relaxed ${
          tone === "alert" ? "text-brand-800" : "text-ink-soft"
        }`}
      >
        {children}
      </dd>
    </div>
  );
}
