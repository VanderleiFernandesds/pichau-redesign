import HeroCampaignPanel from './HeroCampaignPanel';
import { hideBrokenImage } from '../../utils/image';

/*
  Os painéis seguem a ordem da fila no DOM, para o Tab percorrer os cards na ordem visual. Com
  key = id do slide, o React só move os nós que vão para o final, e isso acontece quando eles
  estão invisíveis (shifting) ou com as transições desligadas (jumping), então nenhuma animação
  visível é cortada. A posição vem de --position: no desktop vira deslocamento horizontal; no
  mobile os painéis dividem a mesma célula e só o do slide exibido aparece.
*/
export default function HeroPanels({ slides, order, shownId, isExpanded, isJumping, hiddenIds, objectsHiddenIds, onSelect }) {
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
            onError={hideBrokenImage}
          />
        ))}
      </div>

      {order.map((slideId, position) => {
        const slide = slides.find(({ id }) => id === slideId);
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
              objectsHiddenIds.includes(slide.id) && 'is-hiding-objects',
            ]}
            isShown={isShown}
            onSelect={() => onSelect(slide.id)}
          />
        );
      })}
    </div>
  );
}
