import React from 'react';

export default function Checkout() {
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
        .gold-glow { text-shadow: 0 0 30px rgba(244,196,48,0.4); }
        input, textarea {
            caret-color: #F4C430;
            color: #e5e2d8;
        }
        input:focus, textarea:focus {
            outline: none !important;
            border-bottom-color: #F4C430 !important;
            box-shadow: 0 2px 0 0 rgba(244,196,48,0.3) !important;
        }
        input::placeholder, textarea::placeholder {
            color: #6b5c4a;
        }
        /* Custom Radio Styling */
        input[type="radio"] {
            accent-color: #F4C430;
        }
        /* Ornate scroll animation */
        @keyframes shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .shimmer-btn {
            background: linear-gradient(90deg, #F4C430 0%, #e5b800 25%, #fff8dc 50%, #e5b800 75%, #F4C430 100%);
            background-size: 200% auto;
            animation: shimmer 4s linear infinite;
        }
    </style><main class="bg-[#120e0a] min-h-screen relative">

<!-- Full Page Texture -->
<div class="fixed inset-0 pointer-events-none indian-pattern-bg z-0"></div>

<div class="max-w-screen-2xl mx-auto px-8 py-24 relative z-10">

<!-- Page Header -->
<div class="mb-16 text-center relative">
    <div class="inline-block">
        <span class="text-[#F4C430] font-headline text-lg tracking-[0.4em] uppercase mb-4 block font-bold">Finalizing Your Curation</span>
        <h1 class="font-headline text-5xl md:text-7xl font-bold text-[#e5e2d8] tracking-tighter mb-4 gold-glow">The Checkout Ledger</h1>
        <div class="w-32 h-[2px] bg-[#F4C430]/40 mx-auto mt-6"></div>
    </div>
</div>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-16">

<!-- Left Column: Delivery & Payment -->
<div class="lg:col-span-7 space-y-16">

<!-- Delivery Section -->
<section class="relative">
<div class="flex items-center space-x-4 mb-8">
<div class="w-12 h-12 border border-[#F4C430]/30 flex items-center justify-center bg-[#F4C430]/5">
<span class="material-symbols-outlined text-[#F4C430] text-2xl">local_shipping</span>
</div>
<h2 class="font-headline text-3xl font-bold text-[#e5e2d8]">Delivery Sanctuary</h2>
</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 bg-[#1c1511] p-10 relative border border-[#F4C430]/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
<!-- Decorative corners -->
<div class="absolute top-3 left-3 w-6 h-6 border-t border-l border-[#F4C430]/30"></div>
<div class="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#F4C430]/30"></div>
<div class="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#F4C430]/30"></div>
<div class="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-[#F4C430]/30"></div>

<div class="space-y-1">
<label class="font-headline text-lg text-[#F4C430] block tracking-wide">Patron Name</label>
<input class="w-full bg-transparent border-b border-[#F4C430]/20 py-3 font-body text-lg transition-all" placeholder="e.g. Vikramaditya Singh" type="text"/>
</div>
<div class="space-y-1">
<label class="font-headline text-lg text-[#F4C430] block tracking-wide">Contact Number</label>
<input class="w-full bg-transparent border-b border-[#F4C430]/20 py-3 font-body text-lg transition-all" placeholder="+91 00000 00000" type="tel"/>
</div>
<div class="md:col-span-2 space-y-1">
<label class="font-headline text-lg text-[#F4C430] block tracking-wide">Residence Address</label>
<input class="w-full bg-transparent border-b border-[#F4C430]/20 py-3 font-body text-lg transition-all" placeholder="House/Villa No., Street, Landmark" type="text"/>
</div>
<div class="space-y-1">
<label class="font-headline text-lg text-[#F4C430] block tracking-wide">City / Town</label>
<input class="w-full bg-transparent border-b border-[#F4C430]/20 py-3 font-body text-lg transition-all" placeholder="Jaipur" type="text"/>
</div>
<div class="space-y-1">
<label class="font-headline text-lg text-[#F4C430] block tracking-wide">Pincode</label>
<input class="w-full bg-transparent border-b border-[#F4C430]/20 py-3 font-body text-lg transition-all" placeholder="302001" type="text"/>
</div>
<div class="md:col-span-2 space-y-1">
<label class="font-headline text-lg text-[#F4C430] block tracking-wide">Special Instructions</label>
<textarea class="w-full bg-transparent border-b border-[#F4C430]/20 py-3 font-body text-lg transition-all resize-none" placeholder="Leave at the ornate wooden gate..." rows="3"></textarea>
</div>
</div>
</section>

<!-- Payment Section -->
<section>
<div class="flex items-center space-x-4 mb-8">
<div class="w-12 h-12 border border-[#F4C430]/30 flex items-center justify-center bg-[#F4C430]/5">
<span class="material-symbols-outlined text-[#F4C430] text-2xl">payments</span>
</div>
<h2 class="font-headline text-3xl font-bold text-[#e5e2d8]">Method of Exchange</h2>
</div>
<div class="space-y-4">
<!-- UPI Option -->
<label class="flex items-center p-6 bg-[#1c1511] border-l-4 border-[#F4C430] cursor-pointer hover:bg-[#2a201b] transition-colors group border border-[#F4C430]/10">
<input class="mr-6" name="payment" type="radio"/>
<div class="flex-grow">
<span class="font-headline text-xl font-bold block text-[#e5e2d8]">Digital UPI Vault</span>
<span class="text-sm text-[#c4b5a2]">PhonePe, Google Pay, Paytm</span>
</div>
<span class="material-symbols-outlined text-[#F4C430] opacity-40 group-hover:opacity-100 transition-opacity">qr_code_2</span>
</label>
<!-- Card Option -->
<label class="flex items-center p-6 bg-[#1c1511] border-l-4 border-[#F4C430]/30 cursor-pointer hover:bg-[#2a201b] transition-colors group border border-[#F4C430]/10">
<input class="mr-6" name="payment" type="radio"/>
<div class="flex-grow">
<span class="font-headline text-xl font-bold block text-[#e5e2d8]">Credit / Debit Card</span>
<span class="text-sm text-[#c4b5a2]">Visa, Mastercard, Amex, RuPay</span>
</div>
<span class="material-symbols-outlined text-[#F4C430] opacity-40 group-hover:opacity-100 transition-opacity">credit_card</span>
</label>
<!-- Net Banking -->
<label class="flex items-center p-6 bg-[#1c1511] border-l-4 border-[#F4C430]/30 cursor-pointer hover:bg-[#2a201b] transition-colors group border border-[#F4C430]/10">
<input class="mr-6" name="payment" type="radio"/>
<div class="flex-grow">
<span class="font-headline text-xl font-bold block text-[#e5e2d8]">Traditional Banking</span>
<span class="text-sm text-[#c4b5a2]">Secure portal transfer</span>
</div>
<span class="material-symbols-outlined text-[#F4C430] opacity-40 group-hover:opacity-100 transition-opacity">account_balance</span>
</label>
<!-- COD -->
<label class="flex items-center p-6 bg-[#1c1511] border-l-4 border-[#F4C430]/30 cursor-pointer hover:bg-[#2a201b] transition-colors group border border-[#F4C430]/10">
<input class="mr-6" name="payment" type="radio"/>
<div class="flex-grow">
<span class="font-headline text-xl font-bold block text-[#e5e2d8]">Cash on Arrival</span>
<span class="text-sm text-[#c4b5a2]">Handover at your doorstep</span>
</div>
<span class="material-symbols-outlined text-[#F4C430] opacity-40 group-hover:opacity-100 transition-opacity">currency_rupee</span>
</label>
</div>
</section>
</div>

<!-- Right Column: Order Summary Sidebar -->
<aside class="lg:col-span-5">
<div class="bg-[#1c1511] p-10 relative overflow-hidden border border-[#F4C430]/20 shadow-[0_20px_60px_rgba(0,0,0,0.6)] sticky top-24">
<!-- Decorative double border -->
<div class="absolute inset-3 border border-[#F4C430]/10 pointer-events-none"></div>
<!-- Subtle watermark -->
<div class="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
<span class="material-symbols-outlined text-[300px] text-[#F4C430]">shopping_bag</span>
</div>

<h2 class="font-headline text-3xl font-bold text-[#F4C430] mb-10 relative z-10 border-b border-[#F4C430]/20 pb-4">The Selection</h2>

<div class="space-y-8 mb-10 relative z-10">
<!-- Item 1 -->
<div class="flex justify-between items-start group hover:translate-x-1 transition-transform">
<div class="flex space-x-4">
<div class="w-16 h-16 bg-[#2a201b] overflow-hidden border border-[#F4C430]/10">
<img class="w-full h-full object-cover" data-alt="close-up of aromatic loose leaf masala chai" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlyUtY5EMtw0Wiv5NFxSp6S3O1PdTRhyvzbtfLwviKave8c0603cBWzOKmxralIdC2Qe4WOWQwQvDZWwP8ujVOcbU83lI4MJ4MhwH_6XELXS92fmxAhxR3l8_yqvTiAbRxvMNbIRfRidgkY2B-f1wFcmyMe2Qj5sbHyZtyrB9XzvoSkp90SHcki5lHXD2GaP0owoAKM2H0OQkgWfTzGdNZm8Rnt6SFyprcpTlh51C3kBKzT_hqXe57aGWImAHJOPKYBVoK9TReHj4"/>
</div>
<div>
<h3 class="font-headline text-xl font-bold text-[#e5e2d8]">Masala Chai Box</h3>
<p class="text-sm text-[#c4b5a2] italic">Hand-blended spice infusion</p>
</div>
</div>
<span class="font-headline text-lg font-bold text-[#F4C430]">₹450</span>
</div>
<!-- Item 2 -->
<div class="flex justify-between items-start group hover:translate-x-1 transition-transform">
<div class="flex space-x-4">
<div class="w-16 h-16 bg-[#2a201b] overflow-hidden border border-[#F4C430]/10">
<img class="w-full h-full object-cover" data-alt="traditional indian nankhatai shortbread cookies" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqWWOWxgBGDVSHfec-MqB1u9WvpV5u-BP7s79J2JFBjGzMKn0hDrOaE_VWF58Xi12XzJBVK-Yk7w7_Zv_tS9t8pQkPw4yu7JVJYCqK8-dZOuj8rnDqOKF3omfKMcu2URmLOuKWbg5uqy4yE4YGd4rI_jyp5u8IryoRvhLtbI-gZGlntKvzHnUuD2kww23VEy3kKYljgQtaKBwH9B9aiqLRdfHbUvmp2Bl-_ZSZIWW43DcS30l2U-mZDVDg9DgpjdbcuqedIjDUDls"/>
</div>
<div>
<h3 class="font-headline text-xl font-bold text-[#e5e2d8]">Nankhatai Tin</h3>
<p class="text-sm text-[#c4b5a2] italic">Artisanal buttery cookies</p>
</div>
</div>
<span class="font-headline text-lg font-bold text-[#F4C430]">₹299</span>
</div>
<!-- Item 3 -->
<div class="flex justify-between items-start group hover:translate-x-1 transition-transform">
<div class="flex space-x-4">
<div class="w-16 h-16 bg-[#2a201b] overflow-hidden border border-[#F4C430]/10">
<img class="w-full h-full object-cover" data-alt="curated wooden tea chest" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCywb_TFPpVcDYMInWmlMRbC9s56PgPGrP1qCH8RfhGJGQHrnDCpliKZsvo8jqWc0QL_wf8Ol6vCFgZ-n4glKQCQeJ51TNoJu2IiybESi5ncGBvvWVW5VXO2OZvNOxP_bHE9q7EbPRiDQX6Ha2Pw95x03mZ2jtCExfaV9cdMLeoFXnE0Ubl52UCaRwvuov-SmX1IYKdNhn8fTkPsALNhT5p1Hkiz23K-BOBmq_YZ_1ChJNa6WqjVNaVmTtTFVtI0sRtrIVb_PrC058"/>
</div>
<div>
<h3 class="font-headline text-xl font-bold text-[#e5e2d8]">Prabhat Chai Subscription</h3>
<p class="text-sm text-[#c4b5a2] italic">Monthly archival delivery</p>
</div>
</div>
<span class="font-headline text-lg font-bold text-[#F4C430]">₹1299<span class="text-xs font-normal text-[#c4b5a2]">/mo</span></span>
</div>
</div>

<!-- Pricing Breakdown -->
<div class="border-t border-[#F4C430]/20 pt-8 space-y-4 relative z-10">
<div class="flex justify-between text-[#c4b5a2]">
<span>Subtotal</span>
<span>₹2048</span>
</div>
<div class="flex justify-between text-[#c4b5a2]">
<span>Delivery Fee</span>
<span>₹50</span>
</div>
<div class="flex justify-between items-baseline pt-4 border-t border-[#F4C430]/10">
<span class="font-headline text-2xl font-bold text-[#e5e2d8]">Total Investment</span>
<span class="font-headline text-4xl font-bold text-[#F4C430] tracking-tighter">₹2098</span>
</div>
</div>

<!-- Main CTA -->
<button class="w-full mt-10 shimmer-btn text-[#120e0a] py-6 px-8 relative overflow-hidden group hover:shadow-[0_0_40px_rgba(244,196,48,0.4)] transition-shadow">
<span class="relative z-10 font-headline text-2xl font-bold tracking-widest uppercase">Place Your Order</span>
<!-- Decorative Ornate Corners -->
<div class="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#120e0a]/30"></div>
<div class="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#120e0a]/30"></div>
<div class="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#120e0a]/30"></div>
<div class="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#120e0a]/30"></div>
</button>

<!-- Trust Badges -->
<div class="mt-12 grid grid-cols-1 gap-6 pt-10 border-t border-[#F4C430]/10 relative z-10">
<div class="flex items-center space-x-4">
<span class="material-symbols-outlined text-[#F4C430] text-2xl">eco</span>
<span class="text-sm font-headline italic text-[#c4b5a2]">Eco-Friendly Packaging</span>
</div>
<div class="flex items-center space-x-4">
<span class="material-symbols-outlined text-[#F4C430] text-2xl">verified</span>
<span class="text-sm font-headline italic text-[#c4b5a2]">Fresh Preparation</span>
</div>
<div class="flex items-center space-x-4">
<span class="material-symbols-outlined text-[#F4C430] text-2xl">shield_lock</span>
<span class="text-sm font-headline italic text-[#c4b5a2]">Secure Payment Vault</span>
</div>
</div>
</div>
</aside>
</div>
</div>
</main>` }} />
    );
}
