import React from 'react';
import { ArrowUp } from 'lucide-react';
import { sound } from '../utils/audio';

export const FinalCtaSection: React.FC = () => {
  const handleScrollToTop = () => {
    sound.playSwordDraw();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="destiny"
      className="relative min-h-[90vh] w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#D71920]/10 rounded-full blur-[180px] pointer-events-none" />

      {/* Central Dramatic Composition */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center my-auto">
        {/* Emblem badge */}
        <div className="w-12 h-12 bg-black border border-white/20 flex items-center justify-center font-kanji text-[#D71920] text-2xl font-black mb-6 shadow-[0_0_20px_rgba(215,25,32,0.4)]">
          卍
        </div>

        <span className="font-mono text-xs tracking-[0.35em] text-[#D71920] uppercase font-bold mb-4 block">
          // SECTION F // THE ETERNAL PACT
        </span>

        <h2 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-7xl text-white tracking-tight uppercase leading-[1.05] mb-6">
          YOUR SOUL. <br />
          <span className="text-[#D71920] drop-shadow-[0_0_40px_rgba(215,25,32,0.6)]">
            YOUR BLADE.
          </span>{' '}
          <br />
          YOUR DESTINY.
        </h2>

        <p className="font-sans-editorial text-base sm:text-xl text-white/70 font-light max-w-xl mx-auto leading-relaxed mb-10">
          The boundary between human frailty and celestial authority is forged in the fires of conviction. Will you heed the call of the Soul Society?
        </p>

        {/* Working Return to Top Button */}
        <button
          onClick={handleScrollToTop}
          onMouseEnter={() => sound.playHover()}
          className="btn-blade group px-8 py-4 bg-[#D71920] hover:bg-[#ff2d37] text-black font-cinzel font-bold text-sm tracking-[0.25em] uppercase flex items-center gap-3 transition-all duration-300 shadow-[0_0_30px_rgba(215,25,32,0.5)] focus:outline-none focus:ring-2 focus:ring-white cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          <span>ASCEND TO THE BEGINNING</span>
        </button>

        {/* Kanji Quote */}
        <div className="mt-12 text-center">
          <p className="font-kanji text-sm text-white/30 tracking-[0.3em]">
            我が刃に宿る誇りは、如何なる絶望をも両断する。
          </p>
        </div>
      </div>

      {/* Production Quality Editorial Footer */}
      <footer className="relative z-10 max-w-7xl w-full mx-auto pt-16 border-t border-white/10 mt-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-[#111] border border-white/20 flex items-center justify-center font-kanji text-xs text-[#D71920]">
              斬
            </div>
            <span className="font-cinzel text-sm tracking-widest text-white font-bold">
              BLEACH — BEYOND THE BLADE
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-white/50 tracking-wider">
            <a href="#awakening" className="hover:text-white transition-colors">
              AWAKENING
            </a>
            <a href="#soul-reaper" className="hover:text-white transition-colors">
              SHINIGAMI
            </a>
            <a href="#bankai" className="hover:text-white transition-colors">
              BANKAI
            </a>
            <a href="#rivalry" className="hover:text-white transition-colors">
              RIVALRY
            </a>
            <a href="#universe" className="hover:text-white transition-colors">
              REALMS
            </a>
          </div>

          <div className="text-right">
            <span className="font-mono text-[10px] text-white/40 block tracking-widest uppercase">
              REIATSU STABILITY: 100%
            </span>
            <span className="font-kanji text-xs text-white/30">
              護廷十三隊認可記録
            </span>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30">
          <p>
            An unofficial cinematic fan tribute inspired by the BLEACH anime and manga series created by Tite Kubo.
          </p>
          <p>
            Built with React, TypeScript, Three.js, GSAP & Web Audio API.
          </p>
        </div>
      </footer>
    </section>
  );
};
