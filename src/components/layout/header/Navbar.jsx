import { useEffect, useRef } from 'react';
import { ChevronDown, Cpu, Gamepad2, Headset, Menu, Tag, Ticket } from 'lucide-react';
import DepartmentMenu from './department-menu/DepartmentMenu';
import { useActiveSection } from '../../../hooks/useActiveSection';

// No tablet a lista rola dentro do painel, então o foco é desenhado para dentro para não ser cortado.
const navItemClass =
  'relative isolate flex min-h-11 w-full items-center gap-2 px-3 text-[13px] transition-colors hover:text-brand focus-visible:-outline-offset-3 lg:h-16 lg:whitespace-nowrap lg:focus-visible:outline-offset-4';
const centeredItemClass = 'lg:justify-center lg:px-4';
// Traço vermelho à esquerda no tablet e embaixo no desktop, sem moldura, para não pesar na linha.
const activeClass =
  'text-brand after:absolute after:inset-y-2 after:left-0 after:w-0.5 after:bg-brand lg:after:top-auto lg:after:bottom-3 lg:after:left-1/2 lg:after:h-0.5 lg:after:w-12 lg:after:-translate-x-1/2';
const iconClass = 'size-5';

const SECTION_LINKS = [
  { href: '#builder', label: 'Monte seu PC', Icon: Cpu },
  { href: '#offers', label: 'Ofertas', Icon: Tag },
  { href: '#choose', label: 'PCs gamers', Icon: Gamepad2 },
  { href: '#support', label: 'Atendimento', Icon: Headset },
];
const SECTION_IDS = SECTION_LINKS.map(({ href }) => href.slice(1));

export default function Navbar({
  isMenuOpen,
  onMenuOpenChange,
  isNavOpen,
  onNavOpenChange,
  onCoupon,
  onOpenDepartment,
}) {
  const departmentsButtonRef = useRef(null);
  const activeSectionId = useActiveSection(SECTION_IDS);

  // Com o menu de departamentos aberto, o Esc é do <dialog> dele; a lista do tablet continua aberta por baixo.
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

  function renderSectionLink({ href, label, Icon }) {
    const isActive = activeSectionId === href.slice(1);

    return (
      <a
        href={href}
        onClick={closeList}
        aria-current={isActive ? 'location' : undefined}
        className={`${navItemClass} ${centeredItemClass} ${isActive ? activeClass : 'text-text'}`}
      >
        <Icon aria-hidden="true" className={iconClass} />
        {label}
      </a>
    );
  }

  const [builderLink, offersLink, ...otherLinks] = SECTION_LINKS;

  const navItems = [
    <button
      type="button"
      // No desktop o botão é vermelho como o carrinho: o texto fica branco em todos os estados e o
      // menu aberto clareia a moldura. O conteúdo fica à esquerda, e o pl-3 soma-se aos 12px da
      // moldura até o contorno para o ícone alinhar com o logo e o conteúdo da página.
      className={`nav-departments ${navItemClass} lg:pr-4 lg:pl-3 lg:font-semibold lg:text-white lg:hover:text-white lg:after:hidden ${isMenuOpen ? activeClass : 'text-text'}`}
      ref={departmentsButtonRef}
      aria-haspopup="dialog"
      aria-expanded={isMenuOpen}
      aria-controls="department-menu"
      onClick={() => onMenuOpenChange(true)}
    >
      <span aria-hidden="true" className="chamfer chamfer-accent nav-frame hidden lg:block" />
      <Menu aria-hidden="true" className={iconClass} />
      Departamentos
      <ChevronDown aria-hidden="true" className={`size-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
    </button>,
    renderSectionLink(builderLink),
    renderSectionLink(offersLink),
    <button
      type="button"
      className={`${navItemClass} ${centeredItemClass} text-text`}
      onClick={() => {
        onCoupon();
        closeList();
      }}
    >
      <Ticket aria-hidden="true" className={iconClass} />
      Cupons
    </button>,
    ...otherLinks.map(renderSectionLink),
  ];

  return (
    // No tablet a lista abre pelo botão de menu do Header. No celular ela não aparece: o "Menu" da
    // barra inferior abre direto o menu de departamentos.
    <nav aria-label="Navegação principal" className="relative mx-3 sm:mx-4 lg:mx-6 lg:border-t lg:border-line">
      {/* A altura máxima impede que o painel sticky passe da tela em telas baixas. */}
      <ul
        id="main-nav-list"
        className={`${isNavOpen ? 'flex' : 'hidden'} max-h-[calc(100dvh-170px)] flex-col max-sm:hidden overflow-y-auto border-t border-line py-1 lg:flex lg:max-h-none lg:flex-row lg:items-center lg:gap-2 lg:overflow-visible lg:border-0 lg:py-0`}
      >
        {/* No desktop os itens dividem a linha, menos o Departamentos, que fica na largura do
            conteúdo e avança sobre a margem da nav (lg:mx-6) até a folga do canto do painel. */}
        {navItems.map((navItem, index) => (
          <li key={index} className={`lg:flex ${index === 0 ? 'lg:-ml-3' : 'lg:flex-1'}`}>
            {navItem}
          </li>
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
