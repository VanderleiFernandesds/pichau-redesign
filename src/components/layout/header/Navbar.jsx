import { Fragment, useEffect, useRef } from 'react';
import { ChevronDown, Cpu, Gamepad2, Headset, Menu, Tag, Ticket } from 'lucide-react';
import DepartmentMenu from './department-menu/DepartmentMenu';

// No mobile a lista rola dentro do painel, então o foco é desenhado para dentro para não ser cortado.
// No desktop cada item ganha uma moldura chanfrada (nav-frame), que fica vermelha no hover.
const navItemClass =
  'nav-item relative isolate flex min-h-11 w-full items-center gap-2 px-3 text-[13px] transition-colors hover:text-brand focus-visible:-outline-offset-3 lg:h-16 lg:whitespace-nowrap lg:after:hidden lg:focus-visible:outline-offset-4';
const centeredItemClass = 'lg:justify-center lg:px-4';
const frameClass = 'chamfer nav-frame hidden lg:block';
const activeClass =
  'text-brand after:absolute after:inset-y-2 after:left-0 after:w-0.5 after:bg-brand lg:after:inset-x-0 lg:after:top-auto lg:after:bottom-0 lg:after:h-0.5 lg:after:w-auto';
const iconClass = 'size-5';

export default function Navbar({
  isMenuOpen,
  onMenuOpenChange,
  isNavOpen,
  onNavOpenChange,
  onCoupon,
  onOpenDepartment,
}) {
  const departmentsButtonRef = useRef(null);

  // Com o menu de departamentos aberto, o Esc é do <dialog> dele; a lista do mobile continua aberta por baixo.
  useEffect(() => {
    if (!isNavOpen || isMenuOpen) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onNavOpenChange(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isNavOpen, onNavOpenChange]);

  function closeList() {
    onNavOpenChange(false);
  }

  function leaveDepartmentMenu() {
    onMenuOpenChange(false);
    closeList();
  }

  function openDepartment(department) {
    leaveDepartmentMenu();
    onOpenDepartment(department);
  }

  /*
    Os links levam a seções da mesma página, sem estado de "atual": marcar pelo #hash deixava o link
    vermelho mesmo depois de rolar para outra seção.
  */
  function renderSectionLink(href, label, Icon) {
    return (
      <a
        href={href}
        onClick={closeList}
        className={`${navItemClass} ${centeredItemClass} text-white/90`}
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
      // menu aberto clareia a moldura. O conteúdo fica à esquerda, e o pl-3 soma-se aos 12px da
      // moldura até o contorno para o ícone alinhar com o logo e o conteúdo da página.
      className={`nav-departments ${navItemClass} lg:pr-4 lg:pl-3 lg:font-semibold lg:text-white lg:hover:text-white ${isMenuOpen ? activeClass : 'text-white/90'}`}
      ref={departmentsButtonRef}
      aria-haspopup="dialog"
      aria-expanded={isMenuOpen}
      aria-controls="department-menu"
      onClick={() => onMenuOpenChange(true)}
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
      className={`${navItemClass} ${centeredItemClass} text-white/90`}
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
            {/* No desktop os itens dividem a linha, menos o Departamentos, que fica na largura do
                conteúdo. O primeiro e o último avançam sobre a margem da nav (lg:mx-6) até ficarem
                com a folga dos cantos do painel. */}
            <li
              className={`lg:flex ${index === 0 ? 'lg:-ml-3' : 'lg:flex-1'} ${index === navItems.length - 1 ? 'lg:-mr-3' : ''}`}
            >
              {navItem}
            </li>
          </Fragment>
        ))}
      </ul>

      <DepartmentMenu
        isOpen={isMenuOpen}
        onClose={() => onMenuOpenChange(false)}
        triggerRef={departmentsButtonRef}
        onOpenDepartment={openDepartment}
        onNavigate={leaveDepartmentMenu}
      />
    </nav>
  );
}
