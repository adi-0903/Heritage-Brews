import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import ArchivistsAI from '../components/ArchivistsAI';

export default function Sommelier() {
    const [plans, setPlans] = useState([]);
    const { addItem, toggleCart } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [activeMembership, setActiveMembership] = useState(null);

    useEffect(() => {
        const fetchCurations = async () => {
            try {
                const data = await api.get('catalog/curations/');
                // Handle both paginated and flat array responses
                const curationsArray = Array.isArray(data) ? data : (data.results || []);
                
                // If the archive is empty (migration in progress), use the Sacred Defaults
                const displayCurations = curationsArray.length > 0 ? curationsArray : [
                    {
                        id: 'fallback_silver',
                        name: 'Heritage Silver',
                        slug: 'heritage-silver',
                        price: 4999,
                        icon: 'military_tech',
                        tagline: 'The Masterclass Box',
                        features: [
                            "2x 250g Rare Estate Blend",
                            "2x Traditional Handcrafted Cups",
                            "Handcrafted Brass Measuring Spoon",
                            "Sommelier's Archival Journal",
                            "Masterclass Tasting Guide",
                            "Traditional Royal Gift Box"
                        ]
                    },
                    {
                        id: 'fallback_brass',
                        name: 'Shahi Brass',
                        slug: 'shahi-brass',
                        price: 7999,
                        image: '/images/shahi_brass_box.png',
                        icon: 'workspace_premium',
                        badge_text: 'Royal Circle',
                        tagline: 'The Ultimate Heritage Kit',
                        features: [
                            "4x 500g Rare Estate Reserves",
                            "4x Traditional Handcrafted Cups",
                            "Authentic Handcrafted Brass Canister",
                            "Complete Heritage Cupping Kit",
                            "Grand Sommelier's Hardbound Journal",
                            "Sommelier Virtual Consultation",
                            "Exquisite Royal Velvet-Lined Packaging"
                        ]
                    }
                ];

                const enhancedCurations = displayCurations.map(c => {
                    // (keeping the manual mapping override logic for existing DB entries)
                    if (c.slug === 'heritage-silver') {
                        return {
                            ...c,
                            price: 4999,
                            image: '/images/heritage_silver_box.png',
                            tagline: 'The Masterclass Box',
                            features: [
                                "2x 250g Rare Estate Blend",
                                "2x Traditional Handcrafted Cups",
                                "Handcrafted Brass Measuring Spoon",
                                "Sommelier's Archival Journal",
                                "Masterclass Tasting Guide",
                                "Traditional Royal Gift Box"
                            ]
                        }
                    } else if (c.slug === 'shahi-brass') {
                        return {
                            ...c,
                            price: 7999,
                            image: '/images/shahi_brass_box.png',
                            tagline: 'The Ultimate Heritage Kit',
                            features: [
                                "4x 500g Rare Estate Reserves",
                                "4x Traditional Handcrafted Cups",
                                "Authentic Handcrafted Brass Canister",
                                "Complete Heritage Cupping Kit",
                                "Grand Sommelier's Hardbound Journal",
                                "Sommelier Virtual Consultation",
                                "Exquisite Royal Velvet-Lined Packaging"
                            ]
                        }
                    }
                    return c;
                });

                setPlans(enhancedCurations);
            } catch (err) {
                console.error("The Sommelier's archive is unreachable:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCurations();
    }, [user]);

    const calculateLineagePrice = (originalPrice) => {
        if (!activeMembership || !activeMembership.discount_percentage) return originalPrice;
        const discount = (originalPrice * activeMembership.discount_percentage) / 100;
        return originalPrice - discount;
    };

    const handleAcquire = (curation) => {
        // Transform model to Cart Item
        const cartItem = {
            id: `curation_${curation.id}`,
            name: curation.name,
            price: curation.price,
            image: curation.image || '/images/brass_tea_canister.png',
            category: 'Heritage Curation'
        };
        addItem(cartItem);
        toggleCart();
    };

    return (
        <main className="bg-[#120e0a] pt-16 relative min-h-screen">
            <ArchivistsAI />
            {/* ... styles remain same ... */}
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
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
            
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center overflow-hidden z-10 border-b border-[#F4C430]/20">
                <div className="absolute inset-0 z-0">
                    <img alt="The Master Sommelier" className="w-full h-full object-cover opacity-60" src="/images/master_sommelier.png" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#120e0a] via-[#120e0a]/70 to-transparent"></div>
                </div>
                <div className="container mx-auto px-12 relative z-10">
                    <div className="max-w-2xl text-left">
                        <span className="text-[#F4C430] font-headline italic text-xl mb-4 block tracking-wide">The Curated Masterclass</span>
                        <h1 className="font-headline text-7xl md:text-8xl text-[#e5e2d8] font-bold leading-none -ml-1 tracking-tighter mb-8 gold-glow uppercase">
                            The Sommelier's <br />Curation
                        </h1>
                        <p className="text-[#c4b5a2] text-lg leading-relaxed max-w-lg mb-10">
                            A one-time masterclass in Heritage tea brewing. Each box contains rare estate reserves, artisanal brass artifacts, and the Master Sommelier's direct guidance.
                        </p>
                    </div>
                </div>
            </section>

            {/* Meet the Master ... (lines 87-106) ... */}

            {/* Curation Box Tiers */}
            <section className="py-32 container mx-auto px-12 relative z-10">
                <div className="text-center mb-24">
                    <h2 className="font-headline text-5xl md:text-6xl text-[#e5e2d8] font-bold mb-4 tracking-tighter uppercase gold-glow">Select Your Masterclass</h2>
                    <div className="w-24 h-1 bg-[#F4C430] mx-auto"></div>
                </div>

                <div className="max-w-7xl mx-auto space-y-16">
                    {plans.map((plan, index) => (
                        <div 
                            key={plan.id} 
                            className={`group relative bg-[#1c1511] border border-[#F4C430]/15 flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-stretch overflow-hidden transition-all duration-700 hover:border-[#F4C430]/40 hover:shadow-[0_0_100px_rgba(244,196,48,0.05)]`}
                        >
                            {/* The Visual Wing (40%) */}
                            <div className={`w-full md:w-[45%] relative group overflow-hidden ${plan.stock_quantity === 0 ? 'grayscale brightness-[0.05]' : ''}`}>
                                <img 
                                    src={plan.image || '/images/silver_brass_box.png'} 
                                    alt={plan.name}
                                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                                />
                                {plan.stock_quantity === 0 && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[1px]">
                                        <div className="bg-black/90 border-y border-[#F4C430]/40 px-12 py-6 transform -rotate-12 shadow-[0_0_50px_rgba(0,0,0,1)] flex flex-col items-center">
                                            <span className="text-[#F4C430] uppercase tracking-[1em] text-xs font-black">Archive Sealed</span>
                                            <span className="text-gray-600 text-[8px] uppercase tracking-[0.5em] mt-2">Reserve Depleted</span>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 border-[20px] border-[#1c1511] z-20 pointer-events-none"></div>
                                <div className="absolute inset-0 m-5 border border-[#F4C430]/10 z-20 pointer-events-none"></div>
                            </div>

                            {/* The Descriptive Wing (55%) */}
                            <div className="w-full md:w-[55%] p-16 flex flex-col justify-center relative z-20">
                                {plan.stock_quantity === 0 ? (
                                    <div className="absolute top-8 right-8">
                                        <span className="material-symbols-outlined text-red-500/10 text-8xl animate-pulse">lock</span>
                                    </div>
                                ) : plan.badge_text && (
                                    <div className="inline-block self-start mb-8 bg-[#F4C430] text-[#1c1511] text-[10px] font-bold px-6 py-1.5 uppercase tracking-[0.4em]">
                                        {plan.badge_text}
                                    </div>
                                )}
                                
                                <div className="mb-12">
                                    <h3 className={`font-headline text-5xl font-bold uppercase tracking-[0.2em] mb-4 transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'text-[#e5e2d8]/20' : 'text-[#e5e2d8]'}`}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className={`h-[1px] w-12 transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'bg-[#F4C430]/10' : 'bg-[#F4C430]/40'}`}></div>
                                        <p className={`italic font-serif text-xl tracking-wide transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'text-[#F4C430]/20' : 'text-[#F4C430]/90'}`}>
                                            {plan.tagline || 'The Masterclass Box'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mb-16">
                                    {plan.features?.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-4 group/item">
                                            <span className={`material-symbols-outlined text-sm mt-1 transition-all duration-1000 ${plan.stock_quantity === 0 ? 'text-red-500/10' : 'text-[#F4C430]/60 group-hover/item:scale-150'}`}>
                                                {plan.stock_quantity === 0 ? 'lock' : 'verified'}
                                            </span>
                                            <p className={`font-serif text-base tracking-wide leading-relaxed transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'text-[#d1cec3]/10' : 'text-[#d1cec3]/70'}`}>
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex flex-col md:flex-row items-center gap-12">
                                    <div>
                                        {activeMembership && activeMembership.discount_percentage ? (
                                            <>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className={`line-through text-2xl font-serif transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'text-[#d1cec3]/10' : 'text-[#d1cec3]/40'}`}>
                                                        ₹{plan.price?.toLocaleString()}
                                                    </span>
                                                    {plan.stock_quantity > 0 && (
                                                        <span className="bg-[#F4C430]/10 text-[#F4C430] text-[9px] px-2 py-0.5 border border-[#F4C430]/20 tracking-[0.2em] font-bold">LINEAGE REBATE</span>
                                                    )}
                                                </div>
                                                <div className={`font-headline text-6xl font-bold tracking-tighter transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'text-[#F4C430]/10' : 'text-[#F4C430]'}`}>
                                                    ₹{calculateLineagePrice(plan.price).toLocaleString()}
                                                </div>
                                            </>
                                        ) : (
                                            <div className={`font-headline text-6xl font-bold tracking-tighter transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'text-[#F4C430]/10' : 'text-[#F4C430]'}`}>
                                                ₹{plan.price?.toLocaleString()}
                                            </div>
                                        )}
                                        <div className={`text-[10px] uppercase tracking-[0.5em] font-medium font-headline mt-1 transition-colors duration-1000 ${plan.stock_quantity === 0 ? 'text-[#F4C430]/10' : 'text-[#F4C430]/40'}`}>
                                            Commission Fee
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => handleAcquire(plan)}
                                        disabled={plan.stock_quantity === 0}
                                        className={`flex-grow w-full md:w-auto px-16 py-6 border uppercase tracking-[0.5em] text-xs font-bold transition-all duration-700 relative overflow-hidden group/btn shadow-xl ${
                                            plan.stock_quantity === 0
                                            ? 'bg-red-950/80 border-red-500 text-white cursor-not-allowed animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.2)]'
                                            : 'bg-transparent border-[#F4C430]/30 text-[#F4C430] hover:bg-[#F4C430] hover:text-[#1c1511]'
                                        }`}
                                    >
                                        {plan.stock_quantity === 0 && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                        )}
                                        <span className="relative z-10 transition-transform duration-500 inline-block group-hover/btn:translate-x-2 flex items-center justify-center gap-3">
                                            {plan.stock_quantity === 0 ? (
                                                <>
                                                    <span className="material-symbols-outlined text-[16px]">lock</span>
                                                    RESERVE LOCKED
                                                </>
                                            ) : 'Acquire Masterclass'}
                                        </span>
                                        {plan.stock_quantity > 0 && (
                                            <div className="absolute inset-0 bg-[#F4C430] -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-700 ease-out"></div>
                                        )}
                                    </button>
                                </div>
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
