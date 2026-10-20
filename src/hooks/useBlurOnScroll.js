import { useEffect } from 'react';

const MOBILE_MEDIA = '(width < 601px)';

/*
  No celular, tira o foco do elemento quando a página rola mais que `distance` px desde que ele
  ganhou foco. A distância tolera a rolagem que o próprio navegador faz ao abrir o teclado.
*/
export function useBlurOnScroll(ref, distance) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let focusY = window.scrollY;

    function handleFocus() {
      focusY = window.scrollY;
    }

    function handleScroll() {
      if (document.activeElement !== element || !window.matchMedia(MOBILE_MEDIA).matches) return;
      if (Math.abs(window.scrollY - focusY) > distance) element.blur();
    }

    element.addEventListener('focus', handleFocus);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      element.removeEventListener('focus', handleFocus);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ref, distance]);
}
