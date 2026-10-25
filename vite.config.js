import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/*
  O GitHub Pages não tem fallback de SPA: acessar ou atualizar /pichau-redesign/produto/... direto
  cairia na página 404 dele. Uma cópia do index.html como 404.html faz o Pages servir o app nessas
  rotas, e o roteador (hooks/useRoute.js) abre a página certa.
*/
function spaFallback() {
  let outDir;
  return {
    name: 'spa-fallback-404',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      copyFileSync(resolve(outDir, 'index.html'), resolve(outDir, '404.html'));
    },
  };
}

export default defineConfig({
  // O GitHub Pages serve o projeto em /pichau-redesign/, e não na raiz do domínio.
  base: '/pichau-redesign/',
  plugins: [react(), tailwindcss(), spaFallback()],
});
