import React, { useEffect, useRef } from 'react';

interface ReiatsuCanvasProps {
  isBankaiActive?: boolean;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  hue: number;
  life: number;
  maxLife: number;
  isAsh: boolean;
}

export const ReiatsuCanvas: React.FC<ReiatsuCanvasProps> = ({ isBankaiActive = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = prefersReducedMotion ? 15 : isMobile ? 30 : 90;

    let mouseX = width / 2;
    let mouseY = height / 2;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = Math.min(Math.abs(currentScrollY - lastScrollY) * 0.15, 12);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle(true));
    }

    function createParticle(randomY = false): Particle {
      const isBankai = isBankaiActive;
      const isAsh = Math.random() > 0.7;

      return {
        x: Math.random() * width,
        y: randomY ? Math.random() * height : height + 10,
        size: isAsh ? Math.random() * 3 + 1 : Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 1.5 + 0.6),
        speedX: (Math.random() - 0.5) * 0.8,
        opacity: Math.random() * 0.6 + 0.2,
        hue: isBankai ? Math.random() * 20 + 350 : Math.random() * 40 + 190, // Crimson vs Blue/Cyan
        life: 0,
        maxLife: Math.random() * 200 + 100,
        isAsh,
      };
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Decay scroll velocity smoothly
      scrollVelocity *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;

        // Upward movement amplified by scroll
        p.y += (p.speedY - scrollVelocity) * (isBankaiActive ? 1.6 : 1);
        p.x += p.speedX;

        // Subtle mouse pull on desktop
        if (!isMobile) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            p.x += (dx / dist) * 0.4;
            p.y += (dy / dist) * 0.4;
          }
        }

        // Fade in and out
        const halfLife = p.maxLife / 2;
        const currentOpacity =
          p.life < halfLife
            ? (p.life / halfLife) * p.opacity
            : ((p.maxLife - p.life) / halfLife) * p.opacity;

        // Draw particle
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (isBankaiActive) {
          // Blazing Bankai Crimson & Pure White Energy
          if (p.isAsh) {
            ctx.fillStyle = `rgba(20, 20, 20, ${currentOpacity * 0.9})`;
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#D71920';
          } else {
            ctx.fillStyle = `rgba(215, 25, 32, ${currentOpacity})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = 'rgba(255, 45, 55, 0.9)';
          }
        } else {
          // Mystic Reishi Blue / Bone White
          if (p.isAsh) {
            ctx.fillStyle = `rgba(242, 240, 234, ${currentOpacity * 0.7})`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(0, 229, 255, 0.4)';
          } else {
            ctx.fillStyle = `rgba(0, 229, 255, ${currentOpacity * 0.8})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(0, 229, 255, 0.7)';
          }
        }

        ctx.fill();
        ctx.restore();

        // Respawn if off screen or dead
        if (p.y < -20 || p.x < -20 || p.x > width + 20 || p.life >= p.maxLife) {
          particles[i] = createParticle(false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isBankaiActive]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
};
