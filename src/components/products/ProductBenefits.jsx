import { Ticket, Truck } from 'lucide-react';

/*
  Cupom e frete na faixa da base da área da foto. Ficam no fluxo, abaixo da imagem, então reservam
  o próprio espaço em vez de cobrir o produto. No celular, uma linha para cada; a partir do tablet,
  lado a lado quando cabem. O cupom tem fundo neutro discreto; o frete é só texto, com o verde no
  ícone, e a região vem inteira dos dados do produto. Só aparecem os benefícios que existem.
*/
export default function ProductBenefits({ coupon, shipping }) {
  if (!coupon && !shipping) return null;

  return (
    <ul className="relative mt-1 flex flex-col items-start gap-1 px-1 pb-1 text-[11px] leading-tight font-medium text-ink sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:px-0 sm:pb-0 sm:text-[12px]">
      {coupon && (
        <li className="chamfer product-tag flex max-w-full items-center gap-1 px-1.5 py-0.5">
          <Ticket aria-hidden="true" className="size-3.5 shrink-0" />
          <span>
            Cupom <strong className="font-bold">{coupon}</strong>
          </span>
        </li>
      )}
      {shipping && (
        <li className="flex max-w-full items-start gap-1 py-0.5">
          {/* A área da foto é branca nos dois temas: o verde é o do tema claro, que contrasta com ela. */}
          <Truck aria-hidden="true" className="size-3.5 shrink-0 text-[#008c35]" />
          <span>
            {shipping.label}: {shipping.regions}
          </span>
        </li>
      )}
    </ul>
  );
}
