import { Heart, ShoppingCart } from 'lucide-react';
import AccountMenu from '../../account/AccountMenu';
import CountBadge from '../../ui/CountBadge';
import { formatItemCount, formatProductCount } from '../../../utils/format';

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
  const cartLabel = formatItemCount(cartCount);
  const hasCartItems = cartCount > 0;

  return (
    <div className={`flex items-center gap-2 lg:gap-5 ${className}`}>
      <AccountMenu onOpenAuth={onOpenAuth} />

      <button
        type="button"
        onClick={onToggleFavorites}
        aria-pressed={isFavoriteOnly}
        aria-label={`Favoritos, ${formatProductCount(favoriteCount)}`}
        className={`${actionClass} max-sm:hidden lg:gap-5 ${isFavoriteOnly ? 'text-brand' : 'text-heading'}`}
      >
        {/* O contador fica no canto superior direito do coração, como o do carrinho. */}
        <span className="relative">
          <Heart aria-hidden="true" className={`size-5 ${isFavoriteOnly ? 'fill-brand' : ''}`} />
          <CountBadge count={favoriteCount} className="absolute -top-3 -right-4" />
        </span>
        <span className="hidden lg:inline">Favoritos</span>
      </button>

      {/*
        A quantidade fica num badge preso ao canto superior direito do ícone, então o botão tem a
        mesma largura com qualquer contagem; ele cresce para a esquerda e o gap-5 o separa do texto.
        O tom claro contrasta com o vermelho e com o verde, iguais nos dois temas. O chanfro recorta
        só os pseudo-elementos do botão; no celular o badge avança 12px (e não 16px) além do ícone
        para não entrar no canto cortado.
      */}
      <button
        type="button"
        onClick={onOpenCart}
        aria-label={`Abrir carrinho, ${cartLabel}`}
        data-cart-target
        className={`chamfer ${hasCartItems ? 'chamfer-success' : 'chamfer-accent'} header-cart relative ml-1 flex h-(--header-control) min-w-(--header-control) items-center justify-center gap-5 px-4 text-white lg:ml-0 lg:h-12 lg:px-5`}
      >
        <span className="relative">
          <ShoppingCart aria-hidden="true" className="size-5" />
          <CountBadge count={cartCount} tone="light" className="absolute -top-3 -right-3 sm:-right-4" />
        </span>
        <b className="text-[13px] tracking-[0.5px] uppercase max-sm:hidden">Carrinho</b>
      </button>
    </div>
  );
}
