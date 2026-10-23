import React, { useEffect, useRef } from 'react';
import { ArrowRight, Compass, ShieldAlert } from 'lucide-react';
import { sound } from '../utils/audio';

interface HeroProps {
  onEnter: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const artworkRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Subtle mouse parallax on desktop only
    const isDesktop = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX - innerWidth / 2) / (innerWidth / 2);
      const yOffset = (e.clientY - innerHeight / 2) / (innerHeight / 2);

      if (artworkRef.current) {
        artworkRef.current.style.transform = `translate3d(${xOffset * -16}px, ${yOffset * -16}px, 0) scale(1.02)`;
      }
      if (textRef.current) {
        textRef.current.style.transform = `translate3d(${xOffset * 10}px, ${yOffset * 10}px, 0)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handlePrimaryClick = () => {
    sound.playSwordDraw();
    onEnter();
  };

  const handleSecondaryClick = () => {
    sound.playHover();
    const el = document.getElementById('soul-reaper');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20 pb-12 lg:py-0"
    >
      {/* Layer 1: Atmospheric Background Fog & Radial Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D71920]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00e5ff]/5 rounded-full blur-[160px] pointer-events-none" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      </div>

      {/* Layer 2: Monumental Japanese Kanji Backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-1 select-none overflow-hidden">
        <span className="font-kanji text-[22vw] font-black text-white/[0.03] tracking-tight leading-none">
          黒崎一護
        </span>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 min-h-[calc(100vh-5rem)]">
        {/* Text Editorial Content */}
        <div
          ref={textRef}
          className="w-full lg:w-1/2 flex flex-col items-start transition-transform duration-300 ease-out z-20"
        >
          {/* Metadata Badge */}
          <div className="flex items-center gap-3 mb-6 px-3 py-1.5 bg-black/60 border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D71920] animate-pulse" />
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-white/80">
              BLEACH CHRONICLES // GOTEI 13 ARCHIVE
            </span>
            <span className="font-kanji text-xs text-[#D71920]">霊圧解放</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-cinzel font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-[#F2F0EA] uppercase leading-[0.95] mb-6">
            THE EDGE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F2F0EA] via-white to-white/70">
              OF
            </span>{' '}
            <span className="text-[#D71920] inline-block drop-shadow-[0_0_35px_rgba(215,25,32,0.6)]">
              DESTINY.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="font-sans-editorial text-lg sm:text-xl lg:text-2xl text-white/70 font-light max-w-xl leading-relaxed mb-8">
            When the blade awakens, the world trembles. Step into the spiritual battlefield where soul reapers clash against eternity.
          </p>

          {/* Japanese Inscription */}
          <div className="border-l-2 border-[#D71920] pl-4 mb-10 py-1">
            <p className="font-kanji text-sm sm:text-base text-white/50 tracking-widest">
              命を懸けて、護るべきものを護る。その覚悟が今、黒き刃を研ぎ澄ます。
            </p>
            <span className="text-[11px] font-mono tracking-widest text-[#D71920] uppercase mt-1 block">
              ZANGETSU: SPIRITUAL CUTTER
            </span>
          </div>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            {/* Primary CTA */}
            <button
              onClick={handlePrimaryClick}
              onMouseEnter={() => sound.playHover()}
              className="btn-blade group px-8 py-4 bg-[#D71920] hover:bg-[#ff242d] text-[#050505] font-cinzel font-bold text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(215,25,32,0.5)] focus:outline-none focus:ring-2 focus:ring-white"
            >
              <span>ENTER SOUL SOCIETY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary CTA */}
            <button
              onClick={handleSecondaryClick}
              onMouseEnter={() => sound.playHover()}
              className="group px-7 py-4 border border-white/20 hover:border-white/60 bg-black/40 hover:bg-white/5 text-[#F2F0EA] font-cinzel text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#D71920]"
            >
              <Compass className="w-4 h-4 text-[#D71920] group-hover:rotate-45 transition-transform duration-300" />
              <span>EXPLORE THE STORY</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-6 sm:gap-8 mt-12 pt-8 border-t border-white/10 w-full max-w-lg">
            <div>
              <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                ZANPAKUTO
              </span>
              <span className="font-cinzel text-base sm:text-lg font-bold text-white">
                ZANGETSU
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                REI PRESSURE
              </span>
              <span className="font-cinzel text-base sm:text-lg font-bold text-[#D71920]">
                CAPTAIN CLASS
              </span>
            </div>
            <div>
              <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                STATUS
              </span>
              <span className="font-cinzel text-base sm:text-lg font-bold text-[#00e5ff]">
                SUBSTITUTE
              </span>
            </div>
          </div>
        </div>

        {/* Artwork Layer with 3D Depth */}
        <div
          ref={artworkRef}
          className="w-full lg:w-1/2 flex items-center justify-center relative transition-transform duration-500 ease-out"
        >
          {/* Outer Manga Framing Box */}
          <div className="relative w-full max-w-lg lg:max-w-xl aspect-[4/5] sm:aspect-square lg:aspect-[4/5] manga-panel overflow-hidden p-3 shadow-2xl">
            {/* Background Image Container */}
            <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#111] to-[#050505]">
              <img
                src="/assets/ichigo-hero.jpg"
                alt="Ichigo Kurosaki wielding Zangetsu"
                className="w-full h-full object-cover object-top scale-105 filter contrast-110 saturate-105 transition-transform duration-700 hover:scale-110"
                loading="eager"
              />

              {/* Atmospheric Gradient Overlays for Cinematic Integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/40 pointer-events-none" />

              {/* Japanese Vertical Calligraphy Overlay */}
              <div className="absolute top-6 left-6 z-10 writing-vertical text-[#D71920] font-kanji font-black text-2xl tracking-[0.3em] select-none drop-shadow-[0_0_12px_rgba(215,25,32,0.8)]">
                黒崎一護 // 覚醒
              </div>

              {/* Bottom Info HUD in Artwork */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between p-4 bg-black/80 backdrop-blur-md border border-white/10">
                <div>
                  <div className="flex items-center gap-2 text-[#D71920] text-xs font-mono uppercase tracking-widest">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>HIGH SPIRITUAL REACTION</span>
                  </div>
                  <h4 className="font-cinzel text-base font-bold text-white tracking-wider mt-0.5">
                    ICHIGO KUROSAKI
                  </h4>
                </div>
                <div className="text-right">
                  <span className="font-kanji text-xl text-white/90">死神</span>
                  <span className="block font-mono text-[9px] text-white/50 tracking-wider">
                    SECTOR 01
                  </span>
                </div>
              </div>
            </div>

            {/* Corner Accent Marks */}
            <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#D71920]" />
            <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#D71920]" />
          </div>
        </div>
      </div>
    </section>
  );
};
