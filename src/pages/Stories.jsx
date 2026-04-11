import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Stories() {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStories();
    }, []);

    const fetchStories = async () => {
        try {
            setLoading(true);
            const data = await api.get('content/stories/');
            setStories(data.results || data); // Handle DRF pagination if present
            setError(null);
        } catch (err) {
            console.error('Stories loading failed:', err);
            setError('The scrolls are dusty today. Please check back later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#120e0a] flex items-center justify-center">
                <div className="text-[#F4C430] font-headline text-2xl animate-pulse italic">
                    Unrolling the Journal of Stories...
                </div>
            </div>
        );
    }

    return (
        <main className="max-w-screen-2xl mx-auto px-6 md:px-12 pt-12 pb-24 bg-[#120e0a] text-[#fcf9ee] relative z-10 font-serif">
            <style>{`
                .parchment-texture { background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuDXTfdeeIkkwJfedbvd1C9L0gMq8YHMBEW2_FwhK22_wF28oLpGzl1Mlkss7w-GEZq0bNj-nh_Pir24JzpwvsAx2ikP0HRffnkGslsDc_bp3HW-nfbe4Hag0r7TWlArBGotlDxmNs4P16A6o5-qVuXFgqC12fTHgLTg3Mc71TaLX8sJa92MTgsYw-7fgybPzCY_s1GF18uHYWs7PrfNZJBwK6eNq4hvJBkVknNwJPkmIbVOZWyp_VLWFPFeqiJajraagds-cknbtL0'); mix-blend-mode: multiply; opacity: 0.1; }
                .text-primary { color: #F4C430 !important; }
                .text-secondary { color: #d6aa54 !important; }
                img { mix-blend-mode: luminosity; opacity: 0.8; transition: all 0.5s ease; }
                img:hover { mix-blend-mode: normal; opacity: 1; }
            `}</style>
            
            {/* FIXED HIMALAYAN BACKGROUND */}
            <div className="fixed inset-0 z-[-1] pointer-events-none">
                <img src="/images/dark_tea_mountains.png" className="w-full h-full object-cover opacity-30 mix-blend-luminosity" alt="mountains" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#120e0a]/60 via-[#120e0a]/80 to-[#120e0a]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative py-24 mb-16 overflow-hidden bg-[#1a1510]/50 border-b border-[#F4C430]/10 rounded-2xl backdrop-blur-sm mt-4">
                <div className="relative z-10 text-center space-y-6">
                    <h2 className="text-[#d6aa54] font-label tracking-widest text-sm uppercase">The Journal</h2>
                    <h1 className="font-headline text-5xl md:text-7xl text-[#F4C430] font-extrabold tracking-tight leading-tight">
                        चाय की कहानियाँ — <br/>
                        <span className="italic font-normal text-3xl md:text-5xl">Stories Steeped in Tradition</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-[#c4bcae] text-lg font-body leading-relaxed">
                        A chronicle of whispers from the tea gardens, forgotten recipes from grandmothers' kitchens, and the soulful philosophy of a shared kulhad.
                    </p>
                    <div className="flex justify-center pt-4">
                        <div className="w-16 h-[2px] bg-[#d6aa54] opacity-30"></div>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Left Content Area */}
                <div className="lg:col-span-8 space-y-16">
                    {stories.length > 0 ? (
                        <>
                            {/* Featured Article (First one) */}
                            <article className="group relative bg-[#0a0805] p-8 md:p-12 shadow-2xl overflow-hidden border border-[#F4C430]/5">
                                <div className="grid md:grid-cols-2 gap-12 items-center">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-[#251e17]">
                                        <img 
                                            className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700" 
                                            src={stories[0].cover_image_url || stories[0].cover_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-OkoQBPW2yNv5--2pEmorm5PDrxykAykdKOaPLZLy4nrSesehN5FKZMBaiBbkjJxBWBOrVZdywQVXBgS5kGeQAYdUrF_mMAKNbJJrkL3pqBHptHX_LTmou07DAXFkkR3C-a8_lH5w5JoxwdPXhceJbZ6PSjO_BBr6VUG_VDjCwgN_HCMUcXIRzerxqwaHhY8UKTcaVSFp0dexmxDiwfXcXJy1-Ry8zFmNG0uivGd9cdWtkl4VU-8F1F2hQjMbArLsFOwbZsGP8_Q'} 
                                            alt={stories[0].title}
                                        />
                                        <div className="absolute inset-0 bg-[#F4C430]/5"></div>
                                    </div>
                                    <div className="space-y-6">
                                        <span className="text-[#d6aa54] font-label text-xs uppercase tracking-[0.2em] block">Must Read | {stories[0].category}</span>
                                        <h2 className="font-headline text-4xl text-[#fcf9ee] leading-tight font-bold">{stories[0].title}</h2>
                                        <div className="flex items-center gap-4 text-sm text-[#c4bcae] font-label">
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">edit</span> {stories[0].author_name}</span>
                                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">schedule</span> {stories[0].read_time} min read</span>
                                        </div>
                                        <p className="text-[#c4bcae] font-body leading-relaxed line-clamp-4 italic">
                                            "{stories[0].excerpt}"
                                        </p>
                                        <button className="inline-flex items-center gap-3 bg-gradient-to-r from-[#F4C430] to-[#d6aa54] text-[#120e0a] px-8 py-4 font-label text-sm uppercase tracking-widest hover:brightness-110 transition-all font-bold">
                                            Unfold the Story
                                            <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                                        </button>
                                    </div>
                                </div>
                            </article>

                            {/* Secondary Stories Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {stories.slice(1).map((story) => (
                                    <div key={story.id} className="bg-[#1a1510] p-6 space-y-6 flex flex-col border border-[#F4C430]/5 group cursor-pointer hover:border-[#F4C430]/20 transition-all">
                                        <div className="aspect-video overflow-hidden">
                                            <img 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-all" 
                                                src={story.cover_image_url || story.cover_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuC603pziXGoBY21JHodmEUWSVCtBfTgurbwQwzqIWjjUy1hImcFQPgHGfA13Ly0EmbAPywWGZ85pPJKd_E7Ejh3z25fIMO4rVlugl-ctBeHO9X-9SlMvlVhvWEjIarZw5cfW1YuiJx-xXqJ87W9fK0-zAHUiMiy62kKOOopX_QXKQOFGS1txqOXYfCvoUHT9pY8qZnsxjiEQhg7QmiqwN9obfbVX2L7mybdgYaU04nhy9-dgU2w8SVY19c0BaFoS95_yMay7Ax5sto'} 
                                                alt={story.title}
                                            />
                                        </div>
                                        <h3 className="font-headline text-2xl font-bold">{story.title}</h3>
                                        <p className="text-[#c4bcae] text-sm line-clamp-3">{story.excerpt}</p>
                                        <div className="mt-auto pt-4 flex justify-between items-center border-t border-[#F4C430]/10">
                                            <span className="text-xs font-label text-[#d6aa54] uppercase tracking-wider">{story.category}</span>
                                            <span className="material-symbols-outlined text-[#c4bcae] group-hover:text-[#F4C430] transition-colors">arrow_outward</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-20 text-[#c4bcae] italic">
                            No stories found in the archives. Be the first to write one!
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="lg:col-span-4 space-y-12">
                    {/* Newsletter Subscription */}
                    <NewsletterForm />
                    
                    {/* Categories Sidebar */}
                    <div className="space-y-6 px-4">
                        <h4 className="font-headline text-xl font-bold border-b border-[#F4C430]/20 pb-2 text-[#F4C430]">Archives</h4>
                        <ul className="space-y-3 font-label text-sm text-[#c4bcae]">
                            <li className="flex justify-between items-center group cursor-pointer hover:text-[#F4C430] transition-colors">
                                <span>History & Lore</span>
                                <span className="text-[10px] bg-[#251e17] px-2 py-0.5">24</span>
                            </li>
                            {/* ... more simulated categories or real ones if fetched */}
                        </ul>
                    </div>
                </aside>
            </div>
        </main>
    );
}

function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('content/newsletter/', { email });
            setStatus(res.message);
            setEmail('');
        } catch (err) {
            setStatus('The scribe failed to record your address. Please try again.');
        }
    };

    return (
        <div className="bg-[#1a1510] p-8 space-y-8 border-t-2 border-[#d6aa54]/20 shadow-xl">
            <div className="space-y-4">
                <h4 className="font-headline text-xl font-bold text-[#F4C430]">Subscribe to Our Journal</h4>
                <p className="text-xs font-body text-[#c4bcae]">Receive weekly dispatches of tea wisdom, heritage recipes, and haveli updates.</p>
                <form onSubmit={handleSubscribe} className="relative mt-4">
                    <input 
                        className="w-full bg-transparent border-none border-b border-[#F4C430]/30 p-2 focus:ring-0 focus:border-[#F4C430] transition-all font-body text-sm text-[#fcf9ee]" 
                        placeholder="Email the Scribe..." 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="absolute right-0 bottom-2 text-[#d6aa54] hover:text-[#F4C430] transition-colors">
                        <span className="material-symbols-outlined">edit_square</span>
                    </button>
                </form>
                {status && <p className="text-[10px] font-body text-[#d6aa54] pt-2 italic">{status}</p>}
            </div>
        </div>
    );
}
