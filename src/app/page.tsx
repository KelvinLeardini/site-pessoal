import FadeIn from "@/components/FadeIn";
import Typewriter from "@/components/Typewriter";

interface Repositorio {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language?: string;
  stargazers_count?: number;
  topics?: string[];
}

export default async function Home() {
  // Busca dinâmica com cache de 1 hora dos repositórios no servidor (SSR/ISR)
  let repositorios: Repositorio[] = [];
  try {
    const resposta = await fetch(
      "https://api.github.com/users/KelvinLeardini/repos?sort=updated&per_page=8",
      { next: { revalidate: 3600 } }
    );
    if (resposta.ok) {
      repositorios = await resposta.json();
    }
  } catch (error) {
    console.error("Erro ao carregar repositórios do GitHub:", error);
  }

  // Filtrar repositório com o mesmo nome de perfil e limitar aos 6 principais
  const reposExibidos = repositorios
    .filter((repo) => repo.name.toLowerCase() !== "kelvinleardini")
    .slice(0, 6);

  return (
    <div className="onepage-wrapper">
      {/* ========================================================
          1. SEÇÃO INÍCIO (HERO SECTION)
         ======================================================== */}
      <section id="inicio" className="section-hero">
        <div className="hero-content">
          <FadeIn delay={0.1}>
            <div className="hero-badge-container">
              <span className="badge-pulse"></span>
              <span className="badge-text">Disponível para Projetos & Estágio</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="hero-title">
              Construindo sistemas, interfaces e experiências na web.
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="hero-subtitle">
              Olá! Sou <strong className="highlight-text">Kelvin Leardini</strong>, estudante de 
              <strong> Análise e Desenvolvimento de Sistemas</strong> com paixão por arquitetura front-end,
              APIs e boas práticas de código.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="hero-actions">
              <a href="#projetos" className="btn-modern primary">
                <i className="bx bx-code-alt"></i> Ver Projetos
              </a>
              <a href="#contato" className="btn-modern secondary">
                <i className="bx bx-paper-plane"></i> Entrar em Contato
              </a>
              <a
                href="https://github.com/KelvinLeardini"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                title="GitHub"
              >
                <i className="bx bxl-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/kelvinleardini/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-icon"
                title="LinkedIn"
              >
                <i className="bx bxl-linkedin"></i>
              </a>
            </div>
          </FadeIn>
        </div>

        {/* Card Interativo estilo IDE / Terminal ao lado */}
        <FadeIn delay={0.5} className="hero-visual">
          <div className="dev-ide-card">
            <div className="ide-header">
              <div className="ide-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <span className="ide-filename">profile.ts</span>
              <span className="ide-status">TypeScript</span>
            </div>
            <div className="ide-body font-mono">
              <p><span className="code-keyword">const</span> <span className="code-var">developer</span> = &#123;</p>
              <p className="code-indent-1">
                <span className="code-prop">name:</span> <span className="code-string">"Kelvin Leardini"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">focus:</span> <span className="code-string">"Front-End & Sistemas Web"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">academic:</span> <span className="code-string">"Análise e Dev. de Sistemas"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">location:</span> <span className="code-string">"São Paulo, Brasil"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">skills:</span> [
              </p>
              <p className="code-indent-2">
                <span className="code-string">"React"</span>, <span className="code-string">"Next.js"</span>, <span className="code-string">"TypeScript"</span>,
              </p>
              <p className="code-indent-2">
                <span className="code-string">"Node.js"</span>, <span className="code-string">"Python"</span>, <span className="code-string">"Git"</span>
              </p>
              <p className="code-indent-1">],</p>
              <p className="code-indent-1">
                <span className="code-prop">openForWork:</span> <span className="code-boolean">true</span>
              </p>
              <p>&#125;;</p>
              <div className="ide-command-line">
                <Typewriter
                  prefix="$ "
                  words={[
                    "npm run build:future",
                    "git commit -m 'feat: ready for new challenges'",
                    "kelvin.contact()"
                  ]}
                  typingSpeed={75}
                  deletingSpeed={35}
                  pauseMs={3000}
                />
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ========================================================
          2. SEÇÃO SOBRE MIM
         ======================================================== */}
      <section id="sobre" className="section-block">
        <div className="section-header">
          <span className="section-label font-mono">02 // QUEM SOU</span>
          <h2 className="section-title">Sobre Minha Trajetória</h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-grid">
          <FadeIn delay={0.1} className="about-text-card card-surface">
            <div className="card-top-icon">
              <i className="bx bx-user-circle"></i>
            </div>
            <h3>Formação & Propósito</h3>
            <p>
              Sou estudante de <strong>Análise e Desenvolvimento de Sistemas (ADS)</strong> e estou 
              construindo minha caminhada na área de Tecnologia da Informação com foco prático e sólido.
            </p>
            <p>
              Tenho grande entusiasmo em resolver problemas por meio do desenvolvimento de software,
              sempre com atenção à estrutura de dados, clareza no código e experiência de navegação do usuário.
            </p>
            
            <div className="about-pills">
              <span className="about-pill"><i className="bx bx-check"></i> Foco em Aprendizado</span>
              <span className="about-pill"><i className="bx bx-check"></i> Código Limpo</span>
              <span className="about-pill"><i className="bx bx-check"></i> Trabalho em Equipe</span>
              <span className="about-pill"><i className="bx bx-check"></i> Pró-ativo</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="about-stats-card card-surface">
            <div className="card-top-icon">
              <i className="bx bx-target-lock"></i>
            </div>
            <h3>Objetivo Profissional</h3>
            <p>
              Busco uma oportunidade de <strong>Estágio em Desenvolvimento de Software ou TI</strong> para
              aplicar meus conhecimentos, colaborar em projetos reais e crescer tecnicamente em conjunto com o time.
            </p>

            <div className="meta-box-group">
              <div className="meta-box">
                <span className="meta-label font-mono">Curso</span>
                <span className="meta-value">Análise e Dev. de Sistemas</span>
              </div>
              <div className="meta-box">
                <span className="meta-label font-mono">Disponibilidade</span>
                <span className="meta-value">Estágio / Júnior</span>
              </div>
              <div className="meta-box">
                <span className="meta-label font-mono">Localização</span>
                <span className="meta-value">São Paulo - SP (Híbrido/Remoto)</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================================
          3. SEÇÃO STACK & TECNOLOGIAS
         ======================================================== */}
      <section id="stack" className="section-block">
        <div className="section-header">
          <span className="section-label font-mono">03 // COMPETÊNCIAS</span>
          <h2 className="section-title">Minha Stack & Ferramentas</h2>
          <div className="section-divider"></div>
        </div>

        <div className="tech-cards-grid">
          <FadeIn delay={0.1}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon react">
                <i className="bx bxl-react"></i>
              </div>
              <h4>React & Next.js</h4>
              <p>Criação de SPAs modernas, Server Components, roteamento por pasta (App Router) e renderização ágil.</p>
              <div className="tags-tech font-mono">
                <span>Components</span>
                <span>Hooks</span>
                <span>SSR</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon ts">
                <i className="bx bxl-typescript"></i>
              </div>
              <h4>JavaScript & TypeScript</h4>
              <p>Lógica de programação, manipulação assíncrona, tipagem estática rigorosa e escalabilidade.</p>
              <div className="tags-tech font-mono">
                <span>ES6+</span>
                <span>Tipagem</span>
                <span>Interfaces</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon html">
                <i className="bx bxl-html5"></i>
              </div>
              <h4>HTML5 & CSS Moderno</h4>
              <p>Semântica acessível, Flexbox, CSS Grid, animações fluidas e design totalmente responsivo para qualquer tela.</p>
              <div className="tags-tech font-mono">
                <span>Flexbox</span>
                <span>Grid</span>
                <span>Keyframes</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon node">
                <i className="bx bxl-nodejs"></i>
              </div>
              <h4>Back-End & Banco de Dados</h4>
              <p>Conhecimentos em Node.js, Python, consumo e modelagem básica de APIs REST e integrações SQL.</p>
              <div className="tags-tech font-mono">
                <span>Node.js</span>
                <span>Python</span>
                <span>SQL</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.5}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon git">
                <i className="bx bxl-git"></i>
              </div>
              <h4>Git, GitHub & Vercel</h4>
              <p>Controle de versão, branches, commits convencionais e deploy contínuo integrado (CI/CD).</p>
              <div className="tags-tech font-mono">
                <span>Git Flow</span>
                <span>Deploy CI/CD</span>
                <span>Vercel</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.6}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon tools">
                <i className="bx bx-cog"></i>
              </div>
              <h4>Ferramentas & Qualidade</h4>
              <p>VS Code, ESLint, Postman para testes de requisições e interesse contínuo em Cloud (AWS Foundations).</p>
              <div className="tags-tech font-mono">
                <span>VS Code</span>
                <span>Postman</span>
                <span>AWS</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================================
          4. SEÇÃO PROJETOS (PORTFÓLIO)
         ======================================================== */}
      <section id="projetos" className="section-block">
        <div className="section-header">
          <span className="section-label font-mono">04 // REPOSITÓRIOS</span>
          <h2 className="section-title">Projetos Recentes</h2>
          <p className="section-desc">
            Sincronizados diretamente com a API do GitHub. Repositórios e códigos produzidos na prática:
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="projects-grid">
          {reposExibidos.length > 0 ? (
            reposExibidos.map((repo, idx) => (
              <FadeIn key={repo.id} delay={idx * 0.1}>
                <article className="card-project card-surface">
                  <div className="project-top">
                    <div className="folder-icon">
                      <i className="bx bx-folder"></i>
                    </div>
                    <div className="project-external-links">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Ver código de ${repo.name}`}
                        title="Ver no GitHub"
                      >
                        <i className="bx bxl-github"></i>
                      </a>
                    </div>
                  </div>

                  <h3 className="project-title">{repo.name}</h3>
                  <p className="project-description">
                    {repo.description || "Projeto em desenvolvimento contínuo. Código aberto e documentado no repositório."}
                  </p>

                  <div className="project-footer font-mono">
                    {repo.language && (
                      <span className="project-lang">
                        <span className="lang-indicator"></span>
                        {repo.language}
                      </span>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Acessar Repo <i className="bx bx-right-arrow-alt"></i>
                    </a>
                  </div>
                </article>
              </FadeIn>
            ))
          ) : (
            <div className="fallback-projects">
              <p>Carregando projetos do GitHub...</p>
            </div>
          )}
        </div>

        <FadeIn delay={0.4}>
          <div className="github-cta-banner card-surface">
            <div>
              <h3>Quer ver mais códigos e experimentos?</h3>
              <p>Explore todos os meus repositórios, forks e contribuições ativas no meu GitHub.</p>
            </div>
            <a
              href="https://github.com/KelvinLeardini"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modern primary"
            >
              <i className="bx bxl-github"></i> Visitar @KelvinLeardini
            </a>
          </div>
        </FadeIn>
      </section>

      {/* ========================================================
          5. SEÇÃO CONTATO
         ======================================================== */}
      <section id="contato" className="section-block section-contato">
        <div className="section-header text-center">
          <span className="section-label font-mono">05 // CONEXÃO</span>
          <h2 className="section-title">Vamos Construir Algo Juntos?</h2>
          <p className="section-desc">
            Estou à procura de novas oportunidades, desafios e trocas de conhecimento.
            Sinta-se à vontade para me chamar em qualquer canal!
          </p>
          <div className="section-divider mx-auto"></div>
        </div>

        <div className="contact-cards-container">
          {/* Card LinkedIn */}
          <FadeIn delay={0.1}>
            <a
              href="https://www.linkedin.com/in/kelvinleardini/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-surface"
            >
              <div className="contact-icon linkedin">
                <i className="bx bxl-linkedin"></i>
              </div>
              <div className="contact-info">
                <h4>LinkedIn</h4>
                <p>Kelvin Leardini</p>
                <span className="contact-action">Conectar na rede →</span>
              </div>
            </a>
          </FadeIn>

          {/* Card WhatsApp */}
          <FadeIn delay={0.2}>
            <a
              href="https://wa.link/m0qdn5"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-card card-surface"
            >
              <div className="contact-icon whatsapp">
                <i className="bx bxl-whatsapp"></i>
              </div>
              <div className="contact-info">
                <h4>WhatsApp</h4>
                <p>Mensagem Direta</p>
                <span className="contact-action">Conversar agora →</span>
              </div>
            </a>
          </FadeIn>

          {/* Card E-mail */}
          <FadeIn delay={0.3}>
            <a
              href="mailto:kelvinleardini@gmail.com"
              className="contact-card card-surface"
            >
              <div className="contact-icon email">
                <i className="bx bx-envelope"></i>
              </div>
              <div className="contact-info">
                <h4>E-mail</h4>
                <p>kelvinleardini@gmail.com</p>
                <span className="contact-action">Enviar e-mail →</span>
              </div>
            </a>
          </FadeIn>

          {/* Card Baixar CV */}
          <FadeIn delay={0.4}>
            <a
              href="/img/CV_KELVIN_LEARDINI.pdf"
              download="CV_Kelvin_Leardini.pdf"
              className="contact-card card-surface cv-highlight"
            >
              <div className="contact-icon cv">
                <i className="bx bx-file"></i>
              </div>
              <div className="contact-info">
                <h4>Currículo Completo</h4>
                <p>Download em PDF</p>
                <span className="contact-action">Baixar arquivo →</span>
              </div>
            </a>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}