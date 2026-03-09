# CineFinder

Aplicação web para descoberta de filmes e séries usando a API do TMDB.

## Funcionalidades

- Página inicial com:
  - filmes em cartaz
  - séries populares
  - trailer do dia (YouTube)
- Página de filmes (`/movies`) com:
  - busca por título
  - filtros por categoria
  - paginação
- Página de séries (`/series`) com:
  - busca por título
  - filtros por categoria
  - paginação
- Interface responsiva para desktop e mobile

## Stack

- React 19 + TypeScript
- Vite
- React Router
- Tailwind CSS 4
- Axios
- Headless UI + Heroicons + Lucide
- Framer Motion

## Pré-requisitos

- Node.js 20+ (recomendado)
- npm
- Chave da API do TMDB

## Configuração

1. Clone o projeto.
2. Instale as dependências:

```bash
npm install
```

3. Crie/edite o arquivo `.env` na raiz:

```env
VITE_API_KEY=sua_chave_tmdb_aqui
```

## Scripts

- `npm run dev`: inicia ambiente local em modo desenvolvimento
- `npm run build`: gera build de produção
- `npm run preview`: inicia servidor para pré-visualizar o build
- `npm run lint`: executa lint do projeto

## Estrutura principal

```text
src/
  components/
    Header.tsx
    SearchInput.tsx
    FilterButton.tsx
    home/Card.tsx
  pages/
    home/index.tsx
    movie/index.tsx
    series/index.tsx
  services/
    mediaService.ts
```

## Observações

- O projeto usa `VITE_API_KEY` via `import.meta.env`.
- O idioma das requisições para o TMDB está configurado como `pt-BR`.
