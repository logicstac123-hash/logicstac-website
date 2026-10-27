import React, { useState, useRef, useEffect } from 'react';
import { Star, Quote, Sparkles, Building2, CheckCircle2, ArrowRight, MessageSquareQuote, ChevronLeft, ChevronRight, ThumbsUp } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '../../utils/scroll';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  category: 'Web & 3D' | 'Mobile Apps' | 'Scale Retainer' | 'Brand & UI/UX';
  impactTag: string;
  quote: string;
  verified: boolean;
  year: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Marcus Vance',
    role: 'CEO & Founder',
    company: 'CyFocus Security',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    category: 'Web & 3D',
    impactTag: '+210% Conversion Lift',
    quote: 'LogicStac completely transformed our enterprise platform. They delivered a hyper-responsive WebGL dashboard with custom GSAP interactions in just 3 weeks. Conversion rose by 210% in the first month.',
    verified: true,
    year: '2026',
  },
  {
    id: '2',
    name: 'Elena Rostova',
    role: 'VP of Product',
    company: 'Aether Tech',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    category: 'Mobile Apps',
    impactTag: '4.9★ App Store Rating',
    quote: 'The speed of execution with their Scale Retainer is unlike anything we’ve seen in London or SF. Their engineers built our cross-platform mobile application with flawless fluid animations and rock-solid architecture.',
    verified: true,
    year: '2026',
  },
  {
    id: '3',
    name: 'David Chen',
    role: 'Co-Founder & CTO',
    company: 'Nexus Fintech',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    category: 'Scale Retainer',
    impactTag: '$14M Series A Raised',
    quote: 'Working with LogicStac was the highest ROI decision we made this year. They took our complex financial dashboard and made it intuitive, fast, and visually breathtaking. Our investors were blown away.',
    verified: true,
    year: '2025',
  },
  {
    id: '4',
    name: 'Sophia Thorne',
    role: 'Head of Design',
    company: 'Veloce Automotive',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    category: 'Web & 3D',
    impactTag: '60FPS WebGL Performance',
    quote: 'The 3D interactive car configurator LogicStac developed surpassed all our expectations. Frame rates on mobile devices stayed smooth at 60fps, and organic engagement skyrocketed by 4x.',
    verified: true,
    year: '2025',
  },
  {
    id: '5',
    name: 'Liam O’Connor',
    role: 'Founder & CEO',
    company: 'HyperDrive AI',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    category: 'Brand & UI/UX',
    impactTag: '5x User Engagement',
    quote: 'From brand identity to full-stack implementation, LogicStac operates like an elite team of senior engineers and designers wrapped into one. They own outcomes, not just task tickets.',
    verified: true,
    year: '2026',
  },
  {
    id: '6',
    name: 'Amara Williams',
    role: 'Chief Marketing Officer',
    company: 'Lumina Health',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    category: 'Brand & UI/UX',
    impactTag: '-45% Bounce Rate',
    quote: 'Their attention to typography, micro-interactions, and responsive layout performance is world-class. Our bounce rate dropped by 45% immediately after the redesign launch.',
    verified: true,
    year: '2025',
  },
];

const categories = ['All', 'Web & 3D', 'Mobile Apps', 'Scale Retainer', 'Brand & UI/UX'] as const;

export default function Testimonials() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSpotlight, setActiveSpotlight] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredTestimonials = selectedCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === selectedCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current.querySelectorAll('.animate-testimonial-header'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { opacity: 0, y: 20, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
        }
      );
    }
  }, [selectedCategory]);

  const handleNextSpotlight = () => {
    setActiveSpotlight((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevSpotlight = () => {
    setActiveSpotlight((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const spotlight = testimonials[activeSpotlight];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative w-full py-20 sm:py-28 md:py-36 bg-[#131515] text-white overflow-hidden border-t border-b border-white/10"
    >
      {/* Background Accent Lines & Glow */}
      <div className="absolute inset-0 bg-image-noise opacity-10 pointer-events-none mix-blend-overlay" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ln-yellow/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col items-center text-center gap-4 mb-12 sm:mb-16">
          <div className="animate-testimonial-header inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 text-ln-yellow text-xs sm:text-sm font-sans font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-ln-yellow" />
            <span>CLIENT SUCCESS STORIES</span>
            <span className="w-1 h-1 rounded-full bg-ln-yellow mx-1" />
            <div className="flex items-center text-ln-yellow gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-ln-yellow text-ln-yellow" />
              ))}
              <span className="ml-1 text-white text-xs font-semibold">5.0 Rating</span>
            </div>
          </div>

          <h2 className="animate-testimonial-header font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tight text-white leading-[0.95] max-w-4xl">
            WHAT OUR <span className="font-serif italic font-normal text-ln-yellow text-lowercase">Partners</span> SAY.
          </h2>

          <p className="animate-testimonial-header font-sans text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
            Real feedback from high-growth founders, product leads, and global engineering teams who built and scaled with LogicStac.
          </p>
        </div>

        {/* Impact Stat Bar */}
        <div className="animate-testimonial-header grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-16 sm:mb-20">
          {[
            { metric: '98%', label: 'Client Retention', desc: 'Long-term agency partnerships' },
            { metric: '4.95/5', label: 'Satisfaction Score', desc: 'Across 50+ shipped projects' },
            { metric: '3.2x', label: 'Avg. Conversion Lift', desc: 'Post-launch performance boost' },
            { metric: '100%', label: 'On-Time Delivery', desc: 'Guaranteed milestone pacing' },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col justify-between hover:border-ln-yellow/40 transition-colors duration-300 group"
            >
              <div className="text-2xl sm:text-4xl font-display font-bold text-ln-yellow group-hover:scale-105 transition-transform duration-300 origin-left">
                {stat.metric}
              </div>
              <div className="mt-2">
                <div className="text-xs sm:text-sm font-sans font-bold text-white uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-gray-400 font-sans mt-0.5">
                  {stat.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spotlight Testimonial Feature Card */}
        <div className="animate-testimonial-header mb-16 relative bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/15 rounded-3xl p-6 sm:p-10 md:p-12 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none select-none">
            <Quote size={180} />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start md:items-center justify-between">
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-ln-yellow/10 border border-ln-yellow/30 text-ln-yellow text-xs font-sans font-bold tracking-wider uppercase">
                  Featured Partner
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs font-sans font-medium">
                  {spotlight.impactTag}
                </span>
              </div>

              <div className="flex items-center text-ln-yellow gap-1">
                {[...Array(spotlight.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-ln-yellow text-ln-yellow" />
                ))}
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl font-sans font-medium text-white leading-snug tracking-tight">
                “{spotlight.quote}”
              </blockquote>

              <div className="flex items-center gap-4 pt-2">
                <img
                  src={spotlight.avatar}
                  alt={spotlight.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-ln-yellow/50 shadow-lg"
                  loading="lazy"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-sans font-bold text-lg text-white">
                      {spotlight.name}
                    </h4>
                    {spotlight.verified && (
                      <CheckCircle2 className="w-4 h-4 text-ln-yellow" title="Verified Client" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 font-sans">
                    {spotlight.role} • <span className="text-white font-medium">{spotlight.company}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="flex md:flex-col items-center gap-3 self-end md:self-center">
              <button
                onClick={handlePrevSpotlight}
                className="p-3 rounded-full bg-white/10 hover:bg-ln-yellow hover:text-black text-white transition-all duration-300 border border-white/10 active:scale-95 cursor-pointer"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-xs font-mono text-gray-400 px-2">
                0{activeSpotlight + 1} / 0{testimonials.length}
              </div>
              <button
                onClick={handleNextSpotlight}
                className="p-3 rounded-full bg-white/10 hover:bg-ln-yellow hover:text-black text-white transition-all duration-300 border border-white/10 active:scale-95 cursor-pointer"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-sans font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-ln-yellow text-ln-deep-forest border-ln-yellow shadow-md scale-105'
                  : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between hover:border-ln-yellow/50 hover:bg-white/[0.06] transition-all duration-300 shadow-lg"
            >
              {/* Top Row: Stars & Impact Tag */}
              <div>
                <div className="flex items-center justify-between mb-4 gap-2">
                  <div className="flex items-center text-ln-yellow gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-ln-yellow text-ln-yellow" />
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-ln-yellow/10 text-ln-yellow border border-ln-yellow/20">
                    {item.impactTag}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base font-sans text-gray-200 leading-relaxed mb-6 italic">
                  “{item.quote}”
                </p>
              </div>

              {/* Bottom Row: Author details */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                    loading="lazy"
                  />
                  <div>
                    <h5 className="font-sans font-bold text-sm text-white flex items-center gap-1.5">
                      {item.name}
                      {item.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-ln-yellow" title="Verified Client" />
                      )}
                    </h5>
                    <p className="text-xs text-gray-400 font-sans">
                      {item.role}, <span className="text-gray-300">{item.company}</span>
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-gray-500">
                  {item.year}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-16 sm:mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-ln-yellow via-amber-400 to-orange-500 text-ln-deep-forest flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-display font-bold text-2xl sm:text-4xl uppercase tracking-tight leading-none text-ln-deep-forest">
              READY TO BE OUR NEXT SUCCESS STORY?
            </h3>
            <p className="font-sans text-sm sm:text-base text-ln-deep-forest/80 font-semibold max-w-xl">
              Partner with LogicStac to craft bespoke WebGL experiences, mobile products, and scalable digital solutions.
            </p>
          </div>
          <a
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact-form');
            }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-ln-deep-forest text-white hover:bg-black font-sans font-bold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg whitespace-nowrap cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4 text-ln-yellow" />
          </a>
        </div>

      </div>
    </section>
  );
}
