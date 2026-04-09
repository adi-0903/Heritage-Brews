import React from 'react';

export default function Estates() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: `<style>
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        
        /* Dark Indian Royal Heritage Palette */
        body { background-color: #120e0a; color: #e5e2d8; font-family: 'Noto Serif', serif; }
        
        .bg-background { background-color: #120e0a !important; }
        .bg-surface { background-color: #120e0a !important; }
        .bg-surface-container-low { background-color: #1c1511 !important; }
        .bg-surface-container { background-color: #2a201b !important; }
        
        .text-on-background { color: #F4C430 !important; }
        .text-on-surface { color: #e5e2d8 !important; }
        .text-on-surface-variant { color: #c4b5a2 !important; }
        
        .bg-primary { background-color: #890000 !important; }
        .text-primary { color: #F4C430 !important; }
        .border-primary { border-color: #F4C430 !important; }
        .bg-secondary { background-color: #F4C430 !important; }
        .text-secondary { color: #F4C430 !important; }
        .border-outline\\/10 { border-color: rgba(244, 196, 48, 0.1) !important; }
        .border-outline\\/20 { border-color: rgba(244, 196, 48, 0.2) !important; }
        
        .indian-pattern-bg {
            background-image: url('/images/indian_pattern.png');
            background-size: 300px 300px;
            opacity: 0.03;
            mix-blend-mode: color-dodge;
        }

        .gold-glow { text-shadow: 0 0 30px rgba(244,196,48,0.4); }
        
        @keyframes scrollMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(calc(-50% - 2rem)); }
        }
        .animate-marquee {
            animation: scrollMarquee 35s linear infinite;
        }
        .animate-marquee:hover {
            animation-play-state: paused;
        }
    </style><main class="bg-[#120e0a] relative">
    
<!-- Full Page Texture -->
<div class="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

<!-- Hero Section -->
<section class="relative min-h-[920px] overflow-hidden flex items-center justify-center z-10 border-b border-[#F4C430]/20">
<div class="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-105" data-alt="panoramic cinematic view of misty rolling green tea estates at dawn with majestic traditional heritage mansion" style="background-image: url('/images/majestic_tea_estates.png');">
<div class="absolute inset-0 bg-black/40 bg-gradient-to-t from-[#120e0a] via-transparent to-black/30"></div>
</div>

<div class="relative z-10 text-center px-8 py-16 max-w-5xl backdrop-blur-md bg-[#120e0a]/40 border border-[#F4C430]/30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] rounded-3xl mt-24">
<span class="font-headline tracking-widest uppercase text-[#F4C430] text-xl md:text-2xl mb-6 block border-b border-[#F4C430]/30 pb-4 inline-block px-12">Since 1892</span>
<h1 class="font-headline text-5xl md:text-7xl lg:text-8xl text-white leading-tight mb-12 drop-shadow-2xl font-bold tracking-tighter gold-glow">
    From the Estates of India — <br/><span class="italic font-medium text-[#F4C430]">Our Journey, Your Cup.</span>
</h1>
<div class="flex flex-col md:flex-row justify-center items-center gap-16 text-[#e5e2d8]">
<div class="text-center group">
<p class="font-headline text-5xl font-bold text-[#F4C430] group-hover:scale-110 transition-transform">5</p>
<p class="font-label uppercase text-sm tracking-widest mt-2 opacity-80">Crown Estates</p>
</div>
<div class="w-px h-16 bg-[#F4C430]/30 hidden md:block"></div>
<div class="text-center group">
<p class="font-headline text-5xl font-bold text-[#F4C430] group-hover:scale-110 transition-transform">130</p>
<p class="font-label uppercase text-sm tracking-widest mt-2 opacity-80">Years of Craft</p>
</div>
<div class="w-px h-16 bg-[#F4C430]/30 hidden md:block"></div>
<div class="text-center group">
<p class="font-headline text-5xl font-bold text-[#F4C430] group-hover:scale-110 transition-transform">100%</p>
<p class="font-label uppercase text-sm tracking-widest mt-2 opacity-80">Single Origin</p>
</div>
</div>
</div>
</section>
<!-- Interactive Map Section (Old World Aesthetic) -->
<section class="py-24 bg-surface-container-low parchment-texture border-y border-outline/10">
<div class="max-w-screen-xl mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
<div class="order-2 lg:order-1 relative">
<div class="aspect-square bg-surface-container shadow-2xl relative overflow-hidden p-8">
<img class="w-full h-full object-cover grayscale sepia opacity-80" data-alt="vintage aged parchment map of India with hand-drawn geographical features and ornate maritime illustrations in earth tones" data-location="India" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy8FebPHxHXQQXF15PSDXfbDZSZg9UN9Yyvc612uLA6GFxsZ6n20nmgQ9AM1nfA4DfC9AYFfef86ZMqAUkDvE_93hiDJNH0e3s64FC2sVE3lDjdzGdMuR0bx5gbUPCYrA9Mfkaq3jkYD2IA_Nly1np3mP141uTQyutx1MAVMW0Ka05Aps-TSUA9mQjB0i8BBYcRLq7A9bt3ilEVeKiazwiAl_saIRX1eid7o0uNMab7gLxVmDJ0ILGa8DAwyAI7W44AtHB44ajgYE"/>
<!-- Markers -->
<div class="absolute top-1/4 right-[25%] group cursor-pointer">
<span class="material-symbols-outlined text-primary text-3xl drop-shadow-md">location_on</span>
<div class="absolute bottom-full left-1/2 -translate-x-1/2 bg-surface p-2 shadow-lg mb-2 opacity-0 group-hover:opacity-100 transition-opacity border border-outline/20">
<p class="font-headline text-sm font-bold whitespace-nowrap">Darjeeling</p>
</div>
</div>
<div class="absolute top-[30%] right-[10%] group cursor-pointer">
<span class="material-symbols-outlined text-primary text-3xl drop-shadow-md">location_on</span>
</div>
<div class="absolute bottom-[15%] left-[30%] group cursor-pointer">
<span class="material-symbols-outlined text-primary text-3xl drop-shadow-md">location_on</span>
</div>
</div>
<!-- Decorative Frame -->
<div class="absolute -inset-4 border-2 border-secondary/20 -z-10"></div>
</div>
<div class="order-1 lg:order-2 space-y-12">
<div class="space-y-4">
<h2 class="font-headline text-4xl md:text-5xl text-primary font-bold">The Terroir of the Ancients</h2>
<p class="text-on-surface-variant leading-relaxed text-lg italic">Each leaf tells the story of the soil it sprang from. From the snowy foothills of the Himalayas to the tropical rains of the Nilgiris.</p>
</div>
<div class="space-y-8 h-auto">
<div class="p-6 bg-surface-container border-l-4 border-primary shadow-lg border border-primary/20">
<h3 class="font-headline text-2xl text-secondary font-bold mb-2">Darjeeling: The Champagne of Teas</h3>
<p class="text-on-surface-variant text-sm leading-relaxed">High in the clouds, the tea plants breathe the thin mountain air. The result is a Muscatel flavor profile—floral, delicate, and deeply sophisticated.</p>
</div>
<div class="p-6 bg-surface-container-low hover:bg-surface-container transition-colors">
<h3 class="font-headline text-2xl text-secondary font-bold mb-2">Assam: The Malty Giant</h3>
<p class="text-on-surface-variant text-sm leading-relaxed">Basking in the Brahmaputra valley's humidity, our Assam bushes yield a robust, full-bodied brew with a rich malty sweetness and deep amber hue.</p>
</div>
<div class="p-6 bg-surface-container-low hover:bg-surface-container transition-colors">
<h3 class="font-headline text-2xl text-secondary font-bold mb-2">Nilgiri: The Blue Mountain Fragrance</h3>
<p class="text-on-surface-variant text-sm leading-relaxed">Grown at 8,000 feet, Nilgiri tea is exceptionally aromatic, offering a crisp, bright liquor with notes of winter frost and lemon.</p>
</div>
</div>
</div>
</div>
</section>
<!-- Meet Our Farmers -->
<section class="py-32 bg-surface">
<div class="max-w-screen-xl mx-auto px-6 lg:px-12">
<div class="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
<div class="max-w-2xl">
<h2 class="font-headline text-4xl md:text-6xl text-on-surface font-bold leading-tight">The Hands Behind <br/><span class="italic font-medium text-primary">The Harvest</span></h2>
</div>
<p class="text-on-surface-variant max-w-sm font-body italic">"We do not grow tea; we nurture the memory of our fathers." — Anirudh, 4th Generation Grower.</p>
</div>
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
<!-- Farmer 1 -->
<div class="group">
<div class="relative overflow-hidden aspect-[4/5] mb-6">
<img class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="portrait of an elderly Indian tea farmer with deep-lined face and warm smile standing in a tea field at sunset" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWEGSLg1jriF7YKcHr1yUHAdiWBHe2KFF-YN-JKROzFhB5lJqh35_b_fHGj0JHzTlf3etT0AJoWLIZmuoRo8w7o01eBwjRjZWhjhhgHsv696WTY99PV8W1BxBklZsExXK-fU3W6LPcQhQFDLo0XZDup6tdXzxeIno9ugSnw7Awkp93kwN49c5N7AAIv5CbTkWLECIl4-0dAlaHBIXNS9eRSOU-xvwB9R4M12sPTeE9nqDsXmhAZXe7sVh2GutQ22WHCg6IalOjr7k"/>
<div class="absolute inset-0 border-[16px] border-surface pointer-events-none"></div>
<div class="absolute inset-0 border border-outline/20 pointer-events-none"></div>
</div>
<h3 class="font-headline text-2xl font-bold text-on-surface mb-1">Anirudh</h3>
<p class="font-label text-secondary uppercase tracking-widest text-xs mb-4">Makaibari Estate, Darjeeling</p>
<p class="text-on-surface-variant text-sm leading-relaxed italic">Guardian of the same 40 acres his great-grandfather cleared in 1888. He believes the moon dictates the pluck.</p>
</div>
<!-- Farmer 2 -->
<div class="group mt-8 md:mt-0">
<div class="relative overflow-hidden aspect-[4/5] mb-6">
<img class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="candid shot of a woman in traditional Indian attire skillfully plucking tea leaves in the morning mist of Assam" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjCu-GdtNxTWZfweVrsc-JXQESdsScvsLp7VpGtkfBD5SbI1uYQL7xd20BSCs-PlzFGYPDz08uTcyUL-7lTpuwUZn38aJIndgTHse6vbhsfk0OSgkgQ-cka3Uqrxo-YWNzAM_pUR8B9HDfEv5WBfqFLtO4EuzwrrrWQipRQX_ksrKc_mfEFNTEzmLl-v5vW3fX95Ou6Idi9uV7tR3h3ltsovhDU-PKfmvpSko3Y-228j3xgxu-xGNCugB8fpWqDSO7CrcnoEjs8BQ"/>
<div class="absolute inset-0 border-[16px] border-surface pointer-events-none"></div>
<div class="absolute inset-0 border border-outline/20 pointer-events-none"></div>
</div>
<h3 class="font-headline text-2xl font-bold text-on-surface mb-1">Bijoy &amp; Family</h3>
<p class="font-label text-secondary uppercase tracking-widest text-xs mb-4">Dibrugarh, Assam</p>
<p class="text-on-surface-variant text-sm leading-relaxed italic">Managing one of the few remaining family-owned estates in Assam, Bijoy specializes in the rare 'Golden Tips'.</p>
</div>
<!-- Farmer 3 -->
<div class="group mt-16 md:mt-0 lg:mt-12">
<div class="relative overflow-hidden aspect-[4/5] mb-6">
<img class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" data-alt="Indian man sorting dried tea leaves by hand on a large circular bamboo tray in a sunlit rustic barn" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrdzn31-4ekcobv6dpIykTm1Myat2no6m6lhLKI3aLk9gQLefelawhSE4XdqRCnWTdRcrJifAymHef6FANS2DDkslMP8aUaTISmZ-aKohk0OeDe3XY5j3xQo0jxCFbfH7NEemX5C8EgTq5vqSF6Ly84YEtsAfstxsN-2kV4RI_3C-oJ8v0v2HNWGXOcO_EVoeOn1mk77EAoUlbzMnNg_r9APaAkEIeqiNVYb6xdMLt41hP0PwC-HJ0KGFbFDI9xlFyMjQDOxi_qqA"/>
<div class="absolute inset-0 border-[16px] border-surface pointer-events-none"></div>
<div class="absolute inset-0 border border-outline/20 pointer-events-none"></div>
</div>
<h3 class="font-headline text-2xl font-bold text-on-surface mb-1">Meera</h3>
<p class="font-label text-secondary uppercase tracking-widest text-xs mb-4">Coonoor, Nilgiris</p>
<p class="text-on-surface-variant text-sm leading-relaxed italic">Meera leads a women-led cooperative focusing on sustainable biodynamic farming in the high-altitude 'Blue Mountains'.</p>
</div>
</div>
</div>
</section>
<!-- The Art of Chai: Timeline -->
<section class="py-24 bg-surface-container overflow-hidden">
<div class="max-w-screen-xl mx-auto px-6 lg:px-12 mb-16 text-center">
<h2 class="font-headline text-4xl text-primary font-bold">The Alchemy of Six</h2>
<div class="w-24 h-1 bg-secondary/30 mx-auto mt-6"></div>
</div>
<div class="relative overflow-hidden w-full pb-12">
<div class="flex w-[max-content] animate-marquee gap-16 px-8">
<!-- Original 6 Items -->
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">eco</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">1. Plucking</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Two leaves and a bud. Only the youngest growth is selected by hand at first light.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">wind_power</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">2. Withering</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Leaves are spread on racks to gently reduce moisture content through natural airflow.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">sync</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">3. Rolling</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Twisting the leaves to break cells and release essential oils, initiating chemical alchemy.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">waves</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">4. Oxidation</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">A precision stage where air reacts with the leaves to develop characteristic color and flavor.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">fireplace</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">5. Drying</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Hot air firing arrests oxidation and locks in the final flavor profile for transport.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">blender</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">6. Blending</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">The Master Taster curates the harvest, ensuring every cup meets our legacy of excellence.</p>
</div>

<!-- Duplicated 6 Items for Seamless Marquee Loop -->
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">eco</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">1. Plucking</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Two leaves and a bud. Only the youngest growth is selected by hand at first light.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">wind_power</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">2. Withering</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Leaves are spread on racks to gently reduce moisture content through natural airflow.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">sync</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">3. Rolling</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Twisting the leaves to break cells and release essential oils, initiating chemical alchemy.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">waves</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">4. Oxidation</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">A precision stage where air reacts with the leaves to develop characteristic color and flavor.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">fireplace</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">5. Drying</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">Hot air firing arrests oxidation and locks in the final flavor profile for transport.</p>
</div>
<div class="flex-none w-[350px] text-center group">
<div class="relative mb-8">
<div class="w-32 h-32 mx-auto bg-surface-container-low border border-secondary/20 flex items-center justify-center relative z-10 transition-transform group-hover:scale-110 group-hover:border-secondary/60">
<span class="material-symbols-outlined text-4xl text-secondary">blender</span>
</div>
<div class="absolute top-1/2 left-0 w-full h-[1px] bg-secondary/10 -z-0"></div>
</div>
<h4 class="font-headline text-2xl text-secondary font-bold mb-2">6. Blending</h4>
<p class="text-on-surface-variant text-sm leading-relaxed">The Master Taster curates the harvest, ensuring every cup meets our legacy of excellence.</p>
</div>
</div>
</div>
</section>
<!-- Our Promise (Ethical Sourcing) -->
<section class="relative py-32 bg-primary parchment-texture overflow-hidden">
<div class="absolute inset-0 opacity-10 flex flex-wrap gap-4 overflow-hidden pointer-events-none">
<div class="mughal-pattern w-64 h-64 text-surface"></div>
<div class="mughal-pattern w-64 h-64 text-surface translate-y-32"></div>
<div class="mughal-pattern w-64 h-64 text-surface"></div>
<div class="mughal-pattern w-64 h-64 text-surface translate-y-32"></div>
</div>
<div class="max-w-screen-xl mx-auto px-6 lg:px-12 relative z-10">
<div class="bg-surface p-12 lg:p-24 shadow-2xl flex flex-col lg:flex-row items-center gap-16">
<div class="lg:w-1/2">
<img class="w-full aspect-square object-cover" data-alt="close-up of hands cupping freshly harvested loose tea leaves against a rustic wood background with warm lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeNLa8RcFJnoCdY7ECa3_lCMD8xQJt6vfh79_kYvTqucgkfE1hNDRpSV74V_cBfnFj6YCTtdWhFXAV5eiMesOWPsetFXJ2xYpX3iqh-fGH9IXCI3w9gfrwAYYRg3-i65hfKR9Hj6404IC_Qhj5dj2rbEymqEruNkB4apBXabk5Sq95DmS9eDfc3D7J33183K3k6Qew0BkrccJtv2Qn-KCKJvmCTixikOOevlv_RNisWp-t96ww7xQbfkcZwtEoIUYPey0s4d9MIyQ"/>
</div>
<div class="lg:w-1/2 space-y-8">
<h2 class="font-headline text-4xl md:text-5xl text-primary font-bold">The Heritage Promise</h2>
<div class="space-y-6">
<div class="flex gap-6">
<span class="material-symbols-outlined text-secondary text-4xl" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
<div>
<h5 class="font-headline text-xl font-bold mb-1">Direct Partnerships</h5>
<p class="text-on-surface-variant text-sm">We bypass traditional auction houses to pay our farmers 40% above market rates directly.</p>
</div>
</div>
<div class="flex gap-6">
<span class="material-symbols-outlined text-secondary text-4xl" style="font-variation-settings: 'FILL' 1;">diversity_2</span>
<div>
<h5 class="font-headline text-xl font-bold mb-1">Social Upliftment</h5>
<p class="text-on-surface-variant text-sm">Investing in estate clinics and schools for the generational wellbeing of our communities.</p>
</div>
</div>
<div class="flex gap-6">
<span class="material-symbols-outlined text-secondary text-4xl" style="font-variation-settings: 'FILL' 1;">compost</span>
<div>
<h5 class="font-headline text-xl font-bold mb-1">Regenerative Craft</h5>
<p class="text-on-surface-variant text-sm">Working with the Earth, not against it. 70% of our estates are now fully organic certified.</p>
</div>
</div>
</div>
<button class="bg-primary hover:bg-on-primary-fixed-variant text-white px-8 py-4 font-label uppercase tracking-widest text-sm transition-all shadow-xl">
                            Read Our Sustainability Report
                        </button>
</div>
</div>
</div>
</section>
<!-- CTA Section -->
<section class="py-24 text-center">
<h3 class="font-headline text-3xl md:text-4xl italic text-on-surface mb-12">Taste the heritage for yourself.</h3>
<div class="flex flex-col md:flex-row justify-center gap-6">
<a class="inline-block border-2 border-primary text-primary px-12 py-4 font-label uppercase tracking-widest font-bold hover:bg-primary hover:text-white transition-all" href="#">Shop Single Estate</a>
<a class="inline-block border-2 border-secondary text-secondary px-12 py-4 font-label uppercase tracking-widest font-bold hover:bg-secondary hover:text-white transition-all" href="#">Book a Tasting</a>
</div>
</section>
</main>` }} />
    );
}
