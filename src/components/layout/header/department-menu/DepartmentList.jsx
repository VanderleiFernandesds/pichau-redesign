import { ChevronRight, Headset, Monitor, Search } from 'lucide-react';
import logo from '../../../../assets/logo-pichau.svg';

// O foco é desenhado para dentro: a lista rola e um outline externo seria cortado nas bordas.
const rowClass =
  'relative flex min-h-11 w-full items-center gap-3 px-3 text-left text-[14px] transition-colors hover:bg-white/5 focus-visible:-outline-offset-3';

export default function DepartmentList({
  groups,
  activeId,
  query,
  onQueryChange,
  onSelect,
  onHover,
  onHoverEnd,
  onNavigate,
  closeButton,
}) {
  return (
    <div className="department-menu-list min-h-0 w-full lg:w-85 lg:shrink-0">
      <div className="flex items-center justify-between px-5 pt-5">
        <img src={logo} alt="Pichau" width="412" height="97" className="h-5.5 w-auto" />
        {closeButton}
      </div>

      <div className="grid gap-3 px-5 pt-5">
        <a
          href="#builder"
          onClick={onNavigate}
          className="chamfer chamfer-accent flex h-11 items-center justify-center gap-2.5 text-[13px] font-bold tracking-[0.5px] uppercase"
        >
          <Monitor aria-hidden="true" className="size-5" strokeWidth={1.75} />
          Monte seu PC
        </a>

        <label className="chamfer chamfer-field flex h-11 items-center gap-2.5 px-3.5">
          <Search aria-hidden="true" className="size-4.5 shrink-0 text-white/70" strokeWidth={1.75} />
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar departamento"
            aria-label="Buscar departamento"
            className="min-w-0 flex-1 bg-transparent text-[14px] text-white outline-none placeholder:text-white/50"
          />
        </label>
      </div>

      <nav aria-label="Departamentos" className="mt-2 min-h-0 flex-1 overflow-y-auto px-3 pb-4">
        {groups.length === 0 && (
          <p className="px-3 pt-6 text-[14px] text-white/70">Nenhum departamento encontrado para “{query.trim()}”.</p>
        )}

        {groups.map((group, index) => (
          <section key={group.title} aria-labelledby={`department-group-${index}`}>
            <h3
              id={`department-group-${index}`}
              className="px-3 pt-5 pb-2 text-[11px] font-bold tracking-[1.5px] text-white/55 uppercase"
            >
              {group.title}
            </h3>
            <ul>
              {group.departments.map((department) => {
                const Icon = department.icon;
                const isActive = department.id === activeId;
                return (
                  <li key={department.id}>
                    {/* Selecionado: fundo vermelho suave e linha vermelha à esquerda. */}
                    <button
                      type="button"
                      onClick={() => onSelect(department.id)}
                      onPointerEnter={(event) => onHover(department.id, event)}
                      onPointerLeave={onHoverEnd}
                      aria-current={isActive ? 'true' : undefined}
                      aria-controls="department-detail"
                      className={`${rowClass} ${
                        isActive
                          ? 'bg-brand/15 text-white before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:bg-brand hover:bg-brand/20'
                          : 'text-white/90'
                      }`}
                    >
                      <Icon aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
                      <span className="flex-1">{department.name}</span>
                      <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-white/60" strokeWidth={1.75} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </nav>

      <div className="border-t border-white/10 px-3 py-2">
        <a href="#support" onClick={onNavigate} className={`${rowClass} text-white/90`}>
          <Headset aria-hidden="true" className="size-5 shrink-0" strokeWidth={1.5} />
          <span className="flex-1">Ajuda e atendimento</span>
          <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-white/60" strokeWidth={1.75} />
        </a>
      </div>
    </div>
  );
}
