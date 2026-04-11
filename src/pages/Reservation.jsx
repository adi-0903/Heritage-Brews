import React, { useState, useRef, useEffect } from 'react';
import api from '../api';
import { HiChevronLeft, HiChevronRight, HiCalendar, HiClock, HiArrowRight, HiArrowLeft, HiCheckCircle } from 'react-icons/hi';

export default function Reservation() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        patron_name: '',
        contact_number: '',
        scope: '',
        date: '',
        time: '',
        guests: '',
        occasion: '',
        notes: ''
    });

    const [status, setStatus] = useState({ loading: false, success: false, error: null, code: null });
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
    const [viewDate, setViewDate] = useState(new Date());
    const calendarRef = useRef(null);
    const timeRef = useRef(null);

    const [isScopeOpen, setIsScopeOpen] = useState(false);
    const [isOccasionOpen, setIsOccasionOpen] = useState(false);
    const scopeRef = useRef(null);
    const occasionRef = useRef(null);

    const steps = [
        { id: 'identity', title: 'The Patron', subtitle: 'Identity Archive' },
        { id: 'temporality', title: 'The Moment', subtitle: 'Temporal Ledger' },
        { id: 'sanctity', title: 'The Purpose', subtitle: 'Sanctuary Scope' },
        { id: 'review', title: 'The Induction', subtitle: 'Final Preview' }
    ];

    const scopeOptions = [
        { value: 'table', label: 'Standard Table Reservation' },
        { value: 'partial', label: 'Exclusive Sanctuary (Private)' },
        { value: 'full', label: 'The Grand Buyout (Full Day)' }
    ];

    const occasionOptions = [
        { value: 'casual', label: 'Casual / High Tea' },
        { value: 'birthday', label: 'Birthday Celebration' },
        { value: 'anniversary', label: 'Anniversary / Engagement' },
        { value: 'business', label: 'Corporate Meeting' },
        { value: 'wedding', label: 'Wedding / Ritual' },
        { value: 'other', label: 'Other Event' }
    ];

    const guestOptions = [
        { value: '1-2', label: '1–2 Connoisseurs' },
        { value: '3-5', label: '3–5 Patrons' },
        { value: '6-10', label: '6–10 Patrons' },
        { value: '10-25', label: '10–25 (Private Gathering)' },
        { value: '25+', 'label': '25+ (Grand Celebration)' }
    ];

    const [isGuestOpen, setIsGuestOpen] = useState(false);
    const guestRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) setIsCalendarOpen(false);
            if (timeRef.current && !timeRef.current.contains(event.target)) setIsTimePickerOpen(false);
            if (scopeRef.current && !scopeRef.current.contains(event.target)) setIsScopeOpen(false);
            if (occasionRef.current && !occasionRef.current.contains(event.target)) setIsOccasionOpen(false);
            if (guestRef.current && !guestRef.current.contains(event.target)) setIsGuestOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectOption = (name, value) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsScopeOpen(false);
        setIsOccasionOpen(false);
        setIsGuestOpen(false);
    };

    const handleDateSelect = (day) => {
        const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        setFormData(prev => ({ ...prev, date: selectedDate.toISOString().split('T')[0] }));
        setIsCalendarOpen(false);
    };

    const handleTimeSelect = (hour, minute) => {
        const formattedTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        setFormData(prev => ({ ...prev, time: formattedTime }));
        setIsTimePickerOpen(false);
    };

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null, code: null });
        try {
            const payload = {
                patron_name: formData.patron_name,
                phone: formData.contact_number,
                scope: formData.scope,
                date: formData.date,
                time_or_duration: formData.time,
                guests: formData.guests,
                occasion: formData.occasion,
                special_instructions: formData.notes
            };
            const res = await api.post('reservations/', payload);
            setStatus({ 
                loading: false, 
                success: true, 
                error: null, 
                // Fix: 'res' from api.post is already the JSON data
                code: res.confirmation_code || ('HB' + Math.floor(1000 + Math.random() * 9000)) 
            });
        } catch (err) {
            console.error('Reservation failed:', err.response?.data);
            const errMsg = err.response?.data ? JSON.stringify(err.response.data) : err.message;
            setStatus({ loading: false, success: false, error: errMsg, code: null });
        }
    };

    const renderCalendar = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];
        const today = new Date();
        today.setHours(0,0,0,0);
        for (let i = 0; i < firstDay; i++) days.push(<div key={`pad-${i}`} className="h-10 w-10"></div>);
        for (let d = 1; d <= daysInMonth; d++) {
            const cur = new Date(year, month, d);
            const isPast = cur < today;
            const isSel = formData.date === cur.toISOString().split('T')[0];
            days.push(
                <button key={d} type="button" disabled={isPast} onClick={() => handleDateSelect(d)}
                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all text-sm font-bold ${isPast ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#D4AF37]/20 hover:text-white'} ${isSel ? 'bg-[#D4AF37] text-black shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'text-white/80'}`}
                > {d} </button>
            );
        }
        return days;
    };

    const renderTimePicker = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        const minutes = [0, 15, 30, 45];
        return (
            <div className="flex gap-4 h-64">
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]/60 block mb-4 font-black">Hour</span>
                    <div className="space-y-1">
                        {hours.map(h => (
                            <button key={h} type="button" onClick={() => handleTimeSelect(h, formData.time.split(':')[1] || 0)}
                                className={`w-full py-2 rounded-lg text-sm font-bold transition-all ${formData.time.startsWith(h.toString().padStart(2, '0')) ? 'bg-[#D4AF37] text-black' : 'text-white/60 hover:bg-[#D4AF37]/10 hover:text-white'}`}
                            > {h.toString().padStart(2, '0')} </button>
                        ))}
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37]/60 block mb-4 font-black">Minute</span>
                    <div className="space-y-1">
                        {minutes.map(m => (
                            <button key={m} type="button" onClick={() => handleTimeSelect(formData.time.split(':')[0] || 12, m)}
                                className={`w-full py-2 rounded-lg text-sm font-bold transition-all ${formData.time.endsWith(m.toString().padStart(2, '0')) ? 'bg-[#D4AF37] text-black' : 'text-white/60 hover:bg-[#D4AF37]/10 hover:text-white'}`}
                            > {m.toString().padStart(2, '0')} </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const isStepValid = () => {
        if (currentStep === 0) return formData.patron_name && formData.contact_number;
        if (currentStep === 1) return formData.date && formData.time;
        if (currentStep === 2) return formData.guests && formData.scope && formData.occasion;
        return true;
    };

    return (
        <main className="min-h-screen relative flex flex-col items-center justify-start pt-32 pb-24 px-4 overflow-x-hidden bg-[#0d0b08] font-serif">
            <style>{`
                .journey-card { background: rgba(252, 249, 238, 0.05); backdrop-filter: blur(40px); border: 1px solid rgba(212, 175, 55, 0.1); box-shadow: 0 20px 80px rgba(0,0,0,0.9); }
                .calendar-glass { background: rgba(13, 11, 8, 0.98); backdrop-filter: blur(20px); border: 1px solid rgba(212, 175, 55, 0.2); }
                .glow-text { text-shadow: 0 0 20px rgba(212, 175, 55, 0.5); }
                .aura-effect { background: radial-gradient(circle at center, rgba(212, 175, 55, 0.05) 0%, transparent 70%); pointer-events: none; }
                .step-transition { animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                @keyframes slideIn { from { opacity: 0; transform: translateY(30px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(212, 175, 55, 0.3); border-radius: 10px; }
            `}</style>
            
            <div className="fixed inset-0 z-0 bg-[#0d0b08]">
                <img className="w-full h-full object-cover opacity-40 mix-blend-luminosity scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQoOk4eNkolhD-sQuFLnnHU_9nHq3p1QzAriGa4p0Ld_HQaKh827AGncNSTBjnDHk9F_rdYaj7tD7OOw9yZVYh-rDmaud6SdvhZc2rMsfKyN7j-l3ep79cgftM0Hv_sKShguEIr_EcmDem8GJK9DAXUiZ_1l2HvKrh2nRtolNB-gLf7rrYKXR_kE71-JD1KVv0OA93LarxK87olYzDmv45yY3ldVjdOTo6mRwIFfp9ZPrOPEe_N-vqQa4zUzL1NQKtTSigjMXheo" alt="Haveli" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black"></div>
                <div className="absolute inset-0 aura-effect animate-pulse"></div>
            </div>

            {/* Progress Timeline */}
            {!status.success && (
                <div className="relative z-10 w-full max-w-2xl mb-16 px-4">
                    <div className="flex justify-between items-center mb-4">
                        {steps.map((s, idx) => (
                            <div key={s.id} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-700 font-bold text-xs
                                    ${idx <= currentStep ? 'border-[#D4AF37] bg-[#D4AF37] text-black shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'border-white/10 text-white/20'}
                                `}> {idx < currentStep ? <HiCheckCircle className="text-xl" /> : idx + 1} </div>
                                <span className={`text-[10px] mt-2 uppercase tracking-widest font-black transition-all duration-700 ${idx <= currentStep ? 'text-[#D4AF37] glow-text' : 'text-white/10'}`}> {s.title} </span>
                            </div>
                        ))}
                    </div>
                    <div className="h-[2px] w-full bg-white/5 relative">
                        <div className="absolute h-full bg-[#D4AF37] transition-all duration-1000 shadow-[0_0_15px_#D4AF37]" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
                    </div>
                </div>
            )}

            {status.success ? (
                <div className="relative z-20 text-center py-20 animate-fade-in max-w-lg">
                    <div className="w-32 h-32 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                        <HiCheckCircle className="text-7xl text-[#D4AF37]" />
                    </div>
                    <h2 className="text-5xl font-headline font-black text-white mb-6 tracking-tight">The Ledger is Etched</h2>
                    <p className="text-white/60 italic text-xl mb-12">Your presence is now a part of our archival record. We await your journey to our sanctuary.</p>
                    <div className="bg-white/5 border border-[#D4AF37]/20 p-8 rounded-2xl backdrop-blur-xl">
                        <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 block mb-4 font-black">Confirmation Code</span>
                        <span className="text-5xl font-headline font-black text-[#D4AF37] tracking-[0.5em]">{status.code}</span>
                    </div>
                    <button onClick={() => { setStatus({ ...status, success: false }); setCurrentStep(0); }} className="mt-16 text-[#D4AF37] border-b border-[#D4AF37]/30 pb-2 font-bold uppercase tracking-widest hover:text-white transition-all text-sm"> New Archival Entry </button>
                </div>
            ) : (
                <div className="relative z-20 w-full max-w-4xl">
                    <div className="journey-card p-12 md:p-20 rounded-3xl step-transition relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 text-[120px] font-black italic text-white/[0.02] pointer-events-none select-none"> {steps[currentStep].id.toUpperCase()} </div>
                        
                        <div className="mb-12">
                            <span className="text-[#D4AF37] font-bold text-sm tracking-[0.4em] uppercase mb-2 block glow-text"> {steps[currentStep].subtitle} </span>
                            <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight"> {steps[currentStep].title} </h3>
                            <div className="w-12 h-[2px] bg-[#D4AF37]/40 mt-6"></div>
                        </div>

                        <div className="min-h-[300px]">
                            {/* Step 0: Identity */}
                            {currentStep === 0 && (
                                <div className="space-y-12 animate-fade-in">
                                    <div className="space-y-4">
                                        <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">Patron Identification</label>
                                        <input name="patron_name" value={formData.patron_name} onChange={handleChange} className="w-full bg-transparent border-b border-[#D4AF37]/20 py-6 text-3xl font-body text-white focus:border-[#D4AF37] transition-all placeholder-white/10" placeholder="Full Name of the Patron..." required />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">Numerical Contact</label>
                                        <input name="contact_number" value={formData.contact_number} onChange={handleChange} className="w-full bg-transparent border-b border-[#D4AF37]/20 py-6 text-3xl font-body text-white focus:border-[#D4AF37] transition-all placeholder-white/10" placeholder="+91 00000 00000" type="tel" required />
                                    </div>
                                </div>
                            )}

                            {/* Step 1: Temporality */}
                            {currentStep === 1 && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 animate-fade-in relative z-50">
                                    <div className="space-y-6">
                                        <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">Temporal Date</label>
                                        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 py-6 cursor-pointer hover:border-[#D4AF37]/60 transition-all" onClick={() => { setIsCalendarOpen(!isCalendarOpen); setIsTimePickerOpen(false); }}>
                                            <span className={`text-2xl font-body ${formData.date ? 'text-white' : 'text-white/20'}`}> {formData.date ? new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }) : 'Choose Date'} </span>
                                            <HiCalendar className="text-[#D4AF37] text-3xl" />
                                        </div>
                                        {isCalendarOpen && (
                                            <div ref={calendarRef} className="absolute top-full left-0 mt-4 w-80 calendar-glass p-8 rounded-3xl shadow-2xl z-[100] border-2 border-[#D4AF37]/30">
                                                <div className="flex items-center justify-between mb-8">
                                                    <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-[#D4AF37]/20 rounded-full text-[#D4AF37]"> <HiChevronLeft /> </button>
                                                    <span className="text-white font-black text-xs uppercase tracking-widest"> {viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} </span>
                                                    <button onClick={() => changeMonth(1)} className="p-2 hover:bg-[#D4AF37]/20 rounded-full text-[#D4AF37]"> <HiChevronRight /> </button>
                                                </div>
                                                <div className="grid grid-cols-7 gap-1 text-center">
                                                    {['S','M','T','W','T','F','S'].map(d => <div key={d} className="text-[10px] font-black text-[#D4AF37]/40 p-2">{d}</div>)}
                                                    {renderCalendar()}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-6">
                                        <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">Sanctuary Hour</label>
                                        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 py-6 cursor-pointer hover:border-[#D4AF37]/60 transition-all" onClick={() => { setIsTimePickerOpen(!isTimePickerOpen); setIsCalendarOpen(false); }}>
                                            <span className={`text-2xl font-body ${formData.time ? 'text-white' : 'text-white/20'}`}> {formData.time || 'Choose Hour'} </span>
                                            <HiClock className="text-[#D4AF37] text-3xl" />
                                        </div>
                                        {isTimePickerOpen && (
                                            <div ref={timeRef} className="absolute top-full right-0 md:left-auto mt-4 w-72 calendar-glass p-8 rounded-3xl shadow-2xl z-[100] border-2 border-[#D4AF37]/30"> {renderTimePicker()} </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Step 2: Sanctity */}
                            {currentStep === 2 && (
                                <div className="space-y-10 animate-fade-in relative z-40">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div className="space-y-4 relative" ref={guestRef}>
                                            <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">Connoisseur Count</label>
                                            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 py-6 cursor-pointer" onClick={() => setIsGuestOpen(!isGuestOpen)}>
                                                <span className={`text-2xl font-body ${formData.guests ? 'text-white' : 'text-white/20'}`}> {formData.guests ? guestOptions.find(o => o.value === formData.guests)?.label : 'Select Party Size'} </span>
                                                <HiChevronRight className={`text-[#D4AF37] text-2xl transition-all ${isGuestOpen ? 'rotate-90' : ''}`} />
                                            </div>
                                            {isGuestOpen && (
                                                <div className="absolute top-full left-0 right-0 mt-4 calendar-glass p-4 rounded-2xl z-[100] shadow-2xl">
                                                    {guestOptions.map(opt => <div key={opt.value} className="p-6 text-white/70 hover:bg-[#D4AF37]/10 hover:text-white rounded-xl transition-all font-body text-xl cursor-pointer" onClick={() => handleSelectOption('guests', opt.value)}> {opt.label} </div>)}
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-4 relative" ref={scopeRef}>
                                            <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">Reservation Scope</label>
                                            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 py-6 cursor-pointer" onClick={() => setIsScopeOpen(!isScopeOpen)}>
                                                <span className={`text-2xl font-body ${formData.scope ? 'text-white' : 'text-white/20'}`}> {formData.scope ? scopeOptions.find(o => o.value === formData.scope)?.label : 'Select Scope'} </span>
                                                <HiChevronRight className={`text-[#D4AF37] text-2xl transition-all ${isScopeOpen ? 'rotate-90' : ''}`} />
                                            </div>
                                            {isScopeOpen && (
                                                <div className="absolute top-full left-0 right-0 mt-4 calendar-glass p-4 rounded-2xl z-[100] shadow-2xl">
                                                    {scopeOptions.map(opt => <div key={opt.value} className="p-6 text-white/70 hover:bg-[#D4AF37]/10 hover:text-white rounded-xl transition-all font-body text-xl cursor-pointer" onClick={() => handleSelectOption('scope', opt.value)}> {opt.label} </div>)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="space-y-4 relative" ref={occasionRef}>
                                        <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">The Occasion</label>
                                        <div className="flex items-center justify-between border-b border-[#D4AF37]/20 py-6 cursor-pointer" onClick={() => setIsOccasionOpen(!isOccasionOpen)}>
                                            <span className={`text-2xl font-body ${formData.occasion ? 'text-white' : 'text-white/20'}`}> {formData.occasion ? occasionOptions.find(o => o.value === formData.occasion)?.label : 'Define Occasion'} </span>
                                            <HiChevronRight className={`text-[#D4AF37] text-2xl transition-all ${isOccasionOpen ? 'rotate-90' : ''}`} />
                                        </div>
                                        {isOccasionOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-4 calendar-glass p-4 rounded-2xl z-[100] shadow-2xl">
                                                {occasionOptions.map(opt => <div key={opt.value} className="p-6 text-white/70 hover:bg-[#D4AF37]/10 hover:text-white rounded-xl transition-all font-body text-xl cursor-pointer" onClick={() => handleSelectOption('occasion', opt.value)}> {opt.label} </div>)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs uppercase tracking-[0.3em] text-[#D4AF37]/60 font-black block">Archival Notes</label>
                                        <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full bg-transparent border-b border-[#D4AF37]/20 py-4 text-xl font-body text-white focus:border-[#D4AF37] transition-all placeholder-white/10 resize-none" placeholder="Special requirements..." rows="2" />
                                    </div>
                                </div>
                            )}

                            {/* Step 3: Review (The Ledger Preview) */}
                            {currentStep === 3 && (
                                <div className="space-y-12 animate-fade-in relative">
                                    <div className="flex flex-col md:flex-row gap-16">
                                        {/* Left Side: The Patron Identity */}
                                        <div className="flex-1 space-y-10 border-l border-[#D4AF37]/20 pl-8 relative">
                                            <div className="absolute top-0 -left-[1px] w-[1px] h-full bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/20 to-transparent"></div>
                                            <div className="space-y-2">
                                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-black">Authorized Patron</span>
                                                <h4 className="text-4xl font-headline font-black text-white glow-text">{formData.patron_name || 'N/A'}</h4>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-black">Secure Line</span>
                                                <p className="text-2xl font-body text-white/80">{formData.contact_number || 'N/A'}</p>
                                            </div>
                                        </div>

                                        {/* Right Side: The Appointment Ledger */}
                                        <div className="flex-1 space-y-10 border-l border-[#D4AF37]/20 pl-8 relative">
                                            <div className="absolute top-0 -left-[1px] w-[1px] h-full bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/20 to-transparent"></div>
                                            <div className="space-y-2">
                                                <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-black">Chronological Slot</span>
                                                <h4 className="text-2xl font-body font-bold text-white uppercase tracking-widest">
                                                    {formData.date ? new Date(formData.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}
                                                    <span className="text-[#D4AF37] mx-3">@</span>
                                                    {formData.time || 'N/A'}
                                                </h4>
                                            </div>
                                                <p className="text-2xl font-body text-white/80">
                                                    {formData.guests ? guestOptions.find(o => o.value === formData.guests)?.label : 'N/A'} 
                                                    <span className="text-[#D4AF37]/40 mx-2">—</span>
                                                    {formData.scope ? scopeOptions.find(o => o.value === formData.scope)?.label : 'Standard'}
                                                </p>
                                        </div>
                                    </div>

                                    {/* Footer: The Mandate & Seal */}
                                    <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-end justify-between gap-12">
                                        <div className="flex-1 space-y-4">
                                            <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37]/60 font-black block">Purpose of the Visit</span>
                                            <div className="p-8 bg-white/[0.03] border border-white/5 rounded-2xl italic text-white/50 text-xl leading-relaxed relative overflow-hidden group">
                                                <div className="absolute top-0 left-0 w-1 h-full bg-[#D4AF37]/20 group-hover:bg-[#D4AF37] transition-all duration-700"></div>
                                                "{formData.notes || 'No further instructions provided, for the Sanctum to observe as standard archival visit.'}"
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center opacity-40 shrink-0">
                                            <div className="w-24 h-24 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-4 relative p-1 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                                                <div className="absolute inset-0 border border-[#D4AF37]/10 rounded-full animate-spin-slow"></div>
                                                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center">
                                                    <span className="text-[8px] font-black uppercase tracking-[0.1em] text-[#D4AF37] text-center leading-tight">HERITAGE<br/>ARCHIVE</span>
                                                </div>
                                            </div>
                                            <span className="text-[8px] uppercase tracking-[0.5em] text-[#D4AF37]/80 font-black">Digital Wax Seal</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Journey Navigation */}
                        <div className="flex items-center justify-between mt-16 pt-12 border-t border-white/5">
                            <button onClick={prevStep} disabled={currentStep === 0} className={`flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] transition-all hover:text-[#D4AF37] disabled:opacity-0 ${currentStep === 0 ? 'pointer-events-none' : ''}`}> <HiArrowLeft className="text-xl" /> Regress </button>
                            
                            {currentStep === steps.length - 1 ? (
                                <button onClick={handleSubmit} disabled={status.loading} className="px-16 py-6 bg-[#D4AF37] text-black font-black text-xs uppercase tracking-[0.4em] shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:bg-white transition-all transform hover:-translate-y-1"> {status.loading ? 'Recording Entry...' : 'Etch Final Ledger'} </button>
                            ) : (
                                <button onClick={nextStep} disabled={!isStepValid()} className={`flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] transition-all ${isStepValid() ? 'text-[#D4AF37] hover:scale-105' : 'text-white/10 pointer-events-none'}`}> Next Phase <HiArrowRight className="text-xl" /> </button>
                            )}
                        </div>
                    </div>

                    <div className="mt-12 text-center opacity-30 flex items-center justify-center gap-4">
                        <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                        <span className="text-[10px] uppercase tracking-[0.5em] font-black text-[#D4AF37]">Secure Archival Portal 🏛️ Heritage Brews</span>
                        <div className="h-[1px] w-12 bg-[#D4AF37]"></div>
                    </div>
                </div>
            )}
        </main>
    );
}
