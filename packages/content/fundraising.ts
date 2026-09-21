/**
 * The fundraising panel: the floating "Support the research" control and the
 * Subscribe/Donate dialog rendered by components/Fundraising.tsx on every page.
 *
 * This file is configuration and copy only. It carries the behaviour of the
 * standalone AHV fundraising add-on (auto-open rules, tiers, suppression,
 * payment routes, legal note) so that the panel is edited like every other
 * part of the site's record, subject to HOUSE-STYLE.md.
 *
 * Nothing here pretends a payment route exists. Every paymentUrl is null
 * until the institution publishes its registered entity details, which
 * SUPPORT.requiredBeforePayments says must come first; the panel then says so
 * plainly and routes support through the office. To take payments, create the
 * plan or page in the payment provider's dashboard (Paystack, PayFast, Yoco or
 * a Stripe Payment Link all work) and set the URLs below.
 */

import { SUPPORT } from "./support";
import { INSTITUTION_EMAILS } from "./contacts";

export interface SupporterTier {
  id: string;
  name: string;
  /** Monthly amount in rand. */
  amount: number;
  blurb: string;
  /**
   * Hosted payment page for this tier's monthly plan, created in the
   * provider's dashboard. Null shows "Payment link pending" on the tier.
   */
  paymentUrl: string | null;
}

export interface FundraisingDonationAmount {
  /** Rand. Derived from the support tiers so the figures cannot diverge. */
  amount: number;
  /** What this amount funds, from the support page's own list. */
  funds: string;
}

const parseAmount = (label: string): number =>
  Number(label.replace(/[^\d]/g, ""));

const donationAmounts: FundraisingDonationAmount[] = SUPPORT.tiers.map(
  (tier) => ({
    amount: parseAmount(tier.amount),
    funds: tier.body,
  }),
);

export const FUNDRAISING = {
  /** The control in the bottom corner of every page. */
  floatingButton: {
    enabled: true,
    label: "Support the research",
    /** Used where the full label does not fit. */
    shortLabel: "Support",
  },

  /**
   * The panel opens by itself once per visitor, on whichever of the three
   * triggers comes first, then stays quiet: fourteen days after a dismissal,
   * a year after a subscription. It never opens by itself on the pages where
   * the visitor is already doing the thing it would ask for.
   */
  autoOpen: {
    enabled: true,
    /** Milliseconds on the page before the panel may open. */
    delayMs: 14000,
    /** Percentage of the page read before the panel may open. */
    scrollPercent: 45,
    /** Pointer leaving the top of the window, desktop only. */
    exitIntent: true,
    defaultTab: "subscribe" as const,
    suppressAfterDismissDays: 14,
    suppressAfterSubscribeDays: 365,
    excludePaths: ["/support", "/account", "/engage", "/database/submit"],
  },

  /**
   * Subscribe: choose a tier, enter a name and an email address. The panel
   * has no backend to post to; while `subscribeEndpoint` is null the form
   * validates in the browser and hands a structured message to the visitor's
   * own mail client, which is how every form on this site behaves. Set the
   * endpoint to a route handler or a list provider's form URL to collect
   * subscriptions server-side instead.
   */
  subscribe: {
    eyebrow: "Subscribe",
    title: "The record, monthly, with your support attached",
    body:
      "Two subscription options at present: the Research Digest, and institutional access for collaboration and AHV research data. Choose a tier and leave your name and email.",
    /** The only two options for now, per the institution's direction. */
    tiers: [
      {
        id: "digest",
        name: "Research Digest",
        amount: 50,
        blurb: "New research, database records and institutional notes, monthly",
        paymentUrl: null,
      },
      {
        id: "institutional",
        name: "Institutional",
        amount: 1500,
        blurb:
          "For institutions that wish to collaborate with AHV or work with its research data",
        paymentUrl: null,
      },
    ] satisfies SupporterTier[],
    /** A JSON POST target, or null for the mail-client route. */
    subscribeEndpoint: null as string | null,
    nameField: "Your name",
    emailField: "Email",
    submitLabel: "Subscribe",
    pendingLabel: "Payment link pending",
    thanks: {
      title: "The digest will reach you",
      body:
        "Your details are with the office, and the digest will reach you from its first issue.",
      tierNote:
        "Your monthly tier begins once the institution publishes its payment plans; nothing has been charged.",
    },
  },

  /**
   * Donate: choose once or monthly, choose an amount, continue to payment.
   * `donateUrl` is null until the institution may take money, and the panel
   * then says plainly that payment is not connected and routes the visitor to
   * the support page and the office.
   */
  donate: {
    eyebrow: "Donate",
    title: "Fund what the record costs",
    body: SUPPORT.lede,
    onceLabel: "Once",
    monthlyLabel: "Monthly",
    amounts: donationAmounts,
    defaultAmount: 500,
    otherLabel: "Other amount",
    fundsLabel: "What this funds",
    continueLabel: "Continue to payment",
    /**
     * The hosted one-off payment page. Leave null until the registered
     * entity details are published. When set, the chosen amount is appended
     * in minor units under `amountQueryKey`, which is what a Paystack or
     * PayFast hosted page expects.
     */
    donateUrl: null as string | null,
    /**
     * The provider subscription plan page for monthly giving, created in the
     * provider's dashboard. A recurring gift cannot run off a one-off page,
     * so while this is null the panel says so plainly instead of pretending.
     */
    monthlyUrl: null as string | null,
    amountQueryKey: "amount",
    monthlyNote:
      "Monthly giving runs on a subscription plan from the payment provider. Until AHV publishes one, monthly donations are arranged through the office.",
    paymentPending: {
      title: "Payment is not connected yet",
      body:
        "AHV does not take a payment before its registered entity name, registration number, NPO or PBO status and section 18A position are published. Until then, support is arranged with the office directly.",
      emailLabel: "Write to the office",
      pageLabel: "Read how support funds the research",
    },
  },

  /**
   * The footer of the panel. A page that takes money must say who receives
   * it, so the same details the footer carries are shown here; they render
   * as "to be confirmed" until INSTITUTION.registration is settled.
   */
  legal: {
    contactEmail: INSTITUTION_EMAILS.admin,
    note:
      "African Hidden Voices (AHV) Research Institution, Johannesburg. Registered entity details, NPO or PBO number and section 18A status are to be confirmed before the panel takes a payment.",
  },

  /**
   * Analytics. Every action pushes `ahv_<name>` to the Google Tag Manager
   * dataLayer when one is present on the page.
   */
  analyticsEventPrefix: "ahv_",
} as const;

export type FundraisingConfig = typeof FUNDRAISING;
export type FundraisingTab = "subscribe" | "donate";
