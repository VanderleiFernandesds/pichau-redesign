import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';

// <dialog> nativo com showModal(): o navegador cuida do foco preso, do Escape
// e de devolver o foco ao elemento que abriu o modal.
export default function Modal({ isOpen, onClose, title, closeLabel, children }) {
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
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="m-auto max-h-[85vh] w-[min(520px,calc(100%-30px))] rounded-xl border-0 p-7 text-ink backdrop:bg-[#080911a6] backdrop:backdrop-blur-[4px]"
    >
      <div className="flex items-center justify-between">
        <h2 id={titleId} className="font-display text-[27px] leading-tight font-bold">
          {title}
        </h2>
        <button type="button" onClick={onClose} aria-label={closeLabel} className="grid size-8 place-items-center rounded-sm">
          <X aria-hidden="true" className="size-6" />
        </button>
      </div>
      {children}
    </dialog>
  );
}
