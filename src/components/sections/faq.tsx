import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { Plus, Minus, HelpCircle, Sparkles, MessageCircle } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Services & Process',
    question: 'What core services does LogicStac specialize in?',
    answer:
      'LogicStac delivers end-to-end digital agency solutions including custom full-stack web applications, bespoke UI/UX design systems, immersive 3D interfaces (Three.js & WebGL), mobile app development, and high-performance brand platforms.'
  },
  {
    id: 'faq-2',
    category: 'Timelines & Delivery',
    question: 'How long does a typical design and development project take?',
    answer:
      'Timeline depends on scope depth. Rapid design sprints take 1–2 weeks, standard custom web applications average 3–6 weeks, while enterprise multi-platform software systems usually span 8–12 weeks from strategy to deployment.'
  },
  {
    id: 'faq-3',
    category: 'Technology Stack',
    question: 'Which frameworks and technologies do you use?',
    answer:
      'We leverage modern industry standards: React 18+, TypeScript, Vite, Tailwind CSS, GSAP, Three.js, Node.js/Express, Cloud SQL, Firebase, and Gemini AI SDKs. Every stack choice is optimized for performance, security, and scalability.'
  },
  {
    id: 'faq-4',
    category: 'Pricing & Retainers',
    question: 'How are project pricing structures configured?',
    answer:
      'We offer transparent fixed-scope milestone billing, agile weekly sprints, and dedicated monthly agency retainers. Each proposal includes clear deliverable milestones and full intellectual property ownership.'
  },
  {
    id: 'faq-5',
    category: 'Post-Launch Support',
    question: 'Do you provide ongoing maintenance and performance optimization?',
    answer:
      'Yes! All projects include a 30-day post-launch warranty and monitoring period. We also offer ongoing maintenance retainers covering security updates, performance tuning, content updates, and feature expansions.'
  },
  {
    id: 'faq-6',
    category: 'Global Engagement',
    question: 'Do you work with international clients outside London?',
    answer:
      'Absolutely. LogicStac is headquartered in London but operates globally. We seamlessly collaborate across North American, European, and Asia-Pacific time zones using structured asynchronous reporting and weekly video syncs.'
  }
];

const FAQAccordionItem: React.FC<{
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}> = ({ item, isOpen, onToggle, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.45,
          ease: 'power3.out'
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power3.inOut'
        });
      }
    }

    if (iconRef.current) {
      gsap.to(iconRef.current, {
        rotate: isOpen ? 180 : 0,
        duration: 0.4,
        ease: 'back.out(1.8)'
      });
    }
  }, [isOpen]);

  return (
    <div
      className={`border rounded-2xl transition-colors duration-300 overflow-hidden ${
        isOpen
          ? 'bg-black text-white border-ln-yellow/40 shadow-xl'
          : 'bg-white text-ln-dark border-gray-200 hover:border-ln-yellow/60 hover:bg-white/90'
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span
            className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
              isOpen
                ? 'bg-ln-yellow/20 text-ln-yellow border border-ln-yellow/30'
                : 'bg-gray-100 text-gray-500 border border-gray-200'
            }`}
          >
            0{index + 1}
          </span>
          <div>
            <span
              className={`text-[10px] font-mono uppercase tracking-widest block mb-0.5 ${
                isOpen ? 'text-ln-yellow' : 'text-gray-400'
              }`}
            >
              {item.category}
            </span>
            <h3 className="font-display font-bold text-base md:text-lg lg:text-xl leading-snug">
              {item.question}
            </h3>
          </div>
        </div>

        <div
          ref={iconRef}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
            isOpen
              ? 'bg-ln-yellow text-black'
              : 'bg-gray-100 text-ln-dark group-hover:bg-ln-yellow/20'
          }`}
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </div>
      </button>

      <div ref={contentRef} className="h-0 opacity-0 overflow-hidden px-6 md:px-8">
        <div className="pb-6 pt-2 border-t border-white/10 md:text-base text-sm text-gray-300 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="w-full bg-ln-cream text-ln-dark py-16 md:py-24 px-4 md:px-6 relative z-30 overflow-hidden border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full mb-4 border border-ln-yellow/30">
            <HelpCircle size={14} className="text-ln-yellow" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold text-ln-yellow">
              Client FAQ
            </span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight text-ln-dark mb-4">
            Frequently Asked <span className="text-ln-yellow italic font-serif lowercase font-normal">Questions</span>
          </h2>
          <p className="max-w-xl text-gray-600 text-sm md:text-base leading-relaxed">
            Everything you need to know about partnering with LogicStac, our execution methodology, and deliverable guarantees.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <FAQAccordionItem
              key={item.id}
              item={item}
              index={index}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </div>

        {/* Footer Prompt */}
        <div className="mt-12 text-center flex flex-col md:flex-row items-center justify-center gap-4 bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Sparkles size={16} className="text-ln-yellow" />
            <span>Have a custom question not listed here?</span>
          </div>
          <a
            href="#contact-form"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#contact-form');
            }}
            className="inline-flex items-center gap-2 bg-black text-white hover:bg-ln-yellow hover:text-black font-mono font-bold uppercase text-xs tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <MessageCircle size={14} />
            Ask Our Engineers
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
