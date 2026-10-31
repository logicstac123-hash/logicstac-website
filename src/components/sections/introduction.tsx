import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import BackgroundCurve from '../ui/background-curve';
import { SimpleIcon } from '../ui/simple-icon';
import { siThreedotjs } from 'simple-icons';

const Introduction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);

  // Set up letter animation after refs are populated
  useEffect(() => {
    const timer = setTimeout(() => {
      const letters = lettersRef.current.filter(el => el !== null);
      if (letters.length > 0 && textRef.current) {
        // Set initial invisible state
        gsap.set(letters, { opacity: 0, y: 30 });
        
        // Animate on scroll with fromTo
        gsap.fromTo(letters, 
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 75%",
            }
          }
        );
      }
    }, 200);
    return () => clearTimeout(timer);
  }, []); // Run once after mount

  useGSAP(() => {
    // Additional animations can be added here if needed
  }, { scope: containerRef });

  return (
    <section id="services" ref={containerRef} className="relative w-full bg-ln-dark text-ln-cream py-16 md:py-24 px-4 overflow-hidden">
      {/* Animated Background Green Curve - Same as Hero */}
      <BackgroundCurve opacity={15} className="opacity-15" />

      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 20 Q 50 50 100 20" stroke="white" fill="none" />
          <path d="M0 80 Q 50 50 100 80" stroke="white" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-[10%] left-[5%] w-3 h-3 rounded-full bg-ln-yellow opacity-20 blur-sm animate-pulse"></div>
        <div className="absolute top-[30%] right-[10%] w-4 h-4 rounded-full bg-ln-yellow opacity-15 blur-sm animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-ln-yellow opacity-25 blur-sm animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Typography Block */}
        <div ref={textRef} className="flex flex-col items-center text-center mb-16 md:mb-32">
          <div className="w-12 h-12 md:w-16 md:h-16 border border-ln-yellow/60 bg-ln-yellow/10 rounded-full flex items-center justify-center mb-6 md:mb-8 shadow-[0_0_20px_rgba(225,255,0,0.15)] group hover:scale-110 transition-transform duration-300">
            <SimpleIcon icon={siThreedotjs} size={24} className="text-ln-yellow group-hover:rotate-12 transition-transform duration-300 md:w-7 md:h-7" />
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-6xl lg:text-[6.5rem] leading-[1.05] sm:leading-[0.95] md:leading-[0.85] tracking-tight uppercase max-w-full md:max-w-[92%] lg:max-w-[88%] mx-auto font-display font-bold">
            {(() => {
              let globalLetterIndex = 0;
              const parts = [
                { text: "Designing ", className: "font-serif text-ln-yellow font-normal normal-case italic" },
                { text: "Future,", className: "stroke-text" },
                { text: "\nBuilding for ", className: "" },
                { text: "Scale,", className: "text-ln-yellow" },
                { text: "\nDelivering High ", className: "" },
                { text: "\nImpact Solutions. Shaping A ", className: "" },
                { text: "Digital ", className: "text-ln-yellow font-serif font-normal normal-case italic" },
                { text: "World ", className: "" },
                { text: "\nOne Pixel At A ", className: "" },
                { text: "Time.", className: "" },
              ];

              return parts.map((part, partIndex) => {
                const isNewLine = part.text.startsWith('\n');
                const cleanText = isNewLine ? part.text.slice(1) : part.text;
                
                const words = cleanText.split(' ');

                return (
                  <React.Fragment key={partIndex}>
                    {isNewLine && <br className="hidden sm:inline" />}
                    {words.map((word, wordIndex) => {
                      if (!word) return null;
                      return (
                        <React.Fragment key={wordIndex}>
                          <span className={`inline-block whitespace-nowrap ${part.className}`}>
                            {word.split('').map((letter, letterIdx) => {
                              const idx = globalLetterIndex++;
                              return (
                                <span
                                  key={letterIdx}
                                  ref={el => { if (el) lettersRef.current[idx] = el; }}
                                  className="inline-block"
                                >
                                  {letter}
                                </span>
                              );
                            })}
                          </span>
                          {' '}
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                );
              });
            })()}
          </h2>
        </div>

      </div>
    </section>
  );
};

export default Introduction;
