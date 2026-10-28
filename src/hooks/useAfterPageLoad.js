import { useEffect, useState } from 'react';

/*
  Fica true depois do evento load da página e de um momento ocioso do navegador. Serve para adiar
  downloads que não aparecem na primeira tela (como as artes dos outros slides do hero), para não
  dividirem a banda com o LCP, as fontes e o JavaScript.
*/
export function useAfterPageLoad() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let idleId;
    let timeoutId;
    const markReady = () => setIsReady(true);
    const scheduleReady = () => {
      if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(markReady, { timeout: 2000 });
      else timeoutId = window.setTimeout(markReady, 200);
    };

    if (document.readyState === 'complete') scheduleReady();
    else window.addEventListener('load', scheduleReady, { once: true });

    return () => {
      window.removeEventListener('load', scheduleReady);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return isReady;
}
