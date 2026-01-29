import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Calendar, LogOut, Globe } from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('novaToken');
        navigate('/admin/login');
    };

    const navItems = [
        { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/products', label: 'Products', icon: ShoppingBag },
        { path: '/admin/events', label: 'Events', icon: Calendar },
        // Add more items here as needed
    ];

    return (
        <aside className="w-64 bg-card border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-50">
            {/* Logo */}
            <div className="p-8 border-b border-white/5">
                <h1 className="text-2xl font-bold font-heading">
                    <span className="text-primary">NOVA</span> ADMIN
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-primary/20 text-primary font-bold shadow-[0_0_15px_-5px_rgba(var(--primary-rgb),0.5)] border border-primary/20'
                                : 'text-muted-foreground hover:bg-white/5 hover:text-foreground hover:translate-x-1'
                            }`
                        }
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-white/5 space-y-2">
                <NavLink
                    to="/"
                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all duration-200 hover:translate-x-1"
                >
                    <Globe size={20} />
                    <span>View Website</span>
                </NavLink>

                <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
