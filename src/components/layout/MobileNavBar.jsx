import { Cpu, Heart, Menu, Search, User } from 'lucide-react';
import CountBadge from '../ui/CountBadge';
import { formatProductCount } from '../../utils/format';

/*
  Atalhos do celular (abaixo de 601px). Menu abre o menu de departamentos e a busca reaproveita o campo do header;
  favoritos e conta usam o mesmo estado das ações do header no tablet e no desktop. O carrinho
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
            Montar PC
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
              <CountBadge count={favoriteCount} className="absolute -top-2 -right-4" />
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
            aria-label="Conta: entrar ou cadastrar-se"
            className="mobile-nav-item"
          >
            <User aria-hidden="true" className="size-6" />
            Conta
          </button>
        </li>
      </ul>
    </nav>
  );
}
