import { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import Modal from '../../components/ui/Modal';

const navButtonClass =
  'chamfer chip-button absolute top-1/2 grid size-11 -translate-y-1/2 place-items-center text-heading';

/*
  Foto principal na área branca dos cards (as fotos têm fundo branco), com ampliação num modal.
  Setas e miniaturas só aparecem com mais de uma foto: hoje cada produto tem uma, e a galeria não
  finge ter outras. imageRef aponta para a foto exibida, de onde sai a animação do carrinho.
*/
export default function ProductGallery({ images, name, imageRef }) {
  const [index, setIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const hasMany = images.length > 1;
  const image = images[index] ?? images[0];
  const alt = hasMany ? `${name}, foto ${index + 1} de ${images.length}` : name;

  function step(delta) {
    setIndex((current) => (current + delta + images.length) % images.length);
  }

  return (
    <div className="min-w-0">
      {/*
        A foto ocupa a área inteira (absolute) e se ajusta com object-contain: dentro de uma caixa
        dimensionada por aspect-ratio, max-height em % não vale e a foto vazaria para baixo. A altura
        também se limita pela tela, para a galeria não empurrar o título para fora no tablet.
      */}
      <div className="chamfer product-media product-gallery-main relative aspect-square max-h-[min(620px,62svh)] w-full sm:aspect-5/4">
        <img
          ref={imageRef}
          src={image}
          alt={alt}
          width="600"
          height="600"
          decoding="async"
          className="absolute inset-0 size-full object-contain p-6 sm:p-10"
        />

        {hasMany && (
          <>
            <button type="button" onClick={() => step(-1)} aria-label="Foto anterior" className={`${navButtonClass} left-3`}>
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Próxima foto" className={`${navButtonClass} right-3`}>
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </>
        )}

        <button
          type="button"
          onClick={() => setIsZoomOpen(true)}
          aria-label="Ampliar foto"
          className="chamfer chip-button absolute right-3 bottom-3 grid size-11 place-items-center text-heading"
        >
          <ZoomIn aria-hidden="true" className="size-5" />
        </button>
      </div>

      {hasMany && (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Fotos do produto">
          {images.map((thumbnail, thumbnailIndex) => (
            <li key={thumbnail}>
              <button
                type="button"
                onClick={() => setIndex(thumbnailIndex)}
                aria-label={`Ver foto ${thumbnailIndex + 1} de ${images.length}`}
                aria-current={thumbnailIndex === index ? 'true' : undefined}
                className="chamfer product-media product-thumb grid size-20 place-items-center p-1.5"
              >
                <img src={thumbnail} alt="" className="max-h-full w-full object-contain" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
        title={name}
        closeLabel="Fechar foto ampliada"
        className="max-h-[94vh] w-[min(1000px,calc(100%-24px))]"
        panelClassName="px-4 py-4 sm:px-6 sm:py-5"
      >
        <div className="chamfer product-media mt-3 grid place-items-center p-4">
          <img src={image} alt={alt} className="max-h-[72vh] w-full object-contain" />
        </div>
      </Modal>
    </div>
  );
}
