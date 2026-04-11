import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const { totalItems } = useCart();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (location.pathname.startsWith('/invoice')) return null;

    const navLinks = [
        { name: 'Our Heritage', path: '/' },
        { name: 'Tea Gardens', path: '/estates' },
        { name: 'Coffee Roasts', path: '/menu' },
        { name: 'Curations', path: '/gifts' },
        { name: 'Sommelier', path: '/sommelier' },
        { name: 'Stories', path: '/stories' },
        { name: 'Rewards', path: '/rewards' },
    ];

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@400;500;600&display=swap');
                
                .royal-glass {
                    background: rgba(18, 14, 10, 0.85);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }
                .royal-glass-scrolled {
                    background: rgba(18, 14, 10, 0.95);
                    backdrop-filter: blur(16px);
                    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
                    border-bottom: 1px solid rgba(244, 196, 48, 0.15);
                }
                .logo-cinzel {
                    font-family: 'Cinzel', serif;
                }
                .nav-text {
                    font-family: 'Inter', sans-serif;
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                .nav-underline {
                    position: relative;
                }
                .nav-underline::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 1px;
                    bottom: -4px;
                    left: 50%;
                    background-color: #F4C430;
                    transition: all 0.3s ease-in-out;
                    transform: translateX(-50%);
                }
                .nav-underline:hover::after,
                .nav-underline.active::after {
                    width: 100%;
                }
            `}</style>

            <header className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'royal-glass-scrolled py-3' : 'royal-glass py-6 border-b border-[#F4C430]/10'}`}>
                <div className="w-full px-6 md:px-12">
                    <div className="flex items-center justify-between">

                        {/* Logo Left */}
                        <Link to="/" className="flex items-center gap-4 flex-shrink-0 group">
                            <div className="relative">
                                <img src="/images/Logo_new.png" className="w-12 h-12 object-contain filter invert-0 group-hover:scale-110 transition-transform duration-500" alt="H.B" />
                                <div className="absolute inset-0 bg-[#F4C430]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="logo-cinzel text-3xl font-bold text-[#F4C430] tracking-tight group-hover:text-white transition-colors duration-500 leading-none">
                                    Heritage Brews
                                </span>
                                <div className="flex items-center w-full gap-3 mt-1">
                                    <span className="text-[11px] uppercase tracking-[0.3em] text-[#F4C430] font-bold group-hover:scale-105 transition-all whitespace-nowrap">विरासत चाय</span>
                                    <div className="h-[1px] flex-grow bg-[#F4C430]/40 transition-all group-hover:bg-[#F4C430]/80"></div>
                                </div>
                            </div>
                        </Link>

                        {/* Navigation Center */}
                        <nav className="hidden xl:flex items-center justify-center space-x-10 flex-grow px-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`nav-text text-sm uppercase tracking-[0.15em] font-medium nav-underline whitespace-nowrap ${location.pathname === link.path ? 'text-[#F4C430] active' : 'text-[#fcf9ee]/80 hover:text-[#F4C430]'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Actions Right */}
                        <div className="flex items-center space-x-6 lg:space-x-10 flex-shrink-0">

                            {/* Auth */}
                            <div className="hidden md:flex items-center relative group/profile">
                                {isAuthenticated ? (
                                    <div className="relative">
                                        <Link to="/profile" className="text-[#F4C430] hover:text-white transition-colors flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[32px]">account_circle</span>
                                        </Link>
                                        
                                        {/* Dropdown */}
                                        <div className="absolute right-0 top-full pt-4 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-300">
                                            <div className="bg-[#1a1510] border border-[#F4C430]/20 p-6 min-w-[200px] shadow-2xl">
                                                <p className="nav-text text-[10px] uppercase tracking-widest text-[#F4C430]/60 mb-1">Authenticated Patron</p>
                                                <p className="font-headline text-lg text-[#F4C430] mb-4 border-b border-[#F4C430]/10 pb-2">{user?.username}</p>
                                                <Link to="/profile" className="block w-full text-left nav-text text-[11px] uppercase tracking-widest text-white/80 hover:text-[#F4C430] transition-colors flex items-center gap-3 mb-4">
                                                    <span className="material-symbols-outlined text-lg">history_edu</span>
                                                    Royal Ledger
                                                </Link>
                                                <button 
                                                    onClick={logout} 
                                                    className="w-full text-left nav-text text-[11px] uppercase tracking-widest text-white/80 hover:text-red-400 transition-colors flex items-center gap-3"
                                                >
                                                    <span className="material-symbols-outlined text-lg">logout</span>
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link to="/register" className="text-[#F4C430] hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[32px]">person_add</span>
                                    </Link>
                                )}
                            </div>

                            {/* Cart */}
                            <Link to="/checkout" className="text-[#F4C430] hover:text-white transition-colors relative flex items-center">
                                <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                                {totalItems > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-red-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>

                            {/* Reserve Button */}
                            <Link to="/reservation" className="hidden lg:flex items-center justify-center px-8 py-3 border border-[#F4C430] bg-[#F4C430]/5 text-[#F4C430] hover:bg-[#F4C430] hover:text-[#120e0a] transition-all duration-300 nav-text text-[12px] font-bold uppercase tracking-[0.2em] shadow-[0_0_10px_rgba(244,196,48,0.05)] hover:shadow-[0_0_20px_rgba(244,196,48,0.3)]">
                                Reserve
                            </Link>

                            {/* Mobile Menu Icon */}
                            <button className="xl:hidden text-[#F4C430]">
                                <span className="material-symbols-outlined text-4xl">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}