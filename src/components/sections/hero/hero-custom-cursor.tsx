import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface HeroCustomCursorProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const HeroCustomCursor: React.FC<HeroCustomCursorProps> = ({ containerRef }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cursor = cursorRef.current;
    if (!container || !cursor) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let isHovering = false;
    let isLoopRunning = false;
    let animationId: number;

    const startLoop = () => {
      if (!isLoopRunning) {
        isLoopRunning = true;
        animateCursor();
      }
    };

    const stopLoop = () => {
      isLoopRunning = false;
      if (animationId) cancelAnimationFrame(animationId);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      isHovering = true;
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorX = mouseX;
      cursorY = mouseY;

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
        xPercent: -50,
        yPercent: -50
      });

      gsap.to(cursor, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });

      startLoop();
    };

    const handleMouseLeave = () => {
      isHovering = false;
      gsap.to(cursor, {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: 'power2.out',
        onComplete: () => {
          if (!isHovering) stopLoop();
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (isHovering && !isLoopRunning) {
        startLoop();
      }
    };

    const animateCursor = () => {
      if (!isLoopRunning) return;

      if (isHovering) {
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;

        gsap.set(cursor, {
          x: cursorX,
          y: cursorY,
          xPercent: -50,
          yPercent: -50
        });
      }

      animationId = requestAnimationFrame(animateCursor);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', handleMouseMove);
      stopLoop();
    };
  }, [containerRef]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[60] opacity-0"
      style={{
        willChange: 'transform',
        left: 0,
        top: 0
      }}
    >
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-ln-yellow bg-ln-yellow/10 backdrop-blur-sm animate-pulse" />
        <div className="absolute inset-0 rounded-full border border-ln-deep-forest/20" />
        <div className="w-2.5 h-2.5 rounded-full bg-ln-yellow shadow-[0_0_10px_rgba(210,255,0,0.8)]" />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from 0deg, 
              rgba(210, 255, 0, 0.4) 0deg,
              rgba(34, 40, 49, 0.2) 90deg,
              rgba(210, 255, 0, 0.4) 180deg,
              rgba(34, 40, 49, 0.2) 270deg,
              rgba(210, 255, 0, 0.4) 360deg
            )`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            animation: 'hero-cursor-spin 3s linear infinite'
          }}
        />
      </div>
      <style>{`@keyframes hero-cursor-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default HeroCustomCursor;
