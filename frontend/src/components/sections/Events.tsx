import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    image: string;
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/api/events?activeOnly=true');
                setEvents(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    useGSAP(() => {
        if (events.length > 0 && containerRef.current) {
            // Set initial visibility to ensure events are always visible
            gsap.set('.event-card', { opacity: 1, y: 0 });

            // Then animate from hidden to visible (progressive enhancement)
            gsap.fromTo('.event-card',
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 80%',
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: 'power3.out',
                }
            );
        }
    }, [events]);

    if (loading || events.length === 0) {
        return null;
    }

    return (
        <section ref={containerRef} className="py-20 bg-background relative z-10 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div className="space-y-4">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                            <Calendar size={14} className="text-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-primary">Upcoming Events</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold font-heading">
                            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-primary">Happenings</span>
                        </h2>
                    </div>

                    <button className="group flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                        <span className="text-sm font-semibold uppercase tracking-widest">View All Events</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        <div
                            key={event._id}
                            className="event-card group relative bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_rgba(var(--primary-rgb),0.3)]"
                        >
                            {/* Image Section */}
                            <div className="h-56 relative overflow-hidden">
                                {event.image ? (
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
                                        <Calendar size={48} className="text-muted-foreground/20" />
                                    </div>
                                )}

                                {/* Date Overlay */}
                                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10 flex flex-col items-center min-w-[60px]">
                                    <span className="text-xs font-bold uppercase text-muted-foreground">
                                        {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                    </span>
                                    <span className="text-2xl font-bold text-primary font-heading leading-none">
                                        {new Date(event.date).getDate()}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 space-y-4">
                                <h3 className="text-2xl font-bold text-foreground font-heading group-hover:text-primary transition-colors">
                                    {event.title}
                                </h3>

                                <p className="text-muted-foreground text-sm line-clamp-3">
                                    {event.description}
                                </p>

                                <div className="pt-4 flex items-center space-x-4 text-sm text-muted-foreground border-t border-white/5">
                                    <div className="flex items-center space-x-2">
                                        <Clock size={16} className="text-primary" />
                                        <span>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Events;
