import { useEffect, useRef, useState } from 'react';

/*
  Trilha de carrossel com a rolagem nativa do navegador (com scroll-snap), então o toque no celular
  e a rolagem pelo trackpad funcionam sem código. As setas andam um item por vez e sabem quando
  estão numa ponta.
*/
export function useCarouselTrack() {
  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });

  useEffect(() => {
    const track = trackRef.current;
    // Sem itens (busca sem resultado nas ofertas), a trilha nem é renderizada.
    if (!track) return undefined;

    function updateArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      // 1px de tolerância: o scrollLeft pode vir fracionado com zoom.
      setCanScroll({ previous: track.scrollLeft > 1, next: track.scrollLeft < maxScroll - 1 });
    }

    updateArrows();
    track.addEventListener('scroll', updateArrows, { passive: true });
    const resizeObserver = new ResizeObserver(updateArrows);
    resizeObserver.observe(track);
    return () => {
      track.removeEventListener('scroll', updateArrows);
      resizeObserver.disconnect();
    };
  }, []);

  function scrollByItem(direction) {
    const track = trackRef.current;
    const item = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: 'smooth' });
  }

  /*
    Com scroll-snap obrigatório, a rolagem que o navegador faz ao focar um item pelo teclado volta
    para o ponto de encaixe anterior e deixa o item cortado. Alinhar o item ao início da trilha cai
    num ponto de encaixe, então ele fica inteiro na tela.
  */
  function revealFocusedItem(event) {
    const item = event.target.closest('li');
    if (!item) return;

    const trackRect = trackRef.current.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();
    if (itemRect.left < trackRect.left || itemRect.right > trackRect.right) {
      item.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  }

  return { trackRef, canScroll, scrollByItem, revealFocusedItem };
}
