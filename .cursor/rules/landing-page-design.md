---
description: "LogicStac Digital Agency design system and visual hierarchy rules adapted from elayadesign/ai-design-skills."
globs: "src/**/*.{ts,tsx,css}"
alwaysApply: true
---

# LogicStac Design Rules

Follow the master design rules detailed in `DESIGN_SYSTEM.md`:
- Typography: `font-display` (Mona Sans) + `font-serif font-normal italic lowercase text-ln-yellow` (Brier).
- Spacing: 8px grid (`py-16 md:py-24 lg:py-32` section padding, `p-6 md:p-8` card padding).
- Colors: `ln-yellow` (`#FF6B00`), `ln-dark` (`#101400`), `ln-cream` (`#F4F4ED`), `ln-onyx` (`#111112`).
- Icons: Always use `SimpleIcon` from `src/components/ui/simple-icon` for brand and tech vectors. Never use raw emojis or placeholder SVGs.
- Motion: GSAP ScrollTrigger with `power3.out`. Tactile button states (`hover:scale-[1.03] active:scale-95`).
- Radii: Cards `rounded-2xl`, inputs/buttons `rounded-xl`, pills/chips `rounded-full`.
