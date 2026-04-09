import React from 'react';

export default function Menu() {
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
        .parchment-glass {
            background: rgba(18, 14, 10, 0.60);
            backdrop-filter: blur(24px);
        }
        .hero-glow { text-shadow: 0 0 40px rgba(0,0,0,0.8); }
    </style><main class="bg-[#120e0a] min-h-screen relative">
    
    <!-- Full Page Ambient Texture Overlay -->
    <div class="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

    <!-- Menu Header Hero -->
    <section class="h-[75vh] relative flex items-center justify-center overflow-hidden border-b-[12px] border-double border-[#F4C430]/20 max-h-[800px]">
        <div class="absolute inset-0 z-0">
            <img class="w-full h-full object-cover transition-transform duration-[15000ms] hover:scale-110" data-alt="breathtaking cinematic close-up of steaming hot Indian masala chai pouring from a vintage brass teapot" src="/images/premium_menu_hero.png"/>
            <!-- Rich cinematic vignette -->
            <div class="absolute inset-0 bg-gradient-to-t from-[#1a1510]/90 via-transparent to-[#1a1510]/60"></div>
        </div>
        
        <div class="relative z-10 text-center px-8 py-16 mt-16 max-w-4xl parchment-glass border border-[#F4C430]/30 shadow-[0_30px_60px_rgba(123,88,0,0.2)]">
            <div class="absolute -inset-4 border-[6px] border-double border-[#F4C430]/20 pointer-events-none"></div>
            <span class="text-[#F4C430] font-headline text-lg md:text-xl tracking-[0.4em] uppercase mb-6 block font-bold border-b border-[#F4C430]/20 pb-4 inline-block px-12">The Ledger of Offerings</span>
            <h1 class="text-6xl md:text-8xl font-headline text-[#e5e2d8] font-bold tracking-tighter mb-8">The Royal Menu</h1>
            <p class="text-xl px-12 md:px-0 text-[#c4b5a2] font-body italic leading-relaxed">
                From the misty hills of Darjeeling to the shade-grown estates of Coorg.<br/> Select your brews and royal accompaniments below.
            </p>
        </div>
        <!-- Decorative bottom edge -->
        <div class="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#120e0a] to-transparent z-20"></div>
    </section>

    <!-- Menu Categories Container -->
    <section class="py-32 px-8 max-w-screen-xl mx-auto space-y-32 relative z-10">
        
        <!-- Category: Heritage Teas -->
        <div>
            <div class="flex items-center gap-6 mb-12 border-b border-[#F4C430]/20 pb-4">
                <span class="material-symbols-outlined text-4xl text-[#F4C430]">eco</span>
                <h2 class="text-4xl md:text-5xl font-headline font-bold text-[#e5e2d8]">Heritage Teas</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3_j-P7KXR7VuVbIgfcuj-loCfFhZJexyVFruVoFSSSSYKmj2VAK-d5KBGAy7qNamrP7jOj0h2-IEii1pmvazveAfVn61So-oT-fyVNUGqhae9yfIPJXnyQYYF-Xt-3tY1g3j5dujYc9rVKraxnC6njUSuCL5FYrXdCguTByIO0U-X5cRiE5JiaefAKbcpryf1VoUOVHeTJFLP2PziC-2ihHYa33ReE7G1MLuc8NhOOecrY4FWPwqgi6bun1DtcsU4P7-0lysL9eU" alt="Zaffrani Chai" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Zaffrani Masala Chai</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹245</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Assam CTC blend infused with Kashmiri Saffron and whole spices.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>

                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="/images/darjeeling_tea_1775770278908.png" alt="Darjeeling Tea" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Makaibari First Flush</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹310</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">The "Champagne of Teas". Light, floral, with distinct muscatel notes.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>

                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="/images/elaichi_chai_1775770295145.png" alt="Elaichi Chai" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Elaichi Adrak Chai</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹150</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">The classic ginger and green cardamom milk tea, slow-boiled for depth.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category: Shade-Grown Coffees -->
        <div>
            <div class="flex items-center gap-6 mb-12 border-b border-[#F4C430]/20 pb-4">
                <span class="material-symbols-outlined text-4xl text-[#F4C430]">local_cafe</span>
                <h2 class="text-4xl md:text-5xl font-headline font-bold text-[#e5e2d8]">Shade-Grown Coffees</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9ikDzDLVGPrGQTPQsgSZo31IPIQr54kxvs9zLwUIdtkCPvQyPsUfuy5jJOJ2kPpmFDYMjGtbs5aUfDjnZLEkLCP0j1qK4BcitARCARfEcxaYO50hHwwNw2wpyb4HWHYRyJKU9fEMhtZpqFBHhaRExOvUt-kETrA4NpP_eMERl3D6_5koKBgmfaTONCe6TYE3RQATJLAYXuagKEcYq4gB7sIq0upjOJWHqM6rtR-WSWRU6aRvwL7m9or22j-6FED6ZbwSe5g9bdBQ" alt="Filter Coffee" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Mysore Filter Coffee</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹195</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Dark roasted Peaberry beans from Coorg, traditionally dripped through a brass filter with chicory.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>

                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="/images/monsoon_coffee_1775770310752.png" alt="Monsoon Coffee" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Monsoon Malabar AA</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹280</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Exposed to the monsoon winds of the Malabar coast. Earthy, low-acid, intense flavor.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category: Traditional Bites -->
        <div>
            <div class="flex items-center gap-6 mb-12 border-b border-[#F4C430]/20 pb-4">
                <span class="material-symbols-outlined text-4xl text-[#F4C430]">bakery_dining</span>
                <h2 class="text-4xl md:text-5xl font-headline font-bold text-[#e5e2d8]">Traditional Bites</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCCqKwNj3CDXyoCexH3azCdHeNXFdV6nn8EXUfhJa-O8Gxc-kIYHbYqwxXPic1eZlnPeT_4hI3dJ3EHB1qdtXtgkXCgERUwPwdpzDPZcvZckC7KCBOQ6Xyvcw0nWyFDEUEv2qr_pUxlAVscDooLVJQDpV6VGOe8GRBlTW1P34L7oHelVB9a-KSTPG4D3vySTqGG7UiSCJQtj1mfvSUt_gcaD-JQyEY0KBUk1djfCuylv_wPzUfXKaQpM2XTF3jcYh9HtuyZPYCD6I" alt="Saffron Barfi" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Saffron Barfi (2 pcs)</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹150</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Milk-based sweet topped with silver leaf and crushed pistachios. Best paired with strong black tea.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>

                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRAgalzZ2hMgmupRSDQuFBP6lDusUCfj0q73A7V4XV1a0NjrTaiyBu94uru2zud1akOUatSjo3mlaDGzWc70d7ZeGB937tiCIPJFerFXQ9co2tF0aFVY--iZbe1UoFtLyNMnl6vStblhClKl9QoXf4PWmgFfc27sbYQvtKM67ep6eYCR3sLDqVkh9MSDnDbaeqoBX-S0E1kcvi34pikrPzDbY8YCLGlwLhomEmaPTE2Kv1G0-lKjEpeShC3HxALfGR21z_0ZL6DgM" alt="Rose Laddus" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Rose Pistachio Laddu</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹180</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Hand-rolled balls of roasted nuts and rose essence. Beautifully compliments First Flush teas.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>

                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="/images/mathri_snack_1775770332290.png" alt="Mathri" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Flaky Mathri Basket</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹110</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Savory, spiced flour crackers heavily flavored with carom seeds (ajwain) and black pepper.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Category: Heritage Cuisines & Mains -->
        <div>
            <div class="flex items-center gap-6 mb-12 border-b border-[#F4C430]/20 pb-4">
                <span class="material-symbols-outlined text-4xl text-[#F4C430]">restaurant</span>
                <h2 class="text-4xl md:text-5xl font-headline font-bold text-[#e5e2d8]">Heritage Cuisines & Mains</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="/images/awadhi_biryani_1775770364812.png" alt="Awadhi Biryani" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Rich Awadhi Biryani</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹590</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Dum-cooked saffron infused basmati rice in a brass handi. Slow roasted over charcoal.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>

                <!-- Item -->
                <div class="flex gap-6 group">
                    <img class="w-32 h-32 object-cover rounded-sm shadow-md" src="/images/shahi_samosa_1775770348240.png" alt="Shahi Samosa" />
                    <div class="flex-1 flex flex-col justify-between">
                        <div>
                            <div class="flex justify-between items-start mb-1">
                                <h3 class="text-2xl font-headline font-bold text-[#F4C430]">Golden Shahi Samosa (3 pcs)</h3>
                                <span class="text-xl font-headline text-[#7b5800] font-bold">₹225</span>
                            </div>
                            <p class="text-[#c4b5a2] text-sm italic">Extremely crisp, thick-crusted triangles stuffed with spicy roasted potatoes, peas, and heavy cashew bits.</p>
                        </div>
                        <button class="self-start text-[#fcf9ee] bg-[#120e0a] border border-[#F4C430]/30 text-[#e5e2d8] hover:bg-[#F4C430] hover:text-[#120e0a] px-5 py-2 text-xs uppercase tracking-widest font-bold transition-colors flex items-center gap-2">
                            <span class="material-symbols-outlined text-[16px]">add_shopping_cart</span> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

</main>` }} />
    );
}
