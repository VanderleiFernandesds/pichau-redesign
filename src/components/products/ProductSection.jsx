import ProductCard from './ProductCard';
import SectionDivider from '../ui/SectionDivider';
import { useCarouselTrack } from '../../hooks/useCarouselTrack';

export default function ProductSection({
  ref,
  id,
  eyebrow,
  title,
  action,
  products,
  favorites,
  onToggleFavorite,
  onAddToCart,
  cartQuantities,
  onChangeCartQuantity,
  onViewProduct,
  emptyState,
  children,
}) {
  const hasProducts = products.length > 0;
  const { trackRef, revealFocusedItem } = useCarouselTrack();

  return (
    <section ref={ref} id={id}>
      <SectionDivider />
      <div className="mb-4 flex flex-col items-start justify-between gap-[15px] sm:mb-[22px] lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 font-display text-[26px] leading-tight font-bold sm:text-[32px]">{title}</h2>
        </div>
        {action}
      </div>

      {children}

      {/*
        No celular, a trilha que desliza do ProductCarousel (um card e meio por vez); a partir de
        601px, a grade de sempre (.offers-track e as classes sm:).
      */}
      {hasProducts ? (
        <ul
          ref={trackRef}
          onFocus={revealFocusedItem}
          aria-label={title}
          className="product-carousel-track offers-track sm:grid-flow-row sm:grid-cols-2 sm:grid-rows-none sm:gap-4 sm:overflow-visible lg:grid-cols-4 min-[1640px]:grid-cols-5"
        >
          {products.map((product) => (
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
          ))}
        </ul>
      ) : (
        emptyState
      )}

    </section>
  );
}
