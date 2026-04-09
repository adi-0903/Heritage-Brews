import React from 'react';

export default function Reservation() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: `<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
            color: #7b5800;
        }
        .mughal-pattern {
            background-color: #fcf9ee;
            background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuDDQHoqEV3fxnGtdCXfnZuPcMPlb8KpdehTsXXmf-jpg4h-8bADGyoaZk3PfICkgZ5Cpob2GF-Ypb0pjkDdOiCXSW0kjSMvamsgbppF9waYdw5y-gYdm3tdI74GL7bcn2zEe-R_HYilP6I_As8yk1MDgoz0TwtP6_TpTbSrcVxHUHetAqTsyt5qsWzRJVoZy_it_H6rP_7K6ZiHFAIX5Zy0nM5nmonKXm1oGNxO5deF7GWMFipkn6Be_gfHX_m2PLTR_ItYV5mCtBM);
            opacity: 0.05;
        }
        .heritage-glass {
            background: rgba(252, 249, 238, 0.90);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(123, 88, 0, 0.1);
        }
        input:focus, select:focus, textarea:focus {
            outline: none !important;
            border-bottom-color: #7b5800 !important;
            box-shadow: none !important;
        }
    </style>
<main class="min-h-screen relative flex items-center justify-center py-24 px-4 overflow-hidden bg-[#1a1510]">
    <div class="absolute inset-0 z-0">
        <img class="w-full h-full object-cover grayscale-[0.3] sepia-[0.4] opacity-50" data-alt="grand royal dining hall in an old indian haveli with arches and lit candles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQoOk4eNkolhD-sQuFLnnHU_9nHq3p1QzAriGa4p0Ld_HQaKh827AGncNSTBjnDHk9F_rdYaj7tD7OOw9yZVYh-rDmaud6SdvhZc2rMsfKyN7j-l3ep79cgftM0Hv_sKShguEIr_EcmDem8GJK9DAXUiZ_1l2HvKrh2nRtolNB-gLf7rrYKXR_kE71-JD1KVv0OA93LarxK87olYzDmv45yY3ldVjdOTo6mRwIFfp9ZPrOPEe_N-vqQa4zUzL1NQKtTSigjMXheo" />
    </div>

    <div class="relative z-10 w-full max-w-4xl heritage-glass p-10 md:p-16 shadow-2xl">
        <div class="absolute inset-0 mughal-pattern pointer-events-none"></div>

        <div class="text-center mb-12 relative z-10">
            <span class="text-[#7b5800] font-headline text-lg tracking-[0.2em] uppercase mb-4 block font-semibold hover:tracking-[0.3em] transition-all duration-700">The Sanctum</span>
            <h1 class="font-headline text-5xl md:text-6xl font-bold text-[#890000] tracking-tight mb-4">Book Your Table</h1>
            <p class="text-[#58413f] italic max-w-xl mx-auto font-body text-lg">
                Reserve your place at the Haveli. Join us for an unforgettable experience immersing yourself in the living archives of Indian Brews.
            </p>
            <div class="w-16 h-[2px] bg-[#7b5800]/40 mx-auto mt-8"></div>
        </div>

        <form class="space-y-10 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                <!-- Patron Name -->
                <div class="space-y-2">
                    <label class="font-headline text-xl text-[#58413f] block">Patron Name *</label>
                    <input class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all placeholder-[#58413f]/40" placeholder="Shrimati/Shri..." type="text" required />
                </div>

                <!-- Contact Number -->
                <div class="space-y-2">
                    <label class="font-headline text-xl text-[#58413f] block">Contact Number *</label>
                    <input class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all placeholder-[#58413f]/40" placeholder="+91 00000 00000" type="tel" required />
                </div>

                <!-- Booking Scope -->
                <div class="space-y-2 md:col-span-2">
                    <label class="font-headline text-xl text-[#58413f] block">Reservation Scope *</label>
                    <select class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all appearance-none cursor-pointer" required>
                        <option value="" disabled selected>Select scope of reservation</option>
                        <option value="table">Standard Table Reservation</option>
                        <option value="partial">Exclusive Sanctuary (Hourly Private Booking)</option>
                        <option value="full">The Grand Buyout (Full Day Haveli Reservation)</option>
                    </select>
                </div>

                <!-- Date -->
                <div class="space-y-2">
                    <label class="font-headline text-xl text-[#58413f] block">Date of Arrival *</label>
                    <input class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all" type="date" required />
                </div>

                <!-- Time / Duration -->
                <div class="space-y-2">
                    <label class="font-headline text-xl text-[#58413f] block">Arrival Time / Duration *</label>
                    <input class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all placeholder-[#58413f]/40" placeholder="e.g. 19:00 or 'Entire Afternoon'" type="text" required />
                </div>

                <!-- Guests -->
                <div class="space-y-2">
                    <label class="font-headline text-xl text-[#58413f] block">Number of Guests *</label>
                    <select class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all appearance-none cursor-pointer" required>
                        <option value="" disabled selected>Select party size</option>
                        <option value="1-2">1 - 2 Connoisseurs</option>
                        <option value="3-5">3 - 5 Patrons</option>
                        <option value="6-10">6 - 10 Patrons</option>
                        <option value="10-25">10 - 25 (Private Gathering)</option>
                        <option value="25+">25+ (Grand Celebration)</option>
                    </select>
                </div>
                
                <!-- Occasion -->
                <div class="space-y-2">
                    <label class="font-headline text-xl text-[#58413f] block">Special Occasion *</label>
                    <select class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all appearance-none cursor-pointer" required>
                        <option value="" disabled selected>Select occasion</option>
                        <option value="casual">Casual Visit / High Tea</option>
                        <option value="birthday">Birthday Celebration</option>
                        <option value="anniversary">Anniversary / Engagement</option>
                        <option value="business">Corporate Meeting / Offsite</option>
                        <option value="wedding">Pre-Wedding / Shagun Ceremony</option>
                        <option value="other">Other Cultural Gathering</option>
                    </select>
                </div>

                <!-- Special Requests -->
                <div class="md:col-span-2 space-y-2">
                    <label class="font-headline text-xl text-[#58413f] block">Additional Instructions</label>
                    <textarea class="w-full bg-transparent border-b border-[#8c716e] py-3 font-body text-lg text-[#1c1c15] focus:border-[#7b5800] transition-all resize-none placeholder-[#58413f]/40" placeholder="e.g. Dietary restrictions, request for specific seating or specific decor arrangements..." rows="3"></textarea>
                </div>
            </div>

            <!-- Main CTA -->
            <button type="submit" class="w-full mt-10 bg-[#890000] text-[#fcf9ee] py-6 px-8 relative overflow-hidden group hover:bg-[#6b0000] transition-colors duration-500 shadow-xl">
                <span class="relative z-10 font-headline text-2xl font-bold tracking-widest uppercase">Confirm Reservation</span>
                <!-- Decorative Ornate Corners -->
                <div class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#fcf9ee] opacity-30"></div>
                <div class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#fcf9ee] opacity-30"></div>
                <div class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#fcf9ee] opacity-30"></div>
                <div class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#fcf9ee] opacity-30"></div>
            </button>
            
            <p class="text-center text-[#58413f] text-sm mt-6 font-body italic">
                For gatherings larger than 6, please contact the Haveli directly at +91 (141) 4892-000.
            </p>
        </form>
    </div>
</main>` }} />
    );
}
