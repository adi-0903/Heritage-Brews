import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { register, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match in our records.');
        }

        setLoading(true);
        setError(null);

        const result = await register({
            username: formData.username,
            email: formData.email,
            password: formData.password,
            password2: formData.confirmPassword
        });

        if (result.success) {
            navigate('/rewards');
        } else {
            setError(result.error || 'Failed to create your identity. Please try another name.');
        }
        setLoading(false);
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        setLoading(true);
        setError(null);
        const result = await googleLogin(credentialResponse.credential);
        if (result.success) {
            navigate('/rewards');
        } else {
            setError(result.error || 'Google sign-up failed. Please try again.');
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
                    className="w-full h-full object-cover opacity-20 filter grayscale sepia scale-110" 
                    alt="Haveli backdrop" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120e0a] via-transparent to-[#120e0a]"></div>
            </div>

            <div className="relative z-10 w-full max-w-xl bg-[#1a1510] border border-[#F4C430]/20 p-10 md:p-16 shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
                <div className="text-center mb-10">
                    <span className="text-[#F4C430] font-label text-xs uppercase tracking-[0.4em] mb-4 block">Ascend into the Lineage</span>
                    <h1 className="text-4xl font-headline font-bold text-[#fcf9ee] mb-4">Create Your Legacy</h1>
                    <p className="text-[#c4bcae] italic text-sm">Join the Heritage family and start curating your tea journey.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-[#d6aa54] font-bold">Username</label>
                            <input 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-[#F4C430]/20 py-2 text-[#fcf9ee] focus:border-[#F4C430] transition-all outline-none" 
                                type="text" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-[#d6aa54] font-bold">Email Address</label>
                            <input 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-[#F4C430]/20 py-2 text-[#fcf9ee] focus:border-[#F4C430] transition-all outline-none" 
                                type="email" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-[#d6aa54] font-bold">Secret Key</label>
                            <input 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-[#F4C430]/20 py-2 text-[#fcf9ee] focus:border-[#F4C430] transition-all outline-none" 
                                type="password" 
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-[#d6aa54] font-bold">Confirm Key</label>
                            <input 
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-[#F4C430]/20 py-2 text-[#fcf9ee] focus:border-[#F4C430] transition-all outline-none" 
                                type="password" 
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-400 text-xs italic text-center py-2 animate-shake">
                            {error}
                        </div>
                    )}

                    <button 
                        disabled={loading}
                        className="w-full mt-6 bg-gradient-to-r from-[#F4C430] to-[#d6aa54] text-[#120e0a] py-4 font-headline uppercase tracking-[0.2em] text-sm font-bold shadow-xl hover:brightness-110 transition-all disabled:opacity-50"
                    >
                        {loading ? 'Consulting the Oracle...' : 'Inscribe Your Name'}
                    </button>

                    <div className="relative flex items-center py-4">
                        <div className="flex-grow border-t border-[#F4C430]/20"></div>
                        <span className="flex-shrink-0 mx-4 text-[#c4bcae] text-xs uppercase tracking-widest">Or Register With</span>
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
                    <p className="text-[#c4bcae] text-xs">A member of the lineage already?</p>
                    <Link to="/login" className="text-[#F4C430] border-b border-[#F4C430]/30 pb-1 uppercase text-xs tracking-[0.2em] hover:text-[#fcf9ee] transition-colors">
                        Sign In to Your Sanctum
                    </Link>
                </div>
            </div>
        </main>
    );
}
