import HeroCampaignPanel from './HeroCampaignPanel';
import CampaignBackground from './CampaignBackground';
import CampaignArtLink from './CampaignArtLink';
import { useAfterPageLoad } from '../../hooks/useAfterPageLoad';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/*
  O fundo do primeiro slide é o LCP (o index.html faz preload dele): fica com prioridade alta, e as
  imagens dos outros slides com prioridade baixa. Abaixo de 1001px elas nem aparecem até o
  carrossel girar; no desktop os cards fechados aparecem, mas são pequenos e chegam logo depois.
*/
function fetchPriority(slides, id) {
  return id === slides[0].id ? 'high' : 'low';
}

/*
  As artes que não aparecem na primeira tela só são pedidas depois do load: os fundos ampliados
  dos outros slides (invisíveis até o carrossel girar) e, abaixo de 1001px, os cards dos outros
  slides. No desktop os cards fechados ficam à mostra, então baixam desde o início. Se o visitante
  trocar de slide antes do load, a troca libera as artes na hora.
*/
const MOBILE_MEDIA = '(width < 1001px)';

/*
  Os painéis seguem a ordem da fila no DOM, para o Tab percorrer os cards na ordem visual. Com
  key = id do slide, o React só move nós no jumping, quando as transições estão desligadas, então
  nenhuma animação é cortada.
*/
export default function HeroPanels({
  slides,
  order,
  shownId,
  isConcealing,
  isJumping,
  leavingIds,
  objectsHiddenIds,
  onSelect,
}) {
  const shownSlide = slides.find(({ id }) => id === shownId);
  const isPageLoaded = useAfterPageLoad();
  const isMobile = useMediaQuery(MOBILE_MEDIA);
  const canLoadAll = isPageLoaded || shownId !== slides[0].id;
  const isOffscreenArt = (id) => !canLoadAll && id !== slides[0].id;
  const panelsClassName = ['hero-panels', isConcealing && 'is-concealing', isJumping && 'is-jumping']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={panelsClassName} style={{ '--slide-count': slides.length }}>
      {/*
        Fundo ampliado (só desktop): cobre o texto à esquerda e o card expandido. Mostra a campanha
        exibida enquanto o card dela está aberto; o card fica transparente e mantém só os objetos.
      */}
      <div aria-hidden="true" className="hero-stage">
        {slides.map(({ id, background }) => (
          <CampaignBackground
            key={id}
            background={background}
            className={`hero-stage-image ${id === shownId ? 'is-visible' : ''}`}
            style={{ objectPosition: background.position.stage }}
            fetchPriority={fetchPriority(slides, id)}
            isDeferred={isOffscreenArt(id)}
          />
        ))}
        <CampaignArtLink cta={shownSlide.cta} className="hero-stage-link" />
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
              position === 0 && 'is-expanded',
              objectsHiddenIds.includes(slide.id) && 'is-hiding-objects',
              leavingIds.includes(slide.id) && 'is-leaving',
            ]}
            isShown={isShown}
            fetchPriority={fetchPriority(slides, slide.id)}
            isArtDeferred={isMobile && isOffscreenArt(slide.id)}
            onSelect={() => onSelect(slide.id)}
          />
        );
      })}
    </div>
  );
}
