const FLIGHT_TIME = 700;
const BUMP_TIME = 360;
// Largura da foto ao chegar no carrinho: some sobre o ícone, sem cobrir o botão inteiro.
const LANDING_SIZE = 28;

function bumpCart(cart) {
  // Cliques seguidos reiniciam o pulo em vez de empilhar escalas.
  cart.getAnimations().forEach((animation) => {
    if (animation.id === 'cart-bump') animation.cancel();
  });
  cart.animate(
    [{ transform: 'scale(1)' }, { transform: 'scale(1.14)', offset: 0.4 }, { transform: 'scale(1)' }],
    { id: 'cart-bump', duration: BUMP_TIME, easing: 'ease-out' },
  );
}

/*
  Uma cópia da foto do produto voa até o carrinho do header ([data-cart-target]), que dá um pulo
  ao recebê-la. A cópia é fixed e fica fora do React: só existe durante a animação. Com movimento
  reduzido nada se move; o toast continua confirmando a adição.
*/
export function animateAddToCart(sourceImage) {
  const cart = document.querySelector('[data-cart-target]');
  if (!cart || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cartRect = cart.getBoundingClientRect();
  const imageRect = sourceImage?.getBoundingClientRect();
  // Em telas muito baixas o header não é fixo e o carrinho pode ter saído da tela.
  if (!cartRect.width || cartRect.bottom < 0) return;
  if (!imageRect?.width) {
    bumpCart(cart);
    return;
  }

  const flyer = sourceImage.cloneNode();
  flyer.removeAttribute('loading');
  flyer.alt = '';
  flyer.setAttribute('aria-hidden', 'true');
  flyer.className = 'cart-flyer';
  Object.assign(flyer.style, {
    left: `${imageRect.left}px`,
    top: `${imageRect.top}px`,
    width: `${imageRect.width}px`,
    height: `${imageRect.height}px`,
  });
  document.body.append(flyer);

  const deltaX = cartRect.left + cartRect.width / 2 - (imageRect.left + imageRect.width / 2);
  const deltaY = cartRect.top + cartRect.height / 2 - (imageRect.top + imageRect.height / 2);
  const landingScale = LANDING_SIZE / imageRect.width;

  // O leve impulso para cima no começo faz a foto "sair" do card antes de seguir para o carrinho.
  const flight = flyer.animate(
    [
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
      { transform: 'translate(0, -12px) scale(1.04)', opacity: 1, offset: 0.15 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(${landingScale})`, opacity: 0.4 },
    ],
    { duration: FLIGHT_TIME, easing: 'cubic-bezier(0.55, 0, 0.3, 1)' },
  );

  flight.finished
    .then(() => bumpCart(cart))
    .catch(() => {})
    .finally(() => flyer.remove());
}
