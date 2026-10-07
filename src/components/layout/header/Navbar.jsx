import { Fragment, useEffect, useState } from 'react';
import { ChevronDown, Cpu, Gamepad2, Headset, Menu, Tag, Ticket } from 'lucide-react';
import { DEPARTMENTS } from '../../../data/categories';

// No mobile a lista rola dentro do painel, então o foco é desenhado para dentro para não ser cortado.
const navItemClass =
  'relative flex min-h-11 w-full items-center gap-2 px-3 text-[13px] transition-colors hover:text-brand focus-visible:-outline-offset-3 lg:h-12 lg:w-auto lg:px-1 lg:focus-visible:outline-offset-4';
const activeClass =
  'text-brand after:absolute after:inset-y-2 after:left-0 after:w-0.5 after:bg-brand lg:after:inset-x-0 lg:after:top-auto lg:after:bottom-0 lg:after:h-0.5 lg:after:w-auto';
const iconClass = 'size-5';

export default function Navbar({ isMenuOpen, onMenuOpenChange, onFilter, onCoupon }) {
  const [isListOpen, setIsListOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(() => window.location.hash);

  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (!isMenuOpen && !isListOpen) return;

    function handleKeyDown(event) {
      if (event.key !== 'Escape') return;
      onMenuOpenChange(false);
      setIsListOpen(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isListOpen, onMenuOpenChange]);

  function closeList() {
    setIsListOpen(false);
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
        <Icon aria-hidden="true" className={iconClass} />
        {label}
      </a>
    );
  }

  const navItems = [
    <button
      type="button"
      className={`${navItemClass} ${isMenuOpen ? activeClass : 'text-white/90'}`}
      aria-expanded={isMenuOpen}
      aria-controls="department-menu"
      onClick={() => onMenuOpenChange(!isMenuOpen)}
    >
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
      <Ticket aria-hidden="true" className={iconClass} />
      Cupons
    </button>,
    renderSectionLink('#choose', 'PCs gamers', Gamepad2),
    renderSectionLink('#support', 'Atendimento', Headset),
  ];

  return (
    <nav aria-label="Navegação principal" className="relative mx-3 border-t border-white/10 sm:mx-4 lg:mx-6">
      <button
        type="button"
        aria-expanded={isListOpen}
        aria-controls="main-nav-list"
        onClick={() => setIsListOpen(!isListOpen)}
        className="flex h-11 w-full items-center gap-2 text-[13px] font-bold text-white transition-colors hover:text-brand focus-visible:-outline-offset-3 lg:hidden"
      >
        <Menu aria-hidden="true" className={iconClass} />
        Menu
        <ChevronDown aria-hidden="true" className={`ml-auto size-4 transition-transform ${isListOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* A altura máxima impede que o painel sticky passe da tela em celulares na horizontal. */}
      <ul
        id="main-nav-list"
        className={`${isListOpen ? 'flex' : 'hidden'} max-h-[calc(100dvh-260px)] flex-col overflow-y-auto border-t border-white/10 py-1 lg:flex lg:max-h-none lg:flex-row lg:items-center lg:justify-between lg:overflow-visible lg:border-0 lg:py-0`}
      >
        {navItems.map((navItem, index) => (
          <Fragment key={index}>
            {index > 0 && <li aria-hidden="true" className="header-slash" />}
            <li>{navItem}</li>
          </Fragment>
        ))}
      </ul>

      <div
        id="department-menu"
        hidden={!isMenuOpen}
        className="absolute top-full left-0 z-10 mt-3 w-full max-w-[320px] border border-white/10 bg-[#111216] p-2 text-white shadow-[0_16px_32px_#0008]"
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
