import HeroCarouselFrame from '../../components/ui/HeroCarouselFrame';

/*
  Os painéis ficam sempre na mesma ordem no DOM (key = id do slide) e a posição na fila vem de
  --position; reordenar os nós interromperia as transições. No desktop a posição vira deslocamento
  horizontal; no mobile os painéis dividem a mesma célula e só o do slide exibido aparece.
*/
export default function HeroPanels({ slides, order, shownId, isExpanded, hiddenIds, onSelect }) {
  return (
    <div className="hero-panels" style={{ '--slide-count': slides.length }}>
      {slides.map((slide) => {
        const position = order.indexOf(slide.id);
        const isShown = slide.id === shownId;
        const stateClasses = [
          isShown && 'is-shown',
          position === 0 && isExpanded && 'is-expanded',
          hiddenIds.includes(slide.id) && 'is-moving',
        ];

        return (
          <button
            key={slide.id}
            type="button"
            onClick={() => onSelect(slide.id)}
            aria-label={`Mostrar destaque: ${slide.label}`}
            aria-current={isShown ? 'true' : undefined}
            className={['hero-panel', ...stateClasses].filter(Boolean).join(' ')}
            style={{ '--position': position }}
          >
            <HeroCarouselFrame>
              <img
                src={slide.image}
                alt=""
                className="hero-panel-image"
                style={{ objectPosition: slide.imagePosition }}
                decoding="async"
              />
              <span aria-hidden="true" className="hero-panel-blend" />
            </HeroCarouselFrame>
          </button>
        );
      })}
    </div>
  );
}
