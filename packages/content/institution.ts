/**
 * The Institution, its framework, the founding scholar, and the
 * institutional record.
 */

export const INSTITUTION_PAGE = {
  lede: "What African Hidden Voices is, what it was established to do, and the authority under which it works.",
  whatAhvIs: {
    heading: "What AHV is",
    body: [
      "African Hidden Voices (AHV) Research Institution is an independent research institution, established through the revelation of HSRM Imboni Dr uZwi-Lezwe Radebe, and charged with advancing African Indigenous Spirituality as a global academic discipline.",
      "It is not a movement, a belief system, a cultural organisation or a faith community. It is an institution, and the word is chosen with care. When institutions of this kind are classified as religious movements, an external and foreign frame is placed over something African, and the frame then does the analysis. AHV declines the frame. It engages the academy as an institution engaging institutions, on its own standing and under its own name.",
    ],
  },
  whyItExists: {
    heading: "Why it exists",
    body: [
      "Africa's spiritual authorities were removed from the record by administrations that had every reason to remove them, and the removal worked. What replaced them was a scholarship that studied Africa's spirituality without asking Africa what it was, and named it with words Africa does not use.",
      "AHV exists to reverse that in the only way it can be reversed: by producing the research, holding the archive, restoring the naming, and putting African Indigenous Spirituality in front of the world's institutions in a form they are obliged to answer.",
    ],
  },
  howItBegan: {
    heading: "How it began",
    body: [
      "AHV was established as a dialogue platform, to restore engagement among Iimboni, Spirit Kings and spiritual leaders across the continent whose voices had been suppressed, and to gather the testimony of spiritual authorities whose work had been overlooked or deliberately erased.",
      "It has since become a structured research and institutional body, working across academic, spiritual, governmental and interdisciplinary spaces, with six research departments, a documentary archive, and a publishing record cited in independent scholarship.",
    ],
  },
};

export interface Commitment {
  number: string;
  title: string;
  body: string;
}

export const COMMITMENTS: Commitment[] = [
  {
    number: "One",
    title: "Revelation is primary",
    body: "Isambulo is not treated as symbol, metaphor or belief. It is an active mode of knowledge transmission, and it is the origin of what AHV knows. Academic method is how that knowledge is documented and communicated. It is not how it is generated, and it is not permitted to overrule it.",
  },
  {
    number: "Two",
    title: "The naming belongs to Africa",
    body: "African spiritual terms are never defined through the etymology of another system, and never translated into its vocabulary. Umoya is umoya. An Imboni is an Imboni. A deity is a deity. A healer is a healer. Each is defined from within, in the tongue that carries it, and the Lexicon does exactly that across the whole restored vocabulary. The rule is izwi lilandela umoya: the word follows the spirit.",
  },
  {
    number: "Three",
    title: "This is restoration, not recovery",
    body: "AHV does not speak of a movement, a revival of something lost, or a recovery of something dead. What is being restored was never lost. It was suppressed, and it survived the suppression. The record of that survival is the archive.",
  },
  {
    number: "Four",
    title: "Nothing is claimed that cannot be shown",
    body: "Where research confirms revelation, AHV publishes the convergence. Where the record has not reached as far as the revelation, AHV says so. It does not manufacture the gap closed.",
  },
];

export const STRUCTURE: { title: string; body: string; href?: string }[] = [
  {
    title: "Six research departments",
    body: "The disciplinary work.",
    href: "/departments",
  },
  {
    title: "The Iimboni Database",
    body: "The documentary archive of Africa's spiritual authorities.",
    href: "/database",
  },
  {
    title: "The publishing programme",
    body: "Books and papers, with Isambulo Publications.",
    href: "/publications",
  },
  {
    title: "The Dialogue Series",
    body: "Recorded long-form teaching and discussion.",
    href: "/media",
  },
  {
    title: "Institutional engagement",
    body: "Universities, research councils, government, interdisciplinary bodies.",
    href: "/engage",
  },
];

/* ------------------------------------------------------------------ */
/* The Framework                                                       */
/* ------------------------------------------------------------------ */

export interface FrameworkSection {
  number: string;
  title: string;
  /** Introductory paragraph, where the section carries one. */
  intro?: string;
  /** Optional closing paragraph. */
  outro?: string;
  subsections: { title: string; body: string }[];
}

export const FRAMEWORK: FrameworkSection[] = [
  {
    number: "1",
    title: "The order of existence",
    intro:
      "Existence runs in one direction, and the direction does not reverse.",
    subsections: [
      {
        title: "Spirit",
        body: "The origin of all knowing. Spirit is not a dimension of the human being. It is what the human being is. Umoya uyimfihlo: the spirit is a sacred mystery, and a person may survive without oxygen but not without umoya.",
      },
      {
        title: "Revelation",
        body: "The language through which Spirit expresses itself. Isambulo is how what Spirit holds becomes available to a people. There is no spirituality without revelation; revelation is its foundation and its core.",
      },
      {
        title: "Practice",
        body: "The activation of revelation in lived experience. Spirit that is not activated is not yet spirituality. This is why possession and activation are not the same thing, and why the second requires an order, a guide and a discipline.",
      },
      {
        title: "Knowledge systems",
        body: "Structured interpretations of spiritual reality, formed last. Every knowledge system, including the academic one, sits here. None of them sits higher.",
      },
    ],
    outro:
      "The order matters because reversing it produces the error the modern disciplines are built on. Biology studies the body, neuroscience the brain, psychology the mind, sociology behaviour, economics interest, political science power, philosophy reason. Each begins after an unexamined concession has been made: that the human being can be adequately studied without first understanding spirit. AHV does not treat that as a small gap. It treats it as the structural error at the centre of the modern study of humanity, and the six departments are the systematic examination of it.",
  },
  {
    number: "2",
    title: "The emic and etic structure",
    intro: "AHV works on two levels and keeps them ranked.",
    subsections: [
      {
        title: "Emic, and primary",
        body: "Internal, revelatory, spiritually experienced. This is where knowledge originates and where meaning is held. It is not data for someone else's analysis.",
      },
      {
        title: "Etic, and secondary",
        body: "External, analytical, academic. This is the structure through which the work is documented, tested against the record, and made legible to institutions that do not share the emic position.",
      },
    ],
    outro:
      "The ranking is the whole point. Academic frameworks are essential for communication and institutional engagement, and AHV invests in them seriously. They remain secondary to revelation, which is the primary source of knowledge within African Indigenous Spirituality. An institution that inverted this would be studying its own spirituality from outside it, which is precisely the condition AHV was established to end.",
  },
  {
    number: "3",
    title: "The Physical Spiritual Central Being",
    intro:
      "The Physical Spiritual Central Being, PSCB, is the bridge between Spirit and humanity: the central point through which revelation is accessed, interpreted and transmitted into practice.",
    subsections: [
      {
        title: "The scholarly form of the same claim",
        body: "Every knowledge tradition has an eligibility condition, a specification of who is competent to know within it. Laboratory science has training and replication; law has admission and precedent; textual religion has ordination and magisterium. AIS has activation and spiritual hierarchy. To require that AIS alone be knowable by an observer with no standing inside it is not neutrality. It is the application of one tradition's eligibility rule as though it were the absence of any rule.",
      },
    ],
    outro:
      "The claim that follows is the one the academy finds hardest, and AHV states it without softening. African Indigenous Spirituality cannot be fully studied, interpreted or practised outside the guidance of a PSCB, because revelation is not universally self-generated. It is spiritually mediated through this structure.",
  },
  {
    number: "4",
    title: "Research beside revelation",
    intro:
      "AHV's method is convergence, and its discipline is honesty about where convergence has been reached.",
    subsections: [
      {
        title: "The formula",
        body: "This is the formula the institution works by: past plus present equals future. What was revealed, set beside what can now be shown, produces the restored understanding.",
      },
    ],
    outro:
      "Revelation is stated as given. Research is set beside it as attestation. The two are never merged, and research is never presented as correcting revelation. Where the material record confirms what was revealed, AHV publishes the convergence and shows its working. Where the record has not reached that far, AHV says so and leaves the revelation standing. Where the body of published scholarship has arrived at a different position, AHV names the difference rather than concealing it.",
  },
  {
    number: "5",
    title: "Naming as method",
    intro:
      "Restoring the naming is not a matter of dignity alone. It yields a research instrument, and every department uses it.",
    subsections: [
      {
        title: "The linguistic test",
        body: "If a spiritual concept is real and native to a people, their languages carry its name. If a concept arrived by teaching, the languages have no word for it and speakers must force a borrowed one. The test is applied throughout AHV's work: where a term has no indigenous name, it is a taught import, not a revealed reality.",
      },
      {
        title: "The consequence for the categories",
        body: "Tradition, isiko, does not stand above spirituality and never did. Isiko without spirituality is dead, because tradition exists through ukuphahla, the invocation that connects the physical family to the spiritual realm. Spirituality reveals; tradition keeps. To file the producer under the preserver, as the older colonial classification does, is to reverse the order of reality.",
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* The Founding Scholar                                                */
/* ------------------------------------------------------------------ */

export const FOUNDING_SCHOLAR = {
  title: "HSRM Imboni Dr uZwi-Lezwe Radebe",
  subtitle: "iNkosi yamaKhosi oMoya · Founding Scholar of African Hidden Voices",
  lede: "African Hidden Voices was established through his revelation, and works under it. This page states who he is in the institution's own terms, and then sets out the public record.",
  officeOfImboni: {
    heading: "The office of the Imboni",
    body: [
      "An Imboni is the spiritual guider through whom Isambulo, revelation, reaches a nation. The office is constituted by what it receives, not by what it has been taught, and it stands in relation to a people rather than to a doctrine.",
      "It is an African office and it is old. It was already held on this continent long before any of the words now used to translate it arrived here. Those words came with the missions, and they were used to file Africa's spiritual authorities under categories that were not theirs and did not fit. This site restores the office to its own name and describes it in its own terms.",
    ],
    pullQuote: "People respect what is revealed to them.",
  },
  theOffice: {
    heading: "The office",
    body: [
      "As a Physical Spiritual Central Being he is the point through which revelation is accessed, interpreted and transmitted into practice, and therefore the epistemological foundation on which AHV's research rests. He is recognised as the Spiritual Guider of Langalibalele II, the reigning king of the AmaHlubi, restoring the bond of spiritual king and traditional king that colonial administration set out to sever.",
    ],
  },
};

export interface TimelineEntry {
  date: string;
  body: string;
}

export const PUBLIC_RECORD: TimelineEntry[] = [
  {
    date: "2009",
    body: "Founded The Revelation Spiritual Home in Johannesburg.",
  },
  {
    date: "2023",
    body: "Elected African coordinator of the African Forum for Religious and Spiritual Liberty.",
  },
  {
    date: "11 May 2024",
    body: "Received the Global Spirituality Award at the Turin International Book Fair, presented under the aegis of the interreligious committee Fedinsieme, for his work in reviving and promoting African Indigenous Spirituality.",
  },
  {
    date: "November 2024",
    body: "Book dialogue on African Indigenous Spirituality at the University of South Africa, Pretoria.",
  },
  {
    date: "2025",
    body: "Subject of The Revelation Spiritual Home: The Revival of African Indigenous Spirituality, Introvigne and Šorytė, Cambridge University Press.",
  },
  {
    date: "November 2025",
    body: "Welcome address and respondent, CESNUR International Conference, Cape Town.",
  },
  {
    date: "January 2026",
    body: "Honorary Doctorate in Sacred Theology, honoris causa, HJ International Graduate School for Peace and Public Leadership, New York.",
  },
  {
    date: "15 May 2026",
    body: "Award from Fedinsieme at the Turin City Hall, for his contribution to the promotion and defence of African Indigenous Spirituality.",
  },
];

/**
 * Editorial rule for the founding scholar page: nothing on it is written as
 * praise. The office is stated, the record is listed, and the reader is left
 * to weigh it.
 */
export const FOUNDING_SCHOLAR_EDITORIAL_RULE =
  "Nothing on this page is written as praise. The office is stated, the record is listed, and the reader is left to weigh it.";

/* ------------------------------------------------------------------ */
/* The Institutional Record                                            */
/* ------------------------------------------------------------------ */

export interface RecordItem {
  date: string;
  heading: string;
  body: string;
  /** External source, with its label and URL. */
  source?: { label: string; href: string };
  /** Pulled out as a quotation where the item carries one. */
  quote?: { text: string; attribution: string };
}

export interface RecordGroup {
  title: string;
  intro?: string;
  items: RecordItem[];
}

export const INSTITUTIONAL_RECORD: RecordGroup[] = [
  {
    title: "Recognition",
    items: [
      {
        date: "May 2026, Turin",
        heading: "Fedinsieme honours African Hidden Voices",
        body: "At the Polo del '900 during the Turin International Book Fair, the interreligious committee Fedinsieme honoured African Hidden Voices for its collaboration on the research project that produced The Revelation Spiritual Home. The award for the Italian edition of the volume was presented to Massimo Introvigne and Rosita Šorytė at the same event, and AHV's representatives received the recognition on the institution's behalf. The day before, at the Turin City Hall, Fedinsieme recognised HSRM Imboni Dr uZwi-Lezwe Radebe for his contribution to the promotion and defence of African Indigenous Spirituality. The events were held with CESNUR and PRE.SI.DI.",
        source: {
          label: "Bitter Winter, 28 May 2026",
          href: "https://bitterwinter.org/the-revelation-spiritual-home-a-sociologist-reads-the-book-by-introvigne-and-soryte/",
        },
      },
      {
        date: "May 2024, Turin",
        heading: "The Global Spirituality Award",
        body: "HSRM Imboni Dr uZwi-Lezwe Radebe received the Global Spirituality Award within the official programme of the Turin International Book Fair, presented under the aegis of Fedinsieme, alongside the Global Peace Award. The jury's stated reason was his work in reviving and promoting African Indigenous Spirituality, described as a treasure for humanity as a whole.",
        source: {
          label: "Bitter Winter, 16 May 2024",
          href: "https://bitterwinter.org/turin-global-spirituality-award-to-dr-radebe-honors-african-indigenous-spirituality/",
        },
      },
    ],
  },
  {
    title: "The independent scholarly account",
    items: [
      {
        date: "September 2025",
        heading:
          "The Revelation Spiritual Home: The Revival of African Indigenous Spirituality",
        body: "By Massimo Introvigne and Rosita Šorytė of the Center for Studies on New Religions, published by Cambridge University Press in the Elements in New Religious Movements series. DOI 10.1017/9781009630399. ISBN 9781009630405 hardback, 9781009630375 paperback. An Italian edition followed from Mimesis Edizioni in 2026. The study followed fieldwork in South Africa and beyond across 2023 and 2024. African Hidden Voices' published research is cited throughout as the primary statement of the institution's position, including on the classification of AIS institutions, on the limits of earlier scholarly categories, and on the relationship between spirituality and tradition.",
        source: {
          label: "Cambridge Core",
          href: "https://www.cambridge.org/core/elements/revelation-spiritual-home/C5C72690C531F9FDF9CABBB62D2683D0",
        },
        quote: {
          text: "It is of great service to scholars, as it collects testimonies and documents about often forgotten African spiritual masters.",
          attribution:
            "Massimo Introvigne on African Hidden Voices, Bitter Winter, 13 February 2023",
        },
      },
    ],
  },
  {
    title: "Academic partnership",
    items: [
      {
        date: "December 2025",
        heading: "Indigenous Knowledge Systems Conference",
        body: "AHV co-hosted the Indigenous Knowledge Systems Conference with the University of Fort Hare over three days at the university's East London campus, at the Early Childhood Care Education Centre. A journal special issue arising from the conference is in preparation.",
        source: {
          label: "University of Fort Hare",
          href: "https://www.ufh.ac.za/news/ufh-and-african-hidden-voices-host-transformative-indigenous-knowledge-systems-conference",
        },
      },
    ],
  },
];

export const RECORD_LEDE =
  "Recognition, partnerships and appearances, with sources. Every item on this page can be checked, and the links are provided so that it is.";
export const RECORD_INTRO =
  "A research institution should make itself easy to audit. What follows is AHV's record as it stands, with the source for each item. Where a detail is disputed or unconfirmed, that is stated rather than smoothed over.";
