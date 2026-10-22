import { useId, useRef, useState } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import Modal from '../ui/Modal';
import BrandIcon from '../ui/BrandIcon';
import AuthShowcase from './AuthShowcase';
import AuthForm from './AuthForm';

const VIEWS = {
  login: {
    title: 'Bem-vindo de volta',
    description: 'Entre para continuar.',
    showcaseTitle: 'Seu próximo nível espera por você.',
    switchPrompt: 'Ainda não tem conta?',
    switchLabel: 'Criar conta',
    switchTo: 'signup',
  },
  signup: {
    title: 'Crie sua conta',
    description: 'Preencha os campos para começar.',
    showcaseTitle: 'Seu próximo nível começa aqui.',
    switchPrompt: 'Já tem conta?',
    switchLabel: 'Entrar',
    switchTo: 'login',
  },
};

// Mesma duração do fade de saída em .auth-view.is-leaving.
const VIEW_LEAVE_TIME = 150;

const SOCIAL_PROVIDERS = [
  { id: 'google', label: 'Google' },
  { id: 'apple', label: 'Apple' },
];

/*
  Entrar e criar conta são só demonstrações: os campos são validados e limpos, mas nada é enviado
  nem salvo e nenhuma sessão é criada. Google, Apple e a recuperação de senha só avisam isso.
  O formulário é recriado (key) ao trocar de tela ou reabrir. No desktop o painel tem a mesma altura
  nas duas telas (.auth-panel), para o modal não mudar de tamanho na troca.
*/
export default function AccountDialog({ view, onViewChange, onClose }) {
  const formRef = useRef(null);
  const titleId = useId();
  const [notice, setNotice] = useState('');
  const [isLeaving, setIsLeaving] = useState(false);
  const switchTimerRef = useRef(null);
  const content = VIEWS[view ?? 'login'];

  function close() {
    // Fechar no meio da troca não pode deixar o timer reabrir o modal na outra tela.
    clearTimeout(switchTimerRef.current);
    setIsLeaving(false);
    setNotice('');
    onClose();
  }

  function showView(nextView) {
    setIsLeaving(false);
    onViewChange(nextView);
    // O foco vai para o primeiro campo da nova tela.
    requestAnimationFrame(() => formRef.current?.elements[0]?.focus());
  }

  // Troca em sequência, como o texto do hero: a tela atual some e só então a nova entra (.auth-view).
  function switchView() {
    if (isLeaving) return;
    setNotice('');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      showView(content.switchTo);
      return;
    }
    setIsLeaving(true);
    switchTimerRef.current = setTimeout(() => showView(content.switchTo), VIEW_LEAVE_TIME);
  }

  return (
    <Modal
      isOpen={view !== null}
      onClose={close}
      labelledBy={titleId}
      className="max-h-[calc(100dvh-16px)] w-[min(560px,calc(100%-16px))] lg:max-h-[calc(100dvh-40px)] lg:w-[min(1120px,calc(100%-48px))]"
      panelClassName="auth-panel grid grid-cols-1 lg:grid-cols-2"
    >
      <span aria-hidden="true" className="corner-accents corner-accents-mirrored" />
      <AuthShowcase title={content.showcaseTitle} isLeaving={isLeaving} />

      <div className="relative flex flex-col px-3 pt-4 pb-5 sm:px-8 sm:pt-6 sm:pb-7 lg:overflow-y-auto lg:overscroll-contain lg:px-[clamp(32px,5vw,64px)] lg:py-8">
        {/* "Voltar à loja" fazia o mesmo que o X; fica só o X, com o destino no nome acessível. */}
        <button
          type="button"
          onClick={close}
          aria-label="Fechar e voltar à loja"
          className="absolute top-2 right-0.5 grid size-11 place-items-center text-muted transition-colors hover:text-brand sm:top-3 sm:right-3"
        >
          <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
        </button>

        <div key={view ?? 'login'} className={`auth-view my-auto ${isLeaving ? 'is-leaving' : ''}`}>
          <h2 id={titleId} className="pr-12 font-display text-[clamp(28px,3vw,38px)] leading-tight font-bold text-heading">
            {content.title}
          </h2>
          <p className="mt-1 text-[15px] text-soft sm:text-[16px]">{content.description}</p>
          <p className="mt-3 flex items-start gap-1.5 text-[13px] leading-snug font-medium text-soft">
            <ShieldCheck aria-hidden="true" className="mt-px size-4 shrink-0 text-brand" />
            Acesso demonstrativo. Não use dados reais.
          </p>

          <div className="mt-6">
            {view && <AuthForm key={view} ref={formRef} view={view} onNotice={setNotice} />}
          </div>

          <div aria-live="polite" className="mt-4 empty:hidden">
            {notice && (
              <p className="chamfer simulation-notice flex items-start gap-2 px-3 py-2.5 text-[13px] leading-snug font-semibold text-heading">
                <ShieldCheck aria-hidden="true" className="mt-px size-4 shrink-0 text-brand" />
                {notice}
              </p>
            )}
          </div>

          <div className="my-5 flex items-center gap-3 text-[13px] text-muted">
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
            ou continue com
            <span aria-hidden="true" className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
            {SOCIAL_PROVIDERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setNotice(`Entrar com ${label} é demonstrativo: nenhuma conta ${label} será usada.`)}
                className="chamfer chip-button flex h-12 items-center justify-center gap-2.5 text-[14px] font-semibold text-heading"
              >
                <BrandIcon name={id} className="size-5 shrink-0" />
                <span className="sr-only">Continuar com </span>
                {label}
              </button>
            ))}
          </div>

          <p className="mt-4 text-center text-[14px] text-soft">
            {content.switchPrompt}{' '}
            <button
              type="button"
              onClick={switchView}
              className="min-h-11 px-1 font-semibold text-link underline underline-offset-4 hover:no-underline"
            >
              {content.switchLabel}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}
