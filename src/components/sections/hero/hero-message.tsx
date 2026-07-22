import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroMessageProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const HeroMessage: React.FC<HeroMessageProps> = ({ containerRef }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLImageElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !messageRef.current) return;

    // Entrance animation on mount
    gsap.fromTo(
      messageRef.current,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );

    // Scroll fade out as user scrolls past hero
    gsap.to(messageRef.current, {
      opacity: 0,
      y: -60,
      scale: 0.9,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={messageRef}
      className="absolute top-[28%] md:top-[22%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6 pointer-events-none"
    >
      <div className="text-center px-4">
        <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-8xl uppercase leading-[0.9] tracking-tighter text-white mb-2 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
          Crafting <span className="text-ln-yellow italic font-serif lowercase font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">Digital</span>
          <br />
          <span className="text-white">Excellence.</span>
        </h1>
      </div>
    </div>
  );
};

export default HeroMessage;

