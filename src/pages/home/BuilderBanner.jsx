import { ArrowRight } from 'lucide-react';
import bannerImageSmall from '../../assets/images/purposes/monte-seu-pc-banner-1086.avif';
import bannerImage from '../../assets/images/purposes/monte-seu-pc-banner-1629.avif';
import bannerImageLarge from '../../assets/images/purposes/monte-seu-pc-banner-2172.avif';
import mobileImageSmall from '../../assets/images/purposes/monte-seu-pc-banner-celular-543.avif';
import mobileImage from '../../assets/images/purposes/monte-seu-pc-banner-celular-815.avif';
import mobileImageLarge from '../../assets/images/purposes/monte-seu-pc-banner-celular-1086.avif';
import SectionDivider from '../../components/ui/SectionDivider';
import { useAfterPageLoad } from '../../hooks/useAfterPageLoad';

/*
  Chamada para o modal de objetivos (ConfigModal). Ele recomenda por onde começar e filtra as
  ofertas, sem montar o PC peça por peça, então o botão promete "encontrar", e não "configurar".
*/
export default function BuilderBanner({ onStart }) {
  /*
    O lazy sozinho não basta: o banner cai dentro da margem em que o navegador já baixa as imagens
    lazy, e as fotos disputavam a banda com o LCP. Até o load elas ficam sem src.
  */
  const isPageLoaded = useAfterPageLoad();

  return (
    // A divisória fica fora do painel, que é recortado pelo chanfro.
    <section id="builder" aria-labelledby="builder-title" className="builder-section">
      <SectionDivider />
      {/* Fundo preto e texto claro nos dois temas: a arte é escura e iluminada de vermelho. */}
      <div className="chamfer builder-banner relative grid grid-cols-[minmax(0,1fr)] content-center px-(--box-padding) pt-7 text-white min-[768px]:py-8">
        <span aria-hidden="true" className="corner-accents" />

        <div className="builder-copy relative z-[1]">
          <p className="text-[11px] font-semibold tracking-[3px] text-white/70 uppercase sm:text-[12px]">Cada peça faz a diferença</p>
          <h2 id="builder-title" className="mt-3 font-display text-[clamp(34px,4.2vw,58px)] leading-[0.95] font-bold">
            Monte um PC <span className="block">do seu jeito</span>
          </h2>
          <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-white/80 sm:text-[17px]">
            Escolha um objetivo e encontre os componentes para começar seu próximo setup.
          </p>
          <button
            type="button"
            onClick={onStart}
            className="chamfer chamfer-accent mt-6 flex h-12 w-full items-center justify-center gap-2 px-4 font-display text-[15px] font-bold whitespace-nowrap min-[375px]:gap-3 min-[375px]:px-7 min-[375px]:text-[17px] tracking-[0.5px] text-white uppercase min-[768px]:inline-flex min-[768px]:w-auto"
          >
            Encontrar meu setup
            <ArrowRight aria-hidden="true" className="size-5" />
          </button>
        </div>

        {/*
          Decorativa: o título já diz do que se trata. Cada largura tem a sua arte: a do celular é
          vertical, com as peças embaixo do texto, e não um recorte da horizontal.
        */}
        <picture className="builder-art">
          <source
            media="(min-width: 768px)"
            srcSet={isPageLoaded ? `${bannerImageSmall} 1086w, ${bannerImage} 1629w, ${bannerImageLarge} 2172w` : undefined}
            sizes="(min-width: 1001px) 75vw, 90vw"
            width="2172"
            height="724"
          />
          <img
            src={isPageLoaded ? mobileImage : undefined}
            srcSet={isPageLoaded ? `${mobileImageSmall} 543w, ${mobileImage} 815w, ${mobileImageLarge} 1086w` : undefined}
            sizes="min(100vw, 520px)"
            alt=""
            width="1086"
            height="1448"
            loading="lazy"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}
