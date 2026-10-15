import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Kelvin Leardini | Desenvolvedor Web & ADS",
  description: "Portfólio de Kelvin Leardini - Estudante de Análise e Desenvolvimento de Sistemas, Desenvolvedor Front-end, Next.js e TypeScript.",
  keywords: ["Kelvin Leardini", "Desenvolvedor Front-end", "Next.js", "React", "TypeScript", "ADS", "Portfólio"],
  authors: [{ name: "Kelvin Leardini" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Google Fonts: Plus Jakarta Sans, JetBrains Mono e Inter */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Ícones Boxicons */}
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}