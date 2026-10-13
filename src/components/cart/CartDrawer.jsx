import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2, X } from 'lucide-react';
import { formatMoney } from '../../utils/format';
import { useSlidingDialog } from '../../hooks/useSlidingDialog';

const quantityButtonClass = 'chamfer chip-button grid size-8 place-items-center';
const primaryButtonClass =
  'chamfer chamfer-accent flex h-11 w-full items-center justify-center text-[13px] font-bold tracking-[0.5px] text-white uppercase';

/*
  Carrinho em painel lateral, entrando pela direita. Como o menu de departamentos, é um <dialog>
  que cobre a tela: o clique fora do painel cai nele e fecha, e o Esc passa pela saída animada.
*/
export default function CartDrawer({
  isOpen,
  onClose,
  onExploreProducts,
  cartItems,
  total,
  onChangeQuantity,
  onRemove,
  onClear,
}) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const closeButtonRef = useRef(null);
  const clearButtonRef = useRef(null);
  const cancelClearRef = useRef(null);
  const titleId = useId();
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);
  const isEmpty = cartItems.length === 0;

  useSlidingDialog(isOpen, dialogRef, panelRef);

  // A confirmação não sobrevive ao fechamento: o carrinho reabre sempre no estado normal.
  useEffect(() => {
    if (!isOpen) setIsConfirmingClear(false);
  }, [isOpen]);

  // Os botões trocam de lugar; o foco acompanha para quem usa teclado não ficar sem referência.
  function askToClear() {
    setIsConfirmingClear(true);
    requestAnimationFrame(() => cancelClearRef.current?.focus());
  }

  function cancelClear() {
    setIsConfirmingClear(false);
    requestAnimationFrame(() => clearButtonRef.current?.focus());
  }

  function confirmClear() {
    onClear();
    setIsConfirmingClear(false);
    closeButtonRef.current.focus();
  }

  /*
    A rolagem só começa depois que o <dialog> fecha: ao fechar, ele devolve o foco ao botão do
    carrinho, e em telas baixas (header sem sticky) esse foco puxaria a página de volta ao topo.
  */
  function exploreProducts() {
    dialogRef.current.addEventListener('close', onExploreProducts, { once: true });
    onClose();
  }

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
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar carrinho"
            className="grid size-11 place-items-center text-muted transition-colors hover:text-brand"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
          </button>
        </div>

        <div className="cart-drawer-list flex flex-1 flex-col overflow-y-auto px-5">
          <p className="py-3 text-[13px] leading-[1.6] text-muted">Carrinho demonstrativo. Nenhuma compra será realizada.</p>

          {isEmpty ? (
            // my-auto centraliza sem esconder o topo quando o conteúdo passa da altura, como faria o justify-center.
            <div className="mx-auto my-auto flex w-full max-w-[320px] flex-col items-center pt-8 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] text-center">
              <span aria-hidden="true" className="relative mb-6 text-muted">
                <ShoppingCart className="size-24" strokeWidth={1.5} />
                <span className="absolute top-[32%] left-[52%] flex gap-1">
                  <span className="slash-accent h-5" />
                  <span className="slash-accent h-5" />
                </span>
              </span>
              <h3 className="font-display text-[clamp(22px,6vw,26px)] leading-tight font-bold text-heading">
                Seu carrinho está vazio
              </h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-muted">
                Explore os produtos e encontre o próximo item para o seu setup.
              </p>
              <button type="button" onClick={exploreProducts} className={`${primaryButtonClass} mt-6 gap-3 px-6`}>
                Explorar produtos
                <ArrowRight aria-hidden="true" className="size-4" />
              </button>
            </div>
          ) : (
            <>
              {isConfirmingClear ? (
                <div role="group" aria-label="Confirmar esvaziar carrinho" className="flex flex-wrap items-center gap-2 pb-3">
                  <span className="mr-auto text-[13px] text-heading">Remover todos os produtos?</span>
                  <div className="ml-auto flex gap-2">
                    <button ref={cancelClearRef} type="button" onClick={cancelClear} className="chamfer chip-button h-9 px-3 text-[12px] font-semibold">
                      Cancelar
                    </button>
                    <button
                      type="button"
                      onClick={confirmClear}
                      className="chamfer chamfer-accent h-9 px-3 text-[12px] font-bold text-white"
                    >
                      Esvaziar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end pb-3">
                  <button
                    ref={clearButtonRef}
                    type="button"
                    onClick={askToClear}
                    className="inline-flex min-h-9 items-center gap-1.5 text-[12px] font-semibold text-muted transition-colors hover:text-brand"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                    Esvaziar carrinho
                  </button>
                </div>
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
            </>
          )}
        </div>

        {!isEmpty && (
          <div className="cart-drawer-footer border-t border-line px-5 pt-4">
            <div className="mb-4 flex items-baseline justify-between">
              <span className="text-[14px]">Total no Pix</span>
              <strong className="text-[22px] font-extrabold text-success">{formatMoney(total)}</strong>
            </div>
            <button type="button" onClick={onClose} className={primaryButtonClass}>
              Continuar explorando
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
