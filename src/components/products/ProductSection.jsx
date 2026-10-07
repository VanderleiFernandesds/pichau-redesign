import ProductCard from './ProductCard';

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
  emptyState,
  children,
}) {
  const hasProducts = products.length > 0;

  return (
    <section ref={ref} id={id}>
      <div className="mb-4 flex flex-col items-start justify-between gap-[15px] sm:mb-[22px] lg:flex-row lg:items-end">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-2 font-display text-[26px] leading-tight font-bold sm:text-[32px]">{title}</h2>
        </div>
        {action}
      </div>

      {children}

      {hasProducts ? (
        <div className="grid grid-cols-[repeat(2,1fr)] gap-2.5 sm:gap-3.5 lg:grid-cols-4 xl:grid-cols-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        emptyState
      )}
    </section>
  );
}
