import { useState, useEffect, useRef } from 'react';
import { Calendar, Edit, Trash2, Plus, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    image?: string;
    isActive: boolean;
}

const Events = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        time: '',
        image: '',
        isActive: true,
    });

    const tableRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/events');
            setEvents(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching events:', error);
            setLoading(false);
        }
    };

    // GSAP Animations
    useGSAP(() => {
        if (!loading && events.length > 0) {
            gsap.from('.event-row', {
                y: 20,
                duration: 0.4,
                stagger: 0.08,
                ease: 'power2.out',
            });
        }
    }, [loading, events]);

    // Modal animation
    useGSAP(() => {
        if (isModalOpen && modalRef.current) {
            gsap.fromTo(
                modalRef.current,
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
            );
        }
    }, [isModalOpen]);

    const handleCreateEdit = () => {
        setIsModalOpen(true);
    };

    const handleEdit = (event: Event) => {
        setEditingEvent(event);
        const eventDate = new Date(event.date);
        const dateStr = event.date.split('T')[0];
        const timeStr = eventDate.toTimeString().slice(0, 5); // HH:MM format

        setFormData({
            title: event.title,
            description: event.description,
            date: dateStr,
            time: timeStr,
            image: event.image || '',
            isActive: event.isActive,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        try {
            const token = localStorage.getItem('novaToken');
            await axios.delete(`http://localhost:5000/api/events/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            fetchEvents();
        } catch (error) {
            console.error('Error deleting event:', error);
            alert('Failed to delete event');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('novaToken');
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            // Combine date and time into a single datetime string
            const dateTimeString = formData.time
                ? `${formData.date}T${formData.time}:00`
                : `${formData.date}T00:00:00`;

            const eventData = {
                title: formData.title,
                description: formData.description,
                date: dateTimeString,
                image: formData.image,
                isActive: formData.isActive,
            };

            if (editingEvent) {
                // Update existing event
                await axios.put(
                    `http://localhost:5000/api/events/${editingEvent._id}`,
                    eventData,
                    config
                );
            } else {
                // Create new event
                await axios.post('http://localhost:5000/api/events', eventData, config);
            }

            // Reset and refresh
            setIsModalOpen(false);
            setEditingEvent(null);
            setFormData({ title: '', description: '', date: '', time: '', image: '', isActive: true });
            fetchEvents();
        } catch (error) {
            console.error('Error saving event:', error);
            alert('Failed to save event');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEvent(null);
        setFormData({ title: '', description: '', date: '', time: '', image: '', isActive: true });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="text-center">
                    <Loader2 className="inline-block animate-spin text-primary" size={48} />
                    <p className="mt-4 text-muted-foreground">Loading events...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading mb-2">
                        Manage <span className="wildrift-gradient-text">Events</span>
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Create and manage community events
                    </p>
                </div>
                <button
                    onClick={handleCreateEdit}
                    className="flex items-center space-x-2 px-6 py-3 bg-[#C89B3C] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-all hover:scale-105 glow-gold-sm"
                >
                    <Plus size={20} />
                    <span>Add Event</span>
                </button>
            </div>

            {/* Events Table/Grid */}
            {events.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Calendar size={64} className="text-muted-foreground mb-4" />
                    <h3 className="text-2xl font-bold mb-2">No events yet</h3>
                    <p className="text-muted-foreground mb-6">Add your first event to get started</p>
                    <button
                        onClick={handleCreateEdit}
                        className="flex items-center space-x-2 px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/80 transition-all"
                    >
                        <Plus size={20} />
                        <span>Create Event</span>
                    </button>
                </div>
            ) : (
                <div ref={tableRef} className="space-y-4">
                    {/* Desktop Table */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-primary/30">
                                    <th className="text-left p-4 font-bold text-[#C89B3C]">Title</th>
                                    <th className="text-left p-4 font-bold text-[#C89B3C]">Description</th>
                                    <th className="text-left p-4 font-bold text-[#C89B3C]">Date</th>
                                    <th className="text-left p-4 font-bold text-[#C89B3C]">Status</th>
                                    <th className="text-right p-4 font-bold text-[#C89B3C]">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {events.map((event) => (
                                    <tr
                                        key={event._id}
                                        className="event-row border-b border-white/5 hover:bg-card/20 transition-colors"
                                    >
                                        <td className="p-4 font-semibold">{event.title}</td>
                                        <td className="p-4 text-muted-foreground max-w-md truncate">
                                            {event.description}
                                        </td>
                                        <td className="p-4">{new Date(event.date).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${event.isActive
                                                    ? 'bg-primary/20 text-primary'
                                                    : 'bg-muted/20 text-muted-foreground'
                                                    }`}
                                            >
                                                {event.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button
                                                onClick={() => handleEdit(event)}
                                                className="inline-flex items-center space-x-1 px-3 py-2 mr-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-all"
                                            >
                                                <Edit size={16} />
                                                <span className="text-sm">Edit</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(event._id)}
                                                className="inline-flex items-center space-x-1 px-3 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-all"
                                            >
                                                <Trash2 size={16} />
                                                <span className="text-sm">Delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Cards */}
                    <div className="md:hidden space-y-4">
                        {events.map((event) => (
                            <div
                                key={event._id}
                                className="event-row bg-card/40 border-2 border-primary/20 rounded-xl p-4 space-y-3"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-xl">{event.title}</h3>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${event.isActive
                                            ? 'bg-primary/20 text-primary'
                                            : 'bg-muted/20 text-muted-foreground'
                                            }`}
                                    >
                                        {event.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </div>
                                <p className="text-muted-foreground text-sm">{event.description}</p>
                                <p className="text-sm">
                                    <span className="text-[#C89B3C] font-semibold">Date:</span>{' '}
                                    {new Date(event.date).toLocaleDateString()}
                                </p>
                                <div className="flex space-x-2 pt-2">
                                    <button
                                        onClick={() => handleEdit(event)}
                                        className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg transition-all"
                                    >
                                        <Edit size={16} />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(event._id)}
                                        className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition-all"
                                    >
                                        <Trash2 size={16} />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div
                        ref={modalRef}
                        className="bg-card border-2 border-primary/30 rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    >
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-bold">
                                {editingEvent ? 'Edit' : 'Create'} <span className="wildrift-gradient-text">Event</span>
                            </h2>
                            <button
                                onClick={closeModal}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold mb-2">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-4 py-3 bg-background border-2 border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-background border-2 border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full px-4 py-3 bg-background border-2 border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Time</label>
                                <input
                                    type="time"
                                    value={formData.time}
                                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                    className="w-full px-4 py-3 bg-background border-2 border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                    placeholder="00:00"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-2">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.image}
                                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                    placeholder="https://example.com/image.jpg"
                                    className="w-full px-4 py-3 bg-background border-2 border-white/10 rounded-lg focus:border-primary focus:outline-none transition-colors"
                                />
                            </div>

                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    className="w-5 h-5 rounded border-2 border-white/10 bg-background checked:bg-primary checked:border-primary focus:outline-none cursor-pointer"
                                />
                                <label htmlFor="isActive" className="font-semibold cursor-pointer">
                                    Active Event
                                </label>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 bg-[#C89B3C] text-black font-bold rounded-lg hover:bg-[#D4AF37] transition-all glow-gold-sm"
                                >
                                    {editingEvent ? 'Update' : 'Create'} Event
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Events;
