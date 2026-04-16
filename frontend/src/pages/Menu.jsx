import React, { useState, useEffect } from 'react';
import api from '../api';
import { useCart } from '../context/CartContext';

export default function Menu() {
    const { addItem } = useCart();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMenuData();
    }, []);

    const fetchMenuData = async () => {
        try {
            setLoading(true);
            const data = await api.get('catalog/categories/');
            
            // Historical Menu Fallback - Ensuring the menu is always Royal and Expansive
            const menuFallbacks = [
                {
                    id: 'cat_snacks',
                    name: 'Savoury Snacks',
                    icon: 'bakery_dining',
                    products: [
                        { id: 'sn_1', name: 'Mathri of the Marwars', price: 299, description: 'Fenugreek-infused flaky crackers, a standard for every merchant caravan.', image: '/images/mathri_snack.png?v=heritage' },
                        { id: 'sn_2', name: 'Kachori of the Kachwahas', price: 349, description: 'Spiced lentil-filled crisp pastry, once a staple of the Jaipur court.', image: '/images/kachori_kachwahas.png?v=heritage' },
                        { id: 'sn_3', name: 'Saffron-Salted Cashews', price: 499, description: 'Hand-selected jumbo kernels roasted with premium Kashmiri Saffron.', image: '/images/saffron_cashews.png?v=heritage' },
                        { id: 'sn_4', name: 'Rajputana Mathania Peanuts', price: 249, description: 'Slow-roasted with sun-dried Rajasthani Mathania chilies for a deep heat.', image: '/images/mathania_peanuts.png?v=heritage' }
                    ]
                },
                {
                    id: 'cat_sweets',
                    name: 'Royal Sweets',
                    icon: 'icecream',
                    products: [
                        { id: 'sw_1', name: 'Awadhi Rose Gulab Jamun', price: 399, description: 'Aromatic spheres soaked in damask rose syrup with a pistachio heart.', image: '/images/awadhi_gulab_jamun.png?v=heritage' },
                        { id: 'sw_2', name: 'Shahi Tukda (Silver Signature)', price: 449, description: 'Saffron-soaked bread pudding finished with edible silver leaf.', image: '/images/shahi_tukda.png?v=heritage' },
                        { id: 'sw_3', name: 'Mysore Pak (Ghee-Rich Reserve)', price: 399, description: 'Legendary chickpea fudge prepared with 24-month aged clarified butter.', image: '/images/mysore_pak.png?v=heritage' },
                        { id: 'sw_4', name: 'Banarasi Paan-Infused Malai', price: 549, description: 'Creamy delicacy captured with the cooling essence of fresh betel leaf.', image: '/images/banarasi_paan_malai.png?v=heritage' },
                        { id: 'sw_5', name: 'Saffron Kesar Peda', price: 349, description: 'Silky fudge with the essence of pure Saffron, stamped with the Royal Seal.', image: '/images/kesar_peda.png?v=heritage' },
                        { id: 'sw_6', name: 'Silver Leaf Kaju Katli', price: 499, description: 'Diamond-shaped cashew fudge glistening with a layer of pure edible silver.', image: '/images/kaju_katli.png?v=heritage' }
                    ]
                }
            ];

            // Filter out existing DB categories that match our fallbacks to avoid duplicates
            const dbCategories = data.filter(cat => cat.name !== 'Curations & Gifts');
            const mergedCategories = [...dbCategories];

            // Merge fallbacks if they don't exist in DB
            menuFallbacks.forEach(fallback => {
                const exists = mergedCategories.some(cat => cat.name.toLowerCase().includes(fallback.name.toLowerCase().split(' ')[1]?.toLowerCase() || fallback.name.toLowerCase()));
                if (!exists) mergedCategories.push(fallback);
                else {
                    // Enrich existing categories with missing products
                    const target = mergedCategories.find(cat => cat.name.toLowerCase().includes(fallback.name.toLowerCase().split(' ')[1]?.toLowerCase() || fallback.name.toLowerCase()));
                    if (target) {
                        target.products = [...(target.products || []), ...fallback.products.filter(p => !target.products?.some(tp => tp.name === p.name))];
                    }
                }
            });

            setCategories(mergedCategories);
            setError(null);
        } catch (err) {
            console.error('Menu loading failed:', err);
            setError('The Royal Kitchen is currently preparing. Please try again shortly.');
            // Even on error, show fallbacks
            setCategories([
                {
                    id: 'cat_snacks',
                    name: 'Royal Savories',
                    icon: 'bakery_dining',
                    products: [
                        { id: 'sn_1', name: 'Mathri of the Marwars', price: 299, description: 'Fenugreek-infused flaky crackers, a standard for every merchant caravan.', image: '/images/mathri_snack.png?v=heritage' },
                        { id: 'sn_2', name: 'Kachori of the Kachwahas', price: 349, description: 'Spiced lentil-filled crisp pastry, once a staple of the Jaipur court.', image: '/images/awadhi_biryani.png?v=heritage' },
                        { id: 'sn_3', name: 'Saffron-Salted Cashews', price: 499, description: 'Hand-selected jumbo kernels roasted with premium Kashmiri Saffron.', image: '/images/bikaneri_bhujia.png?v=heritage' }
                    ]
                },
                {
                    id: 'cat_sweets',
                    name: 'Majestic Confections',
                    icon: 'icecream',
                    products: [
                        { id: 'sw_1', name: 'Awadhi Rose Gulab Jamun', price: 399, description: 'Aromatic spheres soaked in damask rose syrup with a pistachio heart.', image: '/images/awadhi_gulab_jamun.png?v=heritage' },
                        { id: 'sw_2', name: 'Shahi Tukda (Silver Signature)', price: 449, description: 'Saffron-soaked bread pudding finished with edible silver leaf.', image: '/images/shahi_brass_box.png?v=heritage' },
                        { id: 'sw_3', name: 'Mysore Pak (Ghee-Rich Reserve)', price: 399, description: 'Legendary chickpea fudge prepared with 24-month aged clarified butter.', image: '/images/kesar_peda.png?v=heritage' }
                    ]
                }
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#120e0a] flex items-center justify-center">
                <div className="text-[#F4C430] font-headline text-2xl animate-pulse italic">
                    Opening the Ledger of Offerings...
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#120e0a] min-h-screen relative text-[#e5e2d8] font-serif">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                    color: #F4C430;
                }
                .indian-pattern-bg {
                    background-image: url('/images/indian_pattern.png?v=heritage');
                    background-size: 300px 300px;
                    opacity: 0.03;
                    mix-blend-mode: color-dodge;
                }
                .parchment-glass {
                    background: rgba(18, 14, 10, 0.60);
                    backdrop-filter: blur(24px);
                }
            `}</style>
            
            {/* Full Page Ambient Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

            {/* Menu Header Hero */}
            <section className="h-[75vh] relative flex items-center justify-center overflow-hidden border-b-[12px] border-double border-[#F4C430]/20 max-h-[800px]">
                <div className="absolute inset-0 z-0">
                    <img 
                        className="w-full h-full object-cover transition-transform duration-[15000ms] hover:scale-110" 
                        src="/images/premium_menu_hero.png"
                        alt="Masala chai pouring"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1510]/90 via-transparent to-[#1a1510]/60"></div>
                </div>
                
                <div className="relative z-10 text-center px-8 py-16 mt-16 max-w-4xl parchment-glass border border-[#F4C430]/30 shadow-[0_30px_60px_rgba(123,88,0,0.2)]">
                    <div className="absolute -inset-4 border-[6px] border-double border-[#F4C430]/20 pointer-events-none"></div>
                    <span className="text-[#F4C430] font-headline text-lg md:text-xl tracking-[0.4em] uppercase mb-6 block font-bold border-b border-[#F4C430]/20 pb-4 inline-block px-12">The Ledger of Offerings</span>
                    <h1 className="text-6xl md:text-8xl font-headline text-[#e5e2d8] font-bold tracking-tighter mb-8">The Royal Menu</h1>
                    <p className="text-xl px-12 md:px-0 text-[#c4b5a2] font-body italic leading-relaxed">
                        From the misty hills of Darjeeling to the shade-grown estates of Coorg.<br/> Select your brews and royal accompaniments below.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#120e0a] to-transparent z-20"></div>
            </section>

            {/* Error State */}
            {error && (
                <div className="max-w-xl mx-auto mt-20 p-8 border border-red-900/50 bg-red-900/10 text-center text-[#c4b5a2] font-body italic">
                    {error}
                </div>
            )}

            {/* Menu Categories Container */}
            <section className="py-32 px-8 max-w-screen-xl mx-auto space-y-32 relative z-10">
                {categories.map((category) => (
                    <div key={category.id}>
                        <div className="flex items-center gap-6 mb-12 border-b border-[#F4C430]/20 pb-4">
                            <span className="material-symbols-outlined text-4xl text-[#F4C430]">{category.icon || 'star'}</span>
                            <h2 className="text-4xl md:text-5xl font-headline font-bold text-[#e5e2d8]">{category.name}</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {category.products && category.products.map((product) => {
                                // Force Visual Sync with local archive
                                const imageMap = {
                                    'mathri': 'mathri_snack',
                                    'kaju': 'kaju_katli',
                                    'mysore': 'mysore_pak',
                                    'gulab': 'awadhi_gulab_jamun',
                                    'peda': 'kesar_peda',
                                    'paan': 'banarasi_paan_malai',
                                    'kachori': 'kachori_kachwahas'
                                };
                                
                                let finalImage = product.image;
                                Object.keys(imageMap).forEach(key => {
                                    if (product.name.toLowerCase().includes(key)) {
                                        finalImage = `/images/${imageMap[key]}.png?v=heritage`;
                                    }
                                });

                                return (
                                    <div key={product.id} className="flex gap-6 group">
                                        <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden rounded-sm shadow-md border border-[#F4C430]/10">
                                            <img 
                                                src={finalImage}
                                                alt={product.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1548839140-29a74aa9670d?auto=format&fit=crop&q=80&w=400';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40" />
                                        </div>
                                        
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-1 gap-4">
                                                    <h3 className="text-2xl font-headline font-bold text-[#F4C430] group-hover:text-white transition-colors">
                                                        {product.name}
                                                    </h3>
                                                    <span className="text-xl font-headline text-[#7b5800] font-bold">₹{product.price}</span>
                                                </div>
                                                <p className="text-[#c4b5a2] text-sm italic line-clamp-2 leading-relaxed">
                                                    {product.description}
                                                </p>
                                            </div>
                                            <button 
                                                onClick={() => addItem(product)}
                                                className="self-start mt-4 bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 group-active:scale-95"
                                            >
                                                <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> 
                                                ADD TO COLLECTION
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}
