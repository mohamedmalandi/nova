import { Outlet } from 'react-router-dom';
import Navbar from '../components/ui/Navbar';

import Footer from '../components/ui/Footer';

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main className="relative">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default PublicLayout;
