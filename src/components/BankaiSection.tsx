import React, { useState, Suspense, lazy } from 'react';
import { sound } from '../utils/audio';
import { Flame, Sparkles, Swords, Zap } from 'lucide-react';

const ZanpakutoCanvas3D = lazy(() =>
  import('./ZanpakutoCanvas3D').then((m) => ({ default: m.ZanpakutoCanvas3D }))
);

interface BankaiSectionProps {
  isBankaiActive: boolean;
  onToggleBankai: () => void;
}

export const BankaiSection: React.FC<BankaiSectionProps> = ({ isBankaiActive, onToggleBankai }) => {
  const [isShaking, setIsShaking] = useState(false);
  const [show3d, setShow3d] = useState(false);

  const handleBankaiTrigger = () => {
    sound.playBankaiRoar();
    setIsShaking(true);
    onToggleBankai();
    setTimeout(() => setIsShaking(false), 900);
  };

  return (
    <section
      id="bankai"
      className={`relative min-h-screen w-full flex items-center justify-center py-28 px-4 sm:px-6 lg:px-8 transition-colors duration-1000 overflow-hidden ${
        isBankaiActive
          ? 'bg-[#1a0507]/25 border-t border-b border-[#D71920]/30'
          : 'bg-transparent border-t border-b border-white/[0.06]'
      } ${isShaking ? 'animate-pulse' : ''}`}
    >
      {/* Background Bankai Kanji Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className={`font-kanji text-[35vw] font-black tracking-tighter leading-none transition-all duration-1000 ${
            isBankaiActive
              ? 'text-[#D71920]/10 scale-105 drop-shadow-[0_0_80px_rgba(215,25,32,0.6)]'
              : 'text-white/[0.02] scale-100'
          }`}
        >
          卍解
        </span>
      </div>

      {/* Crimson Fog Emitters */}
      <div
        className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[180px] pointer-events-none transition-opacity duration-1000 ${
          isBankaiActive ? 'bg-[#D71920]/25 opacity-100' : 'bg-[#D71920]/5 opacity-30'
        }`}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col items-center">
        {/* Section Climax Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-black/80 border border-[#D71920]/40 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#D71920] animate-ping" />
            <span className="font-mono text-xs tracking-[0.3em] text-[#D71920] uppercase font-bold">
              SECTION C // ULTIMATE SPIRITUAL CLIMAX
            </span>
          </div>

          <h2 className="font-cinzel font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight uppercase leading-none">
            BAN...{' '}
            <span
              className={`transition-all duration-700 ${
                isBankaiActive
                  ? 'text-[#D71920] drop-shadow-[0_0_50px_rgba(215,25,32,0.9)]'
                  : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40'
              }`}
            >
              KAI!
            </span>
          </h2>

          <p className="font-kanji text-xl sm:text-2xl text-white/70 tracking-[0.4em] mt-3 font-semibold">
            天 鎖 斬 月 (TENSA ZANGETSU)
          </p>

          <p className="font-sans-editorial text-sm sm:text-lg text-white/70 font-light mt-4 max-w-2xl mx-auto">
            All other Bankai expand to colossal sizes. Tensa Zangetsu compresses astronomical spiritual power into a razor-thin black blade, granting unmatchable godspeed.
          </p>

          {/* Interactive Trigger Button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleBankaiTrigger}
              onMouseEnter={() => sound.playHover()}
              className={`btn-blade px-8 py-4 font-cinzel font-black text-sm tracking-[0.25em] uppercase flex items-center gap-3 transition-all duration-300 shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#D71920] ${
                isBankaiActive
                  ? 'bg-black text-[#D71920] border-2 border-[#D71920] shadow-[0_0_35px_rgba(215,25,32,0.8)]'
                  : 'bg-[#D71920] text-black hover:bg-[#ff242d] shadow-[0_0_30px_rgba(215,25,32,0.5)]'
              }`}
            >
              <Zap className="w-5 h-5 animate-pulse" />
              <span>{isBankaiActive ? 'BANKAI UNLEASHED (REVERT)' : 'RELEASE BANKAI'}</span>
            </button>

            <button
              onClick={() => {
                sound.playHover();
                setShow3d(!show3d);
              }}
              className="px-6 py-4 border border-white/20 bg-black/60 hover:border-white/60 text-xs font-mono tracking-widest uppercase text-white/80 hover:text-white transition-all flex items-center gap-2"
            >
              <Swords className="w-4 h-4 text-[#D71920]" />
              <span>{show3d ? 'VIEW ARTWORK' : 'INSPECT 3D BANKAI BLADE'}</span>
            </button>
          </div>
        </div>

        {/* Visual Climax Container */}
        <div className="w-full max-w-5xl">
          {show3d ? (
            <div className="manga-panel p-6 sm:p-10 bg-black/90 border border-[#D71920]/40 shadow-[0_0_50px_rgba(215,25,32,0.25)]">
              <Suspense
                fallback={
                  <div className="w-full h-[360px] flex items-center justify-center font-mono text-xs text-[#D71920] animate-pulse">
                    CONCENTRATING BLACK REI-ENERGY...
                  </div>
                }
              >
                <ZanpakutoCanvas3D isBankai={true} />
              </Suspense>
              <div className="mt-4 text-center">
                <span className="font-mono text-xs text-[#D71920] tracking-widest uppercase">
                  TENSA ZANGETSU // PURE BLACK CHAIN & MANJI TSUBA
                </span>
              </div>
            </div>
          ) : (
            <div className="relative manga-panel p-3 overflow-hidden shadow-2xl group border border-white/10 hover:border-[#D71920]/60 transition-colors">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src="/assets/ichigo-bankai.jpg"
                  alt="Ichigo Kurosaki Bankai Tensa Zangetsu"
                  className={`w-full h-full object-cover transition-all duration-1000 ${
                    isBankaiActive
                      ? 'scale-105 filter brightness-110 contrast-125'
                      : 'filter brightness-90 contrast-105'
                  }`}
                  loading="lazy"
                />

                {/* Blazing Reiatsu Vignette */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-opacity duration-700 ${
                    isBankaiActive
                      ? 'bg-gradient-to-t from-black via-transparent to-[#D71920]/20 opacity-100'
                      : 'bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80'
                  }`}
                />

                {/* Speed Lines & Reiatsu Arcs Overlay */}
                <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20 bg-[radial-gradient(#D71920_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Floating Japanese Inscription */}
                <div className="absolute top-6 right-6 z-10 writing-vertical font-kanji font-black text-xl sm:text-2xl text-white select-none drop-shadow-[0_0_15px_rgba(215,25,32,0.9)]">
                  黒き刃 // 超絶の神速
                </div>

                {/* Bottom HUD Details */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 bg-black/85 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="font-mono text-[10px] tracking-widest text-[#D71920] uppercase block">
                      SPIRITUAL CLASSIFICATION
                    </span>
                    <h4 className="font-cinzel text-lg font-bold text-white tracking-wider">
                      KUROI GETSUGA TENSHO (黒い月牙天衝)
                    </h4>
                  </div>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] font-mono text-white/40 block">SHUNPO SPEED</span>
                      <span className="font-mono text-sm font-bold text-[#00e5ff]">LIGHT SPEED</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-white/40 block">REIATSU DENSITY</span>
                      <span className="font-mono text-sm font-bold text-[#D71920]">MAXIMUM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Editorial Bankai Doctrine Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-8">
          <div className="p-5 bg-black/60 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#D71920] mb-2">
              <Flame className="w-4 h-4" />
              <h5 className="font-cinzel text-xs font-bold tracking-widest uppercase">
                COMPRESSED FORM
              </h5>
            </div>
            <p className="text-xs text-white/60 font-sans-editorial leading-relaxed">
              By compressing the entirety of his vast Reiatsu into a slender black blade, none of the energy is leaked into the atmosphere.
            </p>
          </div>

          <div className="p-5 bg-black/60 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-[#00e5ff] mb-2">
              <Zap className="w-4 h-4" />
              <h5 className="font-cinzel text-xs font-bold tracking-widest uppercase">
                SHINPO OMNIPRESENCE
              </h5>
            </div>
            <p className="text-xs text-white/60 font-sans-editorial leading-relaxed">
              Ichigo&apos;s physical combat velocity multiplies tenfold, moving faster than the visual perception of Captain-class Shinigami.
            </p>
          </div>

          <div className="p-5 bg-black/60 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-white mb-2">
              <Sparkles className="w-4 h-4 text-[#D71920]" />
              <h5 className="font-cinzel text-xs font-bold tracking-widest uppercase">
                CRIMSON & BLACK SLASH
              </h5>
            </div>
            <p className="text-xs text-white/60 font-sans-editorial leading-relaxed">
              The crescent shockwave inverts from blue to pitch black with a blood-crimson outline, tearing through space itself.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
