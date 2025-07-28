export default function Home() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto text-gray-800 space-y-6 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Bem-vindo(a) ao meu Desafio Frontend GTHC! 👋</h1>

      <p className="text-lg text-gray-700">
        Olá! Este é o projeto que desenvolvi para o desafio da GTHC, com o objetivo de recriar a plataforma de consulta
        de disciplinas da UFABC.
      </p>
      <p className="text-lg text-gray-700">
        Minha meta foi além de apenas replicar um design. Busquei construir uma aplicação completa e interativa, e
        principalmente, **aplicar os conceitos da metodologia de arquitetura Feature-Sliced Design (FSD)**, garantindo
        um código escalável e de fácil manutenção.
      </p>

      <div>
        <p className="mb-3">
          Para tirar essa ideia do papel, utilizei uma stack que considero moderna e extremamente eficiente:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4 text-gray-700">
          <li>
            <strong>React com TypeScript:</strong> para uma base de código robusta, tipada e componentizada.
          </li>
          {/* LINHA ATUALIZADA */}
          <li>
            <strong>shadcn/ui e Tailwind CSS:</strong> para construir uma interface bonita, responsiva e acessível,
            utilizando componentes baseados em Radix UI.
          </li>
          <li>
            <strong>React Router DOM:</strong> para gerenciar as rotas da aplicação, criando uma experiência de
            navegação rápida como em uma SPA (Single Page Application).
          </li>
          <li>
            <strong>Lucide Icons:</strong> para os ícones, mantendo a interface limpa e leve.
          </li>
        </ul>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Um Tour pelas Funcionalidades Principais 🚀</h2>

      <p>
        Meu foco foi criar uma experiência de uso que fosse tão bem construída quanto o código por trás dela. Ao
        explorar a plataforma, convido você a notar alguns pontos-chave:
      </p>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Uma Aplicação Viva e Dinâmica</h3>
          <p>
            Nada aqui é estático. Todas as informações das matérias são carregadas em tempo real a partir dos arquivos
            JSON. Use a barra de busca (com `debounce` para otimizar o desempenho), filtre por categorias e clique em
            uma matéria. Graças ao React Router, a transição para a página de detalhes é instantânea, sem
            recarregamento.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Design que se Adapta a Você</h3>
          <p>
            A responsividade foi uma prioridade. Convido você a redimensionar a janela do seu navegador ou a acessar
            pelo celular. Você verá o layout se reorganizar de forma inteligente, garantindo que a experiência seja
            impecável tanto em uma tela grande, para máxima produtividade, quanto na palma da sua mão.
          </p>
        </div>
      </div>

      <hr className="my-8" />

      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Arquitetura e Performance ⚙️</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-2">Organização é tudo: Arquitetura FSD</h3>
          <p>
            Para manter o código limpo, meu principal objetivo técnico foi aplicar a metodologia{' '}
            <a
              href="https://feature-sliced.design/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-semibold"
            >
              Feature-Sliced Design (FSD)
            </a>
            . Isso significa que dividi o projeto em camadas com responsabilidades claras (`shared`, `entities`,
            `widgets`, `pages`), o que torna o código muito mais fácil de entender, testar e dar manutenção no futuro.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Performance em Primeiro Lugar</h3>
          <p>
            Para garantir que a aplicação seja rápida, implementei e <strong>Scroll Infinito</strong>, que carrega mais
            matérias conforme você rola a página, evitando sobrecarregar o navegador com dados desnecessários.
          </p>
        </div>
      </div>

      <hr className="my-8" />

      <div className="text-center text-gray-600">
        <p>Obrigado por seu tempo e atenção ao avaliar meu projeto! Foi um desafio muito gratificante de construir.</p>
        <p className="font-semibold text-gray-800 mt-4">
          Estou sempre buscando evoluir, então qualquer feedback sobre a solução desenvolvida é muito bem-vindo.
        </p>
      </div>
    </div>
  );
}
