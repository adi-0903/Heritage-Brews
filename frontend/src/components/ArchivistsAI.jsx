import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ArchivistsAI() {
    const [isOpen, setIsOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([
        { role: 'model', parts: [{ text: "Greetings, Benefactor of the Flushes. I am the Estate Sommelier. My sanctuary is unsealed for you. How shall we curate your legacy today? The vintage of knowledge is ripe for the decanting." }] }
    ]);
    const [loading, setLoading] = useState(false);
    const [confirmation, setConfirmation] = useState(null);
    const [showWritingDesk, setShowWritingDesk] = useState(false);
    const { addToCart, products } = useCart();
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (showWritingDesk && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showWritingDesk]);

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const processAutonomousCommands = (text) => {
        const cartRegex = /\[COMMAND: ADD_TO_CART \| ID: (\d+)\]/;
        const match = text.match(cartRegex);
        
        if (match) {
            const productId = parseInt(match[1]);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart(product, 1);
                setConfirmation(`Sanctuary Decree: ${product.name} Secured.`);
                setTimeout(() => setConfirmation(null), 4000);
            }
            
            // Scrub the command from the visible text
            return text.replace(cartRegex, "").trim();
        }
        return text;
    };

    const handleSend = async (e) => {
        if (e) e.preventDefault();
        if (!message.trim() || loading) return;

        const currentMsg = message;
        const userMessage = { role: 'user', parts: [{ text: message }] };
        setHistory(prev => [...prev, userMessage]);
        setMessage('');
        setShowWritingDesk(false); // Retract the stylus basin
        setLoading(true);
        setShowSuggestions(false);

        try {
            const res = await api.post('catalog/ai/chat/', { 
                message: currentMsg,
                history: history 
            });
            
            let responseText = res.data.response;
            responseText = processAutonomousCommands(responseText);
            
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: responseText }] }]);
        } catch (error) {
            console.error('Archival communication failed:', error);
            setHistory(prev => [...prev, { role: 'model', parts: [{ text: "Forgive me, Patron. The spirits are turbulent. The scrolls are currently resisting translation. Perhaps we should converse again when the moon is high." }] }]);
        } finally {
            setLoading(false);
        }
    };

    const embers = Array.from({ length: 20 });

    return (
        <div className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center font-serif">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap');
                
                .sanctuary-backdrop {
                    background: url("/C:/Users/HP/.gemini/antigravity/brain/f666601a-334c-479b-a1cf-2917e236bee4/imperial_sanctuary_backdrop_1775990028477.png");
                    background-size: cover;
                    background-position: center;
                    position: absolute;
                    inset: 0;
                }
                .backdrop-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(10, 8, 5, 0.9), rgba(10, 8, 5, 0.8));
                    backdrop-filter: blur(8px);
                }
                .film-grain {
                    position: fixed;
                    inset: 0;
                    opacity: 0.08;
                    pointer-events: none;
                    background-image: url("https://www.transparenttextures.com/patterns/stardust.png");
                    z-index: 300;
                }
                .volumetric-light {
                    position: absolute;
                    top: -10%;
                    left: -10%;
                    width: 80%;
                    height: 80%;
                    background: radial-gradient(circle at 10% 10%, rgba(244, 196, 48, 0.12) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 5;
                }
                .imperial-scroll {
                    background: #f5e6cc;
                    background-image: 
                        url("https://www.transparenttextures.com/patterns/handmade-paper.png"),
                        linear-gradient(to bottom, rgba(80, 63, 0, 0.05), transparent);
                    box-shadow: 
                        0 100px 150px -50px rgba(0,0,0,1),
                        inset 0 0 120px rgba(42, 27, 21, 0.1);
                    position: relative;
                    z-index: 10;
                }
                .ember {
                    position: absolute;
                    background: #F4C430;
                    border-radius: 50%;
                    filter: blur(1.5px);
                    box-shadow: 0 0 10px #F4C430;
                }
                .scroll-hidden::-webkit-scrollbar { width: 4px; }
                .scroll-hidden::-webkit-scrollbar-thumb { background: #503f00; }
                
                .patron-inscription {
                    background: #e9e4d1;
                    color: #1a1500;
                    font-weight: 700;
                    box-shadow: 0 15px 45px rgba(80, 63, 0, 0.15);
                    border: 1px solid rgba(80, 63, 0, 0.1);
                }
                .archivist-decree {
                    background: rgba(84, 67, 58, 0.08);
                    color: #1a1500;
                    font-style: italic;
                    font-weight: 500;
                    position: relative;
                    border-left: 4px solid #503f00;
                }
                .ink-well-basin {
                    background: #f5e6cc;
                    border-top: 2px solid rgba(80, 63, 0, 0.1);
                }
                .suggestion-charm {
                    background: #e9e4d1;
                    color: #1a1500;
                    border: 1px solid rgba(80, 63, 0, 0.2);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                .living-ink-line {
                    border-bottom: 2px solid rgba(80, 63, 0, 0.3);
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .living-ink-line:focus-within {
                    border-bottom: 2px solid #503f00;
                    transform: scaleY(1.1);
                }
            `}</style>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 pointer-events-auto flex items-center justify-center p-4 md:p-10 lg:p-20 overflow-hidden">
                        <div className="film-grain" />
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 sanctuary-backdrop"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="backdrop-overlay" />
                            <div className="volumetric-light" />
                            
                            {embers.map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="ember w-[2px] h-[2px]"
                                    animate={{
                                        y: [-20, -1200],
                                        x: [Math.random() * 200, Math.random() * -200],
                                        opacity: [0, 0.6, 0],
                                        scale: [1, 1.5, 0]
                                    }}
                                    transition={{
                                        duration: 15 + Math.random() * 25,
                                        repeat: Infinity,
                                        delay: Math.random() * 15
                                    }}
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: '105%'
                                    }}
                                />
                            ))}
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full flex flex-col z-10 overflow-hidden relative"
                        >
                            {/* Cinematic Header */}
                            <div className="px-12 py-12 flex justify-between items-start relative z-20">
                                <div className="flex flex-col">
                                    <h2 className="text-[#F4C430] font-headline text-6xl tracking-[0.2em] font-black uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">The Sommelier's Sanctuary</h2>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="w-12 h-[1px] bg-[#F4C430]/40" />
                                        <p className="text-[#f5e6cc]/40 text-xs uppercase tracking-[0.8em] font-sans italic">Custodians of the Heirloom Lineage</p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="w-16 h-16 rounded-full border border-[#f5e6cc]/10 flex items-center justify-center text-[#f5e6cc]/30 hover:text-[#f5e6cc] hover:bg-[#503f00] transition-all"
                                >
                                    <span className="material-symbols-outlined text-3xl">close</span>
                                </button>
                            </div>

                            {/* Centered Editorial Ledger (The Wisdom Stream) */}
                            <div className="flex-1 overflow-y-auto px-6 md:px-0 py-8 scroll-hidden relative">
                                <div className="max-w-5xl mx-auto space-y-24 pb-64">
                                    <AnimatePresence mode="popLayout">
                                        {history.map((chat, i) => (
                                            <motion.div 
                                                key={i}
                                                initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                                className={`flex flex-col ${chat.role === 'user' ? 'items-center' : 'items-start'} w-full`}
                                            >
                                                <div className={`relative px-12 py-8 transition-all duration-1000 ${
                                                    chat.role === 'user' 
                                                    ? 'text-[#F4C430] italic text-5xl font-headline tracking-tighter text-center' 
                                                    : 'text-[#f5e6cc] text-4xl font-headline leading-[1.8] max-w-[90%]'
                                                }`}>
                                                    {chat.role === 'model' && (
                                                        <div className="absolute -left-12 top-10 opacity-20">
                                                            <span className="material-symbols-outlined text-6xl text-[#F4C430]">policy</span>
                                                        </div>
                                                    )}
                                                    <p className="drop-shadow-2xl">{chat.parts[0].text}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                    {loading && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 0.5 }}
                                            className="text-[#f5e6cc] italic text-2xl text-center font-headline"
                                        >
                                            The Sommelier is leafing through the scrolls...
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
                                                    initial={{ opacity: 0, x: -30 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -30 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    onClick={() => { setMessage(suggestion); setShowSuggestions(false); setShowWritingDesk(true); }}
                                                    className="bg-[#2a1a00]/90 text-[#f5e6cc] px-8 py-3 rounded-sm border-l-4 border-[#F4C430] text-sm font-bold tracking-[0.3em] uppercase hover:bg-[#F4C430] hover:text-[#1a1500] transition-all backdrop-blur-xl shadow-2xl"
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
                                    className="w-28 h-28 rounded-full bg-gradient-to-br from-[#860603] to-[#4a0301] border-2 border-[#F4C430]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.2)] flex items-center justify-center relative overflow-hidden group"
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
                                            className="w-28 h-28 rounded-full bg-gradient-to-br from-[#503f00] to-[#1a1500] border-2 border-[#F4C430]/40 shadow-[0_15px_40px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.1)] flex items-center justify-center relative overflow-hidden group"
                                        >
                                             <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')] group-hover:rotate-90 transition-transform duration-[2s]" />
                                            <span className="material-symbols-outlined text-[#F4C430] text-5xl relative z-10">edit_note</span>
                                        </motion.button>
                                    ) : (
                                        <motion.div 
                                            key="writing-desk-basin"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: '100%', opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            className="bg-[#1a1500]/95 backdrop-blur-2xl p-10 rounded-full border border-[#F4C430]/30 shadow-[0_0_100px_rgba(0,0,0,0.8)] w-full"
                                        >
                                            <form onSubmit={handleSend} className="flex items-center gap-10">
                                                <input 
                                                    ref={inputRef}
                                                    type="text" 
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    placeholder="Inscribe your intent into the gold..."
                                                    className="flex-1 bg-transparent text-[#f5e6cc] font-headline text-4xl focus:outline-none italic placeholder:opacity-10 border-none ring-0 focus:ring-0"
                                                />
                                                <div className="flex items-center gap-6">
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

                            {/* Autonomous Decree Confirmation Seal */}
                            <AnimatePresence>
                                {confirmation && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -100, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -100, scale: 1.1 }}
                                        className="fixed top-32 left-1/2 -translate-x-1/2 z-[400] bg-gradient-to-r from-[#860603] to-[#503f00] text-[#f5e6cc] px-16 py-6 rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.9)] border-2 border-[#F4C430]/50 font-headline italic text-4xl tracking-widest flex items-center gap-8"
                                    >
                                        <span className="material-symbols-outlined text-[#F4C430] text-5xl">verified</span>
                                        {confirmation}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.div 
                className="fixed bottom-10 right-10 pointer-events-auto z-[210]"
                initial={false}
                animate={isOpen ? { scale: 0.8, opacity: 0, filter: 'blur(20px)' } : { scale: 1, opacity: 1, filter: 'blur(0px)' }}
            >
                <div className="relative group">
                    <motion.button 
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-[#860603] to-[#4a0301] text-[#f5e6cc] flex items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.5)] border-2 border-[#F4C430]/30 transition-shadow hover:shadow-[0_25px_50px_rgba(244,196,48,0.3)] relative overflow-hidden"
                    >
                         <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/royal-lineage.png')]" />
                        <span className="material-symbols-outlined text-5xl relative z-10">history_edu</span>
                    </motion.button>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        className="absolute right-full mr-6 top-1/2 -translate-y-1/2 bg-[#503f00] text-[#fff8f2] px-8 py-3 whitespace-nowrap text-[12px] font-black tracking-[0.5em] uppercase shadow-2xl pointer-events-none border-l-4 border-[#F4C430]"
                    >
                        Consult the Sommelier
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
