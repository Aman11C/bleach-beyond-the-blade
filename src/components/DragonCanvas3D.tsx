import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { sound } from '../utils/audio';
import { Compass, Sparkles, Volume2, Eye, EyeOff } from 'lucide-react';

interface DragonCanvas3DProps {
  isBankaiActive?: boolean;
}

export const DragonCanvas3D: React.FC<DragonCanvas3DProps> = ({ isBankaiActive = false }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Flight HUD states
  const [isVisible, setIsVisible] = useState(true);
  const [autoFlight, setAutoFlight] = useState(false);
  const [isRoaring, setIsRoaring] = useState(false);

  // References to communicate between React state and Three.js animation loop
  const stateRef = useRef({
    isBankai: isBankaiActive,
    autoFlight: false,
    triggerRoar: false,
  });

  useEffect(() => {
    stateRef.current.isBankai = isBankaiActive;
  }, [isBankaiActive]);

  useEffect(() => {
    stateRef.current.autoFlight = autoFlight;
  }, [autoFlight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL support check
    try {
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (!gl) return;
    } catch {
      return;
    }

    // Palette Colors — Normal (Hyorinmaru Ice) vs Bankai (Daiguren Obsidian & Crimson)
    const getThemeColors = (bankai: boolean) => ({
      bodyColor: bankai ? 0x1a1a22 : 0xf0f7ff,
      bodyEmissive: bankai ? 0x220508 : 0x153555,
      accentColor: bankai ? 0xff1122 : 0x00e5ff,
      accentEmissive: bankai ? 0x880011 : 0x005577,
      hornColor: bankai ? 0x6a0c10 : 0x2b3d65,
      bellyColor: bankai ? 0x2c2c34 : 0xffffff,
      eyeColor: bankai ? 0xff0022 : 0xffeedd,
      eyeEmissive: bankai ? 0xff0022 : 0xffdd88,
      pearlColor: bankai ? 0xff1122 : 0x00f5ff,
      pearlEmissive: bankai ? 0xff0033 : 0x00d5ff,
      ambientColor: bankai ? 0x34080a : 0x1c223c,
      particleColor: bankai ? 0xff2834 : 0x7feaff,
    });

    let currentColors = getThemeColors(isBankaiActive);

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.005);

    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      300
    );
    // Dynamic mobile framing: closer to camera for majestic background presence
    const isMobile = window.innerWidth < 768;
    camera.position.z = isMobile ? 22 : 16;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0); // Transparent to blend seamlessly
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // ==============================
    // LIGHTING SETUP (Enhanced for Background Brilliance)
    // ==============================
    const keyLight = new THREE.DirectionalLight(0xffeedd, 2.8);
    keyLight.position.set(15, 20, 15);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x88bbdd, 1.6);
    fillLight.position.set(-15, 5, 10);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xd6dce9, 1.4);
    rimLight.position.set(0, -6, -20);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(currentColors.ambientColor, 1.0);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xd6dce9, 0x050505, 0.7);
    scene.add(hemiLight);

    // ==============================
    // SERPENTINE DRAGON BODY DEFINITION
    // ==============================
    const NUM_SPINE_POINTS = 75;
    const SEGMENT_LENGTH = 0.65;
    const BODY_SCALE = isMobile ? 1.4 : 1.68;
    const spinePoints: THREE.Vector3[] = [];
    for (let i = 0; i < NUM_SPINE_POINTS; i++) {
      spinePoints.push(new THREE.Vector3(0, 0, -i * 0.8));
    }

    // Materials with vibrant luminous presence in the background
    const dragonMaterial = new THREE.MeshStandardMaterial({
      color: currentColors.bodyColor,
      roughness: 0.55,
      metalness: 0.2,
      emissive: currentColors.bodyEmissive,
      emissiveIntensity: 0.35,
      side: THREE.DoubleSide,
    });

    const hornMat = new THREE.MeshStandardMaterial({
      color: currentColors.hornColor,
      roughness: 0.45,
      metalness: 0.35,
    });

    const accentMat = new THREE.MeshStandardMaterial({
      color: currentColors.accentColor,
      roughness: 0.55,
      metalness: 0.2,
      emissive: currentColors.accentEmissive,
      emissiveIntensity: 0.45,
    });

    const eyeMat = new THREE.MeshStandardMaterial({
      color: currentColors.eyeColor,
      roughness: 0.3,
      metalness: 0.0,
      emissive: currentColors.eyeEmissive,
      emissiveIntensity: 0.8,
    });

    const pupilMat = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.9,
      metalness: 0.0,
    });

    const whiskerMat = new THREE.MeshStandardMaterial({
      color: isBankaiActive ? 0xff4d4d : 0xf7f6f1,
      roughness: 0.5,
      metalness: 0.1,
    });

    const mouthMat = new THREE.MeshStandardMaterial({
      color: isBankaiActive ? 0x4a0005 : 0xc83c3c,
      roughness: 0.75,
      metalness: 0.0,
    });

    const toothMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.4,
      metalness: 0.1,
    });

    const bellyMat = new THREE.MeshStandardMaterial({
      color: currentColors.bellyColor,
      roughness: 0.85,
      metalness: 0.05,
    });

    const ribMat = new THREE.MeshStandardMaterial({
      color: currentColors.accentColor,
      roughness: 0.75,
      metalness: 0.1,
    });

    const armorMat = new THREE.MeshStandardMaterial({
      color: currentColors.hornColor,
      roughness: 0.75,
      metalness: 0.25,
    });

    // Master Dragon Group
    const dragonGroup = new THREE.Group();
    scene.add(dragonGroup);

    // ==============================
    // DRAGON HEAD DETAILS
    // ==============================
    const dragonHeadGroup = new THREE.Group();

    // 1. Cranium & Forehead
    const cranium = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 2.2), dragonMaterial);
    cranium.position.set(0, 0.4, 0.5);
    dragonHeadGroup.add(cranium);

    // 2. Snout & Muzzle
    const snout = new THREE.Mesh(new THREE.BoxGeometry(1.5, 1.0, 2.2), dragonMaterial);
    snout.position.set(0, 0.2, 2.0);
    dragonHeadGroup.add(snout);

    const snoutTip = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.7, 0.8), accentMat);
    snoutTip.position.set(0, 0.25, 3.0);
    dragonHeadGroup.add(snoutTip);

    // 3. Nostrils
    const leftNostril = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), pupilMat);
    leftNostril.position.set(0.45, 0.55, 3.2);
    leftNostril.scale.set(1, 0.6, 1);
    dragonHeadGroup.add(leftNostril);

    const rightNostril = leftNostril.clone();
    rightNostril.position.set(-0.45, 0.55, 3.2);
    dragonHeadGroup.add(rightNostril);

    // 4. Fierce Eyebrow Ridges & Eyes
    const lBrow = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.35, 1.0), accentMat);
    lBrow.position.set(0.7, 1.1, 1.3);
    lBrow.rotation.set(0.2, 0, -0.2);
    dragonHeadGroup.add(lBrow);

    const rBrow = lBrow.clone();
    rBrow.position.set(-0.7, 1.1, 1.3);
    rBrow.rotation.set(0.2, 0, 0.2);
    dragonHeadGroup.add(rBrow);

    const lEye = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 14), eyeMat);
    lEye.position.set(0.75, 0.75, 1.2);
    dragonHeadGroup.add(lEye);

    const lPupil = new THREE.Mesh(new THREE.SphereGeometry(0.18, 10, 10), pupilMat);
    lPupil.position.set(0.85, 0.75, 1.4);
    lPupil.scale.set(0.55, 1.25, 0.55); // Vertical slit pupil
    dragonHeadGroup.add(lPupil);

    const rEye = new THREE.Mesh(new THREE.SphereGeometry(0.35, 14, 14), eyeMat);
    rEye.position.set(-0.75, 0.75, 1.2);
    dragonHeadGroup.add(rEye);

    const rPupil = lPupil.clone();
    rPupil.position.set(-0.85, 0.75, 1.4);
    dragonHeadGroup.add(rPupil);

    // 5. Majestic Branching Stag Antlers / Horns
    const lHornMain = new THREE.Mesh(new THREE.ConeGeometry(0.35, 3.2, 10), hornMat);
    lHornMain.position.set(0.8, 2.0, -0.4);
    lHornMain.rotation.set(-0.6, 0, -0.3);
    dragonHeadGroup.add(lHornMain);

    const lHornBranch = new THREE.Mesh(new THREE.ConeGeometry(0.2, 1.5, 8), hornMat);
    lHornBranch.position.set(1.1, 2.4, -0.1);
    lHornBranch.rotation.set(-0.2, 0, -0.6);
    dragonHeadGroup.add(lHornBranch);

    const rHornMain = lHornMain.clone();
    rHornMain.position.set(-0.8, 2.0, -0.4);
    rHornMain.rotation.set(-0.6, 0, 0.3);
    dragonHeadGroup.add(rHornMain);

    const rHornBranch = lHornBranch.clone();
    rHornBranch.position.set(-1.1, 2.4, -0.1);
    rHornBranch.rotation.set(-0.2, 0, 0.6);
    dragonHeadGroup.add(rHornBranch);

    // 6. Whiskers (Barbels)
    const lWhiskerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.8, 0.1, 2.8),
      new THREE.Vector3(1.8, -0.4, 2.0),
      new THREE.Vector3(2.4, -1.2, 0.5),
      new THREE.Vector3(2.8, -2.0, -1.0),
    ]);
    const lWhisker = new THREE.Mesh(
      new THREE.TubeGeometry(lWhiskerCurve, 16, 0.08, 6, false),
      whiskerMat
    );
    dragonHeadGroup.add(lWhisker);

    const rWhiskerCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.8, 0.1, 2.8),
      new THREE.Vector3(-1.8, -0.4, 2.0),
      new THREE.Vector3(-2.4, -1.2, 0.5),
      new THREE.Vector3(-2.8, -2.0, -1.0),
    ]);
    const rWhisker = new THREE.Mesh(
      new THREE.TubeGeometry(rWhiskerCurve, 16, 0.08, 6, false),
      whiskerMat
    );
    dragonHeadGroup.add(rWhisker);

    // 7. Cheek Fins
    const lCheekFin = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.8, 8), accentMat);
    lCheekFin.position.set(1.4, -0.2, 0.4);
    lCheekFin.rotation.set(0, -0.4, -1.0);
    dragonHeadGroup.add(lCheekFin);

    const rCheekFin = lCheekFin.clone();
    rCheekFin.position.set(-1.4, -0.2, 0.4);
    rCheekFin.rotation.set(0, 0.4, 1.0);
    dragonHeadGroup.add(rCheekFin);

    // 8. Articulated Lower Jaw & Mouth
    const jawGroup = new THREE.Group();
    jawGroup.position.set(0, -0.5, 0.5);

    const jawMesh = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.5, 2.6), dragonMaterial);
    jawMesh.position.set(0, -0.2, 1.3);
    jawGroup.add(jawMesh);

    const chinBeard = new THREE.Mesh(new THREE.ConeGeometry(0.3, 1.4, 8), whiskerMat);
    chinBeard.position.set(0, -0.8, 1.5);
    chinBeard.rotation.x = -0.5;
    jawGroup.add(chinBeard);

    const tongue = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.2, 1.6), mouthMat);
    tongue.position.set(0, 0.1, 1.5);
    jawGroup.add(tongue);

    // Fangs
    const lUpperFang = new THREE.Mesh(new THREE.ConeGeometry(0.1, 0.4, 6), toothMat);
    lUpperFang.position.set(0.6, -0.3, 2.9);
    lUpperFang.rotation.x = Math.PI;
    dragonHeadGroup.add(lUpperFang);

    const rUpperFang = lUpperFang.clone();
    rUpperFang.position.set(-0.6, -0.3, 2.9);
    dragonHeadGroup.add(rUpperFang);

    const lLowerFang = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.35, 6), toothMat);
    lLowerFang.position.set(0.5, 0.25, 2.3);
    jawGroup.add(lLowerFang);

    const rLowerFang = lLowerFang.clone();
    rLowerFang.position.set(-0.5, 0.25, 2.3);
    jawGroup.add(rLowerFang);

    dragonHeadGroup.add(jawGroup);
    dragonGroup.add(dragonHeadGroup);
    dragonHeadGroup.scale.set(BODY_SCALE, BODY_SCALE, BODY_SCALE);

    // ==============================
    // DRAGON TAIL & BACK
    // ==============================
    const dragonTailGroup = new THREE.Group();
    const tailCore = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.5, 1.8), dragonMaterial);
    dragonTailGroup.add(tailCore);

    function createVoxelFin(isLeft: boolean) {
      const finGroup = new THREE.Group();
      const dir = isLeft ? 1 : -1;
      const sizes = [
        { w: 1.0, h: 0.2, d: 1.2, x: 0.8, z: 0.2 },
        { w: 0.8, h: 0.2, d: 1.0, x: 1.5, z: 0.6 },
        { w: 0.6, h: 0.2, d: 0.6, x: 2.1, z: 1.0 },
      ];
      sizes.forEach((s) => {
        const boxMesh = new THREE.Mesh(new THREE.BoxGeometry(s.w, s.h, s.d), accentMat);
        boxMesh.position.set(s.x * dir, 0, s.z);
        finGroup.add(boxMesh);
      });
      finGroup.rotation.x = -0.1;
      return finGroup;
    }

    const lTailFin = createVoxelFin(true);
    lTailFin.position.set(0.2, 0, 0.4);
    lTailFin.scale.set(0.8, 0.8, 0.8);
    dragonTailGroup.add(lTailFin);

    const rTailFin = createVoxelFin(false);
    rTailFin.position.set(-0.2, 0, 0.4);
    rTailFin.scale.set(0.8, 0.8, 0.8);
    dragonTailGroup.add(rTailFin);

    const topTailSpike = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.8, 4), hornMat);
    topTailSpike.position.set(0, 0.7, 0.2);
    topTailSpike.rotation.x = -0.4;
    dragonTailGroup.add(topTailSpike);

    const bottomTailSpike = new THREE.Mesh(new THREE.ConeGeometry(0.4, 1.4, 4), hornMat);
    bottomTailSpike.position.set(0, -0.6, 0.2);
    bottomTailSpike.rotation.x = Math.PI + 0.4;
    dragonTailGroup.add(bottomTailSpike);

    const tailStinger = new THREE.Mesh(new THREE.ConeGeometry(0.4, 2.2, 4), whiskerMat);
    tailStinger.position.set(0, 0, 1.6);
    tailStinger.rotation.x = Math.PI / 2;
    dragonTailGroup.add(tailStinger);

    dragonGroup.add(dragonTailGroup);
    dragonTailGroup.scale.set(BODY_SCALE * 0.8, BODY_SCALE * 0.8, BODY_SCALE * 0.8);

    // ==============================
    // DORSAL SPINES & BODY SEGMENTS
    // ==============================
    const dorsalSpines: THREE.Mesh[] = [];
    const numSpines = 24;
    for (let i = 0; i < numSpines; i++) {
      const spikeMesh = new THREE.Mesh(
        new THREE.ConeGeometry(0.35, 1.0, 4),
        i % 2 === 0 ? hornMat : accentMat
      );
      dragonGroup.add(spikeMesh);
      dorsalSpines.push(spikeMesh);
    }

    const dragonSegmentsGroup = new THREE.Group();
    dragonGroup.add(dragonSegmentsGroup);
    const dragonSegments: THREE.Group[] = [];

    for (let i = 0; i < NUM_SPINE_POINTS - 1; i++) {
      const segmentGroup = new THREE.Group();

      const coreMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.4 * BODY_SCALE, 1.4 * BODY_SCALE, SEGMENT_LENGTH * 1.1),
        dragonMaterial
      );

      const bellyMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.6 * BODY_SCALE, 0.3 * BODY_SCALE, SEGMENT_LENGTH * 1.05),
        bellyMat
      );
      bellyMesh.position.y = -0.6 * BODY_SCALE;

      const ribMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.7 * BODY_SCALE, 0.5 * BODY_SCALE, SEGMENT_LENGTH * 0.7),
        ribMat
      );
      ribMesh.position.y = 0.1 * BODY_SCALE;

      const armorMesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.2 * BODY_SCALE, 0.2 * BODY_SCALE, SEGMENT_LENGTH * 0.9),
        armorMat
      );
      armorMesh.position.y = 0.7 * BODY_SCALE;

      segmentGroup.add(coreMesh);
      segmentGroup.add(bellyMesh);
      segmentGroup.add(ribMesh);
      segmentGroup.add(armorMesh);

      dragonSegmentsGroup.add(segmentGroup);
      dragonSegments.push(segmentGroup);
    }

    // Lateral Fins on Body
    const lateralFinIndices = [10, 24, 42, 60];
    lateralFinIndices.forEach((idx) => {
      if (idx < dragonSegments.length) {
        const lf = createVoxelFin(true);
        lf.scale.set(1.1, 1.1, 1.1);
        const rf = createVoxelFin(false);
        rf.scale.set(1.1, 1.1, 1.1);
        dragonSegments[idx].add(lf);
        dragonSegments[idx].add(rf);
      }
    });

    // ==============================
    // THE FLAMING SPIRITUAL PEARL (Reiatsu Core)
    // ==============================
    const pearlGroup = new THREE.Group();
    scene.add(pearlGroup);

    const pearlMat = new THREE.MeshStandardMaterial({
      color: currentColors.pearlColor,
      roughness: 0.15,
      metalness: 0.1,
      emissive: currentColors.pearlEmissive,
      emissiveIntensity: 1.4,
    });
    const pearlCore = new THREE.Mesh(new THREE.SphereGeometry(0.85, 20, 20), pearlMat);
    pearlGroup.add(pearlCore);

    // Glowing aura shell
    const auraMat = new THREE.MeshBasicMaterial({
      color: currentColors.pearlColor,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const auraMesh = new THREE.Mesh(new THREE.SphereGeometry(1.3, 14, 14), auraMat);
    pearlGroup.add(auraMesh);

    // 3 Concentric Orbital Rings
    const ringMat = new THREE.MeshStandardMaterial({
      color: currentColors.accentColor,
      roughness: 0.3,
      metalness: 0.8,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.6, 0.04, 8, 32), ringMat);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.04, 8, 32), ringMat);
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.04, 8, 32), ringMat);
    ring2.rotation.x = Math.PI / 3;
    ring3.rotation.y = Math.PI / 4;
    pearlGroup.add(ring1);
    pearlGroup.add(ring2);
    pearlGroup.add(ring3);

    // ==============================
    // DRAGON BREATH PARTICLES (Reiatsu Blast)
    // ==============================
    const breathCount = 50;
    const breathGeo = new THREE.SphereGeometry(0.2, 8, 8);
    const breathMat = new THREE.MeshBasicMaterial({
      color: currentColors.particleColor,
      transparent: true,
      opacity: 0.75,
    });

    interface BreathParticle extends THREE.Mesh {
      userData: {
        active: boolean;
        life: number;
        maxLife: number;
        velocity: THREE.Vector3;
        baseScale: number;
      };
    }

    const breathParticles: BreathParticle[] = [];
    for (let i = 0; i < breathCount; i++) {
      const p = new THREE.Mesh(breathGeo, breathMat) as unknown as BreathParticle;
      p.visible = false;
      p.userData = {
        active: false,
        life: 0,
        maxLife: 35 + Math.random() * 25,
        velocity: new THREE.Vector3(),
        baseScale: 0.8 + Math.random() * 1.2,
      };
      scene.add(p);
      breathParticles.push(p);
    }

    // Function to emit a burst of breath particles
    const emitBreathBurst = (count = 12) => {
      let emitted = 0;
      const headPos = spinePoints[0];
      const headDir = new THREE.Vector3().subVectors(spinePoints[0], spinePoints[1]).normalize();
      const mouthPos = headPos.clone().add(headDir.clone().multiplyScalar(4.0 * BODY_SCALE));

      for (let i = 0; i < breathParticles.length; i++) {
        const p = breathParticles[i];
        if (!p.userData.active) {
          p.userData.active = true;
          p.userData.life = 0;
          p.position.copy(mouthPos);

          const spread = 0.35;
          p.userData.velocity.set(
            headDir.x * 0.5 + (Math.random() - 0.5) * spread,
            headDir.y * 0.5 + (Math.random() - 0.5) * spread + 0.08,
            headDir.z * 0.5 + (Math.random() - 0.5) * spread
          );

          p.scale.setScalar(p.userData.baseScale * 1.5);
          p.visible = true;
          emitted++;
          if (emitted >= count) break;
        }
      }
    };

    // ==============================
    // CELESTIAL STARDUST / SPIRIT EMBERS
    // ==============================
    const emberCount = 35;
    const emberMat = new THREE.MeshBasicMaterial({
      color: currentColors.accentColor,
      transparent: true,
      opacity: 0.5,
    });
    const embers: THREE.Mesh[] = [];
    for (let i = 0; i < emberCount; i++) {
      const ember = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12), emberMat);
      ember.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35 - 10
      );
      ember.userData = {
        speedY: 0.02 + Math.random() * 0.04,
        wobbleSpeed: 0.5 + Math.random(),
        wobbleOffset: Math.random() * Math.PI * 2,
        baseX: ember.position.x,
      };
      scene.add(ember);
      embers.push(ember);
    }

    // ==============================
    // TOUCH & MOUSE INTERACTION STATE
    // ==============================
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    let isTouching = false;

    const updateCoordinates = (clientX: number, clientY: number) => {
      targetMouse.x = (clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(clientY / window.innerHeight) * 2 + 1;
    };

    const handleMouseMove = (e: MouseEvent) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    // Touch events for full mobile & tablet touch steering
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        isTouching = true;
        updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchEnd = () => {
      isTouching = false;
    };

    // Roar trigger on jaw & sound
    const triggerDragonRoar = () => {
      setIsRoaring(true);
      sound.playDragonRoar();
      emitBreathBurst(18);

      // Snappy jaw bite & roar animation
      gsap.to(jawGroup.rotation, {
        x: -0.65,
        duration: 0.22,
        yoyo: true,
        repeat: 1,
        ease: 'power2.out',
        onComplete: () => setIsRoaring(false),
      });

      // Camera shake
      gsap.to(camera.position, {
        x: '+=0.3',
        y: '+=0.2',
        duration: 0.05,
        yoyo: true,
        repeat: 5,
      });
    };

    // Scroll tracking to make dragon dive/undulate across sections
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      scrollVelocity = THREE.MathUtils.clamp(delta * 0.04, -6, 6);
      lastScrollY = currentScrollY;
    };

    // Global click / tap to roar
    const handleGlobalClick = (e: MouseEvent | TouchEvent) => {
      // Don't roar if clicking on interactive buttons or links
      const target = e.target as HTMLElement | null;
      if (target && target.closest('button, a, input, select, textarea, [role="button"]')) {
        return;
      }
      triggerDragonRoar();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('click', handleGlobalClick);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.position.z = width < 768 ? 26 : 18;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };
    window.addEventListener('resize', handleResize);

    // ==============================
    // ANIMATION LOOP
    // ==============================
    const clock = new THREE.Clock();
    let animationFrameId: number;
    let breathEmitCounter = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Check for theme transition (Bankai toggle)
      if (stateRef.current.isBankai !== (currentColors.bodyColor === 0x16161a)) {
        currentColors = getThemeColors(stateRef.current.isBankai);
        dragonMaterial.color.setHex(currentColors.bodyColor);
        accentMat.color.setHex(currentColors.accentColor);
        hornMat.color.setHex(currentColors.hornColor);
        bellyMat.color.setHex(currentColors.bellyColor);
        eyeMat.color.setHex(currentColors.eyeColor);
        eyeMat.emissive.setHex(currentColors.eyeEmissive);
        pearlMat.color.setHex(currentColors.pearlColor);
        pearlMat.emissive.setHex(currentColors.pearlEmissive);
        auraMat.color.setHex(currentColors.pearlColor);
        ringMat.color.setHex(currentColors.accentColor);
        breathMat.color.setHex(currentColors.particleColor);
        ambientLight.color.setHex(currentColors.ambientColor);
        whiskerMat.color.setHex(stateRef.current.isBankai ? 0xff4d4d : 0xf7f6f1);
      }

      // Smooth mouse / touch interpolation (faster response when finger is touching)
      const followLerp = isTouching ? 0.085 : 0.05;
      mouse.lerp(targetMouse, followLerp);

      // Smooth decay of scroll velocity
      scrollVelocity *= 0.92;

      // Pearl Target computation:
      // If autoFlight is enabled or user isn't interacting on desktop, add graceful autonomous figure-eight soaring
      const pearlTime = elapsedTime * 1.3;
      let pearlTargetX = mouse.x * 16;
      let pearlTargetY = mouse.y * 10 - scrollVelocity * 0.35;
      let pearlTargetZ = 0;

      if (stateRef.current.autoFlight) {
        pearlTargetX = Math.sin(pearlTime * 0.8) * 14;
        pearlTargetY = Math.cos(pearlTime * 0.6) * 8 + Math.sin(pearlTime * 1.2) * 3;
        pearlTargetZ = Math.sin(pearlTime * 0.9) * 6;
      } else {
        pearlTargetX += Math.sin(pearlTime * 0.7) * 3;
        pearlTargetY += Math.sin(pearlTime) * 1.5 + Math.cos(pearlTime * 0.4) * 2;
        pearlTargetZ += Math.cos(pearlTime * 0.8) * 3;
      }

      const pearlBase = new THREE.Vector3(pearlTargetX, pearlTargetY, pearlTargetZ);

      // Pearl Dynamic Evasion AI: When dragon head gets close, pearl flees!
      const dragonToPearl = new THREE.Vector3().subVectors(pearlGroup.position, spinePoints[0]);
      const distToPearl = dragonToPearl.length();
      const fleeRadius = 38; // Evasion trigger distance
      const pearlTarget = pearlBase.clone();

      if (distToPearl < fleeRadius && distToPearl > 0.01) {
        const fleeDir = dragonToPearl.normalize();
        const fleeStrength = ((fleeRadius - distToPearl) / fleeRadius) * 26;
        pearlTarget.add(fleeDir.multiplyScalar(fleeStrength));
      }

      pearlGroup.position.lerp(pearlTarget, 0.045);

      // Pearl Ring and Aura Rotation
      auraMesh.scale.setScalar(1.0 + Math.sin(elapsedTime * 6) * 0.15);
      ring1.rotation.x += 0.02;
      ring1.rotation.y += 0.03;
      ring2.rotation.x -= 0.025;
      ring2.rotation.z += 0.02;
      ring3.rotation.y -= 0.02;
      ring3.rotation.z -= 0.015;

      // ==============================
      // DRAGON SERPENTINE MOTION
      // ==============================
      const chaseTarget = pearlGroup.position.clone();

      // Add harmonic serpentine weave
      const weaveTime = elapsedTime * 1.35;
      const weaveAmount = 2.4;
      const chaseDir = new THREE.Vector3().subVectors(chaseTarget, spinePoints[0]);
      if (chaseDir.lengthSq() > 0.01) {
        const right = new THREE.Vector3()
          .crossVectors(chaseDir.normalize(), new THREE.Vector3(0, 1, 0))
          .normalize();
        const weaveOffset = right.multiplyScalar(Math.sin(weaveTime) * weaveAmount);
        chaseTarget.add(weaveOffset);
        chaseTarget.y += Math.sin(weaveTime * 1.5) * 1.4;
      }

      // Smooth steering toward target
      spinePoints[0].lerp(chaseTarget, 0.028);

      // Follow-the-leader relaxation
      for (let i = 1; i < NUM_SPINE_POINTS; i++) {
        const prev = spinePoints[i - 1];
        const curr = spinePoints[i];
        const dir = new THREE.Vector3().subVectors(curr, prev);
        if (dir.lengthSq() < 0.0001) {
          dir.set(0, 0, -1);
        } else {
          dir.normalize();
        }
        const target = prev.clone().add(dir.multiplyScalar(SEGMENT_LENGTH));
        curr.lerp(target, 0.55);
      }

      // Strict distance constraint pass (prevents jitter & stretching)
      for (let i = 1; i < NUM_SPINE_POINTS; i++) {
        const prev = spinePoints[i - 1];
        const curr = spinePoints[i];
        const dir = new THREE.Vector3().subVectors(curr, prev);
        const dist = dir.length();
        if (dist > 0.0001) {
          dir.normalize();
          curr.copy(prev).add(dir.multiplyScalar(SEGMENT_LENGTH));
        }
      }

      // Update Dragon Head orientation
      dragonHeadGroup.position.copy(spinePoints[0]);
      if (spinePoints.length > 1) {
        const forwardTarget = new THREE.Vector3()
          .subVectors(spinePoints[0], spinePoints[1])
          .add(spinePoints[0]);
        dragonHeadGroup.lookAt(forwardTarget);
      }

      // Gentle mouth breathing animation (when not actively roaring)
      if (!isRoaring) {
        jawGroup.rotation.x = Math.min(0, -Math.abs(Math.sin(elapsedTime * 2.2)) * 0.25);
      }

      // Update Dragon Tail orientation
      const tailIdx = NUM_SPINE_POINTS - 1;
      dragonTailGroup.position.copy(spinePoints[tailIdx]);
      if (tailIdx > 0) {
        const tailTarget = new THREE.Vector3()
          .subVectors(spinePoints[tailIdx], spinePoints[tailIdx - 1])
          .add(spinePoints[tailIdx]);
        dragonTailGroup.lookAt(tailTarget);
      }

      // Update Dorsal Spines along spine
      for (let i = 0; i < numSpines; i++) {
        const spineIdx = Math.floor((i / numSpines) * (NUM_SPINE_POINTS - 5)) + 2;
        const pos = spinePoints[spineIdx];
        const prevPos = spinePoints[spineIdx - 1];
        const nextPos = spinePoints[spineIdx + 1];

        dorsalSpines[i].position.copy(pos);
        const forward = new THREE.Vector3().subVectors(prevPos, nextPos).normalize();
        const target = pos.clone().add(forward);
        dorsalSpines[i].lookAt(target);
        dorsalSpines[i].rotation.x += Math.PI / 2;

        const t = spineIdx / NUM_SPINE_POINTS;
        const s = BODY_SCALE * (1.0 - t * 0.6);
        dorsalSpines[i].scale.set(s, s, s);
      }

      // Update Body Segments
      for (let i = 0; i < NUM_SPINE_POINTS - 1; i++) {
        const p1 = spinePoints[i];
        const p2 = spinePoints[i + 1];
        const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);

        dragonSegments[i].position.copy(midPoint);
        dragonSegments[i].lookAt(p2);

        // Taper scale toward tail
        const t = i / (NUM_SPINE_POINTS - 1);
        let scale = 1.0;
        if (t < 0.1) scale = 1.0;
        else if (t > 0.8) {
          const tailT = (t - 0.8) / 0.2;
          scale = 0.8 * (1.0 - tailT * 0.82);
        } else {
          const midT = (t - 0.1) / 0.7;
          scale = 1.0 - midT * 0.2;
        }
        dragonSegments[i].scale.set(scale, scale, 1.0);
      }

      // Dragon Breath Stream
      breathEmitCounter++;
      if (breathEmitCounter % 3 === 0) {
        emitBreathBurst(1);
      }

      // Update active breath particles
      for (let i = 0; i < breathParticles.length; i++) {
        const p = breathParticles[i];
        if (p.userData.active) {
          p.userData.life++;
          p.position.add(p.userData.velocity);

          const lifeRatio = p.userData.life / p.userData.maxLife;
          const fadeScale = p.userData.baseScale * (1 - lifeRatio);
          p.scale.setScalar(Math.max(fadeScale, 0.01));
          (p.material as THREE.MeshBasicMaterial).opacity = (1 - lifeRatio) * 0.65;
          p.position.y += 0.01;

          if (p.userData.life >= p.userData.maxLife) {
            p.userData.active = false;
            p.visible = false;
            p.position.set(0, -100, 0);
          }
        }
      }

      // Stardust Ember Float & Parallax
      const parallaxX = mouse.x * 4;
      embers.forEach((ember) => {
        ember.position.y += ember.userData.speedY;
        if (ember.position.y > 25) ember.position.y = -25;
        const wobble =
          Math.sin(elapsedTime * ember.userData.wobbleSpeed + ember.userData.wobbleOffset) * 0.25;
        ember.position.x = ember.userData.baseX + wobble + parallaxX * 0.6;
        ember.rotation.x += 0.03;
        ember.rotation.y += 0.03;
      });

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('click', handleGlobalClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D WebGL Canvas fixed in the background behind all website content */}
      <div
        ref={containerRef}
        className={`fixed inset-0 pointer-events-none transition-opacity duration-700 ${
          isVisible ? 'opacity-100 z-0' : 'opacity-0 -z-10'
        }`}
        aria-hidden="true"
      >
        <canvas
          ref={canvasRef}
          id="dragon-canvas"
          className="w-full h-full block touch-none"
        />
      </div>

      {/* Floating Dragon Flight HUD & Touch Control Badge fixed on top */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto flex flex-col gap-2">
        <div className="flex items-center gap-2 p-1.5 sm:p-2 bg-black/80 border border-white/15 backdrop-blur-md shadow-2xl">
          {/* Status Dot */}
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isBankaiActive ? 'bg-[#D71920] animate-ping' : 'bg-[#00e5ff] animate-pulse'
            }`}
          />

          {/* Dragon Title */}
          <div className="flex flex-col pr-2 border-r border-white/10">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">
              {isBankaiActive ? 'DAIGUREN 3D' : 'HYORINMARU 3D'}
            </span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-white tracking-wider">
              {isBankaiActive ? '大紅蓮 氷輪丸' : '霜天に坐せ 氷輪丸'}
            </span>
          </div>

          {/* Action 1: Roar / Breathe Blast */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              sound.playDragonRoar();
              setIsRoaring(true);
              setTimeout(() => setIsRoaring(false), 600);
            }}
            className="px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase bg-white/10 hover:bg-[#D71920] hover:text-black text-white/90 transition-all flex items-center gap-1.5"
            title="Trigger Spirit Dragon Roar"
          >
            <Volume2 className="w-3 h-3" />
            <span className="hidden sm:inline">ROAR</span>
          </button>

          {/* Action 2: Flight Mode (Follow vs Auto) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAutoFlight((prev) => !prev);
              sound.playHover();
            }}
            className={`px-2.5 py-1 text-[11px] font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              autoFlight
                ? 'bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/40'
                : 'bg-white/5 hover:bg-white/15 text-white/70'
            }`}
            title="Toggle between Follow Cursor/Touch and Autonomous Soar"
          >
            <Compass className="w-3 h-3" />
            <span className="hidden sm:inline">{autoFlight ? 'AUTO' : 'TOUCH'}</span>
          </button>

          {/* Action 3: Toggle Visibility */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible((prev) => !prev);
              sound.playHover();
            }}
            className="p-1.5 text-white/50 hover:text-white transition-colors"
            title={isVisible ? 'Hide 3D Dragon' : 'Show 3D Dragon'}
          >
            {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Mobile touch guidance tooltip */}
        <div className="hidden sm:flex items-center gap-1.5 text-[9px] font-mono text-white/40 tracking-wider">
          <Sparkles className="w-2.5 h-2.5 text-[#00e5ff]" />
          <span>Touch & drag anywhere to steer dragon in background • Tap screen to roar</span>
        </div>
      </div>
    </>
  );
};

export default DragonCanvas3D;
