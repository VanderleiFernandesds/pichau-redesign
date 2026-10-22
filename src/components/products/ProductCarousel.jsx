import { useId } from 'react';
import ProductCard from './ProductCard';
import CarouselArrows from '../ui/CarouselArrows';
import SectionDivider from '../ui/SectionDivider';
import { useCarouselTrack } from '../../hooks/useCarouselTrack';

// Fileiras do celular, cada uma com a própria trilha.
const MOBILE_ROWS = 4;

function splitIntoRows(products, rowCount) {
  const rowSize = Math.ceil(products.length / rowCount);
  return Array.from({ length: rowCount }, (_, index) => products.slice(index * rowSize, (index + 1) * rowSize)).filter(
    (row) => row.length > 0,
  );
}

function ProductTrackItems({ products, cardProps }) {
  const { favorites, cartQuantities, onToggleFavorite, onAddToCart, onChangeCartQuantity, onViewProduct } = cardProps;

  return products.map((product) => (
    <li key={product.id}>
      <ProductCard
        product={product}
        quantity={cartQuantities[product.id] ?? 0}
        isFavorite={favorites.includes(product.id)}
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
  card e meio por vez). A partir de 601px fica uma trilha só, de duas fileiras, com as setas. As
  duas versões ficam no DOM e o CSS mostra uma delas: a escondida (display: none) sai do Tab e da
  árvore de acessibilidade, e trocar de largura não perde as trilhas.
*/
export default function ProductCarousel({ eyebrow, title, products, ...cardProps }) {
  const { trackRef, canScroll, scrollByItem, revealFocusedItem } = useCarouselTrack();
  const trackId = useId();
  const mobileRows = splitIntoRows(products, MOBILE_ROWS);

  return (
    <section>
      <SectionDivider />
      <div className="mb-4 flex items-end justify-between gap-[15px] sm:mb-[22px]">
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

      <div className="grid gap-3 sm:hidden">
        {mobileRows.map((row, index) => (
          <MobileProductRow
            key={row[0].id}
            label={`${title}, fileira ${index + 1} de ${mobileRows.length}`}
            products={row}
            cardProps={cardProps}
          />
        ))}
      </div>

      <ul
        id={trackId}
        ref={trackRef}
        onFocus={revealFocusedItem}
        className="product-carousel-track max-sm:hidden"
        aria-label={title}
      >
        <ProductTrackItems products={products} cardProps={cardProps} />
      </ul>
    </section>
  );
}
