/** The AHV Dialogue Series, and the Research Digest. */

export const DIALOGUE_SERIES = {
  title: "The AHV Dialogue Series",
  hashtag: "#UnmaskingAfricanTruths",
  lede: "Long-form recorded dialogue on African Indigenous Spirituality.",
  body: "The episode list on this page matches the AHV channel exactly. No episode appears here that does not exist there, and no guest is named who has not been confirmed by AHV.",
  status:
    "The episode list is being rebuilt directly from the AHV channel so that every episode and every named participant on this page is one AHV has confirmed. Until then, the channel itself is the record.",
  channel: {
    label: "African Hidden Voices on YouTube",
    href: "https://www.youtube.com/@africanhiddenvoicesunmaski830",
  },
};

export interface DigestStream {
  name: string;
  cadence: string;
  body: string;
}

export const RESEARCH_DIGEST = {
  title: "The Research Digest",
  lede: "Monthly. New research, new database records, and institutional notes.",
  streams: [
    {
      name: "Research Digest",
      cadence: "Monthly",
      body: "A curated summary of new AIS research, publications and field reports, with excerpts and links to full papers.",
    },
    {
      name: "Iimboni Database Updates",
      cadence: "As published",
      body: "Notification when a new record is added to the database, with a brief research summary.",
    },
    {
      name: "Institutional News",
      cadence: "As needed",
      body: "Partnerships, conferences, new publications and media appearances.",
    },
    {
      name: "AHV Dialogue Series",
      cadence: "Per episode",
      body: "New episode alerts with a research brief and the key questions discussed.",
    },
  ] satisfies DigestStream[],
  archiveNote:
    "The first issue will be published shortly. Subscribe to receive it. A newsletter page with no archive tells a visitor that no newsletter has been sent, so the archive appears here from the first issue onward.",
};
