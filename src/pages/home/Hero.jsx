import { ArrowUpRight, Settings } from 'lucide-react';
import HeroPanels from './HeroPanels';
import HeroCarouselControls from './HeroCarouselControls';
import { HERO_SLIDES } from '../../data/home';
import { useHeroCarousel } from '../../hooks/useHeroCarousel';

// Tempos do carrossel em ms; selectTransitionTime é o das trocas feitas por clique ou teclado.
const CAROUSEL_TIMING = { startDelay: 1500, readingTime: 7000, transitionTime: 500, selectTransitionTime: 200 };
const SLIDE_IDS = HERO_SLIDES.map((slide) => slide.id);

export default function Hero({ onFilter, children }) {
  const carousel = useHeroCarousel(SLIDE_IDS, CAROUSEL_TIMING);
  const { shownId } = carousel;

  function slideVisibility(slideId) {
    return slideId === shownId ? '' : 'invisible opacity-0';
  }

  return (
    // A seção ocupa a tela (com teto definido em .hero): o painel flutua no topo, os cards
    // ficam na base e o bloco do texto cresce para preencher o espaço entre eles.
    <section className="hero flex flex-col bg-[#050506] text-white">
      <div className="flex flex-1">
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Destaques"
          className="hero-carousel wrap grid w-full content-center items-center gap-x-10 pt-(--header-offset)"
          style={{ '--carousel-transition': `${carousel.transitionTime}ms` }}
          {...carousel.pauseHandlers}
        >
          {/*
            Os textos de todos os slides ocupam a mesma célula do grid, então a altura e a largura
            reservadas são as do maior deles e os botões não mudam de lugar entre slides.
          */}
          <div className="hero-copy max-w-[590px] py-(--hero-gap)">
            <div className="grid" aria-live={carousel.isRunning ? 'off' : 'polite'}>
              {HERO_SLIDES.map((slide) => (
                <div key={slide.id} className={`hero-fade col-start-1 row-start-1 ${slideVisibility(slide.id)}`}>
                  <span className="eyebrow text-[#e7a3ae]">{slide.eyebrow}</span>
                  <h1 className="my-4 font-display text-[clamp(32px,10.5vw,40px)] leading-[1] font-bold sm:my-5 sm:text-[50px] lg:text-[clamp(46px,7.2svh,60px)]">
                    {slide.title[0]}
                    <br />
                    <em className="text-brand not-italic">{slide.title[1]}</em>
                  </h1>
                  <p className="my-[1em] text-[14px] leading-[1.5] text-[#e1dfe3] sm:text-[18px]">
                    {slide.description[0]}
                    <br />
                    {slide.description[1]}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-(--hero-gap) flex flex-wrap gap-[9px] sm:gap-3.5">
              <div className="grid">
                {HERO_SLIDES.map(({ id, cta }) => (
                  <a
                    key={id}
                    href={cta.href}
                    onClick={cta.category ? () => onFilter(cta.category) : undefined}
                    className={`button hero-fade col-start-1 row-start-1 justify-between ${slideVisibility(id)}`}
                  >
                    {cta.label} <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                ))}
              </div>
              <a className="button border border-[#ffffff60] bg-[#ffffff10] hover:bg-[#bf001e]" href="#builder">
                <span className="inline-flex items-center gap-1.5">
                  <Settings aria-hidden="true" className="size-4" />
                  Monte seu PC
                </span>
              </a>
            </div>
          </div>

          <HeroPanels
            slides={HERO_SLIDES}
            order={carousel.order}
            shownId={shownId}
            isExpanded={carousel.isExpanded}
            hiddenIds={carousel.hiddenIds}
            onSelect={carousel.select}
          />

          <div className="hero-controls">
            <HeroCarouselControls
              slides={HERO_SLIDES}
              shownId={shownId}
              isPlaying={carousel.isPlaying}
              onSelect={carousel.select}
              onTogglePlaying={carousel.togglePlaying}
            />
          </div>
        </div>
      </div>

      <div className="wrap w-full pb-(--hero-gap)">{children}</div>
    </section>
  );
}
