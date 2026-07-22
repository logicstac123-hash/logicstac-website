import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface HeroPortraitProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const HeroPortrait: React.FC<HeroPortraitProps> = ({ containerRef }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!containerRef.current || !wrapperRef.current || !imgRef.current) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const { clientX, clientY } = e;

      // Normalize values between -0.5 and 0.5
      const normX = (clientX - rect.left) / rect.width - 0.5;
      const normY = (clientY - rect.top) / rect.height - 0.5;

      // Subtle range of motion (pixels)
      targetX = normX * 35;
      targetY = normY * 20;
    };

    const updateParallax = () => {
      // Smooth interpolation (lerp)
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      if (imgRef.current) {
        gsap.set(imgRef.current, {
          x: currentX,
          y: currentY,
          rotationY: currentX * 0.15,
          rotationX: -currentY * 0.15,
          transformPerspective: 1000,
        });
      }

      animationFrameId = requestAnimationFrame(updateParallax);
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    updateParallax();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [containerRef]);

  return (
    <div ref={wrapperRef} className="relative z-20 h-full flex items-end justify-center w-full max-w-[100rem] overflow-hidden pointer-events-none">
      <img
        ref={imgRef}
        src="/images/drewverse/hero_portrait.png"
        alt="Drewverse Hero Portrait"
        className="h-[85%] max-h-[85vh] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] select-none will-change-transform"
      />
    </div>
  );
};

export default HeroPortrait;
