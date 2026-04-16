import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const result = await login(credentials.username, credentials.password);
        if (result.success) {
            const from = location.state?.from?.pathname || '/rewards';
            navigate(from, { replace: true });
        } else {
            setError(result.error || 'Invalid credentials. The archives do not recognize this entry.');
        }
        setLoading(false);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError(null);
        const result = await googleLogin(credentialResponse.credential);
        if (result.success) {
            const from = location.state?.from?.pathname || '/rewards';
            navigate(from, { replace: true });
        } else {
            setError(result.error || 'Google sign-in failed. Please try again.');
        }
        setLoading(false);
    };

    const handleGoogleError = () => {
        setError('Google authentication was closed or failed.');
    };

    return (
        <main className="min-h-screen relative flex items-center justify-center py-20 px-4 bg-[#120e0a] font-serif overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/images/royal_haveli_courtyard.png" 
                    className="w-full h-full object-cover opacity-20 filter grayscale sepia" 
                    alt="Haveli backdrop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120e0a] via-transparent to-[#120e0a]"></div>
            </div>

            <div className="relative z-10 w-full max-w-lg bg-[#1a1510] border border-[#F4C430]/20 p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                <div className="text-center mb-10">
                    <span className="text-[#F4C430] font-label text-xs uppercase tracking-[0.4em] mb-4 block">Access the Archives</span>
                    <h1 className="text-4xl font-headline font-bold text-[#fcf9ee] mb-4">Namaste</h1>
                    <p className="text-[#c4bcae] italic text-sm">Enter your credentials to reunite with the Heritage family.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[#d6aa54] font-bold">Username</label>
                        <input 
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-[#F4C430]/20 py-3 text-[#fcf9ee] focus:border-[#F4C430] transition-all outline-none" 
                            type="text" 
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest text-[#d6aa54] font-bold">Secret Key (Password)</label>
                        <input 
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            className="w-full bg-transparent border-b border-[#F4C430]/20 py-3 text-[#fcf9ee] focus:border-[#F4C430] transition-all outline-none" 
                            type="password" 
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs italic text-center animate-shake">
                            {error}
                        </div>
                    )}

                    <button 
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#F4C430] to-[#d6aa54] text-[#120e0a] py-4 font-headline uppercase tracking-[0.2em] text-sm font-bold shadow-xl hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Unseal Access'}
                    </button>
                    
                    <div className="relative flex items-center py-4">
                        <div className="flex-grow border-t border-[#F4C430]/20"></div>
                        <span className="flex-shrink-0 mx-4 text-[#c4bcae] text-xs uppercase tracking-widest">Or</span>
                        <div className="flex-grow border-t border-[#F4C430]/20"></div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={handleGoogleError}
                            theme="filled_black"
                            shape="rectangular"
                            type="standard"
                        />
                    </div>
                </form>

                <div className="mt-12 text-center space-y-4">
                    <p className="text-[#c4bcae] text-xs">New to the lineage?</p>
                    <Link to="/register" className="text-[#F4C430] border-b border-[#F4C430]/30 pb-1 uppercase text-xs tracking-[0.2em] hover:text-[#fcf9ee] transition-colors">
                        Create Your Identity
                    </Link>
                </div>
            </div>
        </main>
    );
}
