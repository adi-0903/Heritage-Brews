import React from 'react';

export default function Gifts() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{ __html: `<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
            color: #7b5800;
        }
        body {
            background-color: #fcf9ee;
            color: #1c1c15;
            font-family: 'Noto Serif', serif;
        }
        .mughal-pattern {
            background-image: radial-gradient(#e5e2d8 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .hero-gradient {
            background: linear-gradient(to bottom, rgba(28, 28, 21, 0.4), rgba(28, 28, 21, 0.9));
        }
        .ornate-title::before, .ornate-title::after {
            content: '❦';
            margin: 0 20px;
            color: #F4C430;
            font-size: 0.8em;
        }
        .hamper-card-border {
            border: 1px solid #7b5800;
            outline: 4px solid #f1eee3;
            outline-offset: -8px;
        }
    </style><main class="min-h-screen">
<!-- Tradition & Curations Hero Section -->
<section class="relative h-[650px] flex items-center overflow-hidden">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover grayscale-[0.2] sepia-[0.3]" data-alt="close-up of hands exchanging beautiful traditional indian gifts, brassware, and sweets during a festive occasion" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQoOk4eNkolhD-sQuFLnnHU_9nHq3p1QzAriGa4p0Ld_HQaKh827AGncNSTBjnDHk9F_rdYaj7tD7OOw9yZVYh-rDmaud6SdvhZc2rMsfKyN7j-l3ep79cgftM0Hv_sKShguEIr_EcmDem8GJK9DAXUiZ_1l2HvKrh2nRtolNB-gLf7rrYKXR_kE71-JD1KVv0OA93LarxK87olYzDmv45yY3ldVjdOTo6mRwIFfp9ZPrOPEe_N-vqQa4zUzL1NQKtTSigjMXheo"/>
<div class="absolute inset-0 hero-gradient"></div>
</div>
<div class="relative z-10 px-8 md:px-24 w-full flex flex-col items-center text-center">
<span class="text-[#F4C430] font-headline text-xl tracking-[0.3em] uppercase mb-4 opacity-90">The Art of Giving</span>
<h1 class="text-5xl md:text-7xl font-headline text-surface font-bold tracking-tighter leading-tight mb-8 max-w-4xl">
                    Traditions Curated. <br/>Memories Preserved.
                </h1>
<div class="w-24 h-[2px] bg-[#F4C430] mb-8"></div>
<p class="text-xl md:text-2xl text-surface-container font-body italic opacity-90 max-w-3xl leading-relaxed">
                    In our heritage, to gift is to share a piece of your soul. We've preserved this ancient art by hand-weaving stories of warmth, prosperity, and respect into each of our artisanal hampers.
                </p>
</div>
</section>

<!-- Gifts & Hampers Section -->
<section class="py-32 bg-[#A52A2A] relative overflow-hidden">
<!-- Decorative background patterns -->
<div class="absolute inset-0 opacity-10 pointer-events-none mughal-pattern" style="background-image: radial-gradient(#F4C430 1px, transparent 1px);"></div>
<div class="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black/20 to-transparent"></div>
<div class="max-w-screen-2xl mx-auto px-8 relative z-10">
<div class="text-center mb-20">
<h2 class="text-5xl md:text-7xl font-headline text-[#F4C430] font-bold tracking-tight ornate-title">
                उपहार — Gift a Tradition
            </h2>
<div class="w-48 h-[2px] bg-[#F4C430]/40 mx-auto mt-8 flex items-center justify-center">
<span class="bg-[#A52A2A] px-4">
<span class="material-symbols-outlined text-[#F4C430]" style="font-variation-settings: 'FILL' 1;">card_giftcard</span>
</span>
</div>
</div>
<!-- Hamper Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
<!-- Hamper Card 1 -->
<div class="bg-surface flex flex-col h-full hamper-card-border group">
<div class="relative h-64 overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="royal diwali tea gift hamper with brass cups and festive decorations" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQoOk4eNkolhD-sQuFLnnHU_9nHq3p1QzAriGa4p0Ld_HQaKh827AGncNSTBjnDHk9F_rdYaj7tD7OOw9yZVYh-rDmaud6SdvhZc2rMsfKyN7j-l3ep79cgftM0Hv_sKShguEIr_EcmDem8GJK9DAXUiZ_1l2HvKrh2nRtolNB-gLf7rrYKXR_kE71-JD1KVv0OA93LarxK87olYzDmv45yY3ldVjdOTo6mRwIFfp9ZPrOPEe_N-vqQa4zUzL1NQKtTSigjMXheo"/>
<div class="absolute top-4 left-4 bg-[#F4C430] text-[#410000] text-[10px] font-bold uppercase tracking-widest px-3 py-1">Limited Edition</div>
</div>
<div class="p-8 flex flex-col flex-grow bg-[#fcf9ee]">
<div class="flex justify-between items-start mb-4">
<h3 class="text-2xl font-headline font-bold text-[#890000]">Diwali Shahi Hamper</h3>
<span class="text-xl font-headline font-bold text-secondary">₹2499</span>
</div>
<p class="text-on-surface-variant font-body text-sm leading-relaxed flex-grow italic">
                        Curated Darjeeling teas, brass kulhads, handmade Nankhatai tin, and artisanal diyas.
                    </p>
<button class="mt-8 w-full bg-[#890000] text-white py-4 font-headline text-lg tracking-wide hover:bg-[#ac2014] transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-white text-sm">shopping_cart</span> Add to Cart
                    </button>
</div>
</div>
<!-- Hamper Card 2 -->
<div class="bg-surface flex flex-col h-full hamper-card-border group">
<div class="relative h-64 overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="luxurious wedding tea gift box with silver plated set and satin ribbons" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIL4QLPQuNLOF8wO_8E-AZCu6-yBTVP1hmi8sHPCFgSBeSdok-816Cjw452Tgg3oQFHBd7ZYObXQl6zq5pR5sjNdnY0XfjugU4FaktWsZJG8TGkmWoNXPEftD9dVp8z1hRpPaOlZSZbKNsxhyIj6Ex-bXUURxDBoSbUFDRCePZ_RY9hJ7DDpvDK_aFlKj5Y6PawSPfk3c0M1c7rhxUpKoGg5FzxPZU6QDnAda7k5IS-lnqg_3OdrNVd0OTzA_Alr1YhLXqZIVxuXY"/>
<div class="absolute top-4 left-4 bg-[#F4C430] text-[#410000] text-[10px] font-bold uppercase tracking-widest px-3 py-1">Premium Shagun</div>
</div>
<div class="p-8 flex flex-col flex-grow bg-[#fcf9ee]">
<div class="flex justify-between items-start mb-4">
<h3 class="text-2xl font-headline font-bold text-[#890000]">Wedding Shagun Box</h3>
<span class="text-xl font-headline font-bold text-secondary">₹3999</span>
</div>
<p class="text-on-surface-variant font-body text-sm leading-relaxed flex-grow italic">
                        Premium Assam gold tips, silver-plated tea set, mithai assortment, and royal satin wrapping.
                    </p>
<button class="mt-8 w-full bg-[#890000] text-white py-4 font-headline text-lg tracking-wide hover:bg-[#ac2014] transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-white text-sm">shopping_cart</span> Add to Cart
                    </button>
</div>
</div>
<!-- Hamper Card 3 -->
<div class="bg-surface flex flex-col h-full hamper-card-border group">
<div class="relative h-64 overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="raksha bandhan gift set with tea and traditional sweets" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFczNMz69hyP6p5rLBLBmGY2xVgPYPoBgnG87nujJlAUIwJfIb6UOva6gYwyVgvgW62PK2AWQt18lIZmeyoeT--xOrtVQJ9I0drGb9lIPoq6IZ_B178xsw04FGpGIu7TKi9X3Xlxn4n3id47vdA7JX_FuglXtrYBlnL_PbQQFpuj8G3Sr5A2w_b1FIt3hUrjPyQRQ5SmRCDE1bEH-TfCjF61ko15vuVqL7ij9xrSDT3CoZDFc3z0hyZHz5b2MyZd0cpb2bZTjLLf8"/>
<div class="absolute top-4 left-4 bg-[#F4C430] text-[#410000] text-[10px] font-bold uppercase tracking-widest px-3 py-1">Sibling Love</div>
</div>
<div class="p-8 flex flex-col flex-grow bg-[#fcf9ee]">
<div class="flex justify-between items-start mb-4">
<h3 class="text-2xl font-headline font-bold text-[#890000]">Rakhi Special</h3>
<span class="text-xl font-headline font-bold text-secondary">₹1299</span>
</div>
<p class="text-on-surface-variant font-body text-sm leading-relaxed flex-grow italic">
                        Masala chai blend, traditional namkeen, and an artisan hand-woven rakhi.
                    </p>
<button class="mt-8 w-full bg-[#890000] text-white py-4 font-headline text-lg tracking-wide hover:bg-[#ac2014] transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-white text-sm">shopping_cart</span> Add to Cart
                    </button>
</div>
</div>
<!-- Hamper Card 4 -->
<div class="bg-surface flex flex-col h-full hamper-card-border group">
<div class="relative h-64 overflow-hidden">
<img class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-alt="sophisticated corporate gift box with coffee and brass tumbler" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBLcQTXP9VNBDZ00otSVJLnbhNuJp2gfN_Psmpm-N8lJcOlxUNxp1_fMQUAg5nRkpfUv8i7p1iV62Tz3_aaju-PjNb1Hxo6H9wHH1xG2X1YgWiISZkT-I6IKsFUm4LWpIBiv2Smb-BFgBPTGlWRg3LlVS_L3EyAiOb1CQLrcqZKk62YobymzaRnt5FgqUTkV9CszZ82alJyTWeRxBQvq0nFjITrc-TibBZqzPvkv86nyotzhf6Pfd9-avd1IChhyFK8POTT2YWHge4"/>
<div class="absolute top-4 left-4 bg-[#F4C430] text-[#410000] text-[10px] font-bold uppercase tracking-widest px-3 py-1">Corporate Heritage</div>
</div>
<div class="p-8 flex flex-col flex-grow bg-[#fcf9ee]">
<div class="flex justify-between items-start mb-4">
<h3 class="text-2xl font-headline font-bold text-[#890000]">Corporate Box</h3>
<span class="text-xl font-headline font-bold text-secondary">₹1799</span>
</div>
<p class="text-on-surface-variant font-body text-sm leading-relaxed flex-grow italic">
                        Authentic filter coffee, artisan cookies, and a branded heavy brass tumbler.
                    </p>
<button class="mt-8 w-full bg-[#890000] text-white py-4 font-headline text-lg tracking-wide hover:bg-[#ac2014] transition-colors flex items-center justify-center gap-2">
<span class="material-symbols-outlined text-white text-sm">shopping_cart</span> Add to Cart
                    </button>
</div>
</div>
</div>
<div class="mt-20 text-center relative z-10 w-full flex justify-center pb-12">
<button class="px-16 py-5 border-2 border-[#F4C430] text-[#F4C430] bg-[#890000] font-headline text-2xl font-bold hover:bg-[#F4C430] hover:text-[#410000] transition-all duration-300 shadow-[0_0_20px_rgba(244,196,48,0.2)] hover:shadow-[0_0_30px_rgba(244,196,48,0.4)] relative overflow-hidden group">
                <span class="relative z-10">Customize Your Hamper</span>
            </button>
</div>
<!-- Section Banner -->
<div class="mt-12 border-t border-[#F4C430]/30 pt-8 text-center relative z-10">
<p class="text-[#F4C430]/90 font-body italic text-[13px] tracking-[0.2em] uppercase font-semibold pb-8">
                Complementary royal wrapping in handmade paper and eco-friendly jute packaging.
            </p>
</div>
</div>
<!-- Decorative side pattern -->
<div class="absolute top-0 right-0 w-32 h-full opacity-5 pointer-events-none mughal-pattern" style="background-image: radial-gradient(#F4C430 1px, transparent 1px);"></div>
</section>
</main>` }} />
    );
}
