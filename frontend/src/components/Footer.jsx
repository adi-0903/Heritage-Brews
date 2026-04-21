import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Footer() {
    const location = useLocation();

    if (location.pathname.startsWith('/invoice')) return null;

    return (
        <div dangerouslySetInnerHTML={{ __html: `<style>
        .footer-mughal {
            background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuDDQHoqEV3fxnGtdCXfnZuPcMPlb8KpdehTsXXmf-jpg4h-8bADGyoaZk3PfICkgZ5Cpob2GF-Ypb0pjkDdOiCXSW0kjSMvamsgbppF9waYdw5y-gYdm3tdI74GL7bcn2zEe-R_HYilP6I_As8yk1MDgoz0TwtP6_TpTbSrcVxHUHetAqTsyt5qsWzRJVoZy_it_H6rP_7K6ZiHFAIX5Zy0nM5nmonKXm1oGNxO5deF7GWMFipkn6Be_gfHX_m2PLTR_ItYV5mCtBM);
            background-size: cover;
            background-position: center bottom;
        }
    </style>
    <footer class="relative bg-[#1a1510] text-[#fcf9ee] w-full pt-32 pb-12 overflow-hidden border-t-4 border-[#890000]">
        <!-- Ornate Background Mask -->
        <div class="absolute inset-0 footer-mughal opacity-[0.03] pointer-events-none mix-blend-overlay"></div>
        <div class="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#890000]/10 to-transparent pointer-events-none"></div>

        <div class="max-w-screen-2xl mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 border-b border-[#7b5800]/30 pb-20">
                
                <!-- Brand Pillar -->
                <div class="md:col-span-4 flex flex-col space-y-6">
                    <h2 class="font-['Newsreader'] italic text-[#F4C430] text-5xl font-bold tracking-tight">Heritage Brews</h2>
                    <p class="font-['Noto_Serif'] text-[#fcf9ee]/70 text-base leading-relaxed max-w-sm italic">
                        Preserving the magnificent living history of Indian brew culture. Slowly decocted, expertly spiced, and served with a piece of our soul.
                    </p>
                    <div class="flex space-x-6 pt-4">
                        <a href="#" class="w-10 h-10 border border-[#7b5800] rounded-full flex items-center justify-center hover:bg-[#7b5800] transition-colors"><span class="material-symbols-outlined text-[20px] text-[#F4C430]">photo_camera</span></a>
                        <a href="#" class="w-10 h-10 border border-[#7b5800] rounded-full flex items-center justify-center hover:bg-[#7b5800] transition-colors"><span class="material-symbols-outlined text-[20px] text-[#F4C430]">mail</span></a>
                        <a href="#" class="w-10 h-10 border border-[#7b5800] rounded-full flex items-center justify-center hover:bg-[#7b5800] transition-colors"><span class="material-symbols-outlined text-[20px] text-[#F4C430]">location_on</span></a>
                    </div>
                </div>

                <!-- Fast Links -->
                <div class="md:col-span-2 flex flex-col space-y-6 font-['Noto_Serif']">
                    <h3 class="text-[#F4C430] font-bold uppercase tracking-[0.2em] text-xs">The Archives</h3>
                    <div class="flex flex-col space-y-4">
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/">Our Heritage</a>
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/estates">Tea Gardens</a>
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/menu">Coffee Roasts</a>
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/gifts">Curations & Gifts</a>
                    </div>
                </div>

                <div class="md:col-span-2 flex flex-col space-y-6 font-['Noto_Serif']">
                    <h3 class="text-[#F4C430] font-bold uppercase tracking-[0.2em] text-xs">Services</h3>
                    <div class="flex flex-col space-y-4">
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/reservation">Book a Table</a>
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/sommelier">Sommelier Curation</a>
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/rewards">Loyalty Program</a>
                        <a class="text-[#fcf9ee]/70 hover:text-[#F4C430] hover:translate-x-1 transition-all duration-300" href="/stories">Chai Stories</a>
                    </div>
                </div>

                <!-- Newsletter Pillar -->
                <div class="md:col-span-4 flex flex-col space-y-6 lg:pl-10">
                    <h3 class="text-[#F4C430] font-bold uppercase tracking-[0.2em] text-xs">Join the Chai Parivar</h3>
                    <p class="font-['Noto_Serif'] text-[#fcf9ee]/70 text-sm italic">
                        Receive monthly hand-written letters from our sommelier on rare tea flushes and exclusive haveli events.
                    </p>
                    <form class="flex mt-2">
                        <input type="email" placeholder="Your raven scroll (Email)" class="w-full bg-[#1a1510] border-b border-[#7b5800] text-[#fcf9ee] py-3 text-sm focus:outline-none focus:border-[#F4C430] transition-colors placeholder-[#fcf9ee]/30 font-['Noto_Serif']" />
                        <button type="button" class="border-b border-[#7b5800] text-[#F4C430] font-bold tracking-widest uppercase text-xs px-4 hover:bg-[#F4C430] hover:text-[#1a1510] transition-all">Enroll</button>
                    </form>
                </div>

            </div>

            <!-- Bottom Bar -->
            <div class="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 font-['Noto_Serif'] text-xs text-[#fcf9ee]/40 uppercase tracking-widest">
                <p>
                    © 1894 Heritage Revival Archives. All rights reserved.
                </p>
                <div class="flex space-x-8">
                    <a href="#" class="hover:text-[#F4C430] transition-colors">The Ledger (Terms)</a>
                    <a href="#" class="hover:text-[#F4C430] transition-colors">Privacy Scrolls</a>
                </div>
            </div>
        </div>
    </footer>` }} />
    );
}