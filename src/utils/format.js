const currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function formatMoney(amount) {
  return currencyFormatter.format(amount);
}

export function formatProductCount(count) {
  return `${count} ${count === 1 ? 'produto' : 'produtos'}`;
}

// Unidades no carrinho: 2 do mesmo produto contam como 2 itens.
export function formatItemCount(count) {
  return `${count} ${count === 1 ? 'item' : 'itens'}`;
}
