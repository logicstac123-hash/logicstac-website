import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, X, Sparkles, Code, Layout, Layers } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '../../utils/scroll';
import { SimpleIcon, getTechIcon } from '../ui/simple-icon';

interface Project {
  id: number;
  name: string;
  year: string;
  category: string;
  img: string;
  tech: string[];
  description: string;
  client: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Spatial UI Workspace',
    year: '2025',
    category: 'UI/UX Design',
    img: '/images/drewverse/design_6_nobg.png',
    tech: ['React Three Fiber', 'GSAP', 'Framer Motion'],
    description: 'A futuristic spatial user interface designed for luxury smart-home controllers. Built using custom physics engines and 3D web rendering to deliver a fluid, reactive environment that makes device control feel organic.',
    client: 'Lumina Home Systems'
  },
  {
    id: 2,
    name: 'Vibrant Token Design',
    year: '2025',
    category: 'Branding',
    img: '/images/drewverse/design_7.png',
    tech: ['Figma', 'Style Dictionary', 'Tailwind CSS'],
    description: 'An enterprise-grade design token system and component library compiled for a leading global fintech. Ensures design consistency across mobile, web, and desktop channels while accelerating development velocity by 300%.',
    client: 'Apex Capital'
  },
  {
    id: 3,
    name: 'Dark Glassmorphic UI',
    year: '2025',
    category: 'UI/UX Design',
    img: '/images/drewverse/design_8.png',
    tech: ['Next.js', 'GraphQL', 'Tailwind v4'],
    description: 'A comprehensive monitoring console designed to track microservice health and telemetry in real-time. Features gorgeous glassmorphism, responsive canvas charts, and extremely clean dark aesthetic patterns.',
    client: 'Chronos DevSecOps'
  },
  {
    id: 4,
    name: 'Interactive 3D Showroom',
    year: '2024',
    category: 'Immersive 3D',
    img: '/images/drewverse/design_9.png',
    tech: ['Three.js', 'Vite', 'GLSL Shaders'],
    description: 'A highly immersive 3D digital showroom for presenting luxury consumer goods online. Implements custom fragment shaders to replicate physical material properties and lighting under real-time controls.',
    client: 'Aether Automotive'
  },
  {
    id: 5,
    name: 'AI Vector Art Generator',
    year: '2024',
    category: 'Creative Tech',
    img: '/images/drewverse/design_10.png',
    tech: ['Python', 'PyTorch', 'React.js'],
    description: 'A breakthrough generative design tool that translates natural language prompts into clean, scalable SVG vector art assets. Built with specialized post-processing nodes to eliminate intersecting path anomalies.',
    client: 'StickerMinds AI'
  },
  {
    id: 6,
    name: 'Headless E-Commerce Core',
    year: '2024',
    category: 'Web Engineering',
    img: '/images/drewverse/design_11.png',
    tech: ['Remix', 'Shopify Headless', 'Vercel'],
    description: 'A high-performance storefront engine configured for an international luxury streetwear line. Deployed to the edge to guarantee sub-100ms initial load times and instantaneous page transitions.',
    client: 'Vanguard Streetwear'
  },
  {
    id: 7,
    name: 'Fluid Motion Design Hub',
    year: '2023',
    category: 'Creative Tech',
    img: '/images/drewverse/photo_1.jpg',
    tech: ['Lottie', 'After Effects', 'Webflow'],
    description: 'An awards-nominated interactive web experience highlighting cutting-edge portfolio items. Blends parallax scrolling, smooth lottie integrations, and bespoke micro-interactions to maximize user session depth.',
    client: 'Vortex Venture Group'
  },
  {
    id: 8,
    name: 'Chrome Accessibility Auditor',
    year: '2023',
    category: 'Web Engineering',
    img: '/images/drewverse/photo_2.jpg',
    tech: ['TypeScript', 'Chrome Extension API', 'CSS Grid'],
    description: 'A developer browser extension that crawls active layouts and dynamically audits them for color contrast, screen-reader readiness, and layout responsiveness against strict WCAG AAA guidelines.',
    client: 'AccessibleWeb Initiative'
  },
  {
    id: 9,
    name: 'Liquid Interactive Canvas',
    year: '2023',
    category: 'Immersive 3D',
    img: '/images/drewverse/design_6.png',
    tech: ['PixiJS', 'GSAP Physics', 'Vite'],
    description: 'An experimental micro-site highlighting interactive liquid fluid simulation. Built to test displacement filtering in heavily loaded render pipes, achieving butter-smooth performance across mobile platforms.',
    client: 'Sonder Digital Labs'
  },
];

const categories = ['All', 'UI/UX Design', 'Branding', 'Immersive 3D', 'Web Engineering', 'Creative Tech'];

const Helmets: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<(HTMLDivElement | null)[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const modalBgRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(gridRef.current, {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth Category Filter Animation with GSAP
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);

    // Animate out existing grid items
    const visibleCards = gridRef.current.filter(el => el !== null);
    gsap.to(visibleCards, {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in',
      onComplete: () => {
        // Filter elements
        if (category === 'All') {
          setFilteredProjects(projects);
        } else {
          setFilteredProjects(projects.filter(p => p.category === category));
        }
      }
    });
  };

  // Animate grid items in when filtered list updates
  useEffect(() => {
    const timer = setTimeout(() => {
      const visibleCards = gridRef.current.filter(el => el !== null);
      if (visibleCards.length > 0) {
        gsap.fromTo(visibleCards,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'back.out(1.2)',
          }
        );
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [filteredProjects]);

  // Modal animations with GSAP
  useEffect(() => {
    if (selectedProject) {
      // Disable body scroll when modal is open
      document.body.style.overflow = 'hidden';

      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(modalBgRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 0.4, ease: 'power2.out' }
      );
      gsap.fromTo(modalContentRef.current,
        { y: 100, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, delay: 0.1, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  const closeModal = () => {
    gsap.to(modalContentRef.current, {
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.35,
      ease: 'power3.in',
      onComplete: () => {
        gsap.to(modalBgRef.current, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            gsap.set(modalRef.current, { display: 'none' });
            setSelectedProject(null);
          }
        });
      }
    });
  };

  return (
    <section id="showcase" ref={sectionRef} className="w-full bg-[#111] text-white py-16 md:py-32 px-4 md:px-6 relative z-30">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20">
          <div className="relative">
            <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl tracking-tighter uppercase leading-none">
              Project<br />
              <span className="text-ln-yellow font-serif font-normal italic lowercase">Showcase</span>
            </h2>
          </div>
          <div className="max-w-md mt-6 md:mt-0 text-gray-400 text-xs sm:text-sm font-sans border-l border-gray-700 pl-4 md:pl-6">
            <p>Explore a collection of our finest work, spanning bespoke web applications, enterprise design systems, immersive 3D portals, and next-generation product design.</p>
          </div>
        </div>

        {/* Animated Filter Bar */}
        <div className="flex flex-wrap gap-2 md:gap-2.5 mb-12 md:mb-16 border-b border-gray-800 pb-6 md:pb-8">
          {categories.map((cat, i) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={i}
                onClick={() => handleCategorySelect(cat)}
                className={`px-3.5 py-2 md:px-5 md:py-2.5 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                  isSelected
                    ? 'bg-ln-yellow text-black border-ln-yellow font-black shadow-lg hover:scale-105'
                    : 'bg-transparent border-gray-800 text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-800">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              ref={el => { gridRef.current[idx] = el }}
              onClick={() => setSelectedProject(project)}
              className="relative aspect-square border-r border-b border-gray-800 group overflow-hidden cursor-pointer bg-ln-dark hover:bg-gradient-to-br hover:from-ln-dark hover:to-gray-900 transition-all duration-500">

              {/* Image */}
              <div className="w-full h-full p-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <img
                  src={project.img}
                  alt={project.name}
                  loading="lazy"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />
              </div>

              {/* Hover Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8" />

              {/* Grid Text Content - Always Visible/Reveals More */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 mb-1">
                  <span className="text-[10px] font-mono tracking-widest text-ln-yellow uppercase">
                    {project.category}
                  </span>
                  {/* Technology icons pill list */}
                  <div className="flex items-center gap-1.5">
                    {project.tech.slice(0, 3).map((t, i) => {
                      const icon = getTechIcon(t);
                      return icon ? (
                        <span key={i} title={t} className="p-1 rounded bg-black/60 border border-white/10 text-gray-300 hover:text-ln-yellow transition-colors">
                          <SimpleIcon icon={icon} size={11} />
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-tight line-clamp-1 mt-1 group-hover:text-ln-yellow transition-colors">
                  {project.name}
                </h4>
                <div className="flex items-baseline justify-between mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <span className="text-xs text-gray-400 font-sans">View Details</span>
                  <span className="text-xs font-bold text-ln-yellow">{project.year}</span>
                </div>
              </div>

              {/* Subtle top-right arrow badge */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-ln-yellow hover:text-black transition-all duration-300">
                <ArrowUpRight size={14} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-32 flex flex-col items-center justify-center text-center">
          {/* Laurel Icon */}
          <div className="mb-6 text-ln-yellow opacity-80">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 17a5 5 0 0 0-5-5M12 17a5 5 0 0 1 5-5M5 12h.01M19 12h.01" />
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
            </svg>
          </div>

          <h3 className="font-serif text-3xl md:text-4xl text-white mb-8">
            Ready to build something<br />extraordinary together?
          </h3>

          <button
            onClick={() => {
              scrollToSection('#contact-form');
            }}
            className="group bg-ln-yellow text-black px-8 py-3 rounded-sm font-bold uppercase text-xs tracking-widest hover:bg-white transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            Start a Project <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* MODAL OVERLAY PORTAL - Full screen details drawer */}
      <div
        ref={modalRef}
        className="fixed inset-0 z-[100] hidden items-center justify-center p-4 md:p-8 select-none"
      >
        {/* Backdrop overlay */}
        <div
          ref={modalBgRef}
          onClick={closeModal}
          className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
        />

        {/* Modal content container */}
        <div
          ref={modalContentRef}
          className="relative w-full max-w-4xl bg-[#151713] border border-gray-800 rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh] md:h-[550px] pointer-events-auto select-text text-white overflow-y-auto"
        >
          {/* Image Pane */}
          <div className="w-full md:w-1/2 bg-ln-dark/80 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-800 relative group">
            <div className="absolute inset-0 bg-image-noise opacity-10 pointer-events-none" />
            <img
              src={selectedProject?.img}
              alt={selectedProject?.name}
              className="max-h-[250px] md:max-h-[380px] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 text-[10px] font-mono uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-gray-400">
              {selectedProject?.category}
            </span>
          </div>

          {/* Details Pane */}
          <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[450px] md:max-h-full">
            {/* Upper half details */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-ln-yellow uppercase tracking-widest">{selectedProject?.client}</span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 bg-white/5 border border-white/10 rounded text-gray-300">{selectedProject?.year}</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-display font-bold uppercase tracking-tight text-white mb-4">
                {selectedProject?.name}
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed font-sans mb-6">
                {selectedProject?.description}
              </p>
            </div>

            {/* Tech Tags and Close */}
            <div>
              <h5 className="text-[10px] uppercase font-bold tracking-widest text-gray-500 mb-2.5 flex items-center gap-1.5">
                <Code size={12} className="text-ln-yellow" /> TECHNOLOGIES USED
              </h5>
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedProject?.tech.map((t, i) => {
                  const icon = getTechIcon(t);
                  return (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 bg-white/5 border border-white/10 rounded-md font-mono text-gray-300 hover:border-ln-yellow hover:text-white transition-colors cursor-default inline-flex items-center gap-2"
                    >
                      {icon && <SimpleIcon icon={icon} size={13} className="text-ln-yellow" />}
                      <span>{t}</span>
                    </span>
                  );
                })}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white text-white hover:text-black px-5 py-2.5 rounded-lg font-sans font-black text-xs tracking-wider transition-all duration-300 cursor-pointer"
                >
                  CLOSE DETAILS
                </button>
              </div>
            </div>
          </div>

          {/* Floating close icon */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-ln-yellow text-white hover:text-black border border-white/10 rounded-full transition-all duration-300 cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Helmets;
