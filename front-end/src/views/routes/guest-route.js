import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const GuestRoute = () => {
    const { token } = useAuth()    
    if (token !=="null" && token !=="null") {
        return <Navigate to="/" />;
    }
    return <Outlet />;
};

export default GuestRoute;