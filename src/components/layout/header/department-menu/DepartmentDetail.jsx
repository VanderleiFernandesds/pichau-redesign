import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import DepartmentLink from './DepartmentLink';

/*
  Subcategorias do departamento selecionado. No desktop é o painel da direita, ao lado da lista;
  no celular é o segundo nível, com "Voltar" e o fechar no topo.
*/
export default function DepartmentDetail({ department, titleRef, onBack, onOpen, closeButton }) {
  return (
    <section
      id="department-detail"
      aria-labelledby="department-detail-title"
      className="department-menu-detail min-h-0 min-w-0 flex-1 lg:border-l lg:border-white/10"
    >
      <div className="flex items-center justify-between px-5 pt-5 lg:hidden">
        <button
          type="button"
          onClick={onBack}
          className="-ml-2 flex min-h-11 items-center gap-1.5 px-2 text-[14px] text-white/90 hover:text-brand"
        >
          <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={1.75} />
          Voltar
        </button>
        {closeButton}
      </div>

      {department && (
        <div className="min-h-0 flex-1 overflow-y-auto px-5 pt-3 pb-8 lg:px-10 lg:pt-12">
          <p className="hidden text-[12px] tracking-[1.5px] text-white/50 uppercase lg:block">
            Departamentos <span aria-hidden="true" className="px-2">/</span>
            <span className="text-white/85">{department.name}</span>
          </p>

          <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 lg:mt-4">
            <div className="min-w-0">
              <h2
                id="department-detail-title"
                ref={titleRef}
                tabIndex={-1}
                className="font-display text-[30px] leading-tight font-bold outline-none lg:text-[40px]"
              >
                {department.name}
              </h2>
              <p className="mt-1 text-[14px] text-white/65 lg:text-[16px]">{department.description}</p>
            </div>
            <DepartmentLink
              department={department}
              onOpen={onOpen}
              className="mb-1 inline-flex min-h-11 items-center gap-2 text-[14px] text-brand underline-offset-4 hover:underline"
            >
              Ver todos <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
            </DepartmentLink>
          </div>

          <div className="mt-6 grid gap-x-10 gap-y-7 sm:grid-cols-2 lg:mt-10">
            {department.sections.map((section) => (
              <section key={section.title} aria-label={section.title}>
                <h3 className="px-2.5 pb-1.5 text-[13px] font-bold tracking-[1px] text-brand uppercase">{section.title}</h3>
                <ul>
                  {section.items.map((item) => (
                    <li key={item} className="border-b border-white/10">
                      <DepartmentLink
                        department={department}
                        onOpen={onOpen}
                        className="flex min-h-11 w-full items-center justify-between gap-3 px-2.5 text-left text-[14px] text-white/90 transition-colors hover:bg-white/5 hover:text-white focus-visible:-outline-offset-3"
                      >
                        {item}
                        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-white/60" strokeWidth={1.75} />
                      </DepartmentLink>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <DepartmentLink
            department={department}
            onOpen={onOpen}
            className="chamfer department-menu-cta mt-10 inline-flex h-12 items-center gap-4 px-6 text-[14px] font-bold text-brand"
          >
            Ver tudo em {department.name}
            <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.75} />
          </DepartmentLink>
        </div>
      )}
    </section>
  );
}
