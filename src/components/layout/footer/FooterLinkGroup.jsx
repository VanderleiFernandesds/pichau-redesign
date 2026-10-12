import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useMediaQuery } from '../../../hooks/useMediaQuery';

export const footerHeadingClass =
  'flex items-center gap-3 font-display text-[18px] font-bold tracking-[0.5px] text-heading uppercase';

/*
  Grupo de links do footer. No desktop é uma coluna sempre aberta; abaixo de 1001px vira um grupo
  expansível, para o footer não ficar comprido demais no celular. No desktop o título não é botão,
  para leitores de tela não anunciarem um "expandir" que não faz nada.
*/
export default function FooterLinkGroup({ title, children }) {
  const isDesktop = useMediaQuery('(width >= 1001px)');
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  const titleContent = (
    <>
      <span aria-hidden="true" className="slash-accent" />
      {title}
    </>
  );

  if (isDesktop) {
    return (
      <nav aria-label={title}>
        <h2 className={`${footerHeadingClass} mb-4`}>{titleContent}</h2>
        {children}
      </nav>
    );
  }

  return (
    <nav aria-label={title} className="border-b border-line">
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((current) => !current)}
          className={`${footerHeadingClass} min-h-12 w-full justify-between text-left`}
        >
          <span className="flex items-center gap-3">{titleContent}</span>
          <ChevronDown aria-hidden="true" className={`size-5 text-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </h2>
      <div id={panelId} hidden={!isOpen} className="pb-3">
        {children}
      </div>
    </nav>
  );
}
