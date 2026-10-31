import React, { useState, useRef, useEffect } from 'react';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from '../../utils/scroll';
import { SimpleIcon } from '../ui/simple-icon';
import { siTarget, siZap, siRocket, siThreedotjs } from 'simple-icons';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  tagline: string;
  priceMonthly: string;
  priceAnnually: string;
  billingPeriod: string;
  badge?: string;
  icon: React.ReactNode;
  features: PricingFeature[];
  cta: string;
  popular: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Growth Pack',
    tagline: 'Perfect for startups and brands launching new digital products.',
    priceMonthly: '$4,900',
    priceAnnually: '$3,900',
    billingPeriod: 'per month',
    badge: 'Launch Fast',
    icon: <SimpleIcon icon={siZap} size={22} className="text-ln-yellow" />,
    features: [
      { text: 'One request at a time', included: true },
      { text: 'Custom Web & Mobile Design', included: true },
      { text: 'Bespoke Frontend Development', included: true },
      { text: 'Average 3-5 days delivery', included: true },
      { text: 'Unlimited revisions', included: true },
      { text: 'GSAP scroll animations included', included: true },
      { text: 'Advanced 3D/WebGL experiences', included: false },
      { text: '24/7 priority support', included: false },
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Scale Retainer',
    tagline: 'Ideal for fast-growing brands requiring high-velocity design and engineering.',
    priceMonthly: '$8,500',
    priceAnnually: '$6,800',
    billingPeriod: 'per month',
    badge: 'Best Value',
    icon: <SimpleIcon icon={siRocket} size={22} className="text-ln-yellow" />,
    features: [
      { text: 'Two requests at a time (Double output)', included: true },
      { text: 'Dedicated Product Manager', included: true },
      { text: 'Elite Full Stack Engineering', included: true },
      { text: 'Interactive WebGL / Three.js', included: true },
      { text: 'Average 2-4 days delivery', included: true },
      { text: 'Unlimited revisions', included: true },
      { text: 'Priority Slack & Zoom syncs', included: true },
      { text: 'Dedicated server & devops setup', included: true },
    ],
    cta: 'Secure Spot',
    popular: true,
  },
  {
    name: 'Immersive Custom',
    tagline: 'Tailored for enterprise-grade immersive campaigns and custom interactive systems.',
    priceMonthly: 'Custom',
    priceAnnually: 'Custom',
    billingPeriod: 'project-based',
    badge: 'Bespoke Elite',
    icon: <SimpleIcon icon={siThreedotjs} size={22} className="text-ln-yellow" />,
    features: [
      { text: 'Dedicated agency strike team', included: true },
      { text: 'Next-Gen 3D, Rive & WebGL engines', included: true },
      { text: 'Complete custom UI/UX design systems', included: true },
      { text: 'Enterprise performance auditing', included: true },
      { text: 'Full intellectual property transfer', included: true },
      { text: 'In-person strategy workshops', included: true },
      { text: 'Bespoke SLA and custom hosting', included: true },
      { text: '24/7 dedicated engineering support', included: true },
    ],
    cta: 'Book Consultation',
    popular: false,
  },
];

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="w-full bg-[#111112] text-white py-16 md:py-32 px-4 md:px-6 relative z-30 overflow-hidden border-t border-gray-900">
      <div className="absolute inset-0 bg-image-noise opacity-15 pointer-events-none" />

      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-ln-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto relative z-10">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
            <SimpleIcon icon={siTarget} size={13} className="text-ln-yellow" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-gray-300 font-bold">Transparent Partnership</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-none mb-6">
            Pricing <span className="text-ln-yellow font-serif font-normal italic lowercase">Models</span>
          </h2>

          <p className="max-w-2xl text-gray-400 font-sans text-sm md:text-base leading-relaxed mb-10">
            One flat monthly rate, zero hidden fees, and absolute creative excellence. Pause or cancel your subscription anytime.
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center gap-4 bg-white/5 p-1.5 rounded-full border border-white/10">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                !isAnnual ? 'bg-ln-yellow text-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 rounded-full font-sans text-xs font-bold uppercase tracking-wider transition-all cursor-pointer relative ${
                isAnnual ? 'bg-ln-yellow text-black shadow-lg' : 'text-gray-400 hover:text-white'
              }`}
            >
              Annually
              <span className="absolute -top-3 -right-6 bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-tight">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className={`relative flex flex-col justify-between rounded-2xl p-8 transition-all duration-500 border ${
                tier.popular
                  ? 'bg-gradient-to-b from-[#1c1e1a] to-[#121411] border-ln-yellow/40 shadow-[0_15px_40px_rgba(255,107,0,0.1)] lg:scale-105 z-20'
                  : 'bg-[#151713] border-gray-800 hover:border-gray-700 hover:scale-[1.02]'
              }`}
            >
              {/* Badge/Tag */}
              {tier.badge && (
                <span className={`absolute top-4 right-4 text-[10px] font-mono uppercase px-3 py-1 rounded-full border ${
                  tier.popular
                    ? 'bg-ln-yellow text-black border-ln-yellow'
                    : 'bg-white/5 border-white/10 text-gray-300'
                }`}>
                  {tier.badge}
                </span>
              )}

              {/* Main Info */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    {tier.icon}
                  </div>
                </div>

                <h3 className="font-display font-bold text-2xl md:text-3xl uppercase tracking-tight text-white mb-2">
                  {tier.name}
                </h3>

                <p className="text-sm text-gray-400 font-sans leading-relaxed mb-6 min-h-[3rem]">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-8 flex items-baseline gap-2 border-b border-gray-800 pb-8">
                  <span className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white">
                    {isAnnual ? tier.priceAnnually : tier.priceMonthly}
                  </span>
                  <span className="text-xs font-sans text-gray-500 uppercase tracking-widest">
                    {tier.billingPeriod}
                  </span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-4 mb-10">
                  {tier.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className={`flex items-start gap-3 text-xs md:text-sm font-sans ${
                        feature.included ? 'text-gray-200' : 'text-gray-500 line-through'
                      }`}
                    >
                      <Check
                        size={16}
                        className={`mt-0.5 flex-shrink-0 ${
                          feature.included ? 'text-ln-yellow' : 'text-gray-600'
                        }`}
                      />
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  scrollToSection('#contact-form');
                }}
                className={`w-full py-4 rounded-xl font-sans font-bold uppercase text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  tier.popular
                    ? 'bg-ln-yellow text-black hover:bg-white hover:scale-[1.03] shadow-lg'
                    : 'bg-white/5 text-white border border-white/10 hover:bg-white hover:text-black hover:scale-[1.03]'
                }`}
              >
                {tier.cta} <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* FAQs and Callouts */}
        <div className="mt-24 border-t border-gray-800 pt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="p-3 bg-white/5 rounded-xl h-fit border border-white/10">
              <HelpCircle className="w-5 h-5 text-ln-yellow" />
            </div>
            <div>
              <h5 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-2">Can I pause my plan?</h5>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">Yes! Billing cycles are based on a 31-day period. If you only have one project active and use it for 10 days, you can pause your subscription and use the remaining 21 days later.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-white/5 rounded-xl h-fit border border-white/10">
              <HelpCircle className="w-5 h-5 text-ln-yellow" />
            </div>
            <div>
              <h5 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-2">What is the turn-around time?</h5>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">Most design requests and frontend screens are completed in 3 days or less. Complex features or fully custom 3D elements might take slightly longer.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="p-3 bg-white/5 rounded-xl h-fit border border-white/10">
              <HelpCircle className="w-5 h-5 text-ln-yellow" />
            </div>
            <div>
              <h5 className="font-display font-bold text-sm uppercase tracking-wider text-white mb-2">Are there any contracts?</h5>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">No contracts or long-term commitments. All subscription plans are month-to-month and can be paused or cancelled at any time through our portal.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
