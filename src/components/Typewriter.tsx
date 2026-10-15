"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
  prefix?: string;
  words?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
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

  useEffect(() => {
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
        // Concluiu a exclusão, avança para o próximo termo
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={`typewriter-container ${className}`}>
      {prefix && <span className="typewriter-prefix">{prefix}</span>}
      <span className="typewriter-text">{currentText}</span>
      <span className="typewriter-cursor">_</span>
    </span>
  );
}

