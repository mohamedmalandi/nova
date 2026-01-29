import { useRef } from 'react';
import { MessageCircle, Phone, Instagram, Facebook } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SocialPlatforms = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    // Social platforms data
    const platforms = [
        {
            name: 'Discord',
            icon: MessageCircle,
            description: 'Join our main hub for events & chat',
            color: '#5865F2',
            bgGradient: 'from-[#5865F2]/20 to-[#5865F2]/5',
            link: 'https://discord.gg/drMJmxUVP'
        },
        {
            name: 'WhatsApp',
            icon: Phone,
            description: 'Quick updates & team coordination',
            color: '#25D366',
            bgGradient: 'from-[#25D366]/20 to-[#25D366]/5',
            link: 'https://chat.whatsapp.com/DyrRbWN4KaO92jdepbBydX'
        },
        {
            name: 'Instagram',
            icon: Instagram,
            description: 'Highlights, clips & community moments',
            color: '#E4405F',
            bgGradient: 'from-[#E4405F]/20 to-[#E4405F]/5',
            link: 'https://www.instagram.com/n0vac0mmunity?igsh=MWMyd2hxYmJ6ZWMwdQ=='
        },
        {
            name: 'Facebook',
            icon: Facebook,
            description: 'Community updates & announcements',
            color: '#1877F2',
            bgGradient: 'from-[#1877F2]/20 to-[#1877F2]/5',
            link: 'https://www.facebook.com/profile.php?id=61584200132298&mibextid=wwXIfr'
        }
    ];

    // GSAP Scroll Animations
    useGSAP(() => {
        // Heading animation
        gsap.from('.social-heading', {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
            },
            y: 30,
            duration: 0.8,
            ease: 'power2.out',
        });

        // Cards stagger animation
        gsap.from('.social-card', {
            scrollTrigger: {
                trigger: cardsRef.current,
                start: 'top 80%',
                once: true,
            },
            y: 40,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
        });
    }, []);

    return (
        <section ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Hextech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(10,200,185,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,200,185,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

                {/* Glowing Orbs */}
                <div className="absolute top-1/2 left-1/3 w-[20rem] h-[20rem] bg-primary/10 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-1/2 right-1/3 w-[25rem] h-[25rem] bg-purple-500/10 rounded-full blur-[110px]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4 social-heading">
                    <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold">
                        CONNECT WITH US
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading">
                        Join Our <span className="wildrift-gradient-text">Platforms</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        Stay connected with the Nova Community across all our social platforms
                    </p>
                </div>

                {/* Social Platforms Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {platforms.map((platform) => {
                        const Icon = platform.icon;

                        return (
                            <a
                                key={platform.name}
                                href={platform.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-card group relative bg-card/40 backdrop-blur-md border-2 border-white/10 rounded-2xl p-8 text-center transition-all duration-300 hover:scale-105 hover:-translate-y-2 hover:border-white/30"
                            >
                                {/* Gradient Background on Hover */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${platform.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                {/* Content */}
                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="flex justify-center mb-6">
                                        <div
                                            className="p-5 rounded-2xl transition-all duration-300 group-hover:scale-110"
                                            style={{ backgroundColor: platform.color }}
                                        >
                                            <Icon size={32} strokeWidth={2} className="text-white" />
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-xl font-bold mb-3" style={{ color: platform.color }}>
                                        {platform.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {platform.description}
                                    </p>
                                </div>

                                {/* Glow effect on hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"
                                    style={{ backgroundColor: platform.color }}
                                ></div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SocialPlatforms;
