import FadeIn from '@/components/FadeIn';

export default function Contato() {
  return (
    <div className="conteudo-principal">
      <main>
        <section id="redes-sociais">
          <div className="hero-card">
            <FadeIn delay={0.1}>
              <h1>Vamos Conversar?</h1>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h2>Canais de Contato & Redes Profissionais</h2>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="descricao-hero">
                Estou disponível para oportunidades de estágio, networking e projetos na área de TI. Escolha a melhor forma de se conectar comigo:
              </p>
            </FadeIn>
          </div>

          <div className="grid-tecnologias">
            {/* Card 1 */}
            <FadeIn delay={0.5}>
              <div className="card-tech">
                <i className="bx bxl-linkedin tech-icon"></i>
                <h4>LinkedIn</h4>
                <p>Acompanhe minha trajetória profissional e conexões.</p>
                <a href="https://www.linkedin.com/in/kelvinleardini/" target="_blank" rel="noopener noreferrer" className="btn-cta primario btn-block">
                  Ver LinkedIn
                </a>
              </div>
            </FadeIn>

            {/* Card 2 */}
            <FadeIn delay={0.6}>
              <div className="card-tech">
                <i className="bx bxl-github tech-icon"></i>
                <h4>GitHub</h4>
                <p>Confira meus repositórios de código e projetos desenvolvidos.</p>
                <a href="https://github.com/KelvinLeardini" target="_blank" rel="noopener noreferrer" className="btn-cta secundario btn-block">
                  Ver GitHub
                </a>
              </div>
            </FadeIn>

            {/* Card 3 */}
            <FadeIn delay={0.7}>
              <div className="card-tech">
                <i className="bx bxl-whatsapp tech-icon"></i>
                <h4>WhatsApp</h4>
                <p>Entre em contato direto para mensagens rápidas.</p>
                <a href="https://wa.link/m0qdn5" target="_blank" rel="noopener noreferrer" className="btn-cta secundario btn-block">
                  Mandar Mensagem
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      <aside className="sidebar-novidades">
        <FadeIn delay={0.9}>
          <div className="card-aside">
            <h3>📄 Resumo Profissional</h3>
            <p className="texto-destaque">
              Estudante de <strong>Análise e Desenvolvimento de Sistemas</strong> buscando oportunidade de estágio em Tecnologia da Informação.
            </p>
            <p className="texto-destaque">
              Focado em aprendizado contínuo, com forte senso de organização e conhecimentos em <strong>Lógica de Programação, Python e AWS</strong>.
            </p>
            
            <hr className="divisor-aside" />
            
            <p className="contato-email">
              <i className="bx bx-envelope"></i> <a href="mailto:kelvinleardini@gmail.com" className="link-discreto">kelvinleardini@gmail.com</a>
            </p>
            
            <a href="/CV_KELVIN_LEARDINI.pdf" download="CV_Kelvin_Leardini.pdf" className="btn-cta primario btn-block">
              <i className="bx bx-download"></i> Baixar Currículo (PDF)
            </a>
          </div>
        </FadeIn>
      </aside>
    </div>
  );
}