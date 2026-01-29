import { MessageCircle, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-background relative overflow-hidden">
            {/* CTA Section */}
            <div className="relative py-24">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    {/* Hextech Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(10,200,185,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(10,200,185,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>

                    {/* Glowing Orbs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[120px]"></div>
                    <div className="absolute top-1/3 right-1/4 w-[25rem] h-[25rem] bg-purple-500/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center space-y-8">
                        {/* Small Title */}
                        <p className="text-sm uppercase tracking-[0.3em] text-[#C93AA3] font-semibold">
                            READY TO DOMINATE?
                        </p>

                        {/* Main Heading */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight">
                            Become Part of{' '}
                            <span className="wildrift-gradient-text">Nova</span>
                        </h2>

                        {/* Subheading */}
                        <p className="text-2xl md:text-3xl font-bold">
                            Join <span className="text-[#C93AA3]">Noe Empire</span> Today
                        </p>

                        {/* Description */}
                        <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                            Take your Wild Rift journey to the next level. Join a community of passionate
                            players, compete in tournaments, and make lasting friendships.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <a
                                href="https://discord.gg/drMJmxUVP"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center space-x-3 px-8 py-4 bg-[#5865F2] text-white text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] min-w-[220px] justify-center"
                            >
                                <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                                <span>JOIN DISCORD</span>
                            </a>

                            <a
                                href="https://chat.whatsapp.com/DyrRbWN4KaO92jdepbBydX"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center space-x-3 px-8 py-4 bg-[#25D366] text-white text-lg font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] min-w-[220px] justify-center"
                            >
                                <Phone size={24} className="group-hover:scale-110 transition-transform" />
                                <span>JOIN WHATSAPP</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bar */}
            <div className="border-t border-white/10 bg-card/30 backdrop-blur-sm">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p className="flex items-center space-x-2">
                            <span className="text-primary font-bold">NOVA</span>
                            <span className="text-white/50">|</span>
                            <span>Wild Rift Elite Gaming Hub</span>
                        </p>
                        <p>
                            © {new Date().getFullYear()} Nova Community. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
