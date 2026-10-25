import { ArrowUpRight } from 'lucide-react';

/*
  O card inteiro é um único link; seta, cantos e imagem são decorativos (o título já nomeia o link).
  No celular a descrição vem logo abaixo do título, e imagem e seta ficam presas na base do card:
  como os cards da mesma linha têm a mesma altura, elas ficam alinhadas com as do card ao lado.
*/
export default function PurposeCard({ purpose, onFilter }) {
  const { title, description, href, category, image, imageFrame } = purpose;

  return (
    <a
      href={href}
      onClick={category ? () => onFilter(category) : undefined}
      className="chamfer purpose-card flex flex-col gap-2 px-(--box-padding) py-[clamp(14px,2.2svh,24px)] text-heading max-sm:py-5"
    >
      <span aria-hidden="true" className="corner-accents" />

      <h2 className="font-display text-[19px] leading-tight font-bold sm:text-[21px] lg:text-[clamp(20px,1.75vw,28px)]">
        {title}
      </h2>

      {/*
        A partir de 601px a coluna do texto ocupa só o necessário e a imagem fica com o restante.
        No celular os wrappers viram `contents`, para descrição, imagem e seta ficarem na coluna do
        card; a seta vem por último pelo `order`.
      */}
      <div className="grid flex-1 grid-cols-1 gap-3 max-sm:contents sm:grid-cols-[max-content_minmax(0,1fr)]">
        <div className="contents sm:flex sm:flex-col sm:gap-3">
          {/* A quebra entre as duas frases só existe a partir de 601px; no card estreito o texto corre livre. */}
          <p className="text-[13px] leading-normal text-soft sm:leading-snug lg:text-[12px] min-[1700px]:text-[15px]">
            {description[0]} <br className="max-sm:hidden" />
            {description[1]}
          </p>
          <span aria-hidden="true" className="chamfer purpose-card-arrow order-last grid size-8 max-sm:mt-1.5 place-items-center sm:size-10 sm:order-none sm:mt-auto">
            <ArrowUpRight className="size-4 sm:size-5" />
          </span>
        </div>

        <div
          className="purpose-card-art self-end max-sm:mt-auto max-sm:self-stretch"
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
