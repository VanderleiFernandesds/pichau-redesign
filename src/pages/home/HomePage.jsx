import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Header from '../../components/layout/header/Header';
import Navbar from '../../components/layout/header/Navbar';
import SiteHeader from '../../components/layout/header/SiteHeader';
import Footer from '../../components/layout/Footer';
import ProductSection from '../../components/products/ProductSection';
import CartModal from '../../components/cart/CartModal';
import EmptyState from '../../components/ui/EmptyState';
import Toast from '../../components/ui/Toast';
import Hero from './Hero';
import PurposeCards from './PurposeCards';
import OfferTabs from './OfferTabs';
import BuilderBanner from './BuilderBanner';
import Benefits from './Benefits';
import ConfigModal from './ConfigModal';
import { products } from '../../data/products';
import { ALL_CATEGORIES } from '../../data/categories';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { useToast } from '../../hooks/useToast';

const NEW_PRODUCTS = products.slice(4);

// Carrinho e favoritos são instanciados só aqui e repassados por props,
// garantindo uma única fonte de estado para header, vitrines e modal.
export default function HomePage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [isFavoriteOnly, setIsFavoriteOnly] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const offersRef = useRef(null);

  const cart = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const toast = useToast();

  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  const filteredProducts = products.filter(
    (product) =>
      (category === ALL_CATEGORIES || product.category === category) &&
      (!isFavoriteOnly || favorites.includes(product.id)) &&
      `${product.name} ${product.spec}`.toLocaleLowerCase('pt-BR').includes(normalizedQuery),
  );
  const hasActiveFilter = normalizedQuery !== '' || category !== ALL_CATEGORIES || isFavoriteOnly;

  function scrollToOffers() {
    offersRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function filterByCategory(nextCategory) {
    setCategory(nextCategory);
    setIsFavoriteOnly(false);
    setIsMenuOpen(false);
    scrollToOffers();
  }

  function resetFilters() {
    setQuery('');
    filterByCategory(ALL_CATEGORIES);
  }

  function toggleFavoriteOnly() {
    setIsFavoriteOnly((current) => !current);
    setCategory(ALL_CATEGORIES);
    scrollToOffers();
  }

  function addToCart(id) {
    cart.addItem(id);
    toast.showToast('Produto adicionado ao carrinho');
  }

  function selectGoal(goalCategory) {
    setIsConfigOpen(false);
    filterByCategory(goalCategory);
    toast.showToast('Explore os componentes para o seu objetivo');
  }

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2.5 focus:left-2.5 focus:z-[100] focus:bg-white focus:p-[15px]"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader>
        <Header
          query={query}
          onQueryChange={setQuery}
          onSearch={scrollToOffers}
          isNavOpen={isNavOpen}
          onNavOpenChange={setIsNavOpen}
          onAccount={() => toast.showToast('Conceito demonstrativo: área do cliente indisponível.')}
          isFavoriteOnly={isFavoriteOnly}
          onToggleFavorites={toggleFavoriteOnly}
          cartCount={cart.itemCount}
          onOpenCart={() => setIsCartOpen(true)}
        />
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          isNavOpen={isNavOpen}
          onNavOpenChange={setIsNavOpen}
          onFilter={filterByCategory}
          onCoupon={() => toast.showToast('Conceito demonstrativo: nenhum cupom real disponível.')}
          onDepartmentUnavailable={() => toast.showToast('Conceito demonstrativo: departamento ainda sem produtos.')}
        />
      </SiteHeader>

      <main id="main" className="bg-white">
        <Hero onFilter={filterByCategory}>
          <PurposeCards onFilter={filterByCategory} />
        </Hero>
        <div className="wrap pt-7 sm:pt-11">

          <ProductSection
            ref={offersRef}
            id="offers"
            eyebrow="ESCOLHAS PARA O SEU SETUP"
            title={isFavoriteOnly ? 'Seus favoritos' : 'Ofertas em destaque'}
            action={<OfferTabs activeCategory={category} onSelect={filterByCategory} />}
            products={filteredProducts}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
            emptyState={
              <EmptyState
                title="Nenhum produto encontrado"
                description="Tente outro nome ou categoria."
                action={
                  <button type="button" className="button" onClick={resetFilters}>
                    Limpar filtros
                  </button>
                }
              />
            }
          >
            {/* Mantido sempre no DOM para que leitores de tela anunciem a contagem. */}
            <p className="mb-3 text-[12px] text-muted empty:hidden" aria-live="polite">
              {hasActiveFilter ? `${filteredProducts.length} produto(s) encontrado(s)` : ''}
            </p>
          </ProductSection>

          <BuilderBanner onStart={() => setIsConfigOpen(true)} />

          <ProductSection
            eyebrow="NOVAS POSSIBILIDADES"
            title="Conheça outros produtos"
            action={
              <a href="#offers" onClick={resetFilters} className="inline-flex items-center gap-1 text-[12px] text-brand">
                Ver todos
                <ArrowUpRight aria-hidden="true" className="size-3.5" />
              </a>
            }
            products={NEW_PRODUCTS}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
          />

          <Benefits />
        </div>
      </main>

      <Footer />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart.cartItems}
        total={cart.total}
        onChangeQuantity={cart.changeQuantity}
        onRemove={cart.removeItem}
      />
      <ConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} onSelectGoal={selectGoal} />
      <Toast message={toast.message} isVisible={toast.isVisible} />
    </>
  );
}
