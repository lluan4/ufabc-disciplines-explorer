# Desafio Frontend GTHC - Catálogo de Disciplinas UFABC

![Prévia da Aplicação](https://i.imgur.com/your-screenshot-url.png) 
> Este projeto é a minha solução para o Desafio Frontend da GTHC, que consiste em recriar a plataforma de consulta de disciplinas da UFABC.

**🔗 Link para o projeto ao vivo:** [**seusite.com**](https://seusite.com) 
---

## ✨ Funcionalidades

- **Navegação Fluida:** Transição instantânea entre as seções "Matérias" e "Quadrimestre Ideal" sem recarregar a página.
- **Busca Inteligente:** Campo de busca com `debounce` para pesquisar cursos e matérias com alta performance.
- **Visualização Detalhada:** Exibição completa dos detalhes de cada matéria, como ementa, objetivos e bibliografia.
- **Filtragem por Categoria:** O menu permite filtrar as matérias por curso (ex: Ciência da Computação, etc.).
- **Layout Responsivo:** A interface se adapta perfeitamente a qualquer tamanho de tela, de celulares a desktops.
- **Scroll Infinito:** A lista de matérias é carregada sob demanda conforme o usuário rola a página, otimizando o carregamento inicial.

---

## 🛠️ Tecnologias Utilizadas

A stack utilizada foi escolhida para garantir uma base de código moderna, performática e escalável.

- **React com TypeScript:** Para uma base de código robusta, tipada e componentizada.
- **shadcn/ui e Tailwind CSS:** Para construir uma interface bonita, responsiva e acessível, utilizando componentes baseados em Radix UI.
- **React Router DOM:** Para gerenciar as rotas da aplicação (SPA).
- **Lucide React:** Para ícones vetoriais, mantendo a interface limpa e leve.
- **Vite:** Como ferramenta de build, proporcionando um ambiente de desenvolvimento extremamente rápido.

---

## 🏗️ Arquitetura e Decisões de Projeto

O principal objetivo técnico do projeto foi construir uma base de código limpa e organizada, pronta para crescer.

### Feature-Sliced Design (FSD)

Para alcançar isso, a arquitetura do projeto foi fortemente inspirada na metodologia **[Feature-Sliced Design](https://feature-sliced.design/)**. O código foi dividido em camadas com responsabilidades bem definidas:

- **`shared/`**: Lógica, componentes e hooks reutilizáveis em toda a aplicação.
- **`entities/`**: As entidades de negócio (ex: Matéria, Categoria).
- **`widgets/`**: Blocos de UI que compõem seções da página (ex: Menu Lateral).
- **`pages/`**: As páginas completas da aplicação.

Essa abordagem torna o código mais fácil de entender, testar e manter a longo prazo.

### Otimizações de Performance

Para garantir uma experiência de usuário fluida, foram implementadas duas otimizações principais:
1.  **Lazy Loading:** As páginas são carregadas apenas quando o usuário acessa a rota correspondente, diminuindo o tempo de carregamento inicial.
2.  **Scroll Infinito:** Utilizando a `IntersectionObserver API`, a aplicação carrega a lista de matérias em lotes, evitando sobrecarregar o navegador com centenas de itens de uma só vez.

---

## 🚀 Rodando o Projeto Localmente

Siga os passos abaixo para executar o projeto na sua máquina.

**Pré-requisitos:**
- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [Git](https://git-scm.com/)

```bash
# 1. Clone o repositório
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)

# 2. Navegue até a pasta do projeto
cd seu-repositorio

# 3. Instale as dependências
npm install
# ou
yarn install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev

# 5. Abra http://localhost:5173 (ou a porta indicada no terminal) no seu navegador.
