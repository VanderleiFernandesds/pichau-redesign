import { Heart, ShoppingCart } from 'lucide-react';
import AccountMenu from '../../account/AccountMenu';
import { formatProductCount } from '../../../utils/format';

// No tablet conta e favoritos ficam só com ícone; o aria-label mantém o nome acessível. No celular
// fica só o carrinho, sem o texto: conta e favoritos vão para a barra inferior.
// Sem moldura: o destaque fica no texto, para a linha não virar uma fileira de caixas.
const actionClass =
  'relative flex h-(--header-control) min-w-(--header-control) items-center justify-center gap-2 text-[13px] transition-colors hover:text-brand lg:h-12 lg:px-2 lg:whitespace-nowrap';

export default function HeaderActions({
  onOpenAuth,
  isFavoriteOnly,
  onToggleFavorites,
  favoriteCount,
  cartCount,
  onOpenCart,
  className = '',
}) {
  const cartLabel = formatProductCount(cartCount);
  const hasCartItems = cartCount > 0;

  return (
    <div className={`flex items-center gap-2 lg:gap-5 ${className}`}>
      <AccountMenu onOpenAuth={onOpenAuth} />

      <button
        type="button"
        onClick={onToggleFavorites}
        aria-pressed={isFavoriteOnly}
        aria-label={`Favoritos, ${formatProductCount(favoriteCount)}`}
        className={`${actionClass} max-sm:hidden ${isFavoriteOnly ? 'text-brand' : 'text-heading'}`}
      >
        <Heart aria-hidden="true" className={`size-5 ${isFavoriteOnly ? 'fill-brand' : ''}`} />
        <span className="hidden lg:inline">Favoritos</span>
        {/*
          O contador fica no canto do botão, fora do coração; no desktop entra na linha depois do
          texto, um pouco acima, como um expoente.
        */}
        {favoriteCount > 0 && (
          <i
            aria-hidden="true"
            className="absolute top-0 right-0 min-w-4 rounded-full bg-brand px-1.25 py-px text-center text-[10px] leading-normal font-bold text-white not-italic lg:static lg:-ml-1 lg:-translate-y-2"
          >
            {favoriteCount}
          </i>
        )}
      </button>

      <button
        type="button"
        onClick={onOpenCart}
        aria-label={`Carrinho, ${cartLabel}`}
        className={`chamfer ${hasCartItems ? 'chamfer-success' : 'chamfer-accent'} header-cart relative ml-1 flex h-(--header-control) min-w-(--header-control) items-center justify-center gap-2.5 px-3 text-white sm:px-4 lg:ml-0 lg:h-12 lg:px-5`}
      >
        <ShoppingCart aria-hidden="true" className="size-5" />
        {/* No celular sem o texto: só o ícone e a quantidade. */}
        {hasCartItems && (
          <i aria-hidden="true" className="text-[13px] leading-none font-bold not-italic sm:hidden">
            {cartCount}
          </i>
        )}
        <span className="flex flex-col text-left leading-tight max-sm:hidden">
          <b className="text-[13px] tracking-[0.5px] uppercase">Carrinho</b>
          <small className="text-[11px] text-white/80">{cartLabel}</small>
        </span>
      </button>
    </div>
  );
}
