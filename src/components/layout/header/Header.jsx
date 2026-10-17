import { Menu, Moon, Sun, X } from 'lucide-react';
import SearchForm from './SearchForm';
import HeaderActions from './HeaderActions';
import PichauLogo from '../../ui/PichauLogo';

const iconButtonClass =
  'chamfer chamfer-field grid size-(--header-control) shrink-0 place-items-center text-heading transition-colors hover:text-brand';

export default function Header({
  query,
  onQueryChange,
  onSearch,
  searchInputRef,
  isNavOpen,
  onNavOpenChange,
  onAccountOpen,
  isFavoriteOnly,
  onToggleFavorites,
  favoriteCount,
  cartCount,
  onOpenCart,
  theme,
  onToggleTheme,
}) {
  const isDark = theme === 'dark';

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-2.5 px-(--box-padding) min-[414px]:gap-x-3 py-2.5 lg:h-18 lg:flex-nowrap lg:gap-5 lg:py-0">
      {/* No celular o menu, os favoritos e o carrinho ficam na barra inferior (MobileNavBar). */}
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={isNavOpen}
        aria-controls="main-nav-list"
        onClick={() => onNavOpenChange(!isNavOpen)}
        className={`${iconButtonClass} max-sm:hidden lg:hidden`}
      >
        {isNavOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      <a href="./" aria-label="Pichau início" className="flex min-h-(--header-control) shrink-0 items-center">
        <PichauLogo className="h-[26px] w-auto drop-shadow-[0_0_18px_#ed002466] min-[360px]:h-[30px] [html[data-theme=light]_&]:drop-shadow-none lg:h-[38px]" />
      </a>

      {/* Abaixo de 1001px a busca ocupa sozinha a segunda linha. */}
      <SearchForm
        query={query}
        onQueryChange={onQueryChange}
        onSearch={onSearch}
        inputRef={searchInputRef}
        className="order-last min-w-0 basis-full lg:order-0 lg:basis-auto lg:flex-1"
      />

      {/*
        O ml-auto leva tema e ações para a direita do logo até 1000px; no desktop a busca já ocupa a
        sobra. O nome diz o que o clique faz; o ícone mostra o tema de destino.
      */}
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        title={isDark ? 'Modo claro' : 'Modo escuro'}
        className={`${iconButtonClass} ml-auto lg:ml-0 lg:size-12`}
      >
        {isDark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
      </button>

      <HeaderActions
        onAccountOpen={onAccountOpen}
        isFavoriteOnly={isFavoriteOnly}
        onToggleFavorites={onToggleFavorites}
        favoriteCount={favoriteCount}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
      />
    </div>
  );
}
