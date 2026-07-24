import { useEffect, useState, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../contextApi/AuthContext";
const InstructorProtected = () => {
    const { loading, user } = useContext(AuthContext)


    if (!user) return <Navigate to="/login" replace />;

    if (user.role !== "instructor") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default InstructorProtected;