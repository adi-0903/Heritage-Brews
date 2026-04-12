import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import { useAuth } from '../context/AuthContext';

export default function Profile() {
    const { user, isAuthenticated, loading: authLoading, logout, refreshProfile } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [rewards, setRewards] = useState(null);
    const [reservations, setReservations] = useState([]);
    const [activeTab, setActiveTab] = useState('orders'); // 'orders', 'rewards', or 'reservations'
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
            return;
        }

        if (isAuthenticated) {
            fetchProfileData();
        }
    }, [isAuthenticated, authLoading]);

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            // Re-fetch core user profile for tokens and tier sync
            if (refreshProfile) refreshProfile();

            // Fetch individually so one failure doesn't block the others
            api.get('orders/')
                .then(data => setOrders(data))
                .catch(err => console.error('Orders Fetch Error:', err));

            api.get('rewards/history/')
                .then(data => setRewards(data))
                .catch(err => console.error('Rewards Fetch Error:', err));

            api.get('reservations/list/')
                .then(data => setReservations(data))
                .catch(err => console.error('Reservations Fetch Error:', err));

        } catch (error) {
            console.error('General Profile Fetch Error:', error);
        } finally {
            // We give it a small delay for the promises to start settling, 
            // but normally we'd use Promise.allSettled for true robustness.
            // For now, let's keep it simple.
            setTimeout(() => setLoading(false), 800);
        }
    };

    const handleCancelReservation = async (code) => {
        if (!window.confirm('Are you certain you wish to remove this entry from the sanctuary ledger?')) return;
        try {
            await api.put(`reservations/${code}/cancel/`);
            fetchProfileData(); // Refresh data
        } catch (error) {
            alert('Failed to cancel: ' + (error.response?.data?.error || error.message));
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-[#120e0a] flex items-center justify-center">
                <div className="text-[#F4C430] font-headline text-2xl animate-pulse italic">
                    Opening the Royal Ledger...
                </div>
            </div>
        );
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const guestLabels = {
        '1-2': '1–2 Connoisseurs',
        '3-5': '3–5 Patrons',
        '6-10': '6–10 Patrons',
        '10-25': '10–25 (Private)',
        '25+': '25+ (Grand Celebration)'
    };

    const scopeLabels = {
        'table': 'Standard Table',
        'partial': 'Exclusive Sanctuary',
        'full': 'Grand Buyout'
    };

    return (
        <main className="min-h-screen bg-[#120e0a] text-[#fcf9ee] pt-48 pb-24">
            <style>{`
                .glass-card {
                    background: rgba(26, 21, 16, 0.4);
                    backdrop-filter: blur(10px);
                    border: 0.5px solid rgba(244, 196, 48, 0.1);
                }
                .status-badge {
                    padding: 4px 12px;
                    font-size: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.1em;
                    font-weight: 700;
                }
                .order-item-grid {
                    display: grid;
                    grid-template-columns: auto 1fr auto;
                    gap: 1rem;
                    align-items: center;
                }
                .glow-border {
                    box-shadow: 0 0 20px rgba(244, 196, 48, 0.05);
                }
            `}</style>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 pb-12 border-b border-[#F4C430]/10">
                    <div className="flex items-center gap-8">
                        <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-[#F4C430] rotate-45 flex items-center justify-center overflow-hidden bg-[#1a1510] shadow-[0_0_30px_rgba(244,196,48,0.1)]">
                            <span className="material-symbols-outlined text-[60px] md:text-[80px] text-[#F4C430] -rotate-45">account_circle</span>
                        </div>
                        <div>
                            <span className="font-label text-[#d6aa54] uppercase tracking-[0.4em] text-sm mb-2 block font-bold">
                                {user?.profile?.active_membership ? user.profile.active_membership.title : (user?.loyalty_tier_display || 'Patron')}
                            </span>
                            <h1 className="font-headline text-4xl md:text-6xl text-[#fcf9ee] mb-2">{user?.username}</h1>
                            <p className="font-body text-base text-[#c4bcae] italic opacity-70">
                                {user?.profile?.active_membership ? `Ascended Lineage: ${user.profile.active_membership.title}` : `Patron since ${user?.date_joined ? formatDate(user.date_joined) : 'the dawn of Heritage'}`}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="glass-card px-10 py-8 text-center border-2 border-[#F4C430]/20 shadow-[0_0_30px_rgba(244,196,48,0.1)]">
                            <span className="block text-[#F4C430] font-headline text-4xl mb-1">{user?.tokens || 0}</span>
                            <span className="block text-[11px] uppercase tracking-[0.3em] font-black text-[#F4C430]/60">Tea Tokens Balance</span>
                        </div>
                        <button onClick={logout} className="p-5 glass-card hover:bg-red-900/10 hover:border-red-900/30 transition-all group">
                            <span className="material-symbols-outlined text-red-500/70 group-hover:text-red-500 text-2xl">logout</span>
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-x-12 gap-y-4 mb-12 border-b border-white/5">
                    {[
                        { id: 'orders', label: 'Order Archives' },
                        { id: 'rewards', label: 'Token Treasury' },
                        { id: 'reservations', label: 'Sanctuary Ledger' }
                    ].map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`pb-4 nav-text text-sm uppercase tracking-[0.2em] font-bold transition-all relative ${activeTab === tab.id ? 'text-[#F4C430]' : 'text-white/40 hover:text-white/60'}`}
                        >
                            {tab.label}
                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#F4C430]"></div>}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="min-h-[500px]">
                    {activeTab === 'orders' && (
                        <div className="grid gap-8">
                            {orders.length === 0 ? (
                                <div className="text-center py-24 glass-card">
                                    <span className="material-symbols-outlined text-6xl text-[#F4C430]/20 mb-4">history_edu</span>
                                    <h3 className="font-headline text-xl text-white/50">Your ledger is currently blank.</h3>
                                    <Link to="/menu" className="text-[#F4C430] uppercase text-xs tracking-widest mt-4 inline-block border-b border-[#F4C430]">Begin your journey</Link>
                                </div>
                            ) : (
                                orders.map(order => (
                                    <div key={order.id} className="glass-card overflow-hidden group hover:border-[#F4C430]/30 transition-all">
                                        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5">
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="font-headline text-2xl text-[#F4C430]">{order.order_number}</span>
                                                    <span className={`status-badge px-4 py-1.5 rounded-sm ${
                                                        order.status === 'delivered' ? 'bg-green-900/30 text-green-400' :
                                                        order.status === 'cancelled' ? 'bg-red-900/30 text-red-400' :
                                                        'bg-[#F4C430]/20 text-[#F4C430]'
                                                    }`}>
                                                        {order.status.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-white/50 uppercase tracking-[0.2em] font-body">Archived on {formatDate(order.created_at)}</p>
                                            </div>
                                            <div className="text-left md:text-right w-full md:w-auto">
                                                <p className="text-xs uppercase tracking-[0.3em] font-black text-white/40 mb-1">Patron Total Contribution</p>
                                                <p className="font-headline text-4xl text-[#fcf9ee]">₹{order.total}</p>
                                            </div>
                                        </div>
                                        <div className="p-6 md:px-8 bg-white/5">
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {order.items.map((item, idx) => (
                                                    <div key={idx} className="flex gap-4 items-center">
                                                        <div className="w-12 h-12 glass-card flex items-center justify-center text-sm text-[#F4C430] font-bold">
                                                            {item.quantity}x
                                                        </div>
                                                        <div>
                                                            <p className="text-base font-medium text-white/90">{item.product_name}</p>
                                                            <p className="text-xs text-[#F4C430]/60 uppercase tracking-widest">₹{item.product_price}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm">
                                                <div className="flex items-center gap-2 text-white/50 italic">
                                                    <span className="material-symbols-outlined text-base">location_on</span>
                                                    {order.address}, {order.city}
                                                </div>
                                                <div className="flex items-center gap-4">
                                                     <span className="text-white/50 uppercase tracking-widest font-medium">Payment: {order.payment_method.toUpperCase()}</span>
                                                     <Link to={`/invoice/${order.order_number}`} className="text-[#F4C430] hover:underline uppercase tracking-tighter font-bold flex items-center gap-1 group/btn">
                                                        <span className="material-symbols-outlined text-base transform group-hover/btn:translate-y-0.5 transition-transform">article</span>
                                                        Download Invoice
                                                     </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {activeTab === 'rewards' && (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            {/* Token Summary */}
                            <div className="lg:col-span-4 flex flex-col gap-8">
                                <div className="glass-card p-8 relative overflow-hidden">
                                     <div className="absolute top-0 right-0 p-2 opacity-10">
                                         <span className="material-symbols-outlined text-[120px]">verified</span>
                                     </div>
                                     <span className="font-label text-[#d6aa54] uppercase tracking-[0.3em] text-[10px] mb-4 block underline decoration-[#F4C430]/30 underline-offset-4">Loyalty Tier</span>
                                     <h3 className="font-headline text-3xl mb-1 text-[#F4C430]">{user?.loyalty_tier_display || 'New Patron'}</h3>
                                     <p className="text-white/60 text-sm italic mb-8">Elevating your status with every visit.</p>
                                     <div className="w-full bg-white/5 h-1 relative mb-2">
                                         <div 
                                            className="absolute top-0 left-0 bg-[#F4C430] h-full shadow-[0_0_10px_#F4C430] transition-all duration-1000" 
                                            style={{ width: `${Math.min(100, (user?.tokens || 0) / (user?.loyalty_tier === 'naya_patron' ? 10 : 50))}%` }}
                                         ></div>
                                     </div>
                                     <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#F4C430]/60">
                                         <span>{user?.tokens || 0} pts</span>
                                         <span>{user?.next_tier_tokens ? `Next Milestone: ${user.next_tier_tokens} pts` : 'Max Tier Achieved'}</span>
                                     </div>
                                </div>
                                <div className="glass-card p-8 border-l-4 border-l-[#F4C430]">
                                     <h4 className="font-headline text-lg mb-4 text-[#F4C430]">Member Benefits</h4>
                                     <ul className="grid gap-4">
                                         {[
                                             { icon: 'local_shipping', text: 'Free Express Delivery' },
                                             { icon: 'workspace_premium', text: 'Early Access to Harvests' },
                                             { icon: 'liquor', text: 'Complimentary Tasting Vouchers' }
                                         ].map((benefit, i) => (
                                             <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                                                 <span className="material-symbols-outlined text-[#F4C430] text-lg">{benefit.icon}</span>
                                                 {benefit.text}
                                             </li>
                                         ))}
                                     </ul>
                                </div>
                            </div>
                            
                            {/* Token History */}
                            <div className="lg:col-span-8">
                                <div className="glass-card p-8">
                                    <h4 className="font-headline text-2xl mb-8 border-b border-white/5 pb-4">Activity Log</h4>
                                    <div className="space-y-6">
                                        {(() => {
                                            const rewardList = Array.isArray(rewards) ? rewards : (rewards?.results || []);
                                            if (rewardList.length === 0) {
                                                return <p className="text-white/30 italic text-center py-12">No recent token activity recorded.</p>;
                                            }
                                            return rewardList.map((trans, i) => (
                                                <div key={i} className="flex justify-between items-center py-4 border-b border-white/5 last:border-0 hover:bg-white/5 px-4 transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${trans.transaction_type === 'earn' ? 'bg-green-900/20 text-green-400' : 'bg-red-900/20 text-red-400'}`}>
                                                            <span className="material-symbols-outlined text-lg">
                                                                {trans.transaction_type === 'earn' ? 'add' : 'remove'}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <p className="font-headline text-lg text-white/90">{trans.reason || trans.description}</p>
                                                            <p className="text-xs uppercase tracking-widest text-white/40">{formatDate(trans.created_at || trans.timestamp)}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`font-headline text-xl ${trans.transaction_type === 'earn' ? 'text-green-400' : 'text-red-400'}`}>
                                                        {trans.transaction_type === 'earn' ? '+' : '-'}{trans.amount || trans.tokens}
                                                    </div>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                    <div className="mt-8 text-center">
                                         <Link to="/rewards" className="bg-[#F4C430]/10 text-[#F4C430] py-3 px-8 text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#F4C430] hover:text-[#120e0a] transition-all">Explore Full Rewards System</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'reservations' && (
                        <div className="grid gap-8">
                            {(() => {
                                const list = Array.isArray(reservations) ? reservations : (reservations?.results || []);
                                if (list.length === 0) {
                                    return (
                                        <div className="text-center py-24 glass-card">
                                            <span className="material-symbols-outlined text-6xl text-[#F4C430]/20 mb-4">event_repeat</span>
                                            <h3 className="font-headline text-xl text-white/50">Your sanctuary ledger is empty.</h3>
                                            <Link to="/reservation" className="text-[#F4C430] uppercase text-xs tracking-widest mt-4 inline-block border-b border-[#F4C430]">Schedule a visitation</Link>
                                        </div>
                                    );
                                }
                                return list.map(res => (
                                    <div key={res.id} className="glass-card p-8 group hover:border-[#F4C430]/30 transition-all relative overflow-hidden">
                                        {/* Background Accent - Scaled down */}
                                        <div className="absolute top-0 right-0 p-6 text-[80px] font-headline font-black italic text-white/[0.02] pointer-events-none select-none -rotate-12 translate-x-8 -translate-y-8">HB</div>
                                        
                                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 relative z-10">
                                            <div className="flex-1 space-y-5">
                                                <div className="flex flex-wrap items-center gap-5">
                                                    {/* Refined Booking Code Box */}
                                                    <div className="px-6 py-3 bg-[#F4C430]/5 border border-[#F4C430]/20 rounded-lg text-center min-w-[160px] shadow-[0_0_20px_rgba(244,196,48,0.03)]">
                                                        <span className="text-[8px] uppercase tracking-[0.3em] text-[#F4C430]/60 font-black block mb-1">Booking Code</span>
                                                        <span className="text-xl text-[#F4C430] font-headline tracking-[0.3em] glow-text select-all">
                                                            {res.confirmation_code.split('').join(' ')}
                                                        </span>
                                                    </div>
                                                    
                                                    <span className={`status-badge px-4 py-1.5 rounded-full border text-[9px] ${
                                                        res.status === 'confirmed' ? 'bg-green-900/10 border-green-500/30 text-green-400' :
                                                        res.status === 'cancelled' ? 'bg-red-900/10 border-red-500/30 text-red-500' :
                                                        'bg-[#F4C430]/10 border-[#F4C430]/30 text-[#F4C430]'
                                                    }`}>
                                                        {res.status}
                                                    </span>
                                                </div>

                                                <h4 className="font-headline text-3xl text-[#fcf9ee] tracking-tight">
                                                    {formatDate(res.date)}
                                                    <span className="text-[#F4C430] mx-3 font-body opacity-30 text-xl italic">at</span>
                                                    {res.time_or_duration}
                                                </h4>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4 border-y border-white/5">
                                                    <div>
                                                        <span className="text-[8px] uppercase tracking-widest text-white/30 block mb-1">Patron</span>
                                                        <span className="text-xs font-medium text-white/70 uppercase">{res.patron_name}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[8px] uppercase tracking-widest text-white/30 block mb-1">Connoisseur Count</span>
                                                        <span className="text-xs font-medium text-white/70">{guestLabels[res.guests] || res.guests}</span>
                                                    </div>
                                                    <div>
                                                        <span className="text-[8px] uppercase tracking-widest text-white/30 block mb-1">Scope</span>
                                                        <span className="text-xs font-medium text-white/80">{scopeLabels[res.scope] || res.scope}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-4 w-full lg:w-auto items-center lg:items-end">
                                                <div className="text-center lg:text-right">
                                                    <span className="text-[8px] uppercase tracking-[0.3em] text-[#F4C430]/40 block mb-1">Intent</span>
                                                    <span className="text-white/80 font-body italic text-base px-4 py-1.5 bg-white/5 rounded-md border border-white/5">
                                                        {res.occasion.replace('_', ' ')}
                                                    </span>
                                                </div>
                                                
                                                {res.status !== 'cancelled' && res.status !== 'completed' && (
                                                    <button 
                                                        onClick={() => handleCancelReservation(res.confirmation_code)}
                                                        className="w-full lg:w-auto border border-red-500/20 text-red-500/40 py-3 px-8 text-[9px] uppercase tracking-[0.2em] font-black hover:bg-red-500/10 hover:text-red-500 transition-all rounded-sm"
                                                    >
                                                        Revoke Access
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ));
                            })()}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
