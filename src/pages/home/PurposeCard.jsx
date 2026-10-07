import { ArrowUpRight } from 'lucide-react';

// O card inteiro é um único link; seta, cantos e ilustração são decorativos.
export default function PurposeCard({ purpose, onFilter }) {
  const { title, description, href, category, image, alt, icon: Icon, isHighlighted } = purpose;

  return (
    <a
      href={href}
      onClick={category ? () => onFilter(category) : undefined}
      className={`chamfer purpose-card group grid grid-cols-[minmax(0,1fr)_auto] grid-rows-[auto_1fr] gap-x-3 gap-y-2 p-[clamp(14px,2.2svh,24px)] text-white ${
        isHighlighted ? 'is-highlighted' : ''
      }`}
    >
      <span aria-hidden="true" className="purpose-card-corners" />

      <h2 className="col-span-2 text-[19px] leading-tight font-bold tracking-[-0.5px] lg:text-[clamp(18px,1.6vw,26px)]">{title}</h2>

      <div className="flex flex-col gap-3">
        <p className="text-[13px] leading-snug text-[#b8b9bf] lg:text-[12px] min-[1700px]:text-[15px]">
          {description[0]}
          <br />
          {description[1]}
        </p>
        <span aria-hidden="true" className="chamfer purpose-card-arrow mt-auto grid size-10 place-items-center">
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <div aria-hidden={image ? undefined : 'true'} className="flex h-[clamp(72px,12svh,130px)] w-24 items-end justify-end self-end sm:w-20 lg:w-[clamp(64px,6vw,130px)]">
        {image ? (
          <img
            src={image}
            alt={alt}
            loading="lazy"
            className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <Icon strokeWidth={1.25} className="purpose-card-icon size-full max-w-[130px]" />
        )}
      </div>
    </a>
  );
}
