import FadeIn from '@/components/FadeIn';
import Link from 'next/link'; 

export default function Home() {
  return (
    <div className="conteudo-principal">
        <main>
            <section id="apresentacao-inicial">
                <div className="hero-card">
                    {/* A cascata começa aqui! Cada elemento ganha +0.1s de atraso */}
                    <FadeIn delay={0.1}>
                        <span className="badge-status">🟢 Disponível para projetos</span>
                    </FadeIn>
                    
                    <FadeIn delay={0.2}>
                        <h1>Kelvin Leardini</h1>
                    </FadeIn>
                    
                    <FadeIn delay={0.3}>
                        <h2>Desenvolvedor Front-end & Web</h2>
                    </FadeIn>
                    
                    <FadeIn delay={0.4}>
                        <p className="descricao-hero">
                            Desenvolvo interfaces modernas, responsivas e focadas na melhor experiência do usuário. Conheça meus projetos e experiências.
                        </p>
                    </FadeIn>
                    
                    <FadeIn delay={0.5}>
                        <div className="hero-acoes">
                            {/* Tags <a> trocadas por <Link> e rotas corrigidas */}
                            <Link href="/portifolio" className="btn-cta primario">Ver Portfólio</Link>
                            <Link href="/contato" className="btn-cta secundario">Entrar em Contato</Link>
                        </div>
                    </FadeIn>
                </div>
            </section>

            <section id="tecnologias">
                <FadeIn delay={0.6}>
                    <h3>Minha Stack & Ferramentas</h3>
                </FadeIn>
                
                <div className="grid-tecnologias">
                    <FadeIn delay={0.7}>
                        <div className="card-tech">
                            <span className="tech-icon">🌐</span>
                            <h4>HTML5 & CSS3</h4>
                            <p>Estruturação semântica, Flexbox, Grid e layouts responsivos.</p>
                        </div>
                    </FadeIn>
                    
                    <FadeIn delay={0.8}>
                        <div className="card-tech">
                            <span className="tech-icon">⚡</span>
                            <h4>JavaScript</h4>
                            <p>Lógica de programação, manipulação de DOM e interatividade.</p>
                        </div>
                    </FadeIn>
                    
                    <FadeIn delay={0.9}>
                        <div className="card-tech">
                            <span className="tech-icon">🚀</span>
                            <h4>Deploy & Git</h4>
                            <p>Versionamento de código com GitHub e hospedagem contínua na Vercel.</p>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </main>

        <aside className="sidebar-novidades">
            {/* O menu lateral é o último a aparecer */}
            <FadeIn delay={1.0}>
                <div className="card-aside">
                    <h3>📌 Destaques & Status</h3>
                    <p><strong>Status atual:</strong> Estudando e construindo novos projetos web.</p>
                    <hr className="divisor-aside" />
                    <h4>Último Projeto</h4>
                    <p className="texto-destaque">Site Pessoal & Portfólio reestruturado do zero.</p>
                    <Link href="/portifolio" className="link-discreto">Saber mais →</Link>
                </div>
            </FadeIn>
        </aside>
    </div>
  );
}