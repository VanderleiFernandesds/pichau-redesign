import { ArrowUpRight } from 'lucide-react';
import PichauLogo from '../../ui/PichauLogo';
import towerImage from '../../../assets/images/categories/computadores.avif';
import partsImage from '../../../assets/images/categories/hardware.avif';
import { OFFICIAL_SUPPORT } from '../../../data/footer';

/*
  Banner do portal Pichau Empresas (site oficial). Logo e textos ficam em HTML; a imagem junta a
  torre e as peças das categorias, com a torre atrás, como no banner original.
*/
export default function BusinessBanner() {
  return (
    <section
      aria-labelledby="business-banner-title"
      className="chamfer footer-panel business-banner relative flex flex-col gap-6 px-6 py-5 sm:py-8 lg:flex-row lg:items-center lg:gap-8"
    >
      <span aria-hidden="true" className="corner-accents" />

      <div className="flex flex-wrap items-center justify-between gap-6 lg:flex-nowrap">
        {/* O logo é decorativo (alt vazio); o "Pichau" oculto e o "Empresas" visível formam o nome lido. */}
        <p className="flex flex-col items-start">
          <PichauLogo className="h-[40px] w-auto sm:h-[48px]" />
          <span className="sr-only">Pichau</span>
          <span className="mt-1.5 self-end text-[15px] font-semibold tracking-[0.45em] text-soft uppercase sm:text-[17px]">
            Empresas
          </span>
        </p>

        <div aria-hidden="true" className="relative h-[130px] w-[200px] shrink-0 sm:h-[150px] sm:w-[240px]">
          <img src={towerImage} alt="" width="430" height="480" loading="lazy" decoding="async" className="absolute right-0 bottom-0 h-full w-auto" />
          <img src={partsImage} alt="" width="480" height="370" loading="lazy" decoding="async" className="absolute bottom-0 left-0 w-[72%]" />
        </div>
      </div>

      {/*
        Texto e botão juntos: no desktop o botão fica embaixo do texto, para o título caber numa
        linha; a partir de 1800px há espaço e ele vai para o lado, como no banner original.
      */}
      <div className="flex min-w-0 flex-1 flex-col gap-5 lg:border-l lg:border-brand/60 lg:pl-8 min-[1800px]:flex-row min-[1800px]:items-center min-[1800px]:justify-between">
        <div>
          <h3 id="business-banner-title" className="font-display text-[clamp(26px,2.4vw,40px)] leading-tight font-bold text-heading">
            Tecnologia para sua empresa<span className="text-brand">.</span>
          </h3>
          <p className="mt-1 text-[16px] text-soft sm:text-[18px]">Conheça o portal de equipamentos para CNPJ.</p>
        </div>

        <a
          href={OFFICIAL_SUPPORT.businessPortalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="chamfer chamfer-accent flex h-12 shrink-0 items-center justify-center gap-3 px-5 text-[14px] font-bold tracking-[0.5px] whitespace-nowrap text-white uppercase sm:px-7 sm:tracking-[1px] lg:self-start min-[1800px]:self-auto"
        >
          Conhecer portal
          <ArrowUpRight aria-hidden="true" className="size-5" />
          <span className="sr-only"> Pichau Empresas (abre em nova aba)</span>
        </a>
      </div>
    </section>
  );
}
