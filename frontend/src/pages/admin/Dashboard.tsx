import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Calendar, TrendingUp, Award } from 'lucide-react';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface DashboardStats {
    totalProducts: number;
    activeProducts: number;
    totalEvents: number;
    upcomingEvents: number;
}

const Dashboard = () => {
    const [stats, setStats] = useState<DashboardStats>({
        totalProducts: 0,
        activeProducts: 0,
        totalEvents: 0,
        upcomingEvents: 0,
    });
    const [loading, setLoading] = useState(true);
    const statsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // Fetch products
            const productsRes = await axios.get('http://localhost:5000/api/products');
            const products = productsRes.data;
            const activeProducts = products.filter((p: any) => p.isActive).length;

            // Fetch events
            const eventsRes = await axios.get('http://localhost:5000/api/events');
            const events = eventsRes.data;
            const upcomingEvents = events.filter((e: any) =>
                new Date(e.date) > new Date()
            ).length;

            setStats({
                totalProducts: products.length,
                activeProducts,
                totalEvents: events.length,
                upcomingEvents,
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    // GSAP Animations
    useGSAP(() => {
        if (!loading) {
            gsap.from('.stat-card', {
                y: 30,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
            });
        }
    }, [loading]);

    const statCards = [
        {
            icon: ShoppingBag,
            label: 'Total Products',
            value: stats.totalProducts,
            subtext: `${stats.activeProducts} active`,
            color: 'cyan',
            bgGradient: 'from-[#0AC8B9]/10 to-[#0AC8B9]/5',
        },
        {
            icon: Calendar,
            label: 'Total Events',
            value: stats.totalEvents,
            subtext: `${stats.upcomingEvents} upcoming`,
            color: 'gold',
            bgGradient: 'from-[#C89B3C]/10 to-[#C89B3C]/5',
        },
        {
            icon: Award,
            label: 'Community Rank',
            value: '#1',
            subtext: 'Wild Rift Elite',
            color: 'purple',
            bgGradient: 'from-[#C93AA3]/10 to-[#C93AA3]/5',
        },
        {
            icon: TrendingUp,
            label: 'Growth',
            value: '+24%',
            subtext: 'This month',
            color: 'cyan',
            bgGradient: 'from-[#0AC8B9]/10 to-[#0AC8B9]/5',
        },
    ];

    const getColorClass = (color: string) => {
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

    const getBorderClass = (color: string) => {
        switch (color) {
            case 'cyan':
                return 'border-primary/30 hover:border-primary/60';
            case 'gold':
                return 'border-[#C89B3C]/30 hover:border-[#C89B3C]/60';
            case 'purple':
                return 'border-[#C93AA3]/30 hover:border-[#C93AA3]/60';
            default:
                return 'border-primary/30 hover:border-primary/60';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
                    <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2">
                    Admin <span className="wildrift-gradient-text">Dashboard</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Welcome back to the Nova Community admin panel
                </p>
            </div>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div
                            key={card.label}
                            className={`stat-card group relative bg-gradient-to-br ${card.bgGradient} backdrop-blur-md border-2 ${getBorderClass(card.color)} rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-background/50 ${getColorClass(card.color)}`}>
                                    <Icon size={28} strokeWidth={2} />
                                </div>
                            </div>

                            {/* Value */}
                            <div className={`text-4xl md:text-5xl font-black font-heading mb-2 ${getColorClass(card.color)}`}>
                                {card.value}
                            </div>

                            {/* Label */}
                            <div className="text-foreground font-semibold mb-1">
                                {card.label}
                            </div>

                            {/* Subtext */}
                            <div className="text-muted-foreground text-sm">
                                {card.subtext}
                            </div>

                            {/* Hover glow */}
                            <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${card.color === 'cyan' ? 'bg-primary/5' :
                                card.color === 'gold' ? 'bg-[#C89B3C]/5' :
                                    'bg-[#C93AA3]/5'
                                }`}></div>
                        </div>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card/40 border-2 border-primary/20 rounded-xl p-6">
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                        <ShoppingBag className="text-primary" />
                        <span>Manage Products</span>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        Add, edit, or remove products from your store
                    </p>
                    <a
                        href="/admin/products"
                        className="inline-flex items-center px-6 py-3 bg-[#C89B3C] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-colors"
                    >
                        Go to Products
                    </a>
                </div>

                <div className="bg-card/40 border-2 border-[#C89B3C]/20 rounded-xl p-6">
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                        <Calendar className="text-[#C89B3C]" />
                        <span>Manage Events</span>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        Create and manage community events
                    </p>
                    <a
                        href="/admin/events"
                        className="inline-flex items-center px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-colors"
                    >
                        Go to Events
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
