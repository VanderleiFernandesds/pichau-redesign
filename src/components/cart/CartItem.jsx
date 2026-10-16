import { Minus, Plus, Trash2 } from 'lucide-react';
import { formatMoney } from '../../utils/format';

/*
  Os controles têm 44px de toque. Com quantidade 1, "diminuir" fica aria-disabled em vez de
  disabled: o foco continua nele (um botão disabled perderia o foco) e remover é só pela lixeira.
*/
const controlClass =
  'chamfer chip-button grid size-11 shrink-0 place-items-center focus-visible:outline-offset-2 aria-disabled:pointer-events-none aria-disabled:opacity-40';

export default function CartItem({ product, quantity, onChangeQuantity, onRemove }) {
  const { id, name, price, image } = product;
  const isMinimum = quantity === 1;

  return (
    <li data-product-id={id} className="flex gap-3 border-t border-line py-4 first:border-t-0 sm:gap-4">
      <span className="chamfer product-media grid size-18 shrink-0 place-items-center p-1.5 sm:size-20">
        <img src={image} alt="" loading="lazy" decoding="async" className="size-full object-contain" />
      </span>

      <div className="min-w-0 flex-1">
        <h3 className="text-[14px] leading-snug font-semibold wrap-anywhere text-heading sm:text-[15px]">{name}</h3>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
          <strong className="text-[17px] font-extrabold text-success">{formatMoney(price)}</strong>
          <span className="text-[12px] text-muted">por unidade no Pix</span>
        </p>
        {quantity > 1 && (
          <p className="text-[12px] text-soft">
            Subtotal: <strong className="font-semibold text-heading">{formatMoney(price * quantity)}</strong>
          </p>
        )}

        <div className="mt-3 flex items-center gap-2">
          <div role="group" aria-label={`Quantidade de ${name}`} className="flex items-center">
            <button
              type="button"
              onClick={() => !isMinimum && onChangeQuantity(id, -1)}
              aria-disabled={isMinimum}
              aria-label={`Diminuir quantidade de ${name}`}
              className={controlClass}
            >
              <Minus aria-hidden="true" className="size-4" />
            </button>
            <span className="min-w-9 text-center text-[15px] font-semibold text-heading">{quantity}</span>
            <button
              type="button"
              onClick={() => onChangeQuantity(id, 1)}
              aria-label={`Aumentar quantidade de ${name}`}
              className={controlClass}
            >
              <Plus aria-hidden="true" className="size-4" />
            </button>
          </div>

          <button
            type="button"
            data-remove
            onClick={() => onRemove(product, quantity)}
            aria-label={`Remover ${name} do carrinho`}
            className={`${controlClass} ml-auto`}
          >
            <Trash2 aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
    </li>
  );
}
