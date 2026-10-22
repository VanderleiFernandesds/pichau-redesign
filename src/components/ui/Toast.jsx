import { useEffect, useState } from 'react';
import { ArrowRight, CircleAlert, CircleCheck, Info, X } from 'lucide-react';

const VARIANT_ICONS = {
  info: { Icon: Info, className: 'text-soft' },
  success: { Icon: CircleCheck, className: 'text-success' },
  warning: { Icon: CircleAlert, className: 'text-danger' },
};

/*
  O anúncio fica num role="status" separado e sempre visível para o leitor de tela: o aviso some
  com visibility: hidden, que também silenciaria uma região viva dentro dele. O texto só entra na
  região enquanto o aviso aparece, então a mesma mensagem é anunciada de novo numa próxima vez.
  O foco nunca é movido para cá.
*/
export default function Toast({ message, variant, action, isVisible, onDismiss, onPause, onResume }) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const { Icon, className: iconClassName } = VARIANT_ICONS[variant] ?? VARIANT_ICONS.info;

  // Ao sumir sob o ponteiro o mouseleave pode não disparar; sem isso, o próximo aviso nasceria pausado.
  useEffect(() => {
    if (isVisible) return;
    setIsHovered(false);
    setHasFocus(false);
  }, [isVisible]);

  useEffect(() => {
    if (isHovered || hasFocus) onPause();
    else onResume();
    // onPause e onResume só leem refs do useToast; o efeito depende apenas do hover e do foco.
  }, [isHovered, hasFocus]);

  function runAction() {
    action.onClick();
    onDismiss();
  }

  return (
    <>
      <p role="status" className="sr-only">
        {isVisible ? message : ''}
      </p>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setHasFocus(true)}
        onBlur={(event) => setHasFocus(event.currentTarget.contains(event.relatedTarget))}
        className={`chamfer toast ${isVisible ? 'is-visible' : ''}`}
      >
        <span aria-hidden="true" className="corner-accents" />
        <Icon aria-hidden="true" className={`size-5 shrink-0 ${iconClassName}`} />
        <p aria-hidden="true" className="py-2.5 text-[14px] leading-snug font-semibold text-heading">
          {message}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Fechar aviso"
          className="grid size-11 shrink-0 place-items-center text-muted transition-colors hover:text-brand"
        >
          <X aria-hidden="true" className="size-5" />
        </button>
        {action && (
          <button
            type="button"
            onClick={runAction}
            className="col-start-2 -mt-2 inline-flex min-h-11 items-center gap-1.5 justify-self-start text-[13px] font-bold text-heading underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            {action.label}
            <ArrowRight aria-hidden="true" className="size-4 text-brand" />
          </button>
        )}
      </div>
    </>
  );
}
