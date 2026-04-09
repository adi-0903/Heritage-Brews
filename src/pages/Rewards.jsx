import React from 'react';

export default function Rewards() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: `<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .pattern-jali {
            background-color: transparent;
            background-image: radial-gradient(rgba(244, 196, 48, 0.2) 1px, transparent 1px), radial-gradient(rgba(244, 196, 48, 0.2) 1px, transparent 1px);
            background-size: 20px 20px;
            background-position: 0 0,10px 10px;
            opacity: 0.3;
        }
        
        /* Dark Cinematic Royal VIP Palette */
        body { background-color: #120e0a; color: #fcf9ee; font-family: 'Noto Serif', serif; }
        
        .bg-background { background-color: #120e0a !important; }
        .text-on-background { color: #fcf9ee !important; }
        .from-background { --tw-gradient-from: #120e0a !important; --tw-gradient-to: rgba(18, 14, 10, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-background { --tw-gradient-to: #120e0a !important; }
        
        .text-surface-container-lowest { color: #fcf9ee !important; } /* Explicit map so hero text is bright */
        .text-surface-container-high { color: #dcd4c3 !important; }
        
        .bg-surface-container-lowest { background-color: #0a0805 !important; }
        .bg-surface-container-low { background-color: #1a1510 !important; }
        .bg-surface-container { background-color: #251e17 !important; }
        .bg-surface-container-high { background-color: #31281f !important; }
        .bg-surface-container-highest { background-color: #4a3b2b !important; }
        .bg-surface { background-color: #120e0a !important; }
        .bg-surface-variant { background-color: #251e17 !important; }
        
        .bg-primary-container { background-color: #3f2a13 !important; }
        .bg-primary { background-color: #F4C430 !important; }
        .text-primary { color: #F4C430 !important; } /* Royal Gold */
        .text-on-primary { color: #120e0a !important; } 
        
        .bg-secondary { background-color: #d6aa54 !important; }
        .text-secondary { color: #d6aa54 !important; } /* Muted Gold */
        .text-on-secondary { color: #120e0a !important; }
        
        .text-on-surface { color: #fcf9ee !important; } 
        .text-on-surface-variant { color: #c4bcae !important; } 
        
        .border-outline-variant\\/20 { border-color: rgba(244, 196, 48, 0.2) !important; }
        .border-outline-variant\\/30 { border-color: rgba(244, 196, 48, 0.3) !important; }
        .bg-outline-variant\\/30 { background-color: rgba(244, 196, 48, 0.3) !important; }
        .border-outline { border-color: rgba(244, 196, 48, 0.4) !important; }
        .text-outline { color: rgba(244, 196, 48, 0.4) !important; }
        
        .from-primary { --tw-gradient-from: #F4C430 !important; --tw-gradient-to: rgba(244, 196, 48, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
        .to-primary-container { --tw-gradient-to: #d6aa54 !important; }

        img { mix-blend-mode: luminosity; opacity: 0.9; }
        img:hover { mix-blend-mode: normal; opacity: 1; transition: all 0.5s ease; }
    </style><main class="bg-[#120e0a]">
<!-- Hero Section -->
<section class="relative h-[870px] flex items-center justify-center overflow-hidden">
<div class="absolute inset-0 z-0">
<img alt="Royal Heritage" class="w-full h-full object-cover filter brightness-[0.4] saturate-[0.8]" data-alt="Interior of a luxury royal haveli with traditional brass tea service, warm golden lighting, ornate architectural details, and soft steam rising from a samovar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV562n2iUKZIbjpQgvXtTVf0gB_3kAavNgWvBKXdlOmq1Li_aTQMrcrW28JxcqK1GcEBQFpr_IoUHBmdgKs4ASPqPKGOMeLdBsbAVHWNLwpE2IymsfP2Ka1MUE6TtqLIwO72nGtwhiaiRKHHE8vrK4MgPl1eOipbUXJFPRpuYDXjTGbdctnAPprADMcZqQBCR58QrxHsamtZ8Xl5ZJW1jaZkpqkOv4QdWAsSFVS1TGzxlsa1Mh9ymqytyWNtQK_YUVH4AOCJDq1NU"/>
<div class="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
</div>
<div class="relative z-10 text-center px-6 max-w-4xl">
<h1 class="font-headline text-5xl md:text-8xl text-surface-container-lowest leading-tight tracking-tight mb-6">
                    चाय परिवार — <br/><span class="italic font-light">Join the Heritage Family</span>
</h1>
<p class="font-body text-lg md:text-2xl text-surface-container-high max-w-2xl mx-auto leading-relaxed opacity-90">
                    Step into a royal lineage of connoisseurs. More than a rewards program, it is an invitation to the inner sanctum of tea mastery.
                </p>
<div class="mt-12">
<button class="bg-gradient-to-r from-primary to-primary-container text-on-primary px-10 py-4 font-headline uppercase tracking-[0.2em] text-sm hover:brightness-110 transition-all shadow-xl">
                        Accept the Invitation
                    </button>
</div>
</div>
</section>
<!-- Rewards Dashboard (The Royal Scroll) -->
<section class="py-24 px-8 max-w-7xl mx-auto">
<div class="bg-surface-container-low border-[0.5px] border-outline-variant/20 p-8 md:p-16 relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 pattern-jali pointer-events-none"></div>
<div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
<div>
<span class="font-label text-secondary uppercase tracking-[0.3em] text-xs mb-4 block">Current Status</span>
<h2 class="font-headline text-4xl text-on-surface">Namaste, Collector of Blends</h2>
<div class="flex items-center mt-4 gap-3 text-secondary">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">stars</span>
<span class="font-headline text-2xl">1,240 <span class="text-sm font-body uppercase tracking-widest text-on-surface-variant">Tea Tokens</span></span>
</div>
</div>
<div class="text-right">
<p class="font-label text-on-surface-variant text-sm italic mb-2">You are 760 tokens away from 'Masala Raja' status</p>
</div>
</div>
<!-- Progress Path -->
<div class="relative py-12">
<div class="absolute top-1/2 left-0 w-full h-1 bg-outline-variant/30 -translate-y-1/2"></div>
<div class="absolute top-1/2 left-0 w-[45%] h-1 bg-secondary -translate-y-1/2"></div>
<div class="relative flex justify-between items-center">
<div class="flex flex-col items-center gap-4 bg-surface-container-low px-2">
<div class="w-10 h-10 border-2 border-secondary bg-secondary flex items-center justify-center rotate-45">
<span class="material-symbols-outlined text-on-secondary -rotate-45 text-sm">check</span>
</div>
<span class="font-headline text-xs uppercase tracking-tighter">Pehla Cup</span>
</div>
<div class="flex flex-col items-center gap-4 bg-surface-container-low px-2">
<div class="w-12 h-12 border-2 border-secondary bg-surface-container-lowest flex items-center justify-center rotate-45 scale-110">
<span class="material-symbols-outlined text-secondary -rotate-45">local_cafe</span>
</div>
<span class="font-headline text-xs uppercase tracking-tighter font-bold">Chai Premi</span>
</div>
<div class="flex flex-col items-center gap-4 bg-surface-container-low px-2 opacity-40">
<div class="w-10 h-10 border-2 border-outline bg-surface-container-lowest flex items-center justify-center rotate-45">
<span class="material-symbols-outlined text-outline -rotate-45">military_tech</span>
</div>
<span class="font-headline text-xs uppercase tracking-tighter">Masala Raja</span>
</div>
<div class="flex flex-col items-center gap-4 bg-surface-container-low px-2 opacity-40">
<div class="w-10 h-10 border-2 border-outline bg-surface-container-lowest flex items-center justify-center rotate-45">
<span class="material-symbols-outlined text-outline -rotate-45">castle</span>
</div>
<span class="font-headline text-xs uppercase tracking-tighter">Shahi Mehman</span>
</div>
</div>
</div>
</div>
</section>
<!-- Tier System (Ornate Medallions) -->
<section class="py-24 bg-surface-container text-on-background">
<div class="max-w-7xl mx-auto px-8">
<div class="text-center mb-20">
<h2 class="font-headline text-5xl mb-4">The Four Ascensions</h2>
<p class="font-body text-on-surface-variant max-w-xl mx-auto">Each tier marks a deepening of your journey into the living archive of tea.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
<!-- Bronze -->
<div class="group bg-surface-container-lowest p-8 border-t-4 border-[#cd7f32] transition-all hover:-translate-y-2">
<div class="mb-8 w-16 h-16 mx-auto relative flex items-center justify-center">
<div class="absolute inset-0 border border-[#cd7f32]/30 rotate-45"></div>
<span class="material-symbols-outlined text-[#cd7f32] text-3xl">filter_vintage</span>
</div>
<h3 class="font-headline text-2xl text-center mb-2">Pehla Cup</h3>
<p class="font-label text-center text-xs uppercase tracking-widest text-on-surface-variant mb-6">0-500 Tokens</p>
<ul class="space-y-4 font-body text-sm text-on-surface-variant">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-[#cd7f32] mt-1">arrow_forward</span>
                                Free delivery on orders above ₹499.
                            </li>
</ul>
</div>
<!-- Silver -->
<div class="group bg-surface-container-lowest p-8 border-t-4 border-[#c0c0c0] transition-all hover:-translate-y-2 shadow-sm">
<div class="mb-8 w-16 h-16 mx-auto relative flex items-center justify-center">
<div class="absolute inset-0 border border-[#c0c0c0]/30 rotate-45 group-hover:rotate-90 transition-transform"></div>
<span class="material-symbols-outlined text-[#c0c0c0] text-3xl">workspace_premium</span>
</div>
<h3 class="font-headline text-2xl text-center mb-2">Chai Premi</h3>
<p class="font-label text-center text-xs uppercase tracking-widest text-on-surface-variant mb-6">500-2000 Tokens</p>
<ul class="space-y-4 font-body text-sm text-on-surface-variant">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-[#c0c0c0] mt-1">arrow_forward</span>
                                10% off all seasonal collections.
                            </li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-[#c0c0c0] mt-1">arrow_forward</span>
                                Early access to limited harvests.
                            </li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-[#c0c0c0] mt-1">arrow_forward</span>
                                Hand-crafted Birthday Kulhad set.
                            </li>
</ul>
</div>
<!-- Gold -->
<div class="group bg-surface-container-lowest p-8 border-t-4 border-secondary transition-all hover:-translate-y-2 shadow-md">
<div class="mb-8 w-16 h-16 mx-auto relative flex items-center justify-center">
<div class="absolute inset-0 border border-secondary/30 rotate-45 animate-pulse"></div>
<span class="material-symbols-outlined text-secondary text-3xl">king_bed</span>
</div>
<h3 class="font-headline text-2xl text-center mb-2">Masala Raja/Rani</h3>
<p class="font-label text-center text-xs uppercase tracking-widest text-on-surface-variant mb-6">2000-5000 Tokens</p>
<ul class="space-y-4 font-body text-sm text-on-surface-variant">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-secondary mt-1">arrow_forward</span>
                                20% off plus prioritized shipping.
                            </li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-secondary mt-1">arrow_forward</span>
                                Quarterly surprise tea hamper.
                            </li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-secondary mt-1">arrow_forward</span>
                                Private Sommelier tastings.
                            </li>
</ul>
</div>
<!-- Platinum -->
<div class="group bg-surface-container-lowest p-8 border-t-4 border-primary transition-all hover:-translate-y-2 shadow-lg relative overflow-hidden">
<div class="absolute top-0 right-0 p-1 bg-primary text-on-primary text-[10px] uppercase font-bold tracking-widest">Ultimate</div>
<div class="mb-8 w-16 h-16 mx-auto relative flex items-center justify-center">
<div class="absolute inset-0 border-2 border-primary/20 rotate-45"></div>
<span class="material-symbols-outlined text-primary text-3xl" style="font-variation-settings: 'FILL' 1;">diamond</span>
</div>
<h3 class="font-headline text-2xl text-center mb-2">Shahi Mehman</h3>
<p class="font-label text-center text-xs uppercase tracking-widest text-on-surface-variant mb-6">5000+ Tokens</p>
<ul class="space-y-4 font-body text-sm text-on-surface-variant">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-primary mt-1">arrow_forward</span>
                                30% off all lifestyle &amp; tea products.
                            </li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-primary mt-1">arrow_forward</span>
                                Personal Chai Concierge service.
                            </li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-xs text-primary mt-1">arrow_forward</span>
                                Exclusive estate &amp; tea-garden visits.
                            </li>
</ul>
</div>
</div>
</div>
</section>
<!-- How to Earn (Asymmetric Bento Grid) -->
<section class="py-24 px-8 max-w-7xl mx-auto">
<h2 class="font-headline text-4xl mb-12 border-l-4 border-primary pl-6">Ways to Curate Tokens</h2>
<div class="grid grid-cols-1 md:grid-cols-12 gap-4">
<div class="md:col-span-8 bg-primary-container text-on-primary p-12 flex flex-col justify-between min-h-[300px]">
<span class="material-symbols-outlined text-6xl opacity-30">payments</span>
<div>
<h4 class="font-headline text-4xl mb-2">₹1 Spent = 1 Tea Token</h4>
<p class="font-body opacity-80">Every sip adds to your legacy. Tokens never expire for active members.</p>
</div>
</div>
<div class="md:col-span-4 bg-surface-container-high p-8 flex flex-col items-center text-center justify-center">
<span class="material-symbols-outlined text-4xl text-secondary mb-4">cake</span>
<h4 class="font-headline text-xl mb-1">Birthday Gift</h4>
<p class="font-body text-2xl font-bold text-secondary">500 pts</p>
</div>
<div class="md:col-span-4 bg-surface-container-high p-8 flex flex-col items-center text-center justify-center">
<span class="material-symbols-outlined text-4xl text-secondary mb-4">diversity_3</span>
<h4 class="font-headline text-xl mb-1">Refer a Friend</h4>
<p class="font-body text-2xl font-bold text-secondary">200 pts</p>
</div>
<div class="md:col-span-4 bg-surface-container p-8 flex flex-col items-center text-center justify-center">
<span class="material-symbols-outlined text-4xl text-secondary mb-4">rate_review</span>
<h4 class="font-headline text-xl mb-1">Authentic Review</h4>
<p class="font-body text-2xl font-bold text-secondary">50 pts</p>
</div>
<div class="md:col-span-4 bg-surface-container-high p-8 flex flex-col items-center text-center justify-center">
<span class="material-symbols-outlined text-4xl text-secondary mb-4">share</span>
<h4 class="font-headline text-xl mb-1">Social Share</h4>
<p class="font-body text-2xl font-bold text-secondary">25 pts</p>
</div>
</div>
</section>
<!-- Redeem Catalog -->
<section class="py-24 bg-surface-container-lowest">
<div class="max-w-7xl mx-auto px-8">
<div class="flex justify-between items-center mb-16">
<h2 class="font-headline text-5xl">The Treasury</h2>
<a class="text-secondary font-label uppercase tracking-widest text-xs border-b border-secondary pb-1" href="#">View Full Catalog</a>
</div>
<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
<!-- Item 1 -->
<div class="group cursor-pointer">
<div class="relative overflow-hidden aspect-[3/4] mb-6">
<img alt="Kulhad Set" class="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 transition-transform duration-700" data-alt="Handcrafted traditional clay kulhad tea cups arranged artistically on a rustic wooden tray with scattered tea leaves." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIgCbmyLhK0FNCKSPBahJmcVLIHEtZ77uqC-oBBgq8c2Pn0KgESF9LZZtOC1-mkEwD9hCIJXnxhXXipsXcGrG_RvZE2Gr5GoGaQ0guSXPKq6y5U2KylRqpB7wBQxyIZAA2uVVBmEpp0tZFmN8OZnmjwgtjD-e8q9viw6reZq6Yw4A8ZeKd29sc_dX_ZyXPo4dojQT_aJpSo2V71tzceMdX0DbgAPDPWtvBqV9sdpWw8pf7iTZ4OzQb30bfwNk11sLwVmR1Eso_xlg"/>
<div class="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-4 py-2 text-primary font-headline text-lg">1,500 pts</div>
</div>
<h4 class="font-headline text-xl mb-1 group-hover:text-primary transition-colors">Free Kulhad Set</h4>
<p class="font-body text-xs text-on-surface-variant uppercase tracking-widest italic">Artisan Pottery</p>
</div>
<!-- Item 2 -->
<div class="group cursor-pointer">
<div class="relative overflow-hidden aspect-[3/4] mb-6">
<img alt="Masala Tin" class="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 transition-transform duration-700" data-alt="Premium vintage style metallic tin of tea with intricate floral embossed patterns and rich red labeling." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV2qOMd1Yd714wco6gYOebq9IokMXTiYtsyxrngmR4EjFRg_QluwN-zxV08W_rLm3quLybVIfdNbxGne_YIneZoBgNgb6QgLJ900jnTZnecT9KD4JWNBB6kGSqkz1rIbNkXV8OH6lPUNkFLgn5XzNR2QzG0CCWieai14qKkECY9TYDWGDEALxeBrv_gtt10paG_dYWtmU-j3K_OjPTaBofgL45RS1uk4anN1mmLW-54oO9eNJKA9Cq3K8Pj6sHizL1JA1LqxaCHMQ"/>
<div class="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-4 py-2 text-primary font-headline text-lg">2,200 pts</div>
</div>
<h4 class="font-headline text-xl mb-1 group-hover:text-primary transition-colors">Signature Masala Tin</h4>
<p class="font-body text-xs text-on-surface-variant uppercase tracking-widest italic">Private Reserve</p>
</div>
<!-- Item 3 -->
<div class="group cursor-pointer">
<div class="relative overflow-hidden aspect-[3/4] mb-6">
<img alt="Estate Tour" class="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 transition-transform duration-700" data-alt="Scenic landscape of a rolling green tea estate in Darjeeling during misty morning light with traditional pluckers in the distance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrjDiLbDFZQThzl5L9lFy0qEzDNZZkuzocVG7budp1j2k7SkHP_r83IBBcQ3_J8Q5noG7J1UkRyY2ay1RhckNZsovIGKZxFFdkBtTD7kV0E_cUPWbpNn9sFVJb-Uuk1P-WKgm4yaDW1KBvUTJYH5mo_DT98i0dw1Ur2UlDX-cZrkZ0fBQ4wuyls1Mnyn0ZMnBajq1bHT3_xRVFfYTOGMRjnrqkMuKeFjVDXfbtGFgynwIQwDOJ_Zfyt_EUOR1c45-Ae6mRSnAv8-o"/>
<div class="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-4 py-2 text-primary font-headline text-lg">15,000 pts</div>
</div>
<h4 class="font-headline text-xl mb-1 group-hover:text-primary transition-colors">Estate Tour Voucher</h4>
<p class="font-body text-xs text-on-surface-variant uppercase tracking-widest italic">Experience</p>
</div>
<!-- Item 4 -->
<div class="group cursor-pointer">
<div class="relative overflow-hidden aspect-[3/4] mb-6">
<img alt="Sampler" class="w-full h-full object-cover grayscale-[0.2] group-hover:scale-110 transition-transform duration-700" data-alt="An array of small wooden bowls containing different types of rare whole tea leaves, white needles, and dark oolong." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfA99NWBtIX9679QzAKkzq5rHdkfQCYXG_go_oSTewedxMDBv_KlZ2CuBypbE7Ds2CaJuYomWHlNtapt_LReajypyxbLHGPW0MxrAGErjzq-LA07Cjm2LjdeajaQyl8JdMaxR5gRDsS7X4I7u2UjgNFE7G0NgxGOFA7Wzyu51U9zqJtIENUI47K0MAfQbhOfRNZJGTNtI6pxOA1CD_2D_1tDUQPWsh0YG372O6GjC9RXuAdnOwwkeJbdx3SY4iKBHn-PNB2n1amnI"/>
<div class="absolute bottom-4 left-4 bg-surface/90 backdrop-blur-sm px-4 py-2 text-primary font-headline text-lg">800 pts</div>
</div>
<h4 class="font-headline text-xl mb-1 group-hover:text-primary transition-colors">Rare Blend Sampler</h4>
<p class="font-body text-xs text-on-surface-variant uppercase tracking-widest italic">Discovery</p>
</div>
</div>
</div>
</section>
<!-- Final Pattern Scrim -->
<div class="h-64 pattern-jali relative">
<div class="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
</div>
</main>` }} />
    );
}
