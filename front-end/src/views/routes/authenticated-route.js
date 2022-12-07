import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

const AuthenticatedRoute = () => {
    const { token } = useAuth()
    if (token !=="null" && token !=="null") {
        return <Outlet />;
    } else {
        return <Navigate to="/sign-in" />;
    }
};

export default AuthenticatedRoute;
