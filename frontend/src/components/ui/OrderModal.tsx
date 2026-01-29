import { useRef, useState, useEffect } from 'react';
import { X, ShoppingBag, ArrowRight, Minus, Plus, Users } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Product {
    _id: string;
    name: string;
    type: string;
    category: string;
    price: number;
    description: string;
    image: string;
    options?: Record<string, string[]>;
}

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
}

const OrderModal = ({ isOpen, onClose, product }: OrderModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Form State
    const [quantity, setQuantity] = useState(1);
    const [inGameName, setInGameName] = useState('');
    const [clanMember, setClanMember] = useState('');
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

    // Reset state when modal opens/closes or product changes
    useEffect(() => {
        if (isOpen && product) {
            setQuantity(1);
            setInGameName('');
            setClanMember('');

            // Initialize options with first values
            if (product.options) {
                const initialOptions: Record<string, string> = {};
                Object.keys(product.options).forEach(key => {
                    const values = product.options![key];
                    if (values && values.length > 0) {
                        initialOptions[key] = values[0];
                    }
                });
                setSelectedOptions(initialOptions);
            } else {
                setSelectedOptions({});
            }
        }
    }, [isOpen, product]);

    const handleOptionChange = (key: string, value: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const totalPrice = product ? (product.price * quantity).toFixed(2) : '0.00';

    const handleContinue = () => {
        if (!product) return;

        // Validation: Check required fields
        if (!inGameName.trim()) {
            alert('Please enter your In-Game Name');
            return;
        }

        if (!clanMember) {
            alert('Please confirm if you were referred by a clan member');
            return;
        }

        let optionsString = '';
        if (Object.keys(selectedOptions).length > 0) {
            optionsString = Object.entries(selectedOptions)
                .map(([key, value]) => `*${key.charAt(0).toUpperCase() + key.slice(1)}:* ${value}`)
                .join('\n');
        }

        const message = `Hello Nova Community Team,

I would like to place an order with the following details:
---------------------------
*Product:* ${product.name}
*Category:* ${product.category}
*Price:* $${product.price}
*Quantity:* ${quantity}
*Total:* $${totalPrice}
---------------------------
${optionsString ? optionsString + '\n---------------------------\n' : ''}*In-Game Name:* ${inGameName}
*Clan Membership:* ${clanMember === 'yes' ? 'Yes' : 'No'}
---------------------------
Thank you, and I would like to proceed with this payment.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/963992293780?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    useGSAP(() => {
        if (isOpen) {
            // Overlay fade in
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                display: 'block',
                ease: 'power2.out',
            });

            // Modal scale up
            gsap.fromTo(
                modalRef.current,
                { scale: 0.8, opacity: 0, y: 20 },
                { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)', display: 'block' }
            );

            // Content stagger
            gsap.fromTo(
                contentRef.current?.children || [],
                { y: 10, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: 'power2.out' }
            );

        } else {
            // Close animation
            const tl = gsap.timeline({
                onComplete: () => {
                    if (overlayRef.current) overlayRef.current.style.display = 'none';
                    if (modalRef.current) modalRef.current.style.display = 'none';
                }
            });

            tl.to(modalRef.current, {
                scale: 0.9,
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            });

            tl.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
            }, "-=0.2");
        }
    }, [isOpen]);

    if (!product && !isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 hidden opacity-0"
                onClick={onClose}
            ></div>

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <div
                    ref={modalRef}
                    className="bg-card border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl pointer-events-auto hidden opacity-0 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar"
                >
                    {/* Header */}
                    <div className="sticky top-0 z-10 flex justify-between items-center p-6 border-b border-white/5 bg-card/95 backdrop-blur-sm">
                        <h3 className="text-xl font-bold font-heading flex items-center gap-2">
                            <ShoppingBag size={20} className="text-primary" />
                            <span>Place Order</span>
                        </h3>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div ref={contentRef} className="p-6 space-y-6">
                        {product && (
                            <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl border border-white/5">
                                <div className="w-20 h-20 bg-background rounded-lg overflow-hidden flex-shrink-0">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                                            <ShoppingBag size={24} />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg leading-tight">{product.name}</h4>
                                    <p className="text-sm text-muted-foreground">{product.category}</p>
                                    <div className="mt-2 font-heading font-bold text-primary text-xl">${product.price}</div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {/* Dynamic Options */}
                            {product?.options && Object.entries(product.options).map(([key, values]) => (
                                <div key={key} className="space-y-2">
                                    <label className="text-sm font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={selectedOptions[key] || ''}
                                            onChange={(e) => handleOptionChange(key, e.target.value)}
                                            className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 appearance-none focus:border-primary/50 focus:outline-none transition-colors cursor-pointer"
                                        >
                                            {values.map((val) => (
                                                <option key={val} value={val}>{val}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                            <Plus size={14} className="rotate-45" />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Quantity */}
                            <div className="flex items-center justify-between p-3 bg-secondary/20 rounded-lg border border-white/5">
                                <span className="text-sm font-medium">Quantity</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-1 rounded-md hover:bg-white/10 transition-colors disabled:opacity-50"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-bold w-6 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-1 rounded-md hover:bg-white/10 transition-colors"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* In-Game Name */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">In-Game Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={inGameName}
                                    onChange={(e) => setInGameName(e.target.value)}
                                    className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-primary/50 focus:outline-none transition-colors"
                                    placeholder="e.g. Faker#NA1"
                                    required
                                />
                            </div>

                            {/* Referral */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium flex items-center gap-2">
                                    <Users size={14} />
                                    <span>Are you a clan member? <span className="text-red-500">*</span></span>
                                </label>
                                <div className="relative">
                                    <select
                                        value={clanMember}
                                        onChange={(e) => setClanMember(e.target.value)}
                                        className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 appearance-none focus:border-primary/50 focus:outline-none transition-colors cursor-pointer"
                                        required
                                    >
                                        <option value="">Please select</option>
                                        <option value="yes">Yes</option>
                                        <option value="no">No</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                        <Plus size={14} className="rotate-45" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total & Action */}
                        <div className="pt-4 space-y-4 border-t border-white/5">
                            <div className="flex justify-between items-center text-lg">
                                <span className="text-muted-foreground">Total to Pay</span>
                                <span className="font-bold font-heading text-2xl text-primary">${totalPrice}</span>
                            </div>

                            <button
                                onClick={handleContinue}
                                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <span>Order via WhatsApp</span>
                                <ArrowRight size={20} />
                            </button>
                            <p className="text-xs text-center text-muted-foreground">
                                By continuing, you agree to our Terms of Service.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderModal;
