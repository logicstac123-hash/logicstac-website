import React, { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { scrollToSection } from '../../utils/scroll';
import { openLegalModal } from '../ui/legal-modal';
import { SimpleIcon, siLinkedin } from '../ui/simple-icon';
import { siInstagram, siX, siYoutube } from 'simple-icons';

const Footer = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);

    const logos = [
        { src: '/images/footer/monster.svg', alt: 'Monster Energy' },
        { src: '/images/footer/hilton.svg', alt: 'Hilton' },
        { src: '/images/footer/android.svg', alt: 'Android' },
        { src: '/images/footer/pap.svg', alt: 'PAP' },
        { src: '/images/footer/google-green.svg', alt: 'Google' },
        { src: '/images/footer/ralph-lauren-green.svg', alt: 'Ralph Lauren' },
        { src: '/images/footer/signature-big.svg', alt: 'LogicStac Signature' },
        { src: '/images/footer/management.svg', alt: 'Management' },
        { src: '/images/footer/curve-icon.svg', alt: 'Curve' },
        { src: '/images/footer/icon-with-kart-text.svg', alt: 'Kart' },
    ];

    useGSAP(() => {
        if (!containerRef.current) return;

        // Marquee animation
        const marquee = marqueeRef.current;
        if (marquee) {
            const totalWidth = marquee.scrollWidth / 2;
            const animation = gsap.to(marquee, {
                x: -totalWidth,
                duration: 40,
                ease: 'none',
                repeat: -1,
            });

            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const vel = self.getVelocity();
                    const targetScale = vel > 10 ? 2 : vel < -10 ? -2 : 1;
                    gsap.to(animation, { timeScale: targetScale, duration: 0.6 });
                }
            });
        }

        // Content entrance
        gsap.from('.reveal-item', {
            y: 40,
            opacity: 0,
            duration: 1.2,
            stagger: 0.12,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
            }
        });

    }, { scope: containerRef, dependencies: [] });

    interface RollingLinkProps {
        text: string;
        href: string;
        className?: string;
        isExternal?: boolean;
    }

    const RollingLink: React.FC<RollingLinkProps> = ({ text, href, className = '', isExternal = false }) => {
        const linkRef = useRef<HTMLAnchorElement>(null);

        useGSAP(() => {
            if (!linkRef.current) return;
            const topChars = linkRef.current.querySelectorAll('.top-char');
            const bottomChars = linkRef.current.querySelectorAll('.bottom-char');

            const tl = gsap.timeline({ paused: true });

            tl.to(topChars, {
                y: '-100%',
                stagger: 0.02,
                duration: 0.45,
                ease: 'power4.inOut'
            })
                .to(bottomChars, {
                    y: '-100%',
                    stagger: 0.02,
                    duration: 0.45,
                    ease: 'power4.inOut'
                }, 0);

            const onEnter = () => tl.play();
            const onLeave = () => tl.reverse();

            const current = linkRef.current;
            current.addEventListener('mouseenter', onEnter);
            current.addEventListener('mouseleave', onLeave);

            return () => {
                current.removeEventListener('mouseenter', onEnter);
                current.removeEventListener('mouseleave', onLeave);
            };
        }, { scope: linkRef });

        return (
            <a
                ref={linkRef}
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        scrollToSection(href);
                    }
                }}
                className={`rolling-link relative overflow-hidden h-[1.15em] flex items-center font-display font-black uppercase ${className}`}
            >
                <div className="flex">
                    {text.split('').map((char, i) => (
                        <span key={i} className="top-char inline-block">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </div>
                <div className="flex absolute top-full left-0">
                    {text.split('').map((char, i) => (
                        <span key={i} className="bottom-char inline-block text-ln-yellow">
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </div>
            </a>
        );
    };

    return (
        <footer
            id="contact"
            ref={containerRef}
            className="relative w-full pt-4 sm:pt-10 md:pt-16 pb-6 sm:pb-8 px-3 sm:px-4 bg-gradient-to-b from-ln-cream via-ln-yellow/60 to-ln-yellow"
        >
            {/* Main masked container */}
            <div
                className="footer-desktop-mask relative w-full min-h-0 md:h-[780px] lg:h-[800px] flex flex-col items-center justify-between py-8 sm:py-10 px-4 md:p-0 overflow-hidden rounded-3xl md:rounded-t-[4rem] gap-6 md:gap-0"
            >
                {/* Deep Olive background matching reference */}
                <div className="absolute inset-0 bg-[#1a1c16] -z-10" />
                {/* Texture layers */}
                <div className="absolute inset-0 bg-image-noise opacity-20 mix-blend-overlay pointer-events-none" />

                {/* background pattern */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'url("/images/green-svgs/background-green.svg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />

                {/* Title and signature - repositioned for mobile and desktop */}
                <div className="reveal-item relative md:absolute md:top-[5rem] lg:top-[8rem] md:left-1/2 md:-translate-x-1/2 w-full max-w-7xl px-4 text-center z-[1]">
                    <h2 className="text-white relative z-10 text-[1.8rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem] font-sans font-black leading-[0.95] md:leading-[0.8] tracking-[-0.04em] uppercase font-semibold">
                        LOGICSTAC <span className="text-ln-yellow font-serif font-normal">DIGITAL</span> <br />
                        <span className="text-ln-yellow font-serif font-normal">AGENCY.</span>
                    </h2>
                </div>

                {/* Navigation */}
                <div className="reveal-item relative md:absolute md:top-[48%] md:-translate-y-1/2 md:left-0 md:right-0 z-20 w-full">
                    <div className="w-full max-w-[82.5rem] mx-auto px-4 sm:px-12 flex justify-around sm:justify-between items-start md:items-center">
                        {/* PAGES */}
                        <div className="flex flex-col gap-2 sm:gap-3 items-center text-center">
                            <span className="text-white/30 text-[0.55rem] uppercase font-bold tracking-[0.3em] font-sans">PAGES</span>
                            <nav className="flex flex-col gap-1 md:gap-2 items-center">
                                {[
                                    { name: 'HOME', target: '#home' },
                                    { name: 'SERVICES', target: '#services' },
                                    { name: 'PORTFOLIO', target: '#showcase' },
                                    { name: 'PRICING', target: '#pricing' },
                                    { name: 'STORE', target: '#store' },
                                ].map(link => (
                                    <RollingLink
                                        key={link.name}
                                        text={link.name}
                                        href={link.target}
                                        className="text-sm sm:text-lg md:text-xl lg:text-2xl text-ln-white leading-[1.1]"
                                    />
                                ))}
                                <RollingLink
                                    text="CONTACT"
                                    href="#contact-form"
                                    className="text-xs sm:text-base md:text-lg underline font-normal decoration-[2px] underline-offset-[0.3rem] text-ln-yellow"
                                />
                            </nav>
                        </div>

                        {/* FOLLOW ON */}
                        <div className="flex flex-col gap-2 sm:gap-3 items-center text-center">
                            <span className="text-white/30 text-[0.55rem] uppercase font-bold tracking-[0.3em] font-sans">FOLLOW ON</span>
                            <nav className="flex flex-col gap-1.5 md:gap-2.5 items-center">
                                {[
                                    { name: 'INSTAGRAM', url: 'https://instagram.com/logicstac', icon: siInstagram },
                                    { name: 'LINKEDIN', url: 'https://linkedin.com/company/logicstac', icon: siLinkedin },
                                    { name: 'TWITTER / X', url: 'https://x.com/logicstac', icon: siX },
                                    { name: 'YOUTUBE', url: 'https://youtube.com/@logicstac', icon: siYoutube },
                                ].map(social => (
                                    <div key={social.name} className="flex items-center gap-2">
                                        <SimpleIcon icon={social.icon} size={15} className="text-ln-yellow/80" />
                                        <RollingLink
                                            text={social.name}
                                            href={social.url}
                                            isExternal={true}
                                            className="text-sm sm:text-lg md:text-xl lg:text-2xl text-ln-white leading-[1.1]"
                                        />
                                    </div>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Business button - centered and downsized */}
                <div className="reveal-item relative md:absolute md:bottom-20 lg:bottom-24 md:left-1/2 md:-translate-x-1/2 z-30">
                    <button
                        onClick={() => {
                            scrollToSection('#contact-form');
                        }}
                        className="bg-ln-yellow text-black px-6 sm:px-7 py-2.5 rounded-lg font-sans font-black text-[0.6875rem] tracking-wider flex items-center gap-2 hover:shadow-[0_0_2rem_rgba(210,255,0,0.3)] transition-all duration-300 cursor-pointer uppercase border-none active:scale-95"
                    >
                        START A PROJECT <ArrowUpRight size={14} className="stroke-[2.5]" />
                    </button>
                </div>

                {/* Marquee - Correctly positioned at bottom of dark area */}
                <div className="relative md:absolute md:bottom-6 lg:bottom-10 w-full overflow-hidden z-5">
                    <div
                        ref={marqueeRef}
                        className="flex whitespace-nowrap gap-8 md:gap-16 items-center justify-start min-w-max px-6 md:px-20"
                    >
                        {[...logos, ...logos, ...logos].map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-6 sm:h-8 md:h-10 w-auto object-contain hover:brightness-125 transition-all duration-300"
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(51%) sepia(88%) saturate(2852%) hue-rotate(359deg)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Legal bar - Matching detail */}
            <div className="w-full max-w-7xl mx-auto mt-6 sm:mt-8 px-4 flex flex-col sm:flex-row justify-between items-center gap-3 z-30">
                <p className="text-black text-[10px] sm:text-xs font-bold uppercase font-sans text-center sm:text-left">
                    <b>© 2025 LOGICSTAC.</b> ALL RIGHTS RESERVED
                </p>
                <div className="flex gap-4 font-sans font-extrabold text-black text-xs sm:text-sm uppercase tracking-tight">
                    <button
                        onClick={() => openLegalModal('privacy')}
                        className="hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
                    >
                        PRIVACY POLICY
                    </button>
                    <button
                        onClick={() => openLegalModal('terms')}
                        className="hover:underline cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
                    >
                        TERMS
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
