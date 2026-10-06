import { useEffect, useState } from 'react';
import { products } from '../data/products';
import { readStorage, writeStorage } from '../utils/storage';

const CART_KEY = 'pichau-demo-cart';
const productIds = new Set(products.map((product) => product.id));

function loadCart() {
  const storedCart = readStorage(CART_KEY, {});
  if (!storedCart || Array.isArray(storedCart) || typeof storedCart !== 'object') return {};

  return Object.fromEntries(
    Object.entries(storedCart).filter(
      ([id, quantity]) => productIds.has(Number(id)) && Number.isInteger(quantity) && quantity > 0,
    ),
  );
}

export function useCart() {
  const [cart, setCart] = useState(loadCart);

  useEffect(() => {
    writeStorage(CART_KEY, cart);
  }, [cart]);

  function changeQuantity(id, delta) {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };
      const quantity = Math.max(0, (nextCart[id] ?? 0) + delta);
      if (quantity) nextCart[id] = quantity;
      else delete nextCart[id];
      return nextCart;
    });
  }

  function removeItem(id) {
    setCart((currentCart) => {
      const nextCart = { ...currentCart };
      delete nextCart[id];
      return nextCart;
    });
  }

  const cartItems = products
    .filter((product) => cart[product.id] > 0)
    .map((product) => ({ product, quantity: cart[product.id] }));

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return {
    cartItems,
    itemCount,
    total,
    addItem: (id) => changeQuantity(id, 1),
    changeQuantity,
    removeItem,
  };
}
