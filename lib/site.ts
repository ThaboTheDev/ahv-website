/** Site-wide configuration: navigation, contact details and metadata. */

export const SITE = {
  name: "African Hidden Voices",
  shortName: "AHV",
  tagline: "Retracing the steps of Africa's indigenous spiritual leaders.",
  description:
    "African Hidden Voices is a research organisation retracing the steps and works of Africa's IImboni, kings and spiritual leaders — so that their voices are no longer suppressed.",
  url: "https://africanhiddenvoices.co.za",
} as const;

export const CONTACT = {
  addressLines: [
    "15 Salisbury Street",
    "Salisbury Claims",
    "Johannesburg, 2001",
    "South Africa",
  ],
  phone: "+27 87 160 0352",
  phoneHref: "tel:+27871600352",
  email: "info@africanhiddenvoices.co.za",
  archiveEmail: "tell-us@africanhiddenvoices.co.za",
  hours: "Weekdays, 08:00 – 16:00",
  socials: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/pg/AfricanHiddenVoices/about/",
    },
    { label: "X (Twitter)", href: "https://twitter.com/african_voices" },
    {
      label: "Mixcloud",
      href: "https://www.mixcloud.com/AfricanHiddenVoices/",
    },
  ],
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "The Voices", href: "/voices" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
] as const;
