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

## 🌄 The Archival Vision

**Heritage Brews** is a digital sanctuary engineered to evoke the sensory weight of an ancient Indian haveli. It represents a paradigm shift in e-commerce, where **High-Fidelity Interaction Design** meets **Artisanal Storytelling**.

By blending cinematic aesthetics with a robust Django-powered backend, this project serves as a "Living Archive"—allowing patrons to explore a royal collection of rare tea flushes and centuries-old snack recipes, all perfectly rendered through a sophisticated **Visual Sovereignty System**.

---

## 🎨 The Design Codex: "Brahmi Gold & Ancestral Ink"

Every pixel is governed by a strict visual identity that prioritizes prestige, history, and tactile depth.

### 🏛️ Digital Tokens

- **Ancestral Ink (`#120e0a`)**: The deep obsidian foundation of the sanctuary.
- **Brahmi Gold (`#F4C430`)**: The warmth of burnished royal brass used for hallmarks and highlights.
- **Royal Parchment Glass**: A custom `backdrop-blur(20px)` surface with fine-rimmed golden borders.

### 🛡️ The Visual Sovereignty System

To ensure that the "Heritage Aesthetic" is never diluted, we implemented a **Proprietary Force-Sync Engine**:

- **Automatic Keyword Mapping**: The frontend proactively overrides generic backend URLs with high-fidelity local `/images/` specimens for heritage items like 'Gulab Jamun' or 'Mathri'.
- **Vault Sealed (Out of Stock)**: A cinematic state that renders depleted items in deep grayscale with a blurred "Archive Sealed" overlay, maintaining the museum's aesthetic even in scarcity.

---

## 🛡️ The Imperial Command (Admin & Infrastructure)

We have recently upgraded the sanctuary's administrative capabilities with the **Imperial Command Center**:

### 📦 Cloudinary Image Management
Administrators can now **inscribe new imagery** directly from their desktop. Integrated with **Cloudinary API**, the system securely uploads, optimizes, and serves high-fidelity visuals across the global network.

### 🏛️ The Royal Vault (Admin Dashboard)
A sophisticated command interface for the sanctuary's overseers:
- **Patron Registry**: Advanced management of the "Royal Registry," excluding staff/superusers to provide accurate patron metrics.
- **Order Decree Management**: Real-time tracking of order statuses and archival updates.
- **Inventory Scribing**: A multi-modal interface for adding Products, Sommelier Curations, and Gift Hampers with full image upload support.

### 🔐 Security Architecture
- **JWT Authentication**: Secure, token-based access for patrons and administrators.
- **PostgreSQL (Neon Cloud)**: A serverless, high-performance database cluster hosting the sanctuary's critical records.
- **Django REST Framework**: A secure, industrial-grade API layer connecting the vault to the interface.

---

## 🍬 The Artisanal Portfolio

We have expanded the archive to include the **Regal Confectionery & Savory Collection**:

### 🍰 Royal Sweets
- **Awadhi Rose Gulab Jamun**: Saffron spheres in damask rose syrup with a pistachio heart.
- **Shahi Tukda (Silver Signature)**: Saffron-soaked bread pudding finished with edible silver leaf.
- **Mysore Pak (Ghee-Rich Reserve)**: Legendary chickpea fudge prepared with 24-month aged clarified butter.

### 🥨 Savoury Snacks
- **Mathri of the Marwars**: Fenugreek-infused flaky crackers.
- **Kachori of the Kachwahas**: Spiced lentil-filled crisp pastry.
- **Saffron-Salted Cashews**: Jumbo kernels roasted with premium Kashmiri Saffron.

---

## 🚀 Setting Up the Sanctuary

### 1. Secure the Archive
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
```

Then run the initiation sequence:
```bash
cd backend
python -m venv venv
# Activate venv: .\venv\Scripts\activate (Win)
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
