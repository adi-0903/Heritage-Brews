<p align="center">
  <img src="public/images/Logo_new.png" alt="Heritage Brews Logo" width="280" />
</p>

<h1 align="center">🏛️ Heritage Brews</h1>

<p align="center">
  <strong>The Living Archive of Royal Indian Tea & Coffee</strong>
  <br/>
  <em>An immersive, full-stack archival experience celebrating 130 years of artisanal craft.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Django-5.1-092E20?style=flat-square&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-16.x-336791?style=flat-square&logo=postgresql&logoColor=white" />
</p>

---

## 🌄 The Vision

**Heritage Brews** is not merely an e-commerce platform; it is a **digital sanctum** dedicated to the preservation of Indian tea culture. From the mist-shrouded peaks of Darjeeling to the sun-drenched estates of Coorg, we bring the story of the leaf to the modern patron. 

Every interaction is designed with cinematic intentionality, leveraging **Obsidian & Gold** aesthetics, glassmorphic interfaces, and traditional archival patterns to deliver a museum-grade user experience.

---

## ✨ Key Hallmarks

### 🎨 Design Language
- **Obsidian & Gold Aesthetic**: A deep espresso foundation (`#120e0a`) contrasted with royal heritage gold (`#F4C430`).
- **Glassmorphic Sanctuary**: Interactive components housed in frosted-glass plaques with high-luminosity blurs and ornate frames.
- **Archival Textures**: Dynamic background textures including handmade parchment, hammered brass, and royal silk brocade.
- **Cinematic Vignettes**: Sophisticated lighting effects and micro-animations that respond to the patron's journey.

### 🍵 Patron Experiences
- **The Sommelier’s Selection**: A curated subscription service tailored to the nuances of artisanal palettes.
- **The Four Ascensions**: A prestigious loyalty system allowing patrons to progress from *Naya Patron* to the peak of *Maharaja*.
- **The Alchemy of Six**: An infinite marquee showcasing the transformative steps of artisanal tea production.
- **Interactive Map Pins**: A vintage cartographic exploration of India's most majestic tea and coffee estates.

---

## 🛠️ Artisan Stack

### Frontend
- **React 19**: Powered by Vite for sub-second performance.
- **Tailwind CSS 4**: Utilizing utility-first styling with advanced CSS-in-JS micro-interactions.
- **React Context API**: Managing the global cart sanctuary and patron authentication.

### Backend
- **Django REST Framework**: A robust, archival-grade API for managing the product ledger and patron accounts.
- **PostgreSQL**: The primary vault for secure, relational data persistence.
- **SimpleJWT**: Secure, token-based authentication for the Inner Sanctum.

---

## 🚀 Getting Started

### 1. Clone the Archive
```bash
git clone https://github.com/your-username/ heritage-brews.git
cd heritage-brews
```

### 2. Prepare the Backend Vault
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_catalog  # Inscribe the global registers
python manage.py runserver
```

### 3. Initialize the Frontend Sanctuary
```bash
cd ..
npm install
npm run dev
```

The portal will be accessible at `http://localhost:5173`.

---

## 📁 Archival Structure

```text
heritage-brews/
├── backend/               # Django API & Archival Logic
│   ├── accounts/          # Patron Management
│   ├── catalog/           # The Product Ledger
│   ├── rewards/           # Ascension & Token Logic
│   └── seed_catalog.py    # Database Seeding Script
├── src/                   # React Frontend Sanctuary
│   ├── components/        # Glassmorphic UI Elements
│   ├── context/           # Global State Architecture
│   ├── pages/             # Cinematic Page Routings
│   └── api/               # API Integration Layer
├── public/                # Physical Brand Assets
│   └── images/            # High-Fidelity Hallmarks & Textures
└── README.md              # The Technical Ledger
```

---

## 🎨 Design System

| Element | Specification |
| :--- | :--- |
| **Primary** | `#120e0a` (Obsidian) |
| **Accent** | `#F4C430` (Royal Gold) |
| **Surface** | `#1a1510` (Dark Walnut) |
| **Typography** | Noto Serif (Heritage), Inter (Data) |

---

## 🤝 Contributing

We invite contributions from developers who share our passion for craft and heritage. Please ensure all pull requests adhere to our aesthetic and code-quality standards.

1. Fork the Archive.
2. Create your Feature Branch (`git checkout -b feature/Masterwork`).
3. Commit your changes (`git commit -m 'Inscribe a new hallmark'`).
4. Push to the Branch (`git push origin feature/Masterwork`).
5. Open a Pull Request for review by the Archival Council.

---

## 📜 License

This project is licensed under the **MIT License**.

---

<p align="center">
  <strong>Heritage Brews</strong><br/>
  <em>"From the estates of India — Our Journey, Your Cup."</em>
  <br/><br/>
  Made with ☕ and ❤️ in India
</p>
