import { hideBrokenImage } from '../../utils/image';

// Mesmas media queries do CSS (index.css) e do preload do index.html.
const MOBILE_MEDIA = '(width < 1001px)';
const DESKTOP_MEDIA = '(width >= 1001px)';

/*
  Fundo da campanha, no card e no fundo ampliado. Com arte própria para o celular, os dois usam o
  mesmo <source>: o fundo ampliado fica oculto no celular, mas a imagem dele ainda seria baixada, e
  assim é a mesma do card. closedArt (só no card) é a arte estreita do card fechado: no desktop o
  card só mostra o próprio fundo fechado, porque aberto ele fica transparente sobre o fundo ampliado.
*/
export default function CampaignBackground({ background, closedArt, ...imageProps }) {
  return (
    <picture>
      {background.mobile && <source media={MOBILE_MEDIA} srcSet={background.mobile.src} />}
      {closedArt && <source media={DESKTOP_MEDIA} srcSet={closedArt.src} />}
      <img src={background.src} alt="" decoding="async" onError={hideBrokenImage} {...imageProps} />
    </picture>
  );
}
