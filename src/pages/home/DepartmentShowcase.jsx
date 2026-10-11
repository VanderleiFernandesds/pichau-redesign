import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import DepartmentCard from './DepartmentCard';
import { SHOWCASE_DEPARTMENTS } from '../../data/departments';

/*
  Carrossel de departamentos. A rolagem é a nativa do navegador (com scroll-snap), então o toque
  no celular e a rolagem pelo trackpad funcionam sem código; as setas, só no desktop, andam um
  card por vez e ficam desabilitadas nas pontas.
*/
export default function DepartmentShowcase({ onOpenDepartment, onShowAll }) {
  const trackRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ previous: false, next: false });

  useEffect(() => {
    const track = trackRef.current;

    function updateArrows() {
      const maxScroll = track.scrollWidth - track.clientWidth;
      // 1px de tolerância: o scrollLeft pode vir fracionado com zoom.
      setCanScroll({ previous: track.scrollLeft > 1, next: track.scrollLeft < maxScroll - 1 });
    }

    updateArrows();
    track.addEventListener('scroll', updateArrows, { passive: true });
    const resizeObserver = new ResizeObserver(updateArrows);
    resizeObserver.observe(track);
    return () => {
      track.removeEventListener('scroll', updateArrows);
      resizeObserver.disconnect();
    };
  }, []);

  function scrollByCard(direction) {
    const track = trackRef.current;
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: 'smooth' });
  }

  return (
    // Mesmo cabeçalho das vitrines de produtos (eyebrow, título e ação à direita) e o mesmo espaçamento.
    <section aria-labelledby="department-showcase-title" className="department-showcase wrap pt-7 sm:pt-11">
      <div className="mb-4 flex flex-col items-start justify-between gap-[15px] sm:mb-[22px] lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow">DEPARTAMENTOS</span>
          <h2 id="department-showcase-title" className="mt-2 font-display text-[26px] leading-tight font-bold text-white sm:text-[32px]">
            Na Pichau Tem!
          </h2>
          <p className="mt-1 text-[13px] text-[#b8b9bf] sm:text-[14px]">Encontre o que você precisa para o seu setup</p>
        </div>

        <div className="flex items-center gap-5">
          <button type="button" onClick={onShowAll} className="inline-flex min-h-11 items-center gap-1 text-[12px] text-brand hover:underline">
            Ver todos os departamentos
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </button>

          <div className="hidden gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              disabled={!canScroll.previous}
              aria-label="Departamentos anteriores"
              aria-controls="department-showcase-track"
              className="chamfer hero-arrow showcase-arrow"
            >
              <ChevronLeft aria-hidden="true" className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              disabled={!canScroll.next}
              aria-label="Próximos departamentos"
              aria-controls="department-showcase-track"
              className="chamfer hero-arrow showcase-arrow"
            >
              <ChevronRight aria-hidden="true" className="size-5" />
            </button>
          </div>
        </div>
      </div>

      <ul id="department-showcase-track" ref={trackRef} className="department-showcase-track" aria-label="Departamentos">
        {SHOWCASE_DEPARTMENTS.map((department) => (
          <li key={department.id} className="flex">
            <DepartmentCard department={department} onOpen={onOpenDepartment} />
          </li>
        ))}
      </ul>
    </section>
  );
}
