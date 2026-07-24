import { useEffect, useState, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contextApi/AuthContext";
const StudentProtected = () => {

    const { loading, user } = useContext(AuthContext)



    if (!user) return <Navigate to="/login" replace />;

    if (user.role !== "user") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default StudentProtected;