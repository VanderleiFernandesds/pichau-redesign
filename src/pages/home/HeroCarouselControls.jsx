import { Pause, Play } from 'lucide-react';

/*
  O indicador ativo é mais largo, além de vermelho, para não depender só da cor. No automático,
  ele vira a barra do tempo de leitura: o vermelho preenche o trilho e congela nas pausas.
  Abaixo de 1001px a moldura do grupo some e a pausa ganha a própria (.hero-toggle), como as
  setas; os indicadores ficam centralizados na faixa e todos os botões passam a ter 44px.
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
    <div className="chamfer hero-control flex w-fit items-center pr-2 max-lg:pr-0">
      <button
        type="button"
        onClick={onTogglePlaying}
        aria-label={isPlaying ? 'Pausar destaques' : 'Retomar destaques'}
        title={isPlaying ? 'Pausar' : 'Retomar'}
        className="chamfer hero-toggle grid size-10 shrink-0 place-items-center text-heading transition-colors hover:text-brand focus-visible:-outline-offset-4 max-lg:size-11"
      >
        {isPlaying ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
      </button>

      <div className="mx-auto flex">
        {slides.map((slide, index) => {
          const isActive = slide.id === shownId;

          return (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(slide.id)}
              aria-label={`Destaque ${index + 1} de ${slides.length}: ${slide.name}`}
              aria-current={isActive ? 'true' : undefined}
              className="group grid h-10 min-w-10 place-items-center px-1 max-lg:h-11 max-lg:min-w-11"
            >
              <span
                aria-hidden="true"
                className={`relative h-1.5 overflow-hidden rounded-full transition-[width,background-color] duration-(--carousel-transition) ease-(--carousel-ease) ${
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
