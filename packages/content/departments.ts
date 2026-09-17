/**
 * The six research departments.
 *
 * Each department follows the same shape so the pages render from one
 * template: mandate, governing question, position in the order of existence,
 * opening, position, research programmes, method, engagement, vocabulary and
 * current work.
 */

export interface ResearchProgramme {
  title: string;
  body: string;
}

export interface Department {
  /** URL segment under /departments. */
  slug: string;
  /** Display number, 01 to 06. */
  number: string;
  title: string;
  shortTitle: string;
  mandate: string;
  governingQuestion: string;
  /** Where the department's material sits in the order of existence. */
  orderPosition: string;
  opening: string[];
  position: { heading?: string; body: string }[];
  programmes: ResearchProgramme[];
  method: string;
  engages: string;
  vocabulary: string[];
  /** Empty when the department lists no public work in progress. */
  currentWork: string[];
}

export const DEPARTMENTS: Department[] = [
  {
    slug: "economics",
    number: "01",
    title: "AIS and Economics",
    shortTitle: "Economics",
    mandate:
      "Establishes what governs value, wealth and provision when Spirit is the first reality rather than an afterthought of the material order.",
    governingQuestion:
      "Is scarcity a fact about the world, or an assumption inherited from a materialist account of it?",
    orderPosition:
      "Practice. Economics is what a spirituality does with provision, and it is therefore studied as activation, not as belief.",
    opening: [
      "Africa is the wealthiest continent on earth and the poorest place to live on it. Development economics has explained this for seventy years with instruments that all sit downstream of a single unexamined premise, that value is a property of matter and of the human interest in matter. This department examines the premise.",
    ],
    position: [
      {
        body: "Modern economics begins from scarcity. Its founding definition treats economics as the study of the allocation of scarce means among competing ends, and every instrument built on that definition inherits it: price as the signal of scarcity, growth as the escape from it, competition as its social form.",
      },
      {
        body: "AIS does not begin there. It begins from provision. In a spirit-led order, what is available is not principally a function of what exists but of what is opened, and what obstructs provision is not always structural. The consequence is not a rejection of economic analysis but a reordering of it: material mechanism is real and is studied seriously, and it is studied as the second question rather than the first.",
      },
      {
        body: "This department therefore does two things at once. It reconstructs the economic architecture of the spiritual system as it stood before the intermediate systems displaced it, and it examines contemporary African economic life for the places where that architecture still operates or could be restored.",
      },
    ],
    programmes: [
      {
        title: "First fruits and the economy of blessing",
        body: "The oldest documented economic instruments in the sacred order are not exchange instruments. They are instruments of return: the first portion given before consumption, the harvest presented before it is eaten. This programme reconstructs the first-fruits principle across the African record and its elaborations, and examines what it does that a tax does not: it establishes that provision precedes production, and it locates the institution that receives as the institution that opens.",
      },
      {
        title: "Debt, release and the sacred cancellation",
        body: "Debt cancellation appears in the earliest temple economies as a sacred act performed by the legitimate authority, and passes from there into the legal codes that later religions inherited as Jubilee. This programme traces the instrument to its source, distinguishes the spiritual act from its legal residue, and reads contemporary African sovereign debt against it. The question it puts to development finance is precise: who now holds the authority that release requires, and what happened to the institution that used to hold it?",
      },
      {
        title: "The temple as the legitimate economic institution",
        body: "In the spiritual system the temple is not a place of worship set beside an economy. It is the parent institution: granary, court, archive, treasury and the seat from which provision is ordered. This programme documents that structure and asks what was lost when the economy was separated from the institution that held it, and what an institution that recombines them looks like now.",
      },
      {
        title: "Enterprise as spiritual practice",
        body: "The Revelation Spiritual Home operates an economic programme in which members are drawn into enterprise with the stated aim of economic independence, across a large group of businesses. This is a living case, on the doorstep, of a spiritual institution generating economic activity as part of its spiritual mandate rather than as a fundraising sideline. This programme documents it: what is taught, what is required of participants, what the outcomes are, and what distinguishes it from prosperity teaching, which is a religious-system instrument and works in the opposite direction.",
      },
      {
        title: "Land, place and the spirit of a location",
        body: "Land economics in Africa is conducted almost entirely as a question of title. This programme adds the question the title deed cannot hold: the standing of a place, what has been done on it, and what that means for what it will yield. It intersects with the Science Division on sites, and with Governance on custodianship.",
      },
    ],
    method:
      "Documentary and comparative reconstruction for the historical programmes; field documentation and structured interview for the living cases; conventional economic data used without embarrassment wherever it is the right instrument. Where a claim can be tested against figures, this department tests it and publishes the figures. Where a claim cannot be, it says so and does not dress an assertion as a finding.",
    engages:
      "Development economics and the resource-curse literature; the economics of religion; ubuntu and communitarian economic thought; Islamic finance and Catholic social teaching, studied comparatively as religious-system economies; land reform and restitution policy in Southern Africa; the growing IKS-and-economy literature.",
    vocabulary: [
      "Provision",
      "first fruits",
      "release",
      "custodianship",
      "the parent institution",
      "activation",
      "blockage",
    ],
    currentWork: [],
  },
  {
    slug: "governance",
    number: "02",
    title: "AIS and Governance",
    shortTitle: "Governance",
    mandate:
      "Studies legitimate authority: where it originates, who confers it, and what happens to a nation when the office that confers it is removed.",
    governingQuestion:
      "A crown may be inherited, elected or seized. What makes it legitimate?",
    orderPosition:
      "Practice and Knowledge Systems. Authority is revelation activated in a nation, and constitutional law is the knowledge system that later tries to describe it.",
    opening: [
      "Colonial administration understood something about African governance that African political science has been slower to state: that to break the independence of an African kingdom, the efficient method is not to defeat the king. It is to separate him from the Iimboni. Remove the spiritual guiders, and the kingdoms fall without a second campaign.",
    ],
    position: [
      {
        body: "The sacred order that African, Kemetic and Mesopotamian records all attest is a two-office order. There is the king who governs the nation, and there is the spiritual authority who guides the throne, and neither office is complete without the other. The two are not rivals, and the arrangement is not the separation the religious system draws between its own authority and the state's. That separation answers a problem the spiritual system does not have.",
      },
      {
        body: "Colonial governance dismantled the second office and left the first standing, hollow. Deposition, exile, criminalisation under witchcraft statutes and the reclassification of spiritual authority as superstition were not incidental cruelties; they were governance instruments, and they worked. The post-colonial state then inherited the arrangement and constitutionalised it: traditional leadership recognised in law, spiritual authority recognised nowhere, and the resulting office reduced to culture and ceremony.",
      },
      {
        body: "This department studies that architecture, its dismantling and its restoration. Its central concept is ubukhosi boMoya, spiritual kingship, without which, on the institution's own account, doctrine alone cannot complete a nation.",
      },
    ],
    programmes: [
      {
        title: "Two crowns, one order",
        body: "Comparative reconstruction of the two-office architecture: the spiritual authority beside the traditional king in Southern Africa, in Kemet, and in the Mesopotamian record, together with the council structures and the ritual instruments that bound the two. The programme establishes the pattern and the range of its variation, and identifies what each variant treats as non-transferable.",
      },
      {
        title: "Decapitation as colonial method",
        body: "Documentary study of the removal of spiritual authority as a deliberate instrument of conquest: the deposition of ruling houses, the imprisonment of spiritual leaders, and the statutory apparatus that made spiritual practice a crime. The Witchcraft Suppression Acts are read here not as a curiosity of colonial law but as the legal machinery of a governance strategy, alongside the mission-school severance of transmission documented on four continents.",
      },
      {
        title: "The category problem in law and policy",
        body: "Contemporary and immediately practical. States, charters and multilateral bodies recognise religion and recognise culture. Spirituality, as a distinct category, is frequently recognised by neither, with the result that AIS institutions are administered under frameworks built for the institutions of the religious system. This programme documents the problem in South African statute and in continental instruments, tracks the cases in which a spirituality category has been secured, and drafts the model provisions. It is the department's most direct route into policy work.",
      },
      {
        title: "The restored bond",
        body: "Documentation of restoration where it is happening: the recognition of a spiritual guider to a reigning throne, what the relationship consists of in practice, and what it changes. This is contemporary field documentation of a live institutional arrangement, and it is the department's answer to the objection that the two-office order is of historical interest only.",
      },
      {
        title: "The ethics of Spirit-led leadership",
        body: "What accountability looks like when authority is understood to be conferred rather than won. This programme takes the hardest objections seriously and answers them in the open: that unaccountable spiritual authority is a standing risk, that charisma resists institutional check, and that every tradition claiming divine sanction has produced abuses. AIS's own answer, that authority is not self-generated and therefore not self-authenticating, has to be shown working, not merely asserted.",
      },
    ],
    method:
      "Legal and archival research; comparative constitutional analysis; documentary study of colonial administrative records; field documentation of living arrangements; policy drafting and submission.",
    engages:
      "South African constitutional provisions on traditional leadership and on cultural, religious and linguistic communities; the statutory instruments governing traditional and Khoi-San leadership; continental instruments on culture and belief; the comparative literature on sacred kingship; political theology, engaged as the religious system's own account of the same question.",
    vocabulary: [
      "Ubukhosi boMoya",
      "the two crowns",
      "conferral",
      "custodianship",
      "guider",
      "decapitation",
      "the category problem",
    ],
    currentWork: [],
  },
  {
    slug: "philosophy",
    number: "03",
    title: "AIS and Philosophy",
    shortTitle: "Philosophy",
    mandate:
      "Holds the foundational questions: what a human being is, how anything is known, and what follows for every discipline that answered those questions without spirit.",
    governingQuestion:
      "Every discipline studying human beings has already answered what a human being is. When was that answer examined?",
    orderPosition:
      "Spirit and Revelation. This department works closest to the origin, and its results constrain every other department.",
    opening: [
      "This is the department the others depend on. If its account of spirit, knowing and principle does not hold, nothing downstream holds either. It is therefore written to be attacked, and it states its hardest claims first rather than burying them.",
    ],
    position: [
      {
        heading: "On what a human being is",
        body: "Spirit is not a component of the person alongside body and mind. It is what the person is, and it preceded the biological birth. Umoya is neutral and eternal; umphefumulo is the seat of personality; isithunzi is the presence a person carries. The distinctions are precise, they are not interchangeable, and no European psychological vocabulary maps onto them cleanly, which is itself a finding rather than an inconvenience.",
      },
      {
        heading: "On how anything is known",
        body: "Revelation is not a species of belief and is not a poetic name for intuition. It is a mode of knowledge transmission, with its own conditions of reception, its own discipline of interpretation, and its own tests. There is no spirituality without revelation. A philosophy department that cannot give an account of revelation as knowledge is not neutral about revelation; it has already decided against it and called the decision method.",
      },
      {
        heading: "On what governs",
        body: "Law governs the physical, as gravity governs a falling stone. Principle governs the spiritual, and governs the composition of spirit itself. The two are not the same kind of thing, and the modern habit of treating every regularity as a law of nature has no way of registering the difference. Principle spans every dimension, the earthly one included, which is why the physical order can be read as imitating the spiritual rather than the reverse.",
      },
      {
        heading: "On the difference that founds the institution",
        body: "Religion is a taught experience. Spirituality is a revealed experience. Belief and knowing are different epistemic states, not different intensities of the same one, and the philosophical work of establishing that is this department's core project.",
      },
    ],
    programmes: [
      {
        title: "Principle and law",
        body: "A full account of the distinction: what a principle is, how it differs from a natural law and from a moral rule, how principles are known, and what it means to say they govern the composition of spirit. This programme also handles the principle of activation, without which spirit is not yet spirituality, and the principle of balance.",
      },
      {
        title: "The eligibility of the knower",
        body: "The department's most contested programme, and its most important. The claim that AIS cannot be fully studied outside the guidance of a PSCB is treated here as a philosophical thesis about eligibility conditions in knowledge traditions, not as a boundary marker. The programme sets out the general form of eligibility conditions, shows that every knowledge tradition has one, examines what makes AIS's condition different in kind from ordination or credentialing if it is different, and answers the standing objection that an unfalsifiable eligibility condition insulates a tradition from criticism. It answers by specifying what would count as getting it wrong.",
      },
      {
        title: "Knowing and belief",
        body: "An epistemology of revealed knowledge: its reception conditions, its transmission, its correction mechanisms, and the tests a tradition of knowing applies to itself. Engaged directly with religious epistemology and with the philosophy of testimony, on the ground that these fields have done careful work on adjacent problems and reached different conclusions for reasons worth stating.",
      },
      {
        title: "The metaphysics of restoration",
        body: "Past plus present equals future, given its full philosophical treatment. Its metaphysical basis is the claim that within spirit only the present exists and that those who have gone stand alongside the living, which is a substantive thesis about time and personhood and is defended as one. The programme also handles unlearning and relearning as epistemic operations.",
      },
      {
        title: "Naming, language and the linguistic test",
        body: "The philosophy of the method the whole institution uses. Under what conditions does the absence of a word in a language license a conclusion about what its speakers knew? The programme states the test rigorously, marks where it is strong and where it over-reaches, and defends it against the obvious objections, including borrowing, semantic drift and the sheer age of contact.",
      },
    ],
    method:
      "Conceptual analysis; close reading of the revelation corpus; comparative philosophy conducted on equal terms rather than as a search for African analogues of European concepts; sustained engagement with the literature that disagrees.",
    engages:
      "The Africana philosophical tradition; the scholarship on the invention and construction of African religion, engaged directly and at its strongest; philosophy of religion and religious epistemology; phenomenology of experience; philosophy of language; the decolonial literature on knowledge, engaged critically, since much of it concedes the very premise this department disputes.",
    vocabulary: [
      "Umoya",
      "umphefumulo",
      "isithunzi",
      "Isambulo",
      "principle",
      "activation",
      "knowing",
      "eligibility",
      "uMdali, also Imfihlo, the Mystery",
    ],
    currentWork: [],
  },
  {
    slug: "knowledge",
    number: "04",
    title: "AIS and Knowledge Systems",
    shortTitle: "Knowledge Systems",
    mandate:
      "Establishes the order between spirituality and indigenous knowledge, and holds the archive, the naming, and the route into formal curriculum.",
    governingQuestion:
      "Indigenous Knowledge Systems have been recognised, funded and institutionalised. Where did the knowledge come from?",
    orderPosition:
      "Knowledge Systems. This department studies the last stage in the order, which is exactly why it must never be mistaken for the first.",
    opening: [
      "Indigenous Knowledge Systems is now an established field with statutes, funding instruments, university centres and a policy vocabulary. That is a real achievement and this department works inside it. It also carries a structural error that the field has not addressed: it recognises the knowledge and brackets the source.",
    ],
    position: [
      {
        body: "Knowledge systems are structured interpretations of spiritual reality. They come fourth in the order, after Spirit, Revelation and Practice, and they come fourth because they are formed from what the first three produced.",
      },
      {
        body: "It follows that AIS is not a subset of IKS. IKS is a derived structure and AIS is its origin. The healing knowledge, the botanical knowledge, the calendrical knowledge, the metallurgical and agricultural knowledge that IKS documents did not arise from observation alone and were not held by observers alone. They were held by trained knowers inside a spiritual order, transmitted under conditions that order specified, and they were separated from that order by a documentation project that could accept the data and not the source.",
      },
      {
        body: "The department's position is therefore not that IKS is wrong but that IKS is incomplete in a specific and correctable way, and that the correction restores rather than diminishes it. A pharmacopoeia recorded without the conditions of its transmission is a list. The same pharmacopoeia recorded with them is a knowledge system.",
      },
    ],
    programmes: [
      {
        title: "The order between AIS and IKS",
        body: "The department's foundational programme: establishing the derivation relation rigorously, case by case, in specific knowledge domains rather than by assertion. It works with the IKS field's own materials and asks in each case what the documentation left out and what is lost by leaving it.",
      },
      {
        title: "The trained knower",
        body: "Comparative study of the institution of the trained reader of a fixed order: uGobela guiding amathwasa through initiation; the Yoruba babalawo reading a fixed corpus; the Maya day keeper reading a fixed calendar; the diviner reading a fixed hexagram in the Chinese tradition. Four independent cases of the same discipline, on continents with no contact between them, in which meaning is read from an established order by a person trained to read it rather than invented at will. This is one of the strongest comparative arguments the institution holds, and it belongs to this department.",
      },
      {
        title: "Naming, terminology and the restored lexicon",
        body: "The lexicographical programme: building the authoritative glossary of AIS terms defined from within, never through religious or Christian etymology, together with the documentation of how the borrowed labels entered the literature and what each one did once it was there. This programme owns the linguistic test in its applied form and services every other department.",
      },
      {
        title: "Archives and the oral record",
        body: "Method and infrastructure: how oral testimony is taken, what makes a testimony evidentially strong or weak, how it is preserved, who owns it, what is done with knowledge given under conditions, and how an institution holds material that was given to it in trust. This programme sets the evidentiary standard for the Iimboni Database.",
      },
      {
        title: "Curriculum, accreditation and the route into formal teaching",
        body: "A body of knowledge becomes a taught discipline in South Africa through a specific and demanding statutory route: a qualification on the national framework, programme accreditation, institutional registration, and financial surety. None of it is available to an individual. All of it requires an institution with a governing body, audited statements, premises and staff qualifications. This programme documents the route honestly, including its purpose, which is the protection of students and is legitimate, and manages AHV's own work towards it. It is the department's answer to the question of how AIS becomes examinable rather than merely publishable.",
      },
    ],
    method:
      "Archival and field documentation; comparative institutional analysis; lexicography; curriculum design; sustained collaboration with university IKS centres and research councils.",
    engages:
      "South African IKS legislation and policy, and the national research funding instruments that follow from it; university IKS centres and their published work; international instruments on intangible heritage; the decolonial and epistemic-justice literature; archival science and the ethics of holding indigenous material.",
    vocabulary: [
      "Isambulo",
      "izwi lilandela umoya",
      "isiko",
      "ukuphahla",
      "uGobela",
      "amathwasa",
      "the trained knower",
      "derivation",
    ],
    currentWork: [
      "The Indigenous Knowledge Systems Conference, co-hosted with the University of Fort Hare, December 2025, and the journal special issue in preparation from it.",
    ],
  },
  {
    slug: "social",
    number: "05",
    title: "AIS and Social Systems",
    shortTitle: "Social Systems",
    mandate:
      "Studies how a people is held together: family, homestead, initiation, clan and name, and what happens when the spiritual mechanism inside a custom is removed.",
    governingQuestion:
      "What is the difference between a custom and a living one?",
    orderPosition:
      "Practice. This department studies spirituality where it is actually lived, which is in households.",
    opening: [
      "A custom performed without the thing inside it that made it work is not a tradition. It is a re-enactment. This department studies the difference, and studies what a century of removal has done to African social life at the level where people actually experience it.",
    ],
    position: [
      {
        body: "Tradition does not stand above spirituality and never did. Isiko exists because of ukuphahla, the invocation that connects the physical family to the spiritual realm, and isiko without an element of spirituality is dead. Spirituality reveals; tradition keeps. The relationship is one of production and preservation, and the older classification that filed African spirituality under tradition inverted it.",
      },
      {
        body: "The consequence for social research is sharp. African family life, kinship, initiation and naming have been studied extensively as culture, and the studies are often careful and valuable. What they cannot register is the mechanism: not what the custom expresses but what it does, and why it stops working when the spiritual element is removed while the form is retained. That is the gap this department works in.",
      },
      {
        body: "It is also where the department's most consequential contemporary work sits, because the removal is not finished and its effects are being felt now: in clan names going extinct, in bloodlines that were severed and never traced, in families performing rites nobody in the household can any longer explain, and in the specific damage done when an initiation is conducted by someone without the standing to conduct it.",
      },
    ],
    programmes: [
      {
        title: "The homestead as spiritual institution",
        body: "The household studied as the smallest complete unit of the spiritual system: what it contains, who holds what office within it, what is done at which points, and how the relationship to those who have gone is maintained. Field documentation across regions, in a form that later programmes can use comparatively.",
      },
      {
        title: "Name, clan and bloodline",
        body: "Naming carries authority: in spiritual law, the one who gives a name holds it. This programme studies African naming as an instrument rather than as a label, documents missionary renaming as a conversion technique, and takes up the contemporary consequences: clan names disappearing, lines that cannot be traced, and what restoration of a name actually involves. It works with the Science Division where genetic evidence bears on descent.",
      },
      {
        title: "Initiation and the life course",
        body: "Initiation as the transfer of standing rather than the marking of an age. What the rite does, who may conduct it, what happens when it is conducted by someone who may not, and what a person is understood to have become afterwards. The programme takes seriously, and does not evade, the contemporary harms associated with unregulated initiation, which are a matter of public record and of public health.",
      },
      {
        title: "Family form, plurality and the law",
        body: "African family forms and the legal systems that have governed them: customary marriage, plurality of marriage, recognition and its limits, and the position of women within both the spiritual account and the statutory one. The programme is conducted with the department's obligation to state the strongest objections it faces and answer them rather than talk past them.",
      },
      {
        title: "Displacement, the African-initiated institutions and continuity",
        body: "What happened to African social systems under mission, migration and urbanisation, and the specific case of the African-initiated institutions, named in the scholarly literature as the African Initiated Churches: bodies that carried African material inside a frame whose meaning is owned elsewhere, and which therefore preserved much and restored little. The programme studies them with care and without contempt, since they were the shelter available at the time.",
      },
    ],
    method:
      "Field documentation and structured interview; oral history; demographic and legal data where relevant; comparative work across regions and across the diaspora.",
    engages:
      "Sociology and anthropology of African religion and family; kinship studies; the substantial literature on the African-initiated institutions; customary law scholarship and the courts; public health research on initiation; migration and urbanisation studies.",
    vocabulary: [
      "Isiko",
      "ukuphahla",
      "idlozi, isithunywa and abantu abadala, precisely distinguished",
      "isithembu",
      "the homestead",
      "standing",
    ],
    currentWork: [],
  },
  {
    slug: "science",
    number: "06",
    title: "The AIS Science Division",
    shortTitle: "Science Division",
    mandate:
      "Reads the material record without the assumption that spirit is absent from it, and reports where the record and the revelation meet.",
    governingQuestion:
      "What does the physical evidence show when it is read by someone who has not already decided what it cannot show?",
    orderPosition:
      "Knowledge Systems, working as attestation. The Division does not generate the position it examines. It examines what the material record says beside it.",
    opening: [
      "This is the Division that will be read most sceptically, and it is built for that. Its method is stated before its findings, and the method is the point: the Division does not require the material record to prove revelation, and it does not treat revelation as a hypothesis awaiting confirmation. It reports convergence where convergence exists, and states plainly where the record has not reached.",
    ],
    position: [
      {
        heading: "One. Revelation is not a hypothesis",
        body: "Isambulo is stated as given. The Division does not test it, because the material record is not the instrument that would test it, and pretending otherwise would misrepresent both.",
      },
      {
        heading: "Two. The material record is read on its own terms",
        body: "Excavation reports, published dates, peer-reviewed genetics, astronomical alignment data and geological survey are used as their disciplines use them. The Division does not select evidence for congeniality, does not use contested results as though they were settled, and does not upgrade a dating range into a single number because the number is more striking.",
      },
      {
        heading: "Three. Convergence is reported as convergence",
        body: "Where the record and the revelation meet, the Division shows the working and names what has actually been established, which is agreement between two independent accounts and not proof of either by the other.",
      },
      {
        heading: "Four. Non-convergence is reported too",
        body: "Where the record does not reach as far as the revelation, the Division says so and leaves both standing. Where the published scholarship holds a different position, the Division names the difference. A division that only ever reports agreement is not doing research, and every reader will know it.",
      },
      {
        heading: "Five. Contested evidence is labelled contested",
        body: "Any site, date or finding under active dispute in its own field is published with the dispute attached.",
      },
    ],
    programmes: [
      {
        title: "AIS Archaeology",
        body: "The oldest evidence of ritual behaviour on earth is African, and it is early enough to sit at the beginning of behavioural modernity rather than after it. The unit works the Southern African sequence in particular: the engraved ochre and shell beadwork of the Blombos assemblage; the deliberate burial with grave goods at Border Cave; the ritual material of the Tsodilo Hills, with the dispute over its interpretation stated rather than suppressed. Beyond it, the monumental commemoration of the dead at Kerma, the stone architecture of Great Zimbabwe and Mapungubwe, and the temple complexes of the Nile. The unit's question is a single one, put to each site: what has to be true about a people for them to have done this?",
      },
      {
        title: "AIS Cosmology",
        body: "Ordered sky-knowledge in Africa is older than the civilisations usually credited with inventing it. The unit works the astronomical alignment record, the calendar circle of the Egyptian Western Desert among the earliest, alongside the ordering of dimensions in AIS itself: the upward and downward directions, the layered cosmos, and the sacred order that places uMdali beyond identity and the Universal Deities as messengers. It works comparatively with the sky-and-order material of the Dreaming, of the Mesoamerican calendar, and of the Baltic and Vedic traditions, on the shared question of what an ordered cosmos requires of the people who read it.",
      },
      {
        title: "AIS Mathematics",
        body: "Africa holds the oldest mathematical artefacts known: notched tallies from Southern and Central Africa that predate every literate civilisation by tens of thousands of years. The unit studies number as order and hierarchy rather than as quantity alone: the ranking of things, the proportion systems of sacred architecture, and the numerical structure inside the revelation corpus itself, including the ranking of spirituality against religion and the political order. Its discipline is to keep the archaeology and the numerology apart, and to say which of the two any given claim belongs to.",
      },
      {
        title: "AIS Geology",
        body: "Earth as spiritual structure. The unit documents the sites where revelation has been received and covenant established, and studies what those sites have in common physically: mountains, caves, springs, river confluences, and the ochre sources that supplied the oldest ritual material on the continent. Its contemporary work is site documentation, and its comparative work is the recurrence of the same site types on every continent this institution has examined.",
      },
      {
        title: "AIS Science",
        body: "The natural world engaged without the assumption that a vital principle is a metaphor. The unit works on umoya and the vital-force concepts that appear independently in Bantu philosophy and in the Chinese tradition; on healing knowledge and the African pharmacopoeia, jointly with Knowledge Systems; and on resonance and the drum, which surfaces with the same function on continents that share nothing but the principle.",
      },
    ],
    method:
      "Published excavation and dating literature; peer-reviewed population genetics; archaeoastronomical alignment data; geological survey; field documentation of sites. All external findings are cited to their primary publication, never to a secondary summary, and every date is given as its published range.",
    engages:
      "Palaeoanthropology and Middle Stone Age archaeology; archaeoastronomy; population genetics and the deep human lineage literature; ethnobotany; comparative religion and the anthropology of ritual.",
    vocabulary: [
      "Attestation",
      "convergence",
      "the material record",
      "site",
      "activation",
      "order",
    ],
    currentWork: [],
  },
];

/** The Division's cross-cutting comparative programme, set out in full. */
export const COMPARATIVE_PROGRAMME = {
  title: "The comparative programme",
  intro:
    "The Division holds one long-running programme that crosses all five units, and it is the institution's strongest evidential argument.",
  premise:
    "If African Indigenous Spirituality is the original expression of Spirit in human existence, and if it left Africa inside the people who left, then it should be found in the same architecture among populations that could not possibly have borrowed it from anyone. That is a prediction, and it can be checked.",
  cases: [
    {
      title: "Mesoamerica",
      body: "Ancestors kept beneath the floor as the literal foundation of authority, royal blood offered as the substance that activates, and a throne that is also an altar.",
    },
    {
      title: "Aboriginal Australia",
      body: "Isolated for over sixty thousand years, with a creative order still active inside ordinary time and Law held orally by Elders.",
    },
    {
      title: "The Mi'kmaq",
      body: "A single Creator whose spirit runs through every living thing and an Elder-led knowing carried without a text.",
    },
    {
      title: "The Baltic peoples",
      body: "A sky, sun and earth authority and an eternal flame tended by trained keepers, two centuries after every neighbouring nation had converted.",
    },
  ],
  conclusion:
    "Four populations, no contact, one architecture. The programme also documents what happened to each of them on contact, which is the same thing that happened in Africa: the order renamed, the transmission severed through the schooling of children, and the practice suppressed rather than persuaded out of existence. And it documents what followed, which is also the same: revival, in every single case, once the suppression lifted.",
};

export function getDepartment(slug: string): Department | undefined {
  return DEPARTMENTS.find((department) => department.slug === slug);
}
