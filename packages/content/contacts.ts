/**
 * Institutional contact routes and social channels.
 *
 * One source for every address the site renders or mails to. Page forms
 * (SubmissionForm) import from here rather than hard-coding an address, and
 * the fundraising panel does the same, so a change of route is a change in
 * one file.
 */

/** Where each function of the institution is reached. */
export const INSTITUTION_EMAILS = {
  admin: "admin@africanhiddenvoices.co.za",
  dataAnalyst: "dataanalyst@africanhiddenvoices.co.za",
} as const;

/** The phone line carried on public correspondence. */
export const ADMIN_PHONE = {
  label: "AHV admin",
  display: "069 058 17 26",
  href: "tel:+27690581726",
} as const;

export interface ContactLink {
  label: string;
  /** What the visitor reads on the page. */
  display: string;
  /** What the browser activates: a mailto: or tel: target. */
  href: string;
}

/** The contact block in the footer, in order of use. */
export const CONTACTS: ContactLink[] = [
  {
    label: "General",
    display: INSTITUTION_EMAILS.admin,
    href: `mailto:${INSTITUTION_EMAILS.admin}`,
  },
  {
    label: "Database and records",
    display: INSTITUTION_EMAILS.dataAnalyst,
    href: `mailto:${INSTITUTION_EMAILS.dataAnalyst}`,
  },
  { label: ADMIN_PHONE.label, display: ADMIN_PHONE.display, href: ADMIN_PHONE.href },
];

export interface SocialLink {
  label: string;
  /** The handle or channel name as it appears on the platform. */
  handle: string;
  href: string;
}

/** AHV's published social channels. */
export const SOCIALS: SocialLink[] = [
  {
    label: "X",
    handle: "@african_voices",
    href: "https://x.com/african_voices?s=21",
  },
  {
    label: "Instagram",
    handle: "@african_hidden_voices",
    href: "https://www.instagram.com/african_hidden_voices?stkn=MTQ0aTJiYjVuMDhnaQ==",
  },
  {
    label: "TikTok",
    handle: "@africanhiddenvoices",
    href: "https://www.tiktok.com/@africanhiddenvoices?_r=1&_t=ZS-99poM4j6IHF",
  },
  {
    label: "Facebook",
    handle: "African Hidden Voices",
    href: "https://www.facebook.com/share/1CEH19noY2/?mibextid=wwXIfr",
  },
];
