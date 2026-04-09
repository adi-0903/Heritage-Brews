import React from 'react';

export default function Sommelier() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: `<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
            color: #F4C430;
        }
        body {
            background-color: #120e0a;
            color: #e5e2d8;
            font-family: 'Noto Serif', serif;
        }
        .indian-pattern-bg {
            background-image: url('/images/indian_pattern.png');
            background-size: 300px 300px;
            opacity: 0.03;
            mix-blend-mode: color-dodge;
        }
        .heritage-glass {
            backdrop-filter: blur(24px);
            background-color: rgba(18, 14, 10, 0.60);
        }
        .gold-glow { text-shadow: 0 0 30px rgba(244,196,48,0.4); }
        .writing-mode-vertical {
            writing-mode: vertical-rl;
        }
    </style><main class="bg-[#120e0a] pt-16 relative">

<!-- Full Page Texture -->
<div class="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

<!-- Hero Section -->
<section class="relative h-[921px] flex items-center overflow-hidden z-10 border-b border-[#F4C430]/20">
<div class="absolute inset-0 z-0">
<img alt="The Master Sommelier" class="w-full h-full object-cover transition-transform duration-[15000ms] hover:scale-105" src="/images/master_sommelier.png"/>
<div class="absolute inset-0 bg-gradient-to-r from-[#120e0a] via-[#120e0a]/70 to-transparent"></div>
</div>
<div class="container mx-auto px-12 relative z-10">
<div class="max-w-2xl">
<span class="text-[#F4C430] font-headline italic text-xl mb-4 block tracking-wide">The Curated Journey</span>
<h1 class="font-headline text-7xl md:text-8xl text-[#e5e2d8] font-bold leading-none -ml-1 tracking-tighter mb-8 gold-glow">
                        The Sommelier's <br/>Selection
                    </h1>
<p class="text-[#c4b5a2] text-lg leading-relaxed max-w-lg mb-10">
                        An invitation to the inner circle of tea heritage. Each month, our Master Blender selects two rare flushes that define the season's soul.
                    </p>
<div class="flex gap-6">
<button class="bg-[#F4C430] text-[#120e0a] px-10 py-5 font-headline font-bold text-lg hover:bg-[#e5b800] transition-all shadow-[0_0_30px_rgba(244,196,48,0.3)]">
                            EXPLORE TIERS
                        </button>
<button class="border border-[#F4C430]/40 text-[#F4C430] px-10 py-5 font-headline font-bold text-lg hover:bg-[#F4C430]/10 transition-all">
                            VIEW ARCHIVE
                        </button>
</div>
</div>
</div>
<div class="absolute right-12 bottom-12 hidden lg:flex items-center gap-6">
<div class="text-right">
<p class="text-[#F4C430] font-bold text-sm tracking-widest uppercase mb-1">Current Harvest</p>
<p class="font-headline text-2xl text-[#e5e2d8]">Autumnal Moonlight Darjeeling</p>
</div>
<div class="w-16 h-px bg-[#F4C430]/30"></div>
</div>
</section>

<!-- Meet the Master -->
<section class="py-32 bg-[#1c1511] relative overflow-hidden z-10">
<div class="absolute inset-0 indian-pattern-bg opacity-[0.02]"></div>
<div class="container mx-auto px-12 relative">
<div class="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
<div class="md:col-span-5 relative">
<div class="absolute -top-12 -left-12 w-48 h-48 border-l-2 border-t-2 border-[#F4C430]/20"></div>
<img alt="Tea Master at Work" class="relative z-10 w-full aspect-[4/5] object-cover" data-alt="Close-up of weathered hands of an artisan tea blender sorting dried leaves on a dark wooden table" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7T8zlBDIuj8wpZFoH78IW-7okNZFbFK1BTdPowdTtlpYvDJonnxeD4lIPWT8yS75u7HvT2PnSYOiaXX3BBFHBmJszrkXoHGX60nybm1McdZbO_IZlSjaK90Q1N04Kx7tbzwUOgstjy_N-sIf3CpAmr-XltWUBs1EO825OqJdvbNSA0T0Z3LgD0_mKR3gZ0jXaaJ5alKlVUQ3G6DkmzTJ8ARBxTXwd2OyzfhDXfW0K6LwxUImxWVWwVkppbkFvzUVkaWN5Rd62Ebk"/>
<div class="absolute -bottom-6 -right-6 bg-[#890000] p-8 text-[#e5e2d8] border border-[#F4C430]/30 shadow-2xl">
<p class="font-headline text-5xl font-bold italic text-[#F4C430]">40+</p>
<p class="text-xs tracking-[0.2em] uppercase font-bold">Years of Mastery</p>
</div>
</div>
<div class="md:col-span-7">
<h2 class="font-headline text-5xl text-[#F4C430] font-bold mb-8 tracking-tight">Meet the Master: <br/>Rishabh Dev Singh</h2>
<div class="space-y-6 text-[#c4b5a2] leading-relaxed text-lg font-serif">
<p>For four decades, Rishabh has walked the misty slopes of Assam and the high terraces of Darjeeling. His palate is a library of soil, sun, and rain—capable of detecting the precise hour a leaf was plucked by the density of its liquor.</p>
<p>As our Chief Sommelier, Rishabh doesn't just buy tea; he secures "micro-lots"—fractions of harvests that are too small for the commercial market but too magnificent to be blended away. Through this subscription, he shares these secrets directly with you.</p>
<div class="pt-8">
<img alt="Signature" class="h-16 opacity-70 invert" data-alt="Stylized calligraphy signature of an Indian artisan in dark red ink on parchment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD27mqcUvXN_5-v3sYVnbN3L3zMSBtm34xP3oiXdH0rDv7R-6OSoQmC0-8VreTV2ygOiy23aM9m_UiXgKwUSjHABQkri00NqgxLe-4ECTKnMQFJ7cWCYXpKmjPtvt_9UZW9WwIR3Glek0kXJQTZ6pqcvpW1M40qySrKTucQaazJjKGPM--ENWLOTLqflG5m54LxjD2VlAAc5weq7-LwOFHyNLxxNEql-474_17ZyjC-tgo3tjdmUaj19tLOPpfuFgMX09fq25kCu6Y"/>
<p class="text-[#F4C430] font-headline italic mt-2">The Keeper of the Leaf</p>
</div>
</div>
</div>
</div>
</div>
</section>

<!-- Subscription Tiers -->
<section class="py-32 container mx-auto px-12 relative z-10">
<div class="text-center mb-24">
<h2 class="font-headline text-5xl text-[#e5e2d8] font-bold mb-4 tracking-tighter uppercase gold-glow">Subscription Tiers</h2>
<div class="w-24 h-1 bg-[#F4C430] mx-auto"></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
<!-- Silver Tier -->
<div class="group bg-[#1c1511] border border-[#F4C430]/10 p-12 relative flex flex-col items-center text-center transition-all duration-500 hover:border-[#F4C430]/30 hover:shadow-[0_0_40px_rgba(244,196,48,0.1)]">
<div class="mb-12 relative">
<span class="material-symbols-outlined text-6xl text-[#c4b5a2] mb-4">eco</span>
<h3 class="font-headline text-4xl text-[#e5e2d8] font-bold uppercase tracking-widest">Silver Tier</h3>
<p class="text-[#F4C430] italic font-serif">The Seasonal Companion</p>
</div>
<ul class="space-y-6 mb-12 text-[#c4b5a2] font-serif text-lg">
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#F4C430] text-sm">circle</span>
                            2x 100g Selection of Seasonal Artisanal Teas
                        </li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#F4C430] text-sm">circle</span>
                            Fine Linen Reusable Steeping Bags
                        </li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#F4C430] text-sm">circle</span>
                            Digital Brewing Guides by Rishabh Dev
                        </li>
</ul>
<div class="mt-auto pt-8">
<p class="text-3xl font-headline font-bold text-[#F4C430] mb-6">₹1,850 <span class="text-sm font-normal text-[#c4b5a2] tracking-normal">/ month</span></p>
<button class="border-2 border-[#F4C430] text-[#F4C430] px-12 py-4 font-headline font-bold hover:bg-[#F4C430] hover:text-[#120e0a] transition-all tracking-widest">SELECT SILVER</button>
</div>
</div>
<!-- Shahi Brass Tier -->
<div class="group bg-[#1c1511] border-2 border-[#F4C430]/30 p-12 relative flex flex-col items-center text-center transition-all duration-500 overflow-hidden hover:shadow-[0_0_60px_rgba(244,196,48,0.15)]">
<div class="absolute top-0 right-0 p-4 bg-[#F4C430] text-[#120e0a] font-headline font-bold text-xs tracking-widest uppercase">Premium Choice</div>
<div class="mb-12 relative">
<span class="material-symbols-outlined text-6xl text-[#F4C430] mb-4" style="font-variation-settings: 'FILL' 1;">workspace_premium</span>
<h3 class="font-headline text-4xl text-[#F4C430] font-bold uppercase tracking-widest">Shahi Brass Tier</h3>
<p class="text-[#F4C430]/70 italic font-serif">The Royal Collector</p>
</div>
<ul class="space-y-6 mb-12 text-[#c4b5a2] font-serif text-lg">
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#F4C430] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                            3x 150g Rare, Single-Estate First Flushes
                        </li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#F4C430] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                            Hand-Etched Heirloom Brass Canisters
                        </li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#F4C430] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                            Monthly Artisanal Craft Gift (Handmade Clay/Metal)
                        </li>
<li class="flex items-center gap-3">
<span class="material-symbols-outlined text-[#F4C430] text-sm" style="font-variation-settings: 'FILL' 1;">star</span>
                            Printed, Hand-Numbered Tasting Memoirs
                        </li>
</ul>
<div class="mt-auto pt-8">
<p class="text-3xl font-headline font-bold text-[#F4C430] mb-6">₹4,200 <span class="text-sm font-normal text-[#c4b5a2] tracking-normal">/ month</span></p>
<button class="bg-[#F4C430] text-[#120e0a] px-12 py-4 font-headline font-bold hover:bg-[#e5b800] hover:shadow-2xl transition-all tracking-widest shadow-[0_0_30px_rgba(244,196,48,0.3)]">SUBSCRIBE TO SHAHI</button>
</div>
</div>
</div>
</section>

<!-- Inside the Box -->
<section class="py-32 bg-[#1c1511] relative overflow-hidden z-10 border-y border-[#F4C430]/10">
<div class="container mx-auto px-12">
<div class="flex flex-col md:flex-row gap-16 items-center">
<div class="md:w-1/2">
<h2 class="font-headline text-6xl text-[#e5e2d8] font-bold mb-12 tracking-tighter leading-[0.9] gold-glow">Inside The <br/>Curated Box</h2>
<div class="space-y-12">
<div class="flex gap-6 items-start">
<span class="font-headline text-2xl text-[#F4C430] border-b border-[#F4C430]/40 pb-1">01</span>
<div>
<h4 class="font-headline text-2xl font-bold mb-2 text-[#e5e2d8]">The Harvest Selection</h4>
<p class="text-[#c4b5a2] leading-relaxed">Premium loose-leaf flushes, hand-picked and vacuum sealed at the estate to preserve the 'terroir'.</p>
</div>
</div>
<div class="flex gap-6 items-start">
<span class="font-headline text-2xl text-[#F4C430] border-b border-[#F4C430]/40 pb-1">02</span>
<div>
<h4 class="font-headline text-2xl font-bold mb-2 text-[#e5e2d8]">Artisan Tasting Guide</h4>
<p class="text-[#c4b5a2] leading-relaxed">Hand-written notes on parchment detailing temperature, steep time, and the tea's history.</p>
</div>
</div>
<div class="flex gap-6 items-start">
<span class="font-headline text-2xl text-[#F4C430] border-b border-[#F4C430]/40 pb-1">03</span>
<div>
<h4 class="font-headline text-2xl font-bold mb-2 text-[#e5e2d8]">The Earth Gift</h4>
<p class="text-[#c4b5a2] leading-relaxed">A small token of craft, like a terracotta tea light holder or a hand-poured spice candle.</p>
</div>
</div>
</div>
</div>
<div class="md:w-1/2 grid grid-cols-2 gap-4">
<div class="space-y-4 pt-12">
<img alt="Brass Canister" class="w-full aspect-square object-cover border border-[#F4C430]/10 shadow-xl hover:scale-[1.03] transition-transform duration-700" src="/images/brass_tea_canister.png"/>
<img alt="Tea Detail" class="w-full aspect-[3/4] object-cover border border-[#F4C430]/10 shadow-xl hover:scale-[1.03] transition-transform duration-700" src="/images/loose_tea_leaves.png"/>
</div>
<div class="space-y-4">
<img alt="Gift" class="w-full aspect-[3/4] object-cover border border-[#F4C430]/10 shadow-xl hover:scale-[1.03] transition-transform duration-700" src="/images/terracotta_diya_lamp.png"/>
<img alt="Notes" class="w-full aspect-square object-cover border border-[#F4C430]/10 shadow-xl sepia-[0.3] hover:scale-[1.03] transition-transform duration-700" src="/images/darjeeling_tea_1775770278908.png"/>
</div>
</div>
</div>
</div>
</section>

<!-- CTA Section -->
<section class="relative py-40 overflow-hidden bg-[#2a0a0a] z-10 border-y border-[#F4C430]/10">
<div class="absolute inset-0 indian-pattern-bg opacity-[0.05]"></div>
<div class="container mx-auto px-12 relative z-10 text-center">
<h2 class="font-headline text-6xl md:text-8xl text-[#e5e2d8] font-bold mb-12 tracking-tight gold-glow">Begin Your Revival</h2>
<p class="text-[#c4b5a2] text-2xl font-serif max-w-2xl mx-auto mb-16 italic">"Tea is the only medicine that heals both the body and the soul." — Ancient Proverb</p>
<div class="flex flex-col sm:flex-row gap-6 justify-center">
<button class="bg-[#F4C430] text-[#120e0a] px-16 py-6 font-headline font-bold text-xl tracking-widest hover:bg-[#e5b800] transition-all shadow-[0_0_30px_rgba(244,196,48,0.3)]">
                        SUBSCRIBE NOW
                    </button>
<button class="border border-[#e5e2d8]/40 text-[#e5e2d8] px-16 py-6 font-headline font-bold text-xl tracking-widest hover:bg-[#e5e2d8]/10 transition-all">
                        GIFT A SUBSCRIPTION
                    </button>
</div>
<p class="mt-12 text-[#c4b5a2]/60 text-sm font-label tracking-widest uppercase">Ships Globally from Darjeeling • Cancel Anytime</p>
</div>
</section>

</main>` }} />
    );
}
