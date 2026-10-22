import { ArrowRight } from 'lucide-react';
import partsImage from '../../assets/images/purposes/monte-seu-pc-600.avif';
import partsImageLarge from '../../assets/images/purposes/monte-seu-pc-1200.avif';
import pcCaseImage from '../../assets/images/purposes/monte-seu-pc-gabinete.avif';

/*
  Chamada para o modal de objetivos (ConfigModal). Ele recomenda por onde começar e filtra as
  ofertas, sem montar o PC peça por peça, então o botão promete "encontrar", e não "configurar".
*/
export default function BuilderBanner({ onStart }) {
  return (
    <section
      id="builder"
      aria-labelledby="builder-title"
      className="chamfer builder-banner relative my-8 grid items-center gap-6 px-6 py-7 text-heading sm:my-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6 lg:py-6"
    >
      <span aria-hidden="true" className="corner-accents" />

      <div className="relative z-[1]">
        <p className="text-[11px] font-semibold tracking-[3px] text-muted uppercase sm:text-[12px]">Cada peça faz a diferença</p>
        <h2 id="builder-title" className="mt-3 font-display text-[clamp(34px,4.2vw,58px)] leading-[0.95] font-bold">
          Monte um PC <span className="block">do seu jeito</span>
        </h2>
        <p className="mt-4 max-w-[44ch] text-[15px] leading-relaxed text-soft sm:text-[17px]">
          Escolha um objetivo e encontre os componentes para começar seu próximo setup.
        </p>
        <button
          type="button"
          onClick={onStart}
          className="chamfer chamfer-accent mt-6 flex h-12 w-full items-center justify-center gap-3 px-7 font-display text-[17px] font-bold tracking-[0.5px] text-white uppercase sm:inline-flex sm:w-auto"
        >
          Encontrar meu setup
          <ArrowRight aria-hidden="true" className="size-5" />
        </button>
      </div>

      {/*
        Decorativa: o título já diz do que se trata. O gabinete fica à direita, atrás das peças; o
        brilho é um pseudo-elemento atrás das duas fotos.
      */}
      <div className="builder-art">
        <img className="builder-art-case" src={pcCaseImage} alt="" width="673" height="800" loading="lazy" decoding="async" />
        {/* As peças ocupam no máximo 600 x 400 (desktop largo) e 390px de largura abaixo de 1001px. */}
        <img
          className="builder-art-parts"
          src={partsImage}
          srcSet={`${partsImage} 600w, ${partsImageLarge} 1200w`}
          sizes="(min-width: 1001px) 600px, 390px"
          alt=""
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
