import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // Only on pointer-capable devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const handlePointerMove = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  if (!position) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{
        background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.07), rgba(6, 182, 212, 0.04) 35%, transparent 70%)`,
      }}
      aria-hidden="true"
    />
  );
}
