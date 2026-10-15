export function formatMoney(amount) {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatProductCount(count) {
  return `${count} ${count === 1 ? 'produto' : 'produtos'}`;
}
