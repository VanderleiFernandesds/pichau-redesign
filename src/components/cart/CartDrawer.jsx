import { useId, useRef } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';
import { formatMoney } from '../../utils/format';
import { useSlidingDialog } from '../../hooks/useSlidingDialog';

const noteClass = 'text-[12px] leading-[1.6] text-muted';
const quantityButtonClass = 'chamfer chip-button grid size-8 place-items-center';

/*
  Carrinho em painel lateral, entrando pela direita. Como o menu de departamentos, é um <dialog>
  que cobre a tela: o clique fora do painel cai nele e fecha, e o Esc passa pela saída animada.
*/
export default function CartDrawer({ isOpen, onClose, cartItems, total, onChangeQuantity, onRemove }) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const titleId = useId();

  useSlidingDialog(isOpen, dialogRef, panelRef);

  function handleCancel(event) {
    event.preventDefault();
    onClose();
  }

  function handleDialogClick(event) {
    if (event.target === dialogRef.current) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onClose={onClose}
      onClick={handleDialogClick}
      className="cart-drawer"
    >
      <div ref={panelRef} className="cart-drawer-panel chamfer">
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
          <h2 id={titleId} className="font-display text-[24px] leading-tight font-bold text-heading">
            Seu carrinho
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="grid size-11 place-items-center text-muted transition-colors hover:text-brand"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
          </button>
        </div>

        <div className="cart-drawer-list flex-1 overflow-y-auto px-5">
          <p className={`${noteClass} py-3`}>Carrinho demonstrativo · nenhuma compra será realizada.</p>

          {cartItems.length === 0 && (
            <p className={`${noteClass} py-6`}>Seu carrinho está vazio. Explore os produtos para começar.</p>
          )}

          <ul>
            {cartItems.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-3 border-t border-line py-4">
                <span className="chamfer product-media grid size-16 shrink-0 place-items-center p-1.5">
                  <img src={product.image} alt="" className="h-full w-full object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <b className="line-clamp-2 text-[13px] leading-snug text-heading">{product.name}</b>
                  <small className="block text-[12px] font-semibold text-success">{formatMoney(product.price)} no Pix</small>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(product.id, -1)}
                      aria-label={`Diminuir quantidade de ${product.name}`}
                      className={quantityButtonClass}
                    >
                      <Minus aria-hidden="true" className="size-3.5" />
                    </button>
                    <span className="min-w-4 text-center text-[13px]">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(product.id, 1)}
                      aria-label={`Aumentar quantidade de ${product.name}`}
                      className={quantityButtonClass}
                    >
                      <Plus aria-hidden="true" className="size-3.5" />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  aria-label={`Remover ${product.name}`}
                  className={quantityButtonClass}
                >
                  <Trash2 aria-hidden="true" className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-line px-5 pt-4 pb-5">
          <div className="mb-4 flex items-baseline justify-between">
            <span className="text-[14px]">Total no Pix</span>
            <strong className="text-[22px] font-extrabold text-success">{formatMoney(total)}</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="chamfer chamfer-accent flex h-11 w-full items-center justify-center text-[13px] font-bold tracking-[0.5px] text-white uppercase"
          >
            Continuar explorando
          </button>
        </div>
      </div>
    </dialog>
  );
}
