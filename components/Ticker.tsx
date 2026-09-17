import Link from "next/link";
import { tickerFigures } from "@content/global";

/**
 * The header ticker: "The record, as it stands".
 *
 * Every figure is derived from the site's own content by tickerFigures(),
 * never typed by hand, and each links to the page that proves it.
 */
export function Ticker() {
  const figures = tickerFigures();

  return (
    <div className="border-b border-rule-soft bg-ink">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-5 py-2 sm:px-8">
        <p className="hidden shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-rule-soft/50 md:block">
          The record, as it stands
        </p>

        <ul className="flex flex-1 items-center gap-x-5 gap-y-1 overflow-x-auto">
          {figures.map((figure) => (
            <li key={figure.label} className="shrink-0">
              <Link
                href={figure.href}
                className="group flex items-baseline gap-1.5 font-mono text-[0.6875rem] tracking-[0.02em] text-rule-soft/80 transition-colors hover:text-paper"
                title={figure.note}
              >
                <span className="text-xs font-semibold text-ochre-soft">
                  {figure.value}
                </span>
                <span className="whitespace-nowrap underline decoration-transparent decoration-1 underline-offset-2 transition-colors group-hover:decoration-ochre">
                  {figure.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
