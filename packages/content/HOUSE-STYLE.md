# House style

Binding on every page, every release, every paper and every piece of
correspondence. The checked rules are enforced by `npm run check:style`.

## The naming rule

**izwi lilandela umoya.** The word follows the spirit.

African spiritual terms are never defined through religious or Christian
etymology, because that method is the misrepresentation AHV exists to correct.

## Required and forbidden terms

| Never write | Always write | Why |
|---|---|---|
| African Traditional Religion, ATR | African Indigenous Spirituality, AIS; Ezomoya Zakwantu | There is no African religion. Filing a spirituality under the term for what preserves it reverses the order of reality. Permitted only inside a direct quotation from a source, to avoid misquoting. |
| African religion, African faith, believers | African Indigenous Spirituality; practitioners; those who know | Belief and knowing are different states. |
| Movement, new religious movement, sect, cult | Institution | The revelation commands the word institution. External categories carry external analysis with them. |
| Recovery, revival of something lost, rediscovery | Restoration; revival of Africa's spiritual identity | What is being restored was never lost. It was suppressed and it survived. |
| Prophet, for an Imboni | Imboni, plural Iimboni | Different offices, different orders. |
| Prophecy, for what an Imboni receives | Isambulo, revelation | |
| Holy Spirit, for umoya | Umoya | |
| Angel, demon, spirit-being | Deity; Universal Deity | Deities were renamed as angels and demonised. |
| Witchdoctor, witch doctor | Healer; the specific office in its own term | A colonial slur. |
| Ancestor worship | Honouring; ukuphahla | Africa honours; it does not worship the departed. |
| God, used loosely | uMdali, the Creator; also Imfihlo, uMfihlakalo, the Mystery | The Creator has no name and exists beyond identity. |
| Tribe | Nation; people; clan where a clan is meant | |
| Superstition, folk belief, mythology | The specific practice, named | |
| Award-winning, world-class, leading, renowned, prestigious | State the record and let the reader conclude | Superlatives are the register of an institution that cannot cite anything. |

### Legitimate exceptions

A forbidden term is permitted where the writing is naming it in order to
correct it, or where it is part of a quotation, a publication title or the
colonial record being reported. `scripts/check-house-style.mjs` carries an
allowlist of these contexts; add to it only with the same justification.

Examples in this repository:

- "Umoya is not the Holy Spirit. A deity is not an angel. A healer is not a
  witchdoctor." (Foundations, distinction 05: the terms being corrected.)
- "Named in the colonial and mission record as: Prophetess, seer." (The
  colonial label, reported as such on a database record.)
- "Elements in New Religious Movements" (the published series title of the
  Cambridge University Press volume.)

## Forms of address

- **Full form, first mention:** HSRM Imboni Dr uZwi-Lezwe Radebe
- **Ceremonial form:** IMboni iNkosi YamaKhosi oMoya uZwi-Lezwe Radebe
- **Subsequent mentions:** HSRM, or Imboni Dr Radebe
- **Never:** Radebe alone, on any AHV page. Dr Samuel Radebe on AHV pages,
  although the site notes that external sources use it so that a reader
  searching the record can connect the two.

## The isambulo rule

In any AHV writing that carries HSRM's revelation, research is never presented
as correcting him. The revelation is left as given, and research is set beside
it as attestation. Where the body of published work has reached a different
position, or has not reached that far, that is acknowledged plainly as a fact
about the research, not as a qualification of the revelation.

## Mechanics

- South African English. Organisation, recognise, programme, centre, defence.
- **No em dashes.** Use commas, colons, semicolons or a new sentence.
- Dates: 15 May 2026. Never 15/05/2026.
- Numbers: spell out one to nine in prose; figures for ten and above; always
  figures with units and in tables.
- Currency: R1 000 with a space, in the South African convention.
- Indigenous terms are italic on first use on a page, with the English
  following in a comma clause, and roman thereafter.
- Quotations: always with author, work and page. A quotation without a page
  reference does not go on the site.
- Every claim of fact carries a source or does not appear.

## Enforcement

```bash
npm run check:style
```

Hard failures (exit code 1): em dashes and en dashes.

Warnings: forbidden terms outside an allowlisted context, listed for review.
