import { Heart, Plus } from 'lucide-react';
import { formatMoney } from '../../utils/format';

// O valor no Pix já tem 15% de desconto; o preço no cartão é calculado a partir dele.
const PIX_DISCOUNT_FACTOR = 0.85;
const INSTALLMENTS = 12;

// O card responde à própria largura (container query), e não à viewport:
// abaixo de 220px, como no celular ou na grade de 6 colunas, usa a versão compacta.
export default function ProductCard({ product, isFavorite, onToggleFavorite, onAddToCart }) {
  const cardPrice = product.price / PIX_DISCOUNT_FACTOR;

  return (
    <article className="@container relative rounded-[7px] border border-line bg-surface transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-[3px] hover:border-brand/60 hover:shadow-[0_10px_30px_#ed002420]">
      <div className="flex h-full flex-col p-[11px] @min-[220px]:p-4">
        {/* As fotos são JPG com fundo branco; elas ficam numa área clara, em vez de um recorte sobre o grafite. */}
        <div className="relative mb-3 rounded-[5px] bg-white px-2 pt-[23px] pb-2 @min-[220px]:pt-4">
          <span className="absolute top-[3px] left-[3px] rounded-sm bg-brand px-[7px] py-[5px] text-[9px] font-bold text-white @min-[220px]:top-1.5 @min-[220px]:left-1.5 @min-[220px]:px-[9px] @min-[220px]:py-1.5 @min-[220px]:text-[11px]">
            -{product.discount}%
          </span>
          <button
            type="button"
            onClick={() => onToggleFavorite(product.id)}
            aria-pressed={isFavorite}
            aria-label={`Favoritar ${product.name}`}
            className={`absolute top-0.5 right-0.5 z-[2] grid size-8 place-items-center rounded-sm bg-white hover:text-brand @min-[220px]:top-1 @min-[220px]:right-1 ${isFavorite ? 'text-brand' : 'text-[#68707a]'}`}
          >
            <Heart aria-hidden="true" className={`size-[22px] ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            width="240"
            height="190"
            className="h-[135px] w-full object-contain @min-[220px]:h-[190px]"
          />
        </div>
        <h3 className="mb-[9px] min-h-[35px] font-display text-[14px] leading-[1.25] font-semibold text-white @min-[220px]:min-h-[40px] @min-[220px]:text-[16px]">
          {product.name}
        </h3>
        <p className="mb-3.5 text-[10px] leading-[1.5] text-muted @min-[220px]:mb-[22px] @min-[220px]:text-[11px]">{product.spec}</p>
        <div className="mt-auto flex items-center justify-between gap-1">
          <div className="min-w-0">
            <span className="text-[18px] font-extrabold tracking-[-1px] text-success @min-[220px]:text-[23px]">
              {formatMoney(product.price)}
            </span>
            <span className="mt-0.5 block text-[10px] whitespace-nowrap text-success @min-[220px]:mt-0 @min-[220px]:ml-[3px] @min-[220px]:inline">no Pix</span>
            <div className="mt-[5px] text-[9px] leading-[1.5] text-muted @min-[220px]:text-[10px]">
              ou {INSTALLMENTS}x de {formatMoney(cardPrice / INSTALLMENTS)}
              <br />
              Total no cartão: {formatMoney(cardPrice)}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            aria-label={`Adicionar ${product.name} ao carrinho`}
            className="grid h-[34px] w-[30px] shrink-0 place-items-center rounded-[5px] bg-brand text-white hover:bg-[#b5001c] @min-[220px]:h-10 @min-[220px]:w-[38px]"
          >
            <Plus aria-hidden="true" className="size-4 @min-[220px]:size-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </article>
  );
}
