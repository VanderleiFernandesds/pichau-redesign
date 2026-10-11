import { ArrowUpRight } from 'lucide-react';

// O card inteiro é um único link; seta, cantos e imagem são decorativos (o título já nomeia o link).
export default function PurposeCard({ purpose, onFilter }) {
  const { title, description, href, category, image, imageFrame } = purpose;

  return (
    <a
      href={href}
      onClick={category ? () => onFilter(category) : undefined}
      className="chamfer purpose-card flex flex-col gap-2 px-(--box-padding) py-[clamp(14px,2.2svh,24px)] text-heading"
    >
      <span aria-hidden="true" className="corner-accents" />

      <h2 className="font-display text-[21px] leading-tight font-bold lg:text-[clamp(20px,1.75vw,28px)]">{title}</h2>

      {/*
        A partir de 601px a coluna do texto ocupa só o necessário e a imagem fica com o restante.
        Abaixo disso o card é estreito (dois por linha), então tudo empilha: o wrapper do texto vira
        `contents` e a seta passa para depois da imagem.
      */}
      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-[max-content_minmax(0,1fr)]">
        <div className="contents sm:flex sm:flex-col sm:gap-3">
          <p className="text-[13px] leading-snug text-soft lg:text-[12px] min-[1700px]:text-[15px]">
            {description[0]}
            <br />
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
