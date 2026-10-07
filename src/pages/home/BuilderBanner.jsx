import { ArrowUpRight } from 'lucide-react';
import motherboardImage from '../../assets/images/products/placa-mae-orion.jpg';

export default function BuilderBanner({ onStart }) {
  return (
    <section
      id="builder"
      className="relative my-[26px] flex min-h-[245px] items-center justify-between overflow-hidden rounded-[7px] bg-[radial-gradient(ellipse_at_right,#4c0816,#121216_65%)] p-6 text-white sm:mt-8 sm:mb-10 sm:min-h-0 sm:p-[35px]"
    >
      <div className="relative z-[1]">
        <span className="eyebrow">CADA PEÇA FAZ A DIFERENÇA</span>
        <h2 className="mt-2 max-w-[230px] font-display text-[28px] leading-tight font-bold sm:max-w-none sm:text-[31px] lg:text-[34px]">
          Monte um PC <em className="text-brand not-italic">do seu jeito</em>
        </h2>
        <p className="my-[1em] text-[12px] leading-[1.7] text-[#c7c7cc] sm:text-[14px]">
          Escolha um objetivo e encontre os componentes
          <br />
          para começar seu próximo setup.
        </p>
        <button type="button" className="button" onClick={onStart}>
          <span className="inline-flex items-center gap-1.5">
            Começar configuração
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </span>
        </button>
      </div>
      <img
        src={motherboardImage}
        alt="Placa-mãe para montagem de computador"
        className="absolute -right-[100px] h-[220px] w-[300px] object-contain opacity-20 mix-blend-screen sm:static sm:opacity-65"
      />
    </section>
  );
}
