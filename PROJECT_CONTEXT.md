# AuresPédia — Project Context

## Goal
Pediatric medicine website for the Department of Pediatrics, University of Batna 2, Algeria. Bilingual (FR/AR), content managed via Sanity CMS.

---

## Tech Stack
- **Next.js 14** (App Router, `app/[locale]/` structure)
- **next-intl v3** — FR/AR routing, `generateStaticParams` returns `[{locale:'fr'},{locale:'ar'}]`
- **Sanity.io v3** — CMS for all content (actualités, activités, articles, team, siteConfig)
- **Tailwind CSS v3** — `2xl:` breakpoint used for 80% browser zoom scaling
- **Resend** — contact form email API
- **Google Fonts** — Manrope (latin) + Cairo (arabic)

---

## File Structure (key files)

```
app/
  layout.jsx                    # Minimal root layout (hydration-safe)
  globals.css                   # Keyframes: fadeInUp, revealLTR, bounceRight, floatUp
  [locale]/
    layout.jsx                  # Main layout: fonts, Navbar, Footer
    page.jsx                    # Home page (Hero, Actualités, Activités, Articles, Contact)
    a-propos/page.jsx           # About page (Hero, Histoire, Team)
    actualites/page.jsx         # News listing
    actualites/[slug]/page.jsx  # News detail (2-col: content left, image right)
    activites/page.jsx          # Activities listing
    activites/[slug]/page.jsx   # Activity detail (2-col layout)
    articles/page.jsx           # Articles listing
    articles/[slug]/page.jsx    # Article detail (2-col + sticky author card)
    ressources/page.jsx         # Resources page
  api/contact/route.js          # Resend email handler

components/
  Navbar.jsx                    # Sticky, backdrop-blur, dropdown nav, locale switcher
  Footer.jsx                    # Floating info card + green block + dark bottom bar
  BalloonsBackground.jsx        # Exists but unused — background animation TBD
  HomeActualites.jsx            # Full-bleed 2-panel news section (20s auto-rotate)
  ActualitesClient.jsx          # News carousel with clip-path reveal animation
  HeroQuotes.jsx                # Auto-cycling quotes with dot nav (10s interval)
  VisionMission.jsx             # Tab-switching Vision/Mission card with SVG bg icons
  FadingImage.jsx               # Crossfade image cycler (8s interval, 700ms fade)
  TeamCard.jsx                  # Photo card with floating details overflow card
  TeamGrid.jsx                  # 3-visible + arrow/dot pagination + expand/collapse
  ArticleCard.jsx               # horizontal variant: image right, w-full
  EventCard.jsx                 # Activity card
  ContactForm.jsx               # SVG icons, Resend API, separator-style title
  VisionMission.jsx             # Tabs with slide animation
  SectionIntro.jsx              # Two-line bold separator component

lib/
  sanity.js                     # All data fetching (getLatestActualites, getUpcomingActivites,
                                #   getPastActivites, getLatestArticles, getSiteConfig, etc.)

sanity/
  schemaTypes/
    siteConfig.js               # heroImage, heroHeadline, heroSubtext, quotes[], vision,
                                #   mission, aboutImage1, aboutImage2
    actualite.js                # title, slug, body (portable text), image, date
    activite.js                 # title, slug, body, image, date, lieu, type
    article.js                  # title, slug, body, image, author, category
    teamMember.js               # name, role, jobTitle, photo, ordre
```

---

## Design Conventions
- **Width**: `container mx-auto px-4` + inner `w-[88%] mx-auto` — used on every section
- **2xl: breakpoint** fires at 80% browser zoom on 1440px screens — used for larger text/spacing
- **Colors**: `text-primary` (green), `bg-neutral` (light gray), `text-dark`
- **Section separators**: two-line bold text (`text-dark` line 1, `text-primary` line 2)
- **RTL**: `isRTL = locale === 'ar'`, body gets `font-arabic` class, html gets `dir="rtl"`
- **Fonts**: `--font-manrope` (FR), `--font-cairo` (AR)

---

## Current Status

### Done ✅
- Full bilingual routing (FR/AR) with next-intl
- Navbar with dropdowns, locale switcher, sticky scroll behavior
- Home page: Hero, Mission separator, About preview, Actualités (full-bleed), Activités, Articles, Contact
- À propos page: Hero card, Histoire (FadingImage), Team (TeamGrid pagination + expand)
- Actualités/Activités/Articles: listing pages + detail pages (2-col layout)
- All detail pages: `w-[88%]` width, 2-column (content + image)
- Footer: floating info card + green CTA + copyright
- ContactForm: SVG icons, Resend integration
- Sanity schemas: all content types + siteConfig with quotes/vision/mission/images
- Background animation: removed balloons/stars, new idea TBD (see Next Steps)
- `getSiteConfig()` returns quotes, vision, mission, aboutImage1, aboutImage2

### Pending ❌
- Enter bilingual content into Sanity Studio (all fields)
- Generate/source missing images: `team-merabet.jpg`, `team-boukhalfa.jpg`, `news-caravane.png`
- Set real Resend API key in `.env.local` and test contact form
- SEO: verify OG images, sitemap, robots.txt
- Deploy to Vercel + configure `aurespedia.univ-batna2.dz` domain
- Ressources page: design not started

---

## Important Decisions & Constraints

1. **`app/layout.jsx` must stay minimal** (just `<html><body>{children}</body></html>`) — adding anything there caused hydration errors because locale layout already renders full HTML structure.

2. **`position: fixed` is broken** by Navbar's `backdrop-blur-sm` (creates stacking context). Any background animation must account for this — either `position: absolute` scrolling with the page, or a portal + canvas approach.

3. **`getLatestArticles` query**: uses `[0..$limit]` (inclusive) with `limit - 1` — NOT `[0...$limit]`.

4. **`localizeDoc(doc, locale)`** helper in `lib/sanity.js` resolves all localized fields.

5. **TeamCard**: `overflow: visible` on outer card, inner clipping div hides 30% of photo bottom, details card floats below with `position: absolute`.

6. **HeroQuotes fallback**: hardcoded 2 quotes if Sanity returns fewer than 2.

7. **`2xl:` breakpoint strategy**: Tailwind's `2xl` = 1536px — on a 1440px screen at 80% zoom the viewport becomes 1800px, triggering `2xl:` rules. Used for scaling up text and spacing at 80% zoom.

---

## Next Steps
1. **Design a new background animation** for the landing page (replacing removed balloons) — ideas being explored separately
2. Add all content to Sanity Studio (FR + AR for every field)
3. Source/generate missing team photos
4. Design + build Ressources page
5. Test contact form with real Resend key
6. Deploy to Vercel, configure DNS
7. Final QA: test both locales, mobile responsiveness, 80%/100% zoom
