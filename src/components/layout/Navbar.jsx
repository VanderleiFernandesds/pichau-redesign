import { useEffect } from 'react';
import { ChevronDown, Cpu, Gamepad2, Headset, Menu, Tag, Ticket } from 'lucide-react';
import { DEPARTMENTS } from '../../data/categories';

const navItemClass = 'inline-flex items-center gap-1.5 py-3.5 hover:bg-[#bd0020] sm:px-2.5 sm:py-4';
const iconClass = 'size-4';

export default function Navbar({ isMenuOpen, onMenuOpenChange, onFilter, onCoupon }) {
  useEffect(() => {
    if (!isMenuOpen) return;

    function handleKeyDown(event) {
      if (event.key === 'Escape') onMenuOpenChange(false);
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, onMenuOpenChange]);

  return (
    <nav className="relative z-[15] bg-brand text-white">
      <div className="wrap flex min-h-[45px] items-center justify-start gap-3 overflow-x-auto text-[12px] font-bold whitespace-nowrap sm:min-h-[51px] sm:justify-between sm:gap-0 sm:overflow-visible sm:whitespace-normal lg:text-[13px]">
        <button
          type="button"
          className={navItemClass}
          aria-expanded={isMenuOpen}
          aria-controls="department-menu"
          onClick={() => onMenuOpenChange(!isMenuOpen)}
        >
          <Menu aria-hidden="true" className={iconClass} />
          Departamentos
          <ChevronDown aria-hidden="true" className={`${iconClass} transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>
        <a href="#builder" className={navItemClass}>
          <Cpu aria-hidden="true" className={iconClass} />
          Monte seu PC
        </a>
        <a href="#offers" className={navItemClass}>
          <Tag aria-hidden="true" className={iconClass} />
          Ofertas
        </a>
        <button type="button" className={navItemClass} onClick={onCoupon}>
          <Ticket aria-hidden="true" className={iconClass} />
          Cupons
        </button>
        <a href="#choose" className={navItemClass}>
          <Gamepad2 aria-hidden="true" className={iconClass} />
          PCs gamers
        </a>
        <a href="#support" className={navItemClass}>
          <Headset aria-hidden="true" className={iconClass} />
          Atendimento
        </a>
      </div>

      <div
        id="department-menu"
        hidden={!isMenuOpen}
        className="absolute top-full right-0 left-0 mr-auto ml-[max(24px,calc(var(--container-start)))] max-w-[450px] bg-white px-4 text-ink shadow-[0_12px_30px_#0002] sm:p-5"
      >
        {DEPARTMENTS.map((department) => (
          <button
            key={department}
            type="button"
            onClick={() => onFilter(department)}
            className="block w-full bg-white p-3.5 text-left hover:bg-[#f5f6f8]"
          >
            {department}
          </button>
        ))}
      </div>
    </nav>
  );
}
