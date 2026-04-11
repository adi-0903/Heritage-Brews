import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));

    useEffect(() => {
        if (accessToken) {
            fetchUserProfile();
        } else {
            setLoading(false);
        }
    }, [accessToken]);

    const fetchUserProfile = async () => {
        try {
            const profile = await api.get('auth/profile/');
            setUser(profile);
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            logout();
        } finally {
            setLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const data = await api.post('auth/login/', { username, password });
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            setAccessToken(data.access);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const register = async (userData) => {
        try {
            const data = await api.post('auth/register/', userData);
            localStorage.setItem('access_token', data.tokens.access);
            localStorage.setItem('refresh_token', data.tokens.refresh);
            setAccessToken(data.tokens.access);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setAccessToken(null);
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        refreshProfile: fetchUserProfile,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
