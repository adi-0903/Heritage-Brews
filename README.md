<p align="center">
  <img src="public/images/Logo_new.png" alt="Heritage Brews Logo" width="320" />
</p>

<h1 align="center">🏛️ Heritage Brews: The Archival Sanctuary</h1>

<p align="center">
  <strong>A Museum-Grade E-Commerce Masterpiece celebrating the 130-Year Legacy of Indian Tea & Coffee.</strong>
  <br/>
  <em>"Preserving the essence of royalty, one flush and one bite at a time."</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Django-5.1-092E20?style=for-the-badge&logo=django&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" />
</p>

---

## 🌄 The Archival Vision

**Heritage Brews** is a digital sanctuary engineered to evoke the sensory weight of an ancient Indian haveli. It is where **High-Fidelity Interaction Design** meets **Artisanal Storytelling**. 

By blending cinematic aesthetics with a robust Django-powered backend, this project serves as a "Living Archive"—allowing patrons to explore a royal collection of rare tea flushes and centuries-old snack recipes, all synchronized through a sophisticated **Visual Sovereignty System**.

---

## 🎨 The Design Codex: "Brahmi Gold & Ancestral Ink"

Every pixel is governed by a strict visual identity that prioritizes prestige, history, and tactile depth.

### 🏛️ Digital Tokens
| Category | Token | specification | Intent |
| :--- | :--- | :--- | :--- |
| **Foundation** | `Ancestral Ink` | `#120e0a` | The deep obsidian of a midnight library. |
| **Hallmark** | `Brahmi Gold` | `#F4C430` | The warmth of burnished royal brass. |
| **Surface** | `Royal Parchment` | `#1a1510` | The texture of aged, glass-protected manuscripts. |
| **Typography** | `Heritage Headline` | *Playfair Display* | Evokes the dignity of colonial-era newspapers. |

### 🛡️ The Visual Sovereignty System
To protect the "Heritage Aesthetic" from outdated data, we implemented a **Proprietary Force-Sync Engine**:
- **Automatic Keyword Mapping**: The system scans product names (e.g., 'Gulab', 'Kaju', 'Mathri') and proactively overrides backend URLs with high-fidelity, local `/images/` specimens.
- **Cache-Busting Protocol**: Implements `?v=heritage` query strings to ensure new artisanal renders appear instantly to patrons across all sessions.

---

## 🍬 The Artisanal Item Ledger

Beyond the brews, our collection features the **Regal Confectionery Portfolio**:

| Specimen | Archival Origin | Description |
| :--- | :--- | :--- |
An infinite-scroll marquee detailing the sacred journey of the leaf:
> *Katai (Harvest) → Murjhana (Wither) → Belan (Roll) → Khameer (Ferment) → Sukhana (Dry) → Chuna (Grade)*

### 🧑‍🍳 The Sommelier's Study
A curated space for the Master Blender, featuring:
- **Subscription Vaults**: High-fidelity cards for *Silver* and *Shahi Brass* tiers.
- **Archival Treasures**: A showcase of traditional artifacts like the *Brass Tea Canister* and *Terracotta Diya*.

---

## 🛠️ Archival Architecture

### 🧱 Structural Integrity
The system is built on a **Decoupled Architecture** for maximum performance and scalability.

```mermaid
graph TD
    A[Patron / Frontend] -->|REST / JWT| B[Django Gateway]
    B --> C[Catalog Vault]
    B --> D[Rewards Sanctuary]
    B --> E[Account Records]
    C --> F[(PostgreSQL)]
    D --> F
    E --> F
```

### ⚡ Technical Specifications
- **Frontend**: Single Page Application (SPA) with **React 19** and **Vite**, optimizing for zero navigation latency.
- **Backend**: **Django REST Framework** with a custom **Loyalty Logic Engine** in the `UserProfile` model.
- **Seeding Intelligence**: A specialized `seed_catalog.py` script that calibrates the entire product ledger with a single command.

---

## 🚀 Getting Started

### 1. Secure the Perimeter
```bash
git clone https://github.com/your-username/heritage-brews.git
cd heritage-brews
```

### 2. Prepare the Backend Vault
The backend requires Python 3.10+ and a valid database connection.
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py seed_catalog  # CRITICAL: Inscribes the products & tiers
python manage.py runserver
```

### 3. Illuminate the Frontend
Ensure Node.js 18+ is installed in your workspace.
```bash
cd ..
npm install
npm run dev
```
Visit the Sanctuary at `http://localhost:5173`.

---

## 🗺️ The Archival Roadmap

- [x] **Phase I**: Core Sanctuary UI & Glassmorphism.
- [x] **Phase II**: Full-Stack Loyalty Integration (Four Ascensions).
- [x] **Phase III**: Archival Asset Migration (AI-Generated Hallmarks).
- [ ] **Phase IV**: AI-Powered Sommelier (Personalized Tea Recommender).
- [ ] **Phase V**: Global Export Ledger (International Shipping & Currencies).
- [ ] **Phase VI**: Interactive Estate VR (360° Tours of Heritage Estates).

---

## 🤝 The Archival Council (Contributing)

We welcome artisans, storytellers, and developers to contribute to the Heritage registers.
1. **Inscribe**: Fork the repository.
2. **Branch**: Create your masterpiece branch (`git checkout -b mastery/new-hallmark`).
3. **Incorporate**: Commit with descriptive, professional messages.
4. **Ascend**: Submit a Pull Request for peer review.

---

## 📜 The Royal Decree (License)

This archive is preserved under the **MIT License**.

---

<p align="center">
  <img src="public/images/Royal Seal.png" alt="Royal Seal" width="180" />
  <br/>
  <strong>Heritage Brews Archivists</strong><br/>
  <em>Preserving the taste of time, one flush at a time.</em>
</p>

<p align="center">
  Made with 🏛️, ☕, and ❤️ in India
</p>
