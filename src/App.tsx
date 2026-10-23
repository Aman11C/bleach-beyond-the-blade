import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sound } from './utils/audio';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AwakeningSection } from './components/AwakeningSection';
import { SoulReaperSection } from './components/SoulReaperSection';
import { BankaiSection } from './components/BankaiSection';
import { RivalrySection } from './components/RivalrySection';
import { UniverseSection } from './components/UniverseSection';
import { FinalCtaSection } from './components/FinalCtaSection';
import { ReiatsuCanvas } from './components/ReiatsuCanvas';
import { ScrollProgress } from './components/ScrollProgress';
import { Cursor } from './components/Cursor';
import { CinematicIntro } from './components/CinematicIntro';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isBankaiActive, setIsBankaiActive] = useState(false);

  // Initialize atmospheric sound
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleBankai = () => {
    setIsBankaiActive((prev) => !prev);
  };

  const handleEnterStory = () => {
    const el = document.getElementById('awakening');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // GSAP scroll trigger subtle section fade-in setup
  useEffect(() => {
    if (showIntro) return;

    // Small delay to allow DOM to settle
    const ctx = gsap.context(() => {
      const sections = ['#hero', '#awakening', '#soul-reaper', '#bankai', '#rivalry', '#universe', '#destiny'];
      
      sections.forEach((secId) => {
        const el = document.querySelector(secId);
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0.85 },
            {
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [showIntro]);

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F2F0EA] selection:bg-[#D71920] selection:text-white">
      {/* Film Grain Texture for Cinematic Depth */}
      <div className="film-grain" aria-hidden="true" />

      {/* Interactive Custom Cursor */}
      <Cursor />

      {/* Global Reiatsu Spirit Particles Canvas */}
      <ReiatsuCanvas isBankaiActive={isBankaiActive} />

      {/* Scroll Progress Bar & Milestones */}
      <ScrollProgress />

      {/* Cinematic Opening Intro (with Skip option) */}
      {showIntro && (
        <CinematicIntro
          onComplete={() => {
            setShowIntro(false);
          }}
        />
      )}

      {/* Fixed Navigation Bar */}
      <Navbar
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isBankaiActive={isBankaiActive}
      />

      {/* Main Content Sections */}
      <main className="relative z-20 flex flex-col w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero onEnter={handleEnterStory} />

        {/* Section A: The Awakening */}
        <AwakeningSection />

        {/* Section B: Soul Reaper */}
        <SoulReaperSection />

        {/* Section C: Bankai (Visual Climax) */}
        <BankaiSection
          isBankaiActive={isBankaiActive}
          onToggleBankai={handleToggleBankai}
        />

        {/* Section D: The Rivalry */}
        <RivalrySection />

        {/* Section E: The Universe */}
        <UniverseSection />

        {/* Section F: Final CTA & Editorial Footer */}
        <FinalCtaSection />
      </main>
    </div>
  );
};

export default App;
