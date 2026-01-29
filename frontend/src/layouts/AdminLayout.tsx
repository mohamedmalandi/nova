import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-y-auto min-h-screen">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
