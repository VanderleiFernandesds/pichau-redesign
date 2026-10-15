import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ShoppingCart, Trash2, Undo2, X } from 'lucide-react';
import CartItem from './CartItem';
import CartReview from './CartReview';
import { formatItemCount, formatMoney } from '../../utils/format';
import { useSlidingDialog } from '../../hooks/useSlidingDialog';

const primaryButtonClass =
  'chamfer chamfer-accent flex h-11 w-full items-center justify-center text-[13px] font-bold tracking-[0.5px] text-white uppercase';

/*
  Carrinho em painel lateral, entrando pela direita. Como o menu de departamentos, é um <dialog>
  que cobre a tela: o clique fora do painel cai nele e fecha, e o Esc passa pela saída animada.
  Cabeçalho e rodapé ficam fixos; só a lista rola. "Revisar pedido" troca a lista por um resumo
  só de leitura, demonstrativo: não há pagamento nem checkout.
*/
export default function CartDrawer({
  isOpen,
  onClose,
  onExploreProducts,
  cartItems,
  itemCount,
  total,
  onChangeQuantity,
  onRemove,
  onClear,
  onRestore,
}) {
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const clearButtonRef = useRef(null);
  const undoButtonRef = useRef(null);
  const titleRef = useRef(null);
  const reviewButtonRef = useRef(null);
  const titleId = useId();
  const countId = useId();
  // Última remoção (um produto ou o carrinho todo), com o que é preciso para desfazer.
  const [removal, setRemoval] = useState(null);
  const [announcement, setAnnouncement] = useState('');
  const [isReviewing, setIsReviewing] = useState(false);
  const isEmpty = cartItems.length === 0;

  useSlidingDialog(isOpen, dialogRef, panelRef);

  // Desfazer e revisão não sobrevivem ao fechamento: o carrinho reabre sempre no estado normal.
  useEffect(() => {
    if (isOpen) return;
    setRemoval(null);
    setAnnouncement('');
    setIsReviewing(false);
  }, [isOpen]);

  // O título muda para "Revisão do pedido" e recebe o foco, para o leitor de tela anunciar a troca.
  function startReview() {
    setIsReviewing(true);
    setRemoval(null);
    requestAnimationFrame(() => titleRef.current?.focus());
  }

  function backToCart() {
    setIsReviewing(false);
    requestAnimationFrame(() => reviewButtonRef.current?.focus());
  }

  function changeQuantity(id, delta) {
    const { product, quantity } = cartItems.find((item) => item.product.id === id);
    onChangeQuantity(id, delta);
    setAnnouncement(`Quantidade de ${product.name}: ${quantity + delta}.`);
  }

  // O botão clicado some da lista; o foco vai para o "Desfazer", a próxima ação provável.
  function registerRemoval(message, items, restoredId) {
    setRemoval({ message, items, restoredId });
    setAnnouncement(message);
    requestAnimationFrame(() => undoButtonRef.current?.focus());
  }

  function removeItem(product, quantity) {
    onRemove(product.id);
    registerRemoval(`Removido do carrinho: ${product.name}.`, [{ id: product.id, quantity }], product.id);
  }

  function clearCart() {
    const items = cartItems.map(({ product, quantity }) => ({ id: product.id, quantity }));
    onClear();
    registerRemoval('Carrinho esvaziado.', items, null);
  }

  // Ao desfazer, o foco volta para onde a remoção começou: a lixeira do produto ou o "Esvaziar".
  function undoRemoval() {
    const { items, restoredId } = removal;
    onRestore(items);
    setRemoval(null);
    setAnnouncement(restoredId === null ? 'Produtos devolvidos ao carrinho.' : 'Produto devolvido ao carrinho.');
    requestAnimationFrame(() => {
      const target =
        restoredId === null
          ? clearButtonRef.current
          : dialogRef.current.querySelector(`[data-product-id="${restoredId}"] [data-remove]`);
      target?.focus();
    });
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
      aria-labelledby={isEmpty ? titleId : `${titleId} ${countId}`}
      onCancel={handleCancel}
      onClose={onClose}
      onClick={handleDialogClick}
      className="cart-drawer"
    >
      <div ref={panelRef} className="cart-drawer-panel chamfer">
        <header className="border-b border-line px-5 pt-2 pb-1">
          <div className="flex items-center gap-3">
            <h2
              id={titleId}
              ref={titleRef}
              tabIndex={-1}
              className="font-display text-[24px] leading-tight font-bold text-heading outline-none"
            >
              {isReviewing ? 'Revisão do pedido' : 'Seu carrinho'}
            </h2>
            {!isEmpty && (
              <span id={countId} className="chamfer cart-count px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap text-heading">
                {formatItemCount(itemCount)}
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar carrinho"
              className="-mr-2 ml-auto grid size-11 shrink-0 place-items-center text-muted transition-colors hover:text-brand"
            >
              <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
            </button>
          </div>

          {isReviewing ? (
            <button
              type="button"
              onClick={backToCart}
              className="-ml-2 inline-flex min-h-11 items-center gap-1.5 px-2 text-[13px] font-semibold text-soft transition-colors hover:text-brand"
            >
              <ChevronLeft aria-hidden="true" className="size-4" />
              Voltar ao carrinho
            </button>
          ) : (
            <div className="flex items-center justify-between gap-3">
              <p className="min-w-0 py-2 text-[12px] leading-snug text-muted">Projeto demonstrativo, sem compras reais.</p>
              {!isEmpty && (
                <button
                  ref={clearButtonRef}
                  type="button"
                  onClick={clearCart}
                  className="-mr-1 inline-flex min-h-11 shrink-0 items-center gap-1.5 px-1 text-[12px] font-semibold text-muted transition-colors hover:text-brand"
                >
                  <Trash2 aria-hidden="true" className="size-4" />
                  Esvaziar carrinho
                </button>
              )}
            </div>
          )}
        </header>

        {removal && (
          <div className="flex items-center justify-between gap-3 border-b border-line bg-fill py-1 pr-3 pl-5">
            <p className="min-w-0 text-[13px] leading-snug wrap-anywhere text-text">{removal.message}</p>
            <button
              ref={undoButtonRef}
              type="button"
              onClick={undoRemoval}
              className="inline-flex min-h-11 shrink-0 items-center gap-1.5 px-2 text-[13px] font-bold text-heading underline-offset-4 hover:underline"
            >
              <Undo2 aria-hidden="true" className="size-4 text-brand" />
              Desfazer
            </button>
          </div>
        )}

        <div className="cart-drawer-list flex min-h-0 flex-1 flex-col overflow-y-auto px-5">
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
          ) : isReviewing ? (
            <CartReview cartItems={cartItems} />
          ) : (
            <ul aria-label="Produtos no carrinho">
              {cartItems.map(({ product, quantity }) => (
                <CartItem
                  key={product.id}
                  product={product}
                  quantity={quantity}
                  onChangeQuantity={changeQuantity}
                  onRemove={removeItem}
                />
              ))}
            </ul>
          )}
        </div>

        {!isEmpty && (
          <div className="cart-drawer-footer border-t border-line px-5 pt-3">
            <div className="cart-drawer-summary mb-3 flex items-end justify-between gap-3">
              <div>
                <span className="block text-[15px] font-semibold text-heading">Total no Pix</span>
                <span className="cart-drawer-summary-count text-[12px] text-muted">{formatItemCount(itemCount)}</span>
              </div>
              <strong className="text-[22px] leading-tight font-extrabold whitespace-nowrap text-success">{formatMoney(total)}</strong>
            </div>
            <div className="cart-drawer-actions">
              <p className="cart-drawer-note mb-2 text-center text-[12px] text-muted">Revisão demonstrativa, sem pagamento.</p>
              {isReviewing ? (
                <button type="button" onClick={onClose} className={primaryButtonClass}>
                  Continuar explorando
                </button>
              ) : (
                <>
                  <button ref={reviewButtonRef} type="button" onClick={startReview} className={`${primaryButtonClass} gap-3`}>
                    Revisar pedido
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="cart-drawer-secondary mt-1 flex min-h-11 w-full items-center justify-center text-[14px] font-semibold text-soft transition-colors hover:text-heading"
                  >
                    Continuar explorando
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Quantidades, remoções e o desfazer são anunciados aqui, sem tirar o foco de onde está. */}
        <p aria-live="polite" className="sr-only">
          {announcement}
        </p>
      </div>
    </dialog>
  );
}
