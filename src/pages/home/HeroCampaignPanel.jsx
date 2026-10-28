import HeroCarouselFrame from '../../components/ui/HeroCarouselFrame';
import CampaignBackground from './CampaignBackground';
import CampaignArtLink from './CampaignArtLink';
import { hideBrokenImage } from '../../utils/image';

// Abaixo de 1001px, para artes com os produtos: proporção da arte (altura por largura), quantas
// vezes ela é mais alta que a faixa dos produtos (que precisa caber sob o texto), quanto dela desce
// abaixo do card e onde termina o degradê do topo, que só pode apagar o que está acima dos produtos.
function productAreaVars(prefix, art) {
  if (!art?.productArea) return null;
  const { top, bottom } = art.productArea;
  return {
    [`--${prefix}-ratio`]: art.height / art.width,
    [`--${prefix}-scale`]: art.height / (bottom - top),
    [`--${prefix}-drop`]: `${((art.height - bottom) / art.height) * 100}%`,
    [`--${prefix}-fade`]: `${(top / art.height) * 100}%`,
  };
}

// Valores de cada estado viram variáveis CSS; o CSS escolhe o conjunto conforme o painel expande.
// Sem `collapsed`, o objeto usa a posição do expandido e o CSS o esconde no card fechado; sem
// `expanded`, o inverso.
function objectStyle({ size, collapsed, expanded }) {
  const collapsedState = collapsed ?? expanded;
  const expandedState = expanded ?? collapsed;
  return {
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
  No card fechado o logo da campanha faz o papel de título. O botão de seleção cobre o card inteiro.
*/
export default function HeroCampaignPanel({
  campaign,
  position,
  stateClasses,
  isShown,
  fetchPriority,
  isArtDeferred,
  onSelect,
}) {
  const { name, background, objects } = campaign;
  const hasProductArt = Boolean(background.productArea);
  const hasClosedArt = Boolean(background.closed);

  return (
    <div
      className={[
        'hero-panel',
        hasProductArt && 'has-product-art',
        background.isWholeArt && 'keeps-whole-art',
        hasClosedArt && 'has-closed-art',
        ...stateClasses,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ '--position': position }}
    >
      <HeroCarouselFrame>
        <CampaignBackground
          background={background}
          closedArt={background.closed}
          className="hero-panel-image"
          style={{
            '--position-collapsed': background.position.collapsed,
            '--position-expanded': background.position.expanded,
            ...productAreaVars('art', background),
            ...productAreaVars('mobile-art', background.mobile),
          }}
          fetchPriority={fetchPriority}
          isDeferred={isArtDeferred}
        />
        {objects.map((object) => (
          <span
            key={object.id}
            className={[
              'campaign-object',
              !object.collapsed && 'is-expanded-only',
              !object.expanded && 'is-collapsed-only',
              object.collapsed?.base && 'has-collapsed-base',
            ]
              .filter(Boolean)
              .join(' ')}
            style={objectStyle(object)}
          >
            <img
              src={object.src}
              alt=""
              width={object.width}
              height={object.height}
              // Os objetos são decorativos e pesam mais que o fundo (o LCP): baixam depois dele, das
              // fontes e do JavaScript, em vez de dividir a banda com o fundo.
              fetchPriority="low"
              decoding="async"
              onError={hideBrokenImage}
              className={object.srcOnLight ? 'theme-dark-only' : undefined}
            />
            {/* Logos com texto branco: a versão escura aparece no tema claro, sobre o degradê branco. */}
            {object.srcOnLight && (
              <img
                src={object.srcOnLight}
                alt=""
                width={object.width}
                height={object.height}
                fetchPriority="low"
                decoding="async"
                onError={hideBrokenImage}
                className="theme-light-only"
              />
            )}
          </span>
        ))}
      </HeroCarouselFrame>

      {/* Só abaixo de 1001px; no desktop a área de clique da arte fica no fundo ampliado. */}
      {isShown && <CampaignArtLink cta={campaign.cta} className="hero-panel-link" />}

      <button
        type="button"
        onClick={onSelect}
        aria-label={`Mostrar destaque: ${name}`}
        aria-current={isShown ? 'true' : undefined}
        className="hero-panel-select"
      />
    </div>
  );
}
