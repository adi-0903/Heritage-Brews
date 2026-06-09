import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DEFAULT_SPICES = [
    { id: 1, name_en: 'Elaichi', name_hi: 'इलायची', description: 'Green Cardamom • Sweet & Floral', icon: 'local_florist', default_intensity: 30, display_order: 1 },
    { id: 2, name_en: 'Adrak', name_hi: 'अदरक', description: 'Dried Ginger • Sharp & Zesty', icon: 'eco', default_intensity: 60, display_order: 2 },
    { id: 3, name_en: 'Laung', name_hi: 'लौंग', description: 'Cloves • Intensely Pungent', icon: 'spa', default_intensity: 15, display_order: 3 },
    { id: 4, name_en: 'Dalchini', name_hi: 'दालचीनी', description: 'Cinnamon • Woody & Sweet', icon: 'forest', default_intensity: 45, display_order: 4 },
    { id: 5, name_en: 'Saunf', name_hi: 'सौंफ', description: 'Fennel • Cooling & Refreshing', icon: 'filter_vintage', default_intensity: 20, display_order: 5 },
    { id: 6, name_en: 'Kesar', name_hi: 'केसर', description: 'Saffron • Earthy & Regal', icon: 'diamond', default_intensity: 10, display_order: 6 },
];

export default function ChaiMasala() {
    const { user, isAuthenticated } = useAuth();
    const { addItem, toggleCart } = useCart();
    const navigate = useNavigate();

    const [spices, setSpices] = useState([]);
    const [intensities, setIntensities] = useState({});
    const [blendName, setBlendName] = useState("Grandmother's Evening Chai");
    const [isPublic, setIsPublic] = useState(false);
    
    const [savedBlends, setSavedBlends] = useState([]);
    const [communityBlends, setCommunityBlends] = useState([]);
    const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'community'
    
    const [loadingSpices, setLoadingSpices] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [feedback, setFeedback] = useState({ message: '', type: '' }); // 'success' | 'error'
    const [activeSpice, setActiveSpice] = useState(null);

    // Fetch resources on mount
    useEffect(() => {
        loadSpices();
        if (isAuthenticated) {
            loadSavedBlends();
        }
        loadCommunityBlends();
    }, [isAuthenticated]);

    const loadSpices = async () => {
        try {
            setLoadingSpices(true);
            const data = await api.get('blends/spices/');
            const spicesList = Array.isArray(data) ? data : (data?.results || []);
            
            if (spicesList.length === 0) {
                setSpices(DEFAULT_SPICES);
                initializeIntensities(DEFAULT_SPICES);
            } else {
                // Ensure correct ordering
                const sorted = [...spicesList].sort((a,b) => a.display_order - b.display_order);
                setSpices(sorted);
                initializeIntensities(sorted);
            }
        } catch (error) {
            console.error('Failed to load spices from backend, reverting to defaults:', error);
            setSpices(DEFAULT_SPICES);
            initializeIntensities(DEFAULT_SPICES);
        } finally {
            setLoadingSpices(false);
        }
    };

    const initializeIntensities = (spicesList) => {
        const initial = {};
        spicesList.forEach(s => {
            initial[s.name_en] = s.default_intensity || 0;
        });
        setIntensities(initial);
    };

    const loadSavedBlends = async () => {
        try {
            const data = await api.get('blends/');
            setSavedBlends(Array.isArray(data) ? data : (data?.results || []));
        } catch (error) {
            console.error('Failed to fetch personal custom blends:', error);
        }
    };

    const loadCommunityBlends = async () => {
        try {
            const data = await api.get('blends/community/');
            setCommunityBlends(Array.isArray(data) ? data : (data?.results || []));
        } catch (error) {
            console.error('Failed to fetch community blends:', error);
        }
    };

    // Update individual spice intensity
    const handleSliderChange = (spiceName, value) => {
        setIntensities(prev => ({
            ...prev,
            [spiceName]: parseInt(value)
        }));
    };

    // Load an existing recipe into the blender
    const handleLoadRecipe = (blend) => {
        setBlendName(blend.name);
        setIsPublic(blend.is_public);
        
        const newIntensities = {};
        // Make sure all current spices are defined, even if the blend doesn't include them
        spices.forEach(s => {
            newIntensities[s.name_en] = blend.spice_levels[s.name_en] || 0;
        });
        setIntensities(newIntensities);

        setFeedback({ message: `Formulation "${blend.name}" loaded into the Crucible.`, type: 'success' });
        setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
        
        // Scroll smoothly back to top visualization
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Save recipe to the DB
    const handleSaveRecipe = async () => {
        if (!isAuthenticated) {
            setFeedback({ message: 'Authentication required. Sign in to write this recipe to the Royal Registry.', type: 'error' });
            setTimeout(() => setFeedback({ message: '', type: '' }), 6000);
            return;
        }

        try {
            setIsSaving(true);
            const payload = {
                name: blendName,
                spice_levels: intensities,
                flavor_tags: calculatedTags,
                is_public: isPublic
            };

            await api.post('blends/', payload);
            setFeedback({ message: 'Recipe inscribed! Placed inside the Sanctuary Vault.', type: 'success' });
            
            // Re-fetch custom lists
            loadSavedBlends();
            loadCommunityBlends();
            setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
        } catch (error) {
            console.error('Failed to secure blend in database:', error);
            setFeedback({ message: error.message || 'The spirits of the estate are restless. Failed to save.', type: 'error' });
            setTimeout(() => setFeedback({ message: '', type: '' }), 5000);
        } finally {
            setIsSaving(false);
        }
    };

    // Delete custom recipe
    const handleDeleteBlend = async (id) => {
        try {
            await api.delete(`blends/${id}/`);
            setFeedback({ message: 'Recipe erased from your personal vault.', type: 'success' });
            loadSavedBlends();
            loadCommunityBlends();
            setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
        } catch (error) {
            console.error('Failed to erase custom blend:', error);
            setFeedback({ message: 'Failed to erase recipe.', type: 'error' });
            setTimeout(() => setFeedback({ message: '', type: '' }), 4000);
        }
    };

    // Add custom blend to checkout cart
    const handleAcquireCustomBlend = () => {
        const customProduct = {
            id: `custom_blend_${Date.now()}`,
            name: `${blendName} (Bespoke)`,
            price: 350.00, // Premium Custom Blending flat rate
            image: '/images/premium_menu_hero.png', 
            category: 'Bespoke Blend',
            is_custom_blend: true,
            spice_levels: intensities,
            tags: calculatedTags
        };

        addItem(customProduct);
        setFeedback({ message: `Success! Added "${blendName}" to your Imperial Basket.`, type: 'success' });
        setTimeout(() => setFeedback({ message: '', type: '' }), 4000);

        // Slide out cart drawer for excellent visual validation
        toggleCart();
    };

    // Real-time calculations
    const spiceKeys = Object.keys(intensities);
    const avgIntensity = spiceKeys.length > 0
        ? Math.round(spiceKeys.reduce((sum, key) => sum + intensities[key], 0) / spiceKeys.length)
        : 0;

    const calculatedIntensityLabel = avgIntensity > 70 
        ? 'Bold' 
        : avgIntensity > 40 
        ? 'Aromatic' 
        : 'Mild';

    const calculatedTags = (() => {
        const tags = [];
        if ((intensities['Adrak'] || 0) > 50) tags.push('🌶️ Zesty Heat');
        if ((intensities['Kesar'] || 0) > 25) tags.push('👑 Imperial Gold');
        if ((intensities['Elaichi'] || 0) > 40) tags.push('🌸 Sweet Flora');
        if ((intensities['Saunf'] || 0) > 45) tags.push('🍃 Cooling Mint');
        if ((intensities['Dalchini'] || 0) > 40) tags.push('🪵 Woody Forest');
        if ((intensities['Laung'] || 0) > 35) tags.push('🔥 Fiery Cloves');

        if (tags.length === 0) {
            if (avgIntensity > 70) tags.push('Spicy');
            else if (avgIntensity > 40) tags.push('Aromatic');
            else tags.push('Subtle');
        }

        return tags.slice(0, 3);
    })();

    if (loadingSpices) {
        return (
            <div className="min-h-screen bg-[#120e0a] flex items-center justify-center">
                <div className="text-[#F4C430] font-headline text-2xl animate-pulse italic">
                    Illuminating the Spice Market...
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#120e0a] text-[#fcf9ee] font-serif min-h-screen relative overflow-hidden pb-32 pt-28">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                .indian-pattern-bg {
                    background-image: url('/images/indian_pattern.png');
                    background-size: 300px 300px;
                    opacity: 0.03;
                    mix-blend-mode: color-dodge;
                }
                .custom-slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 2px;
                    background: rgba(244, 196, 48, 0.2);
                    outline: none;
                    transition: background 0.3s;
                }
                .custom-slider:hover {
                    background: rgba(244, 196, 48, 0.4);
                }
                .custom-slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    background: #F4C430;
                    cursor: pointer;
                    border-radius: 0;
                    box-shadow: 0 0 10px rgba(244, 196, 48, 0.8);
                    transition: transform 0.1s;
                }
                .custom-slider::-webkit-slider-thumb:hover {
                    transform: scale(1.3);
                }
                .glass-parchment {
                    background: rgba(26, 21, 16, 0.65);
                    backdrop-filter: blur(24px);
                    border: 1px solid rgba(244, 196, 48, 0.15);
                }
                .shimmer-active {
                    animation: banner-shimmer 2s infinite linear;
                }
                @keyframes banner-shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>

            {/* Background pattern layer */}
            <div className="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

            {/* Sovereign notification overlay */}
            <AnimatePresence>
                {feedback.message && (
                    <motion.div
                        initial={{ opacity: 0, y: -100, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -100, scale: 0.9 }}
                        className={`fixed top-24 left-1/2 -translate-x-1/2 z-[400] px-12 py-5 shadow-2xl flex items-center gap-4 border text-sm font-bold uppercase tracking-wider backdrop-blur-md ${
                            feedback.type === 'success'
                                ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/30'
                                : 'bg-red-950/90 text-red-300 border-red-500/30'
                        }`}
                    >
                        <span className="material-symbols-outlined text-lg">
                            {feedback.type === 'success' ? 'verified' : 'gpp_bad'}
                        </span>
                        {feedback.message}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-[1500px] mx-auto px-10 relative z-10">
                {/* Immersive Header */}
                <div className="text-center max-w-4xl mx-auto mb-20">
                    <div className="mb-6 inline-flex items-center gap-6">
                        <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-[#F4C430]"></div>
                        <span className="font-label text-xs text-[#F4C430] uppercase tracking-[0.8em] font-black">Aromatic Alchemy</span>
                        <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-[#F4C430]"></div>
                    </div>
                    <h1 className="font-headline text-6xl md:text-8xl text-white uppercase tracking-tighter mb-6">
                        The Chai Masala <span className="text-[#F4C430] italic font-light">Builder</span>
                    </h1>
                    <p className="text-lg text-[#c4b5a2] italic max-w-2xl mx-auto leading-relaxed">
                        Become a master of flushes and spice weight. Slowly blend ten essential dry ingredients to create a recipe worthy of imperial heritage.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* LEFT COLUMN: Interactive Spice Bazaar */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex items-center justify-between border-b border-[#F4C430]/10 pb-4 mb-6">
                            <h2 className="font-headline text-3xl text-white uppercase tracking-widest">The Ten Essentials</h2>
                            <span className="text-[10px] text-[#c4b5a2]/60 uppercase tracking-widest font-mono">Real-time tele-blending</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {spices.map(spice => {
                                const level = intensities[spice.name_en] || 0;
                                const isActive = level > 0;

                                return (
                                    <div
                                        key={spice.id}
                                        className={`glass-parchment p-8 flex flex-col justify-between transition-all duration-500 relative group hover:border-[#F4C430]/40 ${
                                            isActive ? 'shadow-[0_0_30px_rgba(244,196,48,0.05)] border-[#F4C430]/30' : ''
                                        }`}
                                        onMouseEnter={() => setActiveSpice(spice.name_en)}
                                        onMouseLeave={() => setActiveSpice(null)}
                                    >
                                        {/* Subtle internal glowing backdrop for active spice */}
                                        <div
                                            className={`absolute inset-0 bg-[#F4C430]/[0.01] pointer-events-none transition-opacity duration-500 ${
                                                isActive ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        />

                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div>
                                                <span className="text-[10px] tracking-[0.2em] uppercase text-[#F4C430] font-black block mb-1">
                                                    {spice.name_en}
                                                </span>
                                                <h3 className="font-headline text-4xl text-white tracking-wide">
                                                    {spice.name_hi}
                                                </h3>
                                            </div>
                                            <span
                                                className={`material-symbols-outlined text-4xl transition-colors duration-500 ${
                                                    isActive ? 'text-[#F4C430]' : 'text-white/10 group-hover:text-white/30'
                                                }`}
                                            >
                                                {spice.icon || 'spa'}
                                            </span>
                                        </div>

                                        <p className="text-sm text-[#c4b5a2]/90 italic mb-8 min-h-[40px] leading-relaxed relative z-10">
                                            {spice.description}
                                        </p>

                                        <div className="space-y-4 relative z-10">
                                            <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#c4b5a2]/40 font-mono font-bold">
                                                <span>Mild</span>
                                                <span className="text-[#F4C430]">{level}%</span>
                                                <span>Strong</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={level}
                                                onChange={(e) => handleSliderChange(spice.name_en, e.target.value)}
                                                className="custom-slider"
                                                id={`slider-${spice.name_en.toLowerCase()}`}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: The Alchemy Crucible Preview Panel */}
                    <div className="lg:col-span-4 sticky top-32 z-20">
                        <div className="glass-parchment p-8 relative shadow-[0_30px_60px_rgba(0,0,0,0.8)] border-[#F4C430]/20">
                            {/* Accent double corners */}
                            <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#F4C430]/5 pointer-events-none" />

                            <div className="text-center mb-10 relative z-10">
                                <span className="text-[10px] uppercase tracking-[0.3em] text-[#F4C430] font-black mb-2 block">Live Recipe Spectrum</span>
                                <input
                                    type="text"
                                    value={blendName}
                                    onChange={(e) => setBlendName(e.target.value)}
                                    className="bg-transparent border-b border-[#F4C430]/20 focus:border-[#F4C430] text-white text-center font-headline text-3xl italic tracking-tight outline-none w-full py-2 hover:bg-white/5 focus:bg-[#120e0a] transition-all"
                                    placeholder="Name your recipe..."
                                    id="blend-name-input"
                                />
                            </div>

                            {/* Mortar & Pestle Particles Simulation pot */}
                            <div className="relative w-full aspect-square flex items-center justify-center mb-10 bg-[#120e0a] border border-[#F4C430]/15 rounded-full shadow-[inset_0_0_50px_rgba(0,0,0,0.9)] overflow-hidden">
                                {/* Floating dynamic particles based on sliders */}
                                <div className="absolute inset-0 z-0">
                                    {spices.map(spice => {
                                        const level = intensities[spice.name_en] || 0;
                                        const count = Math.min(8, Math.floor(level / 12)); // up to 8 particles
                                        const colorMap = {
                                            'Elaichi': 'bg-emerald-500 shadow-[0_0_8px_#10b981]',
                                            'Adrak': 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
                                            'Laung': 'bg-red-800 shadow-[0_0_8px_#991b1b]',
                                            'Dalchini': 'bg-yellow-800 shadow-[0_0_8px_#854d0e]',
                                            'Saunf': 'bg-lime-400 shadow-[0_0_8px_#a3e635]',
                                            'Kesar': 'bg-orange-500 shadow-[0_0_8px_#f97316]'
                                        };
                                        const colorClass = colorMap[spice.name_en] || 'bg-[#F4C430]';

                                        return Array.from({ length: count }).map((_, idx) => {
                                            const delay = (idx * 0.7) % 3;
                                            const top = 30 + ((idx * 13) % 40); 
                                            const left = 30 + ((idx * 17) % 40); 
                                            const size = 6 + ((idx * 2) % 6);

                                            return (
                                                <motion.div
                                                    key={`${spice.name_en}_particle_${idx}`}
                                                    className={`absolute rounded-full ${colorClass}`}
                                                    style={{
                                                        width: size,
                                                        height: size,
                                                        top: `${top}%`,
                                                        left: `${left}%`
                                                    }}
                                                    animate={{
                                                        x: [0, (idx % 2 === 0 ? 15 : -15), (idx % 2 === 0 ? -10 : 10), 0],
                                                        y: [0, (idx % 2 === 0 ? -20 : 20), (idx % 2 === 0 ? 15 : -15), 0],
                                                    }}
                                                    transition={{
                                                        duration: 4 + (idx % 3),
                                                        repeat: Infinity,
                                                        delay: delay,
                                                        ease: 'easeInOut'
                                                    }}
                                                />
                                            );
                                        });
                                    })}
                                </div>

                                <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center">
                                    <span className="material-symbols-outlined text-8xl text-[#F4C430]/30 animate-pulse">stockpot</span>
                                    <span className="text-[9px] text-[#F4C430]/40 font-mono tracking-[0.25em] uppercase mt-4">Alchemy Crucible</span>
                                </div>
                            </div>

                            <div className="space-y-8 relative z-10">
                                {/* Calculated Terroir tags */}
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {calculatedTags.map(tag => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-[#F4C430]/10 border border-[#F4C430]/20 text-[#F4C430] text-[10px] font-bold uppercase tracking-wider rounded-sm shadow-md"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Dynamic Intensity Meter */}
                                <div className="border-t border-[#F4C430]/10 pt-6">
                                    <div className="flex justify-between items-end mb-2 text-xs font-bold uppercase tracking-widest text-[#c4b5a2]/80">
                                        <span>Intensity Spectrum</span>
                                        <span className="text-[#F4C430] font-black">{calculatedIntensityLabel} ({avgIntensity}%)</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#120e0a] border border-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-[#F4C430] shadow-[0_0_10px_#F4C430]"
                                            style={{ width: `${avgIntensity}%` }}
                                            animate={{ width: `${avgIntensity}%` }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                </div>

                                {/* Privacy control for recipe save */}
                                {isAuthenticated && (
                                    <div className="flex items-center gap-3 border-y border-[#F4C430]/10 py-4">
                                        <input
                                            type="checkbox"
                                            id="public-check"
                                            checked={isPublic}
                                            onChange={(e) => setIsPublic(e.target.checked)}
                                            className="w-4 h-4 accent-[#F4C430] cursor-pointer"
                                        />
                                        <label htmlFor="public-check" className="text-xs text-[#c4b5a2]/80 italic cursor-pointer select-none">
                                            Inscribe as Public (Visible in Community Vault)
                                        </label>
                                    </div>
                                )}

                                {/* Procurement Actions */}
                                <div className="space-y-4">
                                    <button
                                        type="button"
                                        onClick={handleAcquireCustomBlend}
                                        className="w-full py-5 bg-[#F4C430] text-[#120e0a] font-label uppercase text-xs tracking-[0.25em] font-black hover:bg-white transition-all shadow-xl font-bold flex items-center justify-center gap-3"
                                        id="acquire-blend-btn"
                                    >
                                        <span className="material-symbols-outlined text-lg">shopping_basket</span>
                                        Acquire Custom Blend (₹350)
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSaveRecipe}
                                        disabled={isSaving}
                                        className="w-full py-4 border border-[#F4C430]/40 text-[#F4C430] hover:bg-[#F4C430]/10 text-xs font-label uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                        id="save-recipe-btn"
                                    >
                                        <span className="material-symbols-outlined text-lg">
                                            {isSaving ? 'sync' : 'history_edu'}
                                        </span>
                                        {isSaving ? 'Inscribing...' : 'Save Formula to Sanctuary'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: Collapsible Saved & Community Vault */}
                <section className="py-20 border-t border-[#F4C430]/10 mt-28">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-[#F4C430]/10 pb-6 gap-6">
                        <div className="flex items-center gap-6">
                            <span className="material-symbols-outlined text-4xl text-[#F4C430]">history_edu</span>
                            <h2 className="text-3xl font-headline font-bold text-white uppercase tracking-widest">The Sanctuary Archives</h2>
                        </div>
                        
                        <div className="flex bg-[#120e0a] border border-[#F4C430]/20 p-1 rounded-sm">
                            <button
                                type="button"
                                onClick={() => setActiveTab('saved')}
                                className={`px-6 py-2.5 font-label uppercase text-[10px] tracking-widest font-black transition-all ${
                                    activeTab === 'saved'
                                        ? 'bg-[#F4C430] text-[#120e0a]'
                                        : 'text-[#F4C430]/60 hover:text-[#F4C430]'
                                }`}
                            >
                                My Creations ({savedBlends.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('community')}
                                className={`px-6 py-2.5 font-label uppercase text-[10px] tracking-widest font-black transition-all ${
                                    activeTab === 'community'
                                        ? 'bg-[#F4C430] text-[#120e0a]'
                                        : 'text-[#F4C430]/60 hover:text-[#F4C430]'
                                }`}
                            >
                                Community Recipes ({communityBlends.length})
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'saved' ? (
                            <motion.div
                                key="saved-tab"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {!isAuthenticated ? (
                                    <div className="col-span-full py-20 text-center border border-dashed border-[#F4C430]/20 bg-[#1a1510]/30 rounded-sm">
                                        <span className="material-symbols-outlined text-5xl text-[#F4C430]/40 mb-4 animate-pulse">lock</span>
                                        <p className="font-serif text-[#dcd4c3]/70 italic text-lg mb-6">Your personal vault is currently sealed.</p>
                                        <button
                                            type="button"
                                            onClick={() => navigate('/login')}
                                            className="px-8 py-3.5 border border-[#F4C430] text-[#F4C430] hover:bg-[#F4C430] hover:text-[#120e0a] transition-all font-label uppercase text-[10px] tracking-widest font-black"
                                        >
                                            Sign In to Unlock Personal Recipes
                                        </button>
                                    </div>
                                ) : savedBlends.length === 0 ? (
                                    <div className="col-span-full py-20 text-center border border-dashed border-[#F4C430]/20 bg-[#1a1510]/30 rounded-sm">
                                        <span className="material-symbols-outlined text-5xl text-[#F4C430]/40 mb-4">folder_open</span>
                                        <p className="font-serif text-[#dcd4c3]/70 italic text-lg">No custom formulas inscribed yet. Craft one above!</p>
                                    </div>
                                ) : (
                                    savedBlends.map((blend) => (
                                        <div
                                            key={blend.id}
                                            className="bg-[#1a1510]/40 border border-[#F4C430]/10 hover:border-[#F4C430]/30 p-8 transition-all flex flex-col justify-between group relative overflow-hidden"
                                        >
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <h4 className="font-headline text-2xl text-white group-hover:text-[#F4C430] transition-colors">
                                                        {blend.name}
                                                    </h4>
                                                    <span className="px-3 py-1 bg-[#F4C430]/10 border border-[#F4C430]/20 text-[#F4C430] text-[9px] font-black uppercase tracking-widest">
                                                        {blend.intensity_label}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-1.5 mb-6">
                                                    {blend.flavor_tags && blend.flavor_tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 bg-white/5 text-[#dcd4c3]/80 text-[9px] uppercase tracking-wider font-bold"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="space-y-3 border-t border-white/5 pt-4 mb-6">
                                                    <span className="text-[9px] text-[#F4C430]/50 uppercase tracking-widest font-black block">Spice Spectrum</span>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {Object.entries(blend.spice_levels || {}).map(([spiceName, level]) => (
                                                            <div
                                                                key={spiceName}
                                                                className="text-left font-mono text-[10px] text-[#dcd4c3]/60 bg-[#120e0a]/40 p-1.5 border border-white/5"
                                                            >
                                                                <span className="block font-bold text-white leading-tight">
                                                                    {spiceName}
                                                                </span>
                                                                <span>{level}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleLoadRecipe(blend)}
                                                    className="flex-grow py-3 bg-[#F4C430]/10 border border-[#F4C430]/30 text-[#F4C430] hover:bg-[#F4C430] hover:text-[#120e0a] text-[10px] font-black font-label uppercase tracking-widest text-center transition-all"
                                                >
                                                    Load Formula
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteBlend(blend.id)}
                                                    className="p-3 border border-red-500/20 hover:border-red-500 hover:bg-red-500/5 text-red-500 transition-all"
                                                    title="Erase Inscription"
                                                >
                                                    <span className="material-symbols-outlined text-[16px] block">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="community-tab"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                {communityBlends.length === 0 ? (
                                    <div className="col-span-full py-20 text-center border border-dashed border-[#F4C430]/20 bg-[#1a1510]/30 rounded-sm">
                                        <span className="material-symbols-outlined text-5xl text-[#F4C430]/40 mb-4 animate-pulse">public</span>
                                        <p className="font-serif text-[#dcd4c3]/70 italic text-lg">No community formulas catalogued yet. Be the first to publish yours!</p>
                                    </div>
                                ) : (
                                    communityBlends.map((blend) => (
                                        <div
                                            key={blend.id}
                                            className="bg-[#1a1510]/40 border border-[#F4C430]/5 hover:border-[#F4C430]/20 p-8 transition-all flex flex-col justify-between group"
                                        >
                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-headline text-2xl text-white group-hover:text-[#F4C430] transition-colors">
                                                        {blend.name}
                                                    </h4>
                                                    <span className="px-3 py-1 bg-[#F4C430]/10 border border-[#F4C430]/20 text-[#F4C430] text-[9px] font-black uppercase tracking-widest">
                                                        {blend.intensity_label}
                                                    </span>
                                                </div>
                                                <span className="text-[10px] text-[#c4b5a2]/50 uppercase tracking-widest font-bold block mb-4 italic">
                                                    Formulated by Master {blend.username}
                                                </span>

                                                <div className="flex flex-wrap gap-1.5 mb-6">
                                                    {blend.flavor_tags && blend.flavor_tags.map(tag => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-0.5 bg-white/5 text-[#dcd4c3]/80 text-[9px] uppercase tracking-wider font-bold"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="space-y-3 border-t border-white/5 pt-4 mb-6">
                                                    <span className="text-[9px] text-[#F4C430]/50 uppercase tracking-widest font-black block">Spice Spectrum</span>
                                                    <div className="grid grid-cols-3 gap-2">
                                                        {Object.entries(blend.spice_levels || {}).map(([spiceName, level]) => (
                                                            <div
                                                                key={spiceName}
                                                                className="text-left font-mono text-[10px] text-[#dcd4c3]/60 bg-[#120e0a]/40 p-1.5 border border-white/5"
                                                            >
                                                                <span className="block font-bold text-white leading-tight">
                                                                    {spiceName}
                                                                </span>
                                                                <span>{level}%</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleLoadRecipe(blend)}
                                                className="w-full py-3 bg-[#F4C430] text-[#120e0a] hover:bg-white text-[10px] font-black font-label uppercase tracking-widest text-center transition-all font-bold"
                                            >
                                                Load Community Recipe
                                            </button>
                                        </div>
                                    ))
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            </div>
        </main>
    );
}
