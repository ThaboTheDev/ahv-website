import type { ReactNode } from "react";

/**
 * Standard page section.
 *
 * `tone` maps to the site's three grounds: paper (default), wash (a subtle
 * tint used to separate blocks) and ink (the dark brand field).
 */
export function Section({
  children,
  eyebrow,
  title,
  intro,
  id,
  className,
  align = "left",
  tone = "paper",
  size = "default",
}: {
  children?: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
  align?: "left" | "center";
  tone?: "paper" | "wash" | "ink" | "none";
  size?: "default" | "tight";
}) {
  const toneClasses = {
    paper: "bg-paper text-ink",
    wash: "bg-wash text-ink",
    ink: "bg-ink text-rule-soft",
    none: "",
  }[tone];

  const headingTone = tone === "ink" ? "text-paper" : "text-ink";
  const introTone = tone === "ink" ? "text-rule-soft/85" : "text-ash";
  const padding =
    size === "tight"
      ? "px-5 py-12 sm:px-8 sm:py-14"
      : "px-5 py-14 sm:px-8 sm:py-20";

  return (
    <section
      id={id}
      className={`${toneClasses} ${padding} ${className ?? ""}`}
    >
      <div className="mx-auto max-w-5xl">
        {(eyebrow || title || intro) && (
          <header
            className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && (
              <p className={`eyebrow ${tone === "ink" ? "text-ochre-soft" : ""}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`mt-3 text-2xl leading-tight sm:text-3xl ${headingTone}`}
              >
                {title}
              </h2>
            )}
            {intro && (
              <div
                className={`mt-5 text-base leading-relaxed ${introTone}`}
              >
                {intro}
              </div>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

/**
 * A two-column editorial split: a label and heading on the left, content on
 * the right. This is the site's most-used layout.
 */
export function Split({
  eyebrow,
  title,
  children,
  tone = "paper",
  id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  children: ReactNode;
  tone?: "paper" | "wash" | "ink";
  id?: string;
}) {
  const headingTone = tone === "ink" ? "text-paper" : "text-ink";
  const childrenTone = tone === "ink" ? "text-rule-soft/85" : "text-ink-soft";

  return (
    <div
      id={id}
      className={`grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-16 ${childrenTone}`}
    >
      <div>
        {eyebrow && (
          <p className={`eyebrow ${tone === "ink" ? "text-ochre-soft" : ""}`}>
            {eyebrow}
          </p>
        )}
        {title && (
          <h2
            className={`mt-3 text-2xl leading-tight sm:text-3xl ${headingTone}`}
          >
            {title}
          </h2>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

/** Renders an array of paragraphs as house-style prose. */
export function Prose({
  paragraphs,
  className,
  lead = false,
}: {
  paragraphs: readonly string[];
  className?: string;
  /** Set on the first block of a page to give it a slight lift. */
  lead?: boolean;
}) {
  return (
    <div className={`prose-ahv ${className ?? ""}`}>
      {paragraphs.map((paragraph, i) => (
        <p
          key={i}
          className={lead && i === 0 ? "lead" : undefined}
          // Copy is authored in this repository, never supplied by a visitor.
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
    </div>
  );
}
