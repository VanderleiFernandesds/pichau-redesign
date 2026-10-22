import { useEffect, useState } from 'react';
import { CircleCheck, X } from 'lucide-react';

const AUTO_CLOSE_TIME = 2000;

// Distância entre a base do header e o aviso.
const HEADER_GAP = 8;

/*
  Aviso discreto de produto adicionado, logo abaixo do header, sem fundo escurecido e sem tirar o
  foco de onde está: a pessoa continua comprando. O topo é medido do header, porque no celular ele
  encolhe ao rolar a página, e acompanha mudanças de altura dele enquanto o aviso está visível.
  showKey muda a cada adição e reinicia o tempo do mesmo aviso, sem empilhar. O tempo pausa com o
  mouse em cima ou com foco no botão de fechar. O anúncio
  fica num role="status" à parte, porque o aviso some com visibility: hidden, que também
  silenciaria uma região viva dentro dele.
*/
export default function AddedToCartNotice({ isVisible, showKey, onClose }) {
  const [top, setTop] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const isPaused = isHovered || hasFocus;

  useEffect(() => {
    if (!isVisible) {
      setIsHovered(false);
      setHasFocus(false);
      return;
    }
    const header = document.querySelector('.header-bar');
    if (!header) return;

    function placeBelowHeader() {
      setTop(header.getBoundingClientRect().bottom + HEADER_GAP);
    }

    // Se a busca do header aparecer ou recolher enquanto o aviso está na tela, ele acompanha.
    placeBelowHeader();
    const resizeObserver = new ResizeObserver(placeBelowHeader);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, [isVisible, showKey]);

  useEffect(() => {
    if (!isVisible || isPaused) return undefined;
    const timer = setTimeout(onClose, AUTO_CLOSE_TIME);
    return () => clearTimeout(timer);
    // onClose é recriado a cada render do HomePage; o tempo só reinicia numa nova adição.
  }, [isVisible, isPaused, showKey]);

  return (
    <>
      <p role="status" className="sr-only">
        {isVisible ? 'Adicionado ao carrinho. Seu produto já está no carrinho.' : ''}
      </p>
      <div
        style={{ top }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={() => setHasFocus(false)}
        className={`chamfer cart-notice ${isVisible ? 'is-visible' : ''}`}
      >
        <CircleCheck aria-hidden="true" className="size-5 shrink-0 text-success" />
        <p aria-hidden="true" className="min-w-0 flex-1 py-2 text-[13px] leading-snug text-soft">
          <strong className="block text-[14px] font-semibold text-heading">Adicionado ao carrinho!</strong>
          Seu produto já está no carrinho.
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar aviso"
          className="grid size-11 shrink-0 place-items-center text-muted transition-colors hover:text-brand"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
      </div>
    </>
  );
}
