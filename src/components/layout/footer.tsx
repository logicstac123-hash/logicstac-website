import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

const Footer = () => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);

    const logos = [
        { src: '/images/footer/monster.svg', alt: 'Monster Energy' },
        { src: '/images/footer/hilton.svg', alt: 'Hilton' },
        { src: '/images/footer/android.svg', alt: 'Android' },
        { src: '/images/footer/pap.svg', alt: 'PAP' },
        { src: '/images/footer/google-green.svg', alt: 'Google' },
        { src: '/images/footer/ralph-lauren-green.svg', alt: 'Ralph Lauren' },
        { src: '/images/footer/quadrant-with-q-black.svg', alt: 'Quadrant' },
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
            duration: 1.5,
            stagger: 0.15,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 85%',
            }
        });

    }, { scope: containerRef, dependencies: [] });

    const RollingLink = ({ text, href, className = '' }) => {
        const linkRef = useRef(null);

        useGSAP(() => {
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

            linkRef.current.addEventListener('mouseenter', onEnter);
            linkRef.current.addEventListener('mouseleave', onLeave);

            return () => {
                linkRef.current?.removeEventListener('mouseenter', onEnter);
                linkRef.current?.removeEventListener('mouseleave', onLeave);
            };
        }, { scope: linkRef });

        return (
            <a
                ref={linkRef}
                href={href}
                className={`rolling-link relative overflow-hidden h-[1.1em] flex items-center font-display font-black uppercase ${className}`}
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
        <footer id="contact" className="relative w-full pt-24 px-4 bg-gradient-to-b from-ln-cream to-ln-yellow min-h-[800px]" >
            {/* Main masked container */}
            <div
                className="relative w-full h-[800px] flex flex-col items-center overflow-visible rounded-t-[4rem]"
                style={{
                    maskImage: 'url("/images/masks/footer-desktop-mask.svg")',
                    WebkitMaskImage: 'url("/images/masks/footer-desktop-mask.svg")',
                    maskSize: '100% 100%',
                    WebkitMaskSize: '100% 100%',
                    maskRepeat: 'no-repeat',
                    WebkitMaskRepeat: 'no-repeat',
                }}
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

                {/* Title and signature - repositioned higher for better visibility */}
                <div className="absolute top-[12rem] left-1/2 -translate-x-1/2 w-full max-w-7xl text-center z-[1]">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 -rotate-[5deg] w-64 md:w-[12vw] z-[-1] pointer-events-none select-none mix-blend-multiply">
                    </div>
                    <h2 className="text-white relative z-10 text-[3rem] md:text-[4rem] lg:text-[5rem] xl:text-[5.5rem] font-sans font-black leading-[0.8] tracking-[-0.04em] uppercase font-semibold">
                        CRAFTING <span className="text-ln-yellow font-serif font-normal">DIGITAL</span> <br />
                        <span className="text-ln-yellow font-serif font-normal">EXCELLENCE.</span>
                    </h2>
                </div>

                {/* Navigation */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-20">
                    <div className="w-full max-w-[82.5rem] mx-auto px-12 flex justify-between items-center">
                        {/* PAGES */}
                        <div className="flex flex-col gap-3 items-center text-center">
                            <span className="text-white/20 text-[0.5rem] uppercase font-bold tracking-[0.4em] font-sans">PAGES</span>
                            <nav className="flex flex-col gap-1 md:gap-2 items-center">
                                {['HOME', 'SERVICES', 'PORTFOLIO', 'PRICING'].map(link => (
                                    <RollingLink
                                        key={link}
                                        text={link}
                                        href={`#${link === 'PORTFOLIO' ? 'showcase' : link.toLowerCase()}`}
                                        className="text-lg md:text-xl lg:text-2xl text-ln-white leading-[1.1]"
                                    />
                                ))}
                                <RollingLink
                                    text="CONTACT"
                                    href="#contact-form"
                                    className="text-base md:text-lg underline font-normal decoration-[2px] underline-offset-[0.4rem] text-ln-yellow"
                                />
                            </nav>
                        </div>

                        {/* FOLLOW ON */}
                        <div className="flex flex-col gap-3 items-center text-center">
                            <span className="text-white/20 text-[0.5rem] uppercase font-bold tracking-[0.4em] font-sans">FOLLOW ON</span>
                            <nav className="flex flex-col gap-1 md:gap-2   items-center">
                                {['TIKTOK', 'INSTAGRAM', 'YOUTUBE', 'TWITCH'].map(link => (
                                    <RollingLink
                                        key={link}
                                        text={link}
                                        href={`#${link}`}
                                        className="text-lg md:text-xl lg:text-2xl text-ln-white leading-[1.1]"
                                    />
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Business button - centered and downsized */}
                <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-30">
                    <button
                        onClick={() => {
                            const contactElement = document.getElementById('contact-form');
                            if (contactElement) {
                                contactElement.scrollIntoView({ behavior: 'smooth' });
                            }
                        }}
                        className="bg-ln-yellow text-black px-7 py-2.5 rounded-lg font-sans font-black text-[0.6875rem] tracking-wider flex items-center gap-2 hover:shadow-[0_0_2rem_rgba(210,255,0,0.3)] transition-shadow duration-400 cursor-pointer uppercase border-none"
                    >
                        START A PROJECT <span className="text-sm">⤴</span>
                    </button>
                </div>

                {/* Marquee - Correctly positioned at bottom of dark area */}
                <div className="absolute bottom-16 md:bottom-24 w-full overflow-hidden z-5">
                    <div
                        ref={marqueeRef}
                        className="flex whitespace-nowrap gap-10 md:gap-16 items-center justify-start min-w-max px-10 md:px-20"
                    >
                        {[...logos, ...logos, ...logos].map((logo, idx) => (
                            <img
                                key={idx}
                                src={logo.src}
                                alt={logo.alt}
                                className="h-8 md:h-10 w-auto object-contain hover:brightness-125 transition-all duration-300"
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(51%) sepia(88%) saturate(2852%) hue-rotate(359deg)'
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Legal bar - Matching detail: tight tracking on links */}
            <div className="relative absolute bottom-8 w-full px-2  flex flex-col md:flex-row justify-between items-center gap-4 z-30">
                <p className="text-black text-[8px] font-bold uppercase font-sans "> <b> © 2025 LOGICSTAC.  </b> ALL RIGHTS RESERVED</p>
                <div className="flex gap-2 font-sans font-extrabold text-black text-[13px] uppercase tracking-tight">
                    <a href="/privacy" className=" uppercase ">PRIVACY POLICY</a>
                    <a href="/terms" className=" uppercase ">TERMS</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
