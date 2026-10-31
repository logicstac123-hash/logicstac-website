# LogicStac Digital Agency

Award-winning digital design and software development agency platform built with React 18, TypeScript, Vite, Tailwind CSS v4, GSAP, Three.js, and Simple Icons.

---

## Design System & AI Skill Rules

This project enforces the design methodology and visual hierarchy system established in **[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)** (adapted from [`elayadesign/ai-design-skills`](https://github.com/elayadesign/ai-design-skills)).

All future pages, landing flows, components, and sections must adhere to:
- **Strategy & Structure (Part A)**: Strict intake criteria (ICP, conversion metrics, objection handling, proof signals), 12-part persuasive landing page narrative, and outcome-first copy.
- **Visual Design Guardrails (Part B)**: 
  - **Typography**: `Mona Sans Variable` (Display & Sans) paired with `Brier` (editorial italic serif for accents).
  - **Color Tokens**: Brand high-contrast palette (`#FF6B00` yellow/gold, `#101400` dark brutalist base, `#F4F4ED` warm cream).
  - **Spacing & Radius**: Mathematical 8px spatial grid and nested corner radius rules.
  - **Vector Icons**: Simple Icons (`SimpleIcon`) for brands/technologies and Lucide for interface controls. Zero raw emojis or generic unstyled placeholders.
  - **Motion**: GSAP ScrollTrigger timeline curves (`power3.out`, `stagger: 0.1`) with micro-interaction hover states.

---

## Tech Stack

- **Framework**: React 18+ (SPA with Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`)
- **Animation & Motion**: GSAP 3 + ScrollTrigger + ScrollSmoother
- **3D Graphics**: Three.js & WebGL
- **Icons**: Simple Icons (`simple-icons`) & Lucide React (`lucide-react`)

---

## Development & Build

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Lint codebase
npm run lint

# Compile production build
npm run build
```

---

## Project Structure

```
├── DESIGN_SYSTEM.md      # Master design system & visual hierarchy guide
├── src/
│   ├── components/
│   │   ├── layout/       # Header, navigation drawer, and footer
│   │   ├── sections/     # Modular full-page agency sections
│   │   └── ui/           # Reusable primitives (SimpleIcon, buttons, modals)
│   ├── utils/            # Scroll utilities and helpers
│   ├── index.css         # Tailwind v4 theme definitions and font faces
│   └── App.tsx           # Main application composition
└── public/               # Fonts, vector images, and textures
```
