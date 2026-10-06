import { Headset, Heart, Search, ShoppingCart } from 'lucide-react';

export default function Header({ query, onQueryChange, onSearch, isFavoriteOnly, onToggleFavorites, cartCount, onOpenCart }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <>
      <div className="bg-[#f5f6f8] py-[9px] text-[9px] text-[#555] sm:text-[11px]">
        <div className="wrap flex justify-between">
          <span className="inline-flex items-center gap-1">
            <Headset aria-hidden="true" className="size-3 sm:size-3.5" />
            Atendimento ao cliente <b className="ml-[18px] hidden font-normal sm:inline">Seg a sex: 9h às 18h</b>
          </span>
          <span className="hidden sm:inline">Conceito independente · preços ilustrativos</span>
        </div>
      </div>

      <header className="sticky top-0 z-20 border-b border-line bg-white">
        <div className="wrap grid min-h-[120px] grid-cols-[1fr_auto] items-center gap-3 py-3 sm:flex sm:h-[94px] sm:min-h-0 sm:gap-[22px] sm:py-0 lg:gap-10">
          <a href="./" className="text-[36px] font-black tracking-[-3px] text-brand sm:text-[47px]" aria-label="Pichau início">
            Pichau
          </a>

          <form
            role="search"
            onSubmit={handleSubmit}
            className="col-span-full row-start-2 flex flex-1 items-center gap-3 rounded-md border border-[#e4e6eb] bg-[#f5f6f8] py-1 pr-1.5 pl-2.5 sm:py-2 sm:pr-2.5 sm:pl-[18px]"
          >
            <label className="sr-only" htmlFor="query">
              Buscar produtos
            </label>
            <Search aria-hidden="true" className="size-6" />
            <input
              id="query"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Busque por produto, marca ou modelo"
              autoComplete="off"
              className="min-w-0 flex-1 border-0 bg-transparent p-2 text-[12px] outline-0 sm:text-[14px]"
            />
            <button className="rounded-sm bg-brand p-3 text-[12px] text-white">
              Buscar
            </button>
          </form>

          <div className="flex gap-5 sm:gap-6">
            {/* Abaixo de 1001px os textos somem e os botões ficam só com ícone; o aria-label mantém o nome acessível. */}
            <button
              type="button"
              onClick={onToggleFavorites}
              aria-pressed={isFavoriteOnly}
              aria-label="Favoritos"
              className="flex items-center gap-[7px]"
            >
              <Heart aria-hidden="true" className={`size-6 ${isFavoriteOnly ? 'fill-brand text-brand' : ''}`} />
              <small className="hidden text-[12px] lg:inline">Favoritos</small>
            </button>
            <button type="button" onClick={onOpenCart} aria-label={`Carrinho, ${cartCount} itens`} className="flex items-center gap-3">
              <span className="relative">
                <ShoppingCart aria-hidden="true" className="size-6" />
                <i className="absolute -top-2 -right-2.5 rounded-full bg-brand px-[5px] py-[3px] text-[10px] text-white not-italic">
                  {cartCount}
                </i>
              </span>
              <small className="hidden text-[12px] lg:inline">Carrinho</small>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
