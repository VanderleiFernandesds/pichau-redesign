import { useState } from 'react';
import { ChevronRight, Ticket, Truck } from 'lucide-react';
import Modal from '../../components/ui/Modal';
import { formatMoney } from '../../utils/format';
import { INSTALLMENTS, getCardPrice, getDiscountPercent, hasIllustrativeConditions } from '../../utils/pricing';

/*
  Pix em destaque, depois o cartão e o parcelamento, com as mesmas regras do card (utils/pricing).
  "Ver parcelamento" abre a tabela de 1x a 12x sem juros calculada a partir do total no cartão.
  Desconto, cupom e frete vêm dos dados ilustrativos do produto e são identificados como tal.
*/
export default function ProductPrice({ product }) {
  const [isInstallmentsOpen, setIsInstallmentsOpen] = useState(false);
  const cardPrice = getCardPrice(product);
  const discountPercent = getDiscountPercent(product);

  return (
    <div>
      {discountPercent > 0 && (
        <p className="flex flex-wrap items-center gap-2 text-[14px] text-muted">
          <span>
            De <s>{formatMoney(product.previousPrice)}</s> no Pix
            <span className="sr-only">, por</span>
          </span>
          <span className="chamfer chamfer-accent discount-badge px-2 py-0.5 text-[12px] font-bold text-white">
            {discountPercent}% OFF
          </span>
        </p>
      )}
      <p className="mt-1 font-display text-[clamp(38px,9vw,52px)] leading-none font-bold tracking-[-0.5px] wrap-break-word text-success">
        {formatMoney(product.price)}
      </p>
      <p className="mt-1 text-[17px] text-text">à vista no Pix</p>

      <p className="mt-4 text-[15px] text-text">
        ou <strong className="font-bold text-heading">{formatMoney(cardPrice)}</strong> no cartão
        <br />
        {INSTALLMENTS}x de <span className="whitespace-nowrap">{formatMoney(cardPrice / INSTALLMENTS)}</span> sem juros
      </p>

      <button
        type="button"
        onClick={() => setIsInstallmentsOpen(true)}
        aria-haspopup="dialog"
        className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-heading underline underline-offset-4 transition-colors hover:text-brand"
      >
        Ver parcelamento
        <ChevronRight aria-hidden="true" className="size-4.5 text-brand" />
      </button>

      {hasIllustrativeConditions(product) && (
        <div className="mt-2 text-[13px] text-soft">
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {product.coupon && (
              <li className="flex items-center gap-1.5">
                <Ticket aria-hidden="true" className="size-4 text-brand" />
                Cupom <strong className="font-semibold text-heading">{product.coupon}</strong>
              </li>
            )}
            {product.shipping && (
              <li className="flex items-center gap-1.5">
                <Truck aria-hidden="true" className="size-4 text-success" />
                {product.shipping.label}: {product.shipping.regions}
              </li>
            )}
          </ul>
          <p className="mt-1 text-[12px] text-muted">Condições ilustrativas</p>
        </div>
      )}

      <Modal
        isOpen={isInstallmentsOpen}
        onClose={() => setIsInstallmentsOpen(false)}
        title="Parcelamento"
        closeLabel="Fechar parcelamento"
      >
        <p className="mt-2 text-[14px] text-soft">
          À vista no Pix: <strong className="text-success">{formatMoney(product.price)}</strong>
        </p>
        <table className="mt-4 w-full text-left text-[14px]">
          <caption className="sr-only">Parcelamento no cartão de {product.name}</caption>
          <thead className="text-[12px] tracking-[0.5px] text-muted uppercase">
            <tr>
              <th scope="col" className="pb-2 font-semibold">Parcelas no cartão</th>
              <th scope="col" className="pb-2 text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: INSTALLMENTS }, (_, index) => {
              const count = index + 1;
              return (
                <tr key={count} className="border-t border-line">
                  <th scope="row" className="py-2 font-normal text-text">
                    {count}x de <strong className="font-semibold text-heading">{formatMoney(cardPrice / count)}</strong> sem juros
                  </th>
                  <td className="py-2 text-right whitespace-nowrap text-soft">{formatMoney(cardPrice)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p className="mt-4 text-[12px] text-muted">Condições ilustrativas, sem valor comercial.</p>
      </Modal>
    </div>
  );
}
