import React, { useEffect, useState } from 'react';

export const Cursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      aria-hidden="true"
    >
      <div
        className={`rounded-full border transition-all duration-300 flex items-center justify-center ${
          isHovered
            ? 'w-10 h-10 border-[#D71920] bg-[#D71920]/15 scale-110 shadow-[0_0_15px_rgba(215,25,32,0.8)]'
            : 'w-5 h-5 border-white/60 bg-white/5'
        }`}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            isHovered ? 'w-2 h-2 bg-[#D71920]' : 'w-1 h-1 bg-white'
          }`}
        />
      </div>
    </div>
  );
};
