import { Menu, X } from 'lucide-react';
import SearchForm from './SearchForm';
import HeaderActions from './HeaderActions';
import logo from '../../../assets/logo-pichau.svg';

export default function Header({
  query,
  onQueryChange,
  onSearch,
  isNavOpen,
  onNavOpenChange,
  onAccount,
  isFavoriteOnly,
  onToggleFavorites,
  cartCount,
  onOpenCart,
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5 px-(--box-padding) py-2.5 lg:h-18 lg:flex-nowrap lg:gap-5 lg:py-0">
      <a href="./" aria-label="Pichau início" className="shrink-0">
        <img
          src={logo}
          alt=""
          width="412"
          height="97"
          className="h-[22px] w-auto drop-shadow-[0_0_18px_#ed002466] sm:h-[25px] lg:h-[31px]"
        />
      </a>

      <span aria-hidden="true" className="header-slash" />

      {/* Abaixo de 1001px a busca desce para uma segunda linha, junto do botão que abre a navegação. */}
      <div className="order-last flex min-w-0 basis-full gap-2 lg:order-0 lg:basis-auto lg:flex-1">
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={isNavOpen}
          aria-controls="main-nav-list"
          onClick={() => onNavOpenChange(!isNavOpen)}
          className="chamfer chamfer-field grid size-11 shrink-0 place-items-center text-white transition-colors hover:text-brand lg:hidden"
        >
          {isNavOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
        </button>
        <SearchForm query={query} onQueryChange={onQueryChange} onSearch={onSearch} className="min-w-0 flex-1" />
      </div>

      <span aria-hidden="true" className="header-slash" />

      <HeaderActions
        onAccount={onAccount}
        isFavoriteOnly={isFavoriteOnly}
        onToggleFavorites={onToggleFavorites}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        className="ml-auto"
      />
    </div>
  );
}
