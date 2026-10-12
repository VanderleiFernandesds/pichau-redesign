import BrandIcon from '../../ui/BrandIcon';

const PAYMENT_ICONS = [
  { name: 'Visa', icon: 'visa' },
  { name: 'Mastercard', icon: 'mastercard' },
  { name: 'Pix', icon: 'pix' },
];

// Barras de alturas iguais e larguras alternadas, só para sugerir o código do boleto.
const BARCODE_BARS = [0, 2, 3, 6, 7, 9, 12, 13, 15, 18, 20, 21];

export default function PaymentMethods() {
  return (
    <section aria-labelledby="footer-payments" className="flex flex-col items-center gap-3">
      <h2 id="footer-payments" className="text-center text-[11px] font-semibold tracking-[1.5px] text-muted uppercase">
        Formas de pagamento <span aria-hidden="true">•</span> Demonstração
      </h2>
      {/* O nome de cada forma de pagamento fica no texto acessível; os ícones são decorativos. */}
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-soft sm:gap-x-8">
        {PAYMENT_ICONS.map(({ name, icon }) => (
          <li key={icon} className="payment-method">
            <BrandIcon name={icon} className="h-9 w-auto" />
            <span className="sr-only">{name}</span>
          </li>
        ))}
        <li className="payment-method gap-1.5">
          <svg viewBox="0 0 22 24" fill="currentColor" aria-hidden="true" focusable="false" className="h-7 w-auto">
            {BARCODE_BARS.map((x) => (
              <rect key={x} x={x} y="2" width={x % 3 === 0 ? 1.5 : 1} height="20" />
            ))}
          </svg>
          <span className="text-[17px] font-semibold">Boleto</span>
        </li>
      </ul>
    </section>
  );
}
