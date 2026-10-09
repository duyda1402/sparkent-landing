# Spark Entertainment — Flagship Headquarters Homepage

The premium official homepage for Spark Entertainment, designed as a custom luxury cinematic landing page. 

## Architectural Philosophy

Built on a bespoke visual DNA representing:
- **70% Apple Restraint**: Minimalist interface, vast elegant whitespace (+30%), heroic typography, and silent restraint.
- **20% HYBE Energy**: Immersive dark canvas, visual-first storytelling, emotion, and epic cultural presence.
- **10% Bang & Olufsen Craft**: Premium acoustics architectural highlights, minimal physical geometry, and precise layout details.

The entire layout is strictly aligned with the custom **Spark Wave Peak logo** and its **Spark Purple** (#8B5CFF) visual language.

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx          # Global Page Router layout
│   └── ScrollToTop.tsx     # Apple-style transition utility
├── pages/
│   ├── Home/
│   │   └── index.tsx       # Flagship cinematic landing page (Cinematic Luxury)
│   └── NotFound/
│       └── index.tsx       # Fallback Error 404 page
├── routes/
│   └── index.tsx           # Router registration
├── index.css               # Smooth scrolls, luxury linear text gradients, glowing custom styles
└── tailwind.config.ts      # Custom theme colors (Background, Spark Purple, Rose Pink)
```

## Cinematic Assets & Generation Pipeline

- **Background Video**: Loop of slow-moving abstract purple wave of light (`01KW5H0XHF4FAFDXBY8GNYC0XQ.webm`).
- **Acoustic Showcase**: Spark Monolith interior featuring white Genelec speakers and a white iMac (`1782597064344_0.jpg`).
- **Ecosystem Graphics**: 4 customized visual representations for Studio, Academy, Label, and Creative Production.
- **Editorial Portraits**: Magazine-style artist photographs matching modern, premium, high-fashion styles.

## Quality Gates Verified

- ✅ **TypeScript compilation (`pnpm typecheck`)**: Compiles with zero errors.
- ✅ **ESLint code quality (`pnpm lint`)**: Strict code formatting & best practices satisfied.
- ✅ **Optimized bundle build (`pnpm build`)**: Highly performant asset pipeline for < 2s FCP target.
- ✅ **SEO & Metadata**: Complete setup of custom favicon, Open Graph parameters, and responsive tags.
