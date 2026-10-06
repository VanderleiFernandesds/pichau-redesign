export function formatMoney(amount) {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
