/**
 * The fundraising panel: a floating "Support the research" control on every
 * page and a Subscribe/Donate dialog that opens by itself once per visitor.
 *
 * The behaviour mirrors the standalone AHV fundraising add-on, rebuilt on the
 * site's own stack: the copy and settings live in packages/content, every
 * colour comes from the design tokens in app/globals.css, and there is no
 * second stylesheet to keep in step.
 *
 * How it behaves:
 *
 * - The floating button sits bottom right on every page and opens the panel.
 * - The panel opens by itself on whichever of three triggers comes first:
 *   fourteen seconds on the page, reading 45 per cent of the way down, or the
 *   pointer leaving the top of the window on a desktop. Once. If the visitor
 *   closes it, it stays quiet for fourteen days; if they subscribe, for a
 *   year. It never opens by itself on the pages listed in FUNDRAISING.autoOpen
 *   .excludePaths, where the visitor is already doing the thing it would ask.
 * - Any element with data-ahv-open="donate" or ="subscribe" opens the panel on
 *   that tab. The visitor's focus is restored to it on close.
 * - The panel is a dialog in the accessible sense: focus is trapped inside it
 *   while open, Escape closes it, every field has a label, and the reduced
 *   motion preference removes its animations.
 * - Payment routes are honest: while the tier and donate URLs are null the
 *   panel says payment is not connected, because the registered entity
 *   details come first. Nothing pretends to work.
 *
 * Test hooks, from the browser console:
 *   AHVFundraising.open("donate")  opens the panel on demand
 *   AHVFundraising.reset()         clears the suppression, then reload
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FUNDRAISING,
  type FundraisingTab,
  type SupporterTier,
} from "@content/fundraising";
import { BIRD_PATH } from "@/lib/brand";
import { rand } from "@/lib/format";
import { FUNDRAISE_OPEN_EVENT, fundraiseBus } from "@/components/fundraising-bus";

const AUTO = FUNDRAISING.autoOpen;
const SUBSCRIBE = FUNDRAISING.subscribe;
const DONATE = FUNDRAISING.donate;

/** Suppression state lives in localStorage, per browser, per origin. */
const KEYS = {
  suppressUntil: "ahvFundraising.suppressUntil",
  subscribedAt: "ahvFundraising.subscribedAt",
  /** Set once the panel has opened by itself this session, however it ends. */
  prompted: "ahvFundraising.promptedSession",
} as const;

const DAY_MS = 24 * 60 * 60 * 1000;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Storage can be blocked (private mode, hardened browsers). Never throw. */
function storeGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storeSet(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* no-op */
  }
}

function storeRemove(key: string) {
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* no-op */
  }
}

function sessionGet(key: string): string | null {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function sessionSet(key: string, value: string) {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* no-op */
  }
}

/** Events fire here; Google Tag Manager picks them up when it is present. */
function track(name: string, data: Record<string, unknown> = {}) {
  const dataLayer = window.dataLayer;
  if (Array.isArray(dataLayer)) {
    dataLayer.push({ event: `${FUNDRAISING.analyticsEventPrefix}${name}`, ...data });
  }
}

function isExcluded(pathname: string) {
  return AUTO.excludePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

const money = (amount: number, period: "once" | "monthly") =>
  period === "once" ? rand(amount) : `${rand(amount)} / month`;

/** A swallow from the brand mark, for the floating control. */
function BirdGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="-52 -24 104 42" aria-hidden className={className}>
      <path d={BIRD_PATH} fill="currentColor" />
    </svg>
  );
}

type Errors = { name?: string; email?: string };

export function Fundraising() {
  const pathname = usePathname();
  const [openTab, setOpenTab] = useState<FundraisingTab | null>(null);

  // Subscribe form state.
  const [tierId, setTierId] = useState<string>(SUBSCRIBE.tiers[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [subscribed, setSubscribed] = useState(false);

  // Donate form state.
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [amount, setAmount] = useState<number>(DONATE.defaultAmount);
  const [customAmount, setCustomAmount] = useState("");
  const [usingCustom, setUsingCustom] = useState(false);
  const [donateError, setDonateError] = useState<string | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  /** Where focus was when the panel opened, restored on close. */
  const restoreRef = useRef<HTMLElement | null>(null);
  const autoFiredRef = useRef(false);

  const openPanel = useCallback((tab: FundraisingTab, trigger: "auto" | "manual") => {
    if (trigger === "auto") {
      autoFiredRef.current = true;
      sessionSet(KEYS.prompted, String(Date.now()));
    }
    setOpenTab(tab);
    track("open", { tab, trigger });
    fundraiseBus.dispatchEvent(new CustomEvent(FUNDRAISE_OPEN_EVENT));
  }, []);

  const closePanel = useCallback(
    (reason: "close" | "dismiss" | "cta") => {
      setOpenTab(null);
      track(reason === "dismiss" ? "dismiss" : "close", { reason });
      if (reason !== "cta") {
        // Quiet after a dismissal: fourteen days, per the policy above.
        storeSet(KEYS.suppressUntil, String(Date.now() + AUTO.suppressAfterDismissDays * DAY_MS));
      }
      // Return focus to the control that opened the panel, once rendered out.
      const restore = restoreRef.current;
      restoreRef.current = null;
      window.setTimeout(() => restore?.focus?.(), 0);
    },
    [],
  );

  // Body scroll follows the panel, as it does for the mobile menu.
  useEffect(() => {
    document.body.style.overflow = openTab ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openTab]);

  /**
   * The three auto-open triggers. Whichever comes first, once, subject to
   * the suppression window and the excluded paths.
   */
  useEffect(() => {
    if (!AUTO.enabled) return;
    if (isExcluded(pathname)) return;

    const suppressUntil = Number(storeGet(KEYS.suppressUntil) ?? 0);
    if (Number.isFinite(suppressUntil) && Date.now() < suppressUntil) return;
    if (sessionGet(KEYS.prompted)) return;

    let done = false;
    const fire = () => {
      if (done || autoFiredRef.current) return;
      done = true;
      cleanup();
      restoreRef.current = document.activeElement as HTMLElement | null;
      openPanel(AUTO.defaultTab, "auto");
    };

    const timer = window.setTimeout(fire, AUTO.delayMs);

    const onScroll = () => {
      const doc = document.documentElement;
      // A page that fits on the screen carries no reading signal. Requiring
      // some scrollable depth keeps a short page from opening on first touch.
      if (doc.scrollHeight < window.innerHeight * 1.5) return;
      const percent = ((window.scrollY + window.innerHeight) / doc.scrollHeight) * 100;
      if (percent >= AUTO.scrollPercent) fire();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Exit intent is a desktop courtesy only: pointer leaving the top edge.
    let onLeave: ((e: MouseEvent) => void) | null = null;
    if (AUTO.exitIntent && window.matchMedia("(pointer: fine)").matches) {
      onLeave = (event: MouseEvent) => {
        if (!event.relatedTarget && event.clientY <= 0) fire();
      };
      document.addEventListener("mouseout", onLeave);
    }

    function cleanup() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      if (onLeave) document.removeEventListener("mouseout", onLeave);
    }

    return cleanup;
  }, [pathname, openPanel]);

  /**
   * data-ahv-open anywhere on the site opens the panel on the named tab.
   * Captured at the document so it also intercepts routed links; the href
   * remains the no-JavaScript fallback.
   */
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented) return;
      const origin = event.target instanceof Element ? event.target : null;
      const control = origin?.closest<HTMLElement>("[data-ahv-open]");
      if (!control) return;
      const tab = control.getAttribute("data-ahv-open");
      if (tab !== "subscribe" && tab !== "donate") return;
      event.preventDefault();
      event.stopPropagation();
      restoreRef.current = control;
      openPanel(tab, "manual");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [openPanel]);

  // Keyboard handling for the dialog: Escape closes, Tab is kept inside.
  useEffect(() => {
    if (!openTab) return;

    const panel = panelRef.current;
    // Move focus into the dialog on open.
    const initial = panel?.querySelector<HTMLElement>("[data-autofocus]");
    window.setTimeout(() => initial?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel("close");
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetWidth > 0 || el.offsetHeight > 0);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || active === panel || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || active === panel)) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [openTab, closePanel]);

  /** Console hook for testing, mirroring the add-on's AHVFundraising. */
  useEffect(() => {
    window.AHVFundraising = {
      open: (tab: FundraisingTab = AUTO.defaultTab) => openPanel(tab, "manual"),
      close: () => closePanel("close"),
      reset: () => {
        storeRemove(KEYS.suppressUntil);
        storeRemove(KEYS.subscribedAt);
        sessionRemoveCompat();
      },
    };
    return () => {
      delete window.AHVFundraising;
    };
  }, [openPanel, closePanel]);

  const selectedTier =
    SUBSCRIBE.tiers.find((tier) => tier.id === tierId) ?? SUBSCRIBE.tiers[0];

  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (name.trim().length === 0) nextErrors.name = "This field is required.";
    if (!EMAIL_RE.test(email.trim()))
      nextErrors.email = "That email address does not look right.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    track("subscribe_submit", { tier: selectedTier.id });

    const endpoint = SUBSCRIBE.subscribeEndpoint;
    if (endpoint) {
      // Server-side collection: post the lead before any redirect, so it is
      // kept even if the visitor abandons the payment page.
      void fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim(),
          tier: selectedTier.id,
          source: pathname,
        }),
      }).catch(() => {
        /* the thank-you state stands on its own; nothing to retry loudly */
      });
    } else {
      // No backend yet, as elsewhere on this site: validate in the browser
      // and hand a structured message to the visitor's own mail client.
      const tierLine = `Tier: ${selectedTier.name} (${money(selectedTier.amount, "monthly")})`;
      const body = [
        `${SUBSCRIBE.nameField}: ${name.trim()}`,
        `${SUBSCRIBE.emailField}: ${email.trim()}`,
        tierLine,
        "",
        "Sent from the African Hidden Voices support panel",
      ].join("\n");
      window.location.href = `mailto:${FUNDRAISING.legal.contactEmail}?subject=${encodeURIComponent(
        "Research Digest: subscribe",
      )}&body=${encodeURIComponent(body)}`;
      track("subscribe_redirect");
    }

    setSubscribed(true);
    storeSet(KEYS.subscribedAt, String(Date.now()));
    storeSet(
      KEYS.suppressUntil,
      String(Date.now() + AUTO.suppressAfterSubscribeDays * DAY_MS),
    );
    track("subscribe_done", { tier: selectedTier.id });
  }

  const chosenAmount = usingCustom
    ? Number(customAmount.replace(/[^\d.]/g, "")) || 0
    : amount;
  /** A recurring gift needs a subscription plan, not the one-off page. */
  const donateCtaUrl = frequency === "once" ? DONATE.donateUrl : DONATE.monthlyUrl;

  function handleContinueToPayment() {
    track("donate_click", { amount: chosenAmount, frequency });
    const url = frequency === "once" ? DONATE.donateUrl : DONATE.monthlyUrl;
    if (!url) return;
    if (!Number.isFinite(chosenAmount) || chosenAmount < 1) {
      setDonateError("Enter an amount of at least R1.");
      return;
    }
    try {
      let target = url;
      if (frequency === "once" && DONATE.amountQueryKey) {
        // Hosted pages (Paystack, PayFast) take the amount in minor units.
        const parsed = new URL(url);
        parsed.searchParams.set(DONATE.amountQueryKey, String(Math.round(chosenAmount * 100)));
        target = parsed.toString();
      }
      track("donate_redirect", { amount: chosenAmount, frequency });
      window.location.href = target;
    } catch {
      setDonateError("The payment link is not set correctly. Write to the office below.");
    }
  }

  const tabButton = (tab: FundraisingTab, label: string) => (
    <button
      type="button"
      role="tab"
      id={`ahv-tab-${tab}`}
      aria-selected={openTab === tab}
      aria-controls={`ahv-panel-${tab}`}
      onClick={() => {
        if (openTab !== tab) {
          setOpenTab(tab);
          track("tab", { tab });
        }
      }}
      className={`relative -mb-px border-t border-x px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
        openTab === tab
          ? "border-b-2 border-x-rule border-t-rule border-b-brand-700 bg-paper text-brand-800"
          : "border-x-rule-soft border-t-rule-soft border-b-transparent bg-wash text-ash hover:text-brand-700"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      {/* The floating control. Hidden while the panel is open. */}
      {FUNDRAISING.floatingButton.enabled && !openTab && (
        <button
          type="button"
          onClick={() => {
            restoreRef.current = document.activeElement as HTMLElement | null;
            openPanel(AUTO.defaultTab, "manual");
          }}
          aria-haspopup="dialog"
          className="fixed bottom-4 right-4 z-[60] inline-flex items-center gap-2.5 border border-brand-900/50 bg-brand-800 px-4 py-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-paper shadow-[0_14px_36px_-14px_rgba(69,6,15,0.65)] transition-colors hover:bg-brand-900"
        >
          <BirdGlyph className="h-3.5 w-auto text-brand-200" />
          <span className="hidden sm:inline">{FUNDRAISING.floatingButton.label}</span>
          <span className="sm:hidden">{FUNDRAISING.floatingButton.shortLabel}</span>
        </button>
      )}

      {/* The dialog. */}
      {openTab && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-ink/60 p-0 animate-ahv-backdrop sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePanel("dismiss");
          }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ahv-fund-title"
            tabIndex={-1}
            className="max-h-[94vh] w-full max-w-2xl overflow-y-auto border border-rule border-t-[3px] border-t-brand-700 bg-paper shadow-[0_-8px_60px_rgba(23,21,26,0.28)] animate-ahv-panel"
          >
            <header className="flex items-start justify-between gap-6 px-6 pb-0 pt-6 sm:px-8">
              <div>
                <p className="eyebrow">Support · African Hidden Voices</p>
                <h2
                  id="ahv-fund-title"
                  className="mt-2 text-[1.375rem] leading-tight text-ink sm:text-2xl"
                >
                  {openTab === "subscribe" ? SUBSCRIBE.title : DONATE.title}
                </h2>
              </div>
              <button
                type="button"
                data-autofocus
                onClick={() => closePanel("close")}
                aria-label="Close"
                className="-mr-1 grid h-10 w-10 shrink-0 place-items-center border border-transparent text-ash transition-colors hover:border-rule hover:text-ink"
              >
                <span aria-hidden className="text-lg leading-none">
                  ×
                </span>
              </button>
            </header>

            <div
              role="tablist"
              aria-label="Support the research"
              className="mt-6 flex gap-1 border-b border-rule px-6 sm:px-8"
            >
              {tabButton("subscribe", SUBSCRIBE.eyebrow)}
              {tabButton("donate", DONATE.eyebrow)}
            </div>

            {openTab === "subscribe" ? (
              <section
                id="ahv-panel-subscribe"
                role="tabpanel"
                aria-labelledby="ahv-tab-subscribe"
                className="px-6 py-6 sm:px-8"
              >
                {subscribed ? (
                  <div className="border-l-2 border-brand-700 bg-wash px-5 py-5">
                    <h3 className="font-serif text-lg text-ink">{SUBSCRIBE.thanks.title}</h3>
                    <p className="mt-2 font-serif text-[0.9375rem] leading-relaxed text-ink-soft">
                      {SUBSCRIBE.thanks.body}
                    </p>
                    <p className="mt-3 font-serif text-[0.9375rem] leading-relaxed text-ink-soft">
                      {SUBSCRIBE.thanks.tierNote}
                    </p>
                    {selectedTier.paymentUrl && (
                      <a
                        href={selectedTier.paymentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-brand-800 px-5 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper transition-colors hover:bg-brand-900"
                      >
                        Set up monthly giving
                      </a>
                    )}
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      <button
                        type="button"
                        onClick={() => closePanel("cta")}
                        className="font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4 hover:text-brand-900"
                      >
                        Close
                      </button>
                      <Link
                        href="/newsletter"
                        onClick={() => closePanel("cta")}
                        className="font-mono text-xs text-ash underline decoration-1 underline-offset-4 hover:text-brand-700"
                      >
                        About the Research Digest
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="max-w-lg font-serif text-[0.9375rem] leading-relaxed text-ink-soft">
                      {SUBSCRIBE.body}
                    </p>

                    <fieldset className="mt-6">
                      <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
                        Choose a tier
                      </legend>
                      <div className="mt-3 space-y-px">
                        {SUBSCRIBE.tiers.map((tier) => (
                          <TierRow
                            key={tier.id}
                            tier={tier}
                            checked={tierId === tier.id}
                            pendingLabel={SUBSCRIBE.pendingLabel}
                            onSelect={() => setTierId(tier.id)}
                          />
                        ))}
                      </div>
                    </fieldset>

                    <form onSubmit={handleSubscribe} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="ahv-fund-name"
                          className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft"
                        >
                          {SUBSCRIBE.nameField}
                        </label>
                        <input
                          id="ahv-fund-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "ahv-fund-name-error" : undefined}
                          className="mt-1.5 w-full border border-rule bg-paper px-3 py-2.5 font-sans text-sm text-ink placeholder:text-ash/50 focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                        />
                        {errors.name && (
                          <p id="ahv-fund-name-error" className="mt-1.5 text-xs text-brand-700">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="ahv-fund-email"
                          className="block font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft"
                        >
                          {SUBSCRIBE.emailField}
                        </label>
                        <input
                          id="ahv-fund-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "ahv-fund-email-error" : undefined}
                          className="mt-1.5 w-full border border-rule bg-paper px-3 py-2.5 font-sans text-sm text-ink placeholder:text-ash/50 focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                        />
                        {errors.email && (
                          <p id="ahv-fund-email-error" className="mt-1.5 text-xs text-brand-700">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          className="bg-brand-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-brand-900"
                        >
                          {SUBSCRIBE.submitLabel}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </section>
            ) : (
              <section
                id="ahv-panel-donate"
                role="tabpanel"
                aria-labelledby="ahv-tab-donate"
                className="px-6 py-6 sm:px-8"
              >
                <p className="max-w-lg font-serif text-[0.9375rem] leading-relaxed text-ink-soft">
                  {DONATE.body}
                </p>

                {/* Once or monthly. */}
                <div
                  role="group"
                  aria-label="Giving frequency"
                  className="mt-6 inline-flex border border-rule"
                >
                  {(["once", "monthly"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={frequency === option}
                      onClick={() => setFrequency(option)}
                      className={`px-5 py-2 font-mono text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
                        frequency === option
                          ? "bg-ink text-paper"
                          : "bg-paper text-ash hover:text-brand-700"
                      }`}
                    >
                      {option === "once" ? DONATE.onceLabel : DONATE.monthlyLabel}
                    </button>
                  ))}
                </div>

                {/* Amount. */}
                <p className="mt-7 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft">
                  Amount
                </p>
                <div className="mt-3 grid grid-cols-3 gap-px">
                  {DONATE.amounts.map((option) => {
                    const active = !usingCustom && amount === option.amount;
                    return (
                      <button
                        key={option.amount}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setUsingCustom(false);
                          setAmount(option.amount);
                          setDonateError(null);
                        }}
                        className={`px-3 py-3 text-center font-mono text-sm transition-colors ${
                          active
                            ? "bg-brand-800 text-paper"
                            : "border border-rule bg-paper text-ink-soft hover:border-brand-300 hover:text-brand-800"
                        }`}
                      >
                        {rand(option.amount)}
                      </button>
                    );
                  })}
                </div>

                {usingCustom ? (
                  <div className="mt-3 flex items-center gap-3">
                    <label
                      htmlFor="ahv-fund-custom"
                      className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-soft"
                    >
                      {DONATE.otherLabel} (R)
                    </label>
                    <input
                      id="ahv-fund-custom"
                      type="text"
                      inputMode="numeric"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonateError(null);
                      }}
                      placeholder="250"
                      className="w-32 border border-rule bg-paper px-3 py-2 font-mono text-sm text-ink focus:border-brand-700 focus:outline-none focus:ring-1 focus:ring-brand-700"
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    aria-pressed={false}
                    onClick={() => {
                      setUsingCustom(true);
                      setDonateError(null);
                    }}
                    className="mt-3 font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4 hover:text-brand-900"
                  >
                    {DONATE.otherLabel}
                  </button>
                )}

                {/* What it funds, from the support page's own list. */}
                {!usingCustom && (
                  <p className="mt-5 border-t border-rule pt-4 font-serif text-sm leading-relaxed text-ink-soft">
                    <span className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ash">
                      {DONATE.fundsLabel}:{" "}
                    </span>
                    {DONATE.amounts.find((option) => option.amount === amount)?.funds ??
                      "Field documentation, transcription, translation and verification."}
                  </p>
                )}

                {/* Continue to payment, or the plain state of it. */}
                {donateCtaUrl ? (
                  <button
                    type="button"
                    onClick={handleContinueToPayment}
                    className="mt-7 bg-brand-800 px-6 py-3 font-mono text-xs uppercase tracking-[0.12em] text-paper transition-colors hover:bg-brand-900"
                  >
                    {DONATE.continueLabel} · {money(chosenAmount, frequency)}
                  </button>
                ) : frequency === "monthly" ? (
                  <div className="mt-7 border-l-2 border-ochre bg-wash px-5 py-4">
                    <p className="max-w-lg font-serif text-sm leading-relaxed text-ink-soft">
                      {DONATE.monthlyNote}
                    </p>
                    <a
                      href={`mailto:${FUNDRAISING.legal.contactEmail}?subject=${encodeURIComponent(
                        "Monthly support",
                      )}`}
                      className="mt-3 inline-block font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4 hover:text-brand-900"
                    >
                      {DONATE.paymentPending.emailLabel}
                    </a>
                  </div>
                ) : (
                  <div className="mt-7 border-t-2 border-ink/85 pt-5">
                    <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ochre">
                      {DONATE.paymentPending.title}
                    </h3>
                    <p className="mt-2 max-w-lg font-serif text-sm leading-relaxed text-ink-soft">
                      {DONATE.paymentPending.body}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                      <a
                        href={`mailto:${FUNDRAISING.legal.contactEmail}?subject=${encodeURIComponent(
                          "Support the research",
                        )}`}
                        className="font-mono text-xs text-brand-700 underline decoration-1 underline-offset-4 hover:text-brand-900"
                      >
                        {DONATE.paymentPending.emailLabel}
                      </a>
                      <Link
                        href="/support"
                        onClick={() => closePanel("cta")}
                        className="font-mono text-xs text-ash underline decoration-1 underline-offset-4 hover:text-brand-700"
                      >
                        {DONATE.paymentPending.pageLabel}
                      </Link>
                    </div>
                  </div>
                )}
                {donateError && (
                  <p className="mt-2 text-xs text-brand-700">{donateError}</p>
                )}
              </section>
            )}

            <footer className="border-t border-rule bg-wash px-6 py-5 sm:px-8">
              <p className="max-w-xl font-mono text-[0.6875rem] leading-relaxed text-ash">
                {FUNDRAISING.legal.note}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                <a
                  href={`mailto:${FUNDRAISING.legal.contactEmail}`}
                  className="font-mono text-[0.6875rem] text-brand-700 underline decoration-1 underline-offset-4 hover:text-brand-900"
                >
                  {FUNDRAISING.legal.contactEmail}
                </a>
                <button
                  type="button"
                  onClick={() => closePanel("dismiss")}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ash hover:text-ink"
                >
                  Not now
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}

/** One tier row: a radio styled as a line of the support page's list. */
function TierRow({
  tier,
  checked,
  pendingLabel,
  onSelect,
}: {
  tier: SupporterTier;
  checked: boolean;
  pendingLabel: string;
  onSelect: () => void;
}) {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 border-x border-b px-4 py-3 transition-colors first:border-t ${
        checked
          ? "border-rule bg-paper shadow-[inset_2px_0_0_0_var(--color-brand-700)]"
          : "border-rule-soft bg-paper/60 hover:border-rule"
      }`}
    >
      <input
        type="radio"
        name="ahv-tier"
        className="mt-1 h-4 w-4 accent-brand-800"
        checked={checked}
        onChange={onSelect}
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-serif text-[1rem] font-semibold text-ink">{tier.name}</span>
          <span className="font-mono text-xs font-semibold text-brand-700">
            {money(tier.amount, "monthly")}
          </span>
          {!tier.paymentUrl && (
            <span className="border border-ochre-soft bg-ochre-soft/25 px-1.5 py-0.5 font-mono text-[0.5625rem] uppercase tracking-[0.12em] text-ochre">
              {pendingLabel}
            </span>
          )}
        </span>
        <span className="mt-1 block font-serif text-sm leading-relaxed text-ink-soft">
          {tier.blurb}
        </span>
      </span>
    </label>
  );
}

/** Storage helper for the test hook, guarded like the rest. */
function sessionRemoveCompat() {
  try {
    window.sessionStorage.removeItem(KEYS.prompted);
  } catch {
    /* no-op */
  }
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    AHVFundraising?: {
      open: (tab?: FundraisingTab) => void;
      close: () => void;
      reset: () => void;
    };
  }
}
