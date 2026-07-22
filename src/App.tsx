import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import Header from './components/layout/header';
import Hero from './components/sections/hero/index';
import Introduction from './components/sections/introduction';
import HorizontalScroll from './components/sections/horizontal-scroll/index';
import TrackMode from './components/sections/track-mode';
import Helmets from './components/sections/helmets';
import Pricing from './components/sections/pricing';
import FAQSection from './components/sections/faq';
import ContactForm from './components/sections/contact-form';
import Partners from './components/sections/partners';
import Footer from './components/layout/footer';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {

    useEffect(() => {
        let smoother: any = null;
        try {
            if (ScrollSmoother && typeof ScrollSmoother.create === 'function') {
                smoother = ScrollSmoother.create({
                    smooth: 0.8,
                    effects: true,
                    smoothTouch: 0.1,
                });
            }
        } catch (e) {
            console.warn('ScrollSmoother initialization skipped:', e);
        }

        return () => {
            if (smoother && typeof smoother.kill === 'function') {
                smoother.kill();
            }
        };
    }, []);

    // Loader overlay animation
    useEffect(() => {
        const tl = gsap.timeline();
        tl.to('.loader-overlay', {
            height: 0,
            duration: 0.8,
            ease: 'power4.inOut',
            delay: 0.2
        });
    }, []);

    return (
        <>
            {/* Intro Loader Overlay - Outside smooth wrapper */}
            <div className="loader-overlay fixed inset-0 bg-ln-yellow z-[100] flex items-center justify-center overflow-hidden">
                <h1 className="font-display font-bold text-6xl md:text-[6rem] lg:text-[8rem] tracking-tighter text-black uppercase animate-pulse">
                    LogicStac
                </h1>
            </div>

            {/* Header - Outside smooth wrapper for proper fixed positioning */}
            <Header />

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <div className="relative w-full min-h-screen bg-ln-cream text-ln-dark overflow-x-hidden selection:bg-ln-yellow selection:text-black">
                        <main className="relative z-20 w-full flex flex-col items-center">
                            <Hero />
                            <Introduction />
                            <HorizontalScroll />
                            <TrackMode />
                            <Helmets />
                            <Pricing />
                            <FAQSection />
                            <ContactForm />
                            <Partners />
                        </main>

                        <Footer />
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;