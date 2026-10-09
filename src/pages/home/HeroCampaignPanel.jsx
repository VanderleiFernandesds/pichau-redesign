import HeroCarouselFrame from '../../components/ui/HeroCarouselFrame';
import { hideBrokenImage } from '../../utils/image';

// Valores de cada estado viram variáveis CSS; o CSS escolhe o conjunto conforme o painel expande.
// Sem `collapsed`, o objeto usa a posição do expandido e o CSS o esconde no card fechado.
function objectStyle({ size, collapsed, expanded }) {
  const collapsedState = collapsed ?? expanded;
  return {
    '--size': size,
    '--collapsed-x': collapsedState.x,
    '--collapsed-y': collapsedState.y,
    '--collapsed-scale': collapsedState.scale,
    '--collapsed-layer': collapsedState.layer,
    '--expanded-x': expanded.x,
    '--expanded-y': expanded.y,
    '--expanded-scale': expanded.scale,
    '--expanded-layer': expanded.layer,
  };
}

/*
  O card mostra só fundo e objetos; os textos da campanha ficam na coluna à esquerda do hero.
  O único texto aqui é o título curto do card fechado. O botão de seleção cobre o card inteiro.
*/
export default function HeroCampaignPanel({ campaign, position, stateClasses, isShown, onSelect }) {
  const { name, background, objects, shortTitle } = campaign;

  return (
    <div className={['hero-panel', ...stateClasses].filter(Boolean).join(' ')} style={{ '--position': position }}>
      <HeroCarouselFrame>
        <img
          src={background.src}
          alt=""
          className="hero-panel-image"
          style={{
            '--position-collapsed': background.position.collapsed,
            '--position-expanded': background.position.expanded,
          }}
          decoding="async"
          onError={hideBrokenImage}
        />
        {objects.map((object) => (
          <span
            key={object.id}
            className={`campaign-object ${object.collapsed ? '' : 'is-expanded-only'}`}
            style={objectStyle(object)}
          >
            <img
              src={object.src}
              alt=""
              width={object.width}
              height={object.height}
              decoding="async"
              onError={hideBrokenImage}
            />
          </span>
        ))}
      </HeroCarouselFrame>

      <button
        type="button"
        onClick={onSelect}
        aria-label={`Mostrar destaque: ${name}`}
        aria-current={isShown ? 'true' : undefined}
        className="hero-panel-select"
      />

      <p aria-hidden="true" className="campaign-short-title">
        {shortTitle}
      </p>
    </div>
  );
}
