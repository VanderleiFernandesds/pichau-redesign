import HeroCampaignPanel from './HeroCampaignPanel';

/*
  Os painéis ficam sempre na mesma ordem no DOM (key = id do slide) e a posição na fila vem de
  --position; reordenar os nós interromperia as transições. No desktop a posição vira deslocamento
  horizontal; no mobile os painéis dividem a mesma célula e só o do slide exibido aparece.
*/
export default function HeroPanels({ slides, order, shownId, isExpanded, isJumping, hiddenIds, onSelect }) {
  return (
    <div className={`hero-panels ${isJumping ? 'is-jumping' : ''}`} style={{ '--slide-count': slides.length }}>
      {/*
        Fundo ampliado (só desktop): cobre o texto à esquerda e o card expandido. Mostra a campanha
        exibida enquanto o card dela está aberto; o card fica transparente e mantém só os objetos.
      */}
      <div aria-hidden="true" className="hero-stage">
        {slides.map(({ id, background }) => (
          <img
            key={id}
            src={background.src}
            alt=""
            className={`hero-stage-image ${id === shownId && isExpanded ? 'is-visible' : ''}`}
            style={{ objectPosition: background.position.stage }}
            decoding="async"
          />
        ))}
      </div>

      {slides.map((slide) => {
        const position = order.indexOf(slide.id);
        const isShown = slide.id === shownId;

        return (
          <HeroCampaignPanel
            key={slide.id}
            campaign={slide}
            position={position}
            stateClasses={[
              isShown && 'is-shown',
              position === 0 && isExpanded && 'is-expanded',
              hiddenIds.includes(slide.id) && 'is-moving',
            ]}
            isShown={isShown}
            onSelect={() => onSelect(slide.id)}
          />
        );
      })}
    </div>
  );
}
