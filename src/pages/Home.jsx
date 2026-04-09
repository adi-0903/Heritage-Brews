import React from 'react';

export default function Home() {
    return (
        <div className="w-full" dangerouslySetInnerHTML={{
            __html: `<style>
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24; }
        
        /* Vibrant Indian Royal Heritage Palette */
        body { background-color: #fcf9ee; color: #1c1c15; font-family: 'Noto Serif', serif; }
        
        .bg-background { background-color: #fcf9ee !important; }
        .text-on-background { color: #1c1c15 !important; }
        
        /* Containers (Warm light parchment tones) */
        .bg-surface-container-lowest { background-color: #ffffff !important; }
        .bg-surface-container-low { background-color: #fcf9ee !important; }
        .bg-surface-container { background-color: #f2efe4 !important; }
        .bg-surface-container-high { background-color: #e5e2d8 !important; }
        .bg-surface-container-highest { background-color: #dcd4c3 !important; }
        .bg-surface-variant { background-color: #dcd4c3 !important; }
        .bg-surface { background-color: #fcf9ee !important; }
        
        /* Royal Accents */
        .bg-primary { background-color: #890000 !important; }
        .text-primary { color: #890000 !important; }
        .text-on-primary { color: #fcf9ee !important; }
        
        .bg-secondary { background-color: #7b5800 !important; }
        .text-secondary { color: #7b5800 !important; }
        .border-secondary\\/30 { border-color: rgba(123, 88, 0, 0.3) !important; }
        
        .bg-tertiary-container { background-color: #F4C430 !important; }
        .text-tertiary-container { color: #F4C430 !important; }
        .text-on-tertiary { color: #1c1c15 !important; }
        .text-secondary-container { color: #890000 !important; }
        
        .text-on-surface { color: #1c1c15 !important; }
        .text-on-surface-variant { color: #58413f !important; }
        
        .border-outline-variant\\/10 { border-color: rgba(123, 88, 0, 0.1) !important; }
        .border-outline-variant\\/20 { border-color: rgba(123, 88, 0, 0.2) !important; }

        .indian-arch {
            border-top-left-radius: 50% 120px;
            border-top-right-radius: 50% 120px;
            box-shadow: inset 0px 10px 25px rgba(244,196,48,0.2);
            border-top: 4px solid #F4C430;
        }
        
        .mughal-pattern {
            background-image: radial-gradient(#e5e2d8 1px, transparent 1px);
            background-size: 20px 20px;
        }
        
        /* 3D Flip Card Styles */
        .flip-container {
            perspective: 1000px;
            cursor: pointer;
        }
        .flip-inner {
            position: relative;
            width: 100%;
            height: 100%;
            transition: transform 0.8s cubic-bezier(0.4, 0.0, 0.2, 1);
            transform-style: preserve-3d;
        }
        .flip-container.flipped .flip-inner {
            transform: rotateY(180deg);
        }
        .flip-front, .flip-back {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
            overflow: hidden;
        }
        .flip-back {
            transform: rotateY(180deg);
        }
    </style><main class="bg-[#fcf9ee] relative">
    
<!-- FULL PAGE INDIAN BLOCK PRINT OVERLAY -->
<div class="fixed inset-0 pointer-events-none z-0 opacity-[0.12] mix-blend-multiply" style="background-image: url('/images/indian_pattern.png'); background-size: 400px 400px;"></div>

<!-- Bright Traditional Hero Section -->
<section class="relative min-h-[920px] flex items-center justify-center overflow-hidden py-32 z-10">
<div class="absolute inset-0 z-0">
<img class="w-full h-full object-cover brightness-[1.1] contrast-[1.05]" data-alt="vibrant royal haveli courtyard bathed in golden sunlight with brass accents" src="/images/royal_haveli_courtyard.png"/>
<div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#fcf9ee] to-transparent"></div>
</div>

<!-- Glass Arch Overlay for Text Readability & Indian Aesthetic -->
<div class="relative z-10 w-full max-w-3xl mx-auto px-8 py-20 bg-[#fcf9ee]/80 backdrop-blur-md indian-arch text-center flex flex-col items-center mt-24">
<h1 class="text-6xl md:text-8xl font-headline text-[#890000] font-extrabold tracking-tighter leading-[0.9] mb-8 drop-shadow-md">
    The Heritage<br/><span class="text-[#7b5800]">of Indian Brews.</span>
</h1>
<p class="text-xl md:text-2xl text-[#1c1c15] font-body italic opacity-95 max-w-xl mb-12">
    Steeped in vibrant tradition, served with absolute soul. A sensory journey through the majestic tea and coffee culture of the subcontinent.
</p>
<button class="bg-[#890000] text-[#fcf9ee] px-12 py-5 font-headline text-xl uppercase tracking-widest flex items-center gap-4 hover:bg-[#7b5800] hover:-translate-y-1 transition-all duration-300 shadow-[0_10px_30px_rgba(137,0,0,0.4)]">
    Explore the Treasury
    <span class="material-symbols-outlined text-[#fcf9ee]" style="font-variation-settings: 'FILL' 1;">arrow_right_alt</span>
</button>
</div>
</section>
<!-- Philosophy Section -->
<section class="py-32 px-8 bg-transparent overflow-hidden relative z-10">
<!-- Mughal Border Element -->
<div class="absolute inset-x-8 top-8 bottom-8 border-[12px] border-[#890000]/5 pointer-events-none z-20"></div>

<div class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
<div class="relative group h-full flex flex-col pt-12">
    <!-- Traditional Indian Side Fresco Banner placed underneath and taking up the left page -->
    <div class="absolute -top-12 -left-16 w-32 h-[120%] opacity-50 pointer-events-none" style="background-image: url('/images/indian_pattern.png'); background-size: 100% auto;"></div>
    
    <div class="relative z-10 mt-12 mb-12 shadow-2xl shadow-[#7b5800]/20">
        <div class="absolute -top-4 -left-4 w-full h-full bg-[#e5e2d8] border border-[#7b5800]/20 -z-10"></div>
        <img class="w-full grayscale-[0.1] hover:grayscale-0 transition-all duration-700 relative z-10" data-alt="artisanal slow-boiling masala chai in a large copper vessel with whole spices floating on the surface in a dim rustic kitchen" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDraCS-zpMm2C35ARGUrrmdjOzYvxo-xYnqD8eTkRJ6XCFn16Ipip60Znyg0fZOVzi3QW2tDqVfvWYRnP3gwwiwM0oh-_hqRCb_q0jW-6gRMxDOnUpMeMSJk_gBLZaYdIHWnuPzCDyxQqA3sqy9NXtVcu3jdW9a935RTqp1Em15XDuAXyztVhQ5tt0WkbJoWWopdPOwKM39IW3tZhg1RJUh0l3RXhDFB6QgJCeUpxW_2MDHS-O2oHNlt782CwX-Gh42PCgMWhEbSek"/>
    </div>
    
    <!-- Royal decorative text below the image -->
    <div class="mt-8 text-center px-8 opacity-80 border-t border-b border-[#7b5800]/20 py-6 relative">
        <span class="font-headline text-[#890000] text-3xl italic">A Ritual of Heritage</span>
        <div class="absolute left-1/2 -top-3 -translate-x-1/2 bg-[#fcf9ee] px-2 text-[#7b5800]">
            <span class="material-symbols-outlined text-sm" style="font-variation-settings: 'FILL' 1;">eco</span>
        </div>
    </div>
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
<!-- Menu Section: Bento Grid -->
<section class="py-32 bg-surface-container-low">
<div class="max-w-screen-2xl mx-auto px-8">
<div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
<div>
<h2 class="text-5xl md:text-7xl font-headline text-on-background font-extrabold tracking-tighter">
                            The Traditional Treasury
                        </h2>
<p class="text-on-surface-variant text-xl italic font-body mt-4">A curated selection of our most prized offerings.</p>
</div>
<div class="text-secondary font-headline text-2xl flex items-center gap-2 border-b border-secondary/30 pb-2">
                        View Full Menu <span class="material-symbols-outlined">menu_book</span>
</div>
</div>
<div class="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[900px]">
<!-- Bento Item 1: Tea -->
<div class="md:col-span-8 bg-surface-container-lowest p-12 flex flex-col justify-between group">
<div class="flex justify-between items-start">
<div>
<h3 class="text-4xl font-headline text-primary font-bold">Zaffrani Masala Chai</h3>
<p class="text-on-surface-variant mt-2 max-w-sm">Premium Assam CTC blend infused with hand-picked Saffron threads, whole spices, and caramelized milk.</p>
</div>
<span class="text-3xl font-headline text-secondary">₹245</span>
</div>
<div class="mt-8 overflow-hidden h-[400px]">
<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" data-alt="close-up of golden saffron tea being poured into a textured clay cup with spices scattered around" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3_j-P7KXR7VuVbIgfcuj-loCfFhZJexyVFruVoFSSSSYKmj2VAK-d5KBGAy7qNamrP7jOj0h2-IEii1pmvazveAfVn61So-oT-fyVNUGqhae9yfIPJXnyQYYF-Xt-3tY1g3j5dujYc9rVKraxnC6njUSuCL5FYrXdCguTByIO0U-X5cRiE5JiaefAKbcpryf1VoUOVHeTJFLP2PziC-2ihHYa33ReE7G1MLuc8NhOOecrY4FWPwqgi6bun1DtcsU4P7-0lysL9eU"/>
</div>
</div>
<!-- Bento Item 2: Coffee -->
<div class="md:col-span-4 bg-tertiary-container text-on-tertiary p-12 flex flex-col justify-between">
<div class="flex flex-col gap-4">
<span class="text-secondary-container font-headline text-lg">Specialty Brew</span>
<h3 class="text-4xl font-headline font-bold">Mysore Filter Coffee</h3>
<p class="opacity-80 italic">Dark roasted Peaberry beans from Coorg, traditionally dripped through a brass filter.</p>
<span class="text-3xl font-headline text-secondary-container mt-4">₹195</span>
</div>
<img class="w-full mt-12 mix-blend-lighten opacity-80" data-alt="South Indian filter coffee served in a traditional brass tumbler and dabara on a dark stone surface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9ikDzDLVGPrGQTPQsgSZo31IPIQr54kxvs9zLwUIdtkCPvQyPsUfuy5jJOJ2kPpmFDYMjGtbs5aUfDjnZLEkLCP0j1qK4BcitARCARfEcxaYO50hHwwNw2wpyb4HWHYRyJKU9fEMhtZpqFBHhaRExOvUt-kETrA4NpP_eMERl3D6_5koKBgmfaTONCe6TYE3RQATJLAYXuagKEcYq4gB7sIq0upjOJWHqM6rtR-WSWRU6aRvwL7m9or22j-6FED6ZbwSe5g9bdBQ"/>
</div>
<!-- Bento Item 3: Sweets -->
<div class="md:col-span-4 bg-surface-container-high p-8 flex flex-col gap-6">
<div class="flex justify-between items-end">
<h3 class="text-2xl font-headline text-on-background font-bold">Saffron Barfi</h3>
<span class="text-xl font-headline text-secondary">₹150</span>
</div>
<img class="w-full h-48 object-cover" data-alt="square slices of milk-based saffron barfi topped with silver leaf and crushed pistachios" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCCqKwNj3CDXyoCexH3azCdHeNXFdV6nn8EXUfhJa-O8Gxc-kIYHbYqwxXPic1eZlnPeT_4hI3dJ3EHB1qdtXtgkXCgERUwPwdpzDPZcvZckC7KCBOQ6Xyvcw0nWyFDEUEv2qr_pUxlAVscDooLVJQDpV6VGOe8GRBlTW1P34L7oHelVB9a-KSTPG4D3vySTqGG7UiSCJQtj1mfvSUt_gcaD-JQyEY0KBUk1djfCuylv_wPzUfXKaQpM2XTF3jcYh9HtuyZPYCD6I"/>
</div>
<!-- Bento Item 4: Sweets 2 -->
<div class="md:col-span-4 bg-surface-container p-8 flex flex-col gap-6">
<div class="flex justify-between items-end">
<h3 class="text-2xl font-headline text-on-background font-bold">Rose Pistachio Laddu</h3>
<span class="text-xl font-headline text-secondary">₹180</span>
</div>
<img class="w-full h-48 object-cover" data-alt="hand-rolled rose and pistachio laddus garnished with dried rose petals in a silver bowl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRAgalzZ2hMgmupRSDQuFBP6lDusUCfj0q73A7V4XV1a0NjrTaiyBu94uru2zud1akOUatSjo3mlaDGzWc70d7ZeGB937tiCIPJFerFXQ9co2tF0aFVY--iZbe1UoFtLyNMnl6vStblhClKl9QoXf4PWmgFfc27sbYQvtKM67ep6eYCR3sLDqVkh9MSDnDbaeqoBX-S0E1kcvi34pikrPzDbY8YCLGlwLhomEmaPTE2Kv1G0-lKjEpeShC3HxALfGR21z_0ZL6DgM"/>
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
<!-- Location Section -->
<section class="relative py-32 bg-transparent overflow-hidden">
<div class="max-w-screen-xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center justify-center">
<div class="bg-[#fcf9ee]/90 backdrop-blur-md p-12 md:p-16 flex flex-col justify-center border-[12px] border-double border-[#7b5800]/30 shadow-[0_20px_50px_rgba(123,88,0,0.15)] z-20 relative">
    <!-- Traditional watermark icon inside the box -->
    <div class="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span class="material-symbols-outlined text-[300px]">account_balance</span>
    </div>
<h2 class="text-5xl font-headline text-[#890000] font-bold mb-10 drop-shadow-sm border-b border-[#7b5800]/20 pb-6 inline-block w-[max-content]">Visit the Sanctum</h2>
<div class="flex flex-col gap-10 relative z-10">
<div class="flex gap-6 group cursor-pointer hover:-translate-y-1 transition-transform">
<div class="w-12 h-12 rounded-full border border-[#7b5800]/30 flex items-center justify-center bg-[#f2efe4] group-hover:bg-[#7b5800] transition-colors"><span class="material-symbols-outlined text-2xl group-hover:text-white transition-colors" style="font-variation-settings: 'FILL' 1;">location_on</span></div>
<div>
<h4 class="font-headline text-xl font-bold text-[#7b5800]">Address</h4>
<p class="text-on-surface-variant font-body">12 Old Haveli Row, Heritage Quarter,<br/>Jaipur, Rajasthan 302001</p>
</div>
</div>
<div class="flex gap-6 group cursor-pointer hover:-translate-y-1 transition-transform">
<div class="w-12 h-12 rounded-full border border-[#7b5800]/30 flex items-center justify-center bg-[#f2efe4] group-hover:bg-[#7b5800] transition-colors"><span class="material-symbols-outlined text-2xl group-hover:text-white transition-colors" style="font-variation-settings: 'FILL' 1;">schedule</span></div>
<div>
<h4 class="font-headline text-xl font-bold text-[#7b5800]">The Golden Hours</h4>
<p class="text-on-surface-variant font-body">Monday — Sunday<br/>10:00 AM — 11:00 PM</p>
</div>
</div>
<div class="flex gap-6 group cursor-pointer hover:-translate-y-1 transition-transform">
<div class="w-12 h-12 rounded-full border border-[#7b5800]/30 flex items-center justify-center bg-[#f2efe4] group-hover:bg-[#7b5800] transition-colors"><span class="material-symbols-outlined text-2xl group-hover:text-white transition-colors" style="font-variation-settings: 'FILL' 1;">call</span></div>
<div>
<h4 class="font-headline text-xl font-bold text-[#7b5800]">Direct Line</h4>
<p class="text-on-surface-variant font-body">+91 70098 55442</p>
</div>
</div>
</div>
</div>
<!-- 3D Flippable Map/Cafe Card -->
<div class="relative aspect-square w-full max-h-[800px] shadow-2xl shadow-black/80 z-10 border-[8px] border-double border-[#7b5800]/20 mx-auto flip-container group" onclick="this.classList.toggle('flipped')">
    <div class="flip-inner group-hover:shadow-[0_0_50px_rgba(137,0,0,0.3)] transition-shadow duration-[800ms]">
        <!-- FRONT: Heritage Cafe Photo -->
        <div class="flip-front">
            <img class="w-full h-full object-cover brightness-[0.95] contrast-[1.1] scale-100 hover:scale-[1.03] transition-all duration-[1500ms]" data-alt="stunning exterior of the traditional royal Indian heritage cafe" src="/images/heritage_brews_exterior.png"/>
            <div class="absolute inset-x-0 bottom-4 text-center z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span class="bg-[#890000]/90 text-[#fcf9ee] px-6 py-2 rounded-full font-headline tracking-widest text-sm shadow-xl border border-[#7b5800]/50 backdrop-blur-md">CLICK TO FLIP TO MAP</span>
            </div>
        </div>
        <!-- BACK: Antique Map -->
        <div class="flip-back">
            <div class="absolute inset-0 bg-[#fcf9ee] opacity-10 mix-blend-color z-10 pointer-events-none"></div>
            <img class="w-full h-full object-cover sepia-[0.6] contrast-[1.1]" data-alt="vintage illustrated map of an old Indian city quarter with hand-drawn landmarks and ink calligraphy on aged parchment" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaVmhPmhlxCd-scoIPjdjcEPIJQ8mnBHrcEjnCx5-9t6Mx-rgk5zbZC7-OwrX7Wrum-4_k9wUSVWXPQnvLrVK5bc_i99MCe1i7wxNm4SS-3Lr-XzKvSh9Ni01ZmA292N6szeWfnKgoZ2IeuT3o9JwdoZ2gwREXKth1rR68c3ofmk332p22J0vtkYf_fRbdF2dHRyX-yEsRQ19FjUPVB3R2bSLq62YVlL7rwMUINN23dgvXk4204VI6VjqzoqjUiyu_TYm9vCj1AAc"/>
            <div class="absolute inset-0 bg-[#7b5800]/10 z-0 mix-blend-multiply pointer-events-none"></div>
        </div>
        <div class="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] z-20 pointer-events-none"></div>
    </div>
</div>
</div>
<!-- Patterned Scrim Signature -->
<div class="absolute bottom-0 left-0 w-full h-64 opacity-20 pointer-events-none mughal-pattern"></div>
<div class="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[rgba(123,88,0,0.1)] to-transparent pointer-events-none"></div>
</section>
</main>` }} />
    );
}
