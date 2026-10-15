import { formatMoney } from '../../utils/format';

// Resumo só de leitura da revisão demonstrativa: para mudar quantidades, volta-se ao carrinho.
export default function CartReview({ cartItems }) {
  return (
    <ul aria-label="Resumo do pedido">
      {cartItems.map(({ product, quantity }) => (
        <li key={product.id} className="flex items-center gap-3 border-t border-line py-3 first:border-t-0">
          <span className="chamfer product-media grid size-14 shrink-0 place-items-center p-1">
            <img src={product.image} alt="" loading="lazy" decoding="async" className="size-full object-contain" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[14px] leading-snug font-semibold wrap-anywhere text-heading">{product.name}</p>
            <p className="text-[12px] text-muted">
              {quantity} × {formatMoney(product.price)}
            </p>
          </div>
          <strong className="shrink-0 text-[14px] font-bold whitespace-nowrap text-heading">
            {formatMoney(product.price * quantity)}
          </strong>
        </li>
      ))}
    </ul>
  );
}
