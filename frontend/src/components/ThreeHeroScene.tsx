import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeHeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // SSR and jsdom environment guard
    if (typeof window === "undefined" || !containerRef.current) return;
    if (typeof navigator !== "undefined" && navigator.userAgent.includes("jsdom")) return;

    try {
      const testCanvas = document.createElement("canvas");
      const gl = testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl");
      if (!gl) return;
    } catch {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setClearColor(0x000000, 0);
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    // --- Clean, Simple, Elegant Floating Ambient Particles ---
    const count = 90;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    const emerald = new THREE.Color(0x10b981);
    const cyan = new THREE.Color(0x06b6d4);
    const slate = new THREE.Color(0x64748b);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 130;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;

      // Very slow, gentle ambient float
      velocities[i * 3] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = Math.random() * 0.02 + 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;

      const rand = Math.random();
      const col = rand > 0.6 ? emerald : rand > 0.3 ? cyan : slate;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 2.0,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Subtle gentle mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 5;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 5;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth camera follow
      targetX += (mouseX - targetX) * 0.04;
      targetY += (-mouseY - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      if (!prefersReducedMotion) {
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const posArray = posAttr.array as Float32Array;

        for (let i = 0; i < count; i++) {
          posArray[i * 3] += velocities[i * 3];
          posArray[i * 3 + 1] += velocities[i * 3 + 1];
          posArray[i * 3 + 2] += velocities[i * 3 + 2];

          // Wrap vertically when floating up
          if (posArray[i * 3 + 1] > 45) {
            posArray[i * 3 + 1] = -45;
            posArray[i * 3] = (Math.random() - 0.5) * 130;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      material.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Soft, calm ambient radial glows that sit deep in the background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-emerald-500/[0.08] blur-[140px]" />
      <div className="absolute bottom-1/3 right-1/4 translate-x-1/4 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.07] blur-[150px]" />
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  );
}
