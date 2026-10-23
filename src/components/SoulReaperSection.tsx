import React, { useState, Suspense, lazy } from 'react';
import { characters } from '../data/characters';
import { Shield, Activity, Award, Disc } from 'lucide-react';
import { sound } from '../utils/audio';

const ZanpakutoCanvas3D = lazy(() =>
  import('./ZanpakutoCanvas3D').then((m) => ({ default: m.ZanpakutoCanvas3D }))
);

export const SoulReaperSection: React.FC = () => {
  const ichigo = characters[0]; // Ichigo Kurosaki
  const [activeTab, setActiveTab] = useState<'profile' | 'blade3d'>('profile');

  return (
    <section
      id="soul-reaper"
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] border-t border-b border-white/[0.08] overflow-hidden"
    >
      {/* Huge Background Typography */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 select-none pointer-events-none opacity-[0.03] text-center w-full overflow-hidden">
        <span className="font-kanji text-[25vw] font-black text-white leading-none whitespace-nowrap">
          死神代行
        </span>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/10 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#D71920] font-bold tracking-widest">
                // SECTION B
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="font-kanji text-xs text-white/50 tracking-widest">
                死神の誇りと宿命
              </span>
            </div>
            <h2 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl text-[#F2F0EA] tracking-tight uppercase">
              SOUL REAPER
            </h2>
            <p className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase mt-2">
              SUBSTITUTE SHINIGAMI // GOTEI 13 RECOGNITION
            </p>
          </div>

          {/* Tab Switcher: Profile vs 3D Blade Inspection */}
          <div className="flex items-center gap-2 p-1 bg-black/80 border border-white/15">
            <button
              onClick={() => {
                sound.playHover();
                setActiveTab('profile');
              }}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 ${
                activeTab === 'profile'
                  ? 'bg-[#D71920] text-black font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>DOSSIER</span>
            </button>
            <button
              onClick={() => {
                sound.playHover();
                setActiveTab('blade3d');
              }}
              className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all flex items-center gap-2 ${
                activeTab === 'blade3d'
                  ? 'bg-[#D71920] text-black font-bold'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>3D ZANPAKUTO</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'profile' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 4 cols: Substitute Soul Reaper Badge Emblem */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="manga-panel p-6 relative overflow-hidden group">
                {/* Shinigami Badge Replica */}
                <div className="relative aspect-square w-full max-w-sm mx-auto flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#1c1212] via-[#0d0d0f] to-[#050505] border border-white/10 shadow-2xl">
                  {/* Decorative Outer Ring */}
                  <div className="absolute inset-4 border border-dashed border-white/20 rounded-full animate-spin [animation-duration:40s]" />
                  <div className="absolute inset-10 border border-[#D71920]/40 rounded-full" />

                  {/* Skull Emblem Center */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="font-kanji text-6xl text-[#D71920] mb-2 font-bold drop-shadow-[0_0_20px_rgba(215,25,32,0.8)]">
                      代行
                    </span>
                    <span className="font-cinzel text-xs tracking-[0.3em] text-white/80 uppercase">
                      SHINIGAMI BADGE
                    </span>
                    <span className="font-mono text-[9px] tracking-widest text-white/40 mt-1">
                      SERIAL #IK-0115
                    </span>
                  </div>

                  <div className="absolute bottom-4 text-center">
                    <p className="text-[10px] font-mono text-white/40 tracking-wider">
                      Urahara Shop Specialized Spiritual Conduit
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <div className="flex items-center justify-between text-xs font-mono text-white/60 mb-2">
                    <span>SPIRITUAL BODY RESONANCE</span>
                    <span className="text-[#00e5ff] font-bold">SYNCHRONIZED (99.4%)</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-[#D71920] to-[#00e5ff] h-full w-[99%]" />
                  </div>
                </div>
              </div>

              {/* Quote Card */}
              <div className="p-5 border-l-2 border-[#D71920] bg-white/[0.02]">
                <p className="font-cinzel text-base italic text-white/80">
                  &ldquo;{ichigo.quote}&rdquo;
                </p>
                <span className="block font-mono text-xs text-[#D71920] mt-2 tracking-wider">
                  — ICHIGO KUROSAKI
                </span>
              </div>
            </div>

            {/* Right 7 cols: Detailed Stats & Techniques */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Profile Card */}
              <div className="manga-panel p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4">
                  <div>
                    <h3 className="font-cinzel text-2xl sm:text-3xl font-black text-white">
                      {ichigo.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-kanji text-sm text-[#D71920]">
                        {ichigo.japaneseName}
                      </span>
                      <span className="text-white/30">|</span>
                      <span className="font-mono text-xs text-white/60">
                        {ichigo.role}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-[#D71920]/20 border border-[#D71920]/40 text-[#D71920] text-xs font-mono font-bold tracking-wider">
                      CLASS: SPECIAL WAR POWER
                    </div>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-white/70 font-sans-editorial leading-relaxed my-6 font-light">
                  {ichigo.description}
                </p>

                {/* Combat Stats Radar Breakdown */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="font-mono text-xs tracking-widest text-white/50 uppercase flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#D71920]" />
                    <span>SOUL REAPER COMBAT CAPABILITIES</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Reiatsu */}
                    <div className="p-3 bg-white/[0.02] border border-white/10">
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-white/70">REIATSU (Spiritual Pressure)</span>
                        <span className="text-[#D71920] font-bold">99 / 100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#D71920] h-full w-[99%]" />
                      </div>
                    </div>

                    {/* Zanjutsu */}
                    <div className="p-3 bg-white/[0.02] border border-white/10">
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-white/70">ZANJUTSU (Swordsmanship)</span>
                        <span className="text-white font-bold">96 / 100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white/80 h-full w-[96%]" />
                      </div>
                    </div>

                    {/* Hoho */}
                    <div className="p-3 bg-white/[0.02] border border-white/10">
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-white/70">HOHO (Shunpo / Agility)</span>
                        <span className="text-[#00e5ff] font-bold">98 / 100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-[#00e5ff] h-full w-[98%]" />
                      </div>
                    </div>

                    {/* Kido */}
                    <div className="p-3 bg-white/[0.02] border border-white/10">
                      <div className="flex justify-between text-xs font-mono mb-1.5">
                        <span className="text-white/70">KIDO (Spiritual Spells)</span>
                        <span className="text-white/40 font-bold">25 / 100</span>
                      </div>
                      <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-white/30 h-full w-[25%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signature Moves Tags */}
                <div className="mt-6 pt-4 border-t border-white/10">
                  <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase mb-3">
                    CANONICAL ARSENAL & RELEASES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {ichigo.signatureMoves.map((move) => (
                      <span
                        key={move}
                        className="px-3 py-1 bg-black/60 border border-white/15 text-xs font-mono text-white/90 hover:border-[#D71920] transition-colors"
                      >
                        {move}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* 3D Interactive Zanpakuto Tab */
          <div className="manga-panel p-6 sm:p-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="w-full lg:w-1/2">
              <Suspense
                fallback={
                  <div className="w-full h-[360px] flex items-center justify-center font-mono text-xs text-[#D71920] animate-pulse">
                    MATERIALIZING SPIRITUAL PARTICLES...
                  </div>
                }
              >
                <ZanpakutoCanvas3D isBankai={false} />
              </Suspense>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-start">
              <div className="flex items-center gap-2 px-3 py-1 bg-[#D71920]/20 border border-[#D71920] text-[#D71920] text-xs font-mono font-bold tracking-widest uppercase mb-4">
                <Shield className="w-3.5 h-3.5" />
                <span>3D ZANPAKUTO SCHEMATIC</span>
              </div>

              <h3 className="font-cinzel text-3xl sm:text-4xl font-black text-white mb-3">
                ZANGETSU (始解)
              </h3>
              <p className="font-kanji text-sm text-white/50 tracking-widest mb-6">
                我が魂の刃。鞘を持たぬ、純粋なる霊圧の塊。
              </p>

              <div className="space-y-4 text-sm text-white/70 font-sans-editorial leading-relaxed font-light mb-8">
                <p>
                  Click and drag to rotate the 3D blade model. Notice the pristine steel forging, heavy back ridge, and spiraling spiritual particles reflecting raw Reishi energy.
                </p>
                <p>
                  Because Ichigo possesses immense uncontainable Reiatsu, Zangetsu has no scabbard or seal—it exists in perpetual Shikai release.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] font-mono text-white/40 tracking-widest block">
                    BLADE WEIGHT
                  </span>
                  <span className="font-cinzel text-base font-bold text-white">
                    Approx. 12.5 kg
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-white/40 tracking-widest block">
                    ENERGY RESONANCE
                  </span>
                  <span className="font-cinzel text-base font-bold text-[#D71920]">
                    Pure Reishi Crescent
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
