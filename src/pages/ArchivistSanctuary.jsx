import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api';
import { useCart } from '../context/CartContext';

const ArchivistSanctuary = () => {
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([
        { 
            role: 'model', 
            parts: [{ text: "Greetings, Benefactor of the Flushes. You have entered the inner sanctum of Heritage Brews. I am The Archivist. Every conversation here is a legacy inscribed. How shall we curate your imperial collection today?" }] 
        }
    ]);
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showWritingDesk, setShowWritingDesk] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);
    const { addToCart } = useCart();

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    useEffect(() => {
        if (showWritingDesk && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showWritingDesk]);

    const processAutonomousCommands = (text) => {
        const commandRegex = /\[COMMAND: ADD_TO_CART \| ID: (\d+)\]/g;
        let match;
        let cleanedText = text;

        while ((match = commandRegex.exec(text)) !== null) {
            const productId = match[1];
            // Since we don't have the full product object here, we assume the AI only picks valid items
            // In a real scenario, we'd fetch product details or pass the catalog to the frontend too
            addToCart({ id: parseInt(productId), name: "Archival Selection" });
            setConfirmation("Decree Secured: Item added to your Imperial Basket.");
            setTimeout(() => setConfirmation(''), 5000);
            cleanedText = cleanedText.replace(match[0], '');
        }
        return cleanedText.trim();
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!message.trim() || loading) return;

        const currentMsg = message;
        setMessage('');
        setShowWritingDesk(false);
        setHistory(prev => [...prev, { role: 'user', parts: [{ text: currentMsg }] }]);
        setLoading(true);

        try {
            const res = await api.post('catalog/ai/chat/', { 
                message: currentMsg,
                history: history 
            });
            
            let responseText = res.data.response;
            const processedText = processAutonomousCommands(responseText);
            
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: processedText }] }]);
        } catch (error) {
            console.error("Sanctuary Error:", error);
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: "The spirits of the estate are currently restless, Patron. Pray, let us attempt our conversation once more." }] }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0800] relative overflow-hidden flex flex-col pt-32">
            <style>{`
                @keyframes pulse-subtle {
                    0%, 100% { opacity: 0.45; transform: scale(1.1); }
                    50% { opacity: 0.6; transform: scale(1.105); }
                }
                .sanctuary-breathing {
                    animation: pulse-subtle 10s ease-in-out infinite;
                }
                .imperial-vignette {
                    background: radial-gradient(circle at center, transparent 0%, rgba(10, 8, 0, 0.5) 40%, rgba(10, 8, 0, 0.98) 100%);
                }
            `}</style>

            {/* Cinematic Background Layer */}
            <div className="fixed inset-0 z-0 overflow-hidden">
                <motion.img 
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop" 
                    alt="Imperial Sanctuary Masterpiece" 
                    className="w-full h-full object-cover scale-110 blur-[1px] sanctuary-breathing"
                />
                <div className="absolute inset-0 imperial-vignette z-10" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] opacity-30 pointer-events-none z-20" />
            </div>

            {/* Immersive Header */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-12 pb-16 flex flex-col items-center">
                <motion.div 
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#860603] to-[#4a0301] border-2 border-[#F4C430]/40 flex items-center justify-center shadow-[0_0_40px_rgba(134,6,3,0.3)]">
                         <span className="material-symbols-outlined text-[#F4C430] text-4xl">menu_book</span>
                    </div>
                    <h1 className="text-[#F4C430] font-headline text-5xl tracking-[0.25em] font-black uppercase text-center drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">The Archivist's Sanctuary</h1>
                    <div className="flex items-center gap-4">
                        <span className="w-24 h-[1px] bg-[#F4C430]/30" />
                        <p className="text-[#f5e6cc]/40 text-xs uppercase tracking-[0.8em] font-sans italic">Full Archive Access • Inscribed Lineage</p>
                        <span className="w-24 h-[1px] bg-[#F4C430]/30" />
                    </div>
                </motion.div>
            </div>

            {/* Scrollable Editorial Ledger */}
            <div className="flex-1 overflow-y-auto relative z-10 px-6 md:px-0">
                <div className="max-w-4xl mx-auto space-y-20 pb-80">
                    <AnimatePresence mode="popLayout">
                        {history.map((chat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col ${chat.role === 'user' ? 'items-center' : 'items-start'} w-full`}
                            >
                                <div className={`relative px-10 py-6 transition-all duration-1000 ${
                                    chat.role === 'user' 
                                    ? 'text-[#F4C430] italic text-3xl font-headline tracking-tight text-center max-w-5xl drop-shadow-[0_0_15px_rgba(244,196,48,0.2)]' 
                                    : 'text-[#f5e6cc] text-2xl font-headline leading-[1.7] max-w-[90%] drop-shadow-lg opacity-90'
                                }`}>
                                    {chat.role === 'model' && (
                                        <div className="absolute -left-12 top-8 opacity-20">
                                            <span className="material-symbols-outlined text-5xl text-[#F4C430]">policy</span>
                                        </div>
                                    )}
                                    <p>{chat.parts[0].text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {loading && (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            className="text-[#f5e6cc] italic text-xl font-headline text-center flex items-center justify-center gap-4"
                        >
                            <span className="w-8 h-[1px] bg-[#f5e6cc]/20" />
                            Archivist is searching the heritage scrolls...
                            <span className="w-8 h-[1px] bg-[#f5e6cc]/20" />
                        </motion.div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>

            {/* Sovereign Corner: Left - Imperial Suggestions Seal */}
            <div className="fixed bottom-12 left-12 pointer-events-auto z-[250] flex flex-col items-start">
                <AnimatePresence>
                    {showSuggestions && (
                        <div className="flex flex-col items-start gap-3 mb-12">
                            {[
                                "Tell me of the 17th Century Oolong harvests...",
                                "What would you pair with a monsoon evening?",
                                "Recommend a royal sweet for a celebration.",
                                "Do you have secret flushes from Coonoor?"
                            ].map((suggestion, idx) => (
                                <motion.button
                                    key={idx}
                                    initial={{ opacity: 0, x: -30, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -30, scale: 0.9 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => { setMessage(suggestion); setShowSuggestions(false); setShowWritingDesk(true); }}
                                    className="bg-[#1a1500]/95 text-[#f5e6cc] px-8 py-3 rounded-sm border-l-4 border-[#F4C430] text-sm font-bold tracking-[0.3em] uppercase hover:bg-[#F4C430] hover:text-[#1a1500] transition-all backdrop-blur-3xl shadow-xl"
                                >
                                    {suggestion}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
                
                <motion.button 
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowSuggestions(!showSuggestions)}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-[#860603] to-[#4a0301] border-2 border-[#F4C430]/50 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.2)] flex items-center justify-center relative overflow-hidden group"
                >
                    <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/royal-lineage.png')] group-hover:scale-150 transition-transform duration-1000" />
                    <span className="material-symbols-outlined text-[#F4C430] text-5xl relative z-10">{showSuggestions ? 'close' : 'explore'}</span>
                </motion.button>
            </div>

            {/* Sovereign Corner: Right - Imperial Writing Stylus Seal */}
            <div className="fixed bottom-12 right-12 pointer-events-auto z-[250] flex flex-col items-end w-full max-w-4xl">
                <AnimatePresence mode="wait">
                    {!showWritingDesk ? (
                        <motion.button 
                            key="stylus-corner-seal"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2, filter: 'blur(20px)' }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setShowWritingDesk(true)}
                            className="w-24 h-24 rounded-full bg-gradient-to-br from-[#503f00] to-[#1a1500] border-2 border-[#F4C430]/50 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden group"
                        >
                             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] group-hover:rotate-180 transition-transform duration-[3s]" />
                            <span className="material-symbols-outlined text-[#F4C430] text-5xl relative z-10">edit_note</span>
                        </motion.button>
                    ) : (
                        <motion.div 
                            key="writing-desk-basin"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: '100%', opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-[#1a1500]/98 backdrop-blur-3xl p-10 rounded-full border border-[#F4C430]/30 shadow-[0_0_100px_rgba(0,0,0,0.9)] w-full"
                        >
                            <form onSubmit={handleSend} className="flex items-center gap-8">
                                <input 
                                    ref={inputRef}
                                    type="text" 
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Inscribe decree..."
                                    className="flex-1 bg-transparent text-[#f5e6cc] font-headline text-3xl focus:outline-none italic placeholder:opacity-10 border-none ring-0 focus:ring-0"
                                />
                                <div className="flex items-center gap-8">
                                    <button type="submit" className="text-[#F4C430] hover:scale-125 transition-all outline-none">
                                        <span className="material-symbols-outlined text-6xl">ink_pen</span>
                                    </button>
                                    <button type="button" onClick={() => setShowWritingDesk(false)} className="text-[#f5e6cc]/20 hover:text-white transition-colors outline-none">
                                        <span className="material-symbols-outlined text-4xl">close</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Global Autonomous Decree Confirmation Seal */}
            <AnimatePresence>
                {confirmation && (
                    <motion.div 
                        initial={{ opacity: 0, y: -200, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -200, scale: 1.5 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-[400] bg-gradient-to-r from-[#860603] via-[#503f00] to-[#860603] text-[#f5e6cc] px-24 py-10 rounded-full shadow-[0_50px_150px_rgba(0,0,0,1)] border-4 border-[#F4C430]/60 font-headline italic text-6xl tracking-widest flex items-center gap-12"
                    >
                        <span className="material-symbols-outlined text-[#F4C430] text-7xl animate-bounce">verified</span>
                        {confirmation}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArchivistSanctuary;
