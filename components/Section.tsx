import type { ReactNode } from "react";

/**
 * Standard page section with an optional eyebrow label and heading.
 * Keeps vertical rhythm and heading markup consistent across the site.
 */
export function Section({
  children,
  eyebrow,
  title,
  intro,
  id,
  className,
  align = "left",
  tone = "light",
}: {
  children?: ReactNode;
  eyebrow?: string;
  title?: ReactNode;
  intro?: ReactNode;
  id?: string;
  className?: string;
  align?: "left" | "center";
  tone?: "light" | "parchment" | "dark";
}) {
  const toneClasses = {
    light: "bg-cream text-ink",
    parchment: "bg-parchment text-ink",
    dark: "bg-ink text-sand",
  }[tone];

  const headingTone = tone === "dark" ? "text-cream" : "text-ink";
  const introTone = tone === "dark" ? "text-sand/80" : "text-ash";

  return (
    <section
      id={id}
      className={`${toneClasses} px-5 py-16 sm:px-8 sm:py-20 lg:py-24 ${className ?? ""}`}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title || intro) && (
          <header
            className={`max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
          >
            {eyebrow && (
              <p className={`eyebrow ${tone === "dark" ? "text-ochre-soft" : ""}`}>
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`mt-3 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem] ${headingTone}`}
              >
                {title}
              </h2>
            )}
            {title && (
              <div
                className={`rule-ochre mt-6 ${align === "center" ? "mx-auto" : ""}`}
              />
            )}
            {intro && (
              <div
                className={`mt-6 text-base leading-relaxed sm:text-lg ${introTone}`}
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
