"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { Ticker } from "@/components/Ticker";
import { PRIMARY_NAV, UTILITY_NAV } from "@content/global";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Elevate the header once the page has scrolled past the ticker.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50">
      <Ticker />

      <div
        className={`border-b bg-paper transition-colors duration-200 ${
          scrolled ? "border-rule shadow-[0_1px_0_0_rgba(23,21,26,0.04)]" : "border-rule-soft"
        }`}
      >
        <div className="mx-auto flex h-[4.5rem] max-w-5xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link
            href="/"
            aria-label="African Hidden Voices Research Institution, home"
            className="shrink-0"
          >
            <Logo />
          </Link>

          {/* Desktop navigation */}
          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-0.5">
              {PRIMARY_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`relative block px-2.5 py-2 text-[0.8125rem] font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-brand-800"
                        : "text-ink-soft hover:text-brand-700"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span
                        aria-hidden
                        className="absolute inset-x-2.5 bottom-0.5 h-px bg-brand-700"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile and tablet toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 grid h-11 w-11 place-items-center text-ink xl:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-all duration-200 ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-6 bg-current transition-opacity duration-200 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-all duration-200 ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="site-menu"
        hidden={!open}
        className="max-h-[calc(100vh-6rem)] overflow-y-auto border-b border-rule bg-paper xl:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto max-w-5xl px-5 py-5 sm:px-8">
          <ul className="divide-y divide-rule-soft">
            {PRIMARY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block py-3 font-serif text-lg ${
                    isActive(item.href) ? "text-brand-800" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-6">Also</p>
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {UTILITY_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="font-mono text-xs text-ash transition-colors hover:text-brand-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
