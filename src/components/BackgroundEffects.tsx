"use client";

import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="bg-canvas-wrapper" aria-hidden="true">
      {/* 1. Malha quadriculada sutil estilo Blueprint / Dev Grid */}
      <div className="bg-grid-pattern"></div>

      {/* 2. Luz de Spotlight dinâmica que segue o cursor do mouse */}
      <div
        className="mouse-spotlight"
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
      ></div>

      {/* 3. Luzes flutuantes orgânicas (Orbs) que se movem sozinhas em loop no fundo */}
      <div className="floating-orb orb-cyan"></div>
      <div className="floating-orb orb-purple"></div>
      <div className="floating-orb orb-emerald"></div>

      {/* 4. Vinheta / Máscara nas bordas para suavizar os cantos da tela */}
      <div className="bg-vignette"></div>
    </div>
  );
}

