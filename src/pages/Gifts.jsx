import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';

export default function Gifts() {
    const { addItem } = useCart();
    const [hampers, setHampers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGifts = async () => {
            try {
                const data = await api.get('catalog/gifts/');
                // Handle both paginated and flat array responses
                const hampersArray = Array.isArray(data) ? data : (data.results || []);
                setHampers(hampersArray);
            } catch (error) {
                console.error('Failed to fetch gift hampers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGifts();
    }, []);

    return (
        <main className="min-h-screen font-serif bg-[#fcf9ee] text-[#1c1c15]">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                .mughal-pattern {
                    background-image: radial-gradient(#e5e2d8 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                .hero-gradient {
                    background: linear-gradient(to bottom, rgba(28, 28, 21, 0.4), rgba(28, 28, 21, 0.9));
                }
                .ornate-title::before, .ornate-title::after {
                    content: '❦';
                    margin: 0 20px;
                    color: #F4C430;
                    font-size: 0.8em;
                }
                .hamper-card-border {
                    border: 1px solid #7b5800;
                    outline: 4px solid #f1eee3;
                    outline-offset: -8px;
                }
            `}</style>
            
            {/* Hero Section */}
            <section className="relative h-[650px] flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover grayscale-[0.2] sepia-[0.3]" src="/images/royal_haveli_courtyard.png" alt="Curated Gifts" />
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>
                <div className="relative z-10 px-8 md:px-24 w-full flex flex-col items-center text-center">
                    <span className="text-[#F4C430] font-headline text-xl tracking-[0.3em] uppercase mb-4 opacity-90">The Art of Giving</span>
                    <h1 className="text-5xl md:text-7xl font-headline text-white font-bold tracking-tighter leading-tight mb-8 max-w-4xl">
                        Traditions Curated. <br/>Memories Preserved.
                    </h1>
                    <div className="w-24 h-[2px] bg-[#F4C430] mb-8"></div>
                    <p className="text-xl md:text-2xl text-white/90 font-body italic max-w-3xl leading-relaxed">
                        In our heritage, to gift is to share a piece of your soul. We've preserved this ancient art by hand-weaving stories of warmth, prosperity, and respect into each of our artisanal hampers.
                    </p>
                </div>
            </section>

            {/* Gifts & Hampers Section */}
            <section className="py-32 bg-[#A52A2A] relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none mughal-pattern" style={{ backgroundImage: 'radial-gradient(#F4C430 1px, transparent 1px)' }}></div>
                
                <div className="max-w-screen-2xl mx-auto px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-headline text-[#F4C430] font-bold tracking-tight ornate-title">
                            उपहार — Gift a Tradition
                        </h2>
                        <div className="w-48 h-[2px] bg-[#F4C430]/40 mx-auto mt-8 flex items-center justify-center">
                            <span className="bg-[#A52A2A] px-4">
                                <span className="material-symbols-outlined text-[#F4C430]" style={{ fontVariationSettings: "'FILL' 1" }}>card_giftcard</span>
                            </span>
                        </div>
                    </div>

                    {loading ? (
                        <div className="text-center py-20 text-[#F4C430] italic font-headline text-2xl tracking-widest animate-pulse">
                            Unveiling Curations...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {hampers.map(hamper => (
                                <div key={hamper.id} className="bg-[#fcf9ee] flex flex-col h-full hamper-card-border group">
                                    <div className="relative h-64 overflow-hidden">
                                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={hamper.image || '/images/brass_tea_canister.png'} alt={hamper.name} />
                                        {hamper.is_limited && (
                                            <div className="absolute top-4 left-4 bg-[#F4C430] text-[#410000] text-[10px] font-bold uppercase tracking-widest px-3 py-1">Limited Edition</div>
                                        )}
                                    </div>
                                    <div className="p-8 flex flex-col flex-grow">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-headline font-bold text-[#890000]">{hamper.name}</h3>
                                            <span className="text-xl font-headline font-bold text-[#7b5800]">₹{hamper.price}</span>
                                        </div>
                                        <p className="text-[#5c4a36] font-body text-sm leading-relaxed flex-grow italic mb-6">
                                            {hamper.description}
                                        </p>
                                        <button 
                                            onClick={() => addItem({...hamper, type: 'hamper'})}
                                            className="w-full bg-[#890000] text-white py-4 font-headline text-lg tracking-wide hover:bg-[#ac2014] transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                                        >
                                            <span className="material-symbols-outlined text-white text-sm">shopping_cart</span> Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-20 text-center relative z-10 w-full flex justify-center pb-12">
                        <button className="px-16 py-5 border-2 border-[#F4C430] text-[#F4C430] bg-[#890000] font-headline text-2xl font-bold hover:bg-[#F4C430] hover:text-[#410000] transition-all duration-300 shadow-[0_0_20px_rgba(244,196,48,0.2)] hover:shadow-[0_0_30px_rgba(244,196,48,0.4)]">
                            Customize Your Hamper
                        </button>
                    </div>

                    <div className="mt-12 border-t border-[#F4C430]/30 pt-8 text-center relative z-10">
                        <p className="text-[#F4C430]/90 font-body italic text-[13px] tracking-[0.2em] uppercase font-semibold">
                            Complementary royal wrapping in handmade paper and eco-friendly jute packaging.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
