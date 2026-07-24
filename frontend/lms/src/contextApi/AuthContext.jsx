import api from "../api/axios";
import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";





export const AuthContext = createContext();


export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const getUser = async () => {
        try {
            const res = await api.get(
                "http://localhost:5000/v1/user/getUser",
                { withCredentials: true }
            );

            setUser(res.data.user);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getUser();
    }, []);

    const logout = async () => {
        try {

            await api.post(
                "http://localhost:5000/v1/user/logout",
                {},
                {
                    withCredentials: true
                }
            );

            setUser(null);
            setLoading(false);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthContext.Provider value={{ logout, user, loading, getUser, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}


