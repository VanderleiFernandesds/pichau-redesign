import { ArrowUpRight, Settings } from 'lucide-react';
import heroComputer from '../../assets/images/hero-computer.webp';

export default function Hero({ children }) {
  return (
    <section className="hero relative overflow-hidden bg-[#050506] text-white">
      {/* O fundo decorativo é posicionado pelo centro deste bloco; manter os cards fora dele evita
          que a arte se desloque em relação ao computador. A seção usa a mesma cor em que o fundo termina. */}
      <div className="relative">
        <div aria-hidden="true" className="hero-decor" />

        <div className="wrap relative flex min-h-[340px] items-center sm:min-h-[400px] 2xl:min-h-[460px]">
          <img src={heroComputer} alt="" width="950" height="724" fetchPriority="high" className="hero-computer" />
          {/* No mobile o computador fica atrás do texto; o gradiente garante o contraste. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(90deg,#08090bea_5%,#08090b9c_58%,transparent)] sm:hidden"
          />

          <div className="relative z-[1] max-w-[590px] py-7 sm:py-10">
            <span className="eyebrow text-[#e7a3ae]">O SEU SETUP. O SEU PRÓXIMO NÍVEL.</span>
            <h1 className="my-5 text-[37px] leading-[1.04] font-bold tracking-[-1.3px] sm:text-[45px] sm:tracking-[-2px] lg:text-[54px]">
              Seu próximo nível
              <br />
              <em className="text-brand not-italic">começa aqui.</em>
            </h1>
            <p className="my-[1em] text-[14px] leading-[1.5] text-[#e1dfe3] sm:text-[18px]">
              PCs gamers, hardware e upgrades
              <br />
              para o seu setup.
            </p>
            <div className="mt-7 flex gap-[9px] sm:gap-3.5">
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

      <div className="wrap relative pb-7 sm:pb-10">{children}</div>
    </section>
  );
}
