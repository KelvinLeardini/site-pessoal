"use client";

import { useState, useEffect, useSyncExternalStore } from "react";

interface TypewriterProps {
  prefix?: string;
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export default function Typewriter({
  prefix = "> ",
  words = ["kelvin.init()", "const dev = 'Kelvin';", "<KelvinLeardini />"],
  typingSpeed = 90,
  deletingSpeed = 45,
  pauseMs = 2000,
  className = "",
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    // Se o usuário prefere reduzir movimento, não inicia animação
    if (prefersReducedMotion) return;

    const currentWord = words[wordIndex % words.length];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      // Escrevendo caractere por caractere
      if (currentText.length < currentWord.length) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Chegou ao fim da palavra, aguarda antes de começar a apagar
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseMs);
      }
    } else {
      // Apagando caractere por caractere
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Concluiu a exclusão, aguarda uma pausa rápida antes de começar o próximo termo
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs, prefersReducedMotion]);

  // Se o usuário tem reduced-motion ativo, exibe a palavra inteira diretamente
  const textToShow = prefersReducedMotion ? words[0] : currentText;

  return (
    <span className={`typewriter-container ${className}`}>
      {prefix && <span className="typewriter-prefix">{prefix}</span>}
      <span className="typewriter-text">{textToShow}</span>
      <span className="typewriter-cursor">_</span>
    </span>
  );
}

