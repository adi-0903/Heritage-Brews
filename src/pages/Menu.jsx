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
            // Sequester the Curations & Gifts category from the primary menu
            const filteredData = data.filter(cat => cat.name !== 'Curations & Gifts');
            setCategories(filteredData);
            setError(null);
        } catch (err) {
            console.error('Menu loading failed:', err);
            setError('The Royal Kitchen is currently preparing. Please try again shortly.');
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
                    background-image: url('/images/indian_pattern.png');
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
                            {category.products && category.products.map((product) => (
                                <div key={product.id} className="flex gap-6 group">
                                    <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-sm shadow-md border border-[#F4C430]/10">
                                            <img 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" 
                                                src={product.image || '/images/loose_tea_leaves.png'} 
                                                alt={product.name} 
                                            />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-1 gap-4">
                                                <h3 className="text-2xl font-headline font-bold text-[#F4C430]">{product.name}</h3>
                                                <span className="text-xl font-headline text-[#7b5800] font-bold">₹{product.price}</span>
                                            </div>
                                            <p className="text-[#c4b5a2] text-sm italic line-clamp-2">{product.description}</p>
                                        </div>
                                        <button 
                                            onClick={() => addItem(product)}
                                            className="self-start mt-4 bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 group-active:scale-95"
                                        >
                                            <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>
        </main>
    );
}
