# BLEACH — BEYOND THE BLADE

A production-quality, cinematic web experience inspired by the **BLEACH** anime and manga universe created by Tite Kubo.

## Features

- **Dark Cinematic Visual Direction**: Deep black (`#050505`), charcoal (`#111111`), bone white (`#F2F0EA`), blood red (`#D71920`), and subtle spiritual blue accents. Incorporates manga panel compositions, film grain texture, and Japanese typography.
- **Cinematic Prologue**: Featuring Kubo's iconic Volume 5 quote with an instant "Skip Intro" option.
- **Full-Screen Hero**: Monumental typography (*"THE EDGE OF DESTINY"*), layered 3D parallax on desktop, and spiritual reishi energy.
- **Interactive 3D Zanpakuto**: Built with Three.js (lazy-loaded for high performance) allowing full 360° inspection of Zangetsu and Tensa Zangetsu with steel blade, tsuka wrapping, pommel chain, and swirling reishi particles.
- **Procedural Sound Engine**: Real-time atmospheric drone, metallic katana unsheath (*"SHIIIING!"*), and Bankai roar synthesized directly via the Web Audio API with zero external audio assets needed.
- **Section A — The Awakening**: Dark-to-light transition, Zangetsu oversized cleaver silhouette, and an interactive *"Channel Reiatsu"* pulse.
- **Section B — Soul Reaper**: Substitute Shinigami dossier, rotating Shinigami Badge emblem (死神代行証), and combat stat radar (Reiatsu, Zanjutsu, Hoho, Kido).
- **Section C — Bankai (The Visual Climax)**: Environmental shift into crimson reiatsu, interactive *"Release Bankai"* trigger with screen-shake, sound synthesis, and Tensa Zangetsu transformation.
- **Section D — The Rivalry**: Dedicated character showcases for Rukia Kuchiki (*Sode no Shirayuki*), Byakuya Kuchiki (*Senbonzakura*), and Sosuke Aizen (*Kyoka Suigetsu*), with unique accent colors, release commands, and combat metrics.
- **Section E — The Universe**: Multi-dimensional exploration of Soul Society (Seireitei), Hueco Mundo (Las Noches quartz desert), and the World of the Living (Karakura Town).
- **Section F — Final CTA**: Dramatic sword composition (*"YOUR SOUL. YOUR BLADE. YOUR DESTINY."*) with a working *"Ascend to the Beginning"* smooth scroll.
- **Performance & Accessibility**: 60 FPS particle engine with automatic mobile optimization, code-split 3D chunks, keyboard accessibility, and respect for `prefers-reduced-motion`.

## Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Bleach Design System
- **Animation**: GSAP + ScrollTrigger + RequestAnimationFrame
- **3D Graphics**: Three.js (code-split)
- **Audio**: Web Audio API (procedural synthesis)
- **Icons**: Lucide React
