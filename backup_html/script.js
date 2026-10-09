// Função assíncrona para buscar os dados na API do GitHub
async function carregarProjetos() {
    // 1. Mapeia o container onde os cards vão aparecer
    const container = document.getElementById('projetos-github');

    // Se o elemento não existir na página (ex: usuário está na Home), a função para aqui e evita erros no console.
    if (!container) return;

    try {
        // 2. Faz a requisição para a API pública do GitHub usando o seu usuário
        // O parâmetro sort=updated traz os repositórios que você mexeu por último.
        // O per_page=6 limita aos 6 projetos mais recentes para não quebrar o layout.
        const resposta = await fetch('https://api.github.com/users/KelvinLeardini/repos?sort=updated&per_page=6');

        // Se a API der erro (ex: limite de requisições excedido), disparamos um erro manual
        if (!resposta.ok) {
            throw new Error('Falha ao buscar os repositórios');
        }

        // 3. Converte a resposta para um objeto JavaScript (JSON)
        const repositorios = await resposta.json();

        // Limpa o texto de "Carregando..." do HTML
        container.innerHTML = '';

        // 4. Cria um loop (forEach) para cada repositório retornado pela API
        repositorios.forEach(repo => {
            // Ignora o repositório especial que é apenas o README do seu perfil
            if (repo.name === 'KelvinLeardini') return;

            // Constrói a estrutura HTML do card inserindo os dados dinâmicos (${variavel})
            const card = `
                <article class="card-tech">
                    <span class="tech-icon">📂</span>
                    <h4>${repo.name}</h4>
                    <p>${repo.description || 'Projeto em desenvolvimento. Código disponível no repositório.'}</p>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="btn-cta secundario btn-block">
                        Ver Repositório
                    </a>
                </article>
            `;
            
            // Injeta o card finalizado no container
            container.innerHTML += card;
        });

    } catch (erro) {
        // Boas práticas: sempre trate erros para o usuário não ficar olhando para uma tela de carregamento infinita
        console.error('Erro na requisição da API do GitHub:', erro);
        container.innerHTML = '<p>Erro ao carregar os projetos. Visite meu GitHub através da página de Contato.</p>';
    }
}

// Escuta o evento de carregamento da página e dispara a função principal
document.addEventListener('DOMContentLoaded', carregarProjetos);