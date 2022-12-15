import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const GuestRoute = () => {
    const { token, user } = useAuth()    
    if (localStorage.getItem('token') && token !=="null" && user !=="null") {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default GuestRoute;