"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/site";

type Status = "idle" | "error" | "sent";

const SUBJECTS = [
  "I know of a spiritual leader to document",
  "I have documents or photographs to share",
  "Research or academic enquiry",
  "Media and press",
  "Something else",
] as const;

/**
 * Contact form.
 *
 * This site has no backend, so the form composes a structured message and
 * hands it to the visitor's own mail client. To collect submissions
 * server-side instead, POST `payload` to your provider (Formspree, Resend,
 * a Next.js route handler, etc.) in place of the mailto step below.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please tell us your name.";
    if (!email) {
      nextErrors.email = "Please add an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "That email address doesn't look right.";
    }
    if (!message) nextErrors.message = "Please include a message.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setErrors({});

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      message,
      "",
      "— Sent from the African Hidden Voices website",
    ].join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      subject || "Website enquiry",
    )}&body=${encodeURIComponent(body)}`;

    setStatus("sent");
  }

  const fieldClass =
    "w-full rounded-sm border border-sand bg-cream px-3.5 py-2.5 text-sm text-ink placeholder:text-ash/50 focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-ink"
          >
            Name <span className="text-brand-700">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`mt-1.5 ${fieldClass}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-xs text-brand-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-ink"
          >
            Email <span className="text-brand-700">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`mt-1.5 ${fieldClass}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-brand-700">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-ink"
        >
          What is this about?
        </label>
        <select id="subject" name="subject" className={`mt-1.5 ${fieldClass}`}>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-ink"
        >
          Message <span className="text-brand-700">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={`mt-1.5 resize-y ${fieldClass}`}
          placeholder="Tell us about the leader, the story or the material you would like to share."
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-brand-700">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-brand-800 px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-brand-900"
        >
          Send message
        </button>

        <p aria-live="polite" className="text-sm">
          {status === "error" && (
            <span className="text-brand-700">
              Please check the highlighted fields.
            </span>
          )}
          {status === "sent" && (
            <span className="text-ash">
              Opening your email app — or write to us directly at{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-brand-700 underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
              .
            </span>
          )}
        </p>
      </div>
    </form>
  );
}
