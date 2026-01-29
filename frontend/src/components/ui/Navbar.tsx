import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navRef = useRef<HTMLElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent body scroll when menu is open (mobile)
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Initial animation
    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
        });
    });

    // Mobile menu animation (backdrop + drawer)
    useGSAP(() => {
        if (isMenuOpen) {
            // Show and fade in backdrop
            if (backdropRef.current) {
                gsap.to(backdropRef.current, {
                    opacity: 1,
                    duration: 0.3,
                    ease: 'power2.out',
                    onStart: () => {
                        if (backdropRef.current) {
                            backdropRef.current.style.pointerEvents = 'auto';
                        }
                    }
                });
            }
            // Slide in drawer from right
            if (menuRef.current) {
                gsap.to(menuRef.current, {
                    x: 0,
                    duration: 0.4,
                    ease: 'power2.out',
                    onStart: () => {
                        if (menuRef.current) {
                            menuRef.current.style.pointerEvents = 'auto';
                        }
                    }
                });
            }
        } else {
            // Fade out backdrop
            if (backdropRef.current) {
                gsap.to(backdropRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        if (backdropRef.current) {
                            backdropRef.current.style.pointerEvents = 'none';
                        }
                    }
                });
            }
            // Slide out drawer to right
            if (menuRef.current) {
                gsap.to(menuRef.current, {
                    x: '100%',
                    duration: 0.3,
                    ease: 'power2.in',
                    onComplete: () => {
                        if (menuRef.current) {
                            menuRef.current.style.pointerEvents = 'none';
                        }
                    }
                });
            }
        }
    }, [isMenuOpen]);

    // Smooth scroll to section
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = navRef.current?.offsetHeight || 80;
            const targetPosition = element.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            setIsMenuOpen(false);
        }
    };

    // Links configuration
    const navLinks = [
        { name: 'Home', hash: 'home' },
        { name: 'Events', hash: 'events' },
        { name: 'Products', hash: 'products' },
        { name: 'Community', hash: 'community' },
        { name: 'Our Clan', hash: 'clan' },
    ];

    return (
        <>
            <nav
                ref={navRef}
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-background/80 backdrop-blur-md border-b border-primary/20 py-4'
                    : 'bg-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center">
                    {/* Wild Rift Logo */}
                    <Link to="/" className="text-2xl font-bold font-heading tracking-wider">
                        <span className="wildrift-gradient-text drop-shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]">
                            NOVA
                        </span>{' '}
                        <span className="text-[#C89B3C]">COMMUNITY</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.hash)}
                                className="text-sm font-medium uppercase tracking-widest transition-all duration-200 relative text-foreground/80 hover:text-primary"
                            >
                                {link.name}
                            </button>
                        ))}

                        {/* Admin Icon - Wild Rift Style */}
                        <Link
                            to="/admin/login"
                            className="p-2 rounded-full hover:bg-primary/20 hover:text-primary transition-all duration-200 glow-cyan-sm"
                            title="Admin Login"
                        >
                            <User size={20} />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40 active:scale-95 transition-all duration-200 shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isMenuOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu - Backdrop */}
            <div
                ref={backdropRef}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden opacity-0 pointer-events-none"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Menu - Side Drawer - Wild Rift Style */}
            <div
                ref={menuRef}
                className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-gradient-to-b from-[#0D1B2A] to-[#0A1428] backdrop-blur-xl border-l-2 border-primary/30 shadow-[-10px_0_40px_rgba(10,200,185,0.3)] z-50 flex flex-col justify-center px-8 py-12 space-y-8 md:hidden pointer-events-none"
                style={{ transform: 'translateX(100%)' }}
            >
                {navLinks.map((link) => (
                    <button
                        key={link.name}
                        onClick={() => scrollToSection(link.hash)}
                        className="text-2xl font-bold uppercase tracking-widest hover:text-primary transition-colors text-foreground text-left"
                    >
                        {link.name}
                    </button>
                ))}
                <Link
                    to="/admin/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-xl font-medium uppercase tracking-widest hover:text-primary transition-colors"
                >
                    <User size={24} />
                    <span>Admin Login</span>
                </Link>
            </div>
        </>
    );
};

export default Navbar;
