import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "") : "http://localhost:8000") + "/api/memberships";

export default function Premium() {
    const { user } = useAuth();
    const [tiers, setTiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addItem } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTiers();
    }, []);

    const fetchTiers = async () => {
        try {
            const response = await api.get('memberships/tiers/');
            if (response && response.length > 0) {
                setTiers(response);
            } else {
                setTiers([
                    {
                        title: "Novice Sommelier",
                        price: "3,999.00",
                        billing_cycle: "Per Annum",
                        heritage_level: 1,
                        features: [
                            "Standard Archive Gallery Access",
                            "Basic Weather Telemetry",
                            "Seasonal Newsletters",
                            "Community Forum Access"
                        ],
                        slug: "novice",
                        discount_percentage: "10.00"
                    },
                    {
                        title: "Grandmaster Legacy",
                        price: "6,999.00",
                        billing_cycle: "Per Annum",
                        heritage_level: 2,
                        features: [
                            "Unlimited Acquisition Vault Access",
                            "High-Fidelity Macro Imagery",
                            "Lunar Plucking Priority",
                            "Real-time Weather Syncing",
                            "Personal Sommelier Consultations"
                        ],
                        slug: "grandmaster",
                        discount_percentage: "20.00"
                    },
                    {
                        title: "Estate Sovereign",
                        price: "13,599.00",
                        billing_cycle: "Per Annum",
                        heritage_level: 3,
                        features: [
                            "Direct Estate Lineage Access",
                            "Early Harvest Allocation",
                            "Exclusive Archive Hallmarking",
                            "VIP Private Estates Visiting",
                            "Ultra-Rare Batch Preservation"
                        ],
                        slug: "sovereign",
                        discount_percentage: "30.00"
                    }
                ]);
            }
        } catch (error) {
            console.error('Failed to fetch tiers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handlePurchase = (tier) => {
        // Add to cart as a special product
        const membershipItem = {
            id: `MEMB-${tier.slug}`,
            name: `${tier.title} Membership`,
            price: parseFloat(tier.price.replace(',', '')),
            image: '/images/premium_seal.png', // Placeholder for seal
            qty: 1,
            type: 'membership'
        };
        
        addItem(membershipItem);
        // Navigate to checkout for finalization
        navigate('/checkout');
    };

    return (
        <main className="bg-[#0d0a08] min-h-screen text-[#fcf9ee] font-serif relative overflow-hidden">
            {/* Cinematic Heritage Background */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img 
                    src={`/images/premium_lineage_backdrop_1775924148863.png`} 
                    className="w-full h-full object-cover opacity-40 saturate-[0.5] contrast-[1.1] scale-105"
                    alt="Himalayan Heritage"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a08] via-transparent to-[#0d0a08]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0d0a08] via-transparent to-[#0d0a08]"></div>
            </div>

            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(244,196,48,0.08)_0%,transparent_70%)]"></div>
                <div className="absolute top-0 w-full h-px bg-gradient-to-r from-transparent via-[#F4C430]/30 to-transparent"></div>
            </div>

            <header className="relative z-10 pt-32 pb-24 text-center px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8 inline-flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-[#F4C430]/40"></span>
                        <span className="font-label text-sm text-[#F4C430] uppercase tracking-[0.6em] font-black">Membership Lineage</span>
                        <span className="w-12 h-[1px] bg-[#F4C430]/40"></span>
                    </div>
                    <h1 className="font-headline text-7xl md:text-9xl text-white uppercase tracking-tighter leading-none mb-8">
                        THE GRANDMASTER <br/> <span className="text-[#F4C430] italic font-light">PORTAL</span>
                    </h1>
                    <p className="font-serif text-[#dcd4c3] text-xl md:text-2xl italic opacity-80 max-w-2xl mx-auto leading-relaxed">
                        "Elevate your lineage to gain exclusive access to the world's most guarded tea specimens and real-time archival telemetry."
                    </p>
                </div>
            </header>

            <section className="relative z-10 max-w-7xl mx-auto px-6 pb-48">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {tiers.map((tier) => {
                        const isActive = user?.profile?.active_membership?.slug === tier.slug;
                        return (
                            <div 
                                key={tier.slug} 
                                className={`relative group bg-[#1a1510]/60 border transition-all duration-700 p-12 flex flex-col ${
                                    isActive 
                                    ? 'border-[#F4C430] shadow-[0_0_50px_rgba(244,196,48,0.2)] scale-105 z-20'
                                    : (tier.heritage_level === 2 
                                        ? 'border-[#F4C430]/50 shadow-[0_30px_60px_rgba(244,196,48,0.1)] scale-105 z-20' 
                                        : 'border-white/5 hover:border-[#F4C430]/30 scale-100 z-10')
                                }`}
                            >
                                {isActive && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F4C430] text-[#120e0a] px-6 py-2 font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2">
                                        <span className="material-symbols-outlined text-[14px]">verified</span>
                                        Your Active Lineage
                                    </div>
                                )}
                                {!isActive && tier.heritage_level === 2 && (
                                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#F4C430]/80 text-[#120e0a] px-6 py-2 font-black text-[10px] uppercase tracking-widest shadow-2xl">
                                        Recommended Lineage
                                    </div>
                                )}

                                <div className="mb-12">
                                    <h3 className="font-headline text-4xl text-white uppercase mb-4 tracking-tight">{tier.title}</h3>
                                    <div className="flex items-baseline gap-2 mb-4">
                                        <span className="text-5xl text-[#F4C430] font-light">₹{tier.price}</span>
                                        <span className="text-[10px] text-[#dcd4c3]/40 uppercase font-black tracking-widest">/ {tier.billing_cycle}</span>
                                    </div>
                                    
                                    {/* Lineage Discount Badge */}
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F4C430]/10 border border-[#F4C430]/30 rounded-full">
                                        <span className="material-symbols-outlined text-[#F4C430] text-[18px]">sell</span>
                                        <span className="text-[14px] font-black uppercase tracking-wider text-[#F4C430]">
                                            {parseInt(tier.discount_percentage) || (tier.slug === 'novice' ? '10' : tier.slug === 'grandmaster' ? '20' : '30')}% Exclusive Discount
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-grow space-y-6 mb-16">
                                    <div className="text-[10px] text-[#F4C430]/60 uppercase tracking-widest font-black border-b border-white/5 pb-4">
                                        Archival Privileges
                                    </div>
                                    {tier.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-start gap-4 text-[#dcd4c3]/80 group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-[#F4C430] text-[18px]">verified</span>
                                            <span className="text-[15px] italic leading-tight">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <button 
                                    onClick={() => !isActive && handlePurchase(tier)}
                                    disabled={isActive}
                                    className={`w-full py-6 font-label uppercase text-[12px] tracking-[0.4em] font-black transition-all ${
                                        isActive
                                        ? 'bg-[#F4C430]/10 border border-[#F4C430] text-[#F4C430] cursor-default'
                                        : (tier.heritage_level === 2 
                                            ? 'bg-[#F4C430] text-[#120e0a] hover:bg-white shadow-[0_15px_30px_rgba(244,196,48,0.2)]' 
                                            : 'border border-[#F4C430]/30 text-[#F4C430] hover:bg-[#F4C430] hover:text-[#120e0a]')
                                    }`}
                                >
                                    {isActive ? 'Current Lineage Obtained' : 'Acquire Lineage'}
                                </button>

                            {/* Decorative Corner Accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#F4C430]/0 group-hover:border-[#F4C430]/40 transition-all"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#F4C430]/0 group-hover:border-[#F4C430]/40 transition-all"></div>
                        </div>
                        );
                    })}
                </div>

                <div className="mt-32 p-16 bg-white/5 border border-white/10 backdrop-blur-3xl text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <span className="material-symbols-outlined text-9xl">workspace_premium</span>
                    </div>
                    <h3 className="font-headline text-4xl text-white uppercase mb-8">Corporate & Legacy Gifting</h3>
                    <p className="font-serif text-[#dcd4c3] text-xl italic opacity-80 max-w-3xl mx-auto mb-10">
                        Elevate your entire organization's sensory experience. We offer bespoke heritage packages for corporate archival access.
                    </p>
                    <button className="px-12 py-5 border border-white/20 text-white font-label uppercase text-xs tracking-[0.3em] hover:bg-white hover:text-[#120e0a] transition-all">
                        Consult with an Archivist
                    </button>
                </div>
            </section>

            <style>{`
                .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 300; }
            `}</style>
        </main>
    );
}
