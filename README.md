<p align="center">
  <img src="frontend/public/images/Logo_new.png" alt="Heritage Brews Logo" width="320" />
</p>

<h1 align="center">🏛️ Heritage Brews: The Archival Sanctuary</h1>

<p align="center">
  <strong>A Museum-Grade E-Commerce Masterpiece celebrating the 130-Year Legacy of Indian Tea & Coffee.</strong>
  <br/>
  <em>"Preserving the essence of royalty, one flush and one byte at a time."</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Django-5.1-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" />
  <img src="https://img.shields.io/badge/Neon-Database-00E599?style=for-the-badge&logo=neon&logoColor=white" />
</p>

---

## 🌄 The Archival Vision: "Digital Haveli"

**Heritage Brews** is not a mere online store; it is a **Digital Sanctuary** engineered to evoke the sensory weight of an ancient Indian haveli. It represents a paradigm shift in e-commerce, where **High-Fidelity Interaction Design** meets **Artisanal Storytelling**.

The project was born from a desire to bridge the gap between 19th-century luxury and 21st-century technology. By blending cinematic aesthetics with a robust Django-powered backend, this platform serves as a "Living Archive"—allowing patrons to explore a royal collection of rare tea flushes, boutique coffee blends, and centuries-old snack recipes, all rendered through a sophisticated **Visual Sovereignty System**.

---

## 🎭 The Patron Experience (Core Modules)

The sanctuary is divided into distinct "Wings," each offering a unique immersion into Indian heritage:

### 🍵 1. The Estate Vault (Product Catalog)
A curated database of India's finest exports. From the mist-covered gardens of Darjeeling to the robust estates of Chikmagalur.
- **Dynamic Filtering**: Filter by "Estate Type" (Tea/Coffee) with real-time inventory tracking.
- **Visual Sovereignty**: Automatic keyword-based image mapping that ensures every product is represented by a high-fidelity visual specimen.

### 📜 2. The Royal Menu (Pairings)
A digital "Tea Room" experience where patrons can browse ready-to-brew blends and artisanal snacks. 
- **The Savoury Collection**: Featuring Mathri, Kachoris, and Saffron-salted nuts—all recipes sourced from archival royal kitchen logs.

### 🍷 3. Sommelier Curations (Subscriptions)
Personalized experiences for the true connoisseur.
- **Bespoke Boxes**: Multi-tiered curations that combine rare flushes with exclusive artifacts (brass strainers, hand-painted boxes).
- **Membership Integration**: Patrons can join the "Royal Registry" to unlock exclusive sommelier-grade selections.

### 🎁 4. The Gift Vault (Hampers)
Limited-edition festive boxes engineered for prestige gifting.
- **Occasion-Specific Curation**: From Diwali Mahotsav to Imperial Weddings, every hamper is a tribute to celebration.

---

## 🎨 The Design Codex: "Brahmi Gold & Ancestral Ink"

Every pixel in the sanctuary is governed by a strict visual identity that prioritizes prestige, history, and tactile depth.

### 🏛️ Digital Tokens
- **Ancestral Ink (`#120e0a`)**: The deep obsidian foundation of the sanctuary.
- **Brahmi Gold (`#F4C430`)**: The warmth of burnished royal brass used for hallmarks and highlights.
- **Glassmorphism**: A custom `backdrop-blur(20px)` surface with fine-rimmed golden borders, simulating the look of aged parchment behind glass.

### 🎞️ Cinematic Interactions
- **Vault Sealed State**: When an item is depleted, the sanctuary enters a "Archival Preservation" state. Images are rendered in deep grayscale with a blurred overlay, signaling to the patron that the vault for that specific flush is currently sealed.
- **Sweep Animations**: Every page transition and hover effect uses smooth, high-frame-rate CSS "sweep" animations to mimic the unfolding of a royal decree.

---

## ⚙️ Technical Pedigree (The Engine)

The sanctuary is powered by an industrial-grade stack designed for security, scalability, and speed.

### 🛡️ Backend Sophistication (Django REST Framework)
- **JWT Authentication**: A secure, encrypted token system for patron login and account security.
- **PostgreSQL (Neon Cloud)**: A serverless, high-performance database cluster hosting the sanctuary's critical records.
- **Cloudinary Integration**: A custom media management layer that handles high-fidelity image uploads, ensuring zero latency in visual rendering.
- **Neural Weather Integration**: (Optional) Real-time weather telemetry from estate locations to show patrons the exact conditions where their tea is currently growing.

### 🖥️ Frontend Engineering (React + Vite)
- **Vite 6.0**: Lightning-fast build tool for a high-performance SPA (Single Page Application).
- **Framer Motion**: Powering the advanced micro-interactions and cinematic transitions.
- **TailwindCSS 4.0**: Providing the utility-first foundation for the sanctuary's complex responsive layouts.

---

## 🛡️ The Imperial Command (Admin & Infrastructure)

We have recently upgraded the sanctuary's administrative capabilities with the **Imperial Command Center**:

### 📦 Image Inscription (Direct Uploads)
Administrators can now **inscribe new imagery** directly from their desktop. Integrated with **Cloudinary**, the system securely uploads, optimizes, and serves visuals globally.

### 🏛️ The Royal Registry (Admin Dashboard)
- **Patron Analytics**: Advanced management of the "Royal Registry," strictly excluding staff to provide accurate customer metrics.
- **Order Decree Tracking**: A real-time log of every order placed via the **WhatsApp Checkout Protocol**.
- **Inventory Scribing**: A unified modal for adding new heritage items across all categories.

---

## ⚡ Setup & Initiation

### 1. Acquire the Archive
```bash
git clone https://github.com/your-username/heritage-brews.git
cd heritage-brews
```

### 2. Prepare the Backend Vault
Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL=your_postgresql_url
SECRET_KEY=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
OPENWEATHER_API_KEY=your_key
```

Run the initiation sequence:
```bash
cd backend
python -m venv venv
source venv/bin/activate # Win: .\venv\Scripts\activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### 3. Illuminate the Frontend
```bash
cd ../frontend
npm install
npm run dev
```

---

## 📜 The Royal Decree (License)

This archive and its artisanal intellectual property are preserved under the **MIT License**.

<p align="center">
  <img src="frontend/public/images/Royal Seal.png" alt="Royal Seal" width="180" />
  <br/>
  <strong>Heritage Brews Archivists</strong><br/>
  <em>Preserving the taste of time, one flush at a time.</em>
</p>

<p align="center">
  Made with 🏛️, ☕, and ❤️ in India
</p>
