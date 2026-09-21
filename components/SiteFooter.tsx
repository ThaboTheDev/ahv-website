import Link from "next/link";
import { BrandMark, Wordmark } from "@/components/Logo";
import { SocialIcon } from "@/components/SocialIcons";
import {
  CONTACTS,
  FOOTER_COLUMNS,
  INSTITUTION,
  MOTTO,
  SOCIALS,
  STANDING_LINE,
  UTILITY_NAV,
} from "@content/global";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-rule bg-ink text-rule-soft">
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2.2fr]">
          {/* Identity */}
          <div>
            <div className="flex items-center gap-3">
              <BrandMark
                idSuffix="footer"
                className="h-12 w-auto"
                title="African Hidden Voices"
              />
              <Wordmark className="text-[0.8125rem] font-semibold text-paper" />
            </div>

            <p className="mt-5 max-w-xs font-serif text-sm leading-relaxed text-rule-soft/75">
              {INSTITUTION.description}
            </p>

            <p className="mt-5 font-mono text-[0.6875rem] leading-relaxed text-rule-soft/50">
              {INSTITUTION.registration.entityName ??
                "Registered entity name to be confirmed"}
              {" · "}
              {INSTITUTION.registration.registrationNumber ??
                "Registration number to be confirmed"}
              {" · "}
              {INSTITUTION.location}
            </p>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
                  {column.heading}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-rule-soft/80 transition-colors hover:text-paper"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Digest, contact and channels */}
        <div className="mt-12 grid gap-8 border-t border-rule-soft/20 pt-8 lg:grid-cols-3">
          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
              Research Digest
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-rule-soft/75">
              Monthly. New research, database records, and institutional notes.
            </p>
            {/* The panel intercepts this click and opens on the subscribe tab;
                the href remains for visitors without JavaScript. */}
            <a
              href="/newsletter"
              data-ahv-open="subscribe"
              className="mt-3 inline-block font-mono text-xs text-paper underline decoration-ochre decoration-1 underline-offset-4"
            >
              Subscribe
            </a>
          </div>

          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
              Contact
            </h2>
            <ul className="mt-3 space-y-2">
              {CONTACTS.map((contact) => (
                <li key={contact.href} className="text-sm">
                  <span className="text-rule-soft/50">{contact.label}: </span>
                  <a
                    href={contact.href}
                    className="break-all text-rule-soft/85 transition-colors hover:text-paper"
                  >
                    {contact.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:text-right">
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
              Follow AHV
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 lg:justify-end">
              {SOCIALS.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 text-sm text-rule-soft/80 transition-colors hover:text-paper"
                    title={`${social.label}: ${social.handle}`}
                  >
                    <SocialIcon
                      name={social.label}
                      className="h-3 w-3 shrink-0 text-rule-soft/60 transition-colors group-hover:text-ochre-soft"
                    />
                    <span className="border-b border-transparent pb-px transition-colors group-hover:border-ochre group-hover:text-paper">
                      {social.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Utility navigation */}
        <nav
          aria-label="Utility"
          className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-rule-soft/20 pt-6"
        >
          {UTILITY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-rule-soft/60 transition-colors hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="mt-8 max-w-3xl font-mono text-[0.6875rem] leading-relaxed text-rule-soft/45">
          {STANDING_LINE}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-rule-soft/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] text-rule-soft/50">
            © {year} {INSTITUTION.shortName}. All rights reserved.
          </p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
            {MOTTO}
          </p>
        </div>
      </div>
    </footer>
  );
}
