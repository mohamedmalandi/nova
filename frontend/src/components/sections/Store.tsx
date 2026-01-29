import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { ShoppingBag, Loader2 } from 'lucide-react';
import API_URL from '../../config/api';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface Product {
    _id: string;
    name: string;
    type: 'item' | 'service';
    category: string;
    price: number;
    description: string;
    image: string;
    options?: Record<string, string[]>;
}

interface StoreProps {
    onOrderClick: (product: Product) => void;
}

const Store = ({ onOrderClick }: StoreProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    const categories = ['keys', 'skins', 'wild-pass', 'coaching', 'boosting'];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/products?activeOnly=true`);
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useGSAP(() => {
        if (!loading) {
            gsap.fromTo('.product-section',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' }
            );
        }
    }, [loading]);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[50vh]">
                <Loader2 className="animate-spin text-primary" size={48} />
            </div>
        );
    }

    const formatCategoryTitle = (cat: string) => {
        return cat.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <section ref={containerRef} className="py-20 bg-background relative z-10">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading">
                        Our <span className="wildrift-gradient-text">Store</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Browse our collection of premium accounts and services.
                    </p>
                </div>

                <div className="space-y-20">
                    {categories.map((category) => {
                        const categoryProducts = products.filter(p => p.category === category);

                        if (categoryProducts.length === 0) return null;

                        return (
                            <div key={category} className="product-section">
                                <h3 className="text-2xl font-bold font-heading mb-8 capitalize border-l-4 border-primary pl-4 text-[#C89B3C] glow-gold-sm">
                                    {formatCategoryTitle(category)}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {categoryProducts.map((product) => (
                                        <div
                                            key={product._id}
                                            className="product-card group relative bg-card/50 border-2 border-primary/20 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 glow-cyan-sm hover:glow-cyan flex flex-col"
                                        >
                                            {/* Image Placeholder */}
                                            <div className="h-48 bg-secondary/30 relative overflow-hidden group-hover:bg-secondary/50 transition-colors">
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-muted-foreground/30">
                                                        <ShoppingBag size={48} />
                                                    </div>
                                                )}

                                                {/* Price Tag - Wild Rift Style */}
                                                {product.type === 'item' && (
                                                    <div className="absolute top-4 right-4 bg-[#C89B3C] backdrop-blur-md px-4 py-2 rounded-lg font-bold font-heading shadow-xl text-black glow-gold-sm">
                                                        ${product.price}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="p-6 space-y-4 flex-1 flex flex-col">
                                                <div>
                                                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                                        {product.name}
                                                    </h3>
                                                </div>

                                                <p className="text-muted-foreground text-sm line-clamp-2 flex-1">
                                                    {product.description}
                                                </p>

                                                <button
                                                    onClick={() => onOrderClick(product)}
                                                    className="w-full py-3 bg-[#C89B3C]/10 hover:bg-[#C89B3C] hover:text-black border-2 border-[#C89B3C]/30 hover:border-[#C89B3C] text-[#C89B3C] hover:text-black font-bold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 glow-gold-sm"
                                                >
                                                    <ShoppingBag size={18} />
                                                    <span>Order Now</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Store;
