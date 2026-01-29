import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, Search, Loader2, Eye, EyeOff } from 'lucide-react';
import ProductModal from '../../components/admin/ProductModal';

interface Product {
    _id: string;
    name: string;
    type: 'item' | 'service';
    category: string;
    price: number;
    description: string;
    image: string;
    isActive: boolean;
    options?: Record<string, string[]>;
}

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const token = localStorage.getItem('novaToken');
                await axios.delete(`http://localhost:5000/api/products/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product');
            }
        }
    };

    const handleSave = async (productData: any) => {
        try {
            const token = localStorage.getItem('novaToken');
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            if (editingProduct) {
                await axios.put(`http://localhost:5000/api/products/${editingProduct._id}`, productData, config);
            } else {
                await axios.post('http://localhost:5000/api/products', productData, config);
            }
            fetchProducts();
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
            throw error;
        }
    };

    const toggleVisibility = async (id: string) => {
        try {
            const token = localStorage.getItem('novaToken');
            await axios.patch(`http://localhost:5000/api/products/${id}/toggle`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error toggling visibility:', error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-heading">Products</h2>
                    <p className="text-muted-foreground">Manage your store inventory.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setIsModalOpen(true);
                    }}
                    className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                >
                    <Plus size={20} />
                    <span>Add Product</span>
                </button>
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search products..."
                    className="w-full bg-card border border-white/5 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary/50 transition-all"
                />
            </div>

            {/* Table */}
            <div className="bg-card border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-secondary/50 border-b border-white/5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                            <tr>
                                <th className="px-6 py-5">Product</th>
                                <th className="px-6 py-5">Category</th>
                                <th className="px-6 py-5">Price</th>
                                <th className="px-6 py-5">Status</th>
                                <th className="px-6 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center">
                                        <div className="flex justify-center">
                                            <Loader2 className="animate-spin text-primary" size={32} />
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground bg-white/[0.02]">
                                        <p className="text-lg">No products found.</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product) => (
                                    <tr key={product._id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex-shrink-0">
                                                    {product.image && <img src={product.image} alt={product.name} className="w-full h-full object-cover" />}
                                                </div>
                                                <div>
                                                    <div className="font-bold">{product.name}</div>
                                                    <div className="text-xs text-muted-foreground">{product.type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold font-heading">
                                            ${product.price}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => toggleVisibility(product._id)}
                                                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-all ${product.isActive
                                                    ? 'bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20'
                                                    : 'bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20'
                                                    }`}
                                            >
                                                {product.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                                                {product.isActive ? 'Active' : 'Hidden'}
                                            </button>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setIsModalOpen(true);
                                                }}
                                                className="p-2 hover:bg-primary/20 text-muted-foreground hover:text-primary rounded-lg transition-colors"
                                                title="Edit"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product._id)}
                                                className="p-2 hover:bg-red-500/20 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={editingProduct}
                onSave={handleSave}
            />
        </div>
    );
};

export default Products;
