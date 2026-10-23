import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audio';

interface CinematicIntroProps {
  onComplete: () => void;
}

export const CinematicIntro: React.FC<CinematicIntroProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'quote' | 'kanji' | 'fadeout'>('quote');
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    // Phase 1 -> Phase 2 -> Complete
    const timer1 = setTimeout(() => {
      setPhase('kanji');
    }, 2400);

    const timer2 = setTimeout(() => {
      setPhase('fadeout');
    }, 4200);

    const timer3 = setTimeout(() => {
      onComplete();
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sound.playSwordDraw();
    setPhase('fadeout');
    setTimeout(onComplete, 400);
  };

  const handleBegin = () => {
    if (!hasStarted) {
      sound.playSwordDraw();
      sound.startAmbient();
      setHasStarted(true);
    }
    handleSkip();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center p-6 transition-opacity duration-700 ${
        phase === 'fadeout' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Japanese Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 overflow-hidden">
        <span className="font-kanji text-[30vw] select-none text-white tracking-widest leading-none">
          斬月
        </span>
      </div>

      <div className="relative z-10 max-w-2xl text-center flex flex-col items-center">
        {/* Quote phase */}
        <div
          className={`transition-all duration-700 transform ${
            phase === 'quote'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <div className="text-[11px] font-mono tracking-[0.4em] text-[#D71920] mb-4 uppercase">
            // Tite Kubo — Volume 5 Epigraph
          </div>
          <p className="font-cinzel text-lg sm:text-2xl md:text-3xl font-light text-[#F2F0EA] leading-relaxed tracking-wider">
            &ldquo;If I don&apos;t wield the blade, I cannot protect you.&rdquo;
          </p>
          <p className="font-cinzel text-lg sm:text-2xl md:text-3xl font-light text-white/50 leading-relaxed tracking-wider mt-2">
            &ldquo;If I keep wielding the blade, I cannot embrace you.&rdquo;
          </p>
          <div className="mt-4 font-kanji text-xs sm:text-sm text-white/30 tracking-widest">
            剣を握らなければ お前を守れない。 剣を握ったままでは お前を抱き締められない。
          </div>
        </div>

        {/* Kanji title phase */}
        <div
          className={`absolute transition-all duration-700 transform flex flex-col items-center ${
            phase === 'kanji'
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
          }`}
        >
          <span className="font-kanji text-5xl sm:text-7xl font-black text-[#D71920] tracking-widest drop-shadow-[0_0_30px_rgba(215,25,32,0.8)]">
            死神代行
          </span>
          <span className="font-cinzel text-sm sm:text-base tracking-[0.4em] text-[#F2F0EA] mt-4 uppercase">
            THE EDGE OF DESTINY
          </span>
        </div>
      </div>

      {/* Skip Button */}
      <div className="absolute bottom-8 right-8 z-20">
        <button
          onClick={handleBegin}
          className="btn-blade px-5 py-2 border border-white/20 bg-black/60 hover:border-[#D71920] text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-all flex items-center gap-2"
        >
          <span>ENTER DIRECTLY</span>
          <span className="text-[#D71920]">→</span>
        </button>
      </div>
    </div>
  );
};
