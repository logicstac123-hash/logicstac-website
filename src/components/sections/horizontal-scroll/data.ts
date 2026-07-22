export interface HorizontalItem {
  image: string;
  title: string;
  subtitle?: string;
  text?: string;
  position?: { top?: string; left?: string; right?: string; bottom?: string; width?: string; height?: string; rotation?: number };
}

export const horizontalItems: HorizontalItem[] = [
  {
    image: '/images/drewverse/design_6.png',
    title: 'Global Fintech UI',
    subtitle: 'SaaS Platform',
    text: 'Next-gen banking interface',
    position: { top: '12%', left: '720px', width: '380px', height: '260px', rotation: -2 }
  },
  {
    image: '/images/drewverse/design_7.png',
    title: 'Design System',
    subtitle: 'Branding',
    text: 'Unified brand language',
    position: { top: '54%', left: '960px', width: '360px', height: '250px', rotation: 3 }
  },
  {
    image: '/images/drewverse/design_8.png',
    title: 'E-Commerce App',
    subtitle: 'Mobile UX',
    text: 'Immersive shopping experience',
    position: { top: '14%', left: '1240px', width: '420px', height: '280px', rotation: -3 }
  },
  {
    image: '/images/drewverse/design_9.png',
    title: 'Interactive Portal',
    subtitle: '3D WebGL',
    text: 'WebGL portfolio showroom',
    position: { top: '52%', left: '1520px', width: '400px', height: '270px', rotation: 2 }
  },
  {
    image: '/images/drewverse/design_10.png',
    title: 'Sleek Dashboard',
    subtitle: 'Web App',
    text: 'High-performance analytics',
    position: { top: '10%', left: '1820px', width: '380px', height: '260px', rotation: -2 }
  },
  {
    image: '/images/drewverse/design_11.png',
    title: 'Studio Launch',
    subtitle: 'Milestone',
    text: 'LogicStac v2.0 Release',
    position: { top: '50%', left: '2080px', width: '420px', height: '280px', rotation: 3 }
  },
  {
    image: '/images/drewverse/design_6.png',
    title: 'Product Release',
    subtitle: 'Case Study',
    text: 'Redefining digital excellence',
    position: { top: '12%', left: '2380px', width: '400px', height: '270px', rotation: -1 }
  },
  {
    image: '/images/drewverse/design_7.png',
    title: 'Creative Strategy',
    subtitle: 'Workshop',
    text: 'Ideating the next frontier',
    position: { top: '54%', left: '2660px', width: '360px', height: '250px', rotation: 2 }
  },
  {
    image: '/images/drewverse/design_8.png',
    title: 'Client Showcase',
    subtitle: 'UI/UX Concept',
    text: 'High-fidelity prototypes',
    position: { top: '14%', left: '2920px', width: '380px', height: '260px', rotation: -3 }
  },
  {
    image: '/images/drewverse/design_10.png',
    title: 'Continuous Scale',
    subtitle: 'Engineering',
    text: 'Blazing fast cloud infrastructure',
    position: { top: '52%', left: '3180px', width: '420px', height: '280px', rotation: 1 }
  },
];

export const quoteItem = {
  text: "It doesn't matter where you start, it's how you progress from there.",
  position: { top: '50%', left: '60px', transform: 'translateY(-50%)', width: '580px' }
};

