import { useId, useState } from 'react';
import { Truck } from 'lucide-react';

const CEP_LENGTH = 8;

// 00000-000 enquanto a pessoa digita; só os números contam.
function formatCep(value) {
  const digits = value.replace(/\D/g, '').slice(0, CEP_LENGTH);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

/*
  Frete apenas demonstrativo: o CEP é validado, mas nenhum prazo ou valor é calculado nem exibido
  como real. A condição ilustrativa do produto (frete grátis por região), quando existe, aparece
  identificada como tal. Mensagens no próprio formulário, como na newsletter.
*/
export default function ShippingEstimate({ shipping }) {
  const inputId = useId();
  const messageId = useId();
  const [cep, setCep] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const hasError = status.type === 'error';

  function handleSubmit(event) {
    event.preventDefault();
    if (cep.replace(/\D/g, '').length !== CEP_LENGTH) {
      setStatus({ type: 'error', message: 'Digite um CEP com 8 números, como 01310-100.' });
      event.currentTarget.querySelector('input').focus();
      return;
    }
    setStatus({
      type: 'success',
      message: `Simulação para o CEP ${cep}: este projeto é demonstrativo e não calcula prazos nem valores de frete.`,
    });
  }

  function handleChange(event) {
    setCep(formatCep(event.target.value));
    if (status.type !== 'idle') setStatus({ type: 'idle', message: '' });
  }

  return (
    <section aria-labelledby={`${inputId}-title`} className="chamfer footer-panel px-(--box-padding) py-5">
      <h2 id={`${inputId}-title`} className="flex items-center gap-2.5 font-display text-[19px] font-bold text-heading">
        <Truck aria-hidden="true" className="size-5.5 text-brand" />
        Calcule o frete e o prazo
      </h2>

      <form noValidate onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2 min-[420px]:flex-row">
        <label htmlFor={inputId} className="sr-only">
          CEP
        </label>
        <div className={`chamfer chamfer-field flex h-12 min-w-0 items-center px-3.5 min-[420px]:flex-1 ${hasError ? 'field-error' : ''}`}>
          <input
            id={inputId}
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="Digite seu CEP"
            value={cep}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={messageId}
            className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-heading outline-none placeholder:text-muted"
          />
        </div>
        <button
          type="submit"
          className="chamfer chamfer-outline h-12 shrink-0 px-7 font-display text-[16px] font-bold text-heading"
        >
          Calcular
        </button>
      </form>

      <p id={messageId} aria-live="polite" className="mt-2 text-[13px] empty:mt-0">
        {status.message && (
          <span className={hasError ? 'text-danger' : 'text-soft'}>
            {hasError ? 'Erro: ' : ''}
            {status.message}
          </span>
        )}
      </p>
      {shipping && (
        <p className="mt-2 text-[13px] text-soft">
          Condição ilustrativa: {shipping.label.toLocaleLowerCase('pt-BR')} para {shipping.regions}.
        </p>
      )}
      <p className="mt-2 text-[12px] text-muted">Cálculo demonstrativo: nenhum prazo ou valor real é informado.</p>
    </section>
  );
}
