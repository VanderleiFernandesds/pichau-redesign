import { useEffect, useId, useRef, useState } from 'react';
import { User } from 'lucide-react';
import AccountDialog from './AccountDialog';

const panelButtonClass =
  'chamfer flex h-11 w-full items-center justify-center text-[13px] font-bold tracking-[0.5px] uppercase';

/*
  Botão com painel (disclosure), e não menu: abre por clique, Enter ou Espaço e fecha com clique
  fora, Esc, foco saindo do conjunto ou novo clique no acionador. No celular o wrapper deixa de ser
  posicionado, e o painel se ancora no painel do header, com a largura dele.
*/
export default function AccountMenu({ onOpen }) {
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const panelId = useId();
  const titleId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [authView, setAuthView] = useState(null);

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event) {
      if (!wrapperRef.current.contains(event.target)) setIsOpen(false);
    }

    function handleKeyDown(event) {
      if (event.key !== 'Escape') return;
      setIsOpen(false);
      triggerRef.current.focus();
    }

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function toggle() {
    if (!isOpen) onOpen?.();
    setIsOpen(!isOpen);
  }

  // relatedTarget nulo (clique em área sem foco) fica com o handler de pointerdown.
  function handleBlur(event) {
    if (event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
  }

  function openAuth(view) {
    setIsOpen(false);
    setAuthView(view);
  }

  // O botão que abriu o modal estava no painel, já fechado; o foco volta para o acionador.
  function closeAuth() {
    setAuthView(null);
    triggerRef.current.focus();
  }

  return (
    <>
      <div ref={wrapperRef} onBlur={handleBlur} className="relative max-sm:static">
        <button
          ref={triggerRef}
          type="button"
          aria-label="Acessar conta"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={toggle}
          className="account-trigger relative isolate flex h-(--header-control) min-w-(--header-control) items-center justify-center gap-2 text-heading transition-colors hover:text-brand lg:h-12 lg:px-2 lg:whitespace-nowrap"
        >
          {/* No celular o ícone ganha a mesma moldura do botão de tema. */}
          <span aria-hidden="true" className="chamfer chamfer-field absolute inset-0 -z-1 sm:hidden" />
          <User aria-hidden="true" className="size-5 shrink-0" />
          <span className="hidden text-left text-[13px] leading-tight lg:block">
            Olá! Entre ou
            <b className="block">cadastre-se</b>
          </span>
        </button>

        <div
          id={panelId}
          role="group"
          aria-labelledby={titleId}
          hidden={!isOpen}
          className="account-panel chamfer absolute z-10 p-5 max-sm:inset-x-0 max-sm:top-[calc(100%+8px)] sm:top-[calc(100%+8px)] sm:right-0 sm:w-84 lg:top-[calc(100%+12px)] lg:right-auto lg:left-1/2 lg:-translate-x-1/2"
        >
          <span aria-hidden="true" className="corner-accents" />
          <span aria-hidden="true" className="corner-accents corner-accents-mirrored" />
          <p id={titleId} className="font-display text-[20px] leading-tight font-bold text-heading">
            Acesse sua conta
          </p>
          <p className="mt-1.5 text-[14px] text-muted">Entre ou crie sua conta.</p>
          <div className="mt-5 grid gap-3">
            <button type="button" onClick={() => openAuth('login')} className={`${panelButtonClass} chamfer-accent text-white`}>
              Entrar
            </button>
            <button type="button" onClick={() => openAuth('signup')} className={`${panelButtonClass} chip-button`}>
              Criar conta
            </button>
          </div>
        </div>
      </div>

      <AccountDialog view={authView} onViewChange={setAuthView} onClose={closeAuth} />
    </>
  );
}
