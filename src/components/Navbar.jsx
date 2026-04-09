import React from 'react';

export default function Navbar() {
    return (
        <div dangerouslySetInnerHTML={{ __html: `<style>
    @keyframes navSlideDown {
        from { transform: translateY(-10%); opacity: 0; backdrop-filter: blur(0px); }
        to { transform: translateY(0); opacity: 1; backdrop-filter: blur(12px); }
    }
    .nav-animate-entry {
        animation: navSlideDown 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
</style>
<header class="bg-[#120e0a]/90 backdrop-blur-md font-['Noto Serif'] tracking-tighter antialiased docked full-width top-0 border-b border-[#F4C430]/10 shadow-lg shadow-black/80 sticky z-50 transition-all duration-500 nav-animate-entry">
<div class="flex justify-between items-center w-full px-8 py-5 max-w-screen-2xl mx-auto">
<div class="text-3xl font-bold text-[#F4C430] tracking-tight hover:text-[#fcf9ee] transition-all duration-500 hover:drop-shadow-[0_0_15px_rgba(244,196,48,0.6)] cursor-pointer">
    <a href="/">Heritage Brews</a>
</div>
<nav class="hidden md:flex items-center space-x-10">
<a class="relative group text-[#fcf9ee]/90 hover:text-[#F4C430] text-sm uppercase tracking-widest transition-colors duration-300 py-1" href="/">
    Our Heritage
    <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</a>
<a class="relative group text-[#fcf9ee]/90 hover:text-[#F4C430] text-sm uppercase tracking-widest transition-colors duration-300 py-1" href="/estates">
    Tea Garden
    <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</a>
<a class="relative group text-[#fcf9ee]/90 hover:text-[#F4C430] text-sm uppercase tracking-widest transition-colors duration-300 py-1" href="/menu">
    Coffee Roasts
    <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</a>
<a class="relative group text-[#fcf9ee]/90 hover:text-[#F4C430] text-sm uppercase tracking-widest transition-colors duration-300 py-1" href="/gifts">
    Curations
    <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</a>
<a class="relative group text-[#fcf9ee]/90 hover:text-[#F4C430] text-sm uppercase tracking-widest transition-colors duration-300 py-1" href="/sommelier">
    Subscription
    <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</a>
<a class="relative group text-[#fcf9ee]/90 hover:text-[#F4C430] text-sm uppercase tracking-widest transition-colors duration-300 py-1" href="/stories">
    Stories
    <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</a>
<a class="relative group text-[#fcf9ee]/90 hover:text-[#F4C430] text-sm uppercase tracking-widest transition-colors duration-300 py-1" href="/rewards">
    Rewards
    <span class="absolute left-0 bottom-0 w-full h-[1px] bg-[#F4C430] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
</a>
</nav>
<div class="flex items-center space-x-8">
<a href="/reservation" class="hidden md:inline-block px-6 py-2.5 border-2 border-[#F4C430] text-[#F4C430] hover:bg-[#F4C430] hover:text-[#120e0a] shadow-[0_0_15px_rgba(244,196,48,0.15)] hover:shadow-[0_0_30px_rgba(244,196,48,0.6)] hover:-translate-y-0.5 transition-all duration-300 font-bold tracking-[0.2em] uppercase text-xs">Reserve</a>
<a href="/checkout"  class="text-[#F4C430] hover:text-[#fcf9ee] transition-all duration-300 opacity-90 hover:opacity-100 drop-shadow-[0_0_15px_rgba(244,196,48,0.3)] hover:-translate-y-0.5">
<span class="material-symbols-outlined text-3xl" data-icon="shopping_basket">local_mall</span>
</a>
</div>
</div>
</header>` }} />
    );
}