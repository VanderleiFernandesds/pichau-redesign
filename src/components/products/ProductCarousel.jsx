import { useId } from 'react';
import ProductCard from './ProductCard';
import CarouselArrows from '../ui/CarouselArrows';
import SectionDivider from '../ui/SectionDivider';
import { useCarouselTrack } from '../../hooks/useCarouselTrack';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useAfterPageLoad } from '../../hooks/useAfterPageLoad';

// Fileiras do celular, cada uma com a própria trilha.
const MOBILE_ROWS = 4;
// Mesma largura do breakpoint sm do tema (index.css), que troca as duas versões no CSS.
const MOBILE_MEDIA = '(width < 601px)';
/*
  Cards de cada trilha renderizados antes do load da página: um pouco mais do que cabe na tela (1,5
  por fileira no celular; até 5 colunas de 2 no desktop), para a trilha já nascer rolável. O
  restante entra depois do load, sem pesar no primeiro render.
*/
const INITIAL_MOBILE_ROW_ITEMS = 3;
const INITIAL_TRACK_ITEMS = 12;

function splitIntoRows(products, rowCount) {
  const rowSize = Math.ceil(products.length / rowCount);
  return Array.from({ length: rowCount }, (_, index) => products.slice(index * rowSize, (index + 1) * rowSize)).filter(
    (row) => row.length > 0,
  );
}

function ProductTrackItems({ products, cardProps }) {
  const { favorites, cartQuantities, isImageDeferred, onToggleFavorite, onAddToCart, onChangeCartQuantity, onViewProduct } =
    cardProps;

  return products.map((product) => (
    <li key={product.id}>
      <ProductCard
        product={product}
        quantity={cartQuantities[product.id] ?? 0}
        isFavorite={favorites.includes(product.id)}
        isImageDeferred={isImageDeferred}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onChangeQuantity={onChangeCartQuantity}
        onView={onViewProduct}
      />
    </li>
  ));
}

// Uma fileira do celular: trilha própria, que desliza sem mover as outras.
function MobileProductRow({ label, products, cardProps }) {
  const { trackRef, revealFocusedItem } = useCarouselTrack();

  return (
    <ul ref={trackRef} onFocus={revealFocusedItem} aria-label={label} className="product-carousel-track">
      <ProductTrackItems products={products} cardProps={cardProps} />
    </ul>
  );
}

/*
  No celular os produtos se dividem em fileiras independentes, cada uma com o seu carrossel (um
  card e meio por vez). A partir de 601px fica uma trilha só, de duas fileiras, com as setas. Só os
  cards da versão em uso são renderizados: com as duas, a página passava de 9 mil elementos, e o
  render e o layout iniciais pesavam no celular. A <ul> da trilha larga fica sempre montada (e
  escondida pelo CSS no celular), porque o useCarouselTrack prende os eventos nela uma vez só.
*/
export default function ProductCarousel({ eyebrow, title, products, ...props }) {
  const { trackRef, canScroll, scrollByItem, revealFocusedItem } = useCarouselTrack();
  const trackId = useId();
  const isMobile = useMediaQuery(MOBILE_MEDIA);
  const isPageLoaded = useAfterPageLoad();
  // Os cards renderizados antes do load também ficam sem foto até ele (ver ProductCard).
  const cardProps = { ...props, isImageDeferred: !isPageLoaded };
  const mobileRows = splitIntoRows(products, MOBILE_ROWS);
  const shownItems = (items, initialCount) => (isPageLoaded ? items : items.slice(0, initialCount));

  return (
    <section>
      <SectionDivider />
      <div className="mb-4 flex items-end justify-between gap-[15px] sm:mb-[22px] px-(--box-padding)">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 font-display text-[26px] leading-tight font-bold sm:text-[32px]">{title}</h2>
        </div>
        <CarouselArrows
          canScroll={canScroll}
          onScroll={scrollByItem}
          controls={trackId}
          previousLabel="Produtos anteriores"
          nextLabel="Próximos produtos"
        />
      </div>

      {isMobile && (
        <div className="grid gap-3 sm:hidden">
          {mobileRows.map((row, index) => (
            <MobileProductRow
              key={row[0].id}
              label={`${title}, fileira ${index + 1} de ${mobileRows.length}`}
              products={shownItems(row, INITIAL_MOBILE_ROW_ITEMS)}
              cardProps={cardProps}
            />
          ))}
        </div>
      )}

      <ul
        id={trackId}
        ref={trackRef}
        onFocus={revealFocusedItem}
        className="product-carousel-track max-sm:hidden"
        aria-label={title}
      >
        {!isMobile && <ProductTrackItems products={shownItems(products, INITIAL_TRACK_ITEMS)} cardProps={cardProps} />}
      </ul>
    </section>
  );
}
