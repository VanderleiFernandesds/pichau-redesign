// O valor no Pix já tem 15% de desconto; o preço no cartão é calculado a partir dele.
const PIX_DISCOUNT_FACTOR = 0.85;
export const INSTALLMENTS = 12;

export function getCardPrice(product) {
  return product.price / PIX_DISCOUNT_FACTOR;
}

// previousPrice e price são os dois no Pix, então o desconto compara a mesma condição de pagamento.
export function getDiscountPercent(product) {
  return product.previousPrice > product.price ? Math.round((1 - product.price / product.previousPrice) * 100) : 0;
}

export function hasIllustrativeConditions(product) {
  return getDiscountPercent(product) > 0 || Boolean(product.coupon || product.shipping);
}
