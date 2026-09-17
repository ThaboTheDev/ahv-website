import Link from "next/link";
import { BrandMark, Wordmark } from "@/components/Logo";
import {
  CONTACTS,
  FOOTER_COLUMNS,
  INSTITUTION,
  MOTTO,
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

        {/* Digest and utility */}
        <div className="mt-12 grid gap-8 border-t border-rule-soft/20 pt-8 sm:grid-cols-2">
          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
              Research Digest
            </h2>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-rule-soft/75">
              Monthly. New research, database records, and institutional notes.
            </p>
            <Link
              href="/newsletter"
              className="mt-3 inline-block font-mono text-xs text-paper underline decoration-ochre decoration-1 underline-offset-4"
            >
              Subscribe
            </Link>
          </div>

          <div className="sm:text-right">
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre-soft">
              Contact
            </h2>
            <ul className="mt-3 space-y-2">
              {CONTACTS.map((contact) => (
                <li key={contact.address} className="text-sm">
                  <span className="text-rule-soft/50">{contact.label}: </span>
                  <a
                    href={`mailto:${contact.address}`}
                    className="break-all text-rule-soft/85 transition-colors hover:text-paper"
                  >
                    {contact.address}
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
