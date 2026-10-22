import { useId } from 'react';
import ProductCard from './ProductCard';
import CarouselArrows from '../ui/CarouselArrows';
import SectionDivider from '../ui/SectionDivider';
import { useCarouselTrack } from '../../hooks/useCarouselTrack';

export default function ProductCarousel({ eyebrow, title, products, favorites, onToggleFavorite, onAddToCart, onViewProduct }) {
  const { trackRef, canScroll, scrollByItem, revealFocusedItem } = useCarouselTrack();
  const trackId = useId();

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

      <ul id={trackId} ref={trackRef} onFocus={revealFocusedItem} className="product-carousel-track" aria-label={title}>
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onView={onViewProduct}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
