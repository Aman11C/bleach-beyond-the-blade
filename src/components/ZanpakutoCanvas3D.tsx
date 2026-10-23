import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ZanpakutoCanvas3DProps {
  isBankai?: boolean;
}

export const ZanpakutoCanvas3D: React.FC<ZanpakutoCanvas3DProps> = ({ isBankai = false }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 450;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(isBankai ? 0xd71920 : 0x00e5ff, 2.5);
    keyLight.position.set(5, 8, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.0);
    rimLight.position.set(-5, -5, -3);
    scene.add(rimLight);

    // Group for the 3D Zanpakuto Sword
    const swordGroup = new THREE.Group();
    scene.add(swordGroup);

    // 1. Blade Mesh
    // Sleek katana geometry
    const bladeGeo = new THREE.BoxGeometry(0.08, 4.2, 0.35);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: isBankai ? 0x111111 : 0xe0e0e0,
      metalness: 0.95,
      roughness: 0.15,
      emissive: isBankai ? 0x990000 : 0x003344,
      emissiveIntensity: 0.25,
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    blade.position.y = 1.0;
    swordGroup.add(blade);

    // Sharp Cutting Edge highlight
    const edgeGeo = new THREE.BoxGeometry(0.015, 4.2, 0.04);
    const edgeMat = new THREE.MeshBasicMaterial({
      color: isBankai ? 0xff2d37 : 0xffffff,
    });
    const edge = new THREE.Mesh(edgeGeo, edgeMat);
    edge.position.set(0, 1.0, 0.18);
    swordGroup.add(edge);

    // 2. Habaki (Blade collar)
    const habakiGeo = new THREE.BoxGeometry(0.12, 0.3, 0.4);
    const habakiMat = new THREE.MeshStandardMaterial({
      color: isBankai ? 0x333333 : 0xd4af37, // Black vs Gold
      metalness: 0.9,
      roughness: 0.3,
    });
    const habaki = new THREE.Mesh(habakiGeo, habakiMat);
    habaki.position.y = -1.0;
    swordGroup.add(habaki);

    // 3. Tsuba (Guard) - Manji style for Bankai or clean rectangular guard
    const tsubaGeo = new THREE.BoxGeometry(0.4, 0.08, 0.85);
    const tsubaMat = new THREE.MeshStandardMaterial({
      color: 0x151515,
      metalness: 0.8,
      roughness: 0.4,
    });
    const tsuba = new THREE.Mesh(tsubaGeo, tsubaMat);
    tsuba.position.y = -1.2;
    swordGroup.add(tsuba);

    // 4. Tsuka (Handle)
    const tsukaGeo = new THREE.CylinderGeometry(0.1, 0.12, 1.6, 16);
    const tsukaMat = new THREE.MeshStandardMaterial({
      color: isBankai ? 0x080808 : 0x1a1a1a,
      roughness: 0.8,
    });
    const tsuka = new THREE.Mesh(tsukaGeo, tsukaMat);
    tsuka.position.y = -2.1;
    swordGroup.add(tsuka);

    // Tsuka Ito wrapping rings
    for (let r = 0; r < 7; r++) {
      const ringGeo = new THREE.TorusGeometry(0.12, 0.02, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isBankai ? 0xd71920 : 0xf2f0ea,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.5 - r * 0.18;
      swordGroup.add(ring);
    }

    // 5. Kashira Pommel & Spirit Chain
    const pommelGeo = new THREE.BoxGeometry(0.14, 0.14, 0.2);
    const pommelMat = new THREE.MeshStandardMaterial({ color: 0x111111, metalness: 0.9 });
    const pommel = new THREE.Mesh(pommelGeo, pommelMat);
    pommel.position.y = -2.95;
    swordGroup.add(pommel);

    // Spiraling Reishi Particles around the blade
    const particleCount = 45;
    const pGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 1.5;
      posArray[i + 1] = Math.random() * 5 - 2;
      posArray[i + 2] = (Math.random() - 0.5) * 1.5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      color: isBankai ? 0xd71920 : 0x00e5ff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const bladeParticles = new THREE.Points(pGeo, pMat);
    swordGroup.add(bladeParticles);

    // Initial tilt
    swordGroup.rotation.z = -Math.PI / 6;
    swordGroup.rotation.y = Math.PI / 4;

    // Interactive mouse drag / rotate controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      swordGroup.rotation.y += deltaX * 0.01;
      swordGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Gentle floating oscillation
      if (!isDragging) {
        swordGroup.rotation.y += 0.006;
        swordGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      // Swirling particles
      bladeParticles.rotation.y += 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [isBankai]);

  if (!webglSupported) {
    return (
      <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center p-6 text-center border border-white/10 bg-black/60 rounded-lg">
        <span className="font-kanji text-4xl text-[#D71920] mb-2">斬月</span>
        <h4 className="font-cinzel text-lg tracking-widest text-[#F2F0EA]">TENSA ZANGETSU</h4>
        <p className="text-xs text-white/50 mt-2 max-w-xs">
          High-performance 3D blade preview requires WebGL acceleration.
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[360px] md:min-h-[460px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      <div ref={mountRef} className="w-full h-full flex items-center justify-center" />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/80 border border-white/10 text-[10px] tracking-widest uppercase font-mono text-white/50 backdrop-blur-md rounded-full pointer-events-none">
        Drag to inspect blade · 3D Spiritual Mesh
      </div>
    </div>
  );
};
