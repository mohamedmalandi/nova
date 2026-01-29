import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    // Check for token in localStorage
    // In a real app, you might decode the token to check expiration
    const token = localStorage.getItem('novaToken');

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
