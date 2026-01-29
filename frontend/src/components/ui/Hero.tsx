import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Users, Sparkles } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // Background entrance
        tl.from(bgRef.current, {
            opacity: 0,
            duration: 1.5,
        })

            // Text elements staggered entrance
            .from(textRef.current?.children || [], {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                rotateX: -15, // Slight 3D rotation feel
                transformOrigin: "0% 50% -50",
            }, "-=1");

    }, { scope: containerRef });

    // Smooth scroll to section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80; // navbar height
            const targetPosition = element.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-24 md:pt-28"
        >
            {/* Dynamic Animated Background - Wild Rift Style */}
            <div ref={bgRef} className="absolute inset-0 z-0">
                {/* Hextech Grid Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(10,200,185,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(10,200,185,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>

                {/* Wild Rift Glowing Orbs - Cyan and Gold */}
                <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-[#0AC8B9]/30 rounded-full blur-[120px] animate-pulse-slow mix-blend-screen"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-[#C89B3C]/25 rounded-full blur-[130px] animate-pulse-slow delay-1000 mix-blend-screen"></div>
                <div className="absolute top-1/2 right-1/3 w-[25rem] h-[25rem] bg-[#C93AA3]/20 rounded-full blur-[100px] animate-pulse-slow delay-500 mix-blend-screen"></div>

                {/* Hextech Particles */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(10,200,185,0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"></div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 text-center">
                <div ref={textRef} className="max-w-5xl mx-auto space-y-8 flex flex-col items-center perspective-1000">

                    {/* Wild Rift Eyebrow Badge */}
                    <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-md glow-cyan-sm">
                        <Sparkles size={14} className="text-primary animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Wild Rift Elite Hub</span>
                    </div>

                    {/* Wild Rift Championship Headline */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading tracking-tighter text-foreground drop-shadow-2xl leading-[0.9]">
                        ELEVATE <br />
                        <span className="wildrift-gradient-text bg-300% animate-gradient">
                            YOUR GAME
                        </span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium md:px-8">
                        Unlock premium accounts, elite services, and join a thriving ecosystem of <span className="text-foreground font-semibold">10,000+ legends</span>.
                    </p>

                    {/* Wild Rift Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 w-full">
                        <button
                            onClick={() => scrollToSection('products')}
                            className="relative group w-full sm:w-auto px-8 py-4 bg-[#C89B3C] text-black text-lg font-bold rounded-xl overflow-hidden transition-all hover:scale-105 glow-gold"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37] to-[#C89B3C] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <span className="relative flex items-center justify-center space-x-2">
                                <span>START BROWSING</span>
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>

                        <a
                            href="https://discord.gg/drMJmxUVP"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-primary text-foreground text-lg font-semibold rounded-xl hover:bg-primary/10 transition-all hover:scale-105 flex items-center justify-center space-x-2 group glow-cyan-sm"
                        >
                            <Users size={20} className="group-hover:text-primary transition-colors" />
                            <span className="group-hover:text-primary transition-colors">JOIN DISCORD</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50 animate-bounce">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
                <div className="w-5 h-9 border-2 border-foreground/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-foreground/50 rounded-full animate-scroll-down"></div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
