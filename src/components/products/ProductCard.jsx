import { ArrowUpRight, Heart, ShoppingCart } from 'lucide-react';
import { formatMoney } from '../../utils/format';

// O valor no Pix já tem 15% de desconto; o preço no cartão é calculado a partir dele.
const PIX_DISCOUNT_FACTOR = 0.85;
const INSTALLMENTS = 12;

/*
  Card no padrão chanfrado do site (purpose-card: borda, cantos vermelhos e brilho no hover, sem
  deslocar o layout). As 5 linhas do card (imagem, nome, especificações, preço e botões) são um
  subgrid da vitrine, então ficam alinhadas entre os cards da mesma linha mesmo quando um texto
  quebra em mais linhas. Abaixo de 640px os cards são estreitos e ficam mais compactos; não dá para
  usar container query aqui, porque a contenção de layout dela desativa o subgrid.
*/
export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart, onView }) {
  const cardPrice = product.price / PIX_DISCOUNT_FACTOR;

  /*
    O card inteiro abre o produto, como o "Ver produto". É só um atalho para o mouse e o toque: no
    teclado o caminho é o próprio botão, e os botões de dentro (favoritar, carrinho) mantêm a ação
    deles.
  */
  function handleCardClick(event) {
    if (event.target.closest('button')) return;
    onView(product.id);
  }

  return (
    <article
      onClick={handleCardClick}
      className="chamfer purpose-card row-span-5 grid cursor-pointer grid-rows-subgrid gap-0 p-3 text-heading sm:p-4"
    >
      <span aria-hidden="true" className="corner-accents" />

      {/* As fotos são JPG com fundo branco; ficam numa área clara, em vez de um recorte sobre o grafite. */}
      <div className="chamfer product-media relative flex h-36 items-center justify-center p-2 sm:h-48 sm:p-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="240"
          height="190"
          className="h-full w-full object-contain"
        />
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label={`Favoritar ${product.name}`}
          className={`chamfer chip-button absolute top-1.5 right-1.5 grid size-9 place-items-center sm:size-10 ${isFavorite ? 'text-brand' : 'text-heading'}`}
        >
          <Heart aria-hidden="true" className={`size-4.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <h3 className="mt-3 line-clamp-2 font-display text-[14px] leading-tight font-bold sm:text-[17px]">
        {product.name}
      </h3>
      <p className="mt-1 text-[12px] leading-snug text-soft sm:text-[13px]">{product.spec}</p>

      <div className="pt-3">
        <p className="flex flex-wrap items-baseline gap-x-1.5">
          <span className="text-[19px] font-extrabold tracking-[-0.5px] text-success sm:text-[24px]">{formatMoney(product.price)}</span>
          <span className="text-[12px] font-semibold text-success">no Pix</span>
        </p>
        <p className="mt-1 text-[11px] leading-normal text-soft sm:text-[12px]">
          {INSTALLMENTS}x de {formatMoney(cardPrice / INSTALLMENTS)} sem juros
          <br />
          Total no cartão: {formatMoney(cardPrice)}
        </p>
      </div>

      {/* Em cards estreitos não cabe o texto ao lado do carrinho, então os botões empilham. */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onView(product.id)}
          className="chamfer chamfer-accent flex h-11 min-w-0 items-center justify-center gap-2 px-2 text-[11px] font-bold tracking-[0.5px] whitespace-nowrap text-white uppercase sm:flex-1 sm:justify-between sm:px-4 sm:text-[13px]"
        >
          Ver produto
          <ArrowUpRight aria-hidden="true" className="hidden size-4 sm:block" />
        </button>
        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          title="Adicionar ao carrinho"
          className="chamfer chip-button flex h-11 shrink-0 items-center justify-center gap-2 text-[12px] font-semibold sm:w-11"
        >
          <ShoppingCart aria-hidden="true" className="size-4.5" />
          <span aria-hidden="true" className="sm:hidden">Adicionar</span>
        </button>
      </div>
    </article>
  );
}
