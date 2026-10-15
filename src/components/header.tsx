"use client";

import { useEffect, useState } from "react";
import Typewriter from "./Typewriter";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Efeito de sombra e opacidade quando desce a página
      setScrolled(window.scrollY > 20);

      // Detecta qual seção está visível na tela para marcar no menu
      const secoes = ["inicio", "sobre", "stack", "projetos", "contato"];
      const scrollPos = window.scrollY + 160;

      for (const id of secoes) {
        const elemento = document.getElementById(id);
        if (elemento) {
          const topo = elemento.offsetTop;
          const altura = elemento.offsetHeight;
          if (scrollPos >= topo && scrollPos < topo + altura) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuAberto(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85; // Altura do header fixo com folga
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <header className={`header-principal ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        {/* Lado Esquerdo: Efeito de código digitando */}
        <a 
          href="#inicio" 
          onClick={(e) => scrollToSection(e, "inicio")} 
          className="brand-dev"
          title="Ir para o topo"
        >
          <div className="terminal-dots">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
          </div>
          <Typewriter 
            prefix=""
            words={[
              "kelvin.dev",
              "const dev = 'Kelvin';",
              "<KelvinLeardini />",
              "kelvin.build()"
            ]}
            typingSpeed={80}
            deletingSpeed={40}
            pauseMs={2200}
            className="brand-code"
          />
        </a>

        {/* Botão Mobile Hamburger */}
        <button 
          className="btn-mobile-menu"
          onClick={() => setMenuAberto(!menuAberto)}
          aria-label="Abrir menu"
        >
          <i className={`bx ${menuAberto ? 'bx-x' : 'bx-menu'}`}></i>
        </button>

        {/* Menu de Navegação One-Page */}
        <nav className={`nav-menu ${menuAberto ? "aberto" : ""}`}>
          <a
            href="#inicio"
            onClick={(e) => scrollToSection(e, "inicio")}
            className={`btn-nav ${activeSection === "inicio" ? "ativo" : ""}`}
          >
            <span className="nav-tag">01.</span> Início
          </a>

          <a
            href="#sobre"
            onClick={(e) => scrollToSection(e, "sobre")}
            className={`btn-nav ${activeSection === "sobre" ? "ativo" : ""}`}
          >
            <span className="nav-tag">02.</span> Sobre
          </a>

          <a
            href="#stack"
            onClick={(e) => scrollToSection(e, "stack")}
            className={`btn-nav ${activeSection === "stack" ? "ativo" : ""}`}
          >
            <span className="nav-tag">03.</span> Stack
          </a>

          <a
            href="#projetos"
            onClick={(e) => scrollToSection(e, "projetos")}
            className={`btn-nav ${activeSection === "projetos" ? "ativo" : ""}`}
          >
            <span className="nav-tag">04.</span> Projetos
          </a>

          <a
            href="#contato"
            onClick={(e) => scrollToSection(e, "contato")}
            className={`btn-nav ${activeSection === "contato" ? "ativo" : ""}`}
          >
            <span className="nav-tag">05.</span> Contato
          </a>

          {/* CTA para Currículo */}
          <a
            href="/img/CV_KELVIN_LEARDINI.pdf"
            download="CV_Kelvin_Leardini.pdf"
            className="btn-cv-header"
          >
            <i className="bx bx-download"></i> Currículo
          </a>
        </nav>
      </div>
    </header>
  );
}