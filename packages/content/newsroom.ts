/** Newsroom: institutional announcements and research notes. */

export interface Announcement {
  date: string;
  category: string;
  title: string;
  body: string;
  source?: { label: string; href: string };
}

export const ANNOUNCEMENTS: Announcement[] = [
  {
    date: "May 2026",
    category: "Recognition",
    title: "African Hidden Voices honoured in Turin",
    body: "At the Polo del '900 in Turin, during the Turin International Book Fair, the interreligious committee Fedinsieme honoured African Hidden Voices for its collaboration on the research project that produced The Revelation Spiritual Home, published by Cambridge University Press in 2025 and in Italian by Mimesis Edizioni in 2026. The award for the volume was presented to its authors, Massimo Introvigne and Rosita Šorytė, at the same event. On the previous day, at the Turin City Hall, Fedinsieme recognised HSRM Imboni Dr uZwi-Lezwe Radebe for his contribution to the promotion and defence of African Indigenous Spirituality. The events were held with CESNUR and PRE.SI.DI.",
    source: {
      label: "Bitter Winter, 28 May 2026",
      href: "https://bitterwinter.org/the-revelation-spiritual-home-a-sociologist-reads-the-book-by-introvigne-and-soryte/",
    },
  },
  {
    date: "December 2025",
    category: "Partnership",
    title:
      "AHV and the University of Fort Hare host the Indigenous Knowledge Systems Conference",
    body: "African Hidden Voices co-hosted the 2025 Indigenous Knowledge Systems Conference with the University of Fort Hare over three days at the university's East London campus. A journal special issue arising from the conference is in preparation.",
    source: {
      label: "University of Fort Hare",
      href: "https://www.ufh.ac.za/news/ufh-and-african-hidden-voices-host-transformative-indigenous-knowledge-systems-conference",
    },
  },
  {
    date: "November 2025",
    category: "Conference",
    title: "AHV research presented at CESNUR, Cape Town",
    body: "A full session of the CESNUR International Conference in Cape Town was devoted to The Revelation Spiritual Home, including an AHV paper on the metaphysics of the universal concept of spirituality as influenced by African Indigenous Spirituality, with HSRM Imboni Dr uZwi-Lezwe Radebe as respondent.",
    source: {
      label: "CESNUR 2025 programme",
      href: "https://www.cesnur.org/2025/cape_town-program.htm",
    },
  },
  {
    date: "September 2025",
    category: "Publication",
    title:
      "Cambridge University Press publishes the first full study of The Revelation Spiritual Home",
    body: "The Revelation Spiritual Home: The Revival of African Indigenous Spirituality, by Massimo Introvigne and Rosita Šorytė, was published in the Elements in New Religious Movements series. African Hidden Voices' published research is cited throughout.",
    source: {
      label: "Cambridge Core",
      href: "https://www.cambridge.org/core/elements/revelation-spiritual-home/C5C72690C531F9FDF9CABBB62D2683D0",
    },
  },
];

export const NEWSROOM_LEDE =
  "Announcements, research notes and institutional appearances.";
export const NEWSROOM_INTRO =
  "Two streams on one page, clearly distinguished: institutional announcements, and research notes from the departments.";

export const RESEARCH_NOTES_NOTE =
  "The first research notes are in preparation. This replaces the blog, which was published empty.";

export const MEDIA_KIT = {
  title: "Media kit",
  body: "Logos, approved photography, the institutional biography, the correct forms of address for HSRM, and the terminology note. The terminology note in particular saves AHV a great deal of correction later.",
  items: [
    "Logos",
    "Approved photography",
    "Institutional biography",
    "Forms of address for HSRM",
    "Terminology note",
  ],
};
