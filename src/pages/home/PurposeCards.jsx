import { ArrowUpRight } from 'lucide-react';
import { PURPOSES } from '../../data/home';

export default function PurposeCards({ onFilter }) {
  return (
    <section id="choose" aria-label="Escolha seu computador" className="my-3.5 grid grid-cols-[repeat(2,1fr)] gap-2.5 sm:my-5 sm:gap-3.5 lg:grid-cols-[repeat(4,1fr)]">
      {PURPOSES.map((purpose) => (
        <a
          key={purpose.title}
          href={purpose.href}
          onClick={purpose.category ? () => onFilter(purpose.category) : undefined}
          className={`group relative h-[138px] overflow-hidden rounded-md px-3 py-4 text-white sm:h-[150px] sm:px-[18px] sm:py-[22px] ${
            purpose.isHighlighted
              ? 'bg-[linear-gradient(120deg,#51020d,#1c1316)]'
              : 'bg-[linear-gradient(120deg,#15161b,#333640)]'
          }`}
        >
          <h2 className="relative z-[1] mb-2.5 text-[15px] font-bold tracking-[-0.5px] sm:text-[18px]">{purpose.title}</h2>
          <p className="relative z-[1] my-[1em] text-[10px] leading-[1.5] sm:text-[12px]">
            {purpose.description[0]}
            <br />
            {purpose.description[1]}
          </p>
          <span className="relative z-[1] inline-grid size-6 place-items-center rounded-full border border-[#ffffff60]">
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </span>
          <img
            src={purpose.image}
            alt={purpose.alt}
            className="absolute right-[5px] -bottom-[5px] h-[115px] w-[90px] object-contain opacity-30 mix-blend-screen transition-transform duration-200 group-hover:scale-[1.08] sm:w-[120px] sm:opacity-55 lg:-right-3 lg:opacity-50"
          />
        </a>
      ))}
    </section>
  );
}
