/** Foundations: where to begin, for readers new to African Indigenous Spirituality. */

export interface Distinction {
  number: string;
  body: string;
}

export const FOUNDATIONS = {
  lede: "Where to begin, for readers new to African Indigenous Spirituality.",
  intro:
    "Most people arriving here have been taught about African spirituality with words that do not belong to it. This page is a reading path, not an argument. It sets out the distinctions in the order they need to be understood, and points to where each is worked out in full.",
  distinctions: [
    { number: "01", body: "Spirit is not a part of the person. It is what the person is." },
    {
      number: "02",
      body: "Spirituality is not religion. Religion is a taught experience; spirituality is a revealed one.",
    },
    {
      number: "03",
      body: "Africa did not have religion. It had, and has, Ezomoya Zakwantu.",
    },
    {
      number: "04",
      body: "An Imboni is the spiritual guider of a nation. The office receives Isambulo. It is not an office any of the imported words name, and it long predates them.",
    },
    {
      number: "05",
      body: "Umoya is not the Holy Spirit. A deity is not an angel. A healer is not a witchdoctor.",
    },
    {
      number: "06",
      body: "Tradition does not stand above spirituality. Spirituality reveals; tradition keeps.",
    },
    {
      number: "07",
      body: "Revelation is not belief. It is a mode of knowing, with its own conditions.",
    },
    {
      number: "08",
      body: "This is restoration, not recovery. What is being restored was never lost.",
    },
  ] satisfies Distinction[],
  thenRead: [
    {
      label: "The two AHV books",
      body: "Each with what it does.",
      href: "/publications",
    },
    {
      label: "The Cambridge Element",
      body: "The independent account.",
      href: "/publications#independent-study",
    },
    {
      label: "The Dialogue Series",
      body: "Starting with the entry-point episodes.",
      href: "/media",
    },
  ],
} as const;
