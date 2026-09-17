/**
 * The Iimboni Database.
 *
 * Each entry is a research record, not a biography. Every record carries the
 * same fields, and the fields are shown even when empty, because an empty
 * field is itself information. The field stating what is not established is
 * compulsory.
 */

export type RecordStatus = "Verified" | "Single source" | "Under verification";

export interface DatabaseRecord {
  name: string;
  slug: string;
  /** The office held, in its own terms. */
  office: string;
  /** Birth and death, or birth alone where that is all the record establishes. */
  lifespan: string;
  /** Place, then country. */
  place: string;
  /** Country, used for the database's country count. */
  country: string;
  region: "Southern Africa" | "Central Africa";
  status: RecordStatus;
  /** How the colonial and mission record named the person. */
  colonialLabel: string;
  summary: string;
  /** Compulsory. What the evidence does not establish. */
  notEstablished: string;
}

export const DATABASE_RECORDS: DatabaseRecord[] = [
  {
    name: "Mantsopa Anna Makhetha",
    slug: "mantsopa-anna-makhetha",
    office: "Imboni",
    lifespan: "1793 to 1908",
    place: "Lesotho, and later Modderpoort, Free State",
    country: "Lesotho",
    region: "Southern Africa",
    status: "Under verification",
    colonialLabel: "Prophetess, seer",
    summary:
      "The most widely attested spiritual authority of nineteenth-century Lesotho, whose revelations are recorded across more than a century of testimony.",
    notEstablished:
      "The full sequence of her revelations, and the relationship between the several accounts of her later years, are not yet established from primary sources by AHV's own research.",
  },
  {
    name: "Nehemiah Tile",
    slug: "nehemiah-tile",
    office: "Imboni and founder of an institution",
    lifespan: "1850 to 1891",
    place: "Eastern Cape",
    country: "South Africa",
    region: "Southern Africa",
    status: "Under verification",
    colonialLabel: "Founder, Tembu National Church",
    summary:
      "Founder of the first African-governed institution in South Africa to break from mission control, and the earliest documented case of an African spiritual authority reclaiming institutional ground under colonial administration.",
    notEstablished:
      "AHV has not yet conducted its own archival work on this record.",
  },
  {
    name: "Nontetha Nkwenkwe",
    slug: "nontetha-nkwenkwe",
    office: "Imboni",
    lifespan: "1875 to 1935",
    place: "Eastern Cape",
    country: "South Africa",
    region: "Southern Africa",
    status: "Under verification",
    colonialLabel: "Prophetess",
    summary:
      "Detained by the colonial authorities for her spiritual teaching, and held until her death.",
    notEstablished:
      "The archival file references have not yet been verified by AHV against the holding institutions.",
  },
  {
    name: "Isaiah Shembe",
    slug: "isaiah-shembe",
    office: "Imboni and founder of an institution",
    lifespan: "born 1870",
    place: "KwaZulu-Natal",
    country: "South Africa",
    region: "Southern Africa",
    status: "Under verification",
    colonialLabel: "Founder, Nazareth Baptist Church",
    summary:
      "Founder of one of the largest African-founded institutions in Southern Africa, and central to the question of what the African-initiated institutions preserved and what they could not restore.",
    notEstablished:
      "AHV has not yet conducted its own field documentation on this record.",
  },
  {
    name: "Simon Kimbangu",
    slug: "simon-kimbangu",
    office: "Imboni and founder of an institution",
    lifespan: "born 1887",
    place: "Congo",
    country: "Democratic Republic of the Congo",
    region: "Central Africa",
    status: "Under verification",
    colonialLabel: "Founder of the Kimbanguist movement",
    summary:
      "Imprisoned by the colonial administration for the whole of his adult ministry, and the most documented single case of the criminalisation of African spiritual authority.",
    notEstablished:
      "The archival references have not yet been verified by AHV.",
  },
  {
    name: "Elliot Kamwana",
    slug: "elliot-kamwana",
    office: "Imboni",
    lifespan: "circa 1882 to 1956",
    place: "Nkhata Bay, Lake Malawi",
    country: "Malawi",
    region: "Central Africa",
    status: "Under verification",
    colonialLabel: "Prophet and church founder",
    summary:
      "Tonga spiritual leader, deported by the colonial administration.",
    notEstablished:
      "AHV has not yet conducted its own archival work on this record.",
  },
  {
    name: "Alice Lenshina Mulenga",
    slug: "alice-lenshina-mulenga",
    office: "Imboni and founder of an institution",
    lifespan: "born 1920",
    place: "Chinsali, Northern Rhodesia, now Zambia",
    country: "Zambia",
    region: "Central Africa",
    status: "Under verification",
    colonialLabel: "Prophetess, founder of the Lumpa Church",
    summary:
      "One of the most substantial cases of a woman holding spiritual authority at national scale in twentieth-century Africa.",
    notEstablished:
      "AHV has not yet conducted its own field documentation on this record.",
  },
  {
    name: "Johanne Masowe",
    slug: "johanne-masowe",
    office: "Imboni and founder of an institution",
    lifespan: "born 1914",
    place: "Gandanzara, Makoni district",
    country: "Zimbabwe",
    region: "Southern Africa",
    status: "Under verification",
    colonialLabel: "Founder, Apostolic Church in Zion",
    summary:
      "Founder of an institution that spread across several countries, and a case study in transmission without text.",
    notEstablished:
      "AHV has not yet conducted its own field documentation on this record.",
  },
  {
    name: "Vusamazulu Credo Mutwa",
    slug: "vusamazulu-credo-mutwa",
    office: "Sangoma, author and elder",
    lifespan: "1921 to 2020",
    place: "KwaZulu-Natal",
    country: "South Africa",
    region: "Southern Africa",
    status: "Under verification",
    colonialLabel: "Sangoma, author",
    summary:
      "The most widely published African spiritual authority of the twentieth century, and the subject of substantial and unresolved scholarly discussion.",
    notEstablished:
      "The independent scholarly record does not establish a conferral event between Mutwa and HSRM. Where AHV's own corpus records one, it is presented in the corpus's own voice and attributed, not as an external finding.",
  },
];

/** The documentary method, applied to every record. */
export const DOCUMENTARY_METHOD: {
  title: string;
  body: string;
}[] = [
  {
    title: "Locate",
    body: "Researchers work from the colonial and mission archives, from state records, from published scholarship and from the communities themselves. Many of these figures appear in the record only because an administration prosecuted them, which means the archive that erased them is also the archive that preserved them, and it must be read accordingly.",
  },
  {
    title: "Document",
    body: "Oral testimony is taken with the consent of the family or community and on stated conditions. Archival material is cited to the holding institution and the file reference. Field documentation is dated and attributed.",
  },
  {
    title: "Corroborate",
    body: "A record is published as Verified where independent sources agree; as Single source where they do not yet exist; as Under verification while the work continues. The status is always visible.",
  },
  {
    title: "Return",
    body: "Each record is returned to the family or community it concerns before publication wherever it is possible to do so.",
  },
];

export const DATABASE_LIMITS: string[] = [
  "It does not resolve disputes between communities about lineage or standing.",
  "It does not publish material given in confidence.",
  "It does not present a claim as established because it is widely repeated.",
];

/** Distinct countries represented, for the ticker and page figures. */
export function databaseCountries(): string[] {
  return [...new Set(DATABASE_RECORDS.map((record) => record.country))].sort();
}

export function getRecord(slug: string): DatabaseRecord | undefined {
  return DATABASE_RECORDS.find((record) => record.slug === slug);
}
