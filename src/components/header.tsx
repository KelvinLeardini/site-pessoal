"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname(); // Descobre qual é a URL atual

  return (
    <header className="header-principal">
      <Link href="/">
        {/* No Next.js, arquivos da pasta public não precisam do 'public/' no caminho */}
        <img src="/img/imglogo.png" alt="Logo Kelvin Leardini" className="logo-img" />
      </Link>
      
      <nav className="nav-menu">
        <Link href="/" className={`btn-nav ${pathname === '/' ? 'ativo' : ''}`}>Início</Link>
        <Link href="/sobre" className={`btn-nav ${pathname === '/sobre' ? 'ativo' : ''}`}>Sobre</Link>
        <Link href="/contato" className={`btn-nav ${pathname === '/contato' ? 'ativo' : ''}`}>Contato</Link>
        <Link href="/portifolio" className={`btn-nav ${pathname === '/portifolio' ? 'ativo' : ''}`}>Portfólio</Link>
      </nav>
    </header>
  );
}