import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {

    const token = localStorage.getItem('AUTH_TOKEN');

    if ( !token ) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}