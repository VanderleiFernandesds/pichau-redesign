import { ArrowUpRight } from 'lucide-react';

/*
  O card inteiro é um único link; seta, cantos e imagem são decorativos (o título já nomeia o link).
  No celular cada card ocupa quatro linhas da grade da seção (subgrid): título, descrição, imagem e
  seta ficam alinhados com os do card ao lado, e a linha cresce junto quando um texto quebra.
*/
export default function PurposeCard({ purpose, onFilter }) {
  const { title, description, href, category, image, imageFrame } = purpose;

  return (
    <a
      href={href}
      onClick={category ? () => onFilter(category) : undefined}
      className="chamfer purpose-card flex flex-col gap-2 px-(--box-padding) py-[clamp(14px,2.2svh,24px)] text-heading max-sm:row-span-4 max-sm:grid max-sm:grid-rows-subgrid max-sm:gap-y-2.5"
    >
      <span aria-hidden="true" className="corner-accents" />

      {/* No celular o título reserva duas linhas, para as descrições começarem na mesma altura. */}
      <h2 className="font-display text-[21px] leading-tight font-bold max-sm:min-h-[2.5em] lg:text-[clamp(20px,1.75vw,28px)]">
        {title}
      </h2>

      {/*
        A partir de 601px a coluna do texto ocupa só o necessário e a imagem fica com o restante.
        No celular os wrappers viram `contents`, para descrição, imagem e seta serem linhas da
        subgrid; a seta vem por último pelo `order`.
      */}
      <div className="grid flex-1 grid-cols-1 gap-3 max-sm:contents sm:grid-cols-[max-content_minmax(0,1fr)]">
        <div className="contents sm:flex sm:flex-col sm:gap-3">
          {/* A quebra entre as duas frases só existe a partir de 601px; no card estreito o texto corre livre. */}
          <p className="text-[14px] leading-normal text-soft sm:text-[13px] sm:leading-snug lg:text-[12px] min-[1700px]:text-[15px]">
            {description[0]} <br className="max-sm:hidden" />
            {description[1]}
          </p>
          <span aria-hidden="true" className="chamfer purpose-card-arrow order-last grid size-10 place-items-center sm:order-none sm:mt-auto">
            <ArrowUpRight className="size-5" />
          </span>
        </div>

        <div
          className="purpose-card-art self-end"
          style={{
            '--source-width': imageFrame.sourceWidth,
            '--frame-x': imageFrame.x,
            '--frame-y': imageFrame.y,
            '--frame-width': imageFrame.width,
            '--frame-height': imageFrame.height,
          }}
        >
          <img src={image} alt="" width={imageFrame.sourceWidth} height={imageFrame.sourceHeight} decoding="async" />
        </div>
      </div>
    </a>
  );
}
