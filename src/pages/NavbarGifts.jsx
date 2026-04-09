import React from 'react';

export default function NavbarGifts() {
    return (
        <main className="min-h-screen" dangerouslySetInnerHTML={{ __html: `
<!-- Hero Section -->
<section class="relative h-[921px] flex items-center overflow-hidden">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover grayscale-[0.2] sepia-[0.2]" data-alt="atmospheric close-up of a traditional brass samovar and clay kulhad cups on a weathered wooden table with warm cinematic lighting and rising steam" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGTEiFgabZgCKCuJN7ZeY-l03Za4ZyVQcDA0blVJXqa5iFkNEliRrTVNB2j-6P-qjDrRek19xAhsEkXKu-pvC-L_ExwEX1P55NAJAoT0vTUADKklDWBsHQqU5Q42gTH_s39vXs5PQqzqZUJwstJvAAPzzOaWOZxAVbYZ714Pz122iPSgnBERTjfuvrgbaURhgTQd9rrmp3RneTIOyzhpzMxQqeqHC4cami4fStiI76iKGRtdkVzPSTHxpbY85vvd6YvG7Ny1ZNRo"/>
<div class="absolute inset-0 hero-gradient"></div>
</div>
<div class="relative z-10 px-8 md:px-24 max-w-4xl">
<h1 class="text-6xl md:text-8xl font-headline text-surface font-bold tracking-tighter leading-none mb-6">
                    The Living Archive <br/>of Indian Brews.
                </h1>
<p class="text-xl md:text-2xl text-surface-container font-body italic opacity-90 max-w-xl">
                    Steeped in tradition, served with soul. A sensory journey through the timeless tea and coffee culture of the subcontinent.
                </p>
<div class="mt-12 flex gap-6">
<button class="bg-primary text-on-primary px-10 py-4 font-headline text-xl flex items-center gap-3 border border-primary hover:bg-on-primary-fixed-variant transition-colors">
                        Explore the Treasury
                        <span class="material-symbols-outlined text-on-primary" style="font-variation-settings: 'FILL' 1;">arrow_right_alt</span>
</button>
</div>
</div>
</section>
<!-- Philosophy Section -->
<section class="py-32 px-8 bg-surface overflow-hidden relative">
<div class="absolute inset-x-8 top-8 bottom-8 border-[12px] border-outline-variant/10 pointer-events-none"></div>
<div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
<div class="relative group">
<div class="absolute -top-6 -left-6 w-full h-full bg-surface-container-high -z-10"></div>
<img class="w-full grayscale-[0.1] hover:grayscale-0 transition-all duration-700" data-alt="artisanal slow-boiling masala chai in a large copper vessel with whole spices floating on the surface in a dim rustic kitchen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDraCS-zpMm2C35ARGUrrmdjOzYvxo-xYnqD8eTkRJ6XCFn16Ipip60Znyg0fZOVzi3QW2tDqVfvWYRnP3gwwiwM0oh-_hqRCb_q0jW-6gRMxDOnUpMeMSJk_gBLZaYdIHWnuPzCDyxQqA3sqy9NXtVcu3jdW9a935RTqp1Em15XDuAXyztVhQ5tt0WkbJoWWopdPOwKM39IW3tZhg1RJUh0l3RXhDFB6QgJCeUpxW_2MDHS-O2oHNlt782CwX-Gh42PCgMWhEbSek"/>
</div>
<div class="flex flex-col gap-8">
<span class="text-secondary font-headline text-xl tracking-widest uppercase">Since 1892</span>
<h2 class="text-5xl md:text-6xl font-headline text-on-background font-bold tracking-tight">
                        Brewed by the Ancients
                    </h2>
<div class="flex flex-col gap-6 text-on-surface-variant font-body text-lg leading-relaxed">
<p>
                            At Heritage Tea Co., we reject the rush of the modern age. Our masala chai is slow-boiled for hours in heavy brass vessels, allowing the essence of hand-crushed cardamom and ginger to fully integrate with the robust leaves.
                        </p>
<p>
                            Our South Indian Filter Coffee is a ritual of patience. We source beans exclusively from the shade-grown estates of Coorg, blended with a precise ratio of chicory, then decocted through traditional brass filters for a velvet finish.
                        </p>
<p>
                            Every spice—from the star anise of Kerala to the saffron of Kashmir—is ethically sourced directly from heritage farmers who honor the land as their ancestors did.
                        </p>
</div>
</div>
</div>
</section>
<!-- New Section: Prabhat Chai Subscription -->
<section class="py-24 bg-[#f1eee3] relative overflow-hidden">
<div class="absolute top-0 right-0 w-64 h-64 mughal-pattern opacity-10"></div>
<div class="max-w-screen-xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
<div class="order-2 md:order-1 flex flex-col gap-6">
<div class="flex items-center gap-3">
<span class="w-12 h-[1px] bg-secondary"></span>
<span class="text-secondary font-headline font-bold uppercase tracking-widest text-sm">Morning Rituals</span>
</div>
<h2 class="text-5xl md:text-6xl font-headline text-on-background font-bold tracking-tight">Prabhat Chai Subscription</h2>
<p class="text-on-surface-variant font-body text-lg leading-relaxed">
                        Start your day with the authentic spirit of the subcontinent. Every morning, we deliver a fresh, steaming decoction of our signature tea in sustainable, sun-dried <span class="text-secondary font-bold">mud kulhads</span>, preserving the earthy essence that no ceramic can replicate.
                    </p>
<ul class="flex flex-col gap-4 mb-4">
<li class="flex items-center gap-3 font-headline text-lg italic text-on-surface">
<span class="material-symbols-outlined text-secondary">check_circle</span>
                            Delivered fresh in traditional mud kulhads
                        </li>
<li class="flex items-center gap-3 font-headline text-lg italic text-on-surface">
<span class="material-symbols-outlined text-secondary">check_circle</span>
                            Small-batch brew in heritage brassware
                        </li>
<li class="flex items-center gap-3 font-headline text-lg italic text-on-surface">
<span class="material-symbols-outlined text-secondary">check_circle</span>
                            Flexible plans starting from ₹1,299/month
                        </li>
</ul>
<div>
<button class="bg-primary text-on-primary px-12 py-4 font-headline text-xl tracking-wide hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-95">
                            Subscribe for Your Morning
                        </button>
</div>
</div>
<div class="order-1 md:order-2 relative">
<div class="absolute inset-0 bg-secondary/5 -skew-x-6"></div>
<img alt="Fresh morning tea in clay kulhads with steam rising" class="w-full h-[500px] object-cover border-8 border-white shadow-2xl relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyGTEiFgabZgCKCuJN7ZeY-l03Za4ZyVQcDA0blVJXqa5iFkNEliRrTVNB2j-6P-qjDrRek19xAhsEkXKu-pvC-L_ExwEX1P55NAJAoT0vTUADKklDWBsHQqU5Q42gTH_s39vXs5PQqzqZUJwstJvAAPzzOaWOZxAVbYZ714Pz122iPSgnBERTjfuvrgbaURhgTQd9rrmp3RneTIOyzhpzMxQqeqHC4cami4fStiI76iKGRtdkVzPSTHxpbY85vvd6YvG7Ny1ZNRo"/>
<div class="absolute -bottom-8 -left-8 bg-surface-container-high p-6 z-20 shadow-xl border border-outline-variant/30 hidden md:block">
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-4xl text-secondary">eco</span>
<div>
<h4 class="font-headline font-bold">Zero-Waste</h4>
<p class="text-sm italic opacity-70">Biodegradable clay delivery</p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Menu Section: Bento Grid -->
<section class="py-32 bg-surface-container-low">
<div class="max-w-screen-2xl mx-auto px-8">
<div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
<div>
<h2 class="text-5xl md:text-7xl font-headline text-on-background font-extrabold tracking-tighter">
                            The Traditional Treasury
                        </h2>
<p class="text-on-surface-variant text-xl italic font-body mt-4">Handcrafted blends available for your home collection.</p>
</div>
<div class="text-secondary font-headline text-2xl flex items-center gap-2 border-b border-secondary/30 pb-2 cursor-pointer hover:border-secondary transition-all">
                        View Full Menu <span class="material-symbols-outlined">menu_book</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[900px]">
<!-- Bento Item 1: Tea -->
<div class="md:col-span-8 bg-surface-container-lowest p-12 flex flex-col justify-between group relative overflow-hidden">
<div class="flex justify-between items-start relative z-10">
<div>
<div class="flex items-center gap-3 mb-2">
<h3 class="text-4xl font-headline text-primary font-bold">Zaffrani Masala Chai</h3>
<span class="bg-secondary/10 text-secondary text-[10px] uppercase tracking-widest font-bold px-2 py-1 flex items-center gap-1">
<span class="material-symbols-outlined text-xs">auto_awesome</span> Perfect Pairing: Mathri
                                    </span>
</div>
<p class="text-on-surface-variant mt-2 max-w-sm">Premium Assam CTC blend infused with hand-picked Saffron threads, whole spices, and caramelized milk.</p>
</div>
<div class="flex flex-col items-end gap-4">
<span class="text-3xl font-headline text-secondary">₹245</span>
<button class="bg-primary text-on-primary px-6 py-2 font-headline text-lg flex items-center gap-2 hover:bg-on-primary-fixed-variant transition-colors group/btn">
<span class="material-symbols-outlined text-on-primary text-sm">shopping_cart</span>
                                    Add to Cart
                                </button>
</div>
</div>
<div class="mt-8 overflow-hidden h-[400px] relative">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" data-alt="close-up of golden saffron tea being poured into a textured clay cup with spices scattered around" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3_j-P7KXR7VuVbIgfcuj-loCfFhZJexyVFruVoFSSSSYKmj2VAK-d5KBGAy7qNamrP7jOj0h2-IEii1pmvazveAfVn61So-oT-fyVNUGqhae9yfIPJXnyQYYF-Xt-3tY1g3j5dujYc9rVKraxnC6njUSuCL5FYrXdCguTByIO0U-X5cRiE5JiaefAKbcpryf1VoUOVHeTJFLP2PziC-2ihHYa33ReE7G1MLuc8NhOOecrY4FWPwqgi6bun1DtcsU4P7-0lysL9eU"/>
</div>
</div>
<!-- Bento Item 2: Coffee -->
<div class="md:col-span-4 bg-tertiary-container text-on-tertiary p-12 flex flex-col justify-between group">
<div class="flex flex-col gap-4">
<div class="flex justify-between items-start">
<span class="text-secondary-container font-headline text-lg">Specialty Brew</span>
<span class="bg-white/10 text-white/80 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full border border-white/20">
                                    Pairs with Nankhatai
                                </span>
</div>
<h3 class="text-4xl font-headline font-bold">Mysore Filter Coffee</h3>
<p class="opacity-80 italic">Dark roasted Peaberry beans from Coorg, traditionally dripped through a brass filter.</p>
<div class="flex justify-between items-center mt-4">
<span class="text-3xl font-headline text-secondary-container">₹195</span>
<button class="bg-secondary-container text-on-secondary-container px-6 py-2 font-headline text-lg flex items-center gap-2 hover:brightness-110 transition-all">
<span class="material-symbols-outlined text-sm">shopping_cart</span>
                                    Add to Cart
                                </button>
</div>
</div>
<img class="w-full mt-12 mix-blend-lighten opacity-80" data-alt="South Indian filter coffee served in a traditional brass tumbler and dabara on a dark stone surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9ikDzDLVGPrGQTPQsgSZo31IPIQr54kxvs9zLwUIdtkCPvQyPsUfuy5jJOJ2kPpmFDYMjGtbs5aUfDjnZLEkLCP0j1qK4BcitARCARfEcxaYO50hHwwNw2wpyb4HWHYRyJKU9fEMhtZpqFBHhaRExOvUt-kETrA4NpP_eMERl3D6_5koKBgmfaTONCe6TYE3RQATJLAYXuagKEcYq4gB7sIq0upjOJWHqM6rtR-WSWRU6aRvwL7m9or22j-6FED6ZbwSe5g9bdBQ"/>
</div>
<!-- Bento Item 3: Sweets -->
<div class="md:col-span-4 bg-surface-container-high p-8 flex flex-col gap-6 group">
<div class="flex justify-between items-start">
<div class="flex flex-col">
<h3 class="text-2xl font-headline text-on-background font-bold">Saffron Barfi</h3>
<span class="text-secondary text-[10px] font-bold uppercase tracking-tighter mt-1 italic">Pairs with Sulaimani Tea</span>
</div>
<span class="text-xl font-headline text-secondary">₹150</span>
</div>
<div class="relative overflow-hidden h-48">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="square slices of milk-based saffron barfi topped with silver leaf and crushed pistachios" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCCqKwNj3CDXyoCexH3azCdHeNXFdV6nn8EXUfhJa-O8Gxc-kIYHbYqwxXPic1eZlnPeT_4hI3dJ3EHB1qdtXtgkXCgERUwPwdpzDPZcvZckC7KCBOQ6Xyvcw0nWyFDEUEv2qr_pUxlAVscDooLVJQDpV6VGOe8GRBlTW1P34L7oHelVB9a-KSTPG4D3vySTqGG7UiSCJQtj1mfvSUt_gcaD-JQyEY0KBUk1djfCuylv_wPzUfXKaQpM2XTF3jcYh9HtuyZPYCD6I"/>
<div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<button class="bg-surface px-4 py-2 font-headline text-sm font-bold flex items-center gap-2 shadow-lg">
<span class="material-symbols-outlined text-sm">add</span> Add to Cart
                                </button>
</div>
</div>
</div>
<!-- Bento Item 4: Sweets 2 -->
<div class="md:col-span-4 bg-surface-container p-8 flex flex-col gap-6 group">
<div class="flex justify-between items-start">
<div class="flex flex-col">
<h3 class="text-2xl font-headline text-on-background font-bold">Rose Pistachio Laddu</h3>
<span class="text-secondary text-[10px] font-bold uppercase tracking-tighter mt-1 italic">Pairs with Darjeeling First Flush</span>
</div>
<span class="text-xl font-headline text-secondary">₹180</span>
</div>
<div class="relative overflow-hidden h-48">
<img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-alt="hand-rolled rose and pistachio laddus garnished with dried rose petals in a silver bowl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRAgalzZ2hMgmupRSDQuFBP6lDusUCfj0q73A7V4XV1a0NjrTaiyBu94uru2zud1akOUatSjo3mlaDGzWc70d7ZeGB937tiCIPJFerFXQ9co2tF0aFVY--iZbe1UoFtLyNMnl6vStblhClKl9QoXf4PWmgFfc27sbYQvtKM67ep6eYCR3sLDqVkh9MSDnDbaeqoBX-S0E1kcvi34pikrPzDbY8YCLGlwLhomEmaPTE2Kv1G0-lKjEpeShC3HxALfGR21z_0ZL6DgM"/>
<div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
<button class="bg-surface px-4 py-2 font-headline text-sm font-bold flex items-center gap-2 shadow-lg">
<span class="material-symbols-outlined text-sm">add</span> Add to Cart
                                </button>
</div>
</div>
</div>
<!-- Bento Item 5: Small Card -->
<div class="md:col-span-4 bg-primary p-8 text-on-primary flex flex-col justify-center items-center text-center">
<h4 class="text-2xl font-headline font-bold mb-4">The Evening Archive</h4>
<p class="text-sm opacity-80 mb-6">A curated flight of three regional teas accompanied by seasonal savories.</p>
<button class="border border-on-primary/30 px-6 py-2 text-sm uppercase tracking-widest hover:bg-on-primary hover:text-primary transition-colors">Reserved Only</button>
</div>
</div>
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
<div class="mt-20 text-center">
<button class="px-16 py-5 border-2 border-[#F4C430] text-[#F4C430] font-headline text-2xl font-bold hover:bg-[#F4C430] hover:text-[#410000] transition-all duration-300">
                Customize Your Hamper
            </button>
</div>
<!-- Section Banner -->
<div class="mt-24 border-t border-[#F4C430]/30 pt-8 text-center">
<p class="text-[#F4C430]/80 font-body italic text-sm tracking-widest uppercase">
                Complementary royal wrapping in handmade paper and eco-friendly jute packaging.
            </p>
</div>
</div>
<!-- Decorative side pattern -->
<div class="absolute top-0 right-0 w-32 h-full opacity-5 pointer-events-none mughal-pattern" style="background-image: radial-gradient(#F4C430 1px, transparent 1px);"></div>
</section>
<!-- Location Section -->
<section class="relative py-32 bg-surface overflow-hidden">
<div class="max-w-screen-xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-0">
<div class="bg-surface-container-high p-16 flex flex-col justify-center">
<h2 class="text-5xl font-headline text-on-background font-bold mb-8">Visit the Sanctum</h2>
<div class="flex flex-col gap-10">
<div class="flex gap-6">
<span class="material-symbols-outlined text-4xl mt-1">location_on</span>
<div>
<h4 class="font-headline text-xl font-bold">Address</h4>
<p class="text-on-surface-variant font-body">12 Old Haveli Row, Heritage Quarter,<br/>Jaipur, Rajasthan 302001</p>
</div>
</div>
<div class="flex gap-6">
<span class="material-symbols-outlined text-4xl mt-1">schedule</span>
<div>
<h4 class="font-headline text-xl font-bold">The Golden Hours</h4>
<p class="text-on-surface-variant font-body">Monday — Sunday<br/>06:00 AM — 11:00 PM</p>
</div>
</div>
<div class="flex gap-6">
<span class="material-symbols-outlined text-4xl mt-1">call</span>
<div>
<h4 class="font-headline text-xl font-bold">Direct Line</h4>
<p class="text-on-surface-variant font-body">+91 (141) 4892-000</p>
</div>
</div>
</div>
</div>
<div class="relative h-[600px] md:h-auto">
<div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/parchment.png')] bg-repeat z-10 pointer-events-none opacity-40"></div>
<img class="w-full h-full object-cover sepia-[0.6] contrast-[1.1]" data-alt="vintage illustrated map of an old Indian city quarter with hand-drawn landmarks and ink calligraphy on aged parchment" data-location="Jaipur" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaVmhPmhlxCd-scoIPjdjcEPIJQ8mnBHrcEjnCx5-9t6Mx-rgk5zbZC7-OwrX7Wrum-4_k9wUSVWXPQnvLrVK5bc_i99MCe1i7wxNm4SS-3Lr-XzKvSh9Ni01ZmA292N6szeWfnKgoZ2IeuT3o9JwdoZ2gwREXKth1rR68c3ofmk332p22J0vtkYf_fRbdF2dHRyX-yEsRQ19FjUPVB3R2bSLq62YVlL7rwMUINN23dgvXk4204VI6VjqzoqjUiyu_TYm9vCj1AAc"/>
<div class="absolute inset-0 bg-secondary/10 z-0"></div>
</div>
</div>
<!-- Patterned Scrim Signature -->
<div class="absolute bottom-0 left-0 w-full h-48 opacity-10 pointer-events-none mughal-pattern"></div>
</section>
<!-- Testimonials Section -->
<section class="py-32 bg-[#fcf9ee] relative overflow-hidden">
<div class="max-w-screen-xl mx-auto px-8 relative z-10">
<div class="text-center mb-20">
<h2 class="text-5xl md:text-6xl font-headline text-on-background font-bold tracking-tight">Whispers of the Connoisseurs</h2>
<div class="w-24 h-[1px] bg-secondary mx-auto mt-6"></div>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-12">
<!-- Testimonial 1 -->
<div class="bg-surface-container-low p-8 mughal-border flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
<div class="relative mb-8">
<div class="w-24 h-24 rounded-full overflow-hidden border-4 border-secondary/20 p-1">
<img alt="Customer Portrait" class="w-full h-full object-cover rounded-full" onerror="this.src='https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&amp;fit=crop&amp;w=200&amp;q=80'" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2W5Tf9jS8Uq1L8mKj3z4S2E4O5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z"/>
</div>
<div class="absolute -bottom-2 -right-2 bg-secondary text-on-secondary w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
<span class="material-symbols-outlined text-sm" style="color:white; font-variation-settings: 'FILL' 1;">format_quote</span>
</div>
</div>
<div class="flex gap-1 mb-4">
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
</div>
<p class="font-body italic text-on-surface-variant leading-relaxed mb-6">
                "The Zaffrani Chai is a revelation. It's not just tea; it's a sensory bridge to the past. Every sip carries the weight of history and the warmth of a haveli kitchen."
            </p>
<h4 class="font-headline font-bold text-lg text-secondary">Arjun Malhotra</h4>
</div>
<!-- Testimonial 2 -->
<div class="bg-surface-container-low p-8 mughal-border flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
<div class="relative mb-8">
<div class="w-24 h-24 rounded-full overflow-hidden border-4 border-secondary/20 p-1">
<img alt="Customer Portrait" class="w-full h-full object-cover rounded-full" onerror="this.src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&amp;fit=crop&amp;w=200&amp;q=80'" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3W5Tf9jS8Uq1L8mKj3z4S2E4O5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z"/>
</div>
<div class="absolute -bottom-2 -right-2 bg-secondary text-on-secondary w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
<span class="material-symbols-outlined text-sm" style="color:white; font-variation-settings: 'FILL' 1;">format_quote</span>
</div>
</div>
<div class="flex gap-1 mb-4">
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
</div>
<p class="font-body italic text-on-surface-variant leading-relaxed mb-6">
                "The Prabhat Chai subscription has transformed my mornings. Delivering in kulhads isn't just eco-friendly; it preserves that soul-stirring earthy aroma."
            </p>
<h4 class="font-headline font-bold text-lg text-secondary">Priya Iyer</h4>
</div>
<!-- Testimonial 3 -->
<div class="bg-surface-container-low p-8 mughal-border flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-500">
<div class="relative mb-8">
<div class="w-24 h-24 rounded-full overflow-hidden border-4 border-secondary/20 p-1">
<img alt="Customer Portrait" class="w-full h-full object-cover rounded-full" onerror="this.src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&amp;fit=crop&amp;w=200&amp;q=80'" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3W5Tf9jS8Uq1L8mKj3z4S2E4O5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z"/>
</div>
<div class="absolute -bottom-2 -right-2 bg-secondary text-on-secondary w-8 h-8 rounded-full flex items-center justify-center shadow-lg">
<span class="material-symbols-outlined text-sm" style="color:white; font-variation-settings: 'FILL' 1;">format_quote</span>
</div>
</div>
<div class="flex gap-1 mb-4">
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
<span class="material-symbols-outlined text-amber-500 text-lg" style="font-variation-settings: 'FILL' 1; color: #f59e0b;">star</span>
</div>
<p class="font-body italic text-on-surface-variant leading-relaxed mb-6">
                "Finding Mysore Filter Coffee that tastes this authentic in the city was impossible until I found Heritage Tea Co. The packaging is as thoughtful as the brew."
            </p>
<h4 class="font-headline font-bold text-lg text-secondary">Vikram Sethi</h4>
</div>
</div>
</div>
<!-- Decorative side pattern -->
<div class="absolute top-0 left-0 w-32 h-full opacity-5 pointer-events-none mughal-pattern"></div>
<div class="absolute top-0 right-0 w-32 h-full opacity-5 pointer-events-none mughal-pattern"></div>
</section>
` }} />
    );
}
