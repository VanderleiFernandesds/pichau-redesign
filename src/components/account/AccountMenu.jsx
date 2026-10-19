import { useState } from 'react';
import { User } from 'lucide-react';
import AccountDialog from './AccountDialog';

const linkClass = 'font-bold underline underline-offset-2 transition-colors hover:text-brand';

/*
  Sem painel intermediário: cada link abre o modal direto na tela certa. Abaixo do desktop sobra só
  o ícone, que abre o login; dali o próprio modal leva ao cadastro. O <dialog> nativo devolve o foco
  ao botão que o abriu.
*/
export default function AccountMenu({ onOpen }) {
  const [authView, setAuthView] = useState(null);

  function openAuth(view) {
    onOpen?.();
    setAuthView(view);
  }

  return (
    <>
      <button
        type="button"
        aria-label="Entrar ou cadastrar-se"
        onClick={() => openAuth('login')}
        className="relative isolate flex h-(--header-control) min-w-(--header-control) items-center justify-center text-heading transition-colors hover:text-brand lg:hidden"
      >
        {/* No celular o ícone ganha a mesma moldura do botão de tema. */}
        <span aria-hidden="true" className="chamfer chamfer-field absolute inset-0 -z-1 sm:hidden" />
        <User aria-hidden="true" className="size-5 shrink-0" />
      </button>

      <div className="hidden h-12 items-center gap-2 px-2 text-[13px] leading-tight whitespace-nowrap text-heading lg:flex">
        <User aria-hidden="true" className="size-5 shrink-0" />
        <p>
          <button type="button" onClick={() => openAuth('login')} className={linkClass}>
            Entre
          </button>{' '}
          ou
          <button type="button" onClick={() => openAuth('signup')} className={`block ${linkClass}`}>
            Cadastre-se
          </button>
        </p>
      </div>

      <AccountDialog view={authView} onViewChange={setAuthView} onClose={() => setAuthView(null)} />
    </>
  );
}
