import React, { useState } from 'react';
import { realms } from '../data/realms';
import { Compass, Globe, MapPin } from 'lucide-react';
import { sound } from '../utils/audio';

export const UniverseSection: React.FC = () => {
  const [selectedRealmId, setSelectedRealmId] = useState(realms[0].id);

  const activeRealm = realms.find((r) => r.id === selectedRealmId) || realms[0];

  const handleSelectRealm = (id: string) => {
    sound.playHover();
    sound.playSwordDraw();
    setSelectedRealmId(id);
  };

  return (
    <section
      id="universe"
      className="relative min-h-screen w-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-b border-white/[0.06] overflow-hidden"
    >
      {/* Background Japanese Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] text-center w-full">
        <span className="font-kanji text-[30vw] font-black text-white leading-none">
          三界
        </span>
      </div>

      <div className="relative z-10 max-w-7xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs text-[#D71920] font-bold tracking-widest">
                // SECTION E
              </span>
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="font-kanji text-xs text-white/50 tracking-widest">
                世界の構造
              </span>
            </div>
            <h2 className="font-cinzel font-black text-3xl sm:text-5xl lg:text-6xl text-[#F2F0EA] tracking-tight uppercase">
              THE UNIVERSE
            </h2>
            <p className="font-mono text-xs text-white/50 tracking-[0.25em] uppercase mt-2">
              THE THREE REALMS // SPATIAL EQUILIBRIUM
            </p>
          </div>

          {/* Realm Switcher Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {realms.map((realm) => {
              const isSelected = realm.id === selectedRealmId;
              return (
                <button
                  key={realm.id}
                  onClick={() => handleSelectRealm(realm.id)}
                  className={`px-4 py-2 text-xs font-mono tracking-widest uppercase transition-all duration-300 border flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#D71920] text-black font-bold border-[#D71920] shadow-[0_0_15px_rgba(215,25,32,0.4)]'
                      : 'bg-black/60 text-white/60 border-white/15 hover:border-white/40 hover:text-white'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{realm.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Realm Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="relative manga-panel p-3 overflow-hidden shadow-2xl group border border-white/10">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={activeRealm.image}
                  alt={activeRealm.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-105 brightness-95"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent pointer-events-none" />

                {/* Japanese Realm Kanji Inscription */}
                <div className="absolute top-4 left-4 z-10 px-3 py-1.5 bg-black/85 border-l-2 border-[#D71920] backdrop-blur-md">
                  <span className="font-kanji text-sm text-white tracking-widest block">
                    {activeRealm.japaneseName}
                  </span>
                  <span className="font-mono text-[9px] text-[#D71920] tracking-wider uppercase">
                    DIMENSIONAL COORD // 霊子境界
                  </span>
                </div>

                {/* Bottom HUD */}
                <div className="absolute bottom-4 left-4 right-4 z-10 p-4 bg-black/85 backdrop-blur-md border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block">
                      GOVERNING FACTION
                    </span>
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-white tracking-wider">
                      {activeRealm.governingForce}
                    </h4>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase block">
                      SPIRITUAL DENSITY
                    </span>
                    <span className="font-mono text-xs font-bold text-[#00e5ff]">
                      {activeRealm.spiritualDensity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Realm Information & Details (5 cols) */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-2 font-mono text-xs text-[#D71920] uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>{activeRealm.category}</span>
            </div>

            <h3 className="font-cinzel font-black text-3xl sm:text-4xl text-white tracking-tight uppercase mb-4">
              {activeRealm.name}
            </h3>

            <p className="font-sans-editorial text-sm sm:text-base text-white/80 leading-relaxed font-light mb-6">
              {activeRealm.description}
            </p>

            {/* Atmosphere note */}
            <div className="p-4 bg-white/[0.02] border border-white/10 mb-6 w-full">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase block mb-1">
                ATMOSPHERIC COMPOSITION
              </span>
              <p className="text-xs text-white/70 font-sans-editorial leading-relaxed">
                {activeRealm.atmosphere}
              </p>
            </div>

            {/* Landmarks List */}
            <div className="w-full">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase block mb-3">
                KEY GEOGRAPHICAL SECTORS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeRealm.landmarks.map((mark) => (
                  <div
                    key={mark}
                    className="flex items-center gap-2 p-2 bg-black/60 border border-white/10 text-xs font-mono text-white/80"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#D71920] shrink-0" />
                    <span className="truncate">{mark}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Realm Comparison Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-white/10">
          {realms.map((realm, idx) => {
            const isCurrent = realm.id === selectedRealmId;
            return (
              <button
                key={realm.id}
                onClick={() => handleSelectRealm(realm.id)}
                className={`p-4 text-left border transition-all duration-300 ${
                  isCurrent
                    ? 'bg-white/10 border-white'
                    : 'bg-black/40 border-white/10 hover:border-white/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-[#D71920]">0{idx + 1}</span>
                  <span className="font-kanji text-xs text-white/40">{realm.japaneseName}</span>
                </div>
                <h4 className="font-cinzel text-base font-bold text-white mb-1">
                  {realm.name}
                </h4>
                <p className="text-xs text-white/60 line-clamp-2">
                  {realm.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
