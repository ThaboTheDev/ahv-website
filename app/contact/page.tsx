import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the African Hidden Voices research team, or share a story that has gone unheard.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what you know"
        intro="Whether you hold a memory, a document or a name that deserves to be recorded, the research team would like to hear from you."
      />

      <section className="bg-cream px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          {/* Form */}
          <div>
            <h2 className="text-2xl leading-snug sm:text-3xl">
              Send a message
            </h2>
            <div className="rule-ochre mt-5" />
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ash">
              All fields marked with an asterisk are required. Messages go
              directly to{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-brand-700 underline underline-offset-4"
              >
                {CONTACT.email}
              </a>
              .
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Details */}
          <aside className="space-y-8">
            <div className="rounded-sm border border-sand/70 bg-parchment p-7">
              <h2 className="eyebrow">Visit us</h2>
              <address className="mt-4 space-y-4 text-sm not-italic leading-relaxed text-ink-soft">
                <p>
                  {CONTACT.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
                <p>
                  <span className="block text-xs uppercase tracking-wide text-ash">
                    Telephone
                  </span>
                  <a
                    href={CONTACT.phoneHref}
                    className="text-brand-700 underline underline-offset-4"
                  >
                    {CONTACT.phone}
                  </a>
                </p>
                <p>
                  <span className="block text-xs uppercase tracking-wide text-ash">
                    Opening hours
                  </span>
                  {CONTACT.hours}
                </p>
              </address>
            </div>

            <div className="rounded-sm border border-sand/70 bg-parchment p-7">
              <h2 className="eyebrow">Share a story</h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                If you would rather write to us about African history, heritage
                or a story that has gone unheard, use the archive address.
              </p>
              <a
                href={`mailto:${CONTACT.archiveEmail}`}
                className="mt-4 inline-block break-all text-sm font-semibold text-brand-700 underline underline-offset-4"
              >
                {CONTACT.archiveEmail}
              </a>
            </div>

            <div className="rounded-sm border border-sand/70 bg-parchment p-7">
              <h2 className="eyebrow">Follow</h2>
              <ul className="mt-4 space-y-2.5 text-sm">
                {CONTACT.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-brand-700"
                    >
                      {social.label}
                      <svg
                        viewBox="0 0 16 16"
                        aria-hidden
                        className="h-3 w-3 text-ash"
                      >
                        <path
                          d="M5 11L11 5M11 5H6M11 5v5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-sm bg-ink p-7 text-sand">
              <h2 className="eyebrow text-ochre-soft">Find us</h2>
              <p className="mt-4 text-sm leading-relaxed text-sand/80">
                15 Salisbury Street, Marshalltown — in the heart of
                Johannesburg&rsquo;s historic inner city.
              </p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=15+Salisbury+Street+Marshalltown+Johannesburg"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cream underline decoration-ochre underline-offset-4"
              >
                Open in Google Maps
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
