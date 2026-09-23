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
- **Tailwind CSS** for styling (custom design tokens in `tailwind.config.ts`) — a warm
  deep-forest-green / gold / cream palette (`vanta.black/charcoal/graphite` etc. in the
  config), not a neutral black-and-white theme
- **GSAP + ScrollTrigger** for scroll-driven storytelling (the Training section's
  pinned category switcher, scroll-scrubbed word reveals, parallax, clip-path image
  reveals, hover-scale on gallery images)
- **Lenis** for smooth scrolling, integrated with GSAP's ticker/ScrollTrigger
- **Fontsource** (self-hosted `Syne`, `Inter`, `JetBrains Mono` — latin subset only, no
  external font CDN request at runtime)
- No React animation library beyond GSAP — this keeps the JS bundle lean (~132 KB
  gzipped) instead of also shipping Framer Motion.
- Hand-drawn-style SVG line icons (`src/components/ui/GymIcons.tsx` — barbell,
  kettlebell, dumbbell, pulse, bolt) and a pure-CSS ambient background system
  (`AnimatedBackground`: slow-drifting blurred color fields + film grain) — no stock
  clipart or raster decoration.
- A five-second brand `Preloader` (`src/components/Preloader.tsx`) — a circular
  progress ring around a pulsing mark — that dissolves into the hero rather than
  cutting to it; the hero's own entrance (headline, subtext, discipline strip) is
  gated behind the preloader finishing, so it plays as the page appears instead of
  silently finishing behind the loader.

## Project structure

```
src/
  components/
    nav/            Navbar + full-screen animated mobile menu
    sections/        One file per page section (Hero, Philosophy, Space, Training, …)
    ui/              Reusable primitives: Button, Image, RevealText, RevealImage,
                     RevealFade, ScrubReveal, SectionLabel, AnimatedBackground,
                     GymIcons
    Footer.tsx
    Preloader.tsx
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

`vite.config.ts` sets `base: './'` so the build emits relative asset paths
(`./assets/...`) instead of root-absolute ones (`/assets/...`). Root-absolute
paths break entirely on any static host that serves the site from a subpath
(e.g. a GitHub Pages project site at `/repo-name/`, or a preview link under a
sub-route) — every script/style 404s and the page loads with no JS at all, so
nothing (preloader, animations, anything) runs. Relative paths work at both
the domain root and a subpath. **Opening `dist/index.html` directly from the
filesystem (`file://…`) will still never work** — browsers block ES module
`<script type="module">` loads under the `file://` origin via CORS
regardless of the path being correct; this is a browser security
restriction, not something fixable through Vite config. Always view the site
through a server: `npm run dev`, `npm run preview`, or an actual static-host
deployment.

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
- **Hero-height content**: any hero element meant to be visible on page load (not on
  later scroll) needs an explicit `start="top 100%"` on its `RevealFade`/`RevealText` —
  the default `start` threshold (`top 90%`) can fail to fire for content sitting near
  the bottom edge of the very first viewport, since the trigger condition isn't met yet
  at `scrollY = 0`. See `Hero.tsx`'s discipline strip for the pattern.
- **Ambient background**: `AnimatedBackground` (`src/components/ui/AnimatedBackground.tsx`)
  is pure CSS (`transform`/`opacity` blurred radial gradients + an SVG film-grain
  layer), frozen automatically by the global `prefers-reduced-motion` rule. It's used
  with `mix-blend-screen` over photography (Hero, Final CTA) and directly on flat
  color sections (Membership).
- **Preloader → Hero handoff**: `App.tsx` holds a `heroReady` flag, flipped by
  `Preloader`'s `onReveal` callback partway through its own exit fade (not after it
  fully finishes), so the hero's entrance overlaps the preloader dissolving rather
  than waiting for a hard cut. `Hero` only mounts its `RevealText`/`RevealFade`
  content once `ready` is true — mounting it unconditionally on page load would let it
  finish its animation invisibly behind the preloader before anyone sees it.
  `Preloader`'s own timer effect intentionally depends on `[reducedMotion]` only
  (never on `onReveal`, and it's called through a ref, `onRevealRef.current()`) plus a
  `startedRef` guard against ever running twice: calling `onReveal()` causes `App` to
  re-render with a new inline callback, and if that callback were a dependency, React
  would tear down and restart the whole five-second timer from a fresh
  `performance.now()` — the restarted timer would eventually fire GSAP tweens against
  refs from a preloader instance that already dissolved and unmounted (a real "GSAP
  target null" bug caught during QA, not a hypothetical).

## QA performed

- Production build (`tsc -b && vite build`) and `oxlint` run clean.
- Automated Playwright pass: no console errors/warnings, no horizontal overflow at
  320/375/390/430/768/1024/1440/1920px, keyboard skip-link + Tab order, membership
  → contact form pre-fill, contact form validation + success state, testimonial and
  training-category interactions, mobile menu open/close, `prefers-reduced-motion`.
- A systematic scan of every headline's rendered width against its container caught
  and fixed several real overflow/clipping bugs (see type-scale note above) before
  this was considered done.
- Preloader-specific: stack-traced a console warning (via the unminified dev build)
  back to a real retrigger bug in the preloader's timer effect (see the
  "Preloader → Hero handoff" note above) rather than dismissing it as test noise;
  confirmed the fix across repeated runs of a realistic interaction path (switch a
  Training category, then navigate to another section) that reliably reproduced it
  before the fix and never reproduces it after.
- Re-verified the hero's bottom row (scroll cue + discipline tags) for overlap across
  a matrix of viewport heights (650–1080px) after combining them into one flex row —
  a taller hero (headline + preloader-gated cascade) made two independently
  bottom-anchored elements collide when they weren't in the same row.
