// Tipagem TypeScript Sênior para o retorno da API do GitHub
interface Repositorio {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
}

import FadeIn from "@/components/FadeIn";

// Em Next.js, a função do componente pode ser assíncrona (async) nativamente!
export default async function Portfolio() {
  
  // O Fetch acontece direto no servidor!
  // O objeto { next: { revalidate: 3600 } } diz ao Next.js para fazer cache do GitHub 
  // e só buscar de novo a cada 1 hora (3600 segundos), deixando o site super rápido.
  const resposta = await fetch('https://api.github.com/users/KelvinLeardini/repos?sort=updated&per_page=6', {
    next: { revalidate: 3600 } 
  });
  
  let repositorios: Repositorio[] = [];
  
  if (resposta.ok) {
    repositorios = await resposta.json();
  }

  return (
    <div className="conteudo-principal">
      <main>
        <section id="meus-projetos">
          <div className="hero-card">
            <h1>Meus Projetos</h1>
            <h2>Aplicações, APIs e Front-end</h2>
            <p className="descricao-hero">
              Aqui estão os meus repositórios mais recentes, sincronizados automaticamente com o meu GitHub.
            </p>
          </div>

          <div className="grid-tecnologias">
            {/* O .map() substitui o forEach do Vanilla JS e gera os cards no HTML */}
            {repositorios
              .filter(repo => repo.name !== 'KelvinLeardini') // Ignora o repo do perfil
              .map((repo, index) => (
                <FadeIn key={repo.id} delay={index * 0.15}>

                <article key={repo.id} className="card-tech">
                  <i className="bx bx-folder tech-icon"></i>
                  <h4>{repo.name}</h4>
                  <p>{repo.description || 'Projeto em desenvolvimento. Código disponível no repositório.'}</p>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="btn-cta secundario btn-block">
                    Ver Repositório
                  </a>
                </article>

                </FadeIn>
            ))}
          </div>
        </section>
      </main>

      <aside className="sidebar-novidades">
        <div className="card-aside">
          <h3>🛠️ Minha Stack</h3>
          <p className="texto-destaque" style={{ marginBottom: '15px' }}>Principais tecnologias e ferramentas que utilizo no dia a dia:</p>
          
          <hr className="divisor-aside" />
          
          <p className="texto-destaque">✔️ HTML5 & CSS3</p>
          <p className="texto-destaque">✔️ JavaScript & TypeScript</p>
          <p className="texto-destaque">✔️ React & Next.js</p> {/* Atualizado! */}
          <p className="texto-destaque">✔️ Node.js & Express</p>
          <p className="texto-destaque">✔️ Prisma ORM & MySQL</p>
        </div>
      </aside>
    </div>
  );
}