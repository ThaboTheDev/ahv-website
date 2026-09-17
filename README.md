# African Hidden Voices — Website

The official website for **African Hidden Voices (AHV)**, a research
organisation retracing the steps and works of Africa's IImboni, kings and
spiritual leaders — past and present — so that their voices are no longer
suppressed.

Founded on the vision of **Imboni Dr. uZwi-Lezwe Radebe**, AHV began as a
dialogue platform for previously unheard African perspectives and has grown
into a research organisation with a team working across Southern Africa.

---

## Contents

- [Stack](#stack)
- [Getting started](#getting-started)
- [Project structure](#project-structure)
- [Editing content](#editing-content)
  - [Adding or editing a prophet profile](#adding-or-editing-a-prophet-profile)
  - [Adding portrait photography](#adding-portrait-photography)
  - [Changing contact details or navigation](#changing-contact-details-or-navigation)
- [Design system](#design-system)
  - [Colour](#colour)
  - [Typography](#typography)
- [The brand mark](#the-brand-mark)
- [Contact form](#contact-form)
- [Deployment](#deployment)
- [Accessibility & performance](#accessibility--performance)

---

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Next.js 15](https://nextjs.org) (App Router) | Static-first rendering, built-in SEO metadata, easy hosting |
| Language | TypeScript (strict) | Content and components are typed end to end |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | Utility classes plus a CSS-first design token layer |
| Fonts | Self-hosted variable fonts | No third-party requests, no layout shift, faster |
| Images | `next/image` | Automatic sizing and modern formats |

Everything renders as **static HTML** at build time — there is no database and
no server required at runtime.

---

## Getting started

Requires **Node.js 20+**.

```bash
npm install     # install dependencies
npm run dev     # start the dev server on http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

The dev server binds to `0.0.0.0:3000` so it can be reached from a container,
VM or preview environment.

---

## Project structure

```
app/
  layout.tsx              Root layout — header, footer, metadata, skip link
  page.tsx                Home page
  globals.css             Design tokens, font faces, prose styles
  icon.svg                Favicon (the AHV mark)
  robots.ts, sitemap.ts   Search-engine files, generated automatically
  about/page.tsx          About — origins, vision, what we do
  voices/page.tsx         The archive grid
  voices/[slug]/page.tsx  Individual prophet profile (statically generated)
  our-work/page.tsx       Research methods and milestones
  contact/page.tsx        Contact details and message form
  not-found.tsx           404

components/
  Logo.tsx                BrandMark (the mark), Wordmark, Logo lockup
  SiteHeader.tsx          Sticky nav with mobile menu
  SiteFooter.tsx          Footer with contact block
  Section.tsx             Standard section wrapper with eyebrow/heading
  PageHero.tsx            Interior-page banner
  VoiceCard.tsx           Prophet card for grids
  Portrait.tsx            Portrait, or a monogram fallback
  ContactForm.tsx         Client-side validated contact form

lib/
  site.ts                 Site name, navigation, contact details, socials
  voices.ts               All prophet profiles (the content source of truth)
  brand.ts                Bird silhouette + flock layout for the mark
  africa-path.ts          AUTO-GENERATED continent outline — do not edit

scripts/
  build-africa-path.mjs   Regenerates lib/africa-path.ts from map data
  preview-logo.mjs        Renders the mark to a PNG for review

public/fonts/             Self-hosted woff2 files
```

---

## Editing content

Almost all text lives in **`lib/voices.ts`** and **`lib/site.ts`**. You do not
need to touch the page components to update content.

### Adding or editing a prophet profile

Open `lib/voices.ts` and add an entry to the `VOICES` array:

```ts
{
  slug: "prophet-name",              // URL: /voices/prophet-name
  name: "Prophet Name",
  honorific: "Prophet",              // "Prophet" | "Prophetess" | other
  lifespan: "1900 – 1970",
  birthYear: 1900,                   // controls ordering everywhere
  origin: "District, Country",
  summary: "One line used on the card and in search results.",
  standfirst: "Opening paragraph on the profile page.",
  sections: [
    { heading: "Background", paragraphs: ["First…", "Second…"] },
  ],
  quote: "Optional pull-quote, rendered in the display serif.",
  references: ["Optional list of sources."],
}
```

The new profile then appears automatically in:

- the `/voices` archive grid,
- the home page (if it is among the three earliest by `birthYear`),
- the "More voices" sidebar on every other profile,
- previous/next navigation,
- `sitemap.xml`.

Ordering is derived from `birthYear`, so you never maintain a list by hand.

### Adding portrait photography

Portraits are optional. Without one, the site renders an elegant monogram
medallion that matches the brand — nothing looks broken.

To use a photograph:

1. Save it to `public/images/voices/` (JPEG or WebP, around 800×1000px).
2. Add the path to the profile in `lib/voices.ts`:

```ts
image: "/images/voices/prophet-name.jpg",
```

### Changing contact details or navigation

Both live in `lib/site.ts`:

- `SITE` — name, tagline, description, canonical URL
- `CONTACT` — address, phone, email, opening hours, social links
- `NAV` — the main menu (also drives the footer and the sitemap)

---

## Design system

Tokens are declared once in `app/globals.css` using Tailwind v4's `@theme`
block, then used as ordinary utility classes (`bg-brand-800`, `text-ink`,
`font-display`).

### Colour

The palette is derived from the AHV logo — a deep maroon body that warms to
crimson, paired with warm parchment neutrals.

| Token | Hex | Used for |
| --- | --- | --- |
| `brand-600` | `#C8102E` | Bright crimson accent |
| `brand-700` | `#A6192E` | Primary brand red, links, eyebrows |
| `brand-800` | `#8E1224` | Buttons, active nav |
| `brand-900` | `#6E0B1A` | Gradient interiors, wordmark on light |
| `brand-950` | `#45060F` | Hero gradient start, dark sections |
| `ink` | `#1C1517` | Body text, dark section backgrounds |
| `ink-soft` | `#3D3335` | Long-form body copy |
| `ash` | `#6B6058` | Secondary text |
| `sand` | `#E4D9C8` | Borders, dividers |
| `parchment` | `#F3ECE1` | Alternate section background |
| `cream` | `#FBF8F3` | Page background, text on dark |
| `ochre` | `#B8892F` | Heritage accent rule, blockquote border |

> **Note:** the exact hex values above were reconstructed from the logo
> visually. If you have the official brand palette, replace the `--color-brand-*`
> values in `app/globals.css` — every component updates automatically.

### Typography

All three families are self-hosted variable fonts in `public/fonts/` and are
subset to latin + latin-ext.

| Role | Family | Usage |
| --- | --- | --- |
| Display | **Cormorant Garamond** | Headings, pull-quotes, body of profiles |
| Wordmark | **Cinzel** | The logo wordmark, eyebrow labels, section numbers |
| Interface | **Inter** | Navigation, buttons, forms, captions |

Cinzel is a classical Roman inscription face, which matches the carved,
monumental feel of the logo wordmark while keeping headings readable.

---

## The brand mark

The mark — the African continent with a flock of birds rising out of it — is
**generated inline as SVG**, so it scales crisply, needs no image request and
can be recoloured with CSS.

- The continent outline in `lib/africa-path.ts` is derived from
  [Natural Earth](https://www.naturalearthdata.com) 1:110m map data (public
  domain), simplified to keep the file small while staying recognisably Africa.
- The birds and their flight paths are defined in `lib/brand.ts`. Birds over
  land are knocked out in cream; birds clear of the continent are crimson,
  echoing the original artwork.

To regenerate the continent outline (only needed if you change the
simplification level):

```bash
node scripts/build-africa-path.mjs
```

To preview the mark as a PNG:

```bash
node scripts/preview-logo.mjs out.png
```

> If you have the original vector logo file (SVG, AI or EPS), replacing
> `BrandMark` in `components/Logo.tsx` with that artwork will give the most
> faithful result. The generated version is a close, fully-editable
> reproduction rather than a trace.

---

## Contact form

`components/ContactForm.tsx` validates input in the browser, then hands a
structured message to the visitor's own email client via a `mailto:` link.
This keeps the site fully static — no server, no third-party service, nothing
to maintain.

To collect submissions server-side instead, replace the `mailto:` step with a
`fetch` POST to your provider (Formspree, Resend, Basin) or to a Next.js route
handler at `app/api/contact/route.ts`. The validated fields are already
assembled in the `body` variable, so it is a small change.

---

## Deployment

The site builds to static HTML and deploys anywhere that runs Node or serves
static files. **Vercel** is the simplest option since it is built by the same
team as Next.js:

1. Push the repository to GitHub (already done).
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Accept the defaults — Vercel detects Next.js automatically.
4. Point the `africanhiddenvoices.co.za` domain at the deployment.

Any other host (Netlify, Cloudflare Pages, a VPS with `npm run build && npm start`)
works equally well.

---

## Accessibility & performance

The site is built to be usable by everyone and fast on modest connections:

- Semantic landmarks (`header`, `nav`, `main`, `footer`, `article`, `aside`)
  and a keyboard-accessible "skip to content" link.
- Decorative SVG is hidden from assistive technology; meaningful images carry
  descriptive `alt` text.
- Visible focus rings on every interactive element, meeting WCAG 2.4.7.
- The mobile menu manages `aria-expanded`, `aria-controls` and body scroll.
- Form fields use real `<label>` elements, `aria-invalid` and inline error text.
- Colour pairings target WCAG AA contrast on dark brand backgrounds.
- Honour for `prefers-reduced-motion` — all animation is disabled on request.
- Fonts are self-hosted and subset; the whole font payload is ~330 KB across
  three families and loads with `font-display: swap`.
- Every page is pre-rendered to HTML; JavaScript is only shipped for the header
  menu and contact form.
