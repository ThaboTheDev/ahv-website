/**
 * Prophet profiles.
 *
 * Content is adapted from the African Hidden Voices archive. Each entry is
 * ordered chronologically by year of birth.
 *
 * `image` is optional — drop a portrait into /public/images/voices/ and set
 * the path here to replace the typographic medallion with a photograph.
 */

export interface VoiceSection {
  heading: string;
  paragraphs: string[];
}

export interface Voice {
  slug: string;
  name: string;
  /** Honorific, e.g. "Prophet", "Prophetess". */
  honorific: string;
  /** Birth / death label, e.g. "c. 1882 – 1956". */
  lifespan: string;
  /** Year of birth, used for sorting and the timeline. */
  birthYear: number;
  origin: string;
  /** One-line summary for cards and metadata. */
  summary: string;
  image?: string;
  /** Standfirst shown at the top of the profile. */
  standfirst: string;
  sections: VoiceSection[];
  quote?: string;
  references?: string[];
}

export const VOICES: Voice[] = [
  {
    slug: "elliot-kamwana",
    name: "Elliot Kamwana",
    honorific: "Prophet",
    lifespan: "c. 1882 – 1956",
    birthYear: 1882,
    origin: "Nkhata Bay, Lake Malawi",
    summary:
      "A Tonga preacher exiled for 21 years by colonial authorities for a ministry that baptised over nine thousand people in six months.",
    standfirst:
      "Elliot Kamwana was a Tonga born near Nkhata Bay on Lake Malawi in about 1882. Condemned without trial and handcuffed during the voyage, he was exiled for 21 years. His crime had been the religious message he preached.",
    sections: [
      {
        heading: "A Ministry That Shook the Colony",
        paragraphs: [
          "The teachings Kamwana proclaimed in his ministry of 1908–1909 had seemed extraordinary: thousands rushed to be baptised as he cried \u201ckwacha Afrika yuka\u201d — \u201cIt is dawn, Africa arise\u201d — transforming American millenarian religious teachings into an apocalyptic vision of an Africa without whites.",
          "Put under house arrest after barely six months of ministry, his prophecies about the end of the world in 1914 continued to spread throughout Nyasaland through underground networks distributing religious publications.",
        ],
      },
      {
        heading: "\u201cFree Education and Baptism to All\u201d",
        paragraphs: [
          "Kamwana promised free education and baptism to all; he seemed to be offering a Tonga Restoration. After baptismal candidates had memorised the creed and commandments and paid for classes, they were baptised with a symbolic sprinkling of water. Kamwana did so \u201cimmersing them deep in the water like John the Baptist\u201d — a return to the Prophetic age. In contrast to the staid missionary services, Kamwana \u201cjoked and laughed with the people.\u201d",
          "When cross-examined at the Inquiry as to his attitude towards Livingstonia's leader, Kamwana replied that he had \u201cbrought the name of Christ to this country and I don't despise him.\u201d The Europeans had brought the letter, but the spirit, he implied, lay with the Africans. This is a recurrent theme in his ideas — the need to separate the Christian message from the society which brought it.",
        ],
      },
      {
        heading: "Return and the Watchman Healing Mission",
        paragraphs: [
          "When Kamwana returned from exile in 1937, barely anyone from his village in West Nyasa would have recognised him. In the intervening period he had continued to spread his teachings, writing letters overflowing with prophetic imagery to followers throughout central Africa. On his return he was revered as an nchimi — a prophet and healer — and formed his own independent church.",
          "Even after his extended imprisonment, his following did not fall away. In 1919 the Nyasaland Watch Tower movement recorded that \u201cKenan Kamwana is still its real leader,\u201d with members living in \u201cconfident and keen hope of Kenan's early return.\u201d",
          "His return was on strict conditions: he had to reside in the district and was forbidden from leaving without the district commissioner's approval. Shortly afterwards he formally broke with the Jehovah's Witnesses, citing European attempts to influence their teaching, and formed the Watchman Healing Mission. Four thousand people received a \u201cnew name\u201d — the importance of asserting an identity independent of Europeans remained central.",
          "His home village of Chiwangalumwi became a theological institution and centre for spiritual healing. The rejection of European medicine in favour of spiritual healing is characteristic of African churches, but the means by which Kamwana came to these beliefs in his church is striking.",
        ],
      },
      {
        heading: "Education and Formation",
        paragraphs: [
          "He attended the Mission school at Bandawe between 1898 and 1901, distinguishing himself until, frustrated in his repeated attempts to attain baptism and ordination, he left. Moving to South Africa, he was baptised there, worked as a hospital attendant and preached, experiencing the harsh conditions of migrant labour, before meeting the preacher Joseph Booth in Cape Town in 1907, who introduced him to Russell's Watch Tower teachings. He returned to Nkhata Bay the following year and began preaching.",
          "Kamwana's own explanation is revealing: Watch Tower was unpopular because \u201cwhen a native is separate from European charge he is hated by the European.\u201d This points towards the issues at the heart of the Inquiry: power and control. What was so unsettling about the reach of mission education was that the colonial authorities simply could not control what Africans were thinking.",
        ],
      },
      {
        heading: "The Elusive Figure",
        paragraphs: [
          "Kamwana was a \u201ccivilised native,\u201d a political prisoner, a traditional healer; despite the multiplicity of his roles, as an individual he remains elusive. But seen through these biblical tropes, the power of his prophecy and leadership emerges. His message was an argument of images — a supreme use of symbols addressing the problems of witchcraft, the failings of the missionaries, and the materiality of Western civilisation by seeking to \u201creturn to the whole.\u201d",
          "When people were introduced for the first time to the vivid prophetic imagery of Revelation, or the prevalence of witchcraft and magic in the Old Testament, it is scarcely surprising that they began to agree with him that Europeans had been hiding something from them. The contradiction was that in giving Africans the power to read for themselves, missionaries had surrendered control of the message they took.",
          "The accusation repeatedly levelled at Kamwana in the 1916 Chilembwe Commission of Inquiry was that of advocating \u201ccriticism of British rule.\u201d Judged in the political terms in which the Inquiry was couched, he certainly was guilty of \u201crebellious\u201d teaching — but his doctrines were \u201cunsettling\u201d precisely because the Commission could not understand them. Commissions of Inquiry act as an archival source of colonial concern, marking off certain people as threats to the state. This is embodied in the image of Kamwana journeying into exile: a peaceful preacher standing on deck handcuffed, alongside a colonial official with dispensation to shoot him.",
        ],
      },
    ],
    references: [
      "Donati, H. 2016. \u201c'A Very Antagonistic Spirit': Elliot Kamwana: Christianity and the World in Nyasaland.\u201d The Society of Malawi Journal, Vol. 64, No. 1 (2011), pp. 13–33.",
    ],
  },
  {
    slug: "johanne-masowe",
    name: "Johanne Masowe",
    honorific: "Prophet",
    lifespan: "1914 / 1915 – 1973",
    birthYear: 1914,
    origin: "Gandanzara, Makoni District, Zimbabwe",
    summary:
      "Born Shoniwa Masedza Tandi Moyo, he wandered throughout Zimbabwe in the 1930s preaching in the wilderness — alarming the colonial authorities.",
    standfirst:
      "Born in Gandanzara village in the Makoni district of Eastern Zimbabwe. His father was Jack Masedza; his mother was Saiso, or Eve, daughter of Mugwambi of Rusape. He took upon himself the name Johanne Masowe — \u201cJohn of the Wilderness.\u201d",
    sections: [
      {
        heading: "Early Signs",
        paragraphs: [
          "At three years of age, he joined other children in playing. The strange thing was that if any of the children made noise, Shoniwa would fall to the ground in a dead faint, but would revive later and resume normal conditions.",
          "When he was old enough to begin learning, his parents sent him to school with other boys. However, he would deliberately hide in a bush, and when the other boys left school for home, he would join them. Whenever his parents beat him for neglecting to learn, Shoniwa would be in anguish and then become totally unconscious. Whereupon he would later revive, as was his custom; and for this reason the parents, out of fear, left him alone and would not punish him anymore.",
        ],
      },
      {
        heading: "Birth — First Vision",
        paragraphs: [
          "One day before the child's birth, his mother Eve was cultivating alone in the field, when she saw an angel in white apparel holding a white basin. Her amazement was doubled when she realised that inside the basin was a baby boy. The angel addressed her, saying, \u201cEve, receive this child as he is holy.\u201d She took the child, and to her astonishment, the angel disappeared.",
        ],
      },
      {
        heading: "Birth — Second Vision",
        paragraphs: [
          "At that instant, she noticed a rolling rope descending out of a cloud toward her. And behold, a voice spoke to her from the cloud thrice, saying, \u201cEve, Eve, Eve, get hold of that rope.\u201d She got hold of the rope — which had three colours, like three of the rainbow ones. The rope lining from the cloud downwards lifted her several times off the ground. Upon being commanded by the voice to say the Lord's Prayer, she uttered it and then went home.",
        ],
      },
      {
        heading: "The Name Johanne Masowe",
        paragraphs: [
          "The group was inspired by Shoniwa Masedza Mtunyane, who took upon himself the name Johanne Masowe, meaning \u201cJohn of the Wilderness.\u201d He was a prophet who wandered throughout Zimbabwe — then Rhodesia — in the 1930s, causing alarm among the colonial authorities.",
          "In 1932 Johanne Masowe first drew the attention of the police in Mashonaland towns, mines and commercial farms. By making borders of landscapes sites for prayer, he pointed to the displacement of Shona people. Johanne was arrested at least five times during the 1930s for walking around preaching repentance for sins of adultery and witchcraft, and offering baptism for those who repented. He breached colonial norms by calling people out to pray in places that Rhodesian administrators wished to keep empty, then vanishing — only to surface in another place whose fringes could serve as sites for prayer.",
        ],
      },
    ],
  },
  {
    slug: "alice-lenshina-mulenga",
    name: "Alice Lenshina Mulenga",
    honorific: "Prophetess",
    lifespan: "1920 – 1978",
    birthYear: 1920,
    origin: "Chinsali District, Northern Rhodesia",
    summary:
      "Founder of the Lumpa church, whose movement grew to between 50,000 and 100,000 members and clashed with the new Zambian government.",
    standfirst:
      "Prophetess Alice Lenshina Mulenga Mubisha was the founder of a powerful African independent church movement at the time of Zambian independence. Beginning as an anti-witchcraft movement, it clashed with the new government when it rejected secular authority.",
    sections: [
      {
        heading: "Origins",
        paragraphs: [
          "She was born Alice Mulenga Lubusha in 1920 in the Chinsali district of the northern province of Northern Rhodesia. Alice was her baptismal name, while Mulenga was her traditional African name. The name \u201cLenshina\u201d was a Bemba form of the Latin word \u201cRegina\u201d — \u201cqueen.\u201d",
          "Lenshina was a baptismal candidate with a Presbyterian mission when she received a series of visions in which she believed she was taken to heaven and given divine messages instructing her to destroy witchcraft and sorcery. She claimed to have died and been resurrected four times.",
          "In 1953 she began a movement called Lumpa — meaning \u201cbetter than all others\u201d in Bemba — in a town that she renamed Zion. She took the name Lenshina, meaning queen. Despite her claims, a Presbyterian pastor baptised her — an event that seems to have had a profound impact, intensifying her visions. She and her husband were expelled in 1955, however, and began their preaching mission. Crowds of adherents soon joined them, and by 1959 there was an organised church with ministers and between 50,000 and 100,000 members, most of whom had left either Presbyterian or Catholic missions.",
        ],
      },
      {
        heading: "Teachings",
        paragraphs: [
          "Lenshina preached a basically Christian doctrine but with baptism as the only observance. Baptism was a special ceremony administered by Lenshina herself. She attacked witchcraft and sorcery, which placed her in the long tradition of witch-eradication movements in Central Africa, but to these she added the condemnation of alcohol and polygamy.",
          "The Lumpa composed spirited Bemba hymns, far superior to the wooden translations in use among Protestants and Catholics. The religion gathered its members into villages where the hymns and rejection of traditional religious practices created what she promoted as a new, cleansed society worthy to receive the Saviour when He came again. The grand cathedral built at Zion in 1958 has a pillar upon which Jesus Christ was to descend for His second coming.",
        ],
      },
    ],
  },
  {
    slug: "credo-mutwa",
    name: "Vusamazulu Credo Mutwa",
    honorific: "Prophet",
    lifespan: "1921 – 2020",
    birthYear: 1921,
    origin: "Kwa-Zulu Natal, South Africa",
    summary:
      "Sangoma, author and custodian of African oral tradition, who built a living museum so that Africa would not lose its identity.",
    standfirst:
      "Vusamazulu Credo Mutwa was born in 1921 in what is now known as Kwa-Zulu Natal. The events surrounding and leading up to his birth can be described as some form of religious conflict.",
    sections: [
      {
        heading: "A Birth Caught Between Two Faiths",
        paragraphs: [
          "His father was a Christian and his mother continued to practise her religion even after the arrival of Catholic missionaries in South Africa. Mutwa says his maternal grandfather refused for his daughter to become a Christian, as he viewed it as a religion that arrived with missionaries — while the Catholic missionaries forbade Mutwa's father from marrying a woman who was not a Christian.",
          "It was during his childhood that he experienced visions which were suppressed by his step-mother. It was also during this time that he experienced major trauma that left him ill for a very long time. It is interesting to note that Mutwa states that despite various visits, Christian doctors had failed at healing him, and he was only able to receive help from his grandfather, described as a medicine man — whom, during those times, missionaries had described as an \u201cungodly heathen.\u201d",
          "Following his healing, Mutwa says he began to question the teachings of the missionaries, which he says essentially aimed to make black people despise who they are. These teachings include the negative connotations associated with ancestors, as well as the idea that African people were primitive prior to the arrival of missionaries.",
        ],
      },
      {
        heading: "The Living Museum",
        paragraphs: [
          "Through the following years of travel throughout Africa, Mutwa says he soon discovered its true beauty in religion, culture and its stories. The heart-breaking realisation that Africa was slowly losing its identity inspired Mutwa to build what he called a living museum.",
          "Mutwa openly attributes the destruction of African identity to European colonisation, mainly in the form of the Christian religion. He says once a nation is taught to hate themselves, their culture and religion — essentially who they really are — through the veil of religion, that culture has been permanently destroyed and will continue to self-destruct long after the colonisers have walked away.",
        ],
      },
    ],
    quote:
      "I weep even now when I see Africans slaughter each other in the streets of South Africa, now supposedly a free nation. I weep even now when my people hunger and suffer in the veld in South Africa. I weep even now when Eurocentric education is being fed to our children, fed in order to make them Afrofobes — creatures that hate and despise their motherland, which look down in contempt upon their own people, because this is what all European-educated black people do. They despise Africa and all she stands for. And they are in contempt of the culture of her people.",
  },
  {
    slug: "madzibaba-wimbo",
    name: "Madzibaba Wimbo",
    honorific: "Prophet",
    lifespan: "b. 1922",
    birthYear: 1922,
    origin: "Mashonaland Central, Zimbabwe",
    summary:
      "Born Aaron Mhukuta, he began seeing angels at seven, was baptised by Johanne Masowe, and started prophesying in 1945.",
    standfirst:
      "The history of Prophet Madzibaba Wimbo — born Aaron Mhukuta, and one of the figures baptised into the Johanne Masowe tradition before becoming a prophet in his own right.",
    sections: [
      {
        heading: "Background",
        paragraphs: [
          "His real name was Aaron Mhukuta. He was born on 25 December 1922 in Mashonaland Central.",
          "His mother died when he was born. He started seeing angels and receiving visions at the age of seven. He was not a member of any church at that time; he was only baptised in 1935, by Johanne Masowe.",
          "He started prophesying in 1945.",
        ],
      },
      {
        heading: "Research Continuation",
        paragraphs: [
          "The full account of Prophet Madzibaba Wimbo's life and ministry is the subject of ongoing work by the African Hidden Voices research team. Further material will be published here as it is verified.",
        ],
      },
    ],
  },
];

/** Look up a single voice by slug. */
export function getVoice(slug: string): Voice | undefined {
  return VOICES.find((voice) => voice.slug === slug);
}

/** All voices, oldest first. */
export function voicesByEra(): Voice[] {
  return [...VOICES].sort((a, b) => a.birthYear - b.birthYear);
}
