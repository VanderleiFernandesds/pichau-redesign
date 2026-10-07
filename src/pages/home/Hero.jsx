import { ArrowUpRight, Settings } from 'lucide-react';

export default function Hero({ children }) {
  return (
    // A seção ocupa a tela inteira: o painel flutua no topo, os cards ficam na base
    // e o bloco do texto cresce para preencher o espaço entre eles.
    <section className="hero relative flex min-h-svh flex-col overflow-hidden bg-[#050506] text-white">
      {/* O fundo decorativo é posicionado pelo centro deste bloco; manter os cards fora dele evita
          que a arte se desloque. A seção usa a mesma cor em que o fundo termina. */}
      <div className="relative flex flex-1">
        <div aria-hidden="true" className="hero-decor" />

        <div className="wrap relative flex w-full items-center pt-(--header-offset)">
          {/* Abaixo de 1001px as faixas vermelhas passam por trás do título; o gradiente garante o contraste. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,#08090bea_5%,#08090b9c_58%,transparent)] lg:hidden"
          />

          <div className="relative z-[1] max-w-[590px] py-(--hero-gap)">
            <span className="eyebrow text-[#e7a3ae]">O SEU SETUP. O SEU PRÓXIMO NÍVEL.</span>
            <h1 className="my-4 text-[37px] leading-[1.04] font-bold tracking-[-1.3px] sm:my-5 sm:text-[45px] sm:tracking-[-2px] lg:text-[clamp(44px,7svh,54px)]">
              Seu próximo nível
              <br />
              <em className="text-brand not-italic">começa aqui.</em>
            </h1>
            <p className="my-[1em] text-[14px] leading-[1.5] text-[#e1dfe3] sm:text-[18px]">
              PCs gamers, hardware e upgrades
              <br />
              para o seu setup.
            </p>
            <div className="mt-(--hero-gap) flex gap-[9px] sm:gap-3.5">
              <a className="button" href="#offers">
                Explorar ofertas <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
              <a className="button border border-[#ffffff60] bg-[#ffffff10] hover:bg-[#bf001e]" href="#builder">
                <span className="inline-flex items-center gap-1.5">
                  <Settings aria-hidden="true" className="size-4" />
                  Monte seu PC
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="wrap relative w-full pb-(--hero-gap)">{children}</div>
    </section>
  );
}
