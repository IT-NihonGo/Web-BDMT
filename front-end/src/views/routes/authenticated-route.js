import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const AuthenticatedRoute = () => {
    const { token, user } = useAuth()
    if (localStorage.getItem('token') && token !=="null" && user !=="null") {
        return <Outlet />;
    } else {
        return <Navigate to="/sign-in" />;
    }
};

export default AuthenticatedRoute;
