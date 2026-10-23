import React, { useState } from 'react';
import { Flame, Sparkles, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

export const AwakeningSection: React.FC = () => {
  const [isEnergized, setIsEnergized] = useState(false);

  const handlePulse = () => {
    sound.playSwordDraw();
    setIsEnergized(true);
    setTimeout(() => setIsEnergized(false), 2200);
  };

  return (
    <section
      id="awakening"
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0c] to-[#050505]"
    >
      {/* Background Red Energy Pulse */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-1000 ${
          isEnergized ? 'bg-[#D71920]/15' : 'bg-transparent'
        }`}
      />

      {/* Atmospheric Radial Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#D71920]/10 via-[#990000]/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      {/* Watermark Section Kanji */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-5 hidden lg:block">
        <span className="font-kanji text-[18vw] font-black text-white leading-none">
          覚醒
        </span>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: Layered Sword Composition & Silhouette */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="relative manga-panel p-3 overflow-hidden shadow-2xl group">
            {/* Visual blade image */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
              <img
                src="/assets/zangetsu-blade.jpg"
                alt="Zangetsu blade embedded in ground"
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isEnergized ? 'scale-105 filter brightness-125 contrast-125' : 'filter brightness-95'
                }`}
                loading="lazy"
              />

              {/* Red Energy Pulse Ring */}
              <div
                className={`absolute inset-0 border-2 border-[#D71920] transition-opacity duration-500 pointer-events-none ${
                  isEnergized ? 'opacity-100 shadow-[inset_0_0_50px_rgba(215,25,32,0.6)]' : 'opacity-0'
                }`}
              />

              {/* Japanese Inscription Badge */}
              <div className="absolute top-4 left-4 z-10 bg-black/80 px-3 py-1 border-l-2 border-[#D71920]">
                <span className="font-kanji text-xs text-[#F2F0EA] tracking-wider">
                  斬魄刀 // 始解の胎動
                </span>
              </div>

              {/* Interactive Pulse Trigger on image */}
              <div className="absolute bottom-4 right-4 z-10">
                <button
                  onClick={handlePulse}
                  onMouseEnter={() => sound.playHover()}
                  className="px-3.5 py-1.5 bg-[#D71920] hover:bg-[#ff2d37] text-black text-xs font-mono font-bold tracking-widest uppercase transition-all flex items-center gap-2 shadow-lg"
                >
                  <Zap className="w-3.5 h-3.5" />
                  <span>CHANNEL REIATSU</span>
                </button>
              </div>
            </div>

            {/* Inset metadata panel */}
            <div className="p-4 bg-[#0a0a0c] border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-white/40 block">
                  CANONICAL BLADE FORM
                </span>
                <span className="font-cinzel text-sm font-bold text-white tracking-wider">
                  SHIKAI: OVERSIZED CLEAVER
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className={`w-4 h-4 ${isEnergized ? 'text-[#D71920] animate-bounce' : 'text-white/40'}`} />
                <span className="font-mono text-xs text-white/70">
                  {isEnergized ? 'REI-FLOW: 100%' : 'REI-FLOW: IDLE'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Narrative Storytelling */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex flex-col items-start">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs text-[#D71920] font-bold tracking-widest">
              // SECTION A
            </span>
            <span className="w-8 h-[1px] bg-white/20" />
            <span className="font-kanji text-xs text-white/50 tracking-widest">
              第一章・覚醒
            </span>
          </div>

          <h2 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl text-[#F2F0EA] tracking-tight uppercase leading-[1.05] mb-6">
            THE AWAKENING
          </h2>

          <p className="font-sans-editorial text-base sm:text-lg text-white/80 font-light leading-relaxed mb-6">
            When Rukia Kuchiki pierced Ichigo’s chest with her Zanpakuto to transfer a fraction of her powers, his slumbering spiritual reservoir did not merely absorb the energy—it roared into existence, breaking every known boundary of mortal spirit.
          </p>

          <p className="font-sans-editorial text-sm sm:text-base text-white/60 font-light leading-relaxed mb-8">
            The blade formed is not an ordinary katana. It takes the colossal shape of a handle-less khopesh cleaver, unwrapped cloth rippling like a battle standard. It has no sheath, for Ichigo’s spiritual pressure never ceases to overflow.
          </p>

          {/* Key Lore Markers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div className="p-4 bg-white/[0.02] border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#D71920] mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="font-cinzel text-xs font-bold tracking-wider uppercase">
                  UNCONTAINED REIATSU
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans-editorial">
                Unlike ordinary Shinigami who seal their blades into compact katanas, Zangetsu remains constantly liberated in permanent Shikai.
              </p>
            </div>

            <div className="p-4 bg-white/[0.02] border border-white/10 relative overflow-hidden">
              <div className="flex items-center gap-2 text-[#00e5ff] mb-1">
                <Zap className="w-4 h-4" />
                <span className="font-cinzel text-xs font-bold tracking-wider uppercase">
                  GETSUGA TENSHO
                </span>
              </div>
              <p className="text-xs text-white/60 font-sans-editorial">
                Fires concentrated spiritual energy from the tip of the blade in the shape of a piercing crescent moon capable of parting clouds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
