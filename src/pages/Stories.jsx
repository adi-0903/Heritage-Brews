import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';

const initialStories = [
    {
        id: '1',
        title: "The Phoenix of Assam: Rebirth of the Golden Flush",
        excerpt: "Beneath the shadow of the Brahmaputra, a forgotten estate awakens. A tale of ancestral leaves and the fire that refined them.",
        category: "Heritage",
        author: "The Head Archivist",
        readTime: "8 min",
        image: "/images/darjeeling_tea_1775770278908.png"
    },
    {
        id: '2',
        title: "Celestial Steeping: The Lost Ritual of Darjeeling",
        excerpt: "To brew is to converse with the mountain spirits. Discover the 11-step ritual once reserved for the Himalayan sovereigns.",
        category: "Ritual",
        author: "Master Sommelier",
        readTime: "12 min",
        image: "/images/master_sommelier.png"
    },
    {
        id: '3',
        title: "Whispers of the Nilgiris: The Blue Mountain Legacy",
        excerpt: "High above the clouds, where the air turns to frost, the Blue Mountains hold secrets in every frost-bitten leaf.",
        category: "Origin",
        author: "Estate Guardian",
        readTime: "6 min",
        image: "/images/majestic_tea_estates.png"
    },
    {
        id: '4',
        title: "The Malabar Secret: Coffee Forged by the Monsoon",
        excerpt: "Born of salt spray and relentless winds, the Malabar Bean is a testament to the transformative power of the Indian Monsoon.",
        category: "Roast",
        author: "Chief Taster",
        readTime: "10 min",
        image: "/images/monsoon_coffee_1775770310752.png"
    }
];

export default function Stories() {
    const [stories, setStories] = useState(initialStories);
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0800] relative overflow-x-hidden pt-36 pb-24 text-[#FFF8F2]">
            {/* Cinematic Background */}
            <div className="fixed inset-0 z-0">
                <img 
                    src="/images/dark_tea_mountains.png" 
                    className="w-full h-full object-cover opacity-50 scale-105"
                    alt="Archival Background"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0800] via-transparent to-[#0a0800]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-20" />
            </div>

            <main className="relative z-10 max-w-7xl mx-auto px-12">
                {/* Imperial Header */}
                <div className="text-center mb-32 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <span className="text-[#F4C430]/60 uppercase tracking-[1em] text-xs font-sans italic">Volume I • The Imperial Chronicle</span>
                        <h1 className="text-7xl md:text-9xl font-headline font-black text-[#F4C430] tracking-tighter drop-shadow-2xl">
                            Stories <span className="text-[#FFF8F2]/20 font-light italic text-5xl md:text-7xl block md:inline">Steeped in Lore</span>
                        </h1>
                        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-[#F4C430] to-transparent" />
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Featured Volume (The Hero Story) */}
                    <div className="lg:col-span-12">
                        <motion.article 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="group relative h-[70vh] rounded-[3rem] overflow-hidden border border-[#F4C430]/20 shadow-[0_50px_100px_rgba(0,0,0,0.8)] cursor-pointer"
                        >
                            <img src={stories[0].image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3s]" alt={stories[0].title} />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0800] via-[#0a0800]/20 to-transparent" />
                            
                            <div className="absolute bottom-0 left-0 p-20 space-y-6 max-w-4xl text-left">
                                <div className="flex items-center gap-4">
                                    <span className="bg-[#860603] text-[#F4C430] px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-[#F4C430]/30 shadow-xl">
                                        Featured Chronicle
                                    </span>
                                    <span className="text-[#FFF8F2]/60 text-sm italic">{stories[0].readTime} read</span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-headline font-bold text-[#FFF8F2] leading-none drop-shadow-2xl">
                                    {stories[0].title}
                                </h1>
                                <p className="text-2xl text-[#FFF8F2]/80 font-headline italic leading-relaxed max-w-2xl group-hover:text-[#F4C430] transition-colors">
                                    "{stories[0].excerpt}"
                                </p>
                            </div>
                        </motion.article>
                    </div>

                    {/* The Lore Grid */}
                    <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-12 pt-20">
                        {stories.slice(1).map((story, i) => (
                            <motion.div
                                key={story.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="group flex flex-col gap-8 cursor-pointer"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#F4C430]/10 shadow-2xl">
                                    <img src={story.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={story.title} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0800]/80 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity" />
                                    <div className="absolute top-6 left-6 w-12 h-12 bg-[#860603] rounded-full border border-[#F4C430]/40 flex items-center justify-center shadow-2xl z-20">
                                        <span className="material-symbols-outlined text-[#F4C430] text-xl">bookmark</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-[#F4C430] text-xs font-bold uppercase tracking-widest">
                                        <span>{story.category}</span>
                                        <span className="opacity-40 italic">{story.readTime}</span>
                                    </div>
                                    <h3 className="text-4xl font-headline font-bold text-[#FFF8F2] group-hover:text-[#F4C430] transition-colors leading-tight">
                                        {story.title}
                                    </h3>
                                    <p className="text-[#FFF8F2]/60 font-headline italic text-lg line-clamp-3">
                                        {story.excerpt}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* The Scribe's Call (Newsletter) */}
                <div className="mt-48 bg-[#1a1500]/40 backdrop-blur-3xl p-24 rounded-[3rem] border border-[#F4C430]/10 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                        <span className="material-symbols-outlined text-9xl text-[#F4C430]">history_edu</span>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-12">
                        <h2 className="text-5xl md:text-7xl font-headline font-bold text-[#F4C430]">Inscribe Your Presence</h2>
                        <p className="text-xl text-[#FFF8F2]/60 font-headline italic">Receive weekly dispatches of tea wisdom and estate secrets directly to your imperial pigeon.</p>
                        <form className="flex flex-col md:flex-row gap-6 mt-12">
                            <input 
                                type="email" 
                                placeholder="Enter your imperial address..."
                                className="flex-1 bg-[#0a0800]/50 border-b-2 border-[#F4C430]/30 py-6 px-4 text-[#FFF8F2] font-headline text-2xl focus:outline-none focus:border-[#F4C430] transition-colors italic placeholder:opacity-20"
                            />
                            <button className="bg-gradient-to-r from-[#F4C430] to-[#d6aa54] text-[#0a0800] px-12 py-6 font-bold uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_20px_60px_rgba(244,196,48,0.2)]">
                                Scribe Me In
                            </button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}
