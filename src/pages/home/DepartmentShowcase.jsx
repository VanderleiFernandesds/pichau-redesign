import { ArrowUpRight } from 'lucide-react';
import CarouselArrows from '../../components/ui/CarouselArrows';
import DepartmentCard from './DepartmentCard';
import { SHOWCASE_DEPARTMENTS } from '../../data/departments';
import { useCarouselTrack } from '../../hooks/useCarouselTrack';

export default function DepartmentShowcase({ onOpenDepartment, onShowAll }) {
  const { trackRef, canScroll, scrollByItem, revealFocusedItem } = useCarouselTrack();

  return (
    <section aria-labelledby="department-showcase-title" className="department-showcase wrap pt-7 sm:pt-11">
      <div className="mb-4 flex flex-col items-start justify-between gap-[15px] sm:mb-[22px] lg:flex-row lg:items-end">
        <div>
          <h2 id="department-showcase-title" className="font-display text-[26px] leading-tight font-bold text-heading sm:text-[32px]">
            Na Pichau Tem!
          </h2>
          <p className="mt-1 text-[13px] text-soft sm:text-[14px]">Encontre o que você precisa para o seu setup</p>
        </div>

        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={onShowAll}
            className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-semibold text-heading underline-offset-4 transition-colors hover:text-brand hover:underline"
          >
            Ver todos os departamentos
            <ArrowUpRight aria-hidden="true" className="size-4 text-brand" />
          </button>

          <CarouselArrows
            canScroll={canScroll}
            onScroll={scrollByItem}
            controls="department-showcase-track"
            previousLabel="Departamentos anteriores"
            nextLabel="Próximos departamentos"
          />
        </div>
      </div>

      <ul
        id="department-showcase-track"
        ref={trackRef}
        onFocus={revealFocusedItem}
        className="department-showcase-track"
        aria-label="Departamentos"
      >
        {SHOWCASE_DEPARTMENTS.map((department) => (
          <li key={department.id} className="flex">
            <DepartmentCard department={department} onOpen={onOpenDepartment} />
          </li>
        ))}
      </ul>
    </section>
  );
}
