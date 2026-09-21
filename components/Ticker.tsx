import Link from "next/link";
import { SOCIALS, tickerFigures } from "@content/global";
import { SocialIcon } from "@/components/SocialIcons";

/**
 * The header ticker: "The record, as it stands".
 *
 * Every figure is derived from the site's own content by tickerFigures(),
 * never typed by hand, and each links to the page that proves it. The social
 * strip closes the line: the institution's own channels at the same quiet
 * weight as the figures beside them. Below the small breakpoint the strip
 * steps out of the way of the scrolling figures; the mobile menu in
 * SiteHeader carries the same four channels as a chip row there.
 */
export function Ticker() {
  const figures = tickerFigures();

  return (
    <div className="border-b border-rule-soft bg-ink">
      <div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-2 sm:gap-4 sm:px-8">
        <p className="hidden shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-rule-soft/50 md:block">
          The record, as it stands
        </p>

        <ul className="flex flex-1 items-center gap-x-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {figures.map((figure) => (
            <li key={figure.label} className="shrink-0">
              <Link
                href={figure.href}
                className="group flex items-baseline gap-1.5 whitespace-nowrap font-mono text-[0.6875rem] tracking-[0.02em] text-rule-soft/80 transition-colors hover:text-paper"
                title={figure.note}
              >
                <span className="text-xs font-semibold text-ochre-soft">
                  {figure.value}
                </span>
                <span className="underline decoration-transparent decoration-1 underline-offset-2 transition-colors group-hover:decoration-ochre">
                  {figure.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <nav
          aria-label="AHV social channels"
          className="hidden shrink-0 items-center border-l border-paper/10 pl-3 sm:flex sm:pl-4"
        >
          {SOCIALS.map((social) => (
            <a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={`${social.label}: ${social.handle}`}
              aria-label={`${social.label}: ${social.handle}`}
              className="grid h-7 w-7 place-items-center rounded-sm text-rule-soft/60 transition-colors hover:bg-paper/10 hover:text-paper"
            >
              <SocialIcon name={social.label} className="h-3 w-3" />
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
