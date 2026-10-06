import { Heart, ShoppingCart, User } from 'lucide-react';

// Abaixo de 1001px conta e favoritos ficam só com ícone; o aria-label mantém o nome acessível.
const actionClass =
  'chamfer chamfer-field flex h-11 w-11 items-center justify-center gap-2 text-[13px] font-bold text-white lg:h-12 lg:w-auto lg:px-4';

export default function HeaderActions({ onAccount, isFavoriteOnly, onToggleFavorites, cartCount, onOpenCart, className = '' }) {
  const cartLabel = `${cartCount} ${cartCount === 1 ? 'produto' : 'produtos'}`;

  return (
    <div className={`flex items-center gap-1.5 sm:gap-2.5 lg:gap-3 ${className}`}>
      <button type="button" onClick={onAccount} aria-label="Minha Conta" className={actionClass}>
        <User aria-hidden="true" className="size-5" />
        <span className="hidden lg:inline">Minha Conta</span>
      </button>

      <span aria-hidden="true" className="header-slash" />

      <button
        type="button"
        onClick={onToggleFavorites}
        aria-pressed={isFavoriteOnly}
        aria-label="Favoritos"
        className={`${actionClass} ${isFavoriteOnly ? 'is-active' : ''}`}
      >
        <Heart aria-hidden="true" className={`size-5 ${isFavoriteOnly ? 'fill-brand text-brand' : ''}`} />
        <span className="hidden lg:inline">Favoritos</span>
      </button>

      <button
        type="button"
        onClick={onOpenCart}
        aria-label={`Carrinho, ${cartLabel}`}
        className="chamfer chamfer-accent flex h-11 items-center gap-2.5 px-3 text-white sm:px-4 lg:h-12 lg:px-5"
      >
        <span className="relative">
          <ShoppingCart aria-hidden="true" className="size-5 lg:size-6" />
          <i className="absolute -top-2 -right-2.5 rounded-full bg-white px-[5px] py-px text-[10px] font-bold text-brand not-italic sm:hidden">
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
