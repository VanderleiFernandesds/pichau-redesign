import { Cpu, Heart, Menu, Search, User } from 'lucide-react';
import { formatProductCount } from '../../utils/format';

function CountBadge({ count }) {
  if (count === 0) return null;

  return (
    <i
      aria-hidden="true"
      className="absolute -top-1.5 -right-2.5 min-w-4 rounded-full bg-brand px-1 text-center text-[10px] leading-4 font-bold text-white not-italic"
    >
      {count}
    </i>
  );
}

/*
  Atalhos do celular (abaixo de 601px). Menu abre o menu de departamentos e a busca reaproveita o campo do header;
  favoritos e perfil usam o mesmo estado das ações do header no tablet e no desktop. O carrinho
  fica no header. O destaque
  do item ativo vem do CSS, pelos atributos aria-expanded e aria-pressed, então a aparência
  acompanha o estado anunciado aos leitores de tela.
*/
export default function MobileNavBar({
  isMenuOpen,
  onOpenMenu,
  onSearch,
  onNavigate,
  isFavoriteOnly,
  onToggleFavorites,
  favoriteCount,
  isAccountOpen,
  onOpenAccount,
}) {
  return (
    <nav aria-label="Atalhos" className="mobile-nav sm:hidden">
      <span aria-hidden="true" className="mobile-nav-accents" />
      <ul className="grid grid-cols-5">
        <li>
          <button
            type="button"
            onClick={onOpenMenu}
            aria-haspopup="dialog"
            aria-expanded={isMenuOpen}
            aria-controls="department-menu"
            className="mobile-nav-item"
          >
            <Menu aria-hidden="true" className="size-6" />
            Menu
          </button>
        </li>
        <li>
          <button type="button" onClick={onSearch} aria-controls="query" className="mobile-nav-item">
            <Search aria-hidden="true" className="size-6" />
            Busca
          </button>
        </li>
        <li>
          <a href="#builder" onClick={onNavigate} className="mobile-nav-item">
            <Cpu aria-hidden="true" className="size-6" />
            Monte seu PC
          </a>
        </li>
        <li>
          <button
            type="button"
            onClick={onToggleFavorites}
            aria-pressed={isFavoriteOnly}
            aria-label={`Favoritos, ${formatProductCount(favoriteCount)}`}
            className="mobile-nav-item"
          >
            <span className="relative">
              <Heart aria-hidden="true" className={`size-6 ${isFavoriteOnly ? 'fill-current' : ''}`} />
              <CountBadge count={favoriteCount} />
            </span>
            Favoritos
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={onOpenAccount}
            aria-haspopup="dialog"
            aria-expanded={isAccountOpen}
            aria-label="Perfil: entrar ou cadastrar-se"
            className="mobile-nav-item"
          >
            <User aria-hidden="true" className="size-6" />
            Perfil
          </button>
        </li>
      </ul>
    </nav>
  );
}
