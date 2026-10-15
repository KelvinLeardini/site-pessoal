import FadeIn from "@/components/FadeIn";
import Typewriter from "@/components/Typewriter";
import MorphingBlob3D from "@/components/MorphingBlob3D";

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
        {/* 3D Morphing Blob volumétrico em WebGL centralizado atrás do texto e card */}
        <MorphingBlob3D />

        <div className="hero-content">
          <FadeIn delay={0.1}>
            <div className="hero-badge-container">
              <span className="badge-pulse"></span>
              <span className="badge-text">Estudante de ADS &bull; Aberto a Estágio & Freelas</span>
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
              <strong> Análise e Desenvolvimento de Sistemas</strong> com grande entusiasmo por tecnologia,
              desenvolvimento de software e boas práticas de código.
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
              <span className="ide-filename">kelvin.ts</span>
              <span className="ide-status">TypeScript</span>
            </div>
            <div className="ide-body font-mono">
              <p><span className="code-keyword">const</span> <span className="code-var">developer</span> = &#123;</p>
              <p className="code-indent-1">
                <span className="code-prop">nome:</span> <span className="code-string">"Kelvin Leardini"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">formacao:</span> <span className="code-string">"Análise e Dev. de Sistemas"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">mentalidade:</span> <span className="code-string">"Evolução contínua & entrega de valor"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">focoDeDesenvolvimento:</span> [
              </p>
              <p className="code-indent-2">
                <span className="code-string">"Arquitetura Web & Front-End Moderno"</span>,
              </p>
              <p className="code-indent-2">
                <span className="code-string">"Modelagem e Consultas SQL"</span>,
              </p>
              <p className="code-indent-2">
                <span className="code-string">"Fundamentos de Cloud (AWS)"</span>
              </p>
              <p className="code-indent-1">],</p>
              <p className="code-indent-1">
                <span className="code-prop">disponibilidade:</span> <span className="code-string">"Estágio / Trainee / Júnior"</span>,
              </p>
              <p className="code-indent-1">
                <span className="code-prop">prontoParaSomar:</span> <span className="code-boolean">true</span>
              </p>
              <p>&#125;;</p>
              <div className="ide-command-line">
                <Typewriter
                  prefix="$ "
                  words={[
                    "SELECT * FROM competencias WHERE status = 'estudando';",
                    "aws s3 ls && npm run dev",
                    "git commit -m 'feat: aprendizado continuo'"
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
          <h2 className="section-title">Minha Jornada & Estudos</h2>
          <div className="section-divider"></div>
        </div>

        <div className="about-grid">
          <FadeIn delay={0.1} className="about-text-card card-surface">
            <div className="card-top-icon">
              <i className="bx bx-book-open"></i>
            </div>
            <h3>Formação Acadêmica & Foco</h3>
            <p>
              Sou estudante de <strong>Análise e Desenvolvimento de Sistemas (ADS)</strong>. 
              Estou construindo minha base técnica com dedicação diária, entendendo os conceitos por trás do código e 
              desenvolvendo projetos práticos para consolidar cada matéria.
            </p>
            <p>
              No momento, dedico meu tempo de estudo a três pilares essenciais: <strong>Modelagem e consultas em SQL</strong>, 
              fundamentos de <strong>Cloud Computing com AWS</strong>, e desenvolvimento <strong>Front-End interativo</strong> (com React, Next.js e explorando Vue). Também já estudei e criei automações e scripts com <strong>Python</strong>.
            </p>
            
            <div className="about-pills">
              <span className="about-pill"><i className="bx bx-check"></i> Aprendizado Ativo</span>
              <span className="about-pill"><i className="bx bx-check"></i> Prática com Projetos</span>
              <span className="about-pill"><i className="bx bx-check"></i> Curiosidade Técnica</span>
              <span className="about-pill"><i className="bx bx-check"></i> Aberto a Feedbacks</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="about-stats-card card-surface">
            <div className="card-top-icon">
              <i className="bx bx-briefcase"></i>
            </div>
            <h3>Objetivos & Oportunidades</h3>
            <p>
              Tenho total clareza de que estou no início da minha carreira em formação. Busco minha primeira 
              oportunidade de <strong>Estágio em TI / Desenvolvimento</strong> para aprender na prática com desenvolvedores mais experientes, 
              além de estar aberto a <strong>trabalhos freelance</strong> para criação de sites e interfaces.
            </p>

            <div className="meta-box-group">
              <div className="meta-box">
                <span className="meta-label font-mono">Formação</span>
                <span className="meta-value">Análise e Dev. de Sistemas (ADS)</span>
              </div>
              <div className="meta-box">
                <span className="meta-label font-mono">Objetivo</span>
                <span className="meta-value">Estágio, Trainee ou Júnior</span>
              </div>
              <div className="meta-box">
                <span className="meta-label font-mono">Estudos Atuais</span>
                <span className="meta-value">SQL &bull; AWS Cloud &bull; Front-End</span>
              </div>
              <div className="meta-box">
                <span className="meta-label font-mono">Localização</span>
                <span className="meta-value">São Paulo - SP (Híbrido / Remoto)</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ========================================================
          3. SEÇÃO STACK & TECNOLOGIAS EM ESTUDO (SEPARADAS POR ÁREA)
         ======================================================== */}
      <section id="stack" className="section-block">
        <div className="section-header">
          <span className="section-label font-mono">03 // COMPETÊNCIAS EM ESTUDO</span>
          <h2 className="section-title">O que Venho Estudando & Praticando</h2>
          <p className="section-desc">
            Organizado por categorias técnicas: linguagens, frameworks, banco de dados, cloud e ferramentas:
          </p>
          <div className="section-divider"></div>
        </div>

        <div className="tech-cards-grid">
          {/* Card 1: Banco de Dados Relacional (SQL) */}
          <FadeIn delay={0.1}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon tools">
                <i className="bx bx-data"></i>
              </div>
              <h4>Banco de Dados & SQL</h4>
              <p>Foco de estudo atual: modelagem relacional, criação de tabelas, consultas (SELECT, JOINs, filtros) e manipulação de dados.</p>
              <div className="tags-tech font-mono">
                <span>SQL</span>
                <span>Modelagem</span>
                <span>Queries</span>
                <span>Relacional</span>
              </div>
            </div>
          </FadeIn>

          {/* Card 2: Cloud Computing (AWS) */}
          <FadeIn delay={0.2}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon" style={{ background: "rgba(251, 191, 36, 0.15)", color: "#fbbf24" }}>
                <i className="bx bx-cloud"></i>
              </div>
              <h4>Cloud Computing (AWS)</h4>
              <p>Estudando os fundamentos da nuvem da Amazon (AWS Foundations): EC2, S3, IAM, conceitos de arquitetura e serviços essenciais.</p>
              <div className="tags-tech font-mono">
                <span>AWS Cloud</span>
                <span>S3</span>
                <span>EC2</span>
                <span>Conceitos Cloud</span>
              </div>
            </div>
          </FadeIn>

          {/* Card 3: Frameworks Front-End */}
          <FadeIn delay={0.3}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon react">
                <i className="bx bxl-react"></i>
              </div>
              <h4>Frameworks Front-End</h4>
              <p>Construção de SPAs modernas com React e Next.js (App Router, components, SSR), além de estudos exploratórios em Vue.js.</p>
              <div className="tags-tech font-mono">
                <span>React</span>
                <span>Next.js</span>
                <span>Vue.js</span>
                <span>Components</span>
              </div>
            </div>
          </FadeIn>

          {/* Card 4: Linguagens Web (JavaScript & TypeScript) */}
          <FadeIn delay={0.4}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon ts">
                <i className="bx bxl-typescript"></i>
              </div>
              <h4>Linguagens Web (JS & TS)</h4>
              <p>Base sólida de lógica de programação com JavaScript moderno (ES6+), manipulação assíncrona e tipagem estática rigorosa com TypeScript.</p>
              <div className="tags-tech font-mono">
                <span>JavaScript</span>
                <span>TypeScript</span>
                <span>ES6+</span>
                <span>Tipagem</span>
              </div>
            </div>
          </FadeIn>

          {/* Card 5: Linguagem & Scripts (Python) */}
          <FadeIn delay={0.5}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon node">
                <i className="bx bxl-python"></i>
              </div>
              <h4>Linguagem & Scripts (Python)</h4>
              <p>Lógica de algoritmos, automações e scripts práticos já desenvolvidos em projetos de estudo utilizando Python.</p>
              <div className="tags-tech font-mono">
                <span>Python</span>
                <span>Lógica</span>
                <span>Scripts</span>
                <span>Automação</span>
              </div>
            </div>
          </FadeIn>

          {/* Card 6: Estrutura, Runtime & Git */}
          <FadeIn delay={0.6}>
            <div className="card-tech-modern card-surface">
              <div className="tech-badge-icon html">
                <i className="bx bxl-nodejs"></i>
              </div>
              <h4>Node.js, Web & Git</h4>
              <p>Execução server-side e APIs com Node.js, marcação semântica com HTML5/CSS3 responsivo e versionamento contínuo com Git e GitHub.</p>
              <div className="tags-tech font-mono">
                <span>Node.js</span>
                <span>HTML5 / CSS3</span>
                <span>Git & GitHub</span>
                <span>Vercel</span>
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
          <h2 className="section-title">Aberto a Estágio & Freelas</h2>
          <p className="section-desc">
            Estou em busca da minha primeira oportunidade de estágio em TI e disponível para projetos freelance (sites, landing pages e interfaces).
            Vamos conversar?
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