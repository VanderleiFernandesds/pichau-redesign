import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { readStorage, writeStorage } from '../utils/storage';

const CART_KEY = 'pichau-demo-cart';
const productsById = new Map(products.map((product) => [product.id, product]));

const MAX_UNITS_PER_PRODUCT = 10;
const MAX_DISTINCT_PRODUCTS = 50;
const CART_FULL_MESSAGE = `Seu carrinho atingiu o limite de ${MAX_DISTINCT_PRODUCTS} produtos diferentes.`;

// Os produtos de demonstração não têm estoque; quando um tiver (`stock`), vale o menor dos dois limites.
function hasStock(product) {
  return Number.isInteger(product.stock) && product.stock >= 0;
}

function getMaxQuantity(product) {
  return hasStock(product) ? Math.min(product.stock, MAX_UNITS_PER_PRODUCT) : MAX_UNITS_PER_PRODUCT;
}

function getQuantityLimitMessage(product) {
  if (hasStock(product) && product.stock < MAX_UNITS_PER_PRODUCT) {
    return `Estoque disponível: ${product.stock} ${product.stock === 1 ? 'unidade' : 'unidades'}.`;
  }
  return `Limite de ${MAX_UNITS_PER_PRODUCT} unidades por produto.`;
}

// Para os controles de quantidade (cards e carrinho) mostrarem o limite sem repetir a regra.
export function getQuantityLimit(product) {
  return { maxQuantity: getMaxQuantity(product), limitMessage: getQuantityLimitMessage(product) };
}

function clampQuantity(id, quantity) {
  const product = productsById.get(id);
  return product ? Math.min(Math.max(0, quantity), getMaxQuantity(product)) : 0;
}

/*
  O localStorage pode ter sido editado ou vir de uma versão sem limites: ids inexistentes e
  quantidades inválidas saem, as acima do máximo são reduzidas a ele e só os primeiros
  MAX_DISTINCT_PRODUCTS produtos são mantidos.
*/
function loadCart() {
  const storedCart = readStorage(CART_KEY, {});
  if (!storedCart || Array.isArray(storedCart) || typeof storedCart !== 'object') return {};

  const entries = Object.entries(storedCart)
    .filter(([, quantity]) => Number.isInteger(quantity))
    .map(([id, quantity]) => [id, clampQuantity(Number(id), quantity)])
    .filter(([, quantity]) => quantity > 0)
    .slice(0, MAX_DISTINCT_PRODUCTS);

  return Object.fromEntries(entries);
}

// Nova quantidade dentro dos limites; um produto novo só entra se o carrinho ainda tiver espaço.
function withQuantity(currentCart, id, quantity) {
  const nextCart = { ...currentCart };
  const isNew = !(id in currentCart);
  const nextQuantity = clampQuantity(id, quantity);

  if (nextQuantity === 0) delete nextCart[id];
  else if (!isNew || Object.keys(currentCart).length < MAX_DISTINCT_PRODUCTS) nextCart[id] = nextQuantity;
  return nextCart;
}

export function useCart() {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    writeStorage(CART_KEY, cart);
  }, [cart]);

  function changeQuantity(id, delta) {
    setCart((currentCart) => withQuantity(currentCart, id, (currentCart[id] ?? 0) + delta));
  }

  // Quando um limite impede a adição, devolve a mensagem para quem chamou avisar a pessoa.
  function addItem(id) {
    const product = productsById.get(id);
    const quantity = cart[id] ?? 0;
    if (!product) return { isAdded: false, message: 'Produto indisponível.' };
    if (quantity === 0 && Object.keys(cart).length >= MAX_DISTINCT_PRODUCTS) {
      return { isAdded: false, message: CART_FULL_MESSAGE };
    }
    if (quantity >= getMaxQuantity(product)) return { isAdded: false, message: getQuantityLimitMessage(product) };

    changeQuantity(id, 1);
    return { isAdded: true, message: null };
  }

  function removeItem(id) {
    setCart((currentCart) => withQuantity(currentCart, id, 0));
  }

  function clearCart() {
    setCart({});
  }

  // Desfazer passa pelas mesmas regras: se outros produtos entraram depois, o limite continua valendo.
  function restoreItems(items) {
    setCart((currentCart) =>
      items.reduce((nextCart, { id, quantity }) => withQuantity(nextCart, id, quantity), currentCart),
    );
  }

  const cartItems = products
    .filter((product) => cart[product.id] > 0)
    .map((product) => ({
      product,
      quantity: cart[product.id],
      ...getQuantityLimit(product),
    }));

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    // Quantidade por id de produto; os cards leem daqui, sem contagem própria.
    quantities: cart,
    cartItems,
    itemCount,
    total,
    addItem,
    changeQuantity,
    removeItem,
    clearCart,
    restoreItems,
  };
}
