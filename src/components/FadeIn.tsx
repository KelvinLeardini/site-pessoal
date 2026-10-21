"use client";

import { useEffect, useRef, useState } from "react";

export default function FadeIn({ 
  children, 
  delay = 0,
  className = ""
}: { 
  children: React.ReactNode; 
  delay?: number;
  className?: string;
}) {
  const domRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = domRef.current;
    if (!element) return;

    // Se o navegador não tiver suporte ao IntersectionObserver, torna visível direto no DOM
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      element.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries && entries[0];
        // Ativa a visibilidade assim que entra na tela ao rolar
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`scroll-reveal-item ${isVisible ? "is-visible" : ""} ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}s` : "0s",
      }}
    >
      {children}
    </div>
  );
}
