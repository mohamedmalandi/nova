import { useState, useRef } from 'react';
import { ShieldCheck, Truck, Clock, Plus, Minus } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const TrustFAQ = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useGSAP(() => {
        gsap.from('.trust-card', {
            scrollTrigger: {
                trigger: '#trust-section',
                start: 'top 80%',
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: 'power2.out',
        });
    }, { scope: containerRef });

    const faqs = [
        {
            question: "How fast is the delivery?",
            answer: "Most orders are processed instantly or within 15 minutes. For specific services, delivery times may vary but we prioritize speed.",
        },
        {
            question: "Is my account data safe?",
            answer: "Absolutely. We use industry-standard encryption and security protocols to ensure your data and account details remain confidential and secure.",
        },
        {
            question: "Do you offer refunds?",
            answer: "Refunds are processed on a case-by-case basis. If we cannot fulfill your service or if there's an issue on our end, a full refund is guaranteed.",
        },
        {
            question: "How can I join the community?",
            answer: "Simply click the 'Join Community' button in the navigation or hero section to join our Discord server. We have over 10,000 active members!",
        },
    ];

    return (
        <section ref={containerRef} className="py-20 bg-background relative z-10">
            {/* Trust Badges */}
            <div id="trust-section" className="container mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="trust-card p-8 bg-card/50 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-primary/50 transition-colors group">
                        <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                            <Truck size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-heading">Instant Delivery</h3>
                        <p className="text-muted-foreground text-sm">Get your accounts and services delivered immediately after purchase.</p>
                    </div>

                    <div className="trust-card p-8 bg-card/50 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-primary/50 transition-colors group">
                        <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-heading">Secure Payments</h3>
                        <p className="text-muted-foreground text-sm">Your transactions are protected with top-tier security measures.</p>
                    </div>

                    <div className="trust-card p-8 bg-card/50 border border-white/5 rounded-2xl flex flex-col items-center text-center space-y-4 hover:border-primary/50 transition-colors group">
                        <div className="p-4 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                            <Clock size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-heading">24/7 Support</h3>
                        <p className="text-muted-foreground text-sm">Our dedicated support team is available around the clock to assist you.</p>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading">Frequently Asked <span className="text-primary">Questions</span></h2>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border rounded-xl transition-all duration-300 overflow-hidden ${openIndex === index ? 'bg-card border-primary/50 shadow-[0_0_20px_-5px_rgba(var(--primary-rgb),0.2)]' : 'bg-card/30 border-white/5 hover:bg-card/50'
                                }`}
                        >
                            <button
                                className="w-full px-6 py-4 flex justify-between items-center text-left"
                                onClick={() => setOpenIndex(prev => prev === index ? null : index)}
                            >
                                <span className={`font-semibold text-lg transition-colors ${openIndex === index ? 'text-primary' : 'text-foreground'}`}>
                                    {faq.question}
                                </span>
                                {openIndex === index ? <Minus size={20} className="text-primary" /> : <Plus size={20} className="text-muted-foreground" />}
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out`}
                                style={{ maxHeight: openIndex === index ? '200px' : '0px', opacity: openIndex === index ? 1 : 0 }}
                            >
                                <div className="pb-6 text-muted-foreground">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustFAQ;
