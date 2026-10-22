import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

/*
  <dialog> nativo com showModal(): o navegador cuida do foco preso, do Escape e de devolver o foco
  ao elemento que abriu o modal. Sem `title`, o modal não desenha o cabeçalho: quem usa dá o próprio
  título (labelledBy) e o botão de fechar. className troca largura e altura máxima; panelClassName,
  o espaçamento interno do painel.
*/
export default function Modal({
  isOpen,
  onClose,
  title,
  closeLabel,
  labelledBy,
  className = 'max-h-[85vh] w-[min(520px,calc(100%-30px))]',
  panelClassName = 'px-5 py-6 sm:px-7 sm:py-7',
  children,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  function handleBackdropClick(event) {
    if (event.target !== dialogRef.current) return;

    const bounds = dialogRef.current.getBoundingClientRect();
    const isOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (isOutside) onClose();
  }

  return (
    // O <dialog> fica transparente e a moldura chanfrada vai no painel de dentro: o .chamfer usa
    // position: relative, que tiraria o dialog do centro da camada superior.
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : labelledBy}
      onClose={onClose}
      onClick={handleBackdropClick}
      className={`modal m-auto bg-transparent text-text backdrop:bg-[#080911a6] backdrop:backdrop-blur-[4px] ${className}`}
    >
      <div className={`chamfer modal-panel ${panelClassName}`}>
        <span aria-hidden="true" className="corner-accents" />

        {title && (
          <div className="flex items-center justify-between gap-3">
            <h2 id={titleId} className="font-display text-[24px] leading-tight font-bold text-heading sm:text-[27px]">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              className="-mr-2 grid size-11 shrink-0 place-items-center text-muted transition-colors hover:text-brand"
            >
              <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </button>
          </div>
        )}
        {children}
      </div>
    </dialog>
  );
}
