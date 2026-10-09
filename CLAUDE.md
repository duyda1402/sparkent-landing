# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Bilingual (Vietnamese/English) marketing site for Spark Entertainment, a music studio, academy and label in Vietnam. Vite 7 + React 19 + TypeScript SPA with Tailwind CSS 3, Framer Motion and React Router 7. The project was scaffolded by the Wegic AI site builder (package name `wegic-vite-react`) and is deployed at `spark-hq.wegic.net` (see `public/sitemap.xml`). The canonical/OG URL is `sparkent.vn`.

## Commands

Use pnpm only. The `preinstall` script runs `only-allow pnpm`, so npm and yarn installs fail. Requires pnpm 10+ and Node 20.19+ or 22.12+ (Vite 7).

```bash
pnpm install
pnpm dev        # http://localhost:3000, strictPort: fails if port 3000 is taken
pnpm typecheck  # the only real type check (app + vite.config.ts)
pnpm lint       # eslint --fix (REWRITES FILES), then compiles src/index.css through PostCSS/Tailwind
pnpm build      # tsc && vite build
pnpm preview    # serve dist/
pnpm exec eslint src/components/MinimalNav.tsx   # lint one file without --fix
```

- `pnpm build` does not type-check. Its plain `tsc` (no `-b`) runs against the solution-style root `tsconfig.json` (`files: []` + references), so it compiles nothing and always passes. Run `pnpm typecheck` separately.
- TypeScript is `strict` with `noUnusedLocals` and `noUnusedParameters`, so an unused import fails `typecheck`.
- `pnpm lint` passes `--quiet`, which hides warnings such as `react-hooks/exhaustive-deps`.
- There is no test framework and there are no tests. The quality gates are `typecheck`, `lint` and `build`.

## Architecture

`src/main.tsx` renders `LanguageProvider` → `RouterProvider` (`src/routes/index.tsx`). `@/` is an alias for `src/`.

Every route except `*` (404) is a child of `src/components/Layout.tsx`. The layout provides the app-wide shell:
- `BookingModalProvider`, one global `BookingHubModal`, and `MobileStickyBookingBar` (below `lg` only).
- `GlobalPreloader`, shown once per browser session (`sessionStorage` key `spark_loaded`).
- `ScrollToTop`, which resets scroll on pathname change.

Pages live in `src/pages/<Name>/index.tsx` as default exports:
- `/` (Home) stacks the section components in order. `/about`, `/ecosystem`, `/studio`, `/media`, `/label`, `/artists`, `/projects`, `/news` and `/contact` are aliases that render the same Home page. No code scrolls them to a section.
- `/academy` is one large self-contained page (about 1000 lines).
- `/booking` lists service cards that open the booking modal. `?service=recording|piano|vocal|guitar` opens the modal on load.
- `/artists/:slug` and `/projects/:slug` read records from `src/lib/data.ts`. An unknown slug falls back to the first record instead of a 404. These two pages use an older dark design (`#050507`), are English-only, and have their own inline header instead of `MinimalNav`/`MinimalFooter`.

Section navigation uses plain `<a href="#id">` links, not router links. The target section ids on Home are `hero`, `intro`, `ecosystem`, `works`, `artists`, `journal` and `contact`. Keep these ids stable. `MinimalNav` switches to `/#id` when the page is not `/`. `MinimalFooter` always uses bare `#id`, so its section links do nothing on Academy and Booking.

### Booking flow

Call `useBookingModal().openBooking(service?)` from `src/lib/BookingContext.tsx` to open the global modal from anywhere. The optional `BookingServiceType` (`recording | piano | vocal | guitar | producer | mixmaster`) presets the form. Do not mount another `BookingHubModal`, because `Layout` already mounts one. (`pages/Booking` currently mounts a second instance, so two modals render on `/booking`.) The context functions are not memoized and change identity on every provider render, so be careful when you put them in effect dependency arrays.

`BookingHubModal.tsx` (about 1350 lines) is a multi-step form with per-service options and a `MediaRecorder` voice-audition recorder. Submission is client-only: it generates a `SPK-<PREFIX>-<4 digits>` reference and shows a confirmation. The `MinimalContact` form and the Academy consultation form also only set local state. No form data is sent or stored anywhere.

`src/lib/supabase.ts` exports a Supabase client built from `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (injected at deploy). Nothing imports it yet. Use it if form submissions need persistence.

### Bilingual content

`useLanguage()` from `src/lib/LanguageContext.tsx` returns `lang`, `setLang` and `toggleLang`. The default is `vi`. The choice persists in `localStorage` key `spark_entertainment_lang` and syncs `<html lang>`.

There is no i18n library or string catalog. Copy lives inline in each component, either as `lang === 'vi' ? '…' : '…'` ternaries or as paired fields (`titleVi`/`titleEn`, `descVi`/`descEn`) on local data arrays. Every user-facing text change needs both languages. Home, Academy and Booking set a bilingual `document.title` in a `useEffect` keyed on `lang`. Static SEO/OG meta tags are in `index.html`.

### Data and assets

`src/lib/data.ts` holds `ASSETS` (image and video URLs), `ARTISTS_DATA` and `PROJECTS_DATA`. This data is English-only. Most media is hosted on `cdn.wegic.ai`; only the logos are local in `public/`. Render remote images with `ImageWithFallback`, which swaps in a studio photo on load error. When you add or remove an artist or project slug, update `public/sitemap.xml` too.

## Live vs. dead components

`src/components/` contains several generations of the design. Only these files are reachable from the routes:
- Shell: `Layout`, `ScrollToTop`, `GlobalPreloader`, `BookingHubModal`, `MobileStickyBookingBar`.
- Home sections, in page order: `MinimalNav`, `MinimalHero`, `SparkIntro`, `MinimalEcosystem`, `SparkManifesto`, `MinimalWorks`, `MinimalArtists`, `SparkJournal`, `MinimalContact`, `MinimalFooter`. Academy and Booking also use `MinimalNav` and `MinimalFooter`.
- Shared: `ImageWithFallback`, `LiquidGlass` (`LiquidGlassButton`, used by the detail pages).

Unused: every `Editorial*` and `Featured*` component, `FloatingCTA`, `MinimalAcademy`, `MinimalLabel`, `MinimalStudio`, `SparkAcademySection`, `SparkLabel`, `SparkMediaSection`, `SparkStudioSection`, `WhySparkSection`, and `src/hooks/useAmbientAudio.ts`. Check imports before you assume that a component renders, and edit the live one. The dependencies `three`, `@react-three/fiber`, `@react-three/drei`, `react-helmet-async`, `clsx` and `tailwind-merge` are installed but not imported.

## Styling

The current design (Home, Academy, Booking) uses a white canvas with sections alternating `bg-white` and `bg-[#F6F6F4]`, near-black text `#0A0A0A`, borders `#E5E5E5`, Spark Purple `#7C3AED` accents, and a dark `#080808` header and footer.

- Colors are mostly hardcoded Tailwind arbitrary values (`bg-[#7C3AED]`, `text-[#0A0A0A]`), not the `spark.*` tokens in `tailwind.config.ts`. Follow the convention of the file you edit.
- Typography: `font-condensed` (Barlow Condensed) for display text and navigation, `font-mono` for small meta labels, Plus Jakarta Sans for body text. Google Fonts load in `index.html`.
- Motion: Framer Motion `whileInView` reveals with `viewport={{ once: true }}` and the ease curve `[0.16, 1, 0.3, 1]`.

The README's dark-cinematic / `#8B5CFF` description and its project-structure tree are out of date. Most custom classes in `src/index.css` (`.heading-section`, `.nav-link`, `.glass-card`, `.input-luxury`, etc.) belong to the older dark design and only dead components use them.

## Wegic scaffold

`vite.config.ts` injects the Wegic sandbox script (`sandbox-script-manager.js`) into `index.html`, and adds `vite-plugin-react-fiber-source` (it must stay before `react()`) and `vite-plugin-client-error-logger`. The `BASE_CDN_URL` env var sets the build `base` (default `./`). Keep these in place unless the site moves off Wegic hosting.
