"use client";

import { useState } from "react";

/**
 * A submission form driven by a list of field labels.
 *
 * The site has no backend, so the form validates in the browser and then
 * hands a structured message to the visitor's own mail client. To collect
 * submissions server-side instead, replace the mailto step with a POST to a
 * route handler under app/api: the validated values are already assembled in
 * `body`.
 */

const MULTILINE = /what you know|question at issue|subject|proposal|conditions/i;

export function SubmissionForm({
  fields,
  to,
  subject,
  submitLabel = "Send",
  assurance,
}: {
  fields: readonly string[];
  to: string;
  subject: string;
  submitLabel?: string;
  assurance?: string;
}) {
  const [status, setStatus] = useState<"idle" | "error" | "sent">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const idFor = (label: string) =>
    `f-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const nextErrors: Record<string, string> = {};

    for (const label of fields) {
      const value = String(data.get(label) ?? "").trim();
      const isEmail = /email/i.test(label);
      if (value.length === 0) {
        nextErrors[label] = "This field is required.";
      } else if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        nextErrors[label] = "That email address does not look right.";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setErrors({});

    const lines = fields.map(
      (label) => `${label}: ${String(data.get(label) ?? "").trim()}`,
    );
    const body = [
      ...lines,
      "",
      "Sent from the African Hidden Voices website",
    ].join("\n");

    window.location.href = `mailto:${to}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    setStatus("sent");
  }

  const fieldClass =
    "mt-1.5 w-full border border-rule bg-paper px-3 py-2.5 font-sans text-sm text-ink placeholder:text-ash/50 focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {fields.map((label) => {
        const id = idFor(label);
        const error = errors[label];
        const isEmail = /email/i.test(label);
        const textarea = MULTILINE.test(label);

        return (
          <div key={label}>
            <label
              htmlFor={id}
              className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft"
            >
              {label}
            </label>

            {textarea ? (
              <textarea
                id={id}
                name={label}
                rows={5}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className={`resize-y ${fieldClass}`}
              />
            ) : (
              <input
                id={id}
                name={label}
                type={isEmail ? "email" : "text"}
                autoComplete={
                  isEmail
                    ? "email"
                    : /your name/i.test(label)
                      ? "name"
                      : undefined
                }
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `${id}-error` : undefined}
                className={fieldClass}
              />
            )}

            {error && (
              <p id={`${id}-error`} className="mt-1.5 text-xs text-brand-700">
                {error}
              </p>
            )}
          </div>
        );
      })}

      {assurance && (
        <p className="border-l-2 border-ochre pl-4 font-serif text-sm leading-relaxed text-ink-soft">
          {assurance}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
        <button
          type="submit"
          className="bg-brand-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-brand-900"
        >
          {submitLabel}
        </button>

        <p aria-live="polite" className="font-mono text-xs text-ash">
          {status === "error" && (
            <span className="text-brand-700">
              Please check the highlighted fields.
            </span>
          )}
          {status === "sent" && (
            <span>
              Opening your email application. You can also write to{" "}
              <a href={`mailto:${to}`} className="link-brand">
                {to}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
