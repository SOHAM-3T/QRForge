<div align="center">

# 𖣯 QRForge

**A modern, privacy-first, fully client-side QR code design studio & generator.**

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[**Live Demo**](https://qrforge.vercel.app) • [**Features**](#-key-features) • [**Getting Started**](#-getting-started) • [**Tech Stack**](#-tech-stack) • [**Contributing**](#-contributing)

</div>

---

## 🌟 Overview

**QRForge** is an open-source, client-side web application designed to create beautiful, branded, and customizable QR codes without subscription fees or privacy compromises.

Unlike traditional QR generators that process data on remote servers or inject middleman redirect URLs, **QRForge encodes, renders, and exports all QR codes 100% locally within the browser**. Your sensitive data never leaves your device.

---

## 🗝️ Key Features

###  12 Versatile Content Types
Encode virtually any payload into standard, universally scannable QR formats:
- 🌐 **Website URL** – Standard web links & deep links
- 📝 **Plain Text** – Raw text messages or markdown snippets
- ✉️ **Email** – Pre-filled recipient, subject line, and body
- 📞 **Phone** – Direct telephone dialing (`tel:`)
- 💬 **SMS** – Pre-filled phone number and message (`sms:`)
- 📶 **Wi-Fi Network** – Instant connection credentials (WPA/WPA2, WEP, Open) with hidden SSID toggle
- 👤 **vCard Contact** – Comprehensive contact card (Name, Org, Phone, Email, Website, Address)
- 📍 **Location** – Latitude & longitude geographic pin coordinates
- 💳 **UPI Payment** – Instant Indian UPI payment link with payee name, amount, currency, and note
- 📅 **Calendar Event** – Event name, start/end dates, location, and description
- 🔗 **Social Profile** – Dedicated templates for X/Twitter, Instagram, LinkedIn, GitHub, YouTube, TikTok, WhatsApp, Telegram, and Snapchat
- ⚙️ **Custom Payload** – Raw data strings, JSON, or app-specific URI schemes

---

### 🎨 Powerful Visual Designer
Craft distinctive QR codes that reflect your brand identity:
- **Body Patterns**: `Square`, `Dots`, `Rounded`, `Extra Rounded`, `Classy`, and `Classy Rounded`.
- **Corner/Eye Frames**: `Square`, `Dot`, and `Extra Rounded`.
- **Corner/Eye Center Dots**: `Square` and `Dot`.
- **Full Color Engine**: Independent color controls for foreground dots, corner squares, center dots, and background.
- **Linear & Radial Gradients**: Dynamic multi-stop gradients with custom rotation angles.
- **Error Correction Configuration**: Selectable error correction levels (**L** ~7%, **M** ~15%, **Q** ~25%, **H** ~30%) with scannability trade-off guidance.

---

### 🖼️ Custom Logo & Icon Embedding
- Seamlessly upload brand logos (`PNG`, `JPG`, `SVG`, `WebP`).
- Real-time proportional size scaling (10% to 50% of QR dimensions).
- Configurable background padding and smart background dot masking to preserve logo clarity while keeping the code scannable.
- Quick removal and instant live updates.

---

### 🚀 High-Resolution Multi-Format Export
- **Formats Supported**:
  - **PNG** - Lossless raster format with transparent background support.
  - **SVG** - Infinitely scalable vector format, ideal for large-format print & merchandise.
  - **JPEG** - Lightweight compressed image format.
  - **WebP** - Modern, lightweight raster format for digital performance.
- **Export Resolutions**: Presets from **512×512** up to **4096×4096** (Ultra-HD 4K).
- **Automated Naming**: Timestamped file generation for effortless asset organization.

---

### 🛡️ Privacy & Local State
- **Zero Server Processing**: All encoding and canvas rendering occur client-side.
- **Zero Tracking**: No telemetry, analytics, or third-party tracking pixels.
- **Persistent State**: Automated autosave using browser `localStorage` with full Undo/Redo (`Ctrl+Z` / `Ctrl+Y`) support.

---

### 📦 Built-In Design Presets
Includes curated design templates to get started in one click:
- **Classic**: Traditional high-contrast monochrome design.
- **Minimal**: Subtle rounded modules with generous quiet zones.
- **Gradient**: Vibrant violet-to-indigo gradient styling.
- **Branded**: Optimized for central corporate logo placement.
- **Business**: Navy and gold accents for corporate collateral.
- **Social**: High-energy color schemes for creators and influencers.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + Vanilla CSS design tokens |
| **UI Components** | [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/) patterns + [Lucide React](https://lucide.dev/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **QR Engine** | [qr-code-styling](https://github.com/kozakdenys/qr-code-styling) |
| **Color Picker** | [react-colorful](https://github.com/omgovich/react-colorful) |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) |
| **Linter** | [Oxlint](https://oxc.rs/) |

---

## 📂 Project Structure

```text
qrforge/
├── public/                # Static public assets
├── src/
│   ├── assets/            # Project image and SVG assets
│   ├── components/        # React components
│   │   ├── content/       # Content-type specific form inputs (URL, WiFi, etc.)
│   │   ├── designer/      # Visual controls (PatternSelector, EyeStyle, ColorPicker, LogoPanel)
│   │   ├── export/        # Resolution & format export controls
│   │   ├── layout/        # Navbar, Footer, and App Shell
│   │   ├── qr/            # Live QR preview canvas & render engine
│   │   ├── templates/     # Template cards and gallery grid
│   │   └── ui/            # Reusable UI primitives (Buttons, Tabs, Sliders, Dialogs)
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility libraries & engine helpers
│   │   ├── constants.ts   # Default configurations & platform metadata
│   │   ├── export-engine.ts # High-res export & format converter
│   │   ├── qr-encoder.ts  # QR payload formatting (MECARD, vCard, UPI, etc.)
│   │   ├── qr-engine.ts   # Core bridge to qr-code-styling
│   │   └── templates.ts   # Pre-configured design presets
│   ├── pages/             # Route pages (Home, Create, Templates, About)
│   ├── store/             # Zustand state stores (QR state, history, templates)
│   ├── types/             # TypeScript interfaces & type definitions
│   ├── App.tsx            # Main router configuration
│   ├── index.css          # Tailwind CSS v4 setup & theme variables
│   └── main.tsx           # Application entry point
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (**v18+** recommended) and `npm` installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SOHAM-3T/QRForge.git
   cd QRForge
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

### Available Scripts

- `npm run dev` — Starts the Vite development server with Hot Module Replacement (HMR).
- `npm run build` — Type-checks and builds the production-ready bundle in `dist/`.
- `npm run preview` — Locally previews the production build.
- `npm run lint` — Runs fast static analysis using `oxlint`.

---

## 🔒 Privacy & Security

QRForge was architected with privacy as a foundational principle:
- ❌ **No backend server** processing QR payloads.
- ❌ **No shortened URLs** or proxy redirection links.
- ❌ **No cookies, accounts, or authentication required.**
- ✅ **100% offline-capable** once loaded.

---

## 🤝 Contributing

Contributions, feature requests, and bug reports are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by Soham Tripathy for privacy and clean design.</sub>
</div>
