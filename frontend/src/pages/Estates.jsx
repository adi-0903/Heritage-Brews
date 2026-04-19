import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, "") : "http://localhost:8000") + "/api/weather";

const ESTATES_CONFIG = [
    {
        id: 'darjeeling',
        name: 'Makaibari Estate',
        location: 'High-Alt Darjeeling',
        image: `/images/makaibari_darjeeling_render_v2_1775905953067.png`,
        desc: '"Guardian of the same 40 acres his great-grandfather cleared in 1888."',
        history: "Makaibari is a living legend. Founded in 1859, it became the world's first tea estate to be certified Organic in 1988 and Biodynamic in 1993. The estate is a permaculture paradise, where 70% of the land is maintained as a tropical rainforest, fostering a unique microclimate that produces the legendary 'Silver Tips Imperial' plucked only under the full moon.",
        altitude: "4,500 - 6,000 ft",
        soil: "Sandy loam / Sub-tropical",
        notable: "Moonlight Plucking"
    },
    {
        id: 'assam',
        name: 'Dibrugarh Estate',
        location: 'Brahmaputra Valley',
        image: `/images/dibrugarh_assam_render_1775905900779.png`,
        desc: '"Specializing in the rare "Golden Tips" and robust malty flushes."',
        history: "Set in the heart of the Brahmaputra Valley, the Dibrugarh Estate is renowned for its intense, malty character. The rich alluvial soil of the valley floor, combined with extreme humidity and heat, forces the tea leaves to produce a high concentration of polyphenols, resulting in the world-famous 'Assam Strength' favored by master blenders for centuries.",
        altitude: "300 - 600 ft",
        soil: "Alluvial Floodplain",
        notable: "Malty Golden Tips"
    },
    {
        id: 'nilgiri',
        name: 'Coonoor Estate',
        location: 'Blue Mountains',
        image: `/images/coonoor_nilgiri_render_v2_1775905966904.png`,
        desc: '"Grown at 8,000 feet, offering a crisp, aromatic profile with notes of citrus."',
        history: "High in the clouds of the Western Ghats, the Coonoor Estate represents the elegance of the 'Blue Mountains'. The high altitude and cool temperatures slow the growth of the bush, concentrating the essential oils. The result is a 'Winter Frost' tea that is light, fragrant, and almost creamy, with a distinct floral citrus note that is found nowhere else on earth.",
        altitude: "6,500 - 8,000 ft",
        soil: "Red Loam / Clay",
        notable: "High-Alt Citrus"
    }
];

export default function Estates() {
    const { user } = useAuth();
    const { addItem, toggleCart } = useCart();
    const [weather, setWeather] = useState({});
    const [loading, setLoading] = useState(true);
    const [override, setOverride] = useState(null);
    const [selectedEstate, setSelectedEstate] = useState(null);
    const [showVault, setShowVault] = useState(false);
    const navigate = useNavigate();
    
    // Check for premium membership in the user's registry profile
    const isPremium = !!user?.profile?.active_membership;
    const [showPremiumModal, setShowPremiumModal] = useState(false);

    useEffect(() => {
        fetchTelemetry();
    }, []);

    const fetchTelemetry = async () => {
        try {
            const data = await api.get('weather/telemetry/');
            setWeather(data.estates || {});
        } catch (error) {
            console.error('Failed to fetch archival telemetry:', error);
        } finally {
            setLoading(false);
        }
    };

    const getAtmosphereClass = (condition) => {
        const cond = override || condition || '';
        const c = cond.toLowerCase();
        if (c.includes('rain') || c.includes('drizzle')) return 'atmosphere-misty has-rain';
        if (c.includes('cloud')) return 'atmosphere-overcast has-mist';
        if (c.includes('clear')) return 'atmosphere-golden';
        return '';
    };

    const vaultProducts = [
        {
            id: 'makaibari_gold',
            name: 'Makaibari "First Light"',
            estate: 'Darjeeling',
            desc: 'A ethereal First Flush harvested at dawn. Notes of muscatel and mountain mist.',
            price: 4500,
            image: `/images/makaibari_first_flush_macro_1775918544000_1775918704957.png`,
            dna: { elevation: '4,500ft', soil: 'Himalayan Loam', oxid: '15%' },
            archival: {
                batch: 'HB-MK-24-001',
                harvest: 'April 04, 2024',
                luminosity: 'Waning Crescent',
                sommelier: 'Exceptionally light cup. Hints of damp pine and wild honey.'
            }
        },
        {
            id: 'moonlight_imperial',
            name: 'Moonlight Imperial',
            estate: 'Darjeeling',
            desc: 'Ethereal Silver Needles plucked only under a full moon. The pinnacle of white tea.',
            price: 8500,
            image: `/images/moonlight_imperial_white_macro_1775919340083.png`,
            dna: { elevation: '6,800ft', soil: 'Mica-heavy', oxid: '5%' },
            archival: {
                batch: 'HB-MK-24-MOON',
                harvest: 'May 23, 2024',
                luminosity: 'Full Moon',
                sommelier: 'Cool, crystalline body. Notes of jasmine and night-blooming cereus.'
            }
        },
        {
            id: 'dibrugarh_tips',
            name: 'Brahmaputra Gold',
            estate: 'Assam',
            desc: 'Rare Golden Tips with a robust, malty heart. The physical weight of the valley.',
            price: 3200,
            image: `/images/dibrugarh_golden_tips_macro_1775918544002_1775918734056.png`,
            dna: { elevation: '150ft', soil: 'River Alluvial', oxid: '95%' },
            archival: {
                batch: 'HB-DB-24-V92',
                harvest: 'May 12, 2024',
                luminosity: 'Full Moon',
                sommelier: 'Thick, jammy body with dark chocolate and malt finish.'
            }
        },
        {
            id: 'ancestral_smoke',
            name: 'Ancestral Smoke',
            estate: 'Assam',
            desc: 'Wood-smoked black tea using Himalayan cedar. An ancient, robust flavor profile.',
            price: 5200,
            image: `/images/ancestral_smoke_assam_macro_1775919355456.png`,
            dna: { elevation: '200ft', soil: 'Iron-rich', oxid: '100%' },
            archival: {
                batch: 'HB-DB-24-SMK',
                harvest: 'June 02, 2024',
                luminosity: 'New Moon',
                sommelier: 'Smoky, leathery notes with an undertone of sweet molasses and cedar.'
            }
        },
        {
            id: 'coonoor_frost',
            name: 'Blue Mountain Frost',
            estate: 'Nilgiri',
            desc: 'A crystalline winter harvest. Crisp, aromatic, and steeped in high-alt history.',
            price: 3800,
            image: `/images/coonoor_frost_tea_macro_1775918544004_1775918760868.png`,
            dna: { elevation: '8,000ft', soil: 'Black Peat', oxid: '40%' },
            archival: {
                batch: 'HB-CN-24-F04',
                harvest: 'January 20, 2024',
                luminosity: 'Waxing Gibbous',
                sommelier: 'Floral citrus with a creamy mouthfeel. Bracingly crisp.'
            }
        },
        {
            id: 'emerald_frost',
            name: 'Emerald Frost',
            estate: 'Nilgiri',
            desc: 'Vibrant winter green tea needles. Cold-processed for absolute clarity.',
            price: 4100,
            image: `/images/emerald_frost_nilgiri_macro_1775919373586.png`,
            dna: { elevation: '7,500ft', soil: 'Clay-slate', oxid: '0%' },
            archival: {
                batch: 'HB-CN-24-ICE',
                harvest: 'February 15, 2024',
                luminosity: 'Waxing Gibbous',
                sommelier: 'Grass-fresh, with notes of cucumber and sweet mountain water.'
            }
        }
    ];

    const activeMembership = user?.profile?.active_membership;
    const calculateLineagePrice = (originalPrice) => {
        if (!activeMembership || !activeMembership.discount_percentage) return originalPrice;
        const discount = (originalPrice * activeMembership.discount_percentage) / 100;
        return originalPrice - discount;
    };

    const handleAcquire = (product) => {
        if (!isPremium) {
            setShowPremiumModal(true);
        } else {
            addItem({
                id: `vault_${product.id}`,
                name: product.name,
                price: product.price,
                image: product.image,
                category: 'Vault Archive'
            });
            setShowVault(false);
        }
    };

    const RegistrationGate = () => (
        <div className={`fixed inset-0 z-[300] flex items-center justify-center transition-all duration-700 ${showPremiumModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-[#0d0a08]/95 backdrop-blur-2xl" onClick={() => setShowPremiumModal(false)}></div>
            <div className="relative w-full max-w-2xl bg-[#1a1510] border-2 border-[#F4C430]/30 p-16 text-center shadow-[0_0_100px_rgba(244,196,48,0.1)]">
                <div className="flex justify-center mb-10">
                    <div className="w-24 h-24 rounded-full border border-[#F4C430]/50 flex items-center justify-center text-[#F4C430] animate-pulse">
                        <span className="material-symbols-outlined text-6xl">lock_open</span>
                    </div>
                </div>
                <h2 className="font-headline text-5xl text-white uppercase mb-6">Archival Access Restricted</h2>
                <p className="font-serif text-[#dcd4c3] text-xl italic mb-12 opacity-80">
                    Proprietary specimens from the Heritage Brews vault are reserved for **Premium Grandmasters** only. Your current lineage does not have the clearance for this acquisition.
                </p>
                <div className="space-y-6">
                    <button 
                        onClick={() => navigate('/premium')}
                        className="w-full py-7 bg-[#F4C430] text-[#120e0a] font-label uppercase text-sm tracking-[0.5em] font-black hover:bg-white transition-all shadow-xl"
                    >
                        Elevate to Premium Mastery
                    </button>
                    <button 
                        onClick={() => setShowPremiumModal(false)}
                        className="w-full py-5 border border-[#F4C430]/20 text-[#F4C430]/60 font-label uppercase text-xs tracking-[0.3em] hover:bg-white/5 transition-all"
                    >
                        Return to Gallery
                    </button>
                </div>
            </div>
        </div>
    );

    const AcquisitionVault = () => (
        <div className={`fixed inset-0 z-[200] transition-all duration-1000 ${showVault ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-[#0d0a08]/98 backdrop-blur-3xl"></div>
            
            {/* Structural Telemetry Sidebar */}
            <div className="absolute left-0 top-0 bottom-0 w-20 border-r border-[#F4C430]/10 flex flex-col items-center py-10 gap-16 z-20 overflow-hidden hidden md:flex">
                <span className="font-label text-[#F4C430] text-[12px] uppercase vertical-text tracking-[0.8em] opacity-30">ARCHIVAL_SIGNAL_STABLE</span>
                <div className="flex flex-col gap-4">
                    {[1,2,3,4,5].map(i => <div key={i} className="w-[1px] h-8 bg-gradient-to-b from-[#F4C430]/50 to-transparent"></div>)}
                </div>
            </div>

            <div className="relative z-10 pl-20 pr-10 py-12 flex justify-between items-center border-b border-[#F4C430]/10">
                <div className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F4C430] animate-pulse shadow-[0_0_15px_#F4C430]"></span>
                        <span className="font-label text-[#F4C430] text-[13px] tracking-[0.5em] uppercase font-black">Limited Release Vault</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <h2 className="font-headline text-5xl text-white tracking-tighter uppercase">The Acquisition Portal</h2>
                        {isPremium && (
                            <span className="px-4 py-1.5 border border-green-500/50 text-green-500 font-label uppercase text-[10px] tracking-widest rounded-full animate-pulse">Premium Gene-Linked</span>
                        )}
                    </div>
                </div>
                <button 
                    onClick={() => setShowVault(false)}
                    className="w-20 h-20 rounded-full border border-[#F4C430]/20 flex items-center justify-center text-[#F4C430] hover:bg-[#F4C430] hover:text-[#120e0a] transition-all duration-500 group"
                >
                    <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">close</span>
                </button>
            </div>

            <div className="relative z-10 h-[calc(100vh-140px)] overflow-y-auto pl-20 pr-10 py-16">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                    {vaultProducts.map((product) => (
                        <div key={product.id} className="group relative bg-[#1a1510]/40 border border-[#F4C430]/5 hover:border-[#F4C430]/30 transition-all duration-700 overflow-hidden p-10 flex flex-col">
                            {/* Technical Header */}
                            <div className="flex justify-between items-start mb-8 font-mono text-[12px] text-[#F4C430]/60 uppercase tracking-widest">
                                <span>Batch: {product.archival.batch}</span>
                                <span className={`flex items-center gap-2 ${isPremium ? 'text-green-500' : 'text-[#F4C430]'}`}>
                                    <span className="material-symbols-outlined text-[14px]">{isPremium ? 'verified' : 'security'}</span>
                                    {isPremium ? 'Authorized' : 'Locked'}
                                </span>
                            </div>

                            <div className="aspect-[4/5] mb-12 overflow-hidden relative border border-[#F4C430]/10 bg-black">
                                <img src={product.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[2000ms] group-hover:scale-110" alt={product.name} />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1a1510] to-transparent z-10"></div>
                                <div className="absolute top-8 right-8 z-20">
                                    <div className="bg-[#120e0a]/80 border border-[#F4C430]/30 text-[#F4C430] px-5 py-2 font-black text-[10px] uppercase tracking-widest shadow-2xl backdrop-blur-md flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4C430] animate-pulse"></span>
                                        Premium Exclusive
                                    </div>
                                </div>
                                
                                <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center px-4">
                                    <div className="inline-block whitespace-nowrap bg-[#120e0a]/90 px-4 py-2.5 border border-[#F4C430]/40 shadow-2xl backdrop-blur-md">
                                        <span className="text-[12px] text-[#F4C430] tracking-[0.2em] font-black uppercase text-center block leading-none">
                                            {product.estate} HALLMARK
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 flex-grow">
                                <h3 className="font-headline text-4xl text-white uppercase tracking-tight">{product.name}</h3>
                                
                                <div className="p-6 bg-white/5 border-l-4 border-[#F4C430]/40 italic text-[14px] text-[#dcd4c3] opacity-90 leading-relaxed font-serif min-h-[80px]">
                                    "{product.archival.sommelier}"
                                </div>

                                <div className="py-8 border-y border-[#F4C430]/10 space-y-6">
                                    <div className="flex justify-between items-center text-[12px] tracking-widest text-[#F4C430]/60 uppercase font-black">
                                        <span>Terroir DNA Spectrum</span>
                                        <span className="text-[#F4C430] flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                            Synchronized
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex flex-col gap-2 p-4 bg-[#120e0a]/50 border border-white/5">
                                                <span className="text-[10px] text-[#F4C430]/50 uppercase tracking-widest font-black">Elevation</span>
                                                <span className="text-[15px] text-white font-mono font-bold">{product.dna.elevation}</span>
                                            </div>
                                            <div className="flex flex-col gap-2 p-4 bg-[#120e0a]/50 border border-white/5">
                                                <span className="text-[10px] text-[#F4C430]/50 uppercase tracking-widest font-black">Oxid. Curve</span>
                                                <span className="text-[15px] text-white font-mono font-bold">{product.dna.oxid}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 p-4 bg-[#120e0a]/50 border border-white/5">
                                            <span className="text-[10px] text-[#F4C430]/50 uppercase tracking-widest font-black">Harvest Moon Phase</span>
                                            <span className="text-[15px] text-white font-mono font-bold">{product.archival.luminosity}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8 pt-6">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[12px] text-[#F4C430]/50 uppercase tracking-[0.2em] font-black mb-1">Legacy Value</span>
                                            <div className="flex items-baseline gap-3">
                                                {activeMembership && activeMembership.discount_percentage ? (
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xl text-[#dcd4c3]/30 line-through font-serif italic">₹{product.price?.toLocaleString()}</span>
                                                            <span className="text-[10px] text-[#F4C430] font-black tracking-widest bg-[#F4C430]/10 px-2 py-0.5 border border-[#F4C430]/20">-{activeMembership.discount_percentage}% LINEAGE REBATE</span>
                                                        </div>
                                                        <span className="text-5xl text-[#F4C430] font-serif tracking-tight">₹{calculateLineagePrice(product.price).toLocaleString()}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-4xl text-white font-serif tracking-tight">₹{product.price?.toLocaleString()}</span>
                                                )}
                                                <span className="text-[12px] text-[#dcd4c3]/40 uppercase font-black">/ PROCUREMENT</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleAcquire(product)}
                                        className={`group/buy relative w-full py-7 font-label uppercase text-[13px] tracking-[0.4em] font-black overflow-hidden transition-all shadow-[0_15px_30px_rgba(244,196,48,0.2)] ${
                                            isPremium 
                                            ? 'bg-[#F4C430] text-[#120e0a] hover:bg-white' 
                                            : 'bg-transparent border border-[#F4C430]/40 text-[#F4C430] hover:bg-[#F4C430]/10'
                                        }`}
                                    >
                                        <div className="relative z-10 flex items-center justify-center gap-4">
                                            {!isPremium && <span className="material-symbols-outlined text-[18px]">lock</span>}
                                            {isPremium ? 'Acquire for Archive' : 'Premium Required'}
                                        </div>
                                        {isPremium && <span className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover/buy:opacity-100 transition-all font-black text-2xl">→</span>}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <style>{`
                    .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
                `}</style>
            </div>
        </div>
    );

    return (
        <main className="bg-[#120e0a] text-[#fcf9ee] font-serif relative overflow-hidden min-h-screen">
            <AcquisitionVault />
            <RegistrationGate />
            <style>{`
                .material-symbols-outlined { font-variation-settings: 'FILL' 1, 'wght' 300; }
                .indian-pattern-bg {
                    background-image: url('/images/indian_pattern.png');
                    background-size: 300px 300px;
                    opacity: 0.03;
                    mix-blend-mode: color-dodge;
                }
                .gold-glow { text-shadow: 0 0 30px rgba(244,196,48,0.4); }
                
                .atmosphere-misty { filter: saturate(0.7) contrast(0.9) brightness(0.9); transition: all 2s ease; }
                .has-rain::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(105deg, transparent 48%, rgba(255,255,255,0.15) 50%, transparent 52%),
                        linear-gradient(105deg, transparent 48%, rgba(255,255,255,0.08) 50%, transparent 52%);
                    background-size: 60px 200px, 110px 300px;
                    animation: rain-diagonal 0.8s linear infinite;
                    z-index: 5;
                    pointer-events: none;
                    opacity: 0.7;
                }
                @keyframes rain-diagonal {
                    0% { background-position: 0 0, 0 0; }
                    100% { background-position: 80px 800px, -40px 600px; }
                }

                .has-mist::after {
                    content: '';
                    position: absolute;
                    inset: -100%;
                    background: radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 60%);
                    animation: archival-mist 20s ease-in-out infinite alternate;
                    z-index: 4;
                    pointer-events: none;
                }
                @keyframes archival-mist {
                    0% { transform: translate(-10%, -10%) scale(1); }
                    100% { transform: translate(10%, 10%) scale(1.2); }
                }

                .animate-signal { animation: pulse-signal 2s infinite ease-in-out; }
            `}</style>

            <div className="fixed inset-0 pointer-events-none indian-pattern-bg"></div>

            {/* Cinematic Header */}
            <header className="relative pt-32 pb-48 text-center px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="mb-12 inline-flex items-center gap-6">
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F4C430]"></div>
                        <span className="font-label text-sm text-[#F4C430] uppercase tracking-[0.8em] font-black">Archive Series</span>
                        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F4C430]"></div>
                    </div>
                    <h1 className="font-headline text-8xl md:text-[10rem] text-white uppercase tracking-tighter leading-[0.8] mb-12 gold-glow">
                        <span className="block italic font-light text-5xl md:text-7xl mb-4 tracking-normal lowercase">the</span>
                        ESTATES
                    </h1>
                    <p className="font-serif text-[#dcd4c3] text-xl md:text-3xl italic opacity-80 max-w-2xl mx-auto border-t border-b border-[#F4C430]/20 py-8">
                        "Visualizing the atmospheric weight of history."
                    </p>
                </div>
            </header>

            {/* Estates Grid */}
            <section className="max-w-[1600px] mx-auto px-10 pb-48 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
                    {ESTATES_CONFIG.map((estate) => {
                        const status = weather[estate.id] || { temp: '--', condition: 'Synk...', is_live: false };
                        const atmosphere = getAtmosphereClass(status.condition);
                        
                        return (
                            <div key={estate.id} className="group flex flex-col items-center">
                                <div className={`relative w-full aspect-[4/5] overflow-hidden border border-[#F4C430]/10 bg-[#161210] transition-all duration-[2000ms] group-hover:border-[#F4C430]/40 shadow-2xl ${atmosphere}`}>
                                    <img src={estate.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-[1500ms] group-hover:scale-105" alt={estate.name} />
                                    
                                    <div className="absolute top-6 left-6 flex items-center gap-3 px-6 py-3 bg-[#120e0a]/90 backdrop-blur-md border border-[#F4C430]/20 z-30">
                                        <div className={`w-3 h-3 rounded-full ${override || status.is_live ? 'bg-green-500 shadow-[0_0_15px_rgba(34,197,94,0.8)]' : 'bg-[#F4C430]'} animate-signal`}></div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#F4C430] font-black">{override ? 'Debug Mode' : (status.is_live ? 'Live Signal' : 'Archival Feed')}</span>
                                            <span className="text-sm text-white font-bold tracking-tight">
                                                {override ? override.toUpperCase() : (status.condition || 'SYNK...')} • {status.temp || '--'}°C
                                            </span>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-10 left-10 right-10 z-20">
                                        <span className="text-[#F4C430] text-xs uppercase tracking-[0.5em] font-black block mb-4">{estate.location}</span>
                                        <h3 className="font-headline text-4xl text-white uppercase tracking-wider leading-tight">{estate.name}</h3>
                                    </div>
                                </div>

                                <div className="mt-12 text-center px-4">
                                    <p className="font-serif text-[#dcd4c3] text-xl italic opacity-85 mb-10 max-w-[320px] mx-auto leading-relaxed">
                                        {estate.desc}
                                    </p>
                                    <button 
                                        onClick={() => setSelectedEstate(estate)}
                                        className="inline-flex items-center gap-4 text-[#F4C430] font-label uppercase text-xs tracking-[0.4em] font-black group/btn"
                                    >
                                        Explore the Terroir 
                                        <span className="material-symbols-outlined text-[18px] group-hover/btn:translate-x-2 transition-transform">arrow_right_alt</span>
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Cinematic Library Backdrop & Final CTA */}
            <section className="relative py-48 overflow-hidden bg-[#0d0a08]">
                <div className="absolute inset-0 z-0">
                    <img src={`/images/cinematic_library_background.png`} className="w-full h-full object-cover brightness-[0.2] saturate-[0.6] scale-105" alt="Archival Background" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d0a08] via-transparent to-[#120e0a]"></div>
                </div>

                <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-32">
                    <div className="relative p-10 md:p-24 bg-[#1a1510]/80 backdrop-blur-2xl border border-[#F4C430]/10 shadow-[0_60px_120px_rgba(0,0,0,0.95)] overflow-hidden">
                        <div className="text-center relative z-20">
                            <h3 className="font-headline text-5xl md:text-7xl text-white uppercase mb-12">
                                <span className="block mb-2">Preserving the</span>
                                <span className="text-[#F4C430] italic font-light">Spirit of the Terrain</span>
                            </h3>
                            <p className="font-serif text-[#dcd4c3] text-xl md:text-2xl italic leading-relaxed opacity-90 max-w-3xl mx-auto">
                                Our telemetry system honors the delicate balance of nature. When the monsoon hit Darjeeling last June, our patrons watched the archive darken in solidarity with the harvest.
                            </p>
                        </div>
                    </div>

                    <div className="text-center py-20">
                        <h3 className="font-headline text-4xl md:text-6xl italic text-white mb-16 opacity-90 gold-glow">Taste the heritage for yourself.</h3>
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-10">
                            <button 
                                onClick={() => setShowVault(true)}
                                className="group relative px-16 py-6 overflow-hidden min-w-[300px] border border-[#F4C430]/60 hover:border-[#F4C430] transition-colors"
                            >
                                <div className="absolute inset-0 bg-[#F4C430] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                <span className="relative z-10 font-label uppercase tracking-[0.4em] font-black text-[#F4C430] group-hover:text-[#120e0a] transition-colors text-sm">Shop Single Estate</span>
                            </button>
                            <a href="#" className="group relative px-16 py-6 overflow-hidden min-w-[300px] border border-white/20 hover:border-white transition-all backdrop-blur-md">
                                <span className="relative z-10 font-label uppercase tracking-[0.4em] font-black text-white text-sm">Book a Tasting</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terroir Revelation Modal */}
            {selectedEstate && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 md:p-12">
                    <div className="absolute inset-0 bg-[#0d0a08]/95 backdrop-blur-xl" onClick={() => setSelectedEstate(null)}></div>
                    <div className="relative w-full max-w-6xl bg-[#1a1510] border border-[#F4C430]/20 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row">
                        <div className="relative w-full md:w-1/2 overflow-hidden bg-black h-64 md:h-auto">
                            <img src={selectedEstate.image} className="w-full h-full object-cover opacity-80" alt={selectedEstate.name} />
                        </div>
                        <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                            <span className="font-label text-sm text-[#F4C430] tracking-[0.6em] uppercase mb-6 block font-black">{selectedEstate.location}</span>
                            <h2 className="font-headline text-5xl md:text-7xl text-white uppercase leading-none mb-10">{selectedEstate.name}</h2>
                            <p className="font-serif text-[#dcd4c3] text-xl italic opacity-90 mb-12">{selectedEstate.history}</p>
                            <button className="w-full py-6 bg-[#F4C430] text-[#120e0a] font-label uppercase text-xs tracking-[0.5em] font-black hover:bg-white transition-all shadow-xl">
                                Secured Batch Acquisition
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
