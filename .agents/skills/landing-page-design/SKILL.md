---
name: landing-page-design
description: "LogicStac Digital Agency design system and visual hierarchy rules adapted from elayadesign/ai-design-skills. Use whenever building, styling, or reviewing landing pages, marketing sections, components, or copy for LogicStac."
---

# LogicStac Landing Page Design & Visual System

All UI work in this repository must follow this specification.

## Core Rules

1. **One Offer $\rightarrow$ One Audience $\rightarrow$ One Primary Action**: Every page or section drives toward a singular outcome (e.g. `#contact-form` scope initiation or retainer booking).
2. **Typography Hierarchy**:
   - Headers: `font-display uppercase tracking-tight` (Mona Sans)
   - Emphasis word in titles: `<span className="text-ln-yellow font-serif font-normal italic lowercase">word</span>` (Brier)
   - Subtitles/Labels: `font-mono text-xs uppercase tracking-widest`
   - Body: `font-sans text-gray-300` (on dark) or `text-gray-600` (on cream)
3. **Color Palette Tokens**:
   - Primary Accent: `text-ln-yellow` / `bg-ln-yellow` (`#FF6B00`)
   - Dark Surfaces: `bg-ln-dark` (`#101400`) and `bg-ln-onyx` (`#111112`)
   - Light Surfaces: `bg-ln-cream` (`#F4F4ED`)
4. **Icons**:
   - Use `SimpleIcon` from `src/components/ui/simple-icon` for all brand/tech/platform icons (`siReact`, `siTypescript`, `siRocket`, `siTrustpilot`, `siLivechat`, etc.).
   - Use `lucide-react` only for generic control icons (`ArrowUpRight`, `Check`, `Plus`, `Minus`, `X`).
   - No raw emojis or unstyled placeholder SVGs.
5. **Spacing & Radii**:
   - Section vertical padding: `py-16 md:py-24 lg:py-32`
   - Outer card radius: `rounded-2xl`
   - Buttons and input fields: `rounded-xl`
   - Status badges & chips: `rounded-full`
6. **Motion**:
   - GSAP ScrollTrigger timeline reveals with `power3.out`.
   - Micro-interaction buttons with `hover:scale-[1.03] active:scale-95 transition-all duration-300`.
7. **Content Realism**:
   - Concrete metrics, authentic deliverable terms, verifiable proof signals.
   - Zero generic filler (*“Lorem ipsum”*).
