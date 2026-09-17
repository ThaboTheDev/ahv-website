/** AHV's books, and the independent scholarship that cites them. */

export interface Publication {
  title: string;
  publisher: string;
  place: string;
  year: string;
  isbn: string;
  body: string;
  /** Prepended to the citation line where a preface author is recorded. */
  byline?: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    title: "An Introduction into Afrikan Indigenous Spirituality",
    publisher: "Isambulo Publications",
    place: "Johannesburg",
    year: "2023",
    isbn: "9780796132277",
    body: "The founding statement of AHV's research position, including the account of the transmission of spiritual consciousness out of Africa. Cited in Introvigne and Šorytė, Cambridge University Press, 2025.",
  },
  {
    title: "Restoring Africa's Spiritual Identity",
    publisher: "Isambulo Publications",
    place: "Johannesburg",
    year: "2024",
    isbn: "9781037019647",
    byline: "Preface by Inkosi Yomoya Imboni Dr uZwi-Lezwe Radebe.",
    body: "The extended statement of the AIS position, including the correction of the inherited scholarly categories and the account of the relationship between spirituality and tradition. Cited throughout Introvigne and Šorytė, Cambridge University Press, 2025.",
  },
];

export interface IndependentStudy {
  title: string;
  authors: string;
  series: string;
  publisher: string;
  year: string;
  doi: string;
  isbn: string;
  italianEdition: string;
  body: string;
}

export const INDEPENDENT_STUDY: IndependentStudy = {
  title:
    "The Revelation Spiritual Home: The Revival of African Indigenous Spirituality",
  authors: "Massimo Introvigne and Rosita Šorytė",
  series: "Elements in New Religious Movements",
  publisher: "Cambridge University Press",
  year: "2025",
  doi: "10.1017/9781009630399",
  isbn: "9781009630405 hardback, 9781009630375 paperback",
  italianEdition:
    "Il risveglio della spiritualità indigena africana, Mimesis Edizioni, 2026",
  body: "The first full-length academic study of The Revelation Spiritual Home, based on fieldwork conducted across 2023 and 2024. African Hidden Voices' published research is cited throughout as the institution's authoritative statement of its own position. Honoured by Fedinsieme in Turin, May 2026, with African Hidden Voices recognised for its collaboration on the research project behind it.",
};

/** Passages quoted from the published text, with their page references. */
export const CITATIONS: { quote: string; source: string }[] = [
  {
    quote:
      "AIS institutions such as TRSH try to dismantle the notion of Africa as a continent with religion in the conventional sense",
    source: "African Hidden Voices 2024, p. 3, quoted in Introvigne and Šorytė 2025",
  },
  {
    quote: "spirituality breathes life into tradition, not the other way around",
    source:
      "African Hidden Voices 2024, pp. 141 to 142, quoted in Introvigne and Šorytė 2025",
  },
  {
    quote:
      "TRSH members designate it as an institution, claiming Radebe's spiritual guides commanded him to establish an African indigenous institution",
    source:
      "African Hidden Voices 2024, pp. 104 to 105, quoted in Introvigne and Šorytė 2025",
  },
];

export interface ForthcomingPublication {
  title: string;
  author: string;
  body: string;
}

export const IN_PREPARATION: ForthcomingPublication[] = [
  {
    title:
      "The Universal Concept of Spirituality: Africa as the Mother of Spirituality",
    author: "African Hidden Voices",
    body: "A twenty-seven chapter account tracing spirituality from Spirit itself, through Africa as its origin, through the elaborations and appropriations of that inheritance across every continent, to the restoration now in motion.",
  },
];

export const RECORD_NOTE =
  "The six AHV Press titles previously listed on this site could not be traced in any catalogue and have been removed. Two books, honestly presented, with their ISBNs and their citation record in a Cambridge University Press volume, outrank six that do not exist.";
