import React, { useState } from 'react';
import { characters } from '../data/characters';
import { UserCheck } from 'lucide-react';
import { sound } from '../utils/audio';

export const RivalrySection: React.FC = () => {
  // Exclude Ichigo (index 0) to highlight the rivals / key captains
  const rivals = characters.slice(1);
  const [selectedId, setSelectedId] = useState(rivals[0].id);

  const activeRival = rivals.find((r) => r.id === selectedId) || rivals[0];

  const handleSelect = (id: string) => {
    sound.playHover();
    sound.playSwordDraw();
    setSelectedId(id);
  };

  return (
    <section
      id="rivalry"
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-b border-white/[0.06] overflow-hidden"
    >
      {/* Dynamic Background Glow matching character accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none transition-all duration-700 opacity-20"
        style={{ backgroundColor: activeRival.accentColor }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#D71920] font-bold tracking-widest">
                // SECTION D
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="font-kanji text-xs text-white/50 tracking-widest">
                好敵手と宿敵
              </span>
            </div>
            <h2 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl text-[#F2F0EA] tracking-tight uppercase">
              THE RIVALRY
            </h2>
            <p className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase mt-2">
              BLADES OF CONVICTION // ALLIES, CAPTAINS & NEMESIS
            </p>
          </div>

          {/* Character Quick Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {rivals.map((char) => {
              const isSelected = char.id === selectedId;
              return (
                <button
                  key={char.id}
                  onClick={() => handleSelect(char.id)}
                  className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-white text-black font-bold border-white shadow-lg'
                      : 'bg-black/60 text-white/60 border-white/15 hover:border-white/40 hover:text-white'
                  }`}
                  style={{
                    borderColor: isSelected ? char.accentColor : undefined,
                    color: isSelected ? '#000' : undefined,
                  }}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: char.accentColor }}
                  />
                  <span>{char.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Character Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Artwork Column (7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative manga-panel p-3 overflow-hidden shadow-2xl group border border-white/10">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={activeRival.image}
                  alt={activeRival.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-110"
                  loading="lazy"
                />

                {/* Ambient dynamic gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

                {/* Release Command Inscription Badge */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/85 border-l-2 backdrop-blur-md"
                  style={{ borderColor: activeRival.accentColor }}
                >
                  <span className="font-kanji text-xs text-white tracking-widest block">
                    {activeRival.releaseCommand}
                  </span>
                  <span className="font-mono text-[9px] text-white/50 tracking-wider uppercase">
                    ZANPAKUTO RELEASE COMMAND
                  </span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block">
                      ZANPAKUTO & BANKAI
                    </span>
                    <h4 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider">
                      {activeRival.zanpakuto}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span
                      className="font-mono text-xs font-bold px-2 py-0.5 border"
                      style={{
                        color: activeRival.accentColor,
                        borderColor: `${activeRival.accentColor}40`,
                        backgroundColor: `${activeRival.accentColor}15`,
                      }}
                    >
                      {activeRival.division}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lore & Stats Column (5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2 font-kanji text-sm text-white/60">
              <UserCheck className="w-4 h-4 text-[#D71920]" />
              <span>{activeRival.kanjiTitle}</span>
            </div>

            <h3 className="font-cinzel font-black text-3xl sm:text-4xl text-white tracking-tight uppercase mb-4">
              {activeRival.name}
            </h3>

            {/* Quote Block */}
            <blockquote
              className="p-4 border-l-2 bg-white/[0.02] mb-6 w-full"
              style={{ borderColor: activeRival.accentColor }}
            >
              <p className="font-cinzel text-sm sm:text-base italic text-white/90 leading-relaxed">
                &ldquo;{activeRival.quote}&rdquo;
              </p>
            </blockquote>

            <p className="font-sans-editorial text-sm text-white/70 leading-relaxed font-light mb-6">
              {activeRival.description}
            </p>

            {/* Combat Parameters */}
            <div className="w-full space-y-3 pt-4 border-t border-white/10 mb-6">
              <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase">
                SPIRITUAL COMBAT METRICS
              </span>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-1">
                    <span>REIATSU FORCE</span>
                    <span style={{ color: activeRival.accentColor }}>{activeRival.stats.reiatsu}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${activeRival.stats.reiatsu}%`,
                        backgroundColor: activeRival.accentColor,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-1">
                    <span>ZANJUTSU (SWORD MASTERY)</span>
                    <span style={{ color: activeRival.accentColor }}>{activeRival.stats.zanjutsu}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${activeRival.stats.zanjutsu}%`,
                        backgroundColor: activeRival.accentColor,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/70 mb-1">
                    <span>HOHO (SPEED)</span>
                    <span style={{ color: activeRival.accentColor }}>{activeRival.stats.hoho}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-700"
                      style={{
                        width: `${activeRival.stats.hoho}%`,
                        backgroundColor: activeRival.accentColor,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Moves List */}
            <div className="w-full">
              <span className="block font-mono text-[10px] tracking-widest text-white/40 uppercase mb-2">
                RECORDED SHIKAI & TECHNIQUE FORMS
              </span>
              <div className="flex flex-wrap gap-2">
                {activeRival.signatureMoves.map((m) => (
                  <span
                    key={m}
                    className="px-2.5 py-1 text-xs font-mono bg-black/60 border border-white/15 text-white/80"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rival Grid Cards Carousel for Tablet/Mobile quick browsing */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
          {rivals.map((char) => {
            const isCurrent = char.id === selectedId;
            return (
              <button
                key={char.id}
                onClick={() => handleSelect(char.id)}
                className={`p-4 text-left border transition-all duration-300 flex items-center justify-between ${
                  isCurrent
                    ? 'bg-white/10 border-white'
                    : 'bg-black/40 border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  <span className="font-kanji text-xs text-white/40 block">
                    {char.japaneseName}
                  </span>
                  <span className="font-cinzel text-sm font-bold text-white tracking-wide">
                    {char.name}
                  </span>
                </div>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: char.accentColor }}
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
