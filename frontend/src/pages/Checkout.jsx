import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Checkout() {
    const { items, totalPrice, rawTotal, savings, discountRate, clearCart, removeItem, updateQty } = useCart();
    const navigate = useNavigate();
    const { user, isAuthenticated, loading: authLoading, refreshProfile } = useAuth();
    const activeMembership = user?.profile?.active_membership;

    const hasGifts = items.some(item => item.type === 'hamper' || item.occasion);
    const minOrderNotMet = !hasGifts && items.length > 0 && totalPrice < 600;
    // Delivery is complimentary for gifts or if the menu minimum order of ₹600 is met.
    const deliveryFee = (hasGifts || !minOrderNotMet) ? 0 : 50;
    const unlockedMenuFreeDelivery = !hasGifts && items.length > 0 && !minOrderNotMet;
    
    const [formData, setFormData] = useState({
        patron_name: '',
        phone: '',
        address: '',
        city: '',
        pincode: '',
        special_instructions: '',
        payment_method: 'upi'
    });

    const [status, setStatus] = useState({ loading: false, error: null });
    const [successData, setSuccessData] = useState({ show: false, orderNumber: '', waLink: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (items.length === 0) return alert('Your selection is empty.');
        if (authLoading) return;

        if (!isAuthenticated) {
            // Use a smoother redirection
            navigate('/register', { state: { from: { pathname: '/checkout' } } });
            return;
        }

        setStatus({ loading: true, error: null });

        try {
            const orderData = {
                ...formData,
                items: items.map(item => ({
                    product: item.id,
                    quantity: item.qty,
                    price_at_order: item.price
                })),
                total_amount: totalPrice + deliveryFee
            };

            const res = await api.post('orders/', orderData);
            
            // Construct Royal WhatsApp Receipt
            const waNumber = formData.phone.replace(/\D/g, '');
            const orderDetails = items.map(i => `• ${i.name} (x${i.qty}) - ₹${i.price * i.qty}`).join('%0A');
            const waMessage = `*🏰 HERITAGE BREWS — THE ROYAL RECEIPT*%0A%0A*Order Number:* ${res.order_number}%0A*Patron:* ${formData.patron_name}%0A%0A*Selection:*%0A${orderDetails}%0A%0A*Subtotal:* ₹${rawTotal}%0A${savings > 0 ? `*Lineage Discount:* -₹${savings} (${Math.round(discountRate * 100)}%)%0A` : ''}*Delivery Fee:* ${deliveryFee === 0 ? 'Complimentary' : `₹${deliveryFee}`}%0A*Total Investment:* ₹${totalPrice + deliveryFee}%0A%0A*Delivery Sanctuary:* ${formData.address}, ${formData.city}%0A%0A_Your brew has been etched into our history. Prepare for excellence._`;
            
            const waLink = `https://wa.me/${waNumber.startsWith('91') || waNumber.length > 10 ? waNumber : '91' + waNumber}?text=${waMessage}`;
            
            // Trigger the Royal Proclamation Modal instead of alert
            setSuccessData({
                show: true,
                orderNumber: res.order_number,
                waLink: waLink,
                potentialTokens: Math.floor((totalPrice + deliveryFee) / 10)
            });

            clearCart();
        } catch (err) {
            console.error('Order failed:', err);
            setStatus({ loading: false, error: err.message || 'The ledger rejected the entry. Please check your details.' });
        }
    };

    return (
        <main className="bg-[#120e0a] min-h-screen relative font-serif text-[#e5e2d8]">
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
                .gold-glow { text-shadow: 0 0 30px rgba(244,196,48,0.4); }
                input, textarea {
                    caret-color: #F4C430;
                    color: #e5e2d8;
                }
                input:focus, textarea:focus {
                    outline: none !important;
                    border-bottom-color: #F4C430 !important;
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .shimmer-btn {
                    background: linear-gradient(90deg, #F4C430 0%, #e5b800 25%, #fff8dc 50%, #e5b800 75%, #F4C430 100%);
                    background-size: 200% auto;
                    animation: shimmer 4s linear infinite;
                }
                @keyframes unlock-bounce {
                    0% { opacity: 0; transform: translateY(-20px) scale(0.9); }
                    50% { opacity: 1; transform: translateY(5px) scale(1.05); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                .free-delivery-badge {
                    background: linear-gradient(90deg, #F4C430 0%, #fff8dc 50%, #F4C430 100%);
                    background-size: 200% auto;
                    color: #120e0a;
                    animation: shimmer 3s linear infinite, unlock-bounce 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
            `}</style>

            <div className="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

            <div className="max-w-screen-2xl mx-auto px-8 py-24 relative z-10">
                <div className="mb-16 text-center">
                    <span className="text-[#F4C430] font-label text-lg tracking-[0.4em] uppercase mb-4 block font-bold">Finalizing Your Curation</span>
                    <h1 className="font-headline text-5xl md:text-7xl font-bold text-[#e5e2d8] tracking-tighter mb-4 gold-glow">The Checkout Ledger</h1>
                    <div className="w-32 h-[2px] bg-[#F4C430]/40 mx-auto mt-6"></div>
                </div>

                <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-7 space-y-16">
                        <section>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-12 h-12 border border-[#F4C430]/30 flex items-center justify-center bg-[#F4C430]/5">
                                    <span className="material-symbols-outlined text-2xl">local_shipping</span>
                                </div>
                                <h2 className="font-headline text-3xl font-bold text-[#e5e2d8]">Delivery Sanctuary</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 bg-[#1c1511] p-10 border border-[#F4C430]/10 shadow-2xl relative">
                                <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#F4C430]/30"></div>
                                <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#F4C430]/30"></div>

                                <div className="space-y-1">
                                    <label className="font-headline text-lg text-[#F4C430]">Patron Name</label>
                                    <input name="patron_name" required value={formData.patron_name} onChange={handleChange} className="w-full bg-transparent border-b border-[#F4C430]/20 py-3" placeholder="Vikramaditya Singh" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-headline text-lg text-[#F4C430]">Contact Number</label>
                                    <input name="phone" required value={formData.phone} onChange={handleChange} className="w-full bg-transparent border-b border-[#F4C430]/20 py-3" placeholder="+91 00000 00000" />
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="font-headline text-lg text-[#F4C430]">Residence Address</label>
                                    <input name="address" required value={formData.address} onChange={handleChange} className="w-full bg-transparent border-b border-[#F4C430]/20 py-3" placeholder="Villa No., Street, Landmark" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-headline text-lg text-[#F4C430]">City / Town</label>
                                    <input name="city" required value={formData.city} onChange={handleChange} className="w-full bg-transparent border-b border-[#F4C430]/20 py-3" placeholder="Jaipur" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-headline text-lg text-[#F4C430]">Pincode</label>
                                    <input name="pincode" required value={formData.pincode} onChange={handleChange} className="w-full bg-transparent border-b border-[#F4C430]/20 py-3" placeholder="302001" />
                                </div>
                                <div className="md:col-span-2 space-y-1">
                                    <label className="font-headline text-lg text-[#F4C430]">Special Instructions (Optional)</label>
                                    <textarea name="special_instructions" value={formData.special_instructions} onChange={handleChange} className="w-full bg-transparent border-b border-[#F4C430]/20 py-3 resize-none h-24" placeholder="Special delivery notes or gate codes..." />
                                </div>
                            </div>
                        </section>

                        <section>
                            <div className="flex items-center space-x-4 mb-8">
                                <div className="w-12 h-12 border border-[#F4C430]/30 flex items-center justify-center bg-[#F4C430]/5">
                                    <span className="material-symbols-outlined text-2xl">payments</span>
                                </div>
                                <h2 className="font-headline text-3xl font-bold text-[#e5e2d8]">Method of Exchange</h2>
                            </div>
                            <div className="space-y-4">
                                {['upi', 'card', 'bank', 'cod'].map(method => (
                                    <label key={method} className={`flex items-center p-6 bg-[#1c1511] border-l-4 ${formData.payment_method === method ? 'border-[#F4C430]' : 'border-[#F4C430]/30'} cursor-pointer hover:bg-[#2a201b] transition-all border border-[#F4C430]/10`}>
                                        <input 
                                            type="radio" name="payment_method" value={method} 
                                            checked={formData.payment_method === method} 
                                            onChange={handleChange} className="mr-6 accent-[#F4C430]" 
                                        />
                                        <div className="flex-grow">
                                            <span className="font-headline text-xl font-bold block text-[#e5e2d8] uppercase">{method === 'cod' ? 'Cash on Arrival' : method === 'bank' ? 'Traditional Banking' : method + ' Vault'}</span>
                                            <span className="text-sm text-[#c4b5a2]">{method === 'upi' ? 'PhonePe, Google Pay, Paytm' : 'Secure Transaction'}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="lg:col-span-5">
                        <div className="bg-[#1c1511] p-10 border border-[#F4C430]/20 shadow-2xl sticky top-24">
                            <h2 className="font-headline text-3xl font-bold text-[#F4C430] mb-10 border-b border-[#F4C430]/20 pb-4">The Selection</h2>
                            
                            <div className="space-y-8 mb-10">
                                {items.map(item => (
                                    <div key={item.id} className="flex justify-between items-start">
                                        <div className="flex space-x-4">
                                            <div className="w-16 h-16 bg-[#2a201b] overflow-hidden border border-[#F4C430]/10">
                                                <img className="w-full h-full object-cover" src={item.image || '/images/loose_tea_leaves.png'} alt={item.name} />
                                            </div>
                                            <div>
                                                <h3 className="font-headline text-xl font-bold text-[#e5e2d8]">{item.name}</h3>
                                                <div className="flex items-center space-x-3 mt-2">
                                                    <button type="button" onClick={() => updateQty(item.id, item.qty - 1)} className="w-5 h-5 rounded-full border border-[#F4C430]/30 text-[#F4C430] hover:bg-[#F4C430]/10 flex items-center justify-center transition-colors">
                                                        <span className="material-symbols-outlined text-[12px]">remove</span>
                                                    </button>
                                                    <span className="text-xs text-[#e5e2d8] font-bold w-3 text-center">{item.qty}</span>
                                                    <button type="button" onClick={() => updateQty(item.id, item.qty + 1)} className="w-5 h-5 rounded-full border border-[#F4C430]/30 text-[#F4C430] hover:bg-[#F4C430]/10 flex items-center justify-center transition-colors">
                                                        <span className="material-symbols-outlined text-[12px]">add</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            {discountRate > 0 && item.type !== 'membership' ? (
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[#dcd4c3]/30 line-through text-xs font-serif italic mb-1">₹{(item.price * item.qty).toLocaleString()}</span>
                                                    <span className="font-headline text-lg font-bold text-[#F4C430]">
                                                        ₹{(item.price * (1 - discountRate) * item.qty).toLocaleString()}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="font-headline text-lg font-bold text-[#F4C430]">₹{(item.price * item.qty).toLocaleString()}</span>
                                            )}
                                            
                                            <button 
                                                type="button" 
                                                onClick={() => removeItem(item.id)} 
                                                className="text-red-400 hover:text-red-300 text-[10px] mt-2 uppercase tracking-[0.2em] flex items-center gap-1 transition-colors group"
                                            >
                                                <span className="material-symbols-outlined text-[14px] !text-red-400 group-hover:scale-110 transition-transform">delete</span> Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-[#F4C430]/20 pt-8 space-y-4">
                                <div className="flex justify-between text-[#c4b5a2] uppercase tracking-widest text-xs font-bold">
                                    <span>Archival Value</span>
                                    <span className="font-mono">₹{rawTotal.toLocaleString()}</span>
                                </div>
                                
                                {savings > 0 && (
                                    <div className="flex justify-between text-[#F4C430] font-black items-center py-2 bg-[#F4C430]/5 px-4 border-l-2 border-[#F4C430] animate-pulse">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] tracking-widest uppercase mb-1">Elite Lineage Rebate</span>
                                            <span className="text-[9px] opacity-70 italic tracking-widest">LOYALTY STATUS: {activeMembership?.tier_name || 'PREMIUM'} ({Math.round(discountRate * 100)}%)</span>
                                        </div>
                                        <span className="text-xl font-headline">- ₹{savings.toLocaleString()}</span>
                                    </div>
                                )}

                                <div className="flex justify-between text-[#c4b5a2] mt-4 uppercase tracking-widest text-[11px] font-bold">
                                    <span>Logistics & Delivery</span>
                                    <span className={deliveryFee === 0 ? "text-[#F4C430] font-black tracking-[0.2em] text-[10px]" : "font-mono"}>{deliveryFee === 0 ? 'COMPLIMENTARY' : `₹${deliveryFee}`}</span>
                                </div>
                                
                                {unlockedMenuFreeDelivery && (
                                    <div className="free-delivery-badge mt-4 p-2.5 rounded-sm text-center text-[10px] font-black uppercase tracking-[0.3em] shadow-[0_0_15px_rgba(244,196,48,0.2)]">
                                        Archival Logistic Minimum Met
                                    </div>
                                )}

                                <div className="flex justify-between items-baseline pt-8 border-t border-[#F4C430]/30 mt-6 shadow-[0_10px_20px_rgba(244,196,48,0.05)]">
                                    <span className="font-headline text-3xl font-bold text-[#e5e2d8]">Total Investment</span>
                                    <span className="font-headline text-5xl font-bold text-[#F4C430] gold-glow">₹{(totalPrice + deliveryFee).toLocaleString()}</span>
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={status.loading || items.length === 0 || minOrderNotMet}
                                className="w-full mt-10 shimmer-btn text-[#120e0a] py-6 px-8 relative overflow-hidden font-headline text-2xl font-bold tracking-widest uppercase hover:shadow-[0_0_40px_rgba(244,196,48,0.4)] transition-all disabled:opacity-50"
                            >
                                {status.loading ? 'Recording...' : 'Place Your Order'}
                            </button>

                            {!isAuthenticated && !authLoading && (
                                <p className="text-[#F4C430] text-center text-[10px] mt-4 uppercase tracking-widest font-bold bg-[#F4C430]/5 p-2 border border-[#F4C430]/10">
                                    Registration Required to Finalize Curation
                                </p>
                            )}
                            
                            {minOrderNotMet && (
                                <p className="text-red-400 text-center text-sm mt-6 font-bold tracking-wider bg-red-400/10 p-3 border border-red-400/20">
                                    Minimum order of ₹600 is required for menu items.
                                </p>
                            )}
                            {status.error && <p className="text-red-400 text-center text-xs mt-4 italic">{status.error}</p>}
                        </div>
                    </aside>
                </form>
            </div>
            <SuccessModal 
                isOpen={successData.show} 
                orderNumber={successData.orderNumber} 
                waLink={successData.waLink} 
                potentialTokens={successData.potentialTokens}
                onClose={() => navigate('/rewards')}
            />
        </main>
    );
}

function SuccessModal({ isOpen, orderNumber, waLink, potentialTokens, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 bg-[#0d0a08]/95 backdrop-blur-xl animate-in fade-in duration-700">
            <div className="relative w-full max-w-2xl bg-[#1c1511] border-2 border-[#F4C430]/30 p-12 text-center shadow-[0_0_100px_rgba(244,196,48,0.2)] overflow-hidden">
                {/* Archival Decorative Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#F4C430]/20"></div>
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#F4C430]/20"></div>
                <div className="absolute top-2 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#F4C430]/30 to-transparent"></div>
                <div className="absolute bottom-2 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-[#F4C430]/30 to-transparent"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-10 relative">
                        <div className="absolute inset-0 bg-[#F4C430]/10 rounded-full animate-ping"></div>
                        <div className="relative w-full h-full rounded-full border-2 border-[#F4C430] flex items-center justify-center bg-[#1c1511]">
                            <span className="material-symbols-outlined text-5xl text-[#F4C430] animate-in zoom-in duration-1000">history_edu</span>
                        </div>
                    </div>

                    <h2 className="font-headline text-5xl text-white uppercase tracking-tighter mb-4 gold-glow">Etched in History</h2>
                    <p className="font-serif text-[#dcd4c3] text-xl italic opacity-80 mb-10">
                        "Your curation has been formally recorded in the Heritage Ledger."
                    </p>

                    <div className="bg-black/40 border border-[#F4C430]/10 p-8 mb-6">
                        <p className="font-label text-xs text-[#F4C430]/60 uppercase tracking-[0.4em] mb-2 font-black">Archive Entry No.</p>
                        <p className="font-mono text-3xl text-white font-bold tracking-widest">{orderNumber}</p>
                    </div>

                    {/* Potential Rewards Message */}
                    <div className="mb-10 p-4 border-l-4 border-[#F4C430] bg-[#F4C430]/5 text-left animate-in slide-in-from-left duration-1000 delay-300">
                        <p className="font-label text-[10px] uppercase tracking-[0.2em] text-[#F4C430] font-bold mb-1">Potential Rewards</p>
                        <p className="font-archive text-sm text-[#dcd4c3]">
                            You will earn <span className="text-white font-bold">💎 {potentialTokens} Heritage Tokens</span> upon the successful delivery of this curation.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <a 
                            href={waLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-4 w-full py-6 bg-[#F4C430] text-[#120e0a] font-label uppercase text-sm tracking-[0.5em] font-black hover:bg-white transition-all shadow-[0_15px_30px_rgba(244,196,48,0.3)] group"
                        >
                            <span className="material-symbols-outlined text-lg">description</span>
                            View Royal Receipt
                        </a>
                        <button 
                            onClick={onClose}
                            className="w-full py-5 border border-[#F4C430]/20 text-[#F4C430]/60 font-label uppercase text-xs tracking-[0.3em] hover:bg-white/5 transition-all"
                        >
                            Proceed to Rewards Portal
                        </button>
                    </div>

                    <div className="mt-12 flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-[#F4C430]/20"></div>
                        <span className="text-[10px] uppercase tracking-[1em] text-[#F4C430]/40 font-black">Success Synchronized</span>
                        <div className="h-[1px] w-12 bg-[#F4C430]/20"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
