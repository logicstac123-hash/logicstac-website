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
    position: { top: '10%', left: '5%', width: '348px', height: '250px', rotation: -3 }
  },
  {
    image: '/images/drewverse/design_7.png',
    title: 'Design System',
    subtitle: 'Branding',
    text: 'Unified brand language',
    position: { top: '45%', left: '8%', width: '335px', height: '250px', rotation: 2 }
  },
  {
    image: '/images/drewverse/design_8.png',
    title: 'E-Commerce App',
    subtitle: 'Mobile UX',
    text: 'Immersive shopping experience',
    position: { top: '20%', left: '50%', width: '468px', height: '300px', rotation: -2 }
  },
  {
    image: '/images/drewverse/design_9.png',
    title: 'Interactive Portal',
    subtitle: '3D WebGL',
    text: 'WebGL portfolio showroom',
    position: { bottom: '10%', left: '0%', width: '459px', height: '300px', rotation: 2 }
  },
  {
    image: '/images/drewverse/design_10.png',
    title: 'Sleek Dashboard',
    subtitle: 'Web App',
    text: 'High-performance analytics',
    position: { top: '15%', right: '10%', width: '350px', height: '248px', rotation: 3 }
  },
  {
    image: '/images/drewverse/design_11.png',
    title: 'Studio Launch',
    subtitle: 'Milestone',
    text: 'LogicStac v2.0 Release',
    position: { top: '50%', right: '15%', width: '437px', height: '250px', rotation: -4 }
  },
  {
    image: '/images/drewverse/design_6.png',
    title: 'Product Release',
    subtitle: 'Case Study',
    text: 'Redefining digital excellence',
    position: { bottom: '15%', right: '8%', width: '417px', height: '300px', rotation: 1 }
  },
  {
    image: '/images/drewverse/design_7.png',
    title: 'Creative Strategy',
    subtitle: 'Workshop',
    text: 'Ideating the next frontier',
    position: { top: '60%', left: '35%', width: '335px', height: '250px', rotation: -2 }
  },
  {
    image: '/images/drewverse/design_8.png',
    title: 'Client Showcase',
    subtitle: 'UI/UX Concept',
    text: 'High-fidelity prototypes',
    position: { top: '5%', left: '30%', width: '312px', height: '200px', rotation: 4 }
  },
  {
    image: '/images/drewverse/design_9.png',
    title: 'Marketing Hub',
    subtitle: 'Growth Campaign',
    text: 'Amplifying digital footprint',
    position: { bottom: '5%', right: '25%', width: '382px', height: '250px', rotation: -3 }
  },
  {
    image: '/images/drewverse/design_10.png',
    title: 'Continuous Scale',
    subtitle: 'Engineering',
    text: 'Blazing fast cloud infrastructure',
    position: { top: '35%', left: '25%', width: '423px', height: '300px', rotation: 1 }
  },
];

export const quoteItem = {
  text: "It doesn't matter where you start, it's how you progress from there.",
  position: { top: '8%', left: '50%', transform: 'translateX(-50%)', width: '600px' }
};
