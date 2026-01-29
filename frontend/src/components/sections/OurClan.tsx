import { useRef, useState, useEffect } from 'react';
import { Users, Trophy, Award, Target, TrendingUp, Shield, Heart } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const OurClan = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    // Animated counter state
    const [membersCount, setMembersCount] = useState(0);
    const [tournamentsCount, setTournamentsCount] = useState(0);
    const [rankCount, setRankCount] = useState(0);

    // Statistics data (memoized to prevent re-creation)
    const stats = [
        { icon: Users, label: 'Members', value: 500, suffix: '+', color: 'cyan' },
        { icon: Trophy, label: 'Tournaments', value: 50, suffix: '+', color: 'gold' },
        { icon: Award, label: 'Community Rank', value: 1, suffix: '', prefix: '#', color: 'purple' },
    ];

    // Features data (memoized to prevent re-creation)
    const features = [
        {
            icon: Shield,
            title: 'Leadership',
            description: 'Strong leadership guiding members to victory',
            color: 'cyan'
        },
        {
            icon: Target,
            title: 'Competitive Edge',
            description: 'Always striving to be the best in every match',
            color: 'gold'
        },
        {
            icon: TrendingUp,
            title: 'Growth Focused',
            description: 'Continuous improvement and skill development',
            color: 'purple'
        },
        {
            icon: Heart,
            title: 'Unity',
            description: 'Together we stand, divided we fall',
            color: 'cyan'
        },
    ];

    // Optimized animated counter effect using GSAP
    useEffect(() => {
        if (hasAnimated.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;

                        // Animate counters with GSAP for smooth performance
                        gsap.to({ val: 0 }, {
                            val: 500,
                            duration: 2,
                            ease: 'power2.out',
                            onUpdate: function () {
                                setMembersCount(Math.floor(this.targets()[0].val));
                            }
                        });

                        gsap.to({ val: 0 }, {
                            val: 50,
                            duration: 1.8,
                            ease: 'power2.out',
                            onUpdate: function () {
                                setTournamentsCount(Math.floor(this.targets()[0].val));
                            }
                        });

                        gsap.to({ val: 0 }, {
                            val: 1,
                            duration: 1,
                            ease: 'power2.out',
                            onUpdate: function () {
                                setRankCount(Math.floor(this.targets()[0].val));
                            }
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // GSAP Scroll Animations - Optimized without opacity to prevent hidden cards
    useGSAP(() => {
        // Heading animation
        gsap.from('.clan-heading', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
            },
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
        });

        // Stats cards stagger animation - position only
        gsap.from('.stat-card', {
            scrollTrigger: {
                trigger: statsRef.current,
                start: 'top 80%',
                once: true,
            },
            y: 40,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
        });

        // Features cards stagger animation - position only
        gsap.from('.feature-card', {
            scrollTrigger: {
                trigger: featuresRef.current,
                start: 'top 80%',
                once: true,
            },
            y: 30,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
        });
    }, []);

    const getColorClass = (color: string) => {
        switch (color) {
            case 'cyan':
                return 'border-primary/30 hover:border-primary/60 glow-cyan-sm hover:glow-cyan';
            case 'gold':
                return 'border-[#C89B3C]/30 hover:border-[#C89B3C]/60 glow-gold-sm hover:glow-gold';
            case 'purple':
                return 'border-[#C93AA3]/30 hover:border-[#C93AA3]/60';
            default:
                return 'border-primary/30 hover:border-primary/60';
        }
    };

    const getIconColorClass = (color: string) => {
        switch (color) {
            case 'cyan':
                return 'text-primary';
            case 'gold':
                return 'text-[#C89B3C]';
            case 'purple':
                return 'text-[#C93AA3]';
            default:
                return 'text-primary';
        }
    };

    return (
        <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Hextech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(10,200,185,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,200,185,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/3 left-1/4 w-[25rem] h-[25rem] bg-[#0AC8B9]/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-[#C89B3C]/10 rounded-full blur-[130px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-6 clan-heading">
                    {/* Badge */}
                    <div className="inline-flex">
                        <div className="px-6 py-2 border-2 border-purple-500/30 rounded-full">
                            <p className="text-sm uppercase tracking-[0.3em] text-purple-400 font-semibold">
                                OUR CLAN
                            </p>
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                            Noe Empire
                        </span>
                    </h2>

                    <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
                        Noe Empire is the competitive arm of Nova Community. We are a dedicated clan of elite Wild Rift players who believe in the power of teamwork, strategy, and relentless improvement. Whether you're a seasoned veteran or a rising star, Noe Empire offers a structured environment to grow, compete, and dominate the Rift. Join us and become part of something legendary.
                    </p>
                </div>

                {/* Statistics Grid */}
                <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        const displayValue = index === 0 ? membersCount : index === 1 ? tournamentsCount : rankCount;

                        return (
                            <div
                                key={stat.label}
                                className={`stat-card group relative bg-card/40 backdrop-blur-md border-2 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${getColorClass(stat.color)}`}
                            >
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <div className={`p-4 rounded-full bg-background/50 ${getIconColorClass(stat.color)}`}>
                                        <Icon size={40} strokeWidth={2} />
                                    </div>
                                </div>

                                {/* Value */}
                                <div className={`text-5xl md:text-6xl font-black font-heading mb-2 ${getIconColorClass(stat.color)}`}>
                                    {stat.prefix || ''}{displayValue}{stat.suffix || ''}
                                </div>

                                {/* Label */}
                                <div className="text-muted-foreground font-medium uppercase tracking-wider text-sm">
                                    {stat.label}
                                </div>

                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${stat.color === 'cyan' ? 'bg-primary/5' : stat.color === 'gold' ? 'bg-[#C89B3C]/5' : 'bg-[#C93AA3]/5'}`}></div>
                            </div>
                        );
                    })}
                </div>

                {/* Features Grid */}
                <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className={`feature-card group relative bg-card/40 backdrop-blur-md border-2 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1 ${getColorClass(feature.color)}`}
                            >
                                {/* Icon */}
                                <div className="mb-4">
                                    <div className={`inline-flex p-3 rounded-lg bg-background/50 ${getIconColorClass(feature.color)}`}>
                                        <Icon size={28} strokeWidth={2} />
                                    </div>
                                </div>

                                {/* Title */}
                                <h4 className={`text-xl font-bold mb-2 ${getIconColorClass(feature.color)}`}>
                                    {feature.title}
                                </h4>

                                {/* Description */}
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Glow effect on hover */}
                                <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.color === 'cyan' ? 'bg-primary/5' : feature.color === 'gold' ? 'bg-[#C89B3C]/5' : 'bg-[#C93AA3]/5'}`}></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OurClan;
