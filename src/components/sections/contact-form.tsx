import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SimpleIcon } from '../ui/simple-icon';
import { siFigma, siReact, siThreedotjs, siBlender, siFlutter, siGoogle, siRocket } from 'simple-icons';

interface ServiceItem {
  name: string;
  icon: typeof siFigma;
}

const servicesList: ServiceItem[] = [
  { name: 'Web Design', icon: siFigma },
  { name: 'Full Stack Development', icon: siReact },
  { name: 'Immersive 3D / WebGL', icon: siThreedotjs },
  { name: 'Branding & Design System', icon: siBlender },
  { name: 'Mobile Application', icon: siFlutter },
  { name: 'Growth Marketing', icon: siGoogle },
];

const budgetRanges = [
  '< $5,000',
  '$5,000 - $15,000',
  '$15,000 - $35,000',
  '$35,000+',
];

const ContactForm: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-form-item', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP reveal effect for form submission status
  useEffect(() => {
    if (isSubmitted && statusRef.current) {
      gsap.fromTo(
        statusRef.current,
        { opacity: 0, y: 25, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.6)' }
      );
    }
  }, [isSubmitted]);

  const handleServiceToggle = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((s) => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmittedName(name);
    setIsSubmitted(true);
    setTimeout(() => {
      // Clear fields after display period
      setName('');
      setEmail('');
      setMessage('');
      setSelectedServices([]);
      setSelectedBudget('');
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section id="contact-form" ref={sectionRef} className="w-full bg-ln-cream text-ln-dark py-16 md:py-32 px-4 md:px-6 relative z-30 overflow-hidden border-t border-gray-200">
      <div className="absolute inset-0 bg-image-noise opacity-5 pointer-events-none" />

      {/* Background Graphic Curves */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 1440 800" fill="none" stroke="currentColor" strokeWidth="0.7" className="text-ln-yellow">
          <path d="M-100 400 Q 720 150 1540 400" />
          <path d="M-100 500 Q 720 250 1540 500" />
        </svg>
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">

        {/* Header Block */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16 reveal-form-item">
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-full mb-6 border border-ln-yellow/40 shadow-sm">
            <SimpleIcon icon={siRocket} size={14} className="text-ln-yellow" />
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-ln-yellow">Initiate Scope</span>
          </div>

          <h2 className="font-display font-bold text-3xl sm:text-5xl md:text-7xl tracking-tighter uppercase leading-none mb-6">
            Start A <span className="text-ln-yellow font-serif font-normal italic lowercase">Project</span>
          </h2>

          <p className="max-w-xl text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
            Fill out the scope details below to kick off your project with our engineering and design leads. We reply within 24 hours.
          </p>
        </div>

        {/* Interactive Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-8 md:space-y-12">

          {/* Services Selector */}
          <div className="space-y-4 reveal-form-item">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
              I'm interested in... (Select any)
            </label>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {servicesList.map((service, idx) => {
                const isSelected = selectedServices.includes(service.name);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleServiceToggle(service.name)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2.5 md:px-5 md:py-3 rounded-full text-[11px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                      isSelected
                        ? 'bg-ln-yellow text-black border-ln-yellow shadow-lg scale-105'
                        : 'bg-white text-ln-dark border-gray-200 hover:border-ln-yellow/50'
                    }`}
                  >
                    <SimpleIcon
                      icon={service.icon}
                      size={14}
                      className={isSelected ? 'text-black' : 'text-gray-500'}
                    />
                    <span>{service.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Selector */}
          <div className="space-y-4 reveal-form-item">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
              Project Budget
            </label>
            <div className="flex flex-wrap gap-3">
              {budgetRanges.map((range, idx) => {
                const isSelected = selectedBudget === range;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedBudget(range)}
                    className={`px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border cursor-pointer ${
                      isSelected
                        ? 'bg-ln-yellow text-black border-ln-yellow shadow-lg scale-105'
                        : 'bg-white text-ln-dark border-gray-200 hover:border-ln-yellow/50'
                    }`}
                  >
                    {range}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Input Fields Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 reveal-form-item">
            {/* Name */}
            <div className="space-y-2 relative">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Your Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Drew Stark"
                  className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-sm font-sans focus:outline-none focus:border-ln-yellow focus:ring-1 focus:ring-ln-yellow transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2 relative">
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@logicstac.agency"
                  className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-sm font-sans focus:outline-none focus:border-ln-yellow focus:ring-1 focus:ring-ln-yellow transition-all"
                />
              </div>
            </div>
          </div>

          {/* Message Area */}
          <div className="space-y-2 reveal-form-item">
            <label className="block text-xs font-mono font-bold uppercase tracking-wider text-gray-500">
              Project Description
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-5 w-4 h-4 text-gray-400" />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us about your brand, goals, and any specific timelines..."
                rows={5}
                className="w-full bg-white border border-gray-200 rounded-xl py-4 pl-12 pr-4 text-sm font-sans focus:outline-none focus:border-ln-yellow focus:ring-1 focus:ring-ln-yellow transition-all resize-none"
              />
            </div>
          </div>

          {/* Submission Status Reveal Banner */}
          {isSubmitted && (
            <div
              ref={statusRef}
              className="bg-black text-white border border-ln-yellow/40 rounded-2xl p-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-ln-yellow/20 text-ln-yellow border border-ln-yellow/40 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-bold uppercase tracking-wide text-lg text-ln-yellow">
                    Inquiry Transmitted Successfully
                  </h4>
                  <p className="text-xs font-sans text-gray-300">
                    Thank you, <span className="text-white font-semibold">{submittedName || 'Client'}</span>! Our engineering team will review your scope and respond within 24 hours.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-ln-yellow bg-ln-yellow/10 px-3.5 py-1.5 rounded-full border border-ln-yellow/30">
                <span className="w-2 h-2 rounded-full bg-ln-yellow animate-ping" />
                Status: Logged
              </div>
            </div>
          )}

          {/* Submit Action */}
          <div className="pt-4 reveal-form-item flex justify-end">
            <button
              type="submit"
              disabled={isSubmitted}
              className={`group px-8 py-4 rounded-xl font-sans font-bold uppercase text-xs tracking-widest transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                isSubmitted
                  ? 'bg-emerald-600 text-white cursor-default shadow-md'
                  : 'bg-ln-yellow text-black hover:bg-black hover:text-ln-yellow hover:scale-[1.03] shadow-lg'
              }`}
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 size={16} /> Scope Submitted!
                </>
              ) : (
                <>
                  Submit Inquiry <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </section>
  );
};

export default ContactForm;
