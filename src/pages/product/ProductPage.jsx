import { useEffect, useRef } from 'react';
import {
  Armchair,
  Computer,
  Cpu,
  Gamepad2,
  Heart,
  House,
  Keyboard,
  Monitor,
  Package,
  Shirt,
  ShoppingCart,
  Zap,
} from 'lucide-react';
import StarRating from '../../components/ui/StarRating';
import CardQuantityControl from '../../components/products/CardQuantityControl';
import { animateAddToCart } from '../../utils/cartAnimation';
import { homePath } from '../../hooks/useRoute';
import ProductGallery from './ProductGallery';
import ProductPrice from './ProductPrice';
import ShippingEstimate from './ShippingEstimate';
import ProductTabs from './ProductTabs';

// Ícone dos destaques conforme a categoria; categorias novas caem no genérico.
const CATEGORY_ICONS = {
  Hardware: Cpu,
  Monitores: Monitor,
  Periféricos: Keyboard,
  Cadeiras: Armchair,
  Computadores: Computer,
  'Kit upgrade': Package,
  Games: Gamepad2,
  'Casa e lazer': House,
  Vestuário: Shirt,
  Energéticos: Zap,
};

/*
  Página única para todos os produtos, alimentada pelo produto da rota. Carrinho e favoritos são os
  mesmos da Home (vêm do Storefront). Os destaques são o `spec` do catálogo, separado em itens: é a
  única informação técnica que os dados têm. No celular tudo fica numa coluna, na ordem do DOM:
  galeria, título, avaliação, destaques, preço, compra e frete.
*/
export default function ProductPage({ product, quantity, isFavorite, onToggleFavorite, onAddToCart, onChangeQuantity, onOpenCategory }) {
  const titleRef = useRef(null);
  const imageRef = useRef(null);
  const addButtonRef = useRef(null);
  const plusButtonRef = useRef(null);
  const pendingFocusRef = useRef(null);
  const isInCart = quantity > 0;
  const highlights = product.spec.split(' · ');
  const HighlightIcon = CATEGORY_ICONS[product.category] ?? Package;

  // Ao abrir pelo site, o foco vai para o título: o leitor de tela anuncia a página nova.
  useEffect(() => {
    if (window.history.state?.isPush) titleRef.current?.focus({ preventScroll: true });
    const previousTitle = document.title;
    document.title = `${product.name} | Pichau — conceito de redesign`;
    return () => {
      document.title = previousTitle;
    };
  }, [product.id]);

  // Mesma troca de foco do card: o "+" ao entrar no carrinho, o botão de adicionar ao sair.
  useEffect(() => {
    if (!pendingFocusRef.current) return;
    pendingFocusRef.current.current?.focus();
    pendingFocusRef.current = null;
  }, [isInCart]);

  function handleAdd() {
    if (!onAddToCart(product.id)) return;
    if (!isInCart) pendingFocusRef.current = plusButtonRef;
    animateAddToCart(imageRef.current);
  }

  function handleDecrease() {
    if (quantity === 1) pendingFocusRef.current = addButtonRef;
    onChangeQuantity(product.id, -1);
  }

  return (
    <article aria-labelledby="product-title" className="wrap pt-[calc(var(--header-offset)+8px)] pb-12">
      <nav aria-label="Trilha de navegação" className="mb-4 px-(--box-padding)">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-soft">
          <li>
            <a href={homePath()} className="inline-flex min-h-8 items-center hover:text-brand hover:underline">
              Início
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <button
              type="button"
              onClick={() => onOpenCategory(product.category)}
              className="inline-flex min-h-8 items-center hover:text-brand hover:underline"
            >
              {product.category}
            </button>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="min-w-0 font-semibold wrap-break-word text-heading">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-10">
        <ProductGallery images={product.images} name={product.name} imageRef={imageRef} />

        <div className="flex min-w-0 flex-col gap-5">
          <div className="px-(--box-padding) lg:px-0">
            <h1
              ref={titleRef}
              id="product-title"
              tabIndex={-1}
              className="font-display text-[clamp(28px,7vw,44px)] leading-[1.05] font-bold wrap-break-word text-heading outline-none"
            >
              {product.name}
            </h1>
            <StarRating rating={product.rating} className="product-rating mt-3" />
            <p className="mt-3 text-[17px] leading-snug text-soft">
              <span className="sr-only">Destaques: </span>
              {highlights.join(' • ')}
            </p>
          </div>

          <div className="border-t border-line px-(--box-padding) pt-5 lg:px-0">
            <ProductPrice product={product} />
          </div>

          <div className="flex flex-col gap-3 px-(--box-padding) lg:px-0">
            {isInCart ? (
              <div className="product-page-quantity">
                <CardQuantityControl
                  product={product}
                  quantity={quantity}
                  plusRef={plusButtonRef}
                  onIncrease={handleAdd}
                  onDecrease={handleDecrease}
                />
              </div>
            ) : (
              <button
                ref={addButtonRef}
                type="button"
                onClick={handleAdd}
                className="chamfer chamfer-accent flex min-h-14 items-center justify-center gap-3 px-4 font-display text-[clamp(16px,5vw,19px)] font-bold tracking-[0.5px] text-white uppercase"
              >
                <ShoppingCart aria-hidden="true" className="size-6" />
                Adicionar ao carrinho
              </button>
            )}
            <button
              type="button"
              onClick={() => onToggleFavorite(product.id)}
              aria-pressed={isFavorite}
              className="chamfer chamfer-field flex min-h-12 items-center justify-center gap-2.5 px-4 text-[15px] font-semibold text-heading transition-colors hover:text-brand"
            >
              <Heart aria-hidden="true" className={`size-5 ${isFavorite ? 'fill-current text-brand' : ''}`} />
              Salvar nos favoritos
            </button>
          </div>

          <ShippingEstimate shipping={product.shipping} />
        </div>
      </div>

      <ProductTabs product={product} highlights={highlights} HighlightIcon={HighlightIcon} />

      <p className="mt-2 px-(--box-padding) text-right text-[12px] text-muted">
        Projeto conceito de estudo • Valores, condições e avaliações ilustrativos
      </p>
    </article>
  );
}
