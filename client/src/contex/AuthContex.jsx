import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuth(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const fetchUsers = async () => {
                try {
                    const response = await axios.get('/auth/');
                    setUser(response.data.user);
                    setIsLoading(false);
                } catch (err) {
                    setError(err.response?.data?.error || 'Something went wrong');
                } finally {
                    setIsLoading(false);
                }
            };
            fetchUsers();
        } else {
            setIsAuth(false);
            setIsLoading(false);
        }
    }, [isAuth]);

    return (
        <AuthContext.Provider value={{ user, isLoading, error, isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return React.useContext(AuthContext);
};
