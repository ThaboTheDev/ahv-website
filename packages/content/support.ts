/** Support the Research. */

export interface SupportTier {
  amount: string;
  body: string;
}

export const SUPPORT = {
  lede: "Field documentation, archival research and publication are the cost of restoring a record that was deliberately closed.",
  intro:
    "Every entry in the Iimboni Database represents travel, time with families and communities, archival access, transcription and translation, and verification. AHV publishes it without charge. This page is how that is paid for.",
  quote: {
    text: "AIS research is not about preserving the past. It is about restoring the present.",
    attribution: "HSRM Imboni Dr uZwi-Lezwe Radebe",
  },
  tiers: [
    { amount: "R100", body: "One new Iimboni Database research entry" },
    { amount: "R250", body: "Field documentation session with a spiritual elder" },
    { amount: "R500", body: "Transcription and translation of one oral testimony" },
    { amount: "R1 000", body: "One month of database hosting and maintenance" },
    { amount: "R2 500", body: "Co-production of one AHV Dialogue Series episode" },
    {
      amount: "R5 000",
      body: "Contribution toward an international joint publication",
    },
  ] satisfies SupportTier[],
  /**
   * The institution requires these to be confirmed and published before the
   * page takes a single payment. Until then, no payment route is offered.
   */
  requiredBeforePayments: [
    "Registered entity name and registration number",
    "NPO or PBO registration number",
    "Section 18A status, and whether tax certificates are issued",
    "Physical address",
    "Receipt and refund policy",
    "Where funds are held and how they are accounted for",
  ],
  majorGiving: {
    title: "Institutional and major giving",
    body: "For institutional gifts, endowment of a research programme, or funding a named database project, contact the office directly.",
  },
} as const;

/** Researcher access to material held under conditions. */
export const RESEARCHER_ACCESS = {
  title: "Researcher Access",
  lede: "Access to the parts of the archive that are not open: material held under conditions set by the families and communities who gave it, and records under verification.",
  notAMemberArea:
    "This is not a member area. Most of the Iimboni Database is open to everyone without an account.",
  open: {
    title: "Open without an account",
    items: [
      "The published records",
      "The documentary method",
      "Every department page",
      "All research and publications",
    ],
  },
  restricted: {
    title: "Requires an account",
    items: [
      "Material held under conditions set by the family or community who gave it",
      "Records under verification",
      "Full oral testimony transcripts",
    ],
  },
  whoMayRegister: {
    title: "Who may register",
    body: "Named researchers with an institutional affiliation, and community members in respect of their own family's material.",
  },
  undertaking: {
    title: "What an account holder undertakes",
    body: "Citation, non-redistribution, and respect for the conditions attached to each item.",
  },
  /** The route is not linked from navigation until authentication exists. */
  available: false,
} as const;

/** Submit a Voice. */
export const SUBMIT_A_VOICE = {
  title: "Do you carry knowledge of an Imboni?",
  body: "If your family or community holds the memory of an Imboni, a spiritual king, a healer or a spiritual leader whose work is not in the record, AHV would like to document it.",
  assurance:
    "You keep the knowledge. AHV documents it, on conditions you set, and returns the record to you before anything is published.",
  fields: [
    "Your name",
    "Relationship to the person",
    "Email",
    "Country",
    "What you know, and how you came to know it",
    "Conditions you wish to place on the material",
  ],
} as const;
