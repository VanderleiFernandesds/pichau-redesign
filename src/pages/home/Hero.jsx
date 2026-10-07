import { ArrowUpRight, Settings } from 'lucide-react';

export default function Hero({ children }) {
  return (
    // A seção ocupa a tela (com teto definido em .hero): o painel flutua no topo, os cards
    // ficam na base e o bloco do texto cresce para preencher o espaço entre eles.
    <section className="hero flex flex-col bg-[#050506] text-white">
      <div className="flex flex-1">
        <div className="wrap flex w-full items-center pt-(--header-offset)">
          <div className="max-w-[590px] py-(--hero-gap)">
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

      <div className="wrap w-full pb-(--hero-gap)">{children}</div>
    </section>
  );
}
