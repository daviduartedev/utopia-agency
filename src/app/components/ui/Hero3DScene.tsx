"use client";

/**
 * Hero3DScene — objeto 3D abstrato (núcleo icosaedro wireframe) usado como
 * "mundo" atrás do texto do hero. Leve, sem modelos externos.
 *
 * - three.js r184 (já no package.json)
 * - Responsivo via ResizeObserver
 * - Pausa quando a aba está oculta
 * - Desmonta e libera geometria/material/renderer no unmount
 * - Sem OrbitControls (só rotação automática suave)
 *
 * Design: dois icosaedros concêntricos (wireframe + halo translúcido) +
 * pointlights sutis, dando leitura de "núcleo tecnológico" sem competir
 * com a tipografia.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export interface Hero3DSceneProps {
  className?: string;
  /** Cor principal das arestas (hex). */
  accent?: string;
  /** Cor de luz secundária. */
  accent2?: string;
}

export function Hero3DScene({
  className,
  accent = "#e4e4e7",
  accent2 = "#a1a1aa",
}: Hero3DSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";

    // Núcleo wireframe
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accent),
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    scene.add(core);

    // Shell externo translúcido
    const shellGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accent2),
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    scene.add(shell);

    // Pontos brilhantes pequenos orbitando (partículas)
    const particleCount = 120;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const r = 2.6 + Math.random() * 0.9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: new THREE.Color(accent),
      size: 0.022,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // Animação
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf = 0;

    const render = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(render);
        return;
      }
      const t = clock.getElapsedTime();
      if (!prefersReduced) {
        core.rotation.x = t * 0.14;
        core.rotation.y = t * 0.18;
        shell.rotation.x = -t * 0.06;
        shell.rotation.y = -t * 0.08;
        points.rotation.y = t * 0.04;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    // Resize
    const setSize = () => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(setSize);
    ro.observe(el);
    setSize();

    // Paralax sutil com o mouse (sem OrbitControls)
    let targetX = 0;
    let targetY = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetX = nx * 0.35;
      targetY = -ny * 0.25;
    };
    el.addEventListener("mousemove", onMove);

    const easing = () => {
      scene.rotation.y += (targetX - scene.rotation.y) * 0.04;
      scene.rotation.x += (targetY - scene.rotation.x) * 0.04;
      raf2 = requestAnimationFrame(easing);
    };
    let raf2 = requestAnimationFrame(easing);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(raf2);
      ro.disconnect();
      el.removeEventListener("mousemove", onMove);
      coreGeo.dispose();
      coreMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [accent, accent2]);

  return <div ref={containerRef} className={className} style={{ width: "100%", height: "100%" }} />;
}

export default Hero3DScene;
