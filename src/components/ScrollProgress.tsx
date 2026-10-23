import React, { useEffect, useState } from 'react';
import { sound } from '../utils/audio';

interface SectionMarker {
  id: string;
  label: string;
  kanji: string;
}

const SECTIONS: SectionMarker[] = [
  { id: 'hero', label: 'DESTINY', kanji: '始' },
  { id: 'awakening', label: 'AWAKENING', kanji: '覚' },
  { id: 'soul-reaper', label: 'SHINIGAMI', kanji: '死' },
  { id: 'bankai', label: 'BANKAI', kanji: '卍' },
  { id: 'rivalry', label: 'RIVALRY', kanji: '闘' },
  { id: 'universe', label: 'REALMS', kanji: '界' },
  { id: 'destiny', label: 'FINALE', kanji: '終' },
];

export const ScrollProgress: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setScrollPercent(progress);
      }

      // Check current section
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sound.playHover();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top minimal progress bar for mobile / universal view */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/10 z-50 pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#D71920] via-[#ff4d56] to-[#00e5ff] transition-all duration-150 shadow-[0_0_8px_#D71920]"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Desktop side katana spine indicator */}
      <nav
        aria-label="Story Progress"
        className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3 py-4 px-2 select-none"
      >
        <div className="text-[9px] font-mono tracking-widest text-white/40 mb-1">
          {Math.round(scrollPercent)}%
        </div>

        <div className="relative flex flex-col items-center gap-5">
          {/* Vertical blade line background */}
          <div className="absolute top-0 bottom-0 w-[1px] bg-white/15" />

          {/* Filled progress line */}
          <div
            className="absolute top-0 w-[2px] bg-[#D71920] shadow-[0_0_8px_#D71920] transition-all duration-150"
            style={{ height: `${scrollPercent}%` }}
          />

          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                onMouseEnter={() => sound.playHover()}
                className="group relative flex items-center justify-center w-6 h-6 z-10 focus:outline-none"
                aria-label={`Jump to ${sec.label}`}
              >
                {/* Kanji Dot */}
                <div
                  className={`w-5 h-5 rounded-sm flex items-center justify-center font-kanji text-[10px] transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#D71920] border-[#ff4d56] text-white scale-110 shadow-[0_0_12px_rgba(215,25,32,0.9)]'
                      : 'bg-[#050505] border-white/20 text-white/40 hover:border-white/60 hover:text-white'
                  }`}
                >
                  {sec.kanji}
                </div>

                {/* Floating Tooltip */}
                <span className="absolute right-8 px-2 py-0.5 bg-black/90 border border-white/20 text-[10px] font-mono tracking-widest text-[#F2F0EA] uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg">
                  {sec.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
