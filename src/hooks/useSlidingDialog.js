import { useEffect } from 'react';

/*
  Abre um <dialog> com showModal() (foco preso, Esc e camada superior) e anima a saída de um painel
  lateral. close() tiraria o <dialog> da tela na hora, então a saída marca data-closing, o CSS
  desliza o painel para fora e o <dialog> só fecha no fim da transição de translate.
  `onOpened` roda logo depois de abrir (por exemplo, para focar o painel).
*/
export function useSlidingDialog(isOpen, dialogRef, panelRef, onOpened) {
  useEffect(() => {
    const dialog = dialogRef.current;
    const panel = panelRef.current;
    if (isOpen && !dialog.open) {
      dialog.showModal();
      onOpened?.();
    }
    if (isOpen || !dialog.open) return;

    // Sem transição (movimento reduzido) fecha direto. O timeout cobre a transição que não termina.
    if (!parseFloat(getComputedStyle(panel).transitionDuration)) {
      dialog.close();
      return;
    }

    function finishClosing() {
      if (dialog.open) dialog.close();
    }

    // transitionend borbulha das transições dos filhos (hover dos links); só vale a do painel.
    function handleTransitionEnd(event) {
      if (event.target === panel && event.propertyName === 'translate') finishClosing();
    }

    dialog.dataset.closing = '';
    panel.addEventListener('transitionend', handleTransitionEnd);
    const fallback = setTimeout(finishClosing, 400);

    // Reaberto no meio da saída: cancela o fechamento e o painel volta a entrar.
    return () => {
      delete dialog.dataset.closing;
      panel.removeEventListener('transitionend', handleTransitionEnd);
      clearTimeout(fallback);
    };
    // onOpened fica fora das dependências: só é lido na abertura e mudaria a cada render.
  }, [isOpen, dialogRef, panelRef]);
}
