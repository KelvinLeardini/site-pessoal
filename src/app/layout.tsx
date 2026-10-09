import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Kelvin Leardini",
  description: "Análise e Desenvolvimento de Sistemas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Importação do Boxicons para toda a aplicação */}
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body>
        <Header />
        {/* Aqui no {children} é onde o Next.js injeta o conteúdo de cada página específica */}
        {children} 
        <Footer />
      </body>
    </html>
  );
}