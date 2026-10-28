import { User } from 'lucide-react';

const linkClass = 'font-bold transition-colors hover:text-brand';

/*
  Sem painel intermediário: cada link abre o modal direto na tela certa (onOpenAuth recebe 'login'
  ou 'signup'). No tablet sobra só o ícone, que abre o login; dali o próprio modal leva ao cadastro.
  No celular a conta fica na barra inferior (MobileNavBar).
*/
export default function AccountMenu({ onOpenAuth }) {
  return (
    <>
      <button
        type="button"
        aria-label="Entrar ou cadastrar-se"
        onClick={() => onOpenAuth('login')}
        className="flex h-(--header-control) min-w-(--header-control) items-center justify-center text-heading transition-colors hover:text-brand max-sm:hidden lg:hidden"
      >
        <User aria-hidden="true" className="size-5 shrink-0" />
      </button>

      <div className="hidden h-12 items-center gap-2 px-2 text-[13px] leading-tight whitespace-nowrap text-heading lg:flex">
        <User aria-hidden="true" className="size-5 shrink-0" />
        <p>
          {/* Cada link com 24px de altura, o alvo mínimo do WCAG 2.2; os dois juntos ocupam os 48px da caixa. */}
          <button type="button" onClick={() => onOpenAuth('login')} className={`inline-flex h-6 items-center ${linkClass}`}>
            Entre
          </button>{' '}
          ou
          <button type="button" onClick={() => onOpenAuth('signup')} className={`flex h-6 items-center ${linkClass}`}>
            Cadastre-se
          </button>
        </p>
      </div>
    </>
  );
}
