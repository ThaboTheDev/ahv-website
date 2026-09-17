/** Research output: conference papers, appearances and method. */

export interface ConferencePaper {
  title: string;
  author: string;
  venue: string;
  date: string;
  /** Optional external link to the programme. */
  source?: { label: string; href: string };
}

export const CONFERENCE_PAPERS: ConferencePaper[] = [
  {
    title: "Prophets and Spiritual Guides: A Comparison",
    author: "Tshidiso Gama",
    venue:
      "CESNUR International Conference, Université Bordeaux Montaigne",
    date: "June 2024",
  },
  {
    title:
      "Differences between Religion, Universal Spirituality, and African Indigenous Spirituality",
    author: "Palesa Hloele",
    venue:
      "CESNUR International Conference, Université Bordeaux Montaigne",
    date: "June 2024",
  },
  {
    title:
      "A Metaphysical Analysis of the Universal Concept of Spirituality as Influenced by African Indigenous Spirituality",
    author: "Sam Langa",
    venue: "CESNUR International Conference, Cape Town",
    date: "November 2025",
  },
];

export interface Conference {
  date: string;
  title: string;
  body: string;
  source?: { label: string; href: string };
}

/** Institutional conference appearances, in reverse chronological order. */
export const CONFERENCES: Conference[] = [
  {
    date: "November 2025",
    title: "CESNUR International Conference, Cape Town",
    body: "A full conference session was devoted to The Revelation Spiritual Home, including an AHV paper on the metaphysics of the universal concept of spirituality as influenced by African Indigenous Spirituality, with HSRM as respondent. Conference field visits were made to TRSH.",
    source: {
      label: "CESNUR 2025 programme",
      href: "https://www.cesnur.org/2025/cape_town-program.htm",
    },
  },
  {
    date: "November 2024",
    title: "Scholars and spiritual leaders in dialogue, University of South Africa",
    body: "Scholars and spiritual leaders in dialogue on African Indigenous Spirituality at the University of South Africa, Pretoria, with AHV's chairperson among the speakers.",
  },
  {
    date: "June 2024",
    title: "CESNUR International Conference, Université Bordeaux Montaigne",
    body: "AHV researchers presented in the plenary session on African prophecy and African spirituality: a comparison of prophets and spiritual guides, and a paper on the differences between religion, universal spirituality and African Indigenous Spirituality.",
    source: {
      label: "CESNUR 2024 programme",
      href: "https://www.cesnur.org/2024/bordeaux-program.htm",
    },
  },
];

/** The numbering convention for working papers. */
export const WORKING_PAPER_SERIES = {
  prefix: "AHV-WP",
  note: "The first working papers are in preparation. This section will list them with author, department, date, abstract and a downloadable PDF.",
};
