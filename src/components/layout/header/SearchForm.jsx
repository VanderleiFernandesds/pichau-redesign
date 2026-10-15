import { Search } from 'lucide-react';

export default function SearchForm({ query, onQueryChange, onSearch, inputRef, className = '' }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <form role="search" onSubmit={handleSubmit} className={`chamfer chamfer-field flex h-11 items-center gap-2 pr-1 pl-4 lg:h-12 ${className}`}>
      <label className="sr-only" htmlFor="query">
        Buscar produtos
      </label>
      {/* 16px no mobile evita o zoom automático do iOS ao focar o campo. */}
      <input
        ref={inputRef}
        id="query"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="O que você está procurando?"
        autoComplete="off"
        className="h-full min-w-0 flex-1 bg-transparent text-base text-heading outline-0 placeholder:text-muted lg:text-[14px]"
      />
      <span aria-hidden="true" className="h-6 w-px shrink-0 bg-brand/60" />
      <button type="submit" aria-label="Buscar" className="grid size-10 shrink-0 place-items-center text-brand transition-colors hover:text-heading">
        <Search aria-hidden="true" className="size-5" />
      </button>
    </form>
  );
}
