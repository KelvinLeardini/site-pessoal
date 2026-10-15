"use client";

import { useEffect, useRef } from "react";

interface NodePoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  isSquare: boolean;
}

export default function TechNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = Math.max(window.innerHeight, 900));

    // Cores fiéis à imagem do HubTech (Laranja Terracotta/Amber, Ciano Dev e Branco suave)
    const techColors = [
      "rgba(224, 100, 56, 0.85)",   // Laranja Terracotta da imagem
      "rgba(251, 191, 36, 0.75)",   // Amber / Dourado
      "rgba(56, 189, 248, 0.7)",    // Cyan Dev
      "rgba(255, 255, 255, 0.55)",  // Branco
    ];

    // Cria os nós estáticos de rede/programação
    const nodeCount = 55;
    const nodes: NodePoint[] = [];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        // Distribui com mais concentração na metade superior (Hero)
        y: Math.random() * (height * 0.85),
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() > 0.85 ? 3 : 1.8,
        color: techColors[Math.floor(Math.random() * techColors.length)],
        isSquare: Math.random() > 0.75, // Nós quadrados como pacotes de dados
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 150 };

    const handleMouseMove = (e: MouseEvent) => {
      // Como o canvas é absolute no topo, o offset de scroll precisa ser considerado
      mouse.x = e.clientX;
      mouse.y = e.clientY + window.scrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = Math.max(window.innerHeight, 900);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    const maxLinkDistance = 145;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Conexões de rede entre os nós
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];

        n1.x += n1.vx;
        n1.y += n1.vy;

        // Limites da tela
        if (n1.x < 0 || n1.x > width) n1.vx *= -1;
        if (n1.y < 0 || n1.y > height * 0.85) n1.vy *= -1;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxLinkDistance) {
            const alpha = (1 - dist / maxLinkDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            // Linha fina de transmissão de pacotes
            ctx.strokeStyle = `rgba(224, 100, 56, ${alpha * 0.75})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Interação com o mouse (raio de rede ativa)
        const mdx = n1.x - mouse.x;
        const mdy = n1.y - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < mouse.radius) {
          const mAlpha = (1 - mDist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // 2. Desenha o nó (ponto ou quadradinho de pacote)
        ctx.fillStyle = n1.color;
        if (n1.isSquare) {
          ctx.fillRect(n1.x - n1.size, n1.y - n1.size, n1.size * 2, n1.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(n1.x, n1.y, n1.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="hero-network-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="hero-network-canvas" />
      {/* Degrade suave de fade-out: o topo tem a rede e vai se apagando para o preto total do restante do site */}
      <div className="hero-network-fadeout"></div>
    </div>
  );
}

