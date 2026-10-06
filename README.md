# Pichau — conceito de redesign

Conceito independente de loja gamer com busca, filtros, favoritos e carrinho demonstrativo.
Sem vínculo comercial com a Pichau; produtos e preços são ilustrativos.

Feito com React 19, Vite e Tailwind CSS 4.

## Executar

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # build de produção em dist/
npm run preview  # serve o build localmente
```

## Estrutura

```text
src/
├── assets/images/      computador do hero e imagens dos produtos
├── components/
│   ├── ui/             genéricos: Modal, Toast, EmptyState
│   ├── layout/         Header, Navbar, Footer
│   ├── products/       ProductCard e ProductSection (vitrines)
│   └── cart/           CartModal
├── pages/home/         HomePage (estado de busca/filtros) e seções exclusivas da home
├── data/               produtos, categorias e conteúdo estático da home
├── hooks/              carrinho, favoritos e toast (com persistência em localStorage)
├── utils/              formatação de moeda e acesso seguro ao localStorage
├── App.jsx             composição principal
└── index.css           tema do Tailwind, estilos base e hero
legacy/                 versão original em HTML, CSS e JavaScript
```

A versão original continua acessível em `http://localhost:5173/legacy/index.html` durante o `npm run dev`, para comparação.
