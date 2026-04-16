import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Rewards() {
    const { user, isAuthenticated, loading: authLoading, refreshProfile } = useAuth();
    const [tiers, setTiers] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRewardsData();
    }, [isAuthenticated]);

    const fetchRewardsData = async () => {
        try {
            setLoading(true);
            
            // Re-fetch core user profile for tokens and tier sync
            if (isAuthenticated && refreshProfile) refreshProfile();

            const tiersData = await api.get('rewards/tiers/');
            setTiers(tiersData);

            if (isAuthenticated) {
                const transData = await api.get('rewards/history/');
                setTransactions(transData.results || transData);
            }
        } catch (error) {
            console.error('Rewards data fetch failed:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-[#120e0a] flex items-center justify-center">
                <div className="text-[#F4C430] font-headline text-2xl animate-pulse italic">
                    Consulting the Royal Registers...
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#120e0a] text-[#fcf9ee] font-serif">
            <style>{`
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
                }
                .pattern-jali {
                    background-image: radial-gradient(rgba(244, 196, 48, 0.2) 1px, transparent 1px), radial-gradient(rgba(244, 196, 48, 0.2) 1px, transparent 1px);
                    background-size: 20px 20px;
                    background-position: 0 0,10px 10px;
                    opacity: 0.3;
                }
                img { mix-blend-mode: luminosity; opacity: 0.9; transition: all 0.5s ease; }
                img:hover { mix-blend-mode: normal; opacity: 1; }
            `}</style>

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        alt="Royal Heritage" 
                        className="w-full h-full object-cover filter brightness-[0.4] saturate-[0.8]" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV562n2iUKZIbjpQgvXtTVf0gB_3kAavNgWvBKXdlOmq1Li_aTQMrcrW28JxcqK1GcEBQFpr_IoUHBmdgKs4ASPqPKGOMeLdBsbAVHWNLwpE2IymsfP2Ka1MUE6TtqLIwO72nGtwhiaiRKHHE8vrK4MgPl1eOipbUXJFPRpuYDXjTGbdctnAPprADMcZqQBCR58QrxHsamtZ8Xl5ZJW1jaZkpqkOv4QdWAsSFVS1TGzxlsa1Mh9ymqytyWNtQK_YUVH4AOCJDq1NU"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120e0a] via-transparent to-transparent"></div>
                </div>
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="font-headline text-5xl md:text-8xl text-[#fcf9ee] leading-tight tracking-tight mb-6">
                        चाय परिवार — <br/><span className="italic font-light">Join the Heritage Family</span>
                    </h1>
                    <p className="font-body text-lg md:text-2xl text-[#dcd4c3] max-w-2xl mx-auto leading-relaxed opacity-90">
                        Step into a royal lineage of connoisseurs. More than a rewards program, it is an invitation to the inner sanctum of tea mastery.
                    </p>
                    {!isAuthenticated && (
                        <div className="mt-12">
                            <Link to="/login" className="bg-gradient-to-r from-[#F4C430] to-[#d6aa54] text-[#120e0a] px-10 py-4 font-headline uppercase tracking-[0.2em] text-sm hover:brightness-110 transition-all shadow-xl inline-block font-bold">
                                Accept the Invitation
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Rewards Dashboard */}
            <section className="py-24 px-8 max-w-7xl mx-auto -mt-32 relative z-20">
                <div className="bg-[#1a1510]/80 backdrop-blur-xl border border-[#F4C430]/30 p-10 md:p-20 relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
                    <div className="absolute top-0 right-0 w-96 h-96 pattern-jali opacity-10 pointer-events-none -mr-32 -mt-32 rotate-12"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 pattern-jali opacity-10 pointer-events-none -ml-32 -mb-32 -rotate-12"></div>
                    
                    {isAuthenticated ? (
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-10">
                                <div className="space-y-4">
                                    <div className="inline-block px-4 py-1 border border-[#F4C430]/30 bg-[#F4C430]/10 text-[#F4C430] text-xs uppercase tracking-[0.4em] font-bold">
                                        Heritage Patron ID: 00{user.id}
                                    </div>
                                    <h2 className="font-headline text-5xl md:text-6xl text-[#fcf9ee] leading-tight group">
                                        Namaste, <span className="text-[#F4C430] italic font-light transition-all group-hover:pl-4 drop-shadow-[0_0_15px_rgba(244,196,48,0.3)]">{user.username}</span>
                                    </h2>
                                    <div className="flex items-center gap-8 mt-10">
                                        <div className="flex flex-col">
                                            <span className="text-[#dcd4c3] text-xs uppercase tracking-widest mb-2 font-bold opacity-80">Tea Tokens</span>
                                            <div className="flex items-center gap-3 text-[#F4C430]">
                                                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                                                <span className="font-headline text-5xl">{user.tokens || 0}</span>
                                            </div>
                                        </div>
                                        <div className="h-14 w-[1px] bg-[#F4C430]/30"></div>
                                        <div className="flex flex-col">
                                            <span className="text-[#dcd4c3] text-xs uppercase tracking-widest mb-2 font-bold opacity-80">Archival Standing</span>
                                            <span className="font-headline text-3xl text-[#fcf9ee] uppercase tracking-tighter shadow-sm">{user.loyalty_tier_display || 'New Patron'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="p-8 border border-[#F4C430]/20 bg-[#0a0805]/70 backdrop-blur-md shadow-2xl">
                                        <p className="font-serif text-[#dcd4c3] text-base italic mb-6 leading-relaxed max-w-[280px]">
                                            "A journey of a thousand flushes begins with a single token."
                                        </p>
                                        <Link to="/sommelier" className="text-[#F4C430] hover:text-[#fcf9ee] text-xs uppercase tracking-[0.3em] font-bold transition-colors border-b border-[#F4C430]/30 pb-1">
                                            Visit the Sommelier →
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Ascension Journey Map */}
                            <div className="relative pt-16 pb-6">
                                <div className="flex justify-between items-center mb-10">
                                    <h4 className="font-headline text-base uppercase tracking-[0.3em] text-[#F4C430]/80">Your Ascension Journey</h4>
                                    <span className="text-[#dcd4c3] text-xs uppercase tracking-widest font-bold">
                                        Next Milestone: <span className="text-[#F4C430] font-bold text-sm tracking-wider">{user.next_tier_tokens || '---'} Tokens</span>
                                    </span>
                                </div>
                                
                                <div className="relative h-[4px] bg-[#F4C430]/10 mb-16 rounded-full overflow-visible">
                                    {/* Animated Progress Fill */}
                                    <div 
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#d6aa54] via-[#F4C430] to-[#fcf9ee] shadow-[0_0_25px_rgba(244,196,48,0.8)] transition-all duration-[2000ms] rounded-full"
                                        style={{ width: `${Math.min(100, (user.tokens / 15000) * 100)}%` }}
                                    ></div>
                                    
                                    <div className="absolute inset-x-0 -top-[6px] flex justify-between items-center">
                                        {['Naya', 'Brass', 'Keeper', 'Maharaja'].map((step, i) => {
                                            const threshold = i === 0 ? 0 : i === 1 ? 1000 : i === 2 ? 5000 : 15000;
                                            const isAchieved = user.tokens >= threshold;
                                            return (
                                                <div key={step} className="flex flex-col items-center">
                                                    <div className={`w-4 h-4 rounded-full border-2 transition-all duration-1000 z-30 ${isAchieved ? 'bg-[#F4C430] border-[#fcf9ee] scale-125 shadow-[0_0_20px_#F4C430]' : 'bg-[#120e0a] border-[#F4C430]/50'}`}></div>
                                                    <div className="absolute top-8 flex flex-col items-center">
                                                        <span className={`text-xs uppercase tracking-[0.2em] font-black whitespace-nowrap transition-colors duration-500 ${isAchieved ? 'text-[#F4C430]' : 'text-[#dcd4c3]/30'}`}>
                                                            {step}
                                                        </span>
                                                        <span className={`text-[11px] uppercase tracking-tighter mt-1 font-bold ${isAchieved ? 'text-[#fcf9ee]/70' : 'text-[#dcd4c3]/20'}`}>
                                                            {threshold} Pts
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-4xl font-headline text-[#fcf9ee] mb-8 uppercase tracking-widest">Inner Sanctum Access</h3>
                            <p className="text-[#dcd4c3] italic max-w-lg mx-auto mb-16 leading-relaxed text-xl opacity-80">
                                Curate your own legacy. Sign in to view your token balance and ascend through the royal ranks.
                            </p>
                            <Link to="/login" className="px-16 py-5 bg-transparent border-2 border-[#F4C430] text-[#F4C430] uppercase text-sm tracking-[0.4em] font-bold hover:bg-[#F4C430] hover:text-[#120e0a] transition-all duration-500 shadow-2xl">
                                Identify as Patron
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Tier System Details */}
            <section className="py-32 bg-[#120e0a] text-[#fcf9ee] relative overflow-hidden">
                <div className="absolute inset-0 pattern-jali opacity-[0.08]"></div>
                <div className="max-w-7xl mx-auto px-8 relative z-10">
                    <div className="text-center mb-28">
                        <h2 className="font-headline text-5xl md:text-8xl mb-8 text-[#F4C430] uppercase tracking-tighter drop-shadow-[0_0_25px_rgba(244,196,48,0.5)]">The Four Ascensions</h2>
                        <div className="w-40 h-[2px] bg-gradient-to-r from-transparent via-[#F4C430] to-transparent mx-auto mb-12"></div>
                        <p className="font-serif text-[#dcd4c3] text-2xl max-w-4xl mx-auto italic leading-relaxed opacity-90">
                            Each tier marks a deepening of your journey into the living archive of tea, unlocking unique artifacts and elite privileges.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {tiers.length > 0 ? tiers.map((tier, idx) => {
                            const isAchieved = user && user.tokens >= tier.min_tokens;
                            const tierThemes = {
                                'naya_patron': 'from-[#2c1810] to-[#1a1510]',
                                'brass_baron': 'from-[#3d2b1f] to-[#1a1510]',
                                'heritage_keeper': 'from-[#2a1b15] to-[#1a1510]',
                                'maharaja': 'from-[#1a2c1a] to-[#1a1510]'
                            };
                            const bgTheme = tierThemes[tier.slug] || 'from-[#1a1510] to-[#120e0a]';
                            
                            return (
                                <div key={tier.id} className={`group relative flex flex-col min-h-[650px] transition-all duration-1000 ${isAchieved ? 'hover:-translate-y-4 hover:shadow-[0_40px_100px_rgba(0,0,0,0.9)]' : ''}`}>
                                    {/* Metallic Border Frame */}
                                    <div className={`absolute inset-0 border border-[#F4C430]/10 bg-gradient-to-b ${bgTheme} transition-opacity duration-1000`}></div>
                                    <div className="absolute inset-[1px] border border-[#F4C430]/5 pointer-events-none"></div>
                                    
                                    {/* Light Sweep Effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                                        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] bg-gradient-to-br from-transparent via-[#F4C430]/10 to-transparent rotate-45 transform translate-x-[-100%] translate-y-[-100%] group-hover:animate-sweep"></div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="relative z-10 p-10 flex flex-col h-full">
                                        {isAchieved && (
                                            <div className="absolute top-0 left-12 px-6 py-2 bg-gradient-to-r from-[#d6aa54] to-[#F4C430] text-[#120e0a] text-xs font-black uppercase tracking-[0.3em] shadow-[0_10px_30px_rgba(244,196,48,0.4)] drop-shadow-md">
                                                Royal Access
                                            </div>
                                        )}
                                        
                                        <div className="absolute top-0 right-0 p-8 font-headline text-[#F4C430]/10 text-8xl font-bold italic select-none">
                                            0{idx + 1}
                                        </div>
                                        
                                        <div className="mt-16 mb-12 w-32 h-32 relative mx-auto flex items-center justify-center">
                                            {/* Rotating Frame */}
                                            <div className={`absolute inset-0 border-2 ${isAchieved ? 'border-[#F4C430]/60' : 'border-[#F4C430]/20'} rotate-45 transition-all duration-1000 group-hover:rotate-[225deg]`}></div>
                                            <div className={`absolute inset-2 border ${isAchieved ? 'border-[#F4C430]/30' : 'border-[#F4C430]/10'} rotate-45 transition-all duration-1000 group-hover:rotate-[-135deg]`}></div>
                                            
                                            <span className={`material-symbols-outlined ${isAchieved ? 'text-[#F4C430] scale-125 drop-shadow-[0_0_20px_#F4C430]' : 'text-[#F4C430]/20'} text-6xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
                                                {tier.icon}
                                            </span>
                                        </div>

                                        <div className="text-center mb-10">
                                            <h3 className="font-headline text-4xl mb-3 uppercase tracking-widest bg-gradient-to-b from-[#fcf9ee] via-[#F4C430] to-[#d6aa54] bg-clip-text text-transparent drop-shadow-sm font-bold">
                                                {tier.name}
                                            </h3>
                                            <div className="flex items-center justify-center gap-4">
                                                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#F4C430]/40"></div>
                                                <p className="font-label text-sm uppercase tracking-[0.4em] text-[#F4C430] font-black">{tier.min_tokens}+ Tokens</p>
                                                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#F4C430]/40"></div>
                                            </div>
                                        </div>
                                        
                                        <p className="text-[#dcd4c3] mb-12 italic text-lg leading-relaxed text-center font-serif opacity-80 px-4">
                                            "{tier.description}"
                                        </p>

                                        <div className="mt-auto space-y-8">
                                            <div>
                                                <span className="text-xs uppercase tracking-[0.3em] text-[#F4C430]/60 font-black block mb-6 text-center">Archival Privileges:</span>
                                                <ul className="space-y-6">
                                                    {tier.perks && tier.perks.map((perk, pIdx) => (
                                                        <li key={pIdx} className="flex items-start gap-4 group/perk">
                                                            <div className={`mt-1.5 w-2 h-2 rounded-full ${isAchieved ? 'bg-[#F4C430] shadow-[0_0_10px_#F4C430]' : 'bg-[#dcd4c3]/20'}`}></div>
                                                            <span className={`text-base ${isAchieved ? 'text-[#fcf9ee]' : 'text-[#dcd4c3]/40'} transition-all duration-500 group-hover/perk:translate-x-2`}>
                                                                {perk}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Lock Overlay for Unearned Tiers */}
                                        {!isAchieved && (
                                            <div className="absolute inset-0 z-50 backdrop-blur-[8px] bg-[#0a0805]/60 flex flex-col items-center justify-center p-12 text-center group-hover:backdrop-blur-[4px] transition-all duration-700 cursor-help">
                                                <div className="w-20 h-20 rounded-full border border-[#F4C430]/30 flex items-center justify-center mb-6 bg-[#1a1510]/50">
                                                    <span className="material-symbols-outlined text-[#F4C430] text-4xl animate-pulse">lock</span>
                                                </div>
                                                <h4 className="font-headline text-2xl text-[#fcf9ee] mb-2 uppercase tracking-[0.2em]">Ascension Locked</h4>
                                                <p className="text-xs text-[#F4C430] uppercase tracking-widest font-black">Requires {tier.min_tokens} Tokens</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        }) : (
                            <div className="col-span-full py-20 text-center border-2 border-dashed border-[#F4C430]/20 rounded-xl bg-[#1a1510]/50">
                                <p className="text-[#dcd4c3] italic text-2xl animate-pulse">Consulting the Royal Records...</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <style>{`
                @keyframes sweep {
                    0% { transform: translate(-100%, -100%) rotate(45deg); }
                    100% { transform: translate(100%, 100%) rotate(45deg); }
                }
                .animate-sweep {
                    animation: sweep 1.5s ease-in-out forwards;
                }
            `}</style>

            {/* How to Earn */}
            <section className="py-24 px-8 max-w-7xl mx-auto">
                <h2 className="font-headline text-4xl mb-12 border-l-4 border-[#F4C430] pl-6">Ways to Curate Tokens</h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-8 bg-[#3f2a13] text-[#F4C430] p-12 flex flex-col justify-between min-h-[300px]">
                        <span className="material-symbols-outlined text-6xl opacity-30">payments</span>
                        <div>
                            <h4 className="font-headline text-4xl mb-2">₹100 Spent = 1 Tea Token</h4>
                            <p className="font-body opacity-80 text-[#fcf9ee]">Every sip adds to your legacy. Tokens never expire for active members.</p>
                        </div>
                    </div>
                    <div className="md:col-span-4 bg-[#31281f] p-8 flex flex-col items-center text-center justify-center group hover:bg-[#4a3b2b] transition-all">
                        <span className="material-symbols-outlined text-4xl text-[#d6aa54] mb-4 group-hover:scale-110 transition-transform">cake</span>
                        <h4 className="font-headline text-xl mb-1">Birthday Gift</h4>
                        <p className="font-body text-2xl font-bold text-[#d6aa54]">100 Tokens</p>
                    </div>
                    {/* ... other ways ... */}
                </div>
            </section>
        </main>
    );
}
