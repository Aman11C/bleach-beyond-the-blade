import React, { useState } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  isMuted: boolean;
  onToggleMute: () => void;
  isBankaiActive?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ isMuted, onToggleMute, isBankaiActive = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'STORY', href: '#awakening', kanji: '物語' },
    { label: 'CHARACTERS', href: '#soul-reaper', kanji: '死神' },
    { label: 'POWERS', href: '#bankai', kanji: '卍解' },
    { label: 'UNIVERSE', href: '#universe', kanji: '世界' },
  ];

  const handleNavClick = (href: string) => {
    sound.playHover();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 transition-colors duration-500 backdrop-blur-md bg-[#050505]/75 border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="group flex items-center gap-3 focus:outline-none focus:ring-1 focus:ring-[#D71920]"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#111111] border border-white/20 flex items-center justify-center font-kanji font-bold text-[#D71920] group-hover:border-[#D71920] transition-colors relative overflow-hidden">
              <span className="text-sm sm:text-base">斬</span>
              <div className="absolute inset-0 bg-[#D71920]/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel tracking-[0.25em] text-sm sm:text-base font-bold text-[#F2F0EA] group-hover:text-white transition-colors">
                BLEACH
              </span>
              <span className="text-[9px] tracking-[0.35em] text-white/40 uppercase font-mono">
                BEYOND THE BLADE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                onMouseEnter={() => sound.playHover()}
                className="group relative py-2 text-xs font-mono tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors flex items-center gap-1.5 focus:outline-none focus:text-[#D71920]"
              >
                <span className="font-kanji text-[10px] text-white/30 group-hover:text-[#D71920] transition-colors">
                  {link.kanji}
                </span>
                <span>{link.label}</span>
                {/* Underline indicator */}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D71920] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Controls: Audio & Status */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Spiritual pressure tag */}
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-black/60 border border-white/10 rounded-sm">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isBankaiActive ? 'bg-[#D71920] animate-ping' : 'bg-[#00e5ff] animate-pulse'
                }`}
              />
              <span className="text-[10px] font-mono tracking-widest text-white/60">
                {isBankaiActive ? 'REIATSU: 99.8% (BANKAI)' : 'REIATSU: STABLE'}
              </span>
            </div>

            {/* Audio Toggle */}
            <button
              onClick={onToggleMute}
              className="p-2 sm:p-2.5 rounded-sm border border-white/15 bg-black/60 hover:border-[#D71920] text-white/80 hover:text-white transition-all flex items-center gap-2 focus:outline-none focus:ring-1 focus:ring-[#D71920]"
              aria-label={isMuted ? 'Unmute atmospheric audio' : 'Mute atmospheric audio'}
              title={isMuted ? 'Sound: Off' : 'Sound: On'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white/40" />
              ) : (
                <div className="flex items-center gap-1.5 text-[#D71920]">
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden xl:inline text-[10px] font-mono tracking-wider">SOUND ON</span>
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => {
                sound.playHover();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 text-white/80 hover:text-white border border-white/15 bg-black/60 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#D71920]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#D71920]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-xl md:hidden transition-all duration-300 flex flex-col justify-between p-6 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-kanji font-bold text-[#D71920] text-lg">斬</span>
            <span className="font-cinzel text-base tracking-[0.2em] font-bold text-white">
              BLEACH
            </span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 border border-white/20 text-white rounded-sm"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-6 my-auto">
          {navLinks.map((link, idx) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="group flex items-baseline justify-between py-3 border-b border-white/10 text-xl font-cinzel tracking-widest text-[#F2F0EA] hover:text-[#D71920] transition-colors"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#D71920]">0{idx + 1}</span>
                <span>{link.label}</span>
              </span>
              <span className="font-kanji text-sm text-white/40 group-hover:text-white transition-colors">
                {link.kanji}
              </span>
            </a>
          ))}
        </nav>

        <div className="border-t border-white/10 pt-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-white/60 tracking-wider">SPIRITUAL FREQUENCY</span>
            <button
              onClick={onToggleMute}
              className="flex items-center gap-2 px-3 py-1.5 border border-white/20 rounded text-xs font-mono"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-[#D71920]" />}
              <span>{isMuted ? 'AUDIO MUTED' : 'AUDIO ACTIVE'}</span>
            </button>
          </div>
          <p className="text-[10px] font-mono text-white/40 text-center">
            SOUL REAPER PROTOCOL // 護廷十三隊
          </p>
        </div>
      </div>
    </>
  );
};
