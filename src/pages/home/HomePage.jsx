import { useRef, useState } from 'react';
import Header from '../../components/layout/header/Header';
import Navbar from '../../components/layout/header/Navbar';
import SiteHeader from '../../components/layout/header/SiteHeader';
import Footer from '../../components/layout/footer/Footer';
import MobileNavBar from '../../components/layout/MobileNavBar';
import ProductSection from '../../components/products/ProductSection';
import CartDrawer from '../../components/cart/CartDrawer';
import AccountDialog from '../../components/account/AccountDialog';
import EmptyState from '../../components/ui/EmptyState';
import Toast from '../../components/ui/Toast';
import Hero from './Hero';
import PurposeCards from './PurposeCards';
import DepartmentShowcase from './DepartmentShowcase';
import BuilderBanner from './BuilderBanner';
import ConfigModal from './ConfigModal';
import HelpCenterModal from '../../components/help/HelpCenterModal';
import { products } from '../../data/products';
import { ALL_CATEGORIES } from '../../data/categories';
import { useCart } from '../../hooks/useCart';
import { useFavorites } from '../../hooks/useFavorites';
import { useToast } from '../../hooks/useToast';
import { useTheme } from '../../hooks/useTheme';
import { useIsScrolledPast } from '../../hooks/useIsScrolledPast';
import { useBlurOnScroll } from '../../hooks/useBlurOnScroll';

// Sem filtro, as ofertas mostram só os primeiros produtos; os demais aparecem aos poucos na outra vitrine.
const FEATURED_COUNT = 10;
const OTHER_PAGE_SIZE = 10;
const FEATURED_PRODUCTS = products.slice(0, FEATURED_COUNT);
const OTHER_PRODUCTS = products.slice(FEATURED_COUNT);

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
  // 'login' ou 'signup' com o modal de conta aberto; null fechado.
  const [authView, setAuthView] = useState(null);
  // topicId leva a Central de ajuda direto a um tópico; sem ele, ela abre do começo.
  const [help, setHelp] = useState({ isOpen: false, topicId: null });
  const [otherVisibleCount, setOtherVisibleCount] = useState(OTHER_PAGE_SIZE);
  const offersRef = useRef(null);
  const searchInputRef = useRef(null);

  const cart = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const toast = useToast();
  const { theme, toggleTheme } = useTheme();
  // No celular a busca do header só aparece no topo da página, sobre o hero, ou enquanto está em
  // uso; ao rolar depois de usá-la, o campo perde o foco e a busca recolhe de novo.
  const isSearchHidden = useIsScrolledPast(24);
  useBlurOnScroll(searchInputRef, 64);

  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
  const filteredProducts = products.filter(
    (product) =>
      (category === ALL_CATEGORIES || product.category === category) &&
      (!isFavoriteOnly || favorites.includes(product.id)) &&
      `${product.name} ${product.spec}`.toLocaleLowerCase('pt-BR').includes(normalizedQuery),
  );
  const hasActiveFilter = normalizedQuery !== '' || category !== ALL_CATEGORIES || isFavoriteOnly;

  // Conta, busca, favoritos e carrinho fecham a lista do menu: só um painel aberto por vez.
  function openCart() {
    setIsNavOpen(false);
    setIsCartOpen(true);
  }

  function openAuth(view) {
    setIsNavOpen(false);
    setAuthView(view);
  }

  /*
    O foco é síncrono para o teclado virtual abrir no iOS, que só aceita foco dentro do toque. Com o
    header fora da tela (celular deitado, onde ele não é sticky), a página rola até o campo.
  */
  function focusSearch() {
    setIsNavOpen(false);
    const input = searchInputRef.current;
    input.focus({ preventScroll: true });
    const { top, bottom } = input.getBoundingClientRect();
    if (top < 0 || bottom > window.innerHeight) input.scrollIntoView({ block: 'center' });
  }

  function scrollToOffers() {
    offersRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  function filterByCategory(nextCategory) {
    setCategory(nextCategory);
    setIsFavoriteOnly(false);
    setIsMenuOpen(false);
    scrollToOffers();
  }

  // Departamentos com produtos filtram as ofertas; os demais ainda não existem na loja conceito.
  function openDepartment(department) {
    if (department.productCategory) filterByCategory(department.productCategory);
    else toast.showToast('Conceito demonstrativo: departamento ainda sem produtos.');
  }

  function resetFilters() {
    setQuery('');
    filterByCategory(ALL_CATEGORIES);
  }

  function toggleFavoriteOnly() {
    setIsNavOpen(false);
    setIsFavoriteOnly((current) => !current);
    setCategory(ALL_CATEGORIES);
    scrollToOffers();
  }

  function addToCart(id) {
    cart.addItem(id);
    toast.showToast('Produto adicionado ao carrinho');
  }

  function viewProduct() {
    toast.showToast('Conceito demonstrativo: página do produto indisponível.');
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-2.5 focus:left-2.5 focus:z-[100] focus:bg-white focus:p-[15px] focus:text-ink"
      >
        Pular para o conteúdo
      </a>

      <SiteHeader isSearchHidden={isSearchHidden && !isMenuOpen}>
        <Header
          query={query}
          onQueryChange={setQuery}
          onSearch={scrollToOffers}
          searchInputRef={searchInputRef}
          isNavOpen={isNavOpen}
          onNavOpenChange={setIsNavOpen}
          onOpenAuth={openAuth}
          isFavoriteOnly={isFavoriteOnly}
          onToggleFavorites={toggleFavoriteOnly}
          favoriteCount={favorites.length}
          cartCount={cart.itemCount}
          onOpenCart={openCart}
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        <Navbar
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
          isNavOpen={isNavOpen}
          onNavOpenChange={setIsNavOpen}
          onCoupon={() => toast.showToast('Conceito demonstrativo: nenhum cupom real disponível.')}
          onOpenDepartment={openDepartment}
        />
      </SiteHeader>

      <main id="main" className="bg-page">
        <Hero onFilter={filterByCategory} theme={theme}>
          <PurposeCards onFilter={filterByCategory} />
        </Hero>
        <DepartmentShowcase onOpenDepartment={openDepartment} onShowAll={() => setIsMenuOpen(true)} />
        <div className="wrap pt-7 sm:pt-11">

          <ProductSection
            ref={offersRef}
            id="offers"
            eyebrow="ESCOLHAS PARA O SEU SETUP"
            title={isFavoriteOnly ? 'Seus favoritos' : 'Ofertas em destaque'}
            products={hasActiveFilter ? filteredProducts : FEATURED_PRODUCTS}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
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
            products={OTHER_PRODUCTS.slice(0, otherVisibleCount)}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
            onViewProduct={viewProduct}
            footer={
              otherVisibleCount < OTHER_PRODUCTS.length && (
                <button
                  type="button"
                  onClick={() => setOtherVisibleCount((count) => count + OTHER_PAGE_SIZE)}
                  className="chamfer chip-button mx-auto mt-6 flex h-11 items-center px-6 text-[13px] font-semibold"
                >
                  Mostrar mais produtos ({OTHER_PRODUCTS.length - otherVisibleCount} restantes)
                </button>
              )
            }
          />
        </div>
      </main>

      <Footer
        onOpenHelp={(topicId = null) => setHelp({ isOpen: true, topicId })}
        onOpenDepartment={openDepartment}
        onShowAllDepartments={() => setIsMenuOpen(true)}
      />

      <MobileNavBar
        isMenuOpen={isMenuOpen}
        onOpenMenu={() => setIsMenuOpen(true)}
        onSearch={focusSearch}
        onNavigate={() => setIsNavOpen(false)}
        isFavoriteOnly={isFavoriteOnly}
        onToggleFavorites={toggleFavoriteOnly}
        favoriteCount={favorites.length}
        isAccountOpen={authView !== null}
        onOpenAccount={() => openAuth('login')}
      />

      <AccountDialog view={authView} onViewChange={setAuthView} onClose={() => setAuthView(null)} />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onExploreProducts={scrollToOffers}
        cartItems={cart.cartItems}
        itemCount={cart.itemCount}
        total={cart.total}
        onChangeQuantity={cart.changeQuantity}
        onRemove={cart.removeItem}
        onClear={cart.clearCart}
        onRestore={cart.restoreItems}
      />
      <ConfigModal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)} onSelectGoal={selectGoal} />
      <HelpCenterModal
        isOpen={help.isOpen}
        topicId={help.topicId}
        onClose={() => setHelp((current) => ({ ...current, isOpen: false }))}
      />
      <Toast message={toast.message} isVisible={toast.isVisible} />
    </>
  );
}
