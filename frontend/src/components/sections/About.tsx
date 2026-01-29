import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const About = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from('.about-content', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 70%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="py-24 bg-background relative z-10 overflow-hidden">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-0 w-1/2 h-full bg-purple-500/5 blur-[120px] pointer-events-none -translate-y-1/2"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8 about-content">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading leading-tight">
                            More Than Just a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Community</span>
                        </h2>

                        <div className="space-y-4 text-lg text-muted-foreground">
                            <p>
                                At Nova Community, we are dedicated to providing the ultimate gaming experience.
                                Specializing in <span className="text-foreground font-semibold">Wild Rift</span>, we offer everything from
                                premium accounts to professional boosting services.
                            </p>
                            <p>
                                Our mission is to create a safe, reliable, and engaging ecosystem for gamers worldwide.
                                With a focus on security and customer satisfaction, we've built a reputation as a
                                trusted leader in the digital services market.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="px-6 py-4 bg-card border border-white/5 rounded-2xl text-center min-w-[140px]">
                                <span className="block text-3xl font-bold text-primary font-heading">10K+</span>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">Members</span>
                            </div>
                            <div className="px-6 py-4 bg-card border border-white/5 rounded-2xl text-center min-w-[140px]">
                                <span className="block text-3xl font-bold text-primary font-heading">5K+</span>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground">Orders</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative about-content">
                        {/* Abstract Visual Rep */}
                        <div className="relative z-10 bg-card/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl skew-y-3 hover:skew-y-2 transition-transform duration-500">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl pointer-events-none"></div>
                            <div className="space-y-6">
                                <div className="h-4 w-1/3 bg-white/10 rounded-full"></div>
                                <div className="space-y-2">
                                    <div className="h-2 w-full bg-white/5 rounded-full"></div>
                                    <div className="h-2 w-4/5 bg-white/5 rounded-full"></div>
                                    <div className="h-2 w-5/6 bg-white/5 rounded-full"></div>
                                </div>
                                <div className="h-32 w-full bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                                    <span className="font-heading text-2xl font-bold text-primary opacity-50">NOVA</span>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[80px] -z-10 rounded-full animate-pulse-slow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
