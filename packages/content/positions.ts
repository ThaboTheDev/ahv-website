/**
 * The ten standing positions, each published with the objection against it
 * stated at full strength, and the institution's answer.
 */

export interface Position {
  number: string;
  /** URL anchor, e.g. /positions#spirit-precedes */
  slug: string;
  title: string;
  /** The position, stated. */
  position: string;
  /** The ground it rests on. */
  ground: string;
  /** The strongest objection AHV knows of, as its best defenders state it. */
  objection: string;
  /** AHV's answer. Where partial, the answer says so. */
  answer: string;
  /** Department slug this position belongs to. */
  department: string;
}

export const POSITIONS: Position[] = [
  {
    number: "01",
    slug: "spirit-precedes",
    title: "Spirit precedes",
    position:
      "The human being cannot be adequately studied without first understanding spirit, and every discipline that studies human beings has proceeded as though it can.",
    ground:
      "Biology studies the body, neuroscience the brain, psychology the mind, sociology behaviour, economics interest, political science power, philosophy reason. Each begins after a concession that has been made without examination. The concession is not defended anywhere in those literatures, because it is not noticed as a concession. It is treated as the starting line.",
    objection:
      "Methodological naturalism is not a metaphysical claim. Disciplines bracket what they cannot measure in order to say anything reliable at all, and the results, from vaccines to macroeconomic policy, are the argument for the method. To call the bracket an error is to mistake a working restriction for a doctrine.",
    answer:
      "The bracket is legitimate and its results are real. What is not legitimate is forgetting it was applied. A restriction adopted for tractability becomes a doctrine the moment its conclusions are stated as accounts of what a human being is rather than of what a method can reach. AHV does not ask the disciplines to abandon the bracket. It asks them to state it, and to stop presenting the inside of it as the whole.",
    department: "philosophy",
  },
  {
    number: "02",
    slug: "africa-is-the-origin",
    title: "Africa is the origin",
    position:
      "African Indigenous Spirituality is the earliest expression of Spirit in human existence, and the spiritualities of the world are elaborations of an inheritance carried out of Africa inside the first people who left.",
    ground:
      "Africa is the origin of humanity. The oldest ritual evidence on earth is African and early enough to sit at the beginning of behavioural modernity rather than after it. Revelation states the same origin. Two independent accounts arrive at one conclusion, and the Science Division reports the convergence with its working shown.",
    objection:
      "Shared structure is more economically explained by shared cognition than by shared descent. Human minds under similar pressures produce similar forms, which is why unrelated peoples independently arrive at ancestors, initiation and a sky authority. Common origin is not required, and invoking it where convergence suffices is the weaker explanation.",
    answer:
      "The convergence account explains general resemblance. It explains specific architecture less well: ancestors kept beneath the floor as the literal foundation of authority, a throne that is also an altar, a trained reader of a fixed order rather than a free interpreter. AHV holds that the cases it examines show architecture rather than resemblance. It concedes that the argument turns on how specific the shared features are, and that this is where the case must be won or lost.",
    department: "science",
  },
  {
    number: "03",
    slug: "religion-and-spirituality",
    title: "Religion is taught. Spirituality is revealed",
    position:
      "Religion and spirituality differ in how each comes to be known. Religion is transmitted by instruction and secured by belief. Spirituality is transmitted by revelation and secured by knowing.",
    ground:
      "A religion has a founder, a text, a clergy, a doctrine and a boundary, and every one of those is an instrument of transmission by instruction. A spirituality has none of them and does not need them, because what it transmits is not taught.",
    objection:
      "Every tradition claims direct access and every tradition also teaches. The distinction collapses under examination: initiations instruct, elders correct, and the content transmitted is remarkably stable across generations, which is what instruction produces. Belief and knowing are not two states but one state described from two sides.",
    answer:
      "Teaching occurs in both, and AHV does not deny it. What differs is what the teaching is for. In a taught system, instruction supplies the content. In a revealed one, instruction prepares a person to receive and to read what is not supplied by the instruction. The test is what happens when the teaching and the reception diverge: a taught system corrects the reception, a revealed one does not.",
    department: "philosophy",
  },
  {
    number: "04",
    slug: "africa-produced-no-religion",
    title: "Africa produced no religion",
    position: "No African founded a religion, and Africa did not have one to found.",
    ground:
      "A religion requires a founder, and the founding is a datable act performed by a named person. Africa's spiritual order has no such act and no such person anywhere in its record, because nobody founds what was given.",
    objection:
      "This is a definitional victory rather than a factual one. Define religion narrowly enough and Africa has none; define it as the comparative study of religion actually does, functionally, and Africa plainly has religions, which is why they appear in every handbook of world religions.",
    answer:
      "The objection is correct that the argument turns on the definition, and AHV says so openly. It then asks the prior question: whose definition, arrived at by studying what, and applied to Africa by whom. A functional category assembled from the study of founded, texted traditions and then laid over an unfounded one does not discover a religion in Africa. It manufactures one, and then studies the artefact.",
    department: "philosophy",
  },
  {
    number: "05",
    slug: "the-naming-belongs-to-africa",
    title: "The naming belongs to Africa",
    position:
      "African Indigenous Spirituality is Ezomoya Zakwantu. The inherited colonial classification has no institution behind it and no African authority ever adopted it.",
    ground:
      "In spiritual law, the one who gives a name holds the authority. The classification laid over African spirituality was given from outside and carried its giver's frame with it. Restoring the naming restores the authority to define what is practised.",
    objection:
      "Analytical categories are supposed to be external. Sociology does not ask a movement to name itself, and a discipline that adopted every group's self-description would lose the ability to compare anything with anything. Insisting on the internal name is a demand for exemption from ordinary comparative method.",
    answer:
      "External categories are legitimate when they are declared as external and defended as analytically useful. The specific classification AHV rejects is neither. It was not proposed as an analytical instrument and defended on those grounds; it was applied administratively, by parties with an interest in the outcome, and inherited by scholarship afterwards. AHV asks for the category to be argued for. That is not exemption from method. It is method.",
    department: "knowledge",
  },
  {
    number: "06",
    slug: "spirituality-reveals-tradition-keeps",
    title: "Spirituality reveals, tradition keeps",
    position:
      "Tradition does not stand above spirituality and never did. Isiko exists through ukuphahla, and isiko without spirituality is dead.",
    ground:
      "The relationship is one of production and preservation. Revelation produces; tradition preserves what revelation produced. A custom performed with the mechanism removed and the form retained is a re-enactment, and everyone in the household can feel the difference.",
    objection:
      "Anthropology has documented the reverse many times: practice comes first and explanation is supplied afterwards, often long afterwards, and often inconsistently by different people in the same community. The spiritual account of a custom is frequently a rationalisation of a practice already in place.",
    answer:
      "The observation is sound and the inference does not follow. That participants supply differing accounts of what a rite does shows that explanation is distributed unevenly, which is expected where knowledge is held by trained authorities rather than by everyone. AHV's claim is about what the rite does, not about what an arbitrary participant can articulate about it.",
    department: "social",
  },
  {
    number: "07",
    slug: "indigenous-knowledge-is-derived",
    title: "Indigenous knowledge is derived",
    position:
      "African Indigenous Spirituality is the origin of which Indigenous Knowledge Systems are a derived structure, not a field within which AIS is one topic.",
    ground:
      "Knowledge systems are structured interpretations of spiritual reality and come fourth in the order of existence. The healing, botanical, calendrical and agricultural knowledge that IKS documents was held by trained knowers inside a spiritual order and transmitted under conditions that order specified.",
    objection:
      "IKS is a policy and research category built to secure recognition, protection and funding for knowledge that was being extracted without either. Subordinating it to a spiritual claim risks the recognition already won, and risks it for communities that do not share the spiritual claim.",
    answer:
      "The concern is serious and AHV works inside the IKS framework rather than against it. The correction restores rather than diminishes: a pharmacopoeia recorded without the conditions of its transmission is a list, and the same pharmacopoeia recorded with them is a knowledge system. Where a community does not share the spiritual account, AHV documents what that community holds, in its terms.",
    department: "knowledge",
  },
  {
    number: "08",
    slug: "revelation-is-knowledge",
    title: "Revelation is knowledge",
    position:
      "Isambulo is a mode of knowledge transmission with its own conditions of reception, its own discipline of interpretation and its own tests. It is not a species of belief.",
    ground:
      "Every knowledge tradition has an eligibility condition specifying who is competent to know within it. Laboratory science has training and replication; law has admission and precedent. AIS has activation and spiritual hierarchy. Ruling that AIS alone must be knowable by an observer with no standing inside it is not neutrality; it is one tradition's rule applied as though it were the absence of any rule.",
    objection:
      "Eligibility conditions in science and law are publicly specifiable and independently checkable: anyone may learn the technique and repeat the experiment. An eligibility condition that cannot be met by an outsider and cannot be assessed from outside insulates the tradition from correction entirely, which is the definition of an unfalsifiable claim.",
    answer:
      "This is the hardest objection on this page and AHV takes it as such. Its answer is to specify what would count as getting it wrong: revelation that fails against the corpus, against the order of existence, or against what the material record establishes, is wrong, and the institution is obliged to say so. The Philosophy department's second programme exists to work this out in publishable form, and the work is not finished.",
    department: "philosophy",
  },
  {
    number: "09",
    slug: "authority-is-conferred",
    title: "Authority is conferred",
    position:
      "Legitimate authority is conferred, not seized and not self-generated. The sacred order is a two-office order: the king who governs the nation and the spiritual authority who guides the throne.",
    ground:
      "The two-office architecture is attested across the African, Kemetic and Mesopotamian records. Colonial administration dismantled the second office and left the first standing, and did so deliberately, because separating a throne from its spiritual guider brings the kingdom down without a second campaign.",
    objection:
      "Unaccountable spiritual authority is a standing danger. Charisma resists institutional check, conferral cannot be audited, and every tradition claiming divine sanction has produced abuses that its own structures were unable to stop. Restoring such an office is restoring the risk along with it.",
    answer:
      "The risk is real and the history is not in dispute. AIS's own answer is that authority which is not self-generated is also not self-authenticating: an office that is conferred can be tested against what conferred it. AHV holds that this has to be shown working rather than asserted, and the Governance department's fifth programme exists to show it or to report that it does not.",
    department: "governance",
  },
  {
    number: "10",
    slug: "this-is-restoration",
    title: "This is restoration",
    position:
      "What is being restored was never lost. It was suppressed, it survived the suppression, and the record of that survival is the archive.",
    ground:
      "The instruments of suppression are documented: deposition, exile, imprisonment, witchcraft statutes, the severance of transmission through the schooling of children. In every case examined on four continents, practice resumed openly once the suppression lifted, which is not what happens to something that has died.",
    objection:
      "A century of rupture is not nothing. What resumes after suppression is reconstructed from fragments, shaped by the very institutions that suppressed it, and often organised around modern concerns. Calling that restoration rather than revival understates how much was actually built new.",
    answer:
      "AHV accepts that reconstruction occurred and does not claim an unbroken transmission in every line. The claim is narrower and it holds: the thing being returned to was not extinguished, and the evidence is that it re-emerged in the same architecture wherever the pressure was released. Where a specific line was severed and cannot be traced, the archive says so, in the field kept for exactly that purpose.",
    department: "social",
  },
];

export function getPosition(slug: string): Position | undefined {
  return POSITIONS.find((position) => position.slug === slug);
}
