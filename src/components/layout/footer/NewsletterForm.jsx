import { useId, useRef, useState } from 'react';
import { Mail } from 'lucide-react';

// Mesma regra do type="email" do navegador, só que com mensagens próprias em português.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email) return 'Informe seu e-mail.';
  if (!EMAIL_PATTERN.test(email)) return 'Digite um e-mail válido, como nome@exemplo.com.';
  return '';
}

/*
  Cadastro apenas simulado: o e-mail é validado e o campo é limpo, mas nada é enviado nem salvo.
  noValidate troca o balão nativo do navegador por mensagens no próprio formulário, ligadas ao
  campo por aria-describedby e anunciadas pelo aria-live.
*/
export default function NewsletterForm() {
  const inputRef = useRef(null);
  const inputId = useId();
  const messageId = useId();
  const noteId = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const hasError = status.type === 'error';

  function handleSubmit(event) {
    event.preventDefault();
    const error = validateEmail(email.trim());

    if (error) {
      setStatus({ type: 'error', message: error });
      inputRef.current.focus();
      return;
    }

    setEmail('');
    setStatus({ type: 'success', message: 'Cadastro simulado com sucesso. Nenhum e-mail foi enviado ou salvo.' });
  }

  function handleChange(event) {
    setEmail(event.target.value);
    // A mensagem de erro some assim que a pessoa começa a corrigir.
    if (status.type !== 'idle') setStatus({ type: 'idle', message: '' });
  }

  return (
    <form noValidate onSubmit={handleSubmit} aria-label="Newsletter">
      <div className="flex flex-col gap-2 min-[420px]:flex-row">
        <label htmlFor={inputId} className="sr-only">
          Seu e-mail
        </label>
        <div className={`chamfer chamfer-field flex h-12 min-w-0 items-center min-[420px]:flex-1 gap-2.5 px-3.5 ${hasError ? 'newsletter-error' : ''}`}>
          <Mail aria-hidden="true" className="size-4.5 shrink-0 text-muted" strokeWidth={1.75} />
          <input
            ref={inputRef}
            id={inputId}
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={`${messageId} ${noteId}`}
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-heading outline-none placeholder:text-muted"
          />
        </div>
        <button
          type="submit"
          className="chamfer chamfer-accent h-12 shrink-0 px-6 text-[13px] font-bold tracking-[0.5px] text-white uppercase"
        >
          Cadastrar
        </button>
      </div>

      <p id={messageId} aria-live="polite" className="mt-2 text-[13px] empty:mt-0">
        {status.message && (
          <span className={hasError ? 'text-danger' : 'text-success'}>
            {hasError ? 'Erro: ' : ''}
            {status.message}
          </span>
        )}
      </p>
      <p id={noteId} className="mt-2 text-[12px] text-muted">
        Formulário demonstrativo. Nenhum e-mail será enviado.
      </p>
    </form>
  );
}
