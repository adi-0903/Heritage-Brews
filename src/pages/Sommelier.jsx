import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';

export default function Sommelier() {
    const [plans, setPlans] = useState([]);
    const { addItem, toggleCart } = useCart();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const data = await api.get('catalog/subscriptions/');
                // Handle both paginated and flat array responses
                const plansArray = Array.isArray(data) ? data : (data.results || []);
                setPlans(plansArray);
            } catch (err) {
                console.error("The Sommelier's archive is unreachable:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    const handleSubscribe = (plan) => {
        // Transform Plan model to Cart Item
        const cartItem = {
            id: `sub_${plan.id}`,
            name: plan.name,
            price: plan.price_monthly,
            image: '/images/brass_tea_canister.png', // Default premium image for subs
            category: 'Subscription'
        };
        addItem(cartItem);
        toggleCart(); // Open cart drawer to show the acquisition
    };

    return (
        <main className="bg-[#120e0a] pt-16 relative min-h-screen">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                    color: #F4C430;
                }
                body {
                    background-color: #120e0a;
                    color: #e5e2d8;
                    font-family: 'Noto Serif', serif;
                }
                .indian-pattern-bg {
                    background-image: url('/images/indian_pattern.png');
                    background-size: 300px 300px;
                    opacity: 0.03;
                    mix-blend-mode: color-dodge;
                }
                .heritage-glass {
                    backdrop-filter: blur(24px);
                    background-color: rgba(18, 14, 10, 0.60);
                }
                .gold-glow { text-shadow: 0 0 30px rgba(244,196,48,0.4); }
            `}</style>

            {/* Full Page Texture */}
            <div className="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden z-10 border-b border-[#F4C430]/20">
                <div className="absolute inset-0 z-0">
                    <img alt="The Master Sommelier" className="w-full h-full object-cover opacity-60" src="/images/master_sommelier.png" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#120e0a] via-[#120e0a]/70 to-transparent"></div>
                </div>
                <div className="container mx-auto px-12 relative z-10">
                    <div className="max-w-2xl">
                        <span className="text-[#F4C430] font-headline italic text-xl mb-4 block tracking-wide">The Curated Journey</span>
                        <h1 className="font-headline text-7xl md:text-8xl text-[#e5e2d8] font-bold leading-none -ml-1 tracking-tighter mb-8 gold-glow">
                            The Sommelier's <br />Selection
                        </h1>
                        <p className="text-[#c4b5a2] text-lg leading-relaxed max-w-lg mb-10">
                            An invitation to the inner circle of tea heritage. Each month, our Master Blender selects two rare flushes that define the season's soul.
                        </p>
                    </div>
                </div>
            </section>

            {/* Meet the Master */}
            <section className="py-32 bg-[#1c1511] relative overflow-hidden z-10">
                <div className="container mx-auto px-12 relative">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                        <div className="md:col-span-5 relative">
                            <img alt="Tea Master at Work" className="relative z-10 w-full aspect-[4/5] object-cover border border-[#F4C430]/20" src="/images/master_sommelier.png" />
                            <div className="absolute -bottom-6 -right-6 bg-[#890000] p-8 text-[#e5e2d8] border border-[#F4C430]/30 shadow-2xl z-20">
                                <p className="font-headline text-5xl font-bold italic text-[#F4C430]">40+</p>
                                <p className="text-xs tracking-[0.2em] uppercase font-bold">Years of Mastery</p>
                            </div>
                        </div>
                        <div className="md:col-span-7">
                            <h2 className="font-headline text-5xl text-[#F4C430] font-bold mb-8 tracking-tight uppercase">Master of the Sanctum</h2>
                            <div className="space-y-6 text-[#c4b5a2] leading-relaxed text-lg italic">
                                <p>For four decades, our Master Sommelier has walked the misty slopes of the estates, securing "micro-lots"—fractions of harvests too magnificent to be blended away.</p>
                                <p>Through this subscription, he shares these archival secrets directly with you, the chosen Patron.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Subscription Tiers */}
            <section className="py-32 container mx-auto px-12 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-headline text-5xl md:text-6xl text-[#e5e2d8] font-bold mb-4 tracking-tighter uppercase gold-glow">The Tiers of Access</h2>
                    <div className="w-24 h-1 bg-[#F4C430] mx-auto"></div>
                </div>

                <div className="flex flex-wrap justify-center gap-12">
                    {plans.map((plan) => (
                        <div key={plan.id} className="group bg-[#1c1511] border-2 border-[#F4C430]/20 w-full md:w-[450px] p-16 relative flex flex-col items-center text-center transition-all duration-700 hover:border-[#F4C430]/50 hover:shadow-[0_0_80px_rgba(244,196,48,0.2)] hover:-translate-y-2">
                            {plan.badge_text && (
                                <div className="absolute top-0 right-0 p-4 bg-[#F4C430] text-[#120e0a] font-headline font-bold text-xs tracking-widest uppercase shadow-xl z-20">
                                    {plan.badge_text}
                                </div>
                            )}

                            <div className="mb-12 relative">
                                <span className="material-symbols-outlined text-7xl text-[#F4C430] mb-6 block drop-shadow-[0_0_15px_rgba(244,196,48,0.5)]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {plan.icon || 'military_tech'}
                                </span>
                                <h3 className="font-headline text-4xl text-[#e5e2d8] font-bold uppercase tracking-[0.2em] mb-4">{plan.name}</h3>
                                <p className="text-[#F4C430]/90 italic font-serif text-lg tracking-wide">{plan.tagline || 'The Seasonal Companion'}</p>
                            </div>
                            
                            <div className="space-y-6 mb-16 text-[#c4b5a2] font-serif text-lg flex-grow">
                                {plan.features && plan.features.map((f, i) => (
                                    <div key={i} className="flex items-center gap-4 justify-center">
                                        <span className="material-symbols-outlined text-[#F4C430] text-sm">circle</span>
                                        <p className="tracking-wide">{f}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-auto pt-8 w-full">
                                <div className="mb-10">
                                    <span className="text-5xl font-headline font-bold text-[#F4C430] gold-glow">₹{plan.price_monthly.toLocaleString()}</span>
                                    <span className="text-[#c4b5a2] ml-2 italic">/ month</span>
                                </div>
                                <button 
                                    onClick={() => handleSubscribe(plan)}
                                    className="w-full border-2 border-[#F4C430] text-[#F4C430] px-12 py-5 font-headline font-bold tracking-[0.3em] uppercase hover:bg-[#F4C430] hover:text-[#120e0a] transition-all duration-500 shadow-[0_0_30px_rgba(244,196,48,0.1)] group-hover:shadow-[0_0_40px_rgba(244,196,48,0.3)]"
                                >
                                    Select Tier
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* The Unboxing of Tradition - Overhauled */}
            <section className="py-40 bg-[#120e0a] relative overflow-hidden z-10 border-y border-[#F4C430]/10">
                <div className="absolute inset-0 indian-pattern-bg opacity-[0.02]"></div>
                <div className="container mx-auto px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row gap-24 items-center">
                        {/* Left Side: The Narrative */}
                        <div className="lg:w-1/2">
                            <h2 className="font-headline text-6xl md:text-7xl text-[#e5e2d8] font-bold mb-16 tracking-tighter leading-[0.85] gold-glow uppercase">
                                The Unboxing <br />of Tradition
                            </h2>
                            
                            <div className="space-y-16">
                                <div className="flex gap-8 group">
                                    <div className="text-[#F4C430] font-headline text-3xl border-r border-[#F4C430]/30 pr-6 h-fit py-2 group-hover:pr-10 transition-all duration-500">01</div>
                                    <div>
                                        <h4 className="font-headline text-2xl text-[#e5e2d8] font-bold uppercase mb-3 tracking-widest">The Harvest Selection</h4>
                                        <p className="text-[#c4b5a2] leading-relaxed text-lg italic">
                                            Premium loose-leaf flushes, hand-picked and vacuum sealed at the estate to preserve the 'terroir' and the very breath of the mountains.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group">
                                    <div className="text-[#F4C430] font-headline text-3xl border-r border-[#F4C430]/30 pr-6 h-fit py-2 group-hover:pr-10 transition-all duration-500">02</div>
                                    <div>
                                        <h4 className="font-headline text-2xl text-[#e5e2d8] font-bold uppercase mb-3 tracking-widest">The Sommelier's Journal</h4>
                                        <p className="text-[#c4b5a2] leading-relaxed text-lg italic">
                                            Hand-written notes on aged parchment, detailing the precise temperature, steep time, and the tea's ancestral lineage.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-8 group">
                                    <div className="text-[#F4C430] font-headline text-3xl border-r border-[#F4C430]/30 pr-6 h-fit py-2 group-hover:pr-10 transition-all duration-500">03</div>
                                    <div>
                                        <h4 className="font-headline text-2xl text-[#e5e2d8] font-bold uppercase mb-3 tracking-widest">The Earth Artifact</h4>
                                        <p className="text-[#c4b5a2] leading-relaxed text-lg italic">
                                            A handcrafted token of the soil—be it a terracotta tea light holder or a hand-etched brass measuring spoon.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: The Visual Grid */}
                        <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative">
                            <div className="absolute inset-0 border-2 border-[#F4C430]/5 -m-6 pointer-events-none"></div>
                            
                            <div className="space-y-6 pt-12">
                                <div className="overflow-hidden border border-[#F4C430]/20 shadow-2xl group">
                                    <img className="w-full aspect-square object-cover transition-transform duration-[2000ms] group-hover:scale-110" src="/images/brass_tea_canister.png" alt="Artifact" />
                                </div>
                                <div className="overflow-hidden border border-[#F4C430]/20 shadow-2xl group">
                                    <img className="w-full aspect-[3/4] object-cover transition-transform duration-[2000ms] group-hover:scale-110" src="/images/loose_tea_leaves.png" alt="Harvest" />
                                </div>
                            </div>
                            
                            <div className="space-y-6">
                                <div className="overflow-hidden border border-[#F4C430]/20 shadow-2xl group">
                                    <img className="w-full aspect-[3/4] object-cover transition-transform duration-[2000ms] group-hover:scale-110" src="/images/aged_parchment.png" alt="Journal" />
                                </div>
                                <div className="overflow-hidden border border-[#F4C430]/20 shadow-2xl group">
                                    <img className="w-full aspect-square object-cover transition-transform duration-[2000ms] group-hover:scale-110" src="/images/darjeeling_tea_1775770278908.png" alt="The Ritual" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
