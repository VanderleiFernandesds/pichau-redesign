import { Minus, Plus, X } from 'lucide-react';
import Modal from '../ui/Modal';
import { formatMoney } from '../../utils/format';

const noteClass = 'my-[1em] text-[12px] leading-[1.6] text-muted';
const quantityButtonClass = 'grid h-[25px] w-[25px] place-items-center rounded-sm bg-white/10 hover:bg-white/15';

export default function CartModal({ isOpen, onClose, cartItems, total, onChangeQuantity, onRemove }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Seu carrinho" closeLabel="Fechar carrinho">
      <p className={noteClass}>Carrinho demonstrativo · nenhuma compra será realizada.</p>

      <div>
        {cartItems.length === 0 && <p className={noteClass}>Seu carrinho está vazio. Explore os produtos para começar.</p>}

        {cartItems.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center gap-3 border-b border-line py-[18px]">
            <img src={product.image} alt="" className="h-[60px] w-[60px] rounded-sm bg-white object-contain p-1" />
            <div className="flex-1">
              <b className="block text-[12px] text-white">{product.name}</b>
              <small className="text-[11px] text-success">{formatMoney(product.price)}</small>
              <div className="mt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => onChangeQuantity(product.id, -1)}
                  aria-label={`Diminuir quantidade de ${product.name}`}
                  className={quantityButtonClass}
                >
                  <Minus aria-hidden="true" className="size-3.5" />
                </button>
                <span className="text-[12px]">{quantity}</span>
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
              className="grid size-6 place-items-center rounded-sm bg-white/10 hover:text-brand"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between py-6">
        <span>Total no Pix</span>
        <strong className="text-success">{formatMoney(total)}</strong>
      </div>
      <button type="button" className="button w-full" onClick={onClose}>
        Continuar explorando
      </button>
    </Modal>
  );
}
