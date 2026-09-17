import Link from "next/link";
import { BrandMark, Wordmark } from "@/components/Logo";
import { CONTACT, NAV, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-ink text-sand">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1.2fr] md:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <BrandMark
                idSuffix="footer"
                className="h-14 w-auto"
                title="African Hidden Voices"
              />
              <Wordmark className="text-base font-semibold text-cream" />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/75">
              {SITE.tagline}
            </p>
            <div className="rule-ochre mt-6" />
          </div>

          {/* Navigate */}
          <nav aria-label="Footer">
            <h2 className="eyebrow text-ochre-soft">Navigate</h2>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-sand/80 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="eyebrow text-ochre-soft">Contact</h2>
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-sand/80">
              <p>
                {CONTACT.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p>
                <a
                  href={CONTACT.phoneHref}
                  className="transition-colors hover:text-cream"
                >
                  {CONTACT.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="break-all transition-colors hover:text-cream"
                >
                  {CONTACT.email}
                </a>
              </p>
            </address>

            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {CONTACT.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-sand/70 underline decoration-sand/30 underline-offset-4 transition-colors hover:text-cream hover:decoration-ochre"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-sand/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-sand/55">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-sand/55">
            An initiative of the{" "}
            <span className="text-sand/75">B Radebe Foundation</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
