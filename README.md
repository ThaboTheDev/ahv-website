# African Hidden Voices (AHV) Research Institution

The website of **African Hidden Voices (AHV) Research Institution**, an
independent research institution advancing African Indigenous Spirituality
(AIS) as a global academic discipline.

AHV was established through the revelation of **HSRM Imboni Dr uZwi-Lezwe
Radebe**, and is cited as a primary source in *The Revelation Spiritual Home:
The Revival of African Indigenous Spirituality* (Introvigne and Šorytė,
Cambridge University Press, 2025).

---

## Contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [The content package](#the-content-package)
- [House style](#house-style)
- [Design system](#design-system)
- [The brand mark](#the-brand-mark)
- [Routes](#routes)
- [Forms](#forms)
- [Deployment](#deployment)
- [Open items](#open-items)

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router) | Static-first rendering, built-in metadata, simple hosting |
| Language | TypeScript (strict) | Content and components are typed end to end |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Utility classes over a CSS-first token layer |
| Fonts | Self-hosted variable fonts | No third-party requests, no layout shift |
| Content | `packages/content` | One typed source of truth, from which the copy document is generated |

Every page is **pre-rendered to static HTML** at build time. There is no
database and no server required at runtime.

---

## Getting started

Requires **Node.js 20+**.

```bash
npm install          # install dependencies
npm run dev          # dev server on http://localhost:3000
npm run build        # production build
npm start            # serve the production build
```

The dev server binds to `0.0.0.0:3000` so it can be reached from a container,
VM or preview environment.

### Other commands

```bash
npm run check:style    # house-style check: fails on any em dash
npm run check:types    # tsc --noEmit
npm run export:copy    # regenerate the copy document from packages/content
npm run logo           # render the brand mark to a PNG for review
npm run africa:path    # regenerate the continent outline from map data
```

---

## Project structure

```
packages/
  content/               THE SOURCE OF TRUTH for all copy
    index.ts             Barrel export
    global.ts            Institution, navigation, ticker, footer, contacts
    home.ts              Home page
    institution.ts       Institution, Framework, Founding Scholar, Record
    departments.ts       The six departments
    positions.ts         The ten standing positions
    lexicon.ts           The 22 restored terms
    research.ts          Conference papers and appearances
    publications.ts      Books and the independent scholarship
    database.ts          The nine Iimboni Database records, and the method
    foundations.ts       The eight distinctions
    engage.ts            Academic, government and media engagement
    newsroom.ts          Announcements and research notes
    media.ts             The Dialogue Series and the Research Digest
    support.ts           Support, researcher access, submit a voice
    redirects.mjs        Legacy redirects (plain JS so next.config can load it)
    HOUSE-STYLE.md       The binding terminology and mechanics rules

app/                     Routes, all pre-rendered
  layout.tsx             Header, footer, metadata, skip link
  globals.css            Design tokens, font faces, prose styles
  page.tsx               Home
  institution/           The Institution, Framework, Founding Scholar, Record
  departments/           Hub, plus one statically generated page per department
  positions/             The ten positions, with the case against each
  lexicon/               The restored vocabulary
  research/              Working papers and conference papers
  publications/          Books and the independent study
  database/              The Iimboni Database, its method, and submission
  foundations/           Where to begin
  engage/                Hub, plus one page per channel
  newsroom/              Announcements and research notes
  media/                 The Dialogue Series
  newsletter/            The Research Digest
  support/               Support the research
  account/               Researcher access (deliberately unlinked, see below)
  icon.svg               Favicon, generated from the mark
  robots.ts, sitemap.ts  Generated from the content package

components/
  Logo.tsx               BrandMark, Wordmark and the lockup
  SiteHeader.tsx         Sticky header with primary and utility navigation
  Ticker.tsx             "The record, as it stands", derived from content
  SiteFooter.tsx         Identity, three link columns, contacts, standing line
  Section.tsx            Section, Split and Prose layout primitives
  PageHero.tsx           Interior banner with breadcrumbs and metadata
  Source.tsx             SourceLine, Quotation and RecordField
  Cards.tsx              Department, position, lexicon and database cards
  SubmissionForm.tsx     Validated form, driven by a list of field labels

lib/
  brand.ts               Bird silhouette and flock layout for the mark
  africa-path.ts         AUTO-GENERATED continent outline. Do not edit
  format.ts              House-style formatting helpers

scripts/
  check-house-style.mjs  Fails on em dashes, reports forbidden terms
  export-copy.mjs        Generates the copy document from packages/content
  build-africa-path.mjs  Generates lib/africa-path.ts from Natural Earth data
  preview-logo.mjs       Renders the mark to a PNG
```

---

## The content package

**All copy lives in `packages/content`.** To change what the site says, edit
those files; you should not need to touch a page component.

Because the site renders from the package, the copy document is generated from
it rather than maintained beside it:

```bash
npm run export:copy   # writes AHV-Final-Page-Copy.generated.md
```

The generated document is intentionally not committed. `packages/content` is
the source of truth, and the document cannot fall out of step with the site
because it is produced from the same files the site renders.

### Adding a department

Append an entry to `DEPARTMENTS` in `packages/content/departments.ts`. It then
appears automatically on the departments hub, in the footer, in the home page
grid, in `sitemap.xml`, and gains its own page at `/departments/<slug>`, which
is statically generated from `generateStaticParams`.

The same is true of `POSITIONS`, `LEXICON`, `DATABASE_RECORDS`,
`ENGAGE_CHANNELS` and `ANNOUNCEMENTS`. The ticker figures update with them,
because `tickerFigures()` derives them.

---

## House style

The terminology and mechanics rules are binding and are documented in
[`packages/content/HOUSE-STYLE.md`](packages/content/HOUSE-STYLE.md). The
short version:

- **South African English.** Organisation, recognise, programme, defence.
- **No em dashes.** Use commas, colons, semicolons or a new sentence.
- Dates as `15 May 2026`. Currency as `R1 000`.
- An Imboni is never a "prophet". AIS is never "African Traditional Religion".
  What is being restored was never lost, so this is restoration, not recovery.
- Every claim of fact carries a source or does not appear.

```bash
npm run check:style
```

This fails the check on an em dash anywhere in the code or content, and lists
forbidden terms appearing outside a quotation or an allowlisted context. Run
it before committing.

Source lines are rendered through a single `SourceLine` component, so the
requirement is visible in the markup as well as in the copy.

---

## Design system

Tokens are declared once in `app/globals.css` using Tailwind v4's `@theme`
block, then used as ordinary utility classes.

### Colour

The palette continues the brand red of the AHV mark, set on a paper ground, in
the register of an academic press rather than a promotional site.

| Token | Hex | Used for |
| --- | --- | --- |
| `brand-600` | `#C8102E` | Accent rule under the hero heading |
| `brand-700` | `#A6192E` | Primary brand red, eyebrows, links, answers |
| `brand-800` | `#8E1224` | Buttons, active navigation |
| `brand-900` | `#6E0B1A` | Gradient interiors |
| `brand-950` | `#45060F` | Hero gradient start |
| `ink` | `#17151A` | Body text, dark sections |
| `ink-soft` | `#3A3740` | Long-form prose |
| `ash` | `#6D6A72` | Secondary text, metadata |
| `rule` / `rule-soft` | `#DDD8CF` / `#EBE7E0` | Borders and dividers |
| `wash` | `#F4F1EA` | Alternate section ground |
| `paper` | `#FBFAF7` | Page ground |
| `ochre` | `#A67C2E` | Heritage accent, notes and caveats |
| `verdigris` | `#2F6B60` | Verified status on database records |

> **To do.** The brand reds were read from the logo visually rather than from an
> official palette. If AHV holds the accurate values, replace the
> `--color-brand-*` entries in `app/globals.css` and every component follows.

### Typography

Four self-hosted variable families, subset to latin and latin-ext, 428 KB total.

| Role | Family | Usage |
| --- | --- | --- |
| Display | **Source Serif 4** | Headings, and all long-form research prose |
| Interface | **Inter** | Navigation, labels, captions |
| Wordmark | **Cinzel** | The logo wordmark, and the logo lockup |
| Data | **JetBrains Mono** | Sources, dates, figures, metadata, eyebrows |

The serif carries the argument and the mono carries the evidence: anything the
reader should be able to check is set in mono, which makes the institution's
evidentiary posture legible at a glance.

---

## The brand mark

The mark, the African continent with a flock of birds rising out of it, is
**generated inline as SVG**, so it scales crisply, needs no image request, and
can be recoloured with CSS. The favicon in `app/icon.svg` is generated from the
same geometry.

- The continent outline in `lib/africa-path.ts` is derived from
  [Natural Earth](https://www.naturalearthdata.com) 1:110m map data (public
  domain), dissolved into a single silhouette and simplified to 1.2 KB.
- The birds and their flight paths are in `lib/brand.ts`. Birds over land are
  knocked out in paper; birds clear of the continent are crimson.

> **To do.** If AHV holds the original vector logo (SVG, AI or EPS), replacing
> `BrandMark` in `components/Logo.tsx` with that artwork will give the most
> faithful result. What is here is a close, fully editable reproduction.

---

## Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/institution` | What AHV is, and the authority under which it works |
| `/institution/framework` | The epistemology, stated so it can be examined |
| `/institution/imboni` | The Founding Scholar and the public record |
| `/institution/record` | Recognition, partnership and conferences, all sourced |
| `/departments` | The six departments |
| `/departments/[slug]` | One page per department |
| `/positions` | The ten positions, each with its strongest objection |
| `/lexicon` | The 22 restored terms |
| `/research` | Working papers and conference papers |
| `/publications` | The books, and the scholarship that cites them |
| `/database` | The Iimboni Database |
| `/database/method` | How each record is made |
| `/database/submit` | Submit a voice |
| `/foundations` | Where to begin |
| `/engage` | Partnership, policy and media |
| `/engage/[channel]` | One page per channel, each with its own form |
| `/newsroom` | Announcements and research notes |
| `/media` | The Dialogue Series |
| `/newsletter` | The Research Digest |
| `/support` | Support the research |
| `/account` | Researcher access |

Eleven legacy paths redirect permanently to the routes above, defined in
`packages/content/redirects.mjs`. `/account` is deliberately **not linked from
the navigation**, because registration is not yet open and a link to a form
that cannot be completed is worse than no link. It is also excluded in
`robots.ts`.

---

## Forms

The site has no backend. `components/SubmissionForm.tsx` validates in the
browser and then hands a structured message to the visitor's own email client,
routed to the correct institutional address:

| Page | Routes to |
| --- | --- |
| `/database/submit` | database@africanhiddenvoices.org |
| `/engage/universities` | partnerships@africanhiddenvoices.org |
| `/engage/government` | partnerships@africanhiddenvoices.org |
| `/engage/media` | press@africanhiddenvoices.org |
| `/newsletter` | office@africanhiddenvoices.org |

To collect submissions server-side, replace the `mailto:` step with a `POST` to
a route handler under `app/api`, or to a form provider. The validated values are
already assembled in the `body` variable, so it is a small change.

---

## Deployment

The site builds to static HTML and deploys anywhere that runs Node or serves
static files. **Vercel** is the simplest route:

1. Push the repository to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new).
3. Accept the defaults. Vercel detects Next.js automatically.
4. Point the institutional domain at the deployment.

Any other host (Netlify, Cloudflare Pages, a VPS running
`npm run build && npm start`) works equally well.

---

## Open items

These are carried from the source copy document. Each is a content decision
that needs an answer from the institution, not a code change.

**Blocks the page taking payments:**

- `/support` shows no payment route. The institutional identity details below
  must be confirmed and published before it can, and the page says so:
  registered entity name and registration number, NPO or PBO registration,
  Section 18A status, physical address, receipt and refund policy, and where
  funds are held. `INSTITUTION.registration` in `packages/content/global.ts`
  currently renders "to be confirmed" in the footer.

**Needs confirmation:**

- The founding year, and the founding instrument if one exists.
- Research leadership: chairperson, directors, department heads and fellows.
  The Institution page has no named people, which a university partner will
  notice first.
- The authorship line of *An Introduction into Afrikan Indigenous
  Spirituality*. The Cambridge bibliography credits AHV as corporate author;
  at least one retail listing credits HSRM Imboni Dr uZwi-Lezwe Radebe.
- The date of the honorary doctorate. The conferring institution gives January
  2026; a secondary account gives 2025. The site follows the conferring
  institution and notes the discrepancy in place.
- Settled definitions for the three lexicon entries marked **For confirmation**,
  and how far to press *Alkebulan* in public-facing writing.
- Research ethics policy, and the working papers in preparation.
- Media kit assets.
- One institutional domain, with every address routed through it. The site
  currently uses `africanhiddenvoices.org`.

**Not yet built:**

- Authentication for `/account`. Until it exists, the page states what access
  will involve rather than offering a form that cannot be completed.

---

## Accessibility and performance

- Semantic landmarks and a keyboard-accessible "skip to content" link.
- Decorative SVG hidden from assistive technology; meaningful images carry
  descriptive alternative text.
- Visible focus rings on every interactive element.
- The mobile menu manages `aria-expanded`, `aria-controls` and body scroll.
- Form fields use real labels, `aria-invalid` and inline error text.
- Colour pairings target WCAG AA contrast on the dark brand field.
- `prefers-reduced-motion` is honoured: all animation is disabled on request.
- Fonts are self-hosted and subset, and load with `font-display: swap`.
- Every page is pre-rendered to HTML. JavaScript ships only for the header menu
  and the forms.
