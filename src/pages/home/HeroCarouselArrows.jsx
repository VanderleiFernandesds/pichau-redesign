import { ChevronLeft, ChevronRight } from 'lucide-react';

// Só abaixo de 1001px (o CSS esconde no desktop), no canto superior direito do card.
export default function HeroCarouselArrows({ onPrevious, onNext }) {
  return (
    <div className="hero-arrows">
      <button type="button" onClick={onPrevious} aria-label="Destaque anterior" className="chamfer hero-arrow">
        <ChevronLeft aria-hidden="true" className="size-5" />
      </button>
      <button type="button" onClick={onNext} aria-label="Próximo destaque" className="chamfer hero-arrow">
        <ChevronRight aria-hidden="true" className="size-5" />
      </button>
    </div>
  );
}
