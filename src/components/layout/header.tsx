import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { X, ArrowRight } from 'lucide-react';
import AnimatedTextButton from '../ui/animated-text-button';
import { scrollToSection } from '../../utils/scroll';
import { openLegalModal } from '../ui/legal-modal';

gsap.registerPlugin(ScrollTrigger);

// Helper hook/component for smooth scrolling via ScrollSmoother
const handleScrollTo = (targetId: string, callback?: () => void) => {
    if (callback) callback();
    scrollToSection(targetId, true);
};

const MenuButton: React.FC<{ onClick: () => void; isMenuOpen: boolean; isDarkSection?: boolean }> = ({ onClick, isMenuOpen, isDarkSection }) => {
    const [isHovered, setIsHovered] = useState(false);
    const topBarRef = useRef<HTMLDivElement>(null);
    const bottomBarRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (isMenuOpen) {
            gsap.to(topBarRef.current, {
                width: '100%',
                rotation: 45,
                y: 4,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(bottomBarRef.current, {
                width: '100%',
                rotation: -45,
                y: -4,
                duration: 0.3,
                ease: 'power2.out'
            });
        } else if (isHovered) {
            gsap.to(topBarRef.current, {
                width: '100%',
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(bottomBarRef.current, {
                width: '100%',
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.05
            });
        } else {
            gsap.to(topBarRef.current, {
                width: '60%',
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            gsap.to(bottomBarRef.current, {
                width: '60%',
                rotation: 0,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.05
            });
        }
    }, { dependencies: [isHovered, isMenuOpen] });

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`menu-button group h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-xl backdrop-blur-md border transition-all duration-500 flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 z-50 relative ${
                isDarkSection
                    ? 'bg-black/60 border-white/20 shadow-lg hover:bg-black/80'
                    : 'bg-white/80 border-black/5 shadow-sm hover:bg-white/95'
            }`}
            aria-label="Toggle Menu"
        >
            <div className="menu-inner flex flex-col gap-[0.22rem] sm:gap-[0.3rem] w-[1.05rem] sm:w-[1.2rem] md:w-[1.35rem]">
                <div
                    ref={topBarRef}
                    className={`h-[2px] sm:h-[2.5px] w-[60%] self-end rounded-full origin-center transition-colors duration-500 ${
                        isDarkSection
                            ? 'bg-white group-hover:bg-ln-yellow'
                            : 'bg-ln-deep-forest group-hover:bg-ln-yellow'
                    }`}
                ></div>
                <div
                    ref={bottomBarRef}
                    className={`h-[2px] sm:h-[2.5px] w-[60%] self-start rounded-full origin-center transition-colors duration-500 ${
                        isDarkSection
                            ? 'bg-white group-hover:bg-ln-yellow'
                            : 'bg-ln-deep-forest group-hover:bg-ln-yellow'
                    }`}
                ></div>
            </div>
        </button>
    );
};

const Header: React.FC = () => {
    const headerRef = useRef<HTMLElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const actionsRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    // Full screen overlay drawer animation refs
    const menuOverlayRef = useRef<HTMLDivElement>(null);
    const menuBgRef = useRef<HTMLDivElement>(null);
    const menuContainerRef = useRef<HTMLDivElement>(null);
    const menuItemsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Entrance animation for header bar
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.2 } });

        tl.from(headerRef.current, {
            y: -100,
            opacity: 0,
        })
            .from([logoRef.current, linksRef.current, actionsRef.current], {
                y: 20,
                opacity: 0,
                stagger: 0.1,
            }, "-=0.8");

        // Scroll-based shrink animation using ScrollTrigger
        const shrinkTl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: '+=150',
                scrub: true,
            }
        });

        shrinkTl.to(headerRef.current, {
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            duration: 1,
            ease: 'none'
        }, 0)
            .to(logoRef.current?.querySelectorAll('span') || [], {
                fontSize: window.innerWidth >= 768 ? '1.15rem' : '0.95rem',
                duration: 1,
                ease: 'none'
            }, 0)
            .to('.menu-button', {
                padding: window.innerWidth >= 768 ? '0.75rem' : '0.5rem',
                duration: 1,
                ease: 'none'
            }, 0)
            .to('.menu-inner', {
                width: window.innerWidth >= 768 ? '1.5rem' : '1.0rem',
                duration: 1,
                ease: 'none'
            }, 0);

        // Active section trigger tracking across scroll (all verified valid DOM IDs)
        ['#home', '#services', '#track-mode', '#showcase', '#pricing', '#testimonials', '#blog', '#store', '#faq', '#contact-form'].forEach((id) => {
            ScrollTrigger.create({
                trigger: id,
                start: 'top 35%',
                end: 'bottom 35%',
                onEnter: () => setActiveSection(id),
                onEnterBack: () => setActiveSection(id),
            });
        });
    }, { scope: headerRef });

    // Handle full-screen modal transition on toggle
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';

            gsap.set(menuOverlayRef.current, { display: 'flex' });
            gsap.fromTo(menuBgRef.current,
                { y: '-100%' },
                { y: '0%', duration: 0.6, ease: 'power4.inOut' }
            );

            const items = menuItemsRef.current?.querySelectorAll('.drawer-link-item') || [];
            gsap.fromTo(items,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, delay: 0.35, ease: 'power3.out' }
            );

            const footerItems = menuContainerRef.current?.querySelectorAll('.drawer-footer-item') || [];
            gsap.fromTo(footerItems,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.6, ease: 'power2.out' }
            );
        } else {
            document.body.style.overflow = '';
        }
    }, [isMenuOpen]);

    const closeOverlayMenu = () => {
        const items = menuItemsRef.current?.querySelectorAll('.drawer-link-item') || [];
        const footerItems = menuContainerRef.current?.querySelectorAll('.drawer-footer-item') || [];

        gsap.to([...Array.from(items), ...Array.from(footerItems)], {
            y: 30,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in'
        });

        gsap.to(menuBgRef.current, {
            y: '-100%',
            duration: 0.5,
            delay: 0.15,
            ease: 'power3.inOut',
            onComplete: () => {
                gsap.set(menuOverlayRef.current, { display: 'none' });
                setIsMenuOpen(false);
            }
        });
    };

    // Rolling Link specifically designed for Drawer Links
    const RollingDrawerLink: React.FC<{ text: string; href: string; number: string }> = ({ text, href, number }) => {
        const linkRef = useRef<HTMLAnchorElement>(null);

        useGSAP(() => {
            if (!linkRef.current) return;
            const topChars = linkRef.current.querySelectorAll('.char-top');
            const bottomChars = linkRef.current.querySelectorAll('.char-bottom');

            const tl = gsap.timeline({ paused: true });
            tl.to(topChars, {
                y: '-100%',
                stagger: 0.015,
                duration: 0.4,
                ease: 'power3.inOut'
            })
            .to(bottomChars, {
                y: '-100%',
                stagger: 0.015,
                duration: 0.4,
                ease: 'power3.inOut'
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
                onClick={(e) => {
                    e.preventDefault();
                    closeOverlayMenu();
                    setTimeout(() => {
                        handleScrollTo(href);
                    }, 500);
                }}
                className="drawer-link-item flex items-baseline gap-3 md:gap-5 font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-white hover:text-ln-yellow transition-colors duration-200 py-1 md:py-1.5 select-none relative overflow-hidden"
            >
                <span className="text-[10px] sm:text-xs font-mono font-bold text-ln-yellow/60">{number}</span>
                <div className="relative h-[1.15em] overflow-hidden flex items-center">
                    <div className="flex">
                        {text.split('').map((c, i) => (
                            <span key={i} className="char-top inline-block">{c === ' ' ? '\u00A0' : c}</span>
                        ))}
                    </div>
                    <div className="flex absolute top-full left-0">
                        {text.split('').map((c, i) => (
                            <span key={i} className="char-bottom inline-block text-ln-yellow">{c === ' ' ? '\u00A0' : c}</span>
                        ))}
                    </div>
                </div>
            </a>
        );
    };

    const isDarkSection = activeSection === '#home' || activeSection === '#showcase' || activeSection === '#pricing' || activeSection === '#testimonials' || activeSection === '#blog' || activeSection === '#contact-form';

    return (
        <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
            <header
                ref={headerRef}
                className="relative w-full px-[1.5rem] py-[1.2rem] flex justify-between items-center bg-transparent backdrop-blur-[2px]"
            >
                {/* Left Logo - Adaptive Brand Pill */}
                <div ref={logoRef} className="flex-shrink-0 pointer-events-auto leading-none z-10 flex items-center">
                    <a
                        href="/"
                        className={`flex flex-row items-center gap-1 sm:gap-1.5 group px-3 sm:px-3.5 md:px-4 h-9 sm:h-10 md:h-11 rounded-xl backdrop-blur-md border transition-all duration-500 ${
                            isDarkSection
                                ? 'bg-black/60 border-white/20 shadow-lg hover:bg-black/80'
                                : 'bg-white/80 border-black/5 shadow-sm hover:bg-white/95'
                        }`}
                    >
                        <span className={`font-serif uppercase tracking-tight text-[0.95rem] sm:text-[1.15rem] md:text-[1.35rem] leading-none transition-colors duration-500 ${
                            isDarkSection
                                ? 'text-white group-hover:text-ln-yellow'
                                : 'text-ln-deep-forest group-hover:text-ln-yellow'
                        }`}>
                            LOGIC
                        </span>
                        <span className={`font-sans font-black uppercase tracking-tight text-[0.95rem] sm:text-[1.15rem] md:text-[1.35rem] leading-none transition-colors duration-500 ${
                            isDarkSection
                                ? 'text-ln-yellow group-hover:text-white'
                                : 'text-ln-yellow group-hover:text-ln-deep-forest'
                        }`}>
                            STAC
                        </span>
                    </a>
                </div>

                {/* Center - Desktop Navigation Links (Absolutely centered) */}
                <div
                    ref={linksRef}
                    className="hidden xl:flex items-center gap-5 xl:gap-7 bg-ln-white/85 backdrop-blur-md pl-6 pr-2 py-1.5 rounded-full border border-ln-deep-forest/5 shadow-sm pointer-events-auto absolute left-1/2 -translate-x-1/2 z-10"
                >
                    {[
                        { label: 'Home', target: '#home' },
                        { label: 'Services', target: '#services' },
                        { label: 'Showcase', target: '#showcase' },
                        { label: 'Pricing', target: '#pricing' },
                        { label: 'Reviews', target: '#testimonials' },
                        { label: 'Journal', target: '#blog' },
                        { label: 'Store', target: '#store' },
                    ].map((item, idx) => (
                        <a
                            key={idx}
                            href={item.target}
                            onClick={(e) => {
                                e.preventDefault();
                                handleScrollTo(item.target);
                            }}
                            className={`font-sans font-bold text-xs uppercase tracking-wider transition-all relative group py-1 ${
                                activeSection === item.target
                                    ? 'text-ln-black font-extrabold'
                                    : 'text-ln-deep-forest hover:text-ln-black'
                            }`}
                        >
                            {item.label}
                            <span className={`absolute bottom-0 left-0 h-0.5 bg-ln-yellow transition-all duration-300 ${
                                activeSection === item.target ? 'w-full' : 'w-0 group-hover:w-full'
                            }`} />
                        </a>
                    ))}

                    <div className="h-4 w-px bg-ln-deep-forest/15 mx-0.5" />

                    <AnimatedTextButton
                        text="Get In Touch"
                        href="#contact-form"
                        onClick={() => {
                            handleScrollTo('#contact-form');
                        }}
                        icon="/images/logos-icons/collab.svg"
                        iconAlt="Get In Touch"
                        className="group flex items-center gap-1.5 bg-ln-yellow text-ln-deep-forest px-3.5 py-1.5 font-sans font-black uppercase tracking-tight hover:brightness-105 hover:scale-105 active:scale-95 transition-all duration-300 rounded-full shadow-none border-none cursor-pointer whitespace-nowrap text-xs"
                        iconClassName="w-3.5 h-3.5 brightness-0"
                        textClassName="text-xs font-black whitespace-nowrap"
                    />
                </div>

                {/* Right Actions */}
                <div ref={actionsRef} className="flex items-center pointer-events-auto">
                    <MenuButton
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        isMenuOpen={isMenuOpen}
                        isDarkSection={isDarkSection}
                    />
                </div>
            </header>

            {/* FULL-SCREEN NAVIGATION OVERLAY DRAWER */}
            <div
                ref={menuOverlayRef}
                className="fixed inset-0 z-40 hidden flex-col justify-between p-6 sm:p-8 md:p-16 pointer-events-auto overflow-y-auto max-h-screen"
            >
                {/* Background color block with noise mask */}
                <div
                    ref={menuBgRef}
                    className="absolute inset-0 bg-[#161814] -z-10 origin-top flex flex-col justify-between"
                >
                    {/* Noise overlay */}
                    <div className="absolute inset-0 bg-image-noise opacity-15 mix-blend-overlay pointer-events-none" />

                    {/* Big beautiful absolute pattern */}
                    <div
                        className="absolute inset-0 opacity-5 pointer-events-none"
                        style={{
                            backgroundImage: 'url("/images/green-svgs/background-green.svg")',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </div>

                {/* Top header row inside the drawer */}
                <div className="w-full flex justify-between items-center z-50">
                    <div className="flex flex-col items-start leading-[0.85]">
                        <span className="font-serif text-white uppercase tracking-tight text-[1.9rem] md:text-[2.3rem]">
                            LOGIC
                        </span>
                        <span className="font-sans font-black text-white uppercase tracking-tight text-[1.9rem] md:text-[2.3rem]">
                            STAC
                        </span>
                    </div>
                    <button
                        onClick={closeOverlayMenu}
                        className="bg-white/10 hover:bg-white text-white hover:text-black p-3.5 rounded-full border border-white/10 hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center aspect-square"
                        aria-label="Close Menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Main Links Area */}
                <div
                    ref={menuContainerRef}
                    className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-16 my-auto py-4 md:py-0"
                >
                    {/* Link Column */}
                    <div ref={menuItemsRef} className="flex flex-col gap-1.5 md:gap-2.5">
                        <RollingDrawerLink number="01" text="HOME" href="#home" />
                        <RollingDrawerLink number="02" text="SERVICES" href="#services" />
                        <RollingDrawerLink number="03" text="PORTFOLIO" href="#showcase" />
                        <RollingDrawerLink number="04" text="PRICING" href="#pricing" />
                        <RollingDrawerLink number="05" text="REVIEWS" href="#testimonials" />
                        <RollingDrawerLink number="06" text="JOURNAL" href="#blog" />
                        <RollingDrawerLink number="07" text="STORE" href="#store" />
                        <RollingDrawerLink number="08" text="CONTACT" href="#contact-form" />
                    </div>

                    {/* Meta info columns */}
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-gray-400 font-sans">
                        {/* Company Details Column */}
                        <div className="drawer-footer-item flex flex-col gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-ln-yellow">STUDIO LOCATION</span>
                            <p className="text-sm text-white font-medium leading-relaxed">
                                LogicStac Agency<br />
                                120 Creative Boulevard<br />
                                London, EC1A 1BB
                            </p>
                        </div>

                        {/* Social Handles Column */}
                        <div className="drawer-footer-item flex flex-col gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-ln-yellow">CONNECT</span>
                            <div className="flex flex-col gap-2">
                                {[
                                    { name: 'Instagram', url: 'https://instagram.com/logicstac' },
                                    { name: 'Dribbble', url: 'https://dribbble.com/logicstac' },
                                    { name: 'LinkedIn', url: 'https://linkedin.com/company/logicstac' },
                                    { name: 'Twitter / X', url: 'https://x.com/logicstac' },
                                ].map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-semibold text-white hover:text-ln-yellow transition-colors flex items-center gap-1 group"
                                    >
                                        {social.name}
                                        <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Direct Inquiry CTA */}
                        <div className="drawer-footer-item flex flex-col gap-3 justify-start">
                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-ln-yellow">START A PROJECT</span>
                            <AnimatedTextButton
                                text="Get In Touch"
                                href="#contact-form"
                                onClick={() => {
                                    closeOverlayMenu();
                                    handleScrollTo('#contact-form');
                                }}
                                icon="/images/logos-icons/collab.svg"
                                iconAlt="Get In Touch"
                                className="group inline-flex items-center justify-center gap-2 bg-ln-yellow text-ln-deep-forest px-5 py-2.5 font-sans font-black uppercase tracking-tight hover:brightness-105 hover:scale-105 active:scale-95 transition-all duration-300 rounded-xl shadow-none border-none cursor-pointer whitespace-nowrap text-xs w-fit"
                                iconClassName="w-3.5 h-3.5 brightness-0"
                                textClassName="text-xs font-black whitespace-nowrap"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer bar of the menu */}
                <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 border-t border-white/5 pt-8 text-gray-500 text-xs font-sans drawer-footer-item">
                    <p>© 2025 LOGICSTAC AGENCY. ALL RIGHTS RESERVED.</p>
                    <div className="flex gap-6 text-white/40">
                        <button
                            onClick={() => {
                                closeOverlayMenu();
                                openLegalModal('privacy');
                            }}
                            className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit text-xs uppercase"
                        >
                            PRIVACY POLICY
                        </button>
                        <button
                            onClick={() => {
                                closeOverlayMenu();
                                openLegalModal('terms');
                            }}
                            className="hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit text-xs uppercase"
                        >
                            TERMS OF SERVICE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
