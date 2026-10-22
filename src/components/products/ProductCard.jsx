import { ArrowUpRight, Heart, ShoppingCart } from 'lucide-react';
import StarRating from '../ui/StarRating';
import { formatMoney } from '../../utils/format';

// O valor no Pix já tem 15% de desconto; o preço no cartão é calculado a partir dele.
const PIX_DISCOUNT_FACTOR = 0.85;
const INSTALLMENTS = 12;

/*
  As 6 linhas do card (imagem, nome, especificações, avaliação, preço e botões) são um subgrid da
  vitrine, então ficam alinhadas entre os cards da mesma linha mesmo quando um texto quebra ou um
  produto não tem avaliação. Por isso o
  card compacto usa media query (abaixo de 640px), e não container query: a contenção de layout
  dela desativa o subgrid.
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
      className="group chamfer purpose-card row-span-6 grid cursor-pointer grid-rows-subgrid gap-0 p-3 text-heading sm:p-4"
    >
      <span aria-hidden="true" className="corner-accents" />

      {/* As fotos têm fundo branco; ficam numa área clara, em vez de um recorte sobre o grafite. */}
      <div className="chamfer product-media relative flex h-30 items-center justify-center p-2 sm:h-48 sm:p-3">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          width="240"
          height="190"
          // A ampliação no hover cabe no respiro (p-2/p-3) da área branca, sem encostar na borda.
          className="h-full w-full object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-106"
        />
        {/* No celular o chip é menor que o botão, para não cobrir a foto; a área de toque segue com 44px. */}
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          aria-pressed={isFavorite}
          aria-label={`Favoritar ${product.name}`}
          className={`absolute top-0 right-0 grid size-11 place-items-center sm:top-1 sm:right-1 ${isFavorite ? 'text-brand' : 'text-heading'}`}
        >
          <span className="chamfer chip-button grid size-7 place-items-center sm:size-10">
            <Heart aria-hidden="true" className={`size-3.5 sm:size-4.5 ${isFavorite ? 'fill-current' : ''}`} />
          </span>
        </button>
      </div>

      <h3 className="mt-3 line-clamp-2 font-display text-[14px] leading-tight font-bold sm:text-[17px]">
        {product.name}
      </h3>
      <p className="mt-1 text-[12px] leading-snug text-soft sm:text-[13px]">{product.spec}</p>
      <StarRating rating={product.rating} className="mt-1.5 sm:mt-2" />

      <div className="pt-2 sm:pt-3">
        {/*
          No celular "no Pix" fica sempre embaixo do valor, que não quebra: com ele ao lado, cada card
          quebrava num ponto diferente conforme o tamanho do preço.
        */}
        <p className="flex flex-col text-success sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-1.5">
          <span className="text-[clamp(18px,5.2vw,21px)] leading-tight font-extrabold tracking-[-0.5px] whitespace-nowrap sm:text-[24px]">
            {formatMoney(product.price)}
          </span>
          <span className="text-[12px] font-semibold">no Pix</span>
        </p>
        <p className="mt-1.5 text-[12px] leading-snug text-soft sm:mt-1 sm:leading-normal">
          {INSTALLMENTS}x de <span className="whitespace-nowrap">{formatMoney(cardPrice / INSTALLMENTS)}</span> <span className="whitespace-nowrap">sem juros</span>
          <br />
          Total no cartão<span className="max-sm:hidden">:</span>{' '}
          <span className="whitespace-nowrap max-sm:block">{formatMoney(cardPrice)}</span>
        </p>
      </div>

      {/* Em cards estreitos não cabe o texto ao lado do carrinho, então os botões empilham. */}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => onView(product.id)}
          className="chamfer chamfer-accent product-card-cta flex h-10 min-w-0 sm:h-11 items-center justify-center gap-2 px-2 text-[11px] font-bold tracking-[0.5px] whitespace-nowrap text-white uppercase sm:flex-1 sm:justify-between sm:px-4 sm:text-[13px]"
        >
          Ver produto
          <ArrowUpRight aria-hidden="true" className="hidden size-4 sm:block" />
        </button>
        <button
          type="button"
          onClick={() => onAddToCart(product.id)}
          aria-label={`Adicionar ${product.name} ao carrinho`}
          title="Adicionar ao carrinho"
          className="chamfer chip-button flex h-10 shrink-0 items-center justify-center gap-2 text-[12px] font-semibold sm:size-11"
        >
          <ShoppingCart aria-hidden="true" className="size-4 sm:size-4.5" />
          <span aria-hidden="true" className="sm:hidden">Adicionar</span>
        </button>
      </div>
    </article>
  );
}
