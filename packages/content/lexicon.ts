/**
 * The restored vocabulary of African Indigenous Spirituality.
 *
 * Every term is defined from within AIS, in the tongue that carries it, and
 * never through the etymology of another system. Where a term has been
 * persistently mistranslated, the mistranslation is named and the reason it
 * fails is given.
 */

export interface LexiconEntry {
  /** The term, in the indigenous language. */
  term: string;
  /** URL anchor. */
  slug: string;
  /** The English gloss. */
  gloss: string;
  /** The definition, from within. */
  definition: string;
  /** The mistranslation, named, and why it fails. */
  whatItIsNot: string;
  /**
   * True where the definition is drawn from the published corpus but is not
   * yet settled in its final published form. Shown rather than hidden.
   */
  confirmationPending?: boolean;
}

export const LEXICON: LexiconEntry[] = [
  {
    term: "Ezomoya Zakwantu",
    slug: "ezomoya-zakwantu",
    gloss: "the spiritual matters of the people",
    definition:
      "The indigenous name of African Indigenous Spirituality, adopted in our own tongue. Also carried in the phrase inkolo yakwaNtu. It names from within what the external labels failed to name from without, and its restoration is part of the restoration of the people it belongs to.",
    whatItIsNot:
      "It is not a translation of any imported category, and it is not a local variant of one. The inherited colonial classification files a spirituality under the word for what merely preserves it, which reverses the order in which the two actually stand.",
  },
  {
    term: "umoya",
    slug: "umoya",
    gloss: "spirit",
    definition:
      "Not a component of the person set beside body and mind. It is what the person is, and it was in existence before the biological birth. Umoya uyimfihlo: the spirit is a sacred mystery. A person may survive without oxygen; without umoya there is no person to survive.",
    whatItIsNot:
      "Rendering umoya through the vocabulary of another system imports that system's doctrine of what spirit is, which is exactly the substitution this lexicon exists to undo.",
  },
  {
    term: "umphefumulo",
    slug: "umphefumulo",
    gloss: "the seat of personality",
    definition:
      "Distinct from umoya and not interchangeable with it. Where umoya is neutral and continuous, umphefumulo carries what is particular to a person.",
    whatItIsNot:
      "The European psychological vocabulary has no clean equivalent, and the absence of one is a finding about that vocabulary rather than an inconvenience for this one.",
  },
  {
    term: "isithunzi",
    slug: "isithunzi",
    gloss: "the presence a person carries",
    definition:
      "The weight, standing and bearing that a person carries and that others register before a word is spoken. It can be built, it can be diminished, and it is a spiritual matter rather than a social impression.",
    whatItIsNot:
      "Not charisma, which is a description of an effect on other people. Isithunzi is a property of the person.",
  },
  {
    term: "uMdali",
    slug: "umdali",
    gloss: "the Creator",
    definition:
      "The Creator, also called Imfihlo and uMfihlakalo, the Mystery, because the Creator has no name and exists beyond identity. Africa knew uMdali before any mission arrived, and the namelessness is not a gap in the knowledge. It is the knowledge.",
    whatItIsNot:
      "Not a local name for a deity described in someone else's scripture, and not a figure to be reconciled with one.",
  },
  {
    term: "Imfihlo, uMfihlakalo",
    slug: "imfihlo",
    gloss: "the Mystery",
    definition:
      "The Creator named as what the Creator is: that which exists beyond identity and beyond naming. To use these terms is to state a position about the limits of naming, not to avoid a name.",
    whatItIsNot: "Not a euphemism, and not reverent vagueness.",
  },
  {
    term: "Universal Deities",
    slug: "universal-deities",
    gloss: "the messengers",
    definition:
      "The order of beings through whom the sacred order operates, standing between uMdali and humanity. They are honoured, and honour is not worship. uNomkhubulwane and uMasondo are named in the corpus as the primordial mother and father.",
    whatItIsNot:
      "Not the angels and demons of an imported cosmology. Those categories were laid over African deities during conversion, and one half of the order was renamed while the other half was demonised.",
  },
  {
    term: "Isambulo",
    slug: "isambulo",
    gloss: "revelation",
    definition:
      "The language through which Spirit expresses itself, and the means by which what Spirit holds becomes available to a people. It is an active mode of knowledge transmission with its own conditions of reception and its own discipline of interpretation. There is no spirituality without revelation.",
    whatItIsNot:
      "Not intuition, not inspiration in the literary sense, and not belief. It is a way of knowing, and it is treated on this site as one.",
  },
  {
    term: "Imboni, plural Iimboni",
    slug: "imboni",
    gloss: "the spiritual guider of a nation",
    definition:
      "The office through which Isambulo reaches a people. An Imboni is constituted by what is received, stands in relation to a nation rather than to a doctrine, and holds an office that is older on this continent than any of the words later used to translate it.",
    whatItIsNot:
      "The imported word arrived with the missions and was used to file Africa's spiritual authorities under a category that was not theirs. It names a different office in a different order.",
  },
  {
    term: "PSCB",
    slug: "pscb",
    gloss: "Physical Spiritual Central Being",
    definition:
      "The bridge between Spirit and humanity: the central point through which revelation is accessed, interpreted and transmitted into practice. African Indigenous Spirituality is not fully knowable outside this structure, because revelation is not universally self-generated.",
    whatItIsNot:
      "Not a rank, and not an honorific. It is a description of a function within the order of existence.",
  },
  {
    term: "idlozi, isithunywa, abantu abadala",
    slug: "idlozi",
    gloss: "three distinct categories, precisely distinguished",
    definition:
      "Three categories the corpus keeps carefully apart, each with its own standing and its own relation to the living. Collapsing them into a single English word destroys the distinction and with it the practice that depends on it.",
    whatItIsNot:
      "Not three words for one thing, and not three grades of the same thing.",
    confirmationPending: true,
  },
  {
    term: "ukuphahla",
    slug: "ukuphahla",
    gloss: "the invocation",
    definition:
      "The invocation that connects the physical family to the spiritual realm. It is the mechanism inside custom: the thing a rite actually does, as distinct from what the rite expresses.",
    whatItIsNot:
      "Not ancestor worship. Africa honours those who have gone; it does not worship them, and the distinction is not a matter of degree.",
  },
  {
    term: "isiko",
    slug: "isiko",
    gloss: "tradition, custom",
    definition:
      "What keeps. Isiko preserves what revelation produced, and it exists through ukuphahla. Isiko without an element of spirituality is dead: the form remains and the mechanism has been removed.",
    whatItIsNot:
      "Not the parent category of spirituality. Spirituality reveals; tradition keeps. Filing the producer under the preserver reverses the order of reality.",
  },
  {
    term: "imvelo",
    slug: "imvelo",
    gloss: "nature",
    definition:
      "What African Indigenous Spirituality is, on the corpus's own account: not a system assembled by human reasoning but what is there, revealed and lived.",
    whatItIsNot: "Not nature worship, and not a metaphor.",
  },
  {
    term: "uGobela",
    slug: "ugobela",
    gloss: "the one who guides the initiates",
    definition:
      "The trained authority who guides amathwasa through initiation. The office is one instance of a structure found wherever knowledge is read from a fixed order rather than invented: a person trained to read, standing between the order and the one being formed.",
    whatItIsNot: "Not a teacher in the classroom sense, and not a supervisor.",
  },
  {
    term: "amathwasa",
    slug: "amathwasa",
    gloss: "those undergoing initiation",
    definition:
      "Those being formed under uGobela. Initiation transfers standing; it does not merely mark the passing of an age.",
    whatItIsNot:
      "Not students, and not novices in the sense another system uses.",
  },
  {
    term: "isithembu",
    slug: "isithembu",
    gloss: "plurality of marriage",
    definition:
      "An African family form with its own spiritual account and its own internal obligations, studied by AHV as a structure rather than as a curiosity, and set beside the statutory law that has governed it.",
    whatItIsNot:
      "Not a deviation from a norm established elsewhere, and not a problem awaiting correction by a system that did not produce it.",
  },
  {
    term: "ubukhosi boMoya",
    slug: "ubukhosi-bomoya",
    gloss: "spiritual kingship",
    definition:
      "The office of the spiritual king, standing beside the king who governs the nation. Neither office is complete without the other, and colonial administration understood this well enough to remove the second and leave the first standing hollow.",
    whatItIsNot:
      "Not a ceremonial title, and not a counterpart drawn from the religious system and set beside a secular throne. The separation that system draws between its own authority and the state's answers a problem the spiritual system does not have.",
  },
  {
    term: "izwi lilandela umoya",
    slug: "izwi-lilandela-umoya",
    gloss: "the word follows the spirit",
    definition:
      "The rule that governs this lexicon and every page of this site. Spirit reveals, and the word gives testament to the spirit. Vocabulary is downstream of revelation, which is why a borrowed vocabulary cannot describe a revelation it did not receive.",
    whatItIsNot: "Not a stylistic preference.",
  },
  {
    term: "Isambulo, past plus present equals future",
    slug: "past-plus-present",
    gloss: "the formula of restoration",
    definition:
      "What was revealed, set beside what can now be shown, produces the restored understanding. Its metaphysical ground is that within spirit only the present exists, and that those who have gone stand alongside the living.",
    whatItIsNot:
      "Not a slogan, and not a theory of history. It is a working method, and every department applies it.",
  },
  {
    term: "Alkebulan",
    slug: "alkebulan",
    gloss: "the continent, in its own naming",
    definition:
      "Part of the same restoration of naming that this lexicon carries. When this site says African, it means the natives of the continent, the original Black people of the world.",
    whatItIsNot: "Not a poetic alternative.",
    confirmationPending: true,
  },
  {
    term: "Ikhaya lomoya",
    slug: "ikhaya-lomoya",
    gloss: "the spiritual home",
    definition:
      "The place within an institution where the spiritual work is held, named in the corpus as standing inside a school rather than beside it.",
    whatItIsNot: "Not a chapel, and not a room set aside.",
    confirmationPending: true,
  },
];

export function getLexiconEntry(slug: string): LexiconEntry | undefined {
  return LEXICON.find((entry) => entry.slug === slug);
}
