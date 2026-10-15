"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer-modern">
      <div className="footer-content">
        <div className="footer-left font-mono">
          <p className="code-tag">
            &copy; {year} Kelvin Leardini. Construído com <span className="text-accent">React & Next.js</span>.
          </p>
        </div>
        <div className="footer-links">
          <a
            href="https://github.com/KelvinLeardini"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <i className="bx bxl-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/kelvinleardini/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="bx bxl-linkedin"></i>
          </a>
          <a
            href="https://wa.link/m0qdn5"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <i className="bx bxl-whatsapp"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}