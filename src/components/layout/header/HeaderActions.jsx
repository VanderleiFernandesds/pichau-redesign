import { Heart, ShoppingCart, User } from 'lucide-react';

// Abaixo de 1001px conta e favoritos ficam só com ícone; o aria-label mantém o nome acessível.
// No desktop ganham a moldura chanfrada da navegação, na altura do carrinho e da busca.
const actionClass =
  'header-action relative isolate flex h-11 min-w-11 items-center justify-center gap-2 text-[13px] transition-colors hover:text-brand lg:h-12 lg:px-4 lg:whitespace-nowrap';
const frame = <span aria-hidden="true" className="chamfer chamfer-field nav-frame hidden lg:block" />;

function countLabel(count) {
  return `${count} ${count === 1 ? 'produto' : 'produtos'}`;
}

export default function HeaderActions({
  onAccount,
  isFavoriteOnly,
  onToggleFavorites,
  favoriteCount,
  cartCount,
  onOpenCart,
  className = '',
}) {
  const cartLabel = countLabel(cartCount);
  const hasCartItems = cartCount > 0;

  return (
    <div className={`flex items-center gap-1 sm:gap-2 lg:gap-5 ${className}`}>
      <button type="button" onClick={onAccount} aria-label="Minha Conta" className={`${actionClass} text-heading`}>
        {frame}
        <User aria-hidden="true" className="size-5" />
        <span className="hidden lg:inline">Minha Conta</span>
      </button>

      <span aria-hidden="true" className="header-slash" />

      <button
        type="button"
        onClick={onToggleFavorites}
        aria-pressed={isFavoriteOnly}
        aria-label={`Favoritos, ${countLabel(favoriteCount)}`}
        className={`${actionClass} ${isFavoriteOnly ? 'text-brand' : 'text-heading'}`}
      >
        {frame}
        {/* A margem no desktop evita que o contador encoste no texto "Favoritos". */}
        <span className="relative lg:mr-1.5">
          <Heart aria-hidden="true" className={`size-5 ${isFavoriteOnly ? 'fill-brand' : ''}`} />
          {favoriteCount > 0 && (
            <i
              aria-hidden="true"
              className="absolute -top-2 -right-2.5 min-w-4 rounded-full bg-brand px-1.25 py-px text-center text-[10px] font-bold text-white not-italic"
            >
              {favoriteCount}
            </i>
          )}
        </span>
        <span className="hidden lg:inline">Favoritos</span>
      </button>

      <span aria-hidden="true" className="header-slash" />

      <button
        type="button"
        onClick={onOpenCart}
        aria-label={`Carrinho, ${cartLabel}`}
        // Fica verde enquanto houver produtos no carrinho e volta ao vermelho quando ele esvazia.
        className={`chamfer ${hasCartItems ? 'chamfer-success' : 'chamfer-accent'} header-cart ml-1 flex h-11 items-center gap-2.5 px-3 text-white sm:px-4 lg:ml-0 lg:h-12 lg:px-5`}
      >
        <span className="relative">
          <ShoppingCart aria-hidden="true" className="size-5" />
          <i
            className={`absolute -top-2 -right-2.5 rounded-full bg-white px-1.25 py-px text-[10px] font-bold not-italic sm:hidden ${hasCartItems ? 'text-[#0c652b]' : 'text-brand'}`}
          >
            {cartCount}
          </i>
        </span>
        <span className="hidden flex-col text-left leading-tight sm:flex">
          <b className="text-[13px] tracking-[0.5px] uppercase">Carrinho</b>
          <small className="text-[11px] text-white/80">{cartLabel}</small>
        </span>
      </button>
    </div>
  );
}
