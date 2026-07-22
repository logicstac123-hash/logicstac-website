import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface HeroMessageProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

const HeroMessage: React.FC<HeroMessageProps> = () => {
  return null;
};

export default HeroMessage;

