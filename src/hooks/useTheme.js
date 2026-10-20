import { useState } from 'react';

export const THEME_STORAGE_KEY = 'pichau-theme';

// O script inline do index.html já aplicou o tema salvo antes da primeira pintura; aqui só lemos.
function getCurrentTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

export function useTheme() {
  const [theme, setTheme] = useState(getCurrentTheme);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    // Sem transições durante a troca: as do hero (com atraso, feitas para a expansão dos cards)
    // deixavam o fundo no tema antigo enquanto logos e degradês já tinham trocado.
    root.classList.add('is-switching-theme');
    root.dataset.theme = nextTheme;
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.remove('is-switching-theme')));
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Sem armazenamento (navegação privada bloqueada), o tema vale só até recarregar.
    }
  }

  return { theme, toggleTheme };
}
