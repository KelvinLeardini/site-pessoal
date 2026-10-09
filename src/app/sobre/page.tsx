import FadeIn from '@/components/FadeIn';

export default function Sobre() {
  return (
    <div className="conteudo-principal">
      <main>
        <FadeIn delay={0.1}>
          <section id="sobre" style={{ marginTop: 0 }}>
            <div className="card-apresentacao" style={{ marginTop: 0 }}>
              <h2><i className='bx bx-user' style={{ marginRight: '10px' }}></i>Sobre Mim</h2>
              <article>
                <p>Sou estudante de Análise e Desenvolvimento de Sistemas e estou iniciando minha jornada na área de Tecnologia da Informação.</p>
                <p>Tenho grande interesse em aprender, desenvolver novas habilidades e compreender as diversas áreas da tecnologia, como desenvolvimento de software, banco de dados e análise de sistemas.</p>
              </article>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.3}>
          <section id="objetivos">
            <div className="card-apresentacao">
              <h3><i className='bx bx-target-lock' style={{ marginRight: '10px' }}></i>Objetivo Profissional</h3>
              <article>
                <p>Neste momento, meu objetivo é construir uma base sólida de conhecimentos e descobrir, por meio da prática, a área com a qual mais me identifico.</p>
                <p>Busco uma oportunidade de estágio que me permita aplicar o que estou aprendendo, adquirir experiência prática e evoluir profissionalmente ao lado de pessoas que compartilham o interesse por tecnologia e inovação.</p>
              </article>
            </div>
          </section>
        </FadeIn>

        <FadeIn delay={0.5}>
          <section id="valores">
            <div className="card-apresentacao">
              <h3><i className='bx bx-trending-up' style={{ marginRight: '10px' }}></i>Visão de Carreira</h3>
              <article>
                <p>Acredito que dedicação, aprendizado contínuo e vontade de crescer são os pilares para construir uma carreira de sucesso na área de TI.</p>
              </article>
            </div>
          </section>
        </FadeIn>
      </main>

      <aside className="sidebar-novidades">
        <FadeIn delay={0.2}>
          <div className="card-aside">
            <h3>📌 Info Rápida</h3>
            <p><strong>Curso:</strong> ADS (Análise e Desenvolvimento de Sistemas)</p>
            <hr className="divisor-aside" />
            <p><strong>Foco:</strong> Desenvolvimento Web & Sistemas</p>
            <hr className="divisor-aside" />
            <p><strong>Localização:</strong> São Paulo, Brasil</p>
          </div>
        </FadeIn>
      </aside>
    </div>
  );
}