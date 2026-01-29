import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';

interface Product {
    _id?: string;
    name: string;
    type: 'item' | 'service';
    category: string;
    price: number;
    description: string;
    image: string;
    options?: Record<string, string[]>;
}

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product?: Product | null;
    onSave: (product: Product) => Promise<void>;
}

const ProductModal = ({ isOpen, onClose, product, onSave }: ProductModalProps) => {
    const [formData, setFormData] = useState<Product>({
        name: '',
        type: 'item',
        category: 'keys',
        price: 0,
        description: '',
        image: ''
    });
    const [optionsJson, setOptionsJson] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (product) {
            setFormData(product);
            setOptionsJson(product.options ? JSON.stringify(product.options, null, 2) : '');
        } else {
            setFormData({
                name: '',
                type: 'item',
                category: 'keys',
                price: 0,
                description: '',
                image: ''
            });
            setOptionsJson('');
        }
    }, [product, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataToSave = { ...formData };
            if (optionsJson.trim()) {
                try {
                    dataToSave.options = JSON.parse(optionsJson);
                } catch (err) {
                    alert('Invalid JSON format for Options');
                    setLoading(false);
                    return;
                }
            } else {
                delete dataToSave.options;
            }

            await onSave(dataToSave);
            onClose();
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-card border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/5">
                    <h3 className="text-xl font-bold font-heading">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h3>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto custom-scrollbar">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Product Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none"
                                    placeholder="e.g. Wild Core Key 500"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Price ($)</label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                                    className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none"
                                    min="0"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Type</label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'item' | 'service' })}
                                    className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none cursor-pointer"
                                >
                                    <option value="item">Item</option>
                                    <option value="service">Service</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none cursor-pointer"
                                >
                                    <option value="keys">Keys</option>
                                    <option value="skins">Skins</option>
                                    <option value="wild-pass">Wild Pass</option>
                                    <option value="coaching">Coaching</option>
                                    <option value="boosting">Boosting</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Image URL</label>
                            <input
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none min-h-[100px]"
                                placeholder="Product details..."
                                required
                            />
                        </div>

                        {formData.type === 'service' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    Options (JSON Format)
                                    <span className="text-xs text-muted-foreground ml-2">e.g. {"{\"duration\": [\"1h\", \"2h\"]}"}</span>
                                </label>
                                <textarea
                                    value={optionsJson}
                                    onChange={(e) => setOptionsJson(e.target.value)}
                                    className="w-full bg-secondary/30 border border-white/10 rounded-xl px-4 py-3 focus:border-primary/50 focus:outline-none font-mono text-sm min-h-[100px]"
                                    placeholder='{ "rank": ["Iron", "Bronze"], "server": ["EU", "NA"] }'
                                />
                            </div>
                        )}

                        <div className="pt-4 border-t border-white/5 flex justify-end gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                                <span>Save Product</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
