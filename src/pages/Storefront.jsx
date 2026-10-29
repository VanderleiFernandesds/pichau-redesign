import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Header from '../components/layout/header/Header';
import Navbar from '../components/layout/header/Navbar';
import SiteHeader from '../components/layout/header/SiteHeader';
import Footer from '../components/layout/footer/Footer';
import MobileNavBar from '../components/layout/MobileNavBar';
import ProductSection from '../components/products/ProductSection';
import ProductCarousel from '../components/products/ProductCarousel';
import CartDrawer from '../components/cart/CartDrawer';
import AddedToCartNotice from '../components/cart/AddedToCartNotice';
import AccountDialog from '../components/account/AccountDialog';
import EmptyState from '../components/ui/EmptyState';
import Toast from '../components/ui/Toast';
import Hero from './home/Hero';
import PurposeCards from './home/PurposeCards';
import DepartmentShowcase from './home/DepartmentShowcase';
import BuilderBanner from './home/BuilderBanner';
import ConfigModal from './home/ConfigModal';
import HelpCenterModal from '../components/help/HelpCenterModal';
import ProductPage from './product/ProductPage';
import { findProductBySlug, products } from '../data/products';
import { ALL_CATEGORIES } from '../data/categories';
import { useCart } from '../hooks/useCart';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import { useTheme } from '../hooks/useTheme';
import { useIsScrolledPast } from '../hooks/useIsScrolledPast';
import { useBlurOnScroll } from '../hooks/useBlurOnScroll';
import { homePath, isHomeLocation, navigate, productPath, useRoute } from '../hooks/useRoute';

// Sem filtro, as ofertas mostram só os primeiros produtos; os demais ficam no carrossel da outra vitrine.
const FEATURED_COUNT = 10;
const FEATURED_PRODUCTS = products.slice(0, FEATURED_COUNT);
const OTHER_PRODUCTS = products.slice(FEATURED_COUNT);

/*
  Casca da loja: header, footer, painéis e avisos ficam aqui, e o <main> mostra a Home ou a página
  do produto conforme a rota. Carrinho e favoritos são instanciados só aqui e repassados por props,
  garantindo uma única fonte de estado para as duas páginas, o header e os modais.
*/
export default function Storefront() {
  const route = useRoute();
  const product = route.name === 'product' ? findProductBySlug(route.slug) : null;
  // Seção da Home para rolar depois de voltar a ela (link #offers, filtro, busca feitos no produto).
  const [pendingScrollId, setPendingScrollId] = useState(null);
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
  const [cartStatus, setCartStatus] = useState('');
  const [addedNotice, setAddedNotice] = useState({ isVisible: false, showKey: 0 });
  // Se o menu de departamentos está escurecendo a página (ele mesmo avisa; nem sempre há fundo).
  const [isMenuOverlaid, setIsMenuOverlaid] = useState(false);
  const isOverlayOpen = isMenuOpen || isCartOpen || isConfigOpen || authView !== null || help.isOpen;
  // O carrossel do hero pausa só com o fundo escurecido de um modal ou painel (e retoma ao fechar).
  const isHeroCovered = isMenuOverlaid || isCartOpen || isConfigOpen || authView !== null || help.isOpen;
  const searchInputRef = useRef(null);

  const cart = useCart();
  const { favorites, toggleFavorite } = useFavorites();
  const toast = useToast();
  const { theme, toggleTheme } = useTheme();

  // Painéis e modais são <dialog> na camada superior: os avisos ficariam atrás deles, fora de alcance.
  useEffect(() => {
    if (!isOverlayOpen) return;
    toast.dismissToast();
    setAddedNotice((current) => ({ ...current, isVisible: false }));
  }, [isOverlayOpen]);
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

  // Fora da Home, volta para ela e rola até a seção depois que ela renderizar.
  function scrollToSection(id) {
    if (!isHomeLocation()) {
      navigate(homePath());
      setPendingScrollId(id);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }

  function scrollToOffers() {
    scrollToSection('offers');
  }

  /*
    Links internos sem recarregar a página: o clique comum em <a> para outra rota da loja vira
    navegação pelo histórico (Ctrl/Cmd+clique e nova aba seguem normais). Na página do produto, as
    âncoras da Home (#offers, #builder...) levam de volta a ela e rolam até a seção. Em captura, para
    rodar antes dos onClick dos links, que já encontram a Home como rota atual.
  */
  useEffect(() => {
    function handleLinkClick(event) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = event.target.closest?.('a[href]');
      if (!link || (link.target && link.target !== '_self') || link.hasAttribute('download')) return;

      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        if (isHomeLocation() || href === '#main') return;
        event.preventDefault();
        navigate(homePath());
        setPendingScrollId(href.slice(1));
        return;
      }

      const url = new URL(link.href);
      if (url.origin !== window.location.origin || !url.pathname.startsWith(homePath().slice(0, -1))) return;
      event.preventDefault();
      if (url.pathname === window.location.pathname) window.scrollTo({ top: 0, behavior: 'smooth' });
      else navigate(url.pathname);
    }

    document.addEventListener('click', handleLinkClick, true);
    return () => document.removeEventListener('click', handleLinkClick, true);
  }, []);

  /*
    A cada troca de rota: rola até a seção pendente ou restaura a posição guardada no histórico
    (topo para páginas novas, onde estava ao voltar). Na primeira renderização só a âncora do
    endereço (ex.: /#offers): o navegador tenta rolar até ela antes de o React montar a seção.
  */
  const routeKey = `${route.name}:${route.slug ?? ''}`;
  const lastRouteKeyRef = useRef(null);
  useLayoutEffect(() => {
    if (lastRouteKeyRef.current === null) {
      lastRouteKeyRef.current = routeKey;
      if (window.location.hash.length > 1) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
      return;
    }
    if (lastRouteKeyRef.current === routeKey) return;
    lastRouteKeyRef.current = routeKey;
    setIsNavOpen(false);
    if (pendingScrollId && route.name === 'home') {
      document.getElementById(pendingScrollId)?.scrollIntoView();
      setPendingScrollId(null);
      return;
    }
    window.scrollTo(0, window.history.state?.scrollY ?? 0);
  }, [routeKey]);

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

  /*
    Cada adição concluída mostra o aviso discreto abaixo do header (AddedToCartNotice), sem
    overlay; adições seguidas só reiniciam o tempo dele (showKey). Os limites continuam no toast. Diminuir e
    remover não têm aviso visual: o card mostra a quantidade, e a mudança é anunciada na região de
    status (cartStatus). O card só anima a ida ao carrinho quando o produto entrou de fato.
  */
  function addToCart(id) {
    const { isAdded, message } = cart.addItem(id);
    if (isAdded) setAddedNotice(({ showKey }) => ({ isVisible: true, showKey: showKey + 1 }));
    else toast.showToast(message, { variant: 'warning' });
    return isAdded;
  }

  function changeCartQuantity(id, delta) {
    cart.changeQuantity(id, delta);
    announceQuantity(id, (cart.quantities[id] ?? 0) + delta);
  }

  function announceQuantity(id, quantity) {
    const { name } = products.find((product) => product.id === id);
    setCartStatus(
      quantity > 0
        ? `${name}: ${quantity} ${quantity === 1 ? 'unidade' : 'unidades'} no carrinho.`
        : `${name} removido do carrinho.`,
    );
  }

  function viewProduct(id) {
    const target = products.find((item) => item.id === id);
    if (target) navigate(productPath(target.slug));
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
          onMenuOverlayChange={setIsMenuOverlaid}
          isNavOpen={isNavOpen}
          onNavOpenChange={setIsNavOpen}
          onCoupon={() => toast.showToast('Conceito demonstrativo: nenhum cupom real disponível.')}
          onOpenDepartment={openDepartment}
        />
      </SiteHeader>

      <main id="main" className="bg-page">
        {route.name === 'product' && product && (
          <ProductPage
            key={product.id}
            product={product}
            quantity={cart.quantities[product.id] ?? 0}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={toggleFavorite}
            onAddToCart={addToCart}
            onChangeQuantity={changeCartQuantity}
            onOpenCategory={filterByCategory}
          />
        )}

        {route.name === 'product' && !product && (
          <div className="wrap pt-[calc(var(--header-offset)+8px)] pb-12">
            <EmptyState
              title="Produto não encontrado"
              description="O endereço pode estar incompleto ou o produto não faz mais parte do catálogo."
              action={
                <a href={homePath()} className="button">
                  Voltar para o início
                </a>
              }
            />
          </div>
        )}

        {route.name === 'home' && (
          <>
            <Hero onFilter={filterByCategory} theme={theme} isCovered={isHeroCovered}>
              <PurposeCards onFilter={filterByCategory} />
            </Hero>
            <DepartmentShowcase onOpenDepartment={openDepartment} onShowAll={() => setIsMenuOpen(true)} />
            <div className="wrap">

              <ProductSection
                id="offers"
                eyebrow="ESCOLHAS PARA O SEU SETUP"
                title={isFavoriteOnly ? 'Seus favoritos' : 'Ofertas em destaque'}
                products={hasActiveFilter ? filteredProducts : FEATURED_PRODUCTS}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
                cartQuantities={cart.quantities}
                onChangeCartQuantity={changeCartQuantity}
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

              <ProductCarousel
                eyebrow="NOVAS POSSIBILIDADES"
                title="Conheça outros produtos"
                products={OTHER_PRODUCTS}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
                onAddToCart={addToCart}
                cartQuantities={cart.quantities}
                onChangeCartQuantity={changeCartQuantity}
                onViewProduct={viewProduct}
              />
            </div>
          </>
        )}
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
      <AddedToCartNotice
        isVisible={addedNotice.isVisible}
        showKey={addedNotice.showKey}
        onClose={() => setAddedNotice((current) => ({ ...current, isVisible: false }))}
      />
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
      <Toast
        message={toast.message}
        variant={toast.variant}
        action={toast.action}
        isVisible={toast.isVisible}
        onDismiss={toast.dismissToast}
        onPause={toast.pauseToast}
        onResume={toast.resumeToast}
      />
      <p role="status" className="sr-only">
        {cartStatus}
      </p>
    </>
  );
}
