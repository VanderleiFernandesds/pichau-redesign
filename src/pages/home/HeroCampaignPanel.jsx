import HeroCarouselFrame from '../../components/ui/HeroCarouselFrame';
import { hideBrokenImage } from '../../utils/image';

// Valores de cada estado viram variáveis CSS; o CSS escolhe o conjunto conforme o painel expande.
// Sem `collapsed`, o objeto usa a posição do expandido e o CSS o esconde no card fechado; sem
// `expanded`, o inverso.
// `scene` vem em px do fundo e vai sem unidade: o CSS multiplica pela escala do fundo em cada
// layout. A posição é a distância até a borda direita (e, no mobile, até a base) da arte.
function sceneVars(prefix, point, background) {
  return (
    point && {
      [`--${prefix}-right`]: background.width - point.x,
      [`--${prefix}-bottom`]: point.bottom,
      [`--${prefix}-lift`]: background.height - point.bottom,
      [`--${prefix}-width`]: point.width,
    }
  );
}

function objectStyle({ size, collapsed, expanded, scene, sceneMobile, sceneNarrow }, background) {
  const collapsedState = collapsed ?? expanded;
  const expandedState = expanded ?? collapsed;
  const sceneStyle = sceneVars('scene', scene, background);
  const sceneMobileStyle = sceneVars('mobile-scene', sceneMobile, background);
  const sceneNarrowStyle = sceneVars('narrow-scene', sceneNarrow, background);
  return {
    ...sceneStyle,
    ...sceneMobileStyle,
    ...sceneNarrowStyle,
    '--size': size,
    '--collapsed-x': collapsedState.x,
    '--collapsed-y': collapsedState.base ?? collapsedState.y,
    '--collapsed-scale': collapsedState.scale,
    '--collapsed-layer': collapsedState.layer,
    '--expanded-x': expandedState.x,
    '--expanded-y': expandedState.y,
    '--expanded-scale': expandedState.scale,
    '--expanded-layer': expandedState.layer,
  };
}

/*
  O card mostra só fundo e objetos; os textos da campanha ficam na coluna à esquerda do hero.
  O único texto aqui é o título curto do card fechado. O botão de seleção cobre o card inteiro.
*/
export default function HeroCampaignPanel({ campaign, position, stateClasses, isShown, onSelect }) {
  const { name, background, objects, shortTitle } = campaign;
  const hasMobileScene = objects.some((object) => object.sceneMobile);

  return (
    <div
      className={['hero-panel', hasMobileScene && 'has-mobile-scene', ...stateClasses].filter(Boolean).join(' ')}
      style={{ '--position': position, '--bg-width': background.width, '--bg-height': background.height }}
    >
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
            className={[
              'campaign-object',
              !object.collapsed && 'is-expanded-only',
              !object.expanded && 'is-collapsed-only',
              object.collapsed?.base && 'has-collapsed-base',
              object.scene && 'is-on-scene',
              object.sceneMobile && 'is-on-mobile-scene',
              object.sceneNarrow && 'is-on-narrow-scene',
            ]
              .filter(Boolean)
              .join(' ')}
            style={objectStyle(object, background)}
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
