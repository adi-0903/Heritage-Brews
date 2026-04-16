import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Invoice() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    useEffect(() => {
        if (!loading && order) {
            const timer = setTimeout(() => setRevealed(true), 500);
            return () => clearTimeout(timer);
        }
    }, [loading, order]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const data = await api.get(`orders/${orderId}/`);
            setOrder(data);
        } catch (error) {
            console.error('Failed to fetch order:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#0a0806] flex items-center justify-center">
            <div className="text-[#D4AF37] font-serif text-xl animate-pulse italic tracking-[0.5em]">OPENING THE IMPERIAL SANCTUARY...</div>
        </div>
    );

    if (!order) return <div className="min-h-screen bg-[#0a0806] text-[#D4AF37] flex items-center justify-center font-serif">Archive Not Found.</div>;

    return (
        <div className="min-h-screen bg-[#0a0806] relative overflow-hidden flex flex-col items-center justify-start py-12 px-4">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Great+Vibes&family=Inter:wght@400;700&display=swap');
                
                .font-royal { font-family: 'Cinzel', serif; }
                .font-archive { font-family: 'Newsreader', serif; }
                .font-signature { font-family: 'Great Vibes', cursive; }
                .font-geometric { font-family: 'Inter', sans-serif; }

                /* Cinematic Sanctuary Scene */
                .sanctuary-bg {
                    position: fixed;
                    inset: 0;
                    background-image: url("/images/royal_haveli_courtyard.png");
                    background-size: cover;
                    background-position: center;
                    filter: brightness(0.2) saturate(0.5) blur(4px);
                    transform: scale(1.05);
                    z-index: -1;
                }

                .light-shafts {
                    position: fixed;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(212, 175, 55, 0.05) 0%, transparent 40%, rgba(212, 175, 55, 0.05) 100%);
                    z-index: 0;
                    pointer-events: none;
                }

                /* The Floating Firman Case */
                .firman-container {
                    width: 100%;
                    max-width: 900px;
                    position: relative;
                    transition: all 2s cubic-bezier(0.34, 1.56, 0.64, 1);
                    opacity: 0;
                    transform: translateY(50px) scale(0.95);
                    z-index: 10;
                }
                .firman-container.revealed {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }

                /* Glassmorphism Archival Base */
                .archival-plate {
                    background: rgba(252, 249, 238, 0.03);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(212, 175, 55, 0.2);
                    padding: 3px;
                    border-radius: 4px;
                    box-shadow: 0 40px 100px rgba(0,0,0,0.8);
                }

                /* Parchment Surface - Midnight Imperial Inversion */
                .parchment-surface {
                    background: #0d0b08; /* Deep obsidian archival scroll */
                    background-image: url("https://www.transparenttextures.com/patterns/old-paper.png");
                    color: #fdfaf0; /* Luminous text */
                    padding: 5rem;
                    position: relative;
                    min-height: 1000px;
                    box-shadow: inset 0 0 100px rgba(0,0,0,0.9);
                }

                /* Logo Visibility Enhancement */
                .imperial-logo {
                    filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.4)) brightness(1.1);
                    transition: all 0.5s ease;
                }
                .imperial-logo:hover {
                    filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.6)) brightness(1.2);
                }

                /* Ornate Gold Border */
                .imperial-border {
                    position: absolute;
                    inset: 1.5rem;
                    border: 2px solid #D4AF37;
                    pointer-events: none;
                    opacity: 0.3;
                }
                .imperial-border::after {
                    content: '';
                    position: absolute;
                    inset: 6px;
                    border: 1px solid #D4AF37;
                    opacity: 0.6;
                }

                /* Table Styling - Luminous Dark Mode */
                .sanctuary-table {
                    width: 100%;
                    margin: 2rem 0;
                    border-top: 1px solid rgba(212, 175, 55, 0.2);
                    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
                }
                .sanctuary-table th {
                    padding: 1rem 0.5rem;
                    font-family: 'Inter', sans-serif;
                    text-transform: uppercase;
                    letter-spacing: 0.2em;
                    font-size: 0.7rem;
                    color: #D4AF37;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.1);
                }
                .sanctuary-table td {
                    padding: 1.5rem 0.5rem;
                    font-family: 'Newsreader', serif;
                    font-size: 1.2rem;
                    color: #fdfaf0;
                    border-bottom: 1px solid rgba(212, 175, 55, 0.05);
                }

                /* Total Hero Block */
                .valuation-block {
                    margin-top: 4rem;
                    background: #0a110a;
                    padding: 3rem;
                    width: calc(100% + 10rem);
                    margin-left: -5rem;
                    display: flex;
                    flex-col;
                    items-center;
                    justify-content: center;
                    border-top: 4px solid #D4AF37;
                    border-bottom: 4px solid #D4AF37;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }

                @media print {
                    .sanctuary-bg, .light-shafts, .no-print { display: none !important; }
                    .firman-container { width: 100% !important; transform: none !important; margin: 0 !important; }
                    .archival-plate { border: none !important; box-shadow: none !important; background: white !important; }
                    .parchment-surface { background: white !important; padding: 20px !important; color: black !important; }
                }
            `}</style>

            <div className="sanctuary-bg"></div>
            <div className="light-shafts"></div>

            {/* Controls */}
            <div className={`no-print fixed top-8 z-[100] transition-opacity duration-1000 ${revealed ? 'opacity-100' : 'opacity-0'}`}>
                <button 
                    onClick={() => navigate('/profile')} 
                    className="flex items-center gap-3 px-6 py-2 bg-white/5 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:border-[#D4AF37]/50 transition-all rounded-full text-[10px] uppercase tracking-[0.2em]"
                >
                    <span className="text-lg">←</span> Return to Sanctuary
                </button>
            </div>

            <div className={`firman-container ${revealed ? 'revealed' : ''}`}>
                <div className="archival-plate">
                    <div className="parchment-surface">
                        <div className="imperial-border"></div>

                        {/* Top Branding Stack */}
                        <div className="flex flex-col items-center mb-16">
                            <img src="/images/Logo_new.png" className="w-32 h-32 object-contain mb-6 imperial-logo" alt="H.B Phoenix" />
                            <h2 className="font-royal text-4xl font-black tracking-[0.15em] mb-2 uppercase text-white">Heritage Brews</h2>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="h-px w-8 bg-[#D4AF37]/40"></div>
                                <span className="text-[#D4AF37] font-bold text-sm tracking-[0.3em] uppercase">विरासत चाय</span>
                                <div className="h-px w-8 bg-[#D4AF37]/40"></div>
                            </div>
                            <p className="font-royal text-lg tracking-[0.6em] uppercase text-[#D4AF37]/70">Invoice</p>
                        </div>

                        {/* Meta Info Area */}
                        <div className="flex justify-between items-start mb-12 font-geometric uppercase text-[10px] tracking-widest text-[#D4AF37] border-b border-white/10 pb-8">
                            <div className="text-left space-y-2">
                                <p><span className="opacity-50">Archive Ref:</span> <span className="text-white font-bold ml-2">{order.order_number}</span></p>
                                <p><span className="opacity-50">Date of Archive:</span> <span className="text-white font-bold ml-2">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span></p>
                            </div>
                            <div className="text-right">
                                <p className="opacity-50 mb-1">Authenticated For:</p>
                                <p className="text-white text-sm font-black tracking-normal">{order.patron_name.toUpperCase()}</p>
                            </div>
                        </div>

                        {/* Inventory Ledger */}
                        <table className="sanctuary-table">
                            <thead>
                                <tr>
                                    <th className="text-left w-16">S.No</th>
                                    <th className="text-left font-black">Imperial Selection</th>
                                    <th className="text-center">Measure</th>
                                    <th className="text-right">Valuation</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.items.map((item, idx) => (
                                    <tr key={idx} className="border-b border-white/5 last:border-none">
                                        <td className="text-white/40 font-geometric text-sm">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</td>
                                        <td className="font-black text-white tracking-tight">{item.product_name.toUpperCase()}</td>
                                        <td className="text-center text-white/70 italic">× {item.quantity}</td>
                                        <td className="text-right font-bold text-white font-geometric text-lg">₹{item.product_price * item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Financial Ledger Summary */}
                        <div className="flex justify-end mt-8">
                            <div className="w-64 space-y-3 font-geometric text-[10px] uppercase tracking-widest text-[#D4AF37]/60">
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="opacity-50">Subtotal:</span>
                                    <span className="text-white font-bold">₹{order.subtotal}</span>
                                </div>
                                {parseFloat(order.discount) > 0 && (
                                    <div className="flex justify-between border-b border-white/5 pb-1 text-[#D4AF37]">
                                        <span className="font-bold">Lineage Rebate:</span>
                                        <span className="font-bold">- ₹{order.discount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-b border-white/5 pb-1">
                                    <span className="opacity-50">Imperial Levy:</span>
                                    <span className="text-white font-bold">{order.delivery_fee == 0 ? 'COMPLIMENTARY' : `₹${order.delivery_fee}`}</span>
                                </div>
                            </div>
                        </div>

                        {/* Authentication Block */}
                        <div className="mt-20 flex flex-col items-start pl-10 text-left">
                            {/* Royal Seal - Now positioned regally above the signature */}
                            <div className={`transition-all duration-1000 delay-1000 mb-2 z-20 ${revealed ? 'opacity-100 scale-100 rotate-[-12deg]' : 'opacity-0 scale-150 rotate-0'}`}>
                                <img src="/images/Royal Seal.png" className="w-48 h-48 object-contain drop-shadow-2xl" alt="Royal Archive Seal" />
                            </div>

                            {/* Signature Area */}
                            <div className="relative z-10">
                                <p className="font-signature text-6xl text-white leading-tight">Grand Sommelier</p>
                                <div className="h-px bg-white/20 w-80 mb-2"></div>
                                <p className="font-geometric text-[9px] tracking-[0.4em] uppercase text-white/40">Heritage Brews Royal Council</p>
                            </div>
                        </div>

                        {/* Final Valuation Reveal */}
                        <div className="valuation-block">
                            <div className="flex flex-col items-center">
                                <p className="font-geometric text-[10px] tracking-[0.5em] uppercase text-[#D4AF37] mb-2 font-black">Total Valuation Selection</p>
                                <div className="flex items-center gap-4">
                                    <span className="font-royal text-6xl font-black text-[#D4AF37] drop-shadow-lg">₹{order.total}</span>
                                    <span className="font-royal text-2xl text-[#8b6b0d] font-bold">INR</span>
                                </div>
                            </div>
                        </div>

                        {/* Security Footer */}
                        <div className="mt-12 text-center border-t border-stone-100 pt-8">
                            <p className="font-geometric text-[9px] tracking-[0.3em] uppercase text-stone-400">This document is an electronic representation of the Imperial Archive Entry.</p>
                            <button onClick={window.print} className="mt-6 text-[#b8860b] hover:text-black font-geometric text-[10px] uppercase tracking-widest transition-all">Download Printed Archive</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
