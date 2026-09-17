/** Engagement: academic partnership, government and policy, and media. */

export interface EngageChannel {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  /** Documented precedent, where one exists. */
  precedent?: string;
  /** Form field labels, in order. */
  fields: string[];
  /** Which institutional address the form routes to. */
  routesTo: string;
}

export const ENGAGE_LEDE =
  "AHV works with universities, research councils, government bodies, spiritual institutions and interdisciplinary research sectors.";
export const ENGAGE_INTRO =
  "AHV engages as an institution. It collaborates in research, it co-supervises, it publishes jointly, and it advises. What it does not do is supply informants for work in which African Indigenous Spirituality is the object and the frame belongs to someone else. Partnership here means the frame is shared.";

export const ENGAGE_CHANNELS: EngageChannel[] = [
  {
    slug: "universities",
    title: "Academic partnership",
    summary:
      "Joint research programmes, co-supervised postgraduate work, visiting researchers and archive access.",
    body: [
      "Joint research programmes, co-supervised postgraduate work, visiting researchers, conference collaboration, curriculum development, and access to the Iimboni Database for scholarly use.",
    ],
    precedent:
      "The Indigenous Knowledge Systems Conference co-hosted with the University of Fort Hare in December 2025, and the journal special issue arising from it.",
    fields: [
      "Institution",
      "Department",
      "Your name",
      "Email",
      "Nature of the proposal",
      "Timeline",
    ],
    routesTo: "partnerships@africanhiddenvoices.org",
  },
  {
    slug: "government",
    title: "Government and policy",
    summary:
      "Advisory work on the recognition of spirituality as a distinct category in law and policy.",
    body: [
      "Advisory work on the recognition of spirituality as a distinct category in law and policy, on the position of spiritual authority alongside traditional leadership, on indigenous knowledge policy, and on heritage and site custodianship.",
    ],
    fields: ["Body", "Portfolio", "Your name", "Email", "The question at issue"],
    routesTo: "partnerships@africanhiddenvoices.org",
  },
  {
    slug: "media",
    title: "Media and speaking",
    summary:
      "Invitations to HSRM Imboni Dr uZwi-Lezwe Radebe and to AHV researchers.",
    body: [
      "Invitations to HSRM Imboni Dr uZwi-Lezwe Radebe and to AHV researchers; interviews; documentary participation; and the media kit.",
    ],
    fields: [
      "Outlet",
      "Format",
      "Your name",
      "Email",
      "Date",
      "Audience",
      "Subject",
    ],
    routesTo: "press@africanhiddenvoices.org",
  },
];

export function getEngageChannel(slug: string): EngageChannel | undefined {
  return ENGAGE_CHANNELS.find((channel) => channel.slug === slug);
}
