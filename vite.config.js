import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // O GitHub Pages serve o projeto em /pichau-redesign/, e não na raiz do domínio.
  base: '/pichau-redesign/',
  plugins: [react(), tailwindcss()],
});
