import SearchForm from './SearchForm';
import HeaderActions from './HeaderActions';

export default function Header({ query, onQueryChange, onSearch, onAccount, isFavoriteOnly, onToggleFavorites, cartCount, onOpenCart }) {
  return (
    // O wrapper é transparente e ignora cliques para não bloquear o conteúdo nas laterais da barra.
    <header className="pointer-events-none sticky top-4 z-20 my-4">
      <div className="wrap">
        <div className="chamfer header-bar pointer-events-auto flex flex-wrap items-center gap-x-3 gap-y-2.5 px-3 py-2.5 sm:px-4 lg:h-18 lg:flex-nowrap lg:gap-4 lg:px-6 lg:py-0">
          <span aria-hidden="true" className="header-glow" />

          <a
            href="./"
            aria-label="Pichau início"
            className="text-[28px] leading-none font-black tracking-[-2px] sm:text-[32px] sm:tracking-[-2.5px] text-brand [text-shadow:0_0_18px_#ed002466] lg:text-[40px] lg:tracking-[-3px]"
          >
            Pichau
          </a>

          <span aria-hidden="true" className="header-slash" />

          {/* Abaixo de 1001px a busca desce para uma segunda linha ocupando toda a largura. */}
          <SearchForm
            query={query}
            onQueryChange={onQueryChange}
            onSearch={onSearch}
            className="order-last basis-full lg:order-0 lg:basis-auto lg:flex-1"
          />

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
      </div>
    </header>
  );
}
