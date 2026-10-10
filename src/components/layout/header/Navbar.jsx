import { Fragment, useEffect, useState } from 'react';
import { ChevronDown, Cpu, Gamepad2, Headset, Menu, Tag, Ticket } from 'lucide-react';
import { DEPARTMENTS } from '../../../data/categories';

// No mobile a lista rola dentro do painel, então o foco é desenhado para dentro para não ser cortado.
// No desktop cada item ganha uma moldura chanfrada (nav-frame), que também marca o item ativo.
const navItemClass =
  'nav-item relative isolate flex min-h-11 w-full items-center gap-2 px-3 text-[13px] transition-colors hover:text-brand focus-visible:-outline-offset-3 lg:h-16 lg:justify-center lg:px-4 lg:whitespace-nowrap lg:after:hidden lg:focus-visible:outline-offset-4';
const frameClass = 'chamfer nav-frame hidden lg:block';
const activeClass =
  'text-brand after:absolute after:inset-y-2 after:left-0 after:w-0.5 after:bg-brand lg:after:inset-x-0 lg:after:top-auto lg:after:bottom-0 lg:after:h-0.5 lg:after:w-auto';
const iconClass = 'size-5';

export default function Navbar({ isMenuOpen, onMenuOpenChange, isNavOpen, onNavOpenChange, onFilter, onCoupon }) {
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen && !isNavOpen) return;

    function handleKeyDown(event) {
      if (event.key !== 'Escape') return;
      onMenuOpenChange(false);
      onNavOpenChange(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isNavOpen, onMenuOpenChange, onNavOpenChange]);

  function closeList() {
    onNavOpenChange(false);
  }

  function renderSectionLink(href, label, Icon) {
    const isActive = currentHash === href;

    return (
      <a
        href={href}
        onClick={closeList}
        aria-current={isActive ? 'location' : undefined}
        className={`${navItemClass} ${isActive ? activeClass : 'text-white/90'}`}
      >
        <span aria-hidden="true" className={`${frameClass} chamfer-field`} />
        <Icon aria-hidden="true" className={iconClass} />
        {label}
      </a>
    );
  }

  const navItems = [
    <button
      type="button"
      // No desktop o botão é vermelho como o carrinho: o texto fica branco em todos os estados e o
      // menu aberto clareia a moldura.
      className={`nav-departments ${navItemClass} lg:font-semibold lg:text-white lg:hover:text-white ${isMenuOpen ? activeClass : 'text-white/90'}`}
      aria-expanded={isMenuOpen}
      aria-controls="department-menu"
      onClick={() => onMenuOpenChange(!isMenuOpen)}
    >
      <span aria-hidden="true" className={`${frameClass} chamfer-accent`} />
      <Menu aria-hidden="true" className={iconClass} />
      Departamentos
      <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
    </button>,
    renderSectionLink('#builder', 'Monte seu PC', Cpu),
    renderSectionLink('#offers', 'Ofertas', Tag),
    <button
      type="button"
      className={`${navItemClass} text-white/90`}
      onClick={() => {
        onCoupon();
        closeList();
      }}
    >
      <span aria-hidden="true" className={`${frameClass} chamfer-field`} />
      <Ticket aria-hidden="true" className={iconClass} />
      Cupons
    </button>,
    renderSectionLink('#choose', 'PCs gamers', Gamepad2),
    renderSectionLink('#support', 'Atendimento', Headset),
  ];

  return (
    // Abaixo de 1001px a lista abre pelo botão de menu do Header, ao lado da busca.
    <nav aria-label="Navegação principal" className="relative mx-3 sm:mx-4 lg:mx-6 lg:border-t lg:border-white/10">
      {/* A altura máxima impede que o painel sticky passe da tela em celulares na horizontal. */}
      <ul
        id="main-nav-list"
        className={`${isNavOpen ? 'flex' : 'hidden'} max-h-[calc(100dvh-170px)] flex-col overflow-y-auto border-t border-white/10 py-1 lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-2 lg:overflow-visible lg:border-0 lg:py-0`}
      >
        {navItems.map((navItem, index) => (
          <Fragment key={index}>
            {index > 0 && <li aria-hidden="true" className="header-slash" />}
            {/* No desktop os itens dividem a linha; o primeiro e o último avançam sobre a margem da nav
                (lg:mx-6) até ficarem com a folga dos cantos do painel. */}
            <li
              className={`lg:flex lg:flex-1 ${index === 0 ? 'lg:-ml-3' : ''} ${index === navItems.length - 1 ? 'lg:-mr-3' : ''}`}
            >
              {navItem}
            </li>
          </Fragment>
        ))}
      </ul>

      <div
        id="department-menu"
        hidden={!isMenuOpen}
        className="absolute top-full left-0 z-10 mt-3 w-full max-w-[320px] lg:-left-3 border border-white/10 bg-[#111216] p-2 text-white shadow-[0_16px_32px_#0008]"
      >
        {DEPARTMENTS.map((department) => (
          <button
            key={department}
            type="button"
            onClick={() => {
              onFilter(department);
              closeList();
            }}
            className="block min-h-11 w-full px-3 text-left text-[13px] transition-colors hover:bg-white/5 hover:text-brand focus-visible:-outline-offset-3"
          >
            {department}
          </button>
        ))}
      </div>
    </nav>
  );
}
