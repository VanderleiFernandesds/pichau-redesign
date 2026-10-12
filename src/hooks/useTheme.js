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
    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch {
      // Sem armazenamento (navegação privada bloqueada), o tema vale só até recarregar.
    }
  }

  return { theme, toggleTheme };
}
