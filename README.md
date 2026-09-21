# VANTA — Performance Club

A concept website for VANTA, a premium performance gym. Built as a single, continuous
editorial scroll experience — cinematic hero, scroll-driven training storytelling, an
architectural gallery of "the space," editorial coaching roster, and a premium
membership presentation — rather than the generic hero → cards → pricing → FAQ template.

> **VANTA is a fictional concept brand** created for this design project. Addresses,
> pricing, hours, and contact details are illustrative placeholders, called out as such
> in the UI (footer, membership section).

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS** for styling (custom design tokens in `tailwind.config.ts`)
- **GSAP + ScrollTrigger** for scroll-driven storytelling (the Training section's
  pinned category switcher, scroll-scrubbed word reveals, parallax, clip-path image
  reveals)
- **Lenis** for smooth scrolling, integrated with GSAP's ticker/ScrollTrigger
- **Fontsource** (self-hosted `Syne`, `Inter`, `JetBrains Mono` — latin subset only, no
  external font CDN request at runtime)
- No React animation library beyond GSAP — this keeps the JS bundle lean (~131 KB
  gzipped) instead of also shipping Framer Motion.

## Project structure

```
src/
  components/
    nav/            Navbar + full-screen animated mobile menu
    sections/        One file per page section (Hero, Philosophy, Space, Training, …)
    ui/              Reusable primitives: Button, Image, RevealText, RevealImage,
                     RevealFade, ScrubReveal, SectionLabel
    Footer.tsx
    SkipLink.tsx
  data/
    content.ts        All copy/content: nav, coaches, testimonials, membership tiers,
                       training categories, recovery offerings, contact details
    images.ts          Curated Unsplash photo IDs, grouped by section, each documented
                       with the search term it was chosen for
  lib/
    gsap.ts             GSAP + ScrollTrigger registration
    SmoothScroll.tsx    Lenis provider + `useSmoothScroll()` (always route programmatic
                       scrolling through this — see note below)
    Cursor.tsx          Custom cursor provider (desktop, fine-pointer only)
    MembershipInterest.tsx  Tiny context so a Membership tier CTA can pre-fill the
                       contact form's "membership interest" field
    useReducedMotion.ts
```

## Running locally

```bash
npm install
npm run dev       # http://localhost:5173
```

## Building

```bash
npm run build      # tsc -b && vite build -> dist/
npm run preview     # serve the production build locally
```

## Deployment

`dist/` is a static site — deploy it to any static host:

- **Vercel**: `vercel deploy` (framework preset: Vite) or connect the repo and let it
  run `npm run build` with output directory `dist`.
- **Netlify**: build command `npm run build`, publish directory `dist`.
- **Any static host / CDN**: upload the contents of `dist/` after running the build.

No environment variables or backend are required — the contact form is a frontend-only
concept form (see below).

## Notable implementation details

- **Photography**: images are hotlinked from `images.unsplash.com` by photo ID (see
  `src/data/images.ts`, each with the search term used to pick it). The `Image`
  component (`src/components/ui/Image.tsx`) always renders a dark brand-colored panel
  behind the `<img>`, so a slow or failed image load never breaks the layout — it just
  reads as an intentional dark panel. *This sandbox's own network policy blocks
  outbound requests to image CDNs, so photography could not be visually verified from
  inside this environment during development — it will load normally for real visitors
  and should be spot-checked after first deploy. Swap any photo by search term in
  `images.ts`.*
- **Scrolling**: every programmatic scroll in the app goes through
  `useSmoothScroll().scrollTo()`, which calls Lenis's own `scrollTo`. Don't call
  `window.scrollTo` / `Element.scrollIntoView` directly anywhere in app code — Lenis
  keeps its own internal scroll target and a raw native scroll call will fight it on
  the next animation frame.
- **Reduced motion**: `prefers-reduced-motion: reduce` disables Lenis smooth scrolling,
  skips GSAP scroll-triggered entrance animations (content is shown in its final
  state instead), and the custom cursor still works but position transitions instantly.
- **Type scale**: display headline sizes (`text-display-1`/`text-display-2` in
  `tailwind.config.ts`) are fluid `clamp()` values tuned against the specific
  `max-w-*` containers each headline uses — if you lengthen any headline copy or
  change a container's max-width, re-check for clipping at both very narrow (320px)
  and very wide (1920px) viewports; the mask-reveal technique (`RevealText`,
  `.line-mask`) clips overflow silently instead of wrapping.
- **Contact form**: client-side validation only, no backend. Submitting shows a
  simulated success state; nothing is stored or transmitted (stated in the UI).

## QA performed

- Production build (`tsc -b && vite build`) and `oxlint` run clean.
- Automated Playwright pass: no console errors/warnings, no horizontal overflow at
  320/375/390/430/768/1024/1440/1920px, keyboard skip-link + Tab order, membership
  → contact form pre-fill, contact form validation + success state, testimonial and
  training-category interactions, mobile menu open/close, `prefers-reduced-motion`.
- A systematic scan of every headline's rendered width against its container caught
  and fixed several real overflow/clipping bugs (see type-scale note above) before
  this was considered done.
