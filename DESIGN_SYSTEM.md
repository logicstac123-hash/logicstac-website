# LogicStac Design System & Visual Hierarchy Guidelines

> Adapted from [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) (`landing-page-design`) and tailored specifically for LogicStac Agency's digital architecture.
> **All future sections, landing pages, components, and marketing pages MUST follow this specification.**

---

## Core Philosophy

A landing page or agency section is not an unfocused canvas. It wins one clear intent:
$$\text{One Offer} \longrightarrow \text{One Audience} \longrightarrow \text{One Primary Action}$$

Work through **Part A (Strategy & Structure)** before writing code in **Part B (Visual System & Tokens)**.

---

# PART A — Strategy & Page Structure

## A1. Intake Protocol
Before designing or coding any new page or major section, ensure these parameters are defined:

1. **Primary Action**: Exactly one conversion goal (e.g., `#contact-form` submission, schedule consultation, retainer inquiry).
2. **Offer Clarity**: What the client receives (e.g., full-stack engineering, 3D WebGL build, design system retainer).
3. **Target Audience (ICP)**: High-growth founders, Series A/B tech startups, enterprise innovation teams.
4. **Objections to Counter**:
   - Timeline uncertainty $\rightarrow$ Address with guaranteed sprint deliveries (3–5 days, 3–6 weeks).
   - Cost opacity $\rightarrow$ Address with flat transparent pricing and zero hidden fees.
   - Code & IP ownership $\rightarrow$ Explicit guarantee of 100% intellectual property transfer.
5. **Proof Points & Assets**: Verifiable client metrics (e.g., *+210% conversion lift*, *50+ projects*, Trustpilot reviews).

## A2. Page Section Order & Anatomy

Every complete landing page must follow this 12-stage persuasive narrative:

### Above the Fold (Hook & Validate)
1. **Category Tag / Micro-Badge**: High-contrast pill badge with official Simple Icon and monospace uppercase category label.
2. **Outcome-Driven Headline**: Outcome + audience (e.g., *“Start A Project”*, *“Pricing Models”*). Bold Display font with intentional lowercase editorial serif italics for emphasis.
3. **Subheadline**: Specific, active, under 25 words clarifying the value proposition.
4. **Primary CTA**: High-contrast action button (e.g., `START A PROJECT`) with micro-interaction hover state.
5. **Immediate Proof Signal**: Trust badge ribbon, client logos marquee, or 5-star rating summary.

### Mid-Page (The Argument & Capabilities)
6. **Problem $\rightarrow$ Solution**: Highlighting the friction with slow traditional agencies vs. LogicStac’s agile senior engineering.
7. **Core Benefits & Features**: 3 to 6 modular cards with distinct Simple Icons and concrete performance deliverables.
8. **Process / How It Works**: 3 clear sequential stages (Discover $\rightarrow$ Design & Engineer $\rightarrow$ Scale & Support).
9. **Signature Tagline Reveal**: Kinematically styled typographic anchor with GSAP scroll reveal.
10. **Social Proof & Case Studies**: Testimonials featuring real portraits, client titles, verifiable metrics, and rating tags.

### Bottom (De-Risking & Conversion)
11. **Client FAQ & Objection Handling**: 6 to 10 expandable accordion items addressing timelines, stack choices, pricing, and support.
12. **Final Conversion Anchor**: Standalone CTA banner with risk reversal (e.g., *Pause or cancel anytime*, *24h reply guarantee*).

---

# PART B — Visual System & Design Guardrails

## B1. Typography System

| Role | Font Family | Tailwind Class | Usage & Rules |
|---|---|---|---|
| **Display / Titles** | `Mona Sans Variable` | `font-display` | Bold to Black (700–900 weight), uppercase, tracking tight (`tracking-tighter` or `tracking-tight`). |
| **Editorial Emphasis**| `Brier` | `font-serif italic font-normal` | Lowercase, italic, colored with `--color-ln-yellow` (`text-ln-yellow`). Used for accent words in titles. |
| **Body & Explanatory**| `Mona Sans Variable` | `font-sans` | Medium/Regular (400–500 weight), relaxed line height (`leading-relaxed`), text gray-300 on dark or gray-600 on cream. |
| **Labels & Micro-Tags**| `Mona Sans Variable` | `font-mono text-xs uppercase tracking-widest` | Monospace feel, bold, letter-spacing wide (`tracking-widest` or `tracking-wider`). |

### Rules:
- Never use more than 3 distinct font sizes within a single card.
- Maintain a minimum 4.5:1 contrast ratio for all body copy against background surfaces.
- Avoid centered multi-line body paragraphs; left-align body text exceeding two lines.

---

## B2. Color System & Surfaces

```css
/* Core Palette Tokens (src/index.css) */
--color-ln-yellow:      #FF6B00; /* Primary brand accent */
--color-ln-dark:        #101400; /* Deep brutalist surface */
--color-ln-olive:       #1a1c16; /* Secondary dark backdrop */
--color-ln-onyx:        #111112; /* Neutral dark card surface */
--color-ln-cream:       #F4F4ED; /* Warm light section surface */
--color-ln-deep-forest: #1F2323; /* Low-saturation slate dark */
--color-ln-white:       #FFFFFF;
```

### Surface Hierarchy:
- **Dark Sections** (`#101400` / `#111112`): Used for high-impact showcase, pricing, testimonials, and footer.
- **Light / Cream Sections** (`#F4F4ED`): Used for content-heavy sections like FAQ, Contact Form, and Track Mode.
- **Accent Glows**: Radial blurs (`bg-ln-yellow/5` to `bg-ln-yellow/10` with `blur-[120px]`) centered behind headers or primary pricing cards.
- **Micro-Noise**: Subtle ambient noise overlay (`bg-image-noise opacity-10 pointer-events-none`) across dark sections for tactile texture.

---

## B3. Spacing Rhythm & Grid Scale

All layout padding and margins must respect the 8px spatial grid:

- **Section Spacing**: `py-16 md:py-24 lg:py-32`
- **Section Headers to Content**: `mb-12 md:mb-16 lg:mb-20`
- **Card Internal Padding**: `p-6 md:p-8` for standard cards; `p-4 sm:p-6` for compact metric widgets.
- **Gap Scale**:
  - Micro tags / chips: `gap-2`
  - Form inputs / list items: `gap-4`
  - Grid columns: `gap-6 md:gap-8`

---

## B4. Corner Radius Harmony

Never mix arbitrary border-radius values. Respect the nested radius formula ($\text{Outer} = \text{Inner} + \text{Padding}$):

- **Page Containers & Modal Shells**: `rounded-2xl` (16px) or `rounded-3xl` (24px)
- **Interactive Cards & Panels**: `rounded-xl` (12px) or `rounded-2xl` (16px)
- **Buttons & Form Inputs**: `rounded-xl` (12px)
- **Badges, Pills, and Avatar Rings**: `rounded-full` (9999px)

---

## B5. Icon System & Brand Badges

All icons must be intentional, scalable vectors:

1. **Tech & Brand Vectors**: Always use **Simple Icons** (`import { SimpleIcon } from '../ui/simple-icon'`). Use official SVGs (`siReact`, `siTypescript`, `siNextdotjs`, `siRocket`, `siTrustpilot`, `siLivechat`, `siSubstack`, `siLinkedin`, etc.).
2. **Action & UI Indicators**: Use **Lucide React** (`ArrowUpRight`, `Check`, `Plus`, `Minus`, `X`, `Send`).
3. **Micro-Badge Architecture**:
   ```tsx
   <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full border border-ln-yellow/30 shadow-xs">
     <SimpleIcon icon={siRocket} size={13} className="text-ln-yellow" />
     <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-ln-yellow">
       Scope Initiator
     </span>
   </div>
   ```
4. **Forbidden**: No raw unstyled emoji placeholders or generic, unconfigured icon SVGs.

---

## B6. Motion, GSAP & Micro-Interactions

Every interactive element must provide immediate, high-fidelity tactile feedback:

1. **Button Hover States**:
   - `hover:scale-[1.03] active:scale-95 transition-all duration-300`
   - Accent button: `bg-ln-yellow text-black hover:bg-black hover:text-ln-yellow hover:shadow-xl`
2. **Card Hover States**:
   - `border-gray-800 hover:border-ln-yellow/50 transition-all duration-300 hover:scale-[1.01]`
3. **GSAP ScrollTriggers**:
   - Use `power3.out` for entrances (0.8s–1.2s duration).
   - Stagger sequential children with `stagger: 0.1` or `stagger: 0.15`.
   - Always wrap GSAP animations in `useGSAP` or clean up with `ctx.revert()` in `useEffect`.

---

## B7. Content Realism & Anti-AI Slop Rules

1. **No Fake / Placeholder Copy**: Avoid *“Lorem ipsum dolor”* or *“Your Company Name Here”*. Use concrete metrics, named roles, verified technologies, and authentic agency project deliverables.
2. **Realistic Testimonials**: Every review must feature a full client name, company, verified rating, category tag, and quantified business impact (e.g. *“+210% Conversion Lift”*).
3. **Zero Pill-Button Overload**: Keep standard buttons rectangular or softly rounded (`rounded-xl`). Reserve `rounded-full` exclusively for categorical status pills, filter chips, and circular icon triggers.
4. **No Telemetry / Dev Bloat in UI**: Keep client interfaces free of debug badges, system logs, or test markers.

---

## B8. Component Checklist for Future Additions

Before merging or publishing any new section or page:
- [ ] Section ID defined and linked cleanly in navigation / scroll utility (`scrollToSection`).
- [ ] Section wrapper includes responsive padding (`py-16 md:py-24 lg:py-32`).
- [ ] Header includes category pill badge, bold display title, and serif italic accent word.
- [ ] Uses tokens from `src/index.css` (`ln-yellow`, `ln-dark`, `ln-cream`, `ln-olive`).
- [ ] All icons use `SimpleIcon` or Lucide icons wrapped in styled containers.
- [ ] Responsive across mobile (<768px), tablet (768–1024px), and desktop (>1024px).
- [ ] Passes `npm run lint` (`eslint .`) and `npm run build` without warnings or regressions.
