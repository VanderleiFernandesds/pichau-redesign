import { useSyncExternalStore } from 'react';

/*
  Rotas da loja conceito com a History API, sem biblioteca: só há a Home e a página de cada
  produto. Os caminhos são relativos ao `base` do Vite (/pichau-redesign/ no GitHub Pages), então
  o mesmo código funciona no dev, no preview e publicado. O acesso direto a /produto/... no Pages
  depende do 404.html gerado no build (vite.config.js).
*/
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
const PRODUCT_PREFIX = '/produto/';
const NAVIGATE_EVENT = 'app:navigate';

export function homePath() {
  return `${BASE}/`;
}

export function productPath(slug) {
  return `${BASE}${PRODUCT_PREFIX}${slug}`;
}

function parseRoute(pathname) {
  const path = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  if (path.startsWith(PRODUCT_PREFIX)) {
    return { name: 'product', slug: decodeURIComponent(path.slice(PRODUCT_PREFIX.length).replace(/\/$/, '')) };
  }
  return { name: 'home' };
}

export function isHomeLocation() {
  return parseRoute(window.location.pathname).name === 'home';
}

/*
  Antes de sair, a posição de rolagem fica no estado da entrada atual do histórico; ao voltar, quem
  renderiza a página a restaura (scrollY), já com o conteúdo montado. Por isso a restauração
  automática do navegador fica desligada.
*/
if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

export function navigate(path, { hash = '' } = {}) {
  const url = `${path}${hash}`;
  if (url === `${window.location.pathname}${window.location.hash}`) return;
  window.history.replaceState({ ...window.history.state, scrollY: window.scrollY }, '');
  window.history.pushState({ scrollY: 0, isPush: true }, '', url);
  window.dispatchEvent(new Event(NAVIGATE_EVENT));
}

function subscribe(onChange) {
  window.addEventListener('popstate', onChange);
  window.addEventListener(NAVIGATE_EVENT, onChange);
  return () => {
    window.removeEventListener('popstate', onChange);
    window.removeEventListener(NAVIGATE_EVENT, onChange);
  };
}

// O pathname é uma string: o snapshot só muda quando a rota muda de fato.
export function useRoute() {
  const pathname = useSyncExternalStore(subscribe, () => window.location.pathname);
  return parseRoute(pathname);
}
