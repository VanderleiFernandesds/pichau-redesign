import { Menu, Moon, Sun, X } from 'lucide-react';
import SearchForm from './SearchForm';
import HeaderActions from './HeaderActions';
import PichauLogo from '../../ui/PichauLogo';

export default function Header({
  query,
  onQueryChange,
  onSearch,
  isNavOpen,
  onNavOpenChange,
  onAccount,
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
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={isNavOpen}
        aria-controls="main-nav-list"
        onClick={() => onNavOpenChange(!isNavOpen)}
        className="chamfer chamfer-field grid size-(--header-control) shrink-0 place-items-center text-heading transition-colors hover:text-brand lg:hidden"
      >
        {isNavOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
      </button>

      <a href="./" aria-label="Pichau início" className="flex min-h-(--header-control) shrink-0 items-center">
        <PichauLogo className="h-[18px] w-auto drop-shadow-[0_0_18px_#ed002466] min-[360px]:h-[26px] [html[data-theme=light]_&]:drop-shadow-none sm:h-[30px] lg:h-[38px]" />
      </a>

      {/* Abaixo de 1001px a busca ocupa sozinha a segunda linha. */}
      <SearchForm
        query={query}
        onQueryChange={onQueryChange}
        onSearch={onSearch}
        className="order-last min-w-0 basis-full lg:order-0 lg:basis-auto lg:flex-1"
      />

      {/*
        No celular o tema vai para o menu e as ações encostam à direita; no tablet o ml-auto as leva
        para a direita do logo, e no desktop a busca já ocupa a sobra. O nome diz o que o clique faz;
        o ícone mostra o tema de destino.
      */}
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        title={isDark ? 'Modo claro' : 'Modo escuro'}
        className="chamfer chamfer-field grid size-(--header-control) shrink-0 place-items-center text-heading transition-colors hover:text-brand max-sm:hidden sm:ml-auto lg:ml-0 lg:size-12"
      >
        {isDark ? <Sun aria-hidden="true" className="size-5" /> : <Moon aria-hidden="true" className="size-5" />}
      </button>

      <HeaderActions
        onAccount={onAccount}
        isFavoriteOnly={isFavoriteOnly}
        onToggleFavorites={onToggleFavorites}
        favoriteCount={favoriteCount}
        cartCount={cartCount}
        onOpenCart={onOpenCart}
        className="max-sm:ml-auto"
      />
    </div>
  );
}
