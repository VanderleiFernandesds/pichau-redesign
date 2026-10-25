import { useId, useRef, useState } from 'react';
import StarRating from '../../components/ui/StarRating';

/*
  Abas no padrão ARIA (tablist): Tab entra na aba ativa e vai para o painel; setas, Home e End
  trocam de aba. Os textos vêm só dos dados do produto: o que o catálogo não tem (descrição do
  fabricante, ficha técnica completa, comentários) aparece como indisponível, sem inventar.
*/
export default function ProductTabs({ product, highlights, HighlightIcon }) {
  const baseId = useId();
  const tabRefs = useRef([]);
  const reviewCount = product.rating?.count ?? 0;
  const tabs = [
    { id: 'description', label: 'Descrição' },
    { id: 'specs', label: 'Especificações' },
    { id: 'reviews', label: reviewCount ? `Avaliações (${reviewCount})` : 'Avaliações' },
  ];
  const [activeId, setActiveId] = useState(tabs[0].id);

  function handleKeyDown(event) {
    const index = tabs.findIndex((tab) => tab.id === activeId);
    const nextIndex = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    setActiveId(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <div className="mt-10">
      {/* No celular as três abas dividem a largura e o texto pode quebrar, em vez de sair da tela. */}
      <div role="tablist" aria-label="Detalhes do produto" onKeyDown={handleKeyDown} className="flex border-b border-line">
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              ref={(element) => (tabRefs.current[index] = element)}
              type="button"
              role="tab"
              id={`${baseId}-${tab.id}-tab`}
              aria-selected={isActive}
              aria-controls={`${baseId}-${tab.id}-panel`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(tab.id)}
              className={`product-tab relative min-h-12 min-w-0 flex-1 px-2 py-1 font-display text-[16px] leading-tight transition-colors focus-visible:-outline-offset-4 sm:flex-none sm:px-6 sm:text-[20px] sm:whitespace-nowrap ${
                isActive ? 'font-bold text-heading' : 'font-semibold text-soft hover:text-heading'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-${tab.id}-panel`}
          aria-labelledby={`${baseId}-${tab.id}-tab`}
          hidden={tab.id !== activeId}
          tabIndex={0}
          className="px-(--box-padding) py-6 focus-visible:outline-offset-2"
        >
          {tab.id === 'description' && <Description product={product} highlights={highlights} HighlightIcon={HighlightIcon} />}
          {tab.id === 'specs' && <Specs product={product} highlights={highlights} />}
          {tab.id === 'reviews' && <Reviews rating={product.rating} />}
        </div>
      ))}
    </div>
  );
}

function Description({ product, highlights, HighlightIcon }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-center">
      <div className="max-w-[60ch] text-[16px] leading-relaxed text-text">
        <p>
          {product.name}, da categoria {product.category}. Destaques informados: {highlights.join(', ')}.
        </p>
        <p className="mt-2 text-[14px] text-muted">A descrição completa do fabricante não está disponível neste projeto.</p>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-3">
        {highlights.map((highlight) => (
          <li key={highlight} className="flex min-w-0 items-center gap-3 lg:border-l lg:border-line lg:pl-4">
            <HighlightIcon aria-hidden="true" className="size-8 shrink-0 text-brand" strokeWidth={1.5} />
            <span className="min-w-0 text-[15px] leading-snug font-semibold wrap-break-word text-heading">{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Specs({ product, highlights }) {
  return (
    <div className="max-w-180">
      <dl className="grid grid-cols-[minmax(110px,auto)_1fr] text-[15px]">
        <dt className="border-b border-line py-3 pr-4 font-semibold text-heading">Categoria</dt>
        <dd className="border-b border-line py-3 text-text">{product.category}</dd>
        <dt className="border-b border-line py-3 pr-4 font-semibold text-heading">Destaques</dt>
        <dd className="border-b border-line py-3 text-text">
          <ul className="grid gap-1">
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </dd>
      </dl>
      <p className="mt-3 text-[14px] text-muted">A ficha técnica completa não está disponível neste projeto.</p>
    </div>
  );
}

function Reviews({ rating }) {
  if (!rating) {
    return <p className="text-[16px] text-text">Este produto ainda não tem avaliações.</p>;
  }
  return (
    <div>
      <StarRating rating={rating} className="product-rating" />
      <p className="mt-3 text-[14px] text-muted">Os comentários das avaliações não estão disponíveis neste projeto.</p>
    </div>
  );
}
