import { Pause, Play } from 'lucide-react';

/*
  O indicador ativo é mais largo, além de vermelho, para não depender só da cor. No automático,
  ele vira a barra do tempo de leitura: o vermelho preenche o trilho e congela nas pausas.
*/
export default function HeroCarouselControls({
  slides,
  shownId,
  isPlaying,
  isProgressShown,
  isProgressPaused,
  readingTime,
  onSelect,
  onTogglePlaying,
}) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onTogglePlaying}
        aria-label={isPlaying ? 'Pausar destaques' : 'Retomar destaques'}
        title={isPlaying ? 'Pausar' : 'Retomar'}
        className="chamfer hero-control grid size-10 place-items-center text-heading"
      >
        {isPlaying ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
      </button>

      <div className="flex">
        {slides.map((slide, index) => {
          const isActive = slide.id === shownId;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(slide.id)}
              aria-label={`Destaque ${index + 1} de ${slides.length}: ${slide.name}`}
              aria-current={isActive ? 'true' : undefined}
              className="group grid h-10 min-w-10 place-items-center px-1"
            >
              <span
                aria-hidden="true"
                className={`relative h-1 overflow-hidden rounded-full transition-[width,background-color] duration-(--carousel-transition) ease-(--carousel-ease) ${
                  isActive ? `w-8 ${isProgressShown ? 'bg-brand/30' : 'bg-brand'}` : 'w-4 bg-[#4a4c54] group-hover:bg-[#8b8d95]'
                }`}
              >
                {isActive && isProgressShown && (
                  <span
                    className={`hero-progress ${isProgressPaused ? 'is-paused' : ''}`}
                    style={{ '--reading-time': `${readingTime}ms` }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
