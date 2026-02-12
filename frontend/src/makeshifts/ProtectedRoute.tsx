import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const token = localStorage.getItem('admin_token');

    // if there is no token, redirect to login
    if (!token) {
        return <Navigate to="/admin" replace />
    }

    return <Outlet/>
}

export default ProtectedRoute