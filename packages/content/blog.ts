/**
 * The AHV Blog: essays, research notes and commentary from the six departments.
 *
 * Every entry belongs to a named department, states its central claim in a
 * single sentence, links to the standing positions and restored lexicon terms
 * it draws upon, and carries its sources.
 *
 * Binding house style is documented in packages/content/HOUSE-STYLE.md.
 */

export interface ContentImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface BlogSection {
  heading?: string;
  paragraphs: string[];
  quote?: {
    text: string;
    attribution: string;
  };
  image?: ContentImage;
}

export interface BlogSource {
  label: string;
  href?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** Display date in house style, e.g. 22 May 2026. */
  date: string;
  /** ISO 8601 date for structured data and time elements. */
  isoDate: string;
  /** Slug of the responsible department under /departments/[slug]. */
  department: string;
  /** Short thematic label. */
  category: string;
  /** Attributable author or department unit. */
  author: string;
  /** Estimated reading time. */
  readingTime: string;
  /** Single-sentence statement of the essay's thesis. */
  keyClaim: string;
  /** Optional featured visual plate or photograph. */
  image?: ContentImage;
  /** Slugs of related standing positions on /positions. */
  relatedPositions: string[];
  /** Slugs of related restored terms on /lexicon. */
  relatedTerms: string[];
  /** Structured body sections. */
  sections: BlogSection[];
  /** Compulsory source citations. */
  sources: BlogSource[];
}

export const BLOG_HERO = {
  eyebrow: "Blog · Research Notes & Essays",
  title: "Essays, research notes and commentary",
  lede: "Short-form scholarship from the six departments of African Hidden Voices: a position examined, a term restored, a conference argument set out in full, or a record placed in context.",
  intro:
    "Every essay on this page is anchored in one of the institution's six research departments and governed by the same evidentiary rules as the books and working papers. Each states its central claim at the head of the piece, names the standing positions and restored vocabulary it relies on, and lists the published sources that can be checked.",
  editorialRule:
    "No unsigned opinion, no unsourced claim of fact, and no borrowed colonial category used as though it were neutral description. Where the material record or independent scholarship has not yet reached as far as a position stated here, the essay says so plainly.",
} as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "spirituality-breathes-life-into-tradition",
    title:
      "Why Spirituality Precedes Tradition: Isiko, Ukuphahla and the Inversion of the Colonial Record",
    excerpt:
      "For more than a century, external scholarship filed African spirituality underneath tradition and custom. Restoring the order between isiko and ukuphahla shows why a custom with its spiritual mechanism removed becomes a re-enactment.",
    date: "22 May 2026",
    isoDate: "2026-05-22",
    department: "social",
    category: "Social Systems & Custom",
    author: "Department of AIS and Social Systems",
    readingTime: "6 min read",
    keyClaim:
      "Tradition does not generate spirituality; revelation produces practice, and tradition preserves what revelation produced.",
    image: {
      src: "/images/plates/plate-social-isiko.svg",
      alt: "Diagram of Ukuphahla as producer and Isiko as preserver in African Indigenous Spirituality",
      caption:
        "Plate I · Department of AIS and Social Systems: Ukuphahla (revelation activated) precedes Isiko (tradition).",
    },
    relatedPositions: [
      "spirituality-reveals-tradition-keeps",
      "the-naming-belongs-to-africa",
    ],
    relatedTerms: ["isiko", "ukuphahla", "ezomoya-zakwantu", "isambulo"],
    sections: [
      {
        paragraphs: [
          "The classification that dominated twentieth-century writing on Africa placed tradition at the top of the conceptual hierarchy and treated spirituality as an aspect of custom. Under that arrangement, a household rite, a naming ceremony or an initiation was catalogued first as cultural heritage and only secondarily, if at all, as a spiritual act. The classification appeared tidy to the administrators and ethnographers who built it. What it did in practice was reverse the order of reality.",
          "In the research position of African Hidden Voices, established through the revelation of HSRM Imboni Dr uZwi-Lezwe Radebe, tradition does not stand above spirituality and never did. Tradition, <em class=\"term\">isiko</em>, exists because of <em class=\"term\">ukuphahla</em>, the invocation that connects the physical family to the spiritual realm. Without that connection, the outward form of a custom can be repeated down to the smallest gesture while the mechanism that gave it life is absent.",
        ],
        quote: {
          text: "spirituality breathes life into tradition, not the other way around",
          attribution:
            "African Hidden Voices 2024, pp. 141 to 142, quoted in Introvigne and Šorytė 2025",
        },
      },
      {
        heading: "Production and preservation",
        paragraphs: [
          "To understand why the inversion matters for social research, one has to distinguish between what produces a practice and what keeps it. <em class=\"term\">Isambulo</em>, revelation, is the language through which Spirit expresses itself to a people. When revelation is activated in the lived life of a household or a nation, it establishes specific obligations, timings, names and observances. Over generations, those observances are held in place as isiko.",
          "Spirituality therefore reveals, while tradition keeps. When a classification files African Indigenous Spirituality, <em class=\"term\">Ezomoya Zakwantu</em>, under the word for tradition, it mistakes the vessel for the source. It also leaves the researcher unable to explain a phenomenon that families across Southern Africa report in plain terms: that a household may perform every visible step of a customary rite and yet find that nothing in the household changes.",
        ],
      },
      {
        heading: "What happens when the mechanism is removed",
        paragraphs: [
          "A century of missionary schooling, statutory restriction and urban displacement worked to sever custom from its spiritual authority while permitting selected outward forms to survive as harmless culture. A family was allowed to keep the song, the attire or the feast, provided it relinquished the invocation and the spiritual hierarchy through which the rite operated.",
          "The Department of AIS and Social Systems studies the consequences of that severance in contemporary households: clan names that are recited without knowledge of the lineage they carry, initiations conducted without the standing required to conduct them, and customs performed as social theatre rather than spiritual activation. Restoring the household requires restoring the order in which ukuphahla precedes isiko, not merely preserving the outward form as heritage.",
        ],
      },
    ],
    sources: [
      {
        label:
          "Restoring Africa's Spiritual Identity, Isambulo Publications, Johannesburg, 2024, pp. 141 to 142 (ISBN 9781037019647)",
      },
      {
        label:
          "Massimo Introvigne and Rosita Šorytė, The Revelation Spiritual Home: The Revival of African Indigenous Spirituality, Cambridge University Press, 2025",
        href: "https://www.cambridge.org/core/elements/revelation-spiritual-home/C5C72690C531F9FDF9CABBB62D2683D0",
      },
    ],
  },
  {
    slug: "religion-is-taught-spirituality-is-revealed",
    title:
      "Knowing and Belief: The Epistemic Boundary Between Religion and African Indigenous Spirituality",
    excerpt:
      "The statement that Africa produced no religion is not a rhetorical flourish. It is an epistemological claim about how taught systems and revealed systems come to be known.",
    date: "28 April 2026",
    isoDate: "2026-04-28",
    department: "philosophy",
    category: "Epistemology",
    author: "Department of AIS and Philosophy",
    readingTime: "7 min read",
    keyClaim:
      "Religion and spirituality are not two names for one human impulse; they are distinct epistemic orders separated by how knowledge enters them and how it is tested.",
    image: {
      src: "/images/plates/plate-philosophy-knowing.svg",
      alt: "Comparison between the religious order of taught experience and the spiritual order of revealed experience",
      caption:
        "Plate II · Department of AIS and Philosophy: Taught religious instruction contrasted with revealed spiritual knowing.",
    },
    relatedPositions: [
      "religion-and-spirituality",
      "africa-produced-no-religion",
      "revelation-is-knowledge",
    ],
    relatedTerms: ["isambulo", "umoya", "pscb", "umdali"],
    sections: [
      {
        paragraphs: [
          "When African Hidden Voices states that Africa had no religion and that no African ever founded one, readers trained in the comparative study of religion often hear a purely definitional manoeuvre. If religion is defined broadly enough to cover any relation to the sacred, they argue, then Africa plainly has religions, and every university handbook lists them accordingly. The Department of AIS and Philosophy takes that objection at full strength, and answers it by examining what the handbook category conceals.",
          "A religion is a taught experience. It begins with a historical founding act, is codified in a text or creed, is transmitted by instruction through a priesthood or clerical office, and is secured in the adherent by belief. Every one of those instruments exists because what is being transmitted must be carried from the outside in by instruction.",
        ],
        quote: {
          text: "AIS institutions such as TRSH try to dismantle the notion of Africa as a continent with religion in the conventional sense",
          attribution:
            "African Hidden Voices 2024, p. 3, quoted in Introvigne and Šorytė 2025",
        },
      },
      {
        heading: "Why belief and knowing are not the same state",
        paragraphs: [
          "Spirituality is a revealed experience. Within African Indigenous Spirituality, <em class=\"term\">umoya</em> is not a component added to body and mind; it is what the human being is prior to biological birth. Because the person is spirit, knowledge of spiritual reality does not enter as a foreign doctrine to which the mind is asked to assent. It enters through <em class=\"term\">Isambulo</em>, revelation, mediated and interpreted through the spiritual hierarchy and the Physical Spiritual Central Being, PSCB, exemplified by HSRM Imboni Dr uZwi-Lezwe Radebe.",
          "Belief is the epistemic posture required where a person does not have direct access and must rely on the testimony of a text or an instructor. Knowing is the epistemic posture that follows when revelation is received, interpreted within its proper discipline, and activated in practice. Teaching occurs in both systems, as AHV's third standing position acknowledges openly, yet the function of teaching differs in kind: in a taught system instruction supplies the doctrine, whereas in a revealed system preparation forms the person to receive and read what instruction alone cannot supply.",
        ],
      },
      {
        heading: "The conference record and the philosophical task",
        paragraphs: [
          "This distinction has been placed directly before the international scholarly community in two successive conference papers by AHV researchers: Palesa Hloele's paper on the differences between religion, universal spirituality and African Indigenous Spirituality at the Université Bordeaux Montaigne in June 2024, and Sam Langa's metaphysical analysis of the universal concept of spirituality at the CESNUR International Conference in Cape Town in November 2025, where HSRM served as respondent.",
          "The philosophical work continues in specifying the eligibility conditions of revealed knowledge and the tests by which a tradition of knowing checks itself against the corpus, the order of existence, and the material record.",
        ],
      },
    ],
    sources: [
      {
        label:
          "An Introduction into Afrikan Indigenous Spirituality, Isambulo Publications, Johannesburg, 2023 (ISBN 9780796132277)",
      },
      {
        label:
          "Palesa Hloele, Differences between Religion, Universal Spirituality, and African Indigenous Spirituality, CESNUR International Conference, Bordeaux, June 2024",
        href: "https://www.cesnur.org/2024/bordeaux-program.htm",
      },
      {
        label:
          "Sam Langa, A Metaphysical Analysis of the Universal Concept of Spirituality as Influenced by African Indigenous Spirituality, CESNUR International Conference, Cape Town, November 2025",
        href: "https://www.cesnur.org/2025/cape_town-program.htm",
      },
    ],
  },
  {
    slug: "indigenous-knowledge-and-its-source",
    title:
      "A Pharmacopoeia Without Its Order Is a List: Why Indigenous Knowledge Systems Depend on African Indigenous Spirituality",
    excerpt:
      "Universities and statutes now recognise Indigenous Knowledge Systems across Southern Africa. The next task for scholarship is to stop bracketing out the spiritual order that produced the knowledge.",
    date: "19 March 2026",
    isoDate: "2026-03-19",
    department: "knowledge",
    category: "Knowledge Systems & Lexicography",
    author: "Department of AIS and Knowledge Systems",
    readingTime: "6 min read",
    keyClaim:
      "Indigenous Knowledge Systems sit fourth in the order of existence, after Spirit, Revelation and Practice, and cannot be understood completely when their spiritual source is bracketed out.",
    image: {
      src: "/images/plates/plate-knowledge-iks.svg",
      alt: "Four stages of the order of existence: Spirit, Revelation, Practice, and Indigenous Knowledge Systems",
      caption:
        "Plate III · Department of AIS and Knowledge Systems: The directional order from Umoya to Knowledge Systems.",
    },
    relatedPositions: [
      "indigenous-knowledge-is-derived",
      "the-naming-belongs-to-africa",
    ],
    relatedTerms: [
      "izwi-lilandela-umoya",
      "ugobela",
      "amathwasa",
      "isambulo",
    ],
    sections: [
      {
        paragraphs: [
          "The institutionalisation of Indigenous Knowledge Systems, IKS, in South African legislation, research councils and university faculties is a genuine achievement. It secured protection and scholarly standing for botanical, medical, agricultural and astronomical knowledge that colonial administration had treated either as uncredited raw data or as material to be eradicated. In December 2025, African Hidden Voices co-hosted the three-day Indigenous Knowledge Systems Conference with the University of Fort Hare at the university's East London campus, working directly inside that academic space.",
          "Working inside the field also means naming its structural limitation clearly. Much of the contemporary IKS literature accepts the products of indigenous knowledge while bracketing the spiritual order from which those products came. It records the plant, the preparation and the seasonal calendar, while treating the revelation and the initiation that governed them as optional cultural background.",
        ],
      },
      {
        heading: "The four stages of the order",
        paragraphs: [
          "In the epistemological framework of African Hidden Voices, established through the revelation of HSRM Imboni Dr uZwi-Lezwe Radebe, existence runs in one direction: first Spirit, second Revelation, third Practice, and fourth Knowledge Systems. Knowledge systems are structured interpretations formed from what the first three stages produced. African Indigenous Spirituality is therefore not a sub-topic inside IKS; IKS is a derived structure whose origin is AIS.",
          "Consider how healing and diagnostic knowledge is actually held. It is not held as an open handbook separated from standing. It is held by trained knowers formed inside a discipline, such as <em class=\"term\">amathwasa</em> guided through initiation under <em class=\"term\">uGobela</em>. When a documentation project extracts the botanical inventory and discards the conditions of reception, standing and invocation, what remains is no longer a knowledge system. It is a list of specimens.",
        ],
      },
      {
        heading: "The naming rule as research method",
        paragraphs: [
          "The same principle governs language. The rule that binds every department of AHV is <em class=\"term\">izwi lilandela umoya</em>: the word follows the spirit. When indigenous terms are translated through Christian or colonial etymology, the translation imports a foreign metaphysics and erases the epistemic structure encoded in the original tongue.",
          "The journal special issue now in preparation following the University of Fort Hare conference addresses both tasks together: documenting indigenous knowledge rigorously while keeping its derivation from Spirit, Revelation and Practice intact.",
        ],
      },
    ],
    sources: [
      {
        label:
          "University of Fort Hare and African Hidden Voices, Indigenous Knowledge Systems Conference, East London, December 2025",
        href: "https://www.ufh.ac.za/news/ufh-and-african-hidden-voices-host-transformative-indigenous-knowledge-systems-conference",
      },
      {
        label:
          "Restoring Africa's Spiritual Identity, Isambulo Publications, Johannesburg, 2024 (ISBN 9781037019647)",
      },
    ],
  },
  {
    slug: "two-crowns-one-order",
    title:
      "Two Crowns, One Order: Spiritual Kingship and the Colonial Severance of African Governance",
    excerpt:
      "Colonial administrations knew that the fastest way to break an African kingdom was not to defeat the throne in battle, but to sever the king from the Imboni who guided the nation.",
    date: "12 February 2026",
    isoDate: "2026-02-12",
    department: "governance",
    category: "Governance & Law",
    author: "Department of AIS and Governance",
    readingTime: "7 min read",
    keyClaim:
      "The sacred governance order attested across Africa is a two-office architecture joining the reigning throne and the spiritual guider, and its colonial dismantling was an instrument of conquest rather than an accident of administration.",
    image: {
      src: "/images/plates/plate-governance-crowns.svg",
      alt: "Two-office governance diagram showing Ubukhosi boMoya alongside the Reigning Throne",
      caption:
        "Plate IV · Department of AIS and Governance: The two-crown architecture joining spiritual kingship and royal governance.",
    },
    relatedPositions: ["authority-is-conferred", "this-is-restoration"],
    relatedTerms: ["ubukhosi-bomoya", "imboni", "isambulo"],
    sections: [
      {
        paragraphs: [
          "Modern constitutional law in Southern Africa recognises traditional leadership in statute and allocates it a defined ceremonial and customary role. What the statute book does not recognise is the second office that historically stood beside the throne and made its authority whole: the office of the <em class=\"term\">Imboni</em>, the spiritual guider through whom revelation reaches a nation.",
          "Across the African, Kemetic and Mesopotamian records examined by the Department of AIS and Governance, legitimate rule is organised as a two-office architecture. There is the king who governs the polity, and there is the spiritual authority who holds <em class=\"term\">ubukhosi boMoya</em>, spiritual kingship, guiding the throne. Neither office is self-sufficient, and neither is a rival to the other.",
        ],
      },
      {
        heading: "Decapitation by statute and exile",
        paragraphs: [
          "Colonial administrators understood the interdependence of the two crowns with great precision. As documented across the nine records currently held in the Iimboni Database, colonial governments systematically targeted spiritual authorities for deposition, deportation, detention and prosecution under witchcraft suppression statutes. Separating the traditional ruler from the Iimboni left the visible throne intact while removing the source of its spiritual mandate.",
          "When post-colonial constitutions inherited the administrative map of the colony, they retained the division. Traditional leaders were recognised inside a cultural framework; spiritual institutions were forced to register under legal categories designed either for imported religious denominations or for voluntary associations.",
        ],
        quote: {
          text: "It is of great service to scholars, as it collects testimonies and documents about often forgotten African spiritual masters.",
          attribution:
            "Massimo Introvigne on African Hidden Voices, Bitter Winter, 13 February 2023",
        },
      },
      {
        heading: "The restored bond in contemporary practice",
        paragraphs: [
          "Against the claim that the two-office order belongs only to the archival past, the Department of AIS and Governance documents its living restoration. HSRM Imboni Dr uZwi-Lezwe Radebe is recognised as the Spiritual Guider of Langalibalele II, the reigning king of the AmaHlubi, re-establishing in public view the bond between spiritual king and traditional king that colonial governance worked to sever.",
          "Alongside field documentation of that arrangement, the department drafts model legal and policy provisions to address the category problem in domestic statute and continental charters, so that African Indigenous Spirituality institutions can be recognised in law for what they are rather than administered as what they are not.",
        ],
      },
    ],
    sources: [
      {
        label:
          "Tshidiso Gama, Prophets and Spiritual Guides: A Comparison, CESNUR International Conference, Bordeaux, June 2024",
        href: "https://www.cesnur.org/2024/bordeaux-program.htm",
      },
      {
        label:
          "Massimo Introvigne and Rosita Šorytė, The Revelation Spiritual Home: The Revival of African Indigenous Spirituality, Cambridge University Press, 2025",
        href: "https://www.cambridge.org/core/elements/revelation-spiritual-home/C5C72690C531F9FDF9CABBB62D2683D0",
      },
    ],
  },
  {
    slug: "provision-before-scarcity",
    title:
      "Provision Before Scarcity: Re-examining the Founding Premise of Economic Thought in Africa",
    excerpt:
      "Standard development economics takes scarcity as the first fact about the world. The Department of AIS and Economics examines what changes when an economic order begins from provision and spiritual mandate.",
    date: "15 January 2026",
    isoDate: "2026-01-15",
    department: "economics",
    category: "Political Economy",
    author: "Department of AIS and Economics",
    readingTime: "6 min read",
    keyClaim:
      "Modern economic analysis begins after assuming that scarcity is the first fact about the world; African Indigenous Spirituality begins from provision and treats enterprise as part of an ordered spiritual mandate.",
    image: {
      src: "/images/plates/plate-economics-provision.svg",
      alt: "Sacred economic architecture showing the parent institution and provision preceding production",
      caption:
        "Plate V · Department of AIS and Economics: The parent institution holding first fruits, sacred release and enterprise.",
    },
    relatedPositions: ["spirit-precedes", "this-is-restoration"],
    relatedTerms: ["umoya", "ikhaya-lomoya", "past-plus-present"],
    sections: [
      {
        paragraphs: [
          "Every textbook in modern economics opens with a definition that treats scarcity as the foundational condition of human life: resources are finite, wants are unlimited, and economics is the science of allocating scarce means among competing ends. Once that premise is accepted without examination, every policy instrument built downstream of it inherits the same frame.",
          "Africa presents the sharpest possible paradox to that model: the wealthiest continent on earth in mineral, agricultural and human endowment remains the poorest place to live on it by conventional indicators. For seven decades development economics has proposed structural adjustments, governance reforms and market interventions that leave the founding premise untouched.",
        ],
      },
      {
        heading: "The parent institution and the economy of return",
        paragraphs: [
          "The Department of AIS and Economics begins before the concession to materialism is made. In a spirit-led order, the first reality is not scarcity but provision, and what obstructs provision in a household or a nation is not reducible to market mechanics alone. In the earliest sacred economies attested in the African record, the temple was not a house of worship set beside a secular market; it was the parent institution holding granary, archive, court and treasury together.",
          "Within that architecture, instruments such as first fruits and sacred debt release were not taxes or fiscal stimuli. They were acts of alignment recognising that provision precedes production.",
        ],
        quote: {
          text: "TRSH members designate it as an institution, claiming Radebe's spiritual guides commanded him to establish an African indigenous institution",
          attribution:
            "African Hidden Voices 2024, pp. 104 to 105, quoted in Introvigne and Šorytė 2025",
        },
      },
      {
        heading: "Enterprise as spiritual activation",
        paragraphs: [
          "This is not a purely historical reconstruction. Through the revelation of HSRM Imboni Dr uZwi-Lezwe Radebe, The Revelation Spiritual Home operates an extensive economic programme drawing members into enterprise with the explicit mandate of economic independence. As documented in the independent fieldwork of Introvigne and Šorytė (2025), this activity is neither charity nor the prosperity gospel of the religious system, which offers material reward in exchange for doctrinal belief.",
          "Instead, enterprise is practised as spiritual activation: restoring agency, custodianship and productive capacity to a people whose economic dependency was engineered alongside their spiritual suppression.",
        ],
      },
    ],
    sources: [
      {
        label:
          "Restoring Africa's Spiritual Identity, Isambulo Publications, Johannesburg, 2024, pp. 104 to 105 (ISBN 9781037019647)",
      },
      {
        label:
          "Massimo Introvigne and Rosita Šorytė, The Revelation Spiritual Home: The Revival of African Indigenous Spirituality, Cambridge University Press, 2025",
        href: "https://www.cambridge.org/core/elements/revelation-spiritual-home/C5C72690C531F9FDF9CABBB62D2683D0",
      },
    ],
  },
  {
    slug: "convergence-and-the-material-record",
    title:
      "Reading the Material Record Beside Revelation: How the AIS Science Division Reports Convergence and Non-convergence",
    excerpt:
      "A research unit that only ever reports agreement is not doing research. Why the AIS Science Division keeps revelation and excavation distinct, and how the comparative programme tests the out-of-Africa inheritance.",
    date: "4 December 2025",
    isoDate: "2025-12-04",
    department: "science",
    category: "Comparative Attestation",
    author: "The AIS Science Division",
    readingTime: "6 min read",
    keyClaim:
      "The AIS Science Division neither treats revelation as a hypothesis awaiting laboratory proof nor bends archaeological evidence to force agreement; it sets independent records beside one another and reports what converges and what remains unestablished.",
    image: {
      src: "/images/plates/plate-science-convergence.svg",
      alt: "Diagram of the AIS Science Division formula: Past (Isambulo) plus Present (Material Record) equals Future (Restoration)",
      caption:
        "Plate VI · The AIS Science Division: Past plus present equals future, setting excavation beside revelation.",
    },
    relatedPositions: ["africa-is-the-origin", "revelation-is-knowledge"],
    relatedTerms: ["past-plus-present", "isambulo", "umdali", "imvelo"],
    sections: [
      {
        paragraphs: [
          "When an institution founded through spiritual revelation establishes a Science Division spanning archaeology, cosmology, mathematics, geology and natural science, sceptical readers immediately look for two familiar errors: either the unit will treat revelation as a tentative hypothesis waiting for laboratory permission to exist, or it will cherry-pick disputed archaeological dates and present them as proof. The AIS Science Division is designed from its first rule to refuse both errors.",
          "Following the institutional formula established through the revelation of HSRM Imboni Dr uZwi-Lezwe Radebe, past plus present equals future, <em class=\"term\">Isambulo</em> is stated as given, and the material record is read on its own disciplinary terms beside it as attestation. Where peer-reviewed excavation reports, dating ranges and population genetics agree with what revelation states, the Division reports the convergence and shows the working. Where the material record has not reached that far, or where a site interpretation is contested in its own literature, the Division states the dispute openly.",
        ],
        quote: {
          text: "The restoration of African Indigenous Spirituality is the restoration of the universal concept of spirituality.",
          attribution: "HSRM Imboni Dr uZwi-Lezwe Radebe",
        },
      },
      {
        heading: "The Southern African sequence and the comparative test",
        paragraphs: [
          "The archaeological record establishes that the earliest evidence of ritual practice, ochre processing and notched mathematical tallies on earth is African, sitting at the threshold of behavioural modernity in Southern and Central Africa, including the Blombos assemblage and Border Cave. If African Indigenous Spirituality is the earliest expression of Spirit in human existence and left the continent inside the first human populations who migrated outward, then specific architectural features of that order should appear among populations that had no subsequent historical contact.",
          "Across four independent cases examined by the Division's comparative programme, Mesoamerica, Aboriginal Australia, the Mi'kmaq and the Baltic peoples, the same specific architecture recurs: ancestors held as the literal foundation of authority, an ordered cosmos read by trained keepers rather than free interpreters, and a creative spiritual order active inside time.",
        ],
      },
      {
        heading: "Why honesty about limits is the method",
        paragraphs: [
          "The strongest objection to the comparative argument is that shared human cognition under similar environmental pressures produces similar ritual forms without requiring common inheritance. As AHV's second standing position states, that objection explains general resemblance well and specific institutional architecture much less well.",
          "The task of the Science Division is to document that architecture case by case from primary publications, labelling every contested date as contested, so that any scholar auditing the work can verify exactly where the convergence stands.",
        ],
      },
    ],
    sources: [
      {
        label:
          "An Introduction into Afrikan Indigenous Spirituality, Isambulo Publications, Johannesburg, 2023 (ISBN 9780796132277)",
      },
      {
        label:
          "CESNUR International Conference, Session on The Revelation Spiritual Home, Cape Town, November 2025",
        href: "https://www.cesnur.org/2025/cape_town-program.htm",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogPostsByDepartment(departmentSlug: string): BlogPost[] {
  return BLOG_POSTS.filter((post) => post.department === departmentSlug);
}
