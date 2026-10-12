import { ArrowRight } from 'lucide-react';
import partsImage from '../../assets/images/purposes/monte-seu-pc.png';

/*
  Chamada para o modal de objetivos (ConfigModal). Ele recomenda por onde começar e filtra as
  ofertas, sem montar o PC peça por peça, então o botão promete "encontrar", e não "configurar".
  Texto à esquerda e peças à direita no desktop; no celular o texto e o botão vêm antes da imagem.
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
          Monte um PC <span className="block text-brand">do seu jeito</span>
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

      {/* Decorativa: o título já diz do que se trata. O brilho fica num pseudo-elemento atrás da foto. */}
      <div className="builder-art">
        <img src={partsImage} alt="" width="1536" height="1024" loading="lazy" decoding="async" />
      </div>
    </section>
  );
}
