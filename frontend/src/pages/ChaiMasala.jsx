import React from 'react';

export default function ChaiMasala() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: `<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .parchment-texture {
            background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise' x='0' y='0'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .custom-slider {
            -webkit-appearance: none;
            width: 100%;
            height: 2px;
            background: #e0bfbc;
            outline: none;
        }
        .custom-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 12px;
            height: 12px;
            background: #7b5800;
            cursor: pointer;
            border-radius: 0;
        }
        .mughal-border {
            border: 12px solid transparent;
            border-image: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0l5 15h15l-12 9 5 16-13-10-13 10 5-16-12-9h15z' fill='%23e0bfbc' fill-opacity='0.2'/%3E%3C/svg%3E") 30 repeat;
        }
    </style><main class="max-w-[1440px] mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-12" id="market">
<!-- Interactive Spice Market -->
<section class="lg:col-span-8">
<div class="mb-12">
<h2 class="font-headline text-4xl mb-2 text-on-surface">The Ten Essentials</h2>
<div class="h-0.5 w-24 bg-secondary"></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
<!-- Spice Cards (Iterative) -->
<script>
                    const spices = [
                        {en: "Elaichi", hi: "इलायची", desc: "Green Cardamom • Sweet & Floral"},
                        {en: "Adrak", hi: "अदरक", desc: "Dried Ginger • Sharp & Zesty"},
                        {en: "Laung", hi: "लौंग", desc: "Cloves • Intensely Pungent"},
                        {en: "Dalchini", hi: "दालचीनी", desc: "Cinnamon • Woody & Sweet"},
                        {en: "Kali Mirch", hi: "काली मिर्च", desc: "Black Pepper • Slow Heat"},
                        {en: "Star Anise", hi: "चक्र फूल", desc: "Aniseed • Licorice & Warmth"},
                        {en: "Saunf", hi: "सौंफ", desc: "Fennel • Cooling & Refreshing"},
                        {en: "Jaiphal", hi: "जायफल", desc: "Nutmeg • Nutty & Sophisticated"},
                        {en: "Tulsi", hi: "तुलसी", desc: "Holy Basil • Peppery & Sacred"},
                        {en: "Kesar", hi: "केसर", desc: "Saffron • Earthy & Regal"}
                    ];
                </script>
<!-- Spice Card 1 -->
<div class="bg-surface-container-low p-8 relative group hover:bg-surface-container-lowest transition-colors duration-500">
<div class="flex justify-between items-start mb-6">
<div>
<span class="text-xs tracking-widest uppercase text-secondary font-bold">Elaichi</span>
<h3 class="font-headline text-3xl">इलायची</h3>
</div>
<span class="material-symbols-outlined text-4xl text-primary/20 group-hover:text-primary transition-colors">local_florist</span>
</div>
<p class="text-on-surface-variant text-sm mb-8 italic">Green Cardamom • Sweet &amp; Floral notes from the Ghats.</p>
<div class="space-y-4">
<div class="flex justify-between text-[10px] uppercase tracking-tighter text-outline">
<span>Mild</span>
<span>Medium</span>
<span>Strong</span>
</div>
<input class="custom-slider" max="100" min="0" type="range" value="30"/>
</div>
</div>
<!-- Spice Card 2 -->
<div class="bg-surface-container-low p-8 relative group hover:bg-surface-container-lowest transition-colors duration-500">
<div class="flex justify-between items-start mb-6">
<div>
<span class="text-xs tracking-widest uppercase text-secondary font-bold">Adrak</span>
<h3 class="font-headline text-3xl">अदरक</h3>
</div>
<span class="material-symbols-outlined text-4xl text-primary/20 group-hover:text-primary transition-colors">eco</span>
</div>
<p class="text-on-surface-variant text-sm mb-8 italic">Sun-dried Ginger • Sharp heat and citrus zest.</p>
<div class="space-y-4">
<div class="flex justify-between text-[10px] uppercase tracking-tighter text-outline">
<span>Mild</span>
<span>Medium</span>
<span>Strong</span>
</div>
<input class="custom-slider" max="100" min="0" type="range" value="60"/>
</div>
</div>
<!-- Spice Card 3 -->
<div class="bg-surface-container p-8 relative group hover:bg-surface-container-lowest transition-colors duration-500">
<div class="flex justify-between items-start mb-6">
<div>
<span class="text-xs tracking-widest uppercase text-secondary font-bold">Laung</span>
<h3 class="font-headline text-3xl">लौंग</h3>
</div>
<span class="material-symbols-outlined text-4xl text-primary/20 group-hover:text-primary transition-colors">abc</span>
</div>
<p class="text-on-surface-variant text-sm mb-8 italic">Cloves • Intensely pungent and deeply aromatic.</p>
<div class="space-y-4">
<div class="flex justify-between text-[10px] uppercase tracking-tighter text-outline">
<span>Mild</span>
<span>Medium</span>
<span>Strong</span>
</div>
<input class="custom-slider" max="100" min="0" type="range" value="15"/>
</div>
</div>
<!-- Spice Card 4 -->
<div class="bg-surface-container p-8 relative group hover:bg-surface-container-lowest transition-colors duration-500">
<div class="flex justify-between items-start mb-6">
<div>
<span class="text-xs tracking-widest uppercase text-secondary font-bold">Dalchini</span>
<h3 class="font-headline text-3xl">दालचीनी</h3>
</div>
<span class="material-symbols-outlined text-4xl text-primary/20 group-hover:text-primary transition-colors">forest</span>
</div>
<p class="text-on-surface-variant text-sm mb-8 italic">Ceylon Cinnamon • Woody sweetness and warmth.</p>
<div class="space-y-4">
<div class="flex justify-between text-[10px] uppercase tracking-tighter text-outline">
<span>Mild</span>
<span>Medium</span>
<span>Strong</span>
</div>
<input class="custom-slider" max="100" min="0" type="range" value="45"/>
</div>
</div>
<!-- More spices for visual richness -->
<div class="bg-surface-container-low p-8 relative group hover:bg-surface-container-lowest transition-colors duration-500">
<div class="flex justify-between items-start mb-6">
<div>
<span class="text-xs tracking-widest uppercase text-secondary font-bold">Saunf</span>
<h3 class="font-headline text-3xl">सौंफ</h3>
</div>
<span class="material-symbols-outlined text-4xl text-primary/20 group-hover:text-primary transition-colors">filter_vintage</span>
</div>
<p class="text-on-surface-variant text-sm mb-8 italic">Fennel • Refreshing licorice finish to ground the blend.</p>
<div class="space-y-4">
<div class="flex justify-between text-[10px] uppercase tracking-tighter text-outline">
<span>Mild</span>
<span>Medium</span>
<span>Strong</span>
</div>
<input class="custom-slider" max="100" min="0" type="range" value="20"/>
</div>
</div>
<div class="bg-surface-container-low p-8 relative group hover:bg-surface-container-lowest transition-colors duration-500">
<div class="flex justify-between items-start mb-6">
<div>
<span class="text-xs tracking-widest uppercase text-secondary font-bold">Kesar</span>
<h3 class="font-headline text-3xl">केसर</h3>
</div>
<span class="material-symbols-outlined text-4xl text-primary/20 group-hover:text-primary transition-colors">diamond</span>
</div>
<p class="text-on-surface-variant text-sm mb-8 italic">Kashmiri Saffron • Earthy, regal honey-like notes.</p>
<div class="space-y-4">
<div class="flex justify-between text-[10px] uppercase tracking-tighter text-outline">
<span>Mild</span>
<span>Medium</span>
<span>Strong</span>
</div>
<input class="custom-slider" max="100" min="0" type="range" value="10"/>
</div>
</div>
</div>
</section>
<!-- Live Blend Preview Panel -->
<aside class="lg:col-span-4 relative">
<div class="sticky top-32 bg-surface-container p-8 border-l-[0.5px] border-outline-variant/15 shadow-2xl">
<div class="text-center mb-10">
<span class="text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">Live Recipe</span>
<h2 class="font-headline text-4xl italic">Grandmother's <br/>Evening Chai</h2>
</div>
<!-- Mortar and Pestle Visualization Area -->
<div class="relative w-full aspect-square flex items-center justify-center mb-10 bg-surface-container-low overflow-hidden">
<div class="absolute inset-0 opacity-10">
<img alt="pattern" class="w-full h-full object-cover" data-alt="monochrome silhouette pattern of Mughal floral geometric art on parchment background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPs5aXX-VJqnlDM55JghM5bdbZBV6FXZTtVOUsJAJaiqJigLSW2ULdCLutap3hoLXanW6RU-Qge0WypcFuYNZ5ez6rvWfLzRGdZ8vl_RYUUMU0acPuVglNwWcD7XogGDUCCMscUBoODZgQZ2fqfM2hVqTYTMOf-pKAE_NVToBGkmZOewAlEHT5_VTyTM0kDc2rfjL5n3g5WqWlqKVMuHM4bBdrPpH3VBPrisuz3W94tewnjALFiSHzPuVZ1Bw0TRBna30-ZbdKAd4"/>
</div>
<span class="material-symbols-outlined text-9xl text-on-surface-variant/40" style="font-variation-settings: 'FILL' 1;">stockpot</span>
<!-- Dynamic Spice Particles - Simulated -->
<div class="absolute w-2 h-2 bg-primary rounded-full top-1/2 left-1/3 blur-[1px]"></div>
<div class="absolute w-3 h-3 bg-secondary rounded-full bottom-1/3 right-1/4 blur-[1px]"></div>
<div class="absolute w-2 h-2 bg-on-tertiary-container rounded-full top-1/3 right-1/2 blur-[1px]"></div>
</div>
<div class="space-y-6">
<div class="flex flex-wrap gap-2">
<span class="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">Spicy</span>
<span class="px-3 py-1 bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-widest">Floral</span>
<span class="px-3 py-1 bg-tertiary/10 text-tertiary text-[10px] font-bold uppercase tracking-widest">Regal</span>
</div>
<div class="border-t border-outline-variant/20 pt-6">
<div class="flex justify-between items-end mb-1">
<span class="text-xs uppercase font-bold tracking-widest text-on-surface-variant">Intensity Meter</span>
<span class="text-xs font-bold text-secondary">Aromatic</span>
</div>
<div class="h-1 w-full bg-surface-container-high relative">
<div class="h-full bg-secondary w-3/4"></div>
</div>
</div>
<div class="pt-4">
<button class="w-full bg-primary text-on-primary py-4 uppercase font-bold text-xs tracking-[0.2em] hover:bg-on-primary-fixed-variant transition-all">
                            Save This Recipe
                        </button>
</div>
</div>
</div>
</aside>
</main>` }} />
    );
}
