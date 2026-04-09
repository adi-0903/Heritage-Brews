import React from 'react';

export default function Stories() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: `<style>
    .parchment-texture { background-image: url(https://lh3.googleusercontent.com/aida-public/AB6AXuDXTfdeeIkkwJfedbvd1C9L0gMq8YHMBEW2_FwhK22_wF28oLpGzl1Mlkss7w-GEZq0bNj-nh_Pir24JzpwvsAx2ikP0HRffnkGslsDc_bp3HW-nfbe4Hag0r7TWlArBGotlDxmNs4P16A6o5-qVuXFgqC12fTHgLTg3Mc71TaLX8sJa92MTgsYw-7fgybPzCY_s1GF18uHYWs7PrfNZJBwK6eNq4hvJBkVknNwJPkmIbVOZWyp_VLWFPFeqiJajraagds-cknbtL0); mix-blend-mode: multiply; opacity: 0.1; }
    .ink-stain { mask-image: radial-gradient(circle, black 30%, transparent 70%); -webkit-mask-image: radial-gradient(circle, black 30%, transparent 70%); }
    .writing-mode-vertical { writing-mode: vertical-rl; }
    
    /* Dark Mode Heritage Stitch Design Palette Maps */
    body { background-color: #120e0a; color: #fcf9ee; font-family: 'Noto Serif', serif; }
    
    .bg-surface-container-lowest { background-color: #0a0805 !important; }
    .bg-surface-container-low { background-color: #1a1510 !important; }
    .bg-surface-container { background-color: #251e17 !important; }
    .bg-surface-container-high { background-color: #31281f !important; }
    .bg-surface-container-highest { background-color: #4a3b2b !important; }
    .bg-surface { background-color: #120e0a !important; }
    .bg-surface-variant, .bg-surface-dim { background-color: #251e17 !important; }
    
    .text-primary { color: #F4C430 !important; } /* Gold */
    .text-secondary { color: #d6aa54 !important; } /* Muted Gold */
    .text-on-surface { color: #fcf9ee !important; } /* Parchment White */
    .text-on-surface-variant { color: #c4bcae !important; } /* Dimmed Parchment */
    .text-on-primary { color: #120e0a !important; } /* Deep BG */
    
    .border-outline-variant\\/10 { border-color: rgba(244, 196, 48, 0.1) !important; }
    .border-outline-variant\\/5 { border-color: rgba(244, 196, 48, 0.05) !important; }
    .border-outline-variant\\/20 { border-color: rgba(244, 196, 48, 0.2) !important; }
    .border-outline\\/5 { border-color: rgba(244, 196, 48, 0.05) !important; }
    .border-outline\\/20 { border-color: rgba(244, 196, 48, 0.2) !important; }
    .border-secondary\\/20 { border-color: rgba(244, 196, 48, 0.2) !important; }
    .border-secondary\\/30 { border-color: rgba(244, 196, 48, 0.3) !important; }
    
    .from-primary { --tw-gradient-from: #F4C430 !important; --tw-gradient-to: rgba(244, 196, 48, 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
    .to-primary-container { --tw-gradient-to: #d6aa54 !important; }
    
    img { mix-blend-mode: luminosity; opacity: 0.8; }
    img:hover { mix-blend-mode: normal; opacity: 1; transition: all 0.5s ease; }
</style><main class="max-w-screen-2xl mx-auto px-6 md:px-12 pt-12 pb-24 bg-[#120e0a] text-[#fcf9ee] relative z-10">

<!-- FIXED HIMALAYAN BACKGROUND -->
<div class="fixed inset-0 z-[-1] pointer-events-none">
    <img src="/images/dark_tea_mountains.png" class="w-full h-full object-cover opacity-30 mix-blend-luminosity" />
    <div class="absolute inset-0 bg-gradient-to-b from-[#120e0a]/60 via-[#120e0a]/80 to-[#120e0a]"></div>
</div>

<!-- Hero Section -->
<section class="relative py-24 mb-16 overflow-hidden bg-surface-container-low/50 border-b border-outline-variant/10 rounded-2xl backdrop-blur-sm mt-4">
<div class="absolute inset-0 opacity-20 pointer-events-none">
<img class="w-full h-full object-cover" data-alt="..." src="/images/dark_tea_mountains.png"/>
</div>
<div class="relative z-10 text-center space-y-6">
<h2 class="text-secondary font-label tracking-widest text-sm uppercase">The Journal</h2>
<h1 class="font-headline text-5xl md:text-7xl text-primary font-extrabold tracking-tight leading-tight">
                    चाय की कहानियाँ — <br/>
<span class="italic font-normal">Stories Steeped in Tradition</span>
</h1>
<p class="max-w-2xl mx-auto text-on-surface-variant text-lg font-body leading-relaxed">
                    A chronicle of whispers from the tea gardens, forgotten recipes from grandmothers' kitchens, and the soulful philosophy of a shared kulhad.
                </p>
<div class="flex justify-center pt-4">
<div class="w-16 h-[2px] bg-secondary opacity-30"></div>
</div>
</div>
</section>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
<!-- Left Content Area -->
<div class="lg:col-span-8 space-y-16">
<!-- Featured Article -->
<article class="group relative bg-surface-container-lowest p-8 md:p-12 shadow-[0_4px_32px_0_rgba(181,38,25,0.06)] overflow-hidden">
<div class="grid md:grid-cols-2 gap-12 items-center">
<div class="relative aspect-[4/5] overflow-hidden bg-surface-container">
<img class="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700" data-alt="atmospheric photo of steam rising from a brass tea pot in a dimly lit heritage kitchen with vintage utensils" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-OkoQBPW2yNv5--2pEmorm5PDrxykAykdKOaPLZLy4nrSesehN5FKZMBaiBbkjJxBWBOrVZdywQVXBgS5kGeQAYdUrF_mMAKNbJJrkL3pqBHptHX_LTmou07DAXFkkR3C-a8_lH5w5JoxwdPXhceJbZ6PSjO_BBr6VUG_VDjCwgN_HCMUcXIRzerxqwaHhY8UKTcaVSFp0dexmxDiwfXcXJy1-Ry8zFmNG0uivGd9cdWtkl4VU-8F1F2hQjMbArLsFOwbZsGP8_Q"/>
<div class="absolute inset-0 bg-primary/5"></div>
</div>
<div class="space-y-6">
<span class="text-secondary font-label text-xs uppercase tracking-[0.2em] block">Must Read | History</span>
<h2 class="font-headline text-4xl text-on-surface leading-tight font-bold">The Lost Recipe of Lucknowi Irani Chai</h2>
<div class="flex items-center gap-4 text-sm text-on-surface-variant font-label">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">edit</span> Ananya Misra</span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">schedule</span> 12 min read</span>
</div>
<p class="text-on-surface-variant font-body leading-relaxed line-clamp-4 italic">
                                "In the narrow lanes of old Lucknow, tucked between velvet weavers and perfume blenders, lived a small shop that brewed a chai so thick it felt like liquid silk. This is the story of how that recipe disappeared, and how we found it again in a dusty diary..."
                            </p>
<a class="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 font-label text-sm uppercase tracking-widest hover:brightness-110 transition-all" href="#">
                                Unfold the Story
                                <span class="material-symbols-outlined text-sm">arrow_right_alt</span>
</a>
</div>
</div>
</article>
<!-- Blog Post Grid (Masonry feel through column spans) -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Card 1 -->
<div class="bg-surface-container p-6 space-y-6 flex flex-col border border-outline-variant/5">
<div class="aspect-video overflow-hidden">
<img class="w-full h-full object-cover" data-alt="close up of tea leaves in an artisan's hands with morning sunlight and soft dust particles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-uk6PRU0_X2nnZj_6DzOchw1RhHjg-F6jl4onUWUv75CYzXSQdgaO5miFaEZMOxJOUMfVjQ-LpQc12CiwM9RrywCsvDpafRuPpyL_SDXzeaOlyT_bZZzdga7bI5ys5uO_-PVcFdA3le7qQjMRZvbXTOTgQXuzWNht77alRFZVXL82Kf0AOWbiSQF_caoeYEAu8Ayyf-MYaNeqsyoPXgtn61VBLPrTqT4VRabxGTRHjBOn6VPvtpMFiJ4wll03TtjzcEHebibQ8fQ"/>
</div>
<h3 class="font-headline text-2xl font-bold">Why Grandmother's Chai Always Tastes Better</h3>
<p class="text-on-surface-variant text-sm line-clamp-3">The alchemy of patience, a pinch of ginger, and the unconditional love that makes every sip transformative.</p>
<div class="mt-auto pt-4 flex justify-between items-center border-t border-outline-variant/10">
<span class="text-xs font-label text-secondary uppercase tracking-wider">Culture</span>
<span class="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-low p-6 space-y-6 flex flex-col border border-outline-variant/5">
<div class="aspect-video overflow-hidden">
<img class="w-full h-full object-cover" data-alt="vintage illustration of colonial era spice trade with botanical drawings of cinnamon, cloves and cardamom" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsrYnvELhrKQJZ-5xDL_bF0-Me6IIEhPKXFIeRSoveUnLlraalWL-FTeONUk38EEXDlf74zxqqoAMYrr2obN7WIHyQesLC0Daq_Z6MmeVGcDJe1kFqyeEPJfynjk3kI8MqbR89uU_9ZaKfEeU_pJVq3pR6OA0cg-I11dY4Ffg9mzC6Nh4Jl_ZPftzN9sdsyWR3hJsgR-WE9TYH7LR21kiZ_XNxpKf_tzfUYksiyXOhokqv4b94xNH7ah2iZqpinAlyGGUfD2XhkKY"/>
</div>
<h3 class="font-headline text-2xl font-bold">The 400-Year History of Masala Chai</h3>
<p class="text-on-surface-variant text-sm line-clamp-3">From Ayurvedic tonic to the global icon of Indian hospitality. A journey through the spice routes of antiquity.</p>
<div class="mt-auto pt-4 flex justify-between items-center border-t border-outline-variant/10">
<span class="text-xs font-label text-secondary uppercase tracking-wider">Archives</span>
<span class="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
</div>
<!-- Card 3 -->
<div class="md:col-span-2 bg-surface-container-high p-8 flex flex-col md:flex-row gap-8 items-center">
<div class="w-full md:w-1/3 aspect-[3/4] overflow-hidden">
<img class="w-full h-full object-cover" data-alt="breathtaking misty morning over terraced tea gardens in Darjeeling with workers in traditional attire" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2OTlBODU6CVdCWaD-XrY5DfR_9OUYi-XtMhesq-sPgsY2jfv_FWJ7ZlrDM1AMGXwbjTq-shqt1clU3lJXtFuJT8frApFt9vAgeAnSvVYUJZF58vO1yBru0U65RTY7QjNRpEbDBviFk4qfOI671ZyJE12ulD8FuucXpFKCfAO_wj8cVKCmlS3LkdSov8zK-8l2dLPs8V_1fjFT_OqYVNHvZ3_yqZwAMV3n4qsxp2v4P4bfCkrm8f0gmrY75HZQswbdGX3BbXooS0Y"/>
</div>
<div class="flex-1 space-y-4">
<span class="text-xs font-label text-primary uppercase tracking-[0.3em]">Photo Essay</span>
<h3 class="font-headline text-3xl font-bold">A Morning in the Darjeeling Tea Gardens</h3>
<p class="text-on-surface-variant italic">"The fog clings to the valley like a secret. Each bud is plucked before the first light can dry the dew. This is where the magic begins."</p>
<button class="text-secondary font-label text-sm uppercase border-b border-secondary/30 pb-1">View the Gallery</button>
</div>
</div>
<!-- Card 4 -->
<div class="bg-surface-container p-6 space-y-6 flex flex-col border border-outline-variant/5">
<h3 class="font-headline text-2xl font-bold">Chai vs Coffee: The Great Indian Debate</h3>
<div class="aspect-[4/3] bg-surface-dim flex items-center justify-center p-4">
<img class="w-full h-full object-contain mix-blend-multiply opacity-80" data-alt="artistic minimalist ink drawing of a tea cup and a coffee mug positioned as opposing forces" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ3Z14eelLlc1Gcb7fQDcroV2SmioNoL0JJn6EPSMJoG9CzDJQhaijmQBesW9wwTE_644ccK1IsU-VEDMy5tQ0Mu4PcYZ0CrKLbzvkmxR6Eh6RFp-sXzaNectR8NayU9KtJqEUZLY0tBlLUSQ7xyDKna_z-UE3q5kX6lyOFPSvUfs9BJ3PuM_QzE3mEyqmg42zC9478WoclU4Kt3vy5Yuc9DOc2NMcUaPeagA5skbdqKigO752uwgK7nVJlERrz1VSf8LdzDA8M0w"/>
</div>
<p class="text-on-surface-variant text-sm line-clamp-3">Is it a matter of palate or a matter of soul? We explore the societal divide between the filter-coffee south and the masala-chai north.</p>
<div class="mt-auto pt-4 flex justify-between items-center border-t border-outline-variant/10">
<span class="text-xs font-label text-secondary uppercase tracking-wider">Travel</span>
<span class="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
</div>
<!-- Card 5 -->
<div class="bg-surface-container-low p-6 space-y-6 flex flex-col border border-outline-variant/5">
<div class="aspect-video overflow-hidden">
<img class="w-full h-full object-cover" data-alt="artisan pottery hand shaping a traditional clay kulhad on a wooden wheel with rustic workshop background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC603pziXGoBY21JHodmEUWSVCtBfTgurbwQwzqIWjjUy1hImcFQPgHGfA13Ly0EmbAPywWGZ85pPJKd_E7Ejh3z25fIMO4rVlugl-ctBeHO9X-9SlMvlVhvWEjIarZw5cfW1YuiJx-xXqJ87W9fK0-zAHUiMiy62kKOOopX_QXKQOFGS1txqOXYfCvoUHT9pY8qZnsxjiEQhg7QmiqwN9obfbVX2L7mybdgYaU04nhy9-dgU2w8SVY19c0BaFoS95_yMay7Ax5sto"/>
</div>
<h3 class="font-headline text-2xl font-bold">The Sacred Art of the Kulhad</h3>
<p class="text-on-surface-variant text-sm line-clamp-3">Why clay changes everything. Exploring the mineral earthiness that only a kiln-fired cup can provide to your tea.</p>
<div class="mt-auto pt-4 flex justify-between items-center border-t border-outline-variant/10">
<span class="text-xs font-label text-secondary uppercase tracking-wider">Culture</span>
<span class="material-symbols-outlined text-on-surface-variant">arrow_outward</span>
</div>
</div>
</div>
</div>
<!-- Sidebar -->
<aside class="lg:col-span-4 space-y-12">
<!-- Search & Subscribe -->
<div class="bg-surface-container p-8 space-y-8 border-t-2 border-secondary/20">
<div class="space-y-4">
<h4 class="font-headline text-xl font-bold text-primary">Subscribe to Our Journal</h4>
<p class="text-xs font-body text-on-surface-variant">Receive weekly dispatches of tea wisdom, heritage recipes, and haveli updates.</p>
<div class="relative mt-4">
<input class="w-full bg-transparent border-none border-b border-outline p-2 focus:ring-0 focus:border-secondary transition-all font-body text-sm" placeholder="Email the Scribe..." type="email"/>
<button class="absolute right-0 bottom-2 text-secondary hover:text-primary transition-colors">
<span class="material-symbols-outlined">edit_square</span>
</button>
</div>
</div>
</div>
<!-- Categories -->
<div class="space-y-6 px-4">
<h4 class="font-headline text-xl font-bold border-b border-outline-variant/20 pb-2">Categories</h4>
<ul class="space-y-3 font-label text-sm text-on-surface-variant">
<li class="flex justify-between items-center group cursor-pointer">
<span class="group-hover:text-primary transition-colors">History &amp; Lore</span>
<span class="text-[10px] bg-surface-variant px-2 py-0.5">24</span>
</li>
<li class="flex justify-between items-center group cursor-pointer">
<span class="group-hover:text-primary transition-colors">Recipes</span>
<span class="text-[10px] bg-surface-variant px-2 py-0.5">18</span>
</li>
<li class="flex justify-between items-center group cursor-pointer">
<span class="group-hover:text-primary transition-colors">Travel Diaries</span>
<span class="text-[10px] bg-surface-variant px-2 py-0.5">12</span>
</li>
<li class="flex justify-between items-center group cursor-pointer">
<span class="group-hover:text-primary transition-colors">Health &amp; Ayurveda</span>
<span class="text-[10px] bg-surface-variant px-2 py-0.5">09</span>
</li>
<li class="flex justify-between items-center group cursor-pointer">
<span class="group-hover:text-primary transition-colors">Cultural Rituals</span>
<span class="text-[10px] bg-surface-variant px-2 py-0.5">15</span>
</li>
</ul>
</div>
<!-- Tags Cloud -->
<div class="space-y-6 px-4">
<h4 class="font-headline text-xl font-bold border-b border-outline-variant/20 pb-2">Popular Tags</h4>
<div class="flex flex-wrap gap-2">
<span class="text-[10px] font-label uppercase tracking-widest px-3 py-1.5 border border-outline/20 text-on-surface-variant hover:border-secondary hover:text-secondary cursor-pointer transition-all">Masala Chai</span>
<span class="text-[10px] font-label uppercase tracking-widest px-3 py-1.5 border border-outline/20 text-on-surface-variant hover:border-secondary hover:text-secondary cursor-pointer transition-all">Darjeeling</span>
<span class="text-[10px] font-label uppercase tracking-widest px-3 py-1.5 border border-outline/20 text-on-surface-variant hover:border-secondary hover:text-secondary cursor-pointer transition-all">Kulhad</span>
<span class="text-[10px] font-label uppercase tracking-widest px-3 py-1.5 border border-outline/20 text-on-surface-variant hover:border-secondary hover:text-secondary cursor-pointer transition-all">Ayurveda</span>
<span class="text-[10px] font-label uppercase tracking-widest px-3 py-1.5 border border-outline/20 text-on-surface-variant hover:border-secondary hover:text-secondary cursor-pointer transition-all">Monsoon Tea</span>
<span class="text-[10px] font-label uppercase tracking-widest px-3 py-1.5 border border-outline/20 text-on-surface-variant hover:border-secondary hover:text-secondary cursor-pointer transition-all">Chai pe Charcha</span>
<span class="text-[10px] font-label uppercase tracking-widest px-3 py-1.5 border border-outline/20 text-on-surface-variant hover:border-secondary hover:text-secondary cursor-pointer transition-all">Hand-bound</span>
</div>
</div>
<!-- Hand-drawn Illustration Decor -->
<div class="pt-12 px-8">
<img class="w-full opacity-60 grayscale brightness-110 sepia-[.3]" data-alt="delicate hand-drawn botanical illustration of a tea flower and branch in black ink on aged paper" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChxENkj2vdbzYlVysjSeEelTS7E_-ouZGn7zEf2KsUqn_8i4M9SMienDwtT1SOMnOpYyRJymFoLfaAfLpdnnX6ozXdJ5M-sZlwFNz6tVeIpyk-HoAw9v0_8zka6mQboqNAGnSh7fWIvIgl7eJbuvsY2DFhKdWn43zIzB9GY22Aq_9WkDr0GO4fDacEzPykpZ9qQC5et0cEL0PH8Hd3qSUQjSgS49kSB7vtX8CdV2zsx1X__WwoPCYEF2j7i37VQ2mMkF37AGAZFIQ"/>
</div>
</aside>
</div>
<!-- Chai pe Charcha Section -->
<section class="mt-24 bg-surface-container-highest p-12 border-2 border-dashed border-outline/20 relative overflow-hidden">
<div class="absolute -top-12 -right-12 opacity-5 scale-150 rotate-12">
<span class="material-symbols-outlined text-[300px]">forum</span>
</div>
<div class="relative z-10 max-w-4xl mx-auto text-center space-y-8">
<h2 class="font-headline text-5xl font-extrabold text-primary">Chai pe Charcha</h2>
<h3 class="font-label text-sm uppercase tracking-[0.4em] text-secondary">The Community Corner</h3>
<p class="text-on-surface-variant font-body text-lg italic leading-relaxed">
                    Every cup has a story, and we want to hear yours. Share your family's secret recipes, your most cherished tea-time memories, or a photo from your favorite tea stall. 
                </p>
<div class="grid md:grid-cols-3 gap-6 pt-6">
<div class="bg-surface p-6 shadow-sm border border-outline/5 hover:translate-y-[-4px] transition-transform">
<span class="material-symbols-outlined text-secondary text-3xl mb-4">stylus</span>
<h4 class="font-headline font-bold text-on-surface">Submit Story</h4>
<p class="text-xs mt-2 text-on-surface-variant">Send us your heritage essays or poetry.</p>
</div>
<div class="bg-surface p-6 shadow-sm border border-outline/5 hover:translate-y-[-4px] transition-transform">
<span class="material-symbols-outlined text-secondary text-3xl mb-4">menu_book</span>
<h4 class="font-headline font-bold text-on-surface">Share Recipe</h4>
<p class="text-xs mt-2 text-on-surface-variant">Unlock your family’s tea secrets.</p>
</div>
<div class="bg-surface p-6 shadow-sm border border-outline/5 hover:translate-y-[-4px] transition-transform">
<span class="material-symbols-outlined text-secondary text-3xl mb-4">photo_library</span>
<h4 class="font-headline font-bold text-on-surface">Tea Gallery</h4>
<p class="text-xs mt-2 text-on-surface-variant">Upload your aesthetic tea rituals.</p>
</div>
</div>
</div>
</section>
</main>` }} />
    );
}
