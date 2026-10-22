import { useId } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { getQuantityLimit } from '../../hooks/useCart';

const stepButtonClass =
  'grid w-11 shrink-0 place-items-center text-heading transition-colors hover:text-brand focus-visible:outline-offset-[-3px] aria-disabled:opacity-40 aria-disabled:hover:text-heading';

/*
  Quantidade do produto no carrinho, no lugar do botão de adicionar. O botão da esquerda é sempre o
  mesmo elemento: lixeira com 1 unidade, "−" a partir de 2, então o foco não se perde na troca.
  No limite, o "+" fica aria-disabled mas continua clicável: o clique mostra o aviso do limite
  (o mesmo do card), e a explicação também fica ligada a ele por aria-describedby.
*/
export default function CardQuantityControl({ product, quantity, plusRef, onIncrease, onDecrease }) {
  const limitId = useId();
  const { maxQuantity, limitMessage } = getQuantityLimit(product);
  const isMaximum = quantity >= maxQuantity;
  const isLastUnit = quantity === 1;

  return (
    <div
      role="group"
      aria-label={`Quantidade de ${product.name} no carrinho`}
      className="chamfer quantity-control flex h-11"
    >
      <button
        type="button"
        onClick={onDecrease}
        aria-label={isLastUnit ? `Remover ${product.name} do carrinho` : `Remover uma unidade de ${product.name}`}
        className={stepButtonClass}
      >
        {isLastUnit ? <Trash2 aria-hidden="true" className="size-4" /> : <Minus aria-hidden="true" className="size-4" />}
      </button>
      <span className="grid min-w-0 flex-1 place-items-center text-[14px] font-bold text-heading tabular-nums">
        {quantity}
        <span className="sr-only"> no carrinho</span>
      </span>
      <button
        ref={plusRef}
        type="button"
        onClick={onIncrease}
        aria-disabled={isMaximum}
        aria-describedby={isMaximum ? limitId : undefined}
        aria-label={`Adicionar uma unidade de ${product.name}`}
        title={isMaximum ? limitMessage : undefined}
        className={stepButtonClass}
      >
        <Plus aria-hidden="true" className="size-4" />
      </button>
      {isMaximum && (
        <span id={limitId} className="sr-only">
          {limitMessage}
        </span>
      )}
    </div>
  );
}
