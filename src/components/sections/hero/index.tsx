import React, { useRef } from 'react';
import HeroFloatingElements from './hero-floating-elements';
import HeroCustomCursor from './hero-custom-cursor';
import WaterRipple from '../../ui/water-ripple';
import BackgroundCurve from '../../ui/background-curve';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen min-h-[35rem] bg-black overflow-hidden flex flex-col items-center justify-end pb-6 sm:pb-10 cursor-crosshair"
    >
      {/* Background Video Layer - Full Crisp Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          src="/images/drewverse/video_thumbnail.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none opacity-100"
        />
        {/* Subtle Gradient Overlays for UI contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80 pointer-events-none" />
      </div>

      {/* Animated Background Curves */}
      <BackgroundCurve opacity={10} className="z-1 text-ln-yellow opacity-10 pointer-events-none" />

      {/* Interactive Water Ripple Effect */}
      <WaterRipple className="z-10 opacity-40 pointer-events-none" />

      {/* Floating Decorative Elements */}
      <HeroFloatingElements />

      {/* Interactive Custom Cursor */}
      <HeroCustomCursor containerRef={containerRef} />

      {/* Bottom Subtitle / Tagline */}
      <div className="relative z-30 flex flex-col items-center text-center px-4">
        <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-ln-yellow animate-ping" />
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-white">
            LogicStac Digital Agency • London & Worldwide
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;


