import HeroCampaignCopy from './HeroCampaignCopy';
import HeroPanels from './HeroPanels';
import HeroCarouselControls from './HeroCarouselControls';
import HeroCarouselArrows from './HeroCarouselArrows';
import { HERO_SLIDES } from '../../data/heroCampaigns';
import { useHeroCarousel } from '../../hooks/useHeroCarousel';

// Tempos do carrossel em ms; selectTransitionTime é o das trocas feitas por clique ou teclado.
const CAROUSEL_TIMING = { startDelay: 1500, readingTime: 7000, transitionTime: 500, selectTransitionTime: 450 };
const SLIDE_IDS = HERO_SLIDES.map((slide) => slide.id);

export default function Hero({ onFilter, children }) {
  const carousel = useHeroCarousel(SLIDE_IDS, CAROUSEL_TIMING);
  const { shownId } = carousel;

  // Segue a ordem das campanhas (a dos indicadores) e dá a volta nas pontas.
  function selectSibling(step) {
    const index = SLIDE_IDS.indexOf(shownId);
    carousel.select(SLIDE_IDS[(index + step + SLIDE_IDS.length) % SLIDE_IDS.length]);
  }

  return (
    // A seção ocupa a tela (com teto definido em .hero): o painel flutua no topo, os cards
    // ficam na base e o bloco do texto cresce para preencher o espaço entre eles.
    <section className="hero flex flex-col bg-ink text-white">
      <div className="flex flex-1">
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Destaques"
          className="hero-carousel wrap grid w-full content-center items-center gap-x-10 pt-(--header-offset)"
          style={{ "--carousel-transition": `${carousel.transitionTime}ms` }}
          {...carousel.pauseHandlers}
        >
          <HeroCampaignCopy
            campaigns={HERO_SLIDES}
            shownId={shownId}
            isAnnounced={!carousel.isRunning}
            onFilter={onFilter}
          />

          <HeroPanels
            slides={HERO_SLIDES}
            order={carousel.order}
            shownId={shownId}
            isExpanded={carousel.isExpanded}
            isJumping={carousel.isJumping}
            hiddenIds={carousel.hiddenIds}
            objectsHiddenIds={carousel.objectsHiddenIds}
            onSelect={carousel.select}
          />

          <HeroCarouselArrows onPrevious={() => selectSibling(-1)} onNext={() => selectSibling(1)} />

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
