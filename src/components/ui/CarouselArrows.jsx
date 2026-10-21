import { ChevronLeft, ChevronRight } from 'lucide-react';

// Setas dos carrosséis com trilha nativa (useCarouselTrack); só no desktop, onde não há toque para deslizar.
export default function CarouselArrows({ canScroll, onScroll, controls, previousLabel, nextLabel }) {
  return (
    <div className="hidden gap-2 lg:flex">
      <button
        type="button"
        onClick={() => onScroll(-1)}
        disabled={!canScroll.previous}
        aria-label={previousLabel}
        aria-controls={controls}
        className="chamfer hero-arrow showcase-arrow"
      >
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => onScroll(1)}
        disabled={!canScroll.next}
        aria-label={nextLabel}
        aria-controls={controls}
        className="chamfer hero-arrow showcase-arrow"
      >
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
