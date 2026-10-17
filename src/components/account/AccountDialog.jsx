import { useId, useRef, useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import Modal from '../ui/Modal';
import { validateEmail } from '../../utils/validation';

const MIN_PASSWORD_LENGTH = 8;
const EMPTY_VALUES = { name: '', email: '', password: '' };

const VIEWS = {
  login: { title: 'Entrar', switchPrompt: 'Ainda não tem conta?', switchLabel: 'Criar conta', switchTo: 'signup' },
  signup: { title: 'Criar conta', switchPrompt: 'Já tem conta?', switchLabel: 'Entrar', switchTo: 'login' },
};

function validate(view, values) {
  const errors = {};
  if (view === 'signup' && !values.name.trim()) errors.name = 'Informe seu nome.';

  const emailError = validateEmail(values.email.trim());
  if (emailError) errors.email = emailError;

  if (!values.password) errors.password = 'Informe sua senha.';
  else if (view === 'signup' && values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }
  return errors;
}

/*
  Entrar e criar conta são só simulações: os campos são validados e limpos, mas nada é enviado nem
  salvo e nenhuma sessão é criada. O formulário é recriado (key) ao trocar de tela ou reabrir.
*/
export default function AccountDialog({ view, onViewChange, onClose }) {
  const formRef = useRef(null);
  const { title, switchPrompt, switchLabel, switchTo } = VIEWS[view ?? 'login'];

  // O botão de troca continua no lugar; o foco vai para o primeiro campo da nova tela.
  function switchView() {
    onViewChange(switchTo);
    requestAnimationFrame(() => formRef.current?.elements[0]?.focus());
  }

  return (
    <Modal isOpen={view !== null} onClose={onClose} title={title} closeLabel={`Fechar ${title.toLowerCase()}`}>
      <p className="chamfer simulation-notice mt-4 flex items-start gap-2 px-3 py-2.5 text-[13px] leading-snug font-semibold text-heading">
        <ShieldCheck aria-hidden="true" className="mt-px size-4 shrink-0 text-brand" />
        Simulação — nenhum dado será enviado ou salvo e nenhum login será feito. Não use dados reais.
      </p>

      {view && <AuthForm key={view} ref={formRef} view={view} submitLabel={title} />}

      <p className="mt-3 text-center text-[13px] text-muted">
        {switchPrompt}{' '}
        <button type="button" onClick={switchView} className="min-h-11 px-1 font-semibold text-brand hover:underline">
          {switchLabel}
        </button>
      </p>
    </Modal>
  );
}

// noValidate troca o balão nativo por mensagens ligadas a cada campo, como no NewsletterForm.
function AuthForm({ ref, view, submitLabel }) {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const isSignup = view === 'signup';

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // O erro do campo some assim que a pessoa começa a corrigir.
    setErrors((current) => ({ ...current, [name]: '' }));
    setMessage('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(view, values);
    const firstInvalid = Object.keys(nextErrors)[0];

    setErrors(nextErrors);
    if (firstInvalid) {
      event.currentTarget.elements[firstInvalid].focus();
      return;
    }

    setValues(EMPTY_VALUES);
    setMessage(
      isSignup
        ? 'Cadastro simulado. Nenhum dado foi enviado ou salvo e nenhuma conta foi criada.'
        : 'Login simulado. Nenhum dado foi enviado ou salvo e você continua sem login.',
    );
  }

  return (
    <form ref={ref} noValidate onSubmit={handleSubmit} className="mt-5 grid gap-4">
      {isSignup && <Field label="Nome" name="name" value={values.name} error={errors.name} onChange={handleChange} />}
      <Field label="E-mail" name="email" type="email" value={values.email} error={errors.email} onChange={handleChange} />
      <Field
        label="Senha"
        name="password"
        type="password"
        value={values.password}
        error={errors.password}
        hint={isSignup ? `Mínimo de ${MIN_PASSWORD_LENGTH} caracteres.` : ''}
        onChange={handleChange}
      />

      <button
        type="submit"
        className="chamfer chamfer-accent mt-1 flex h-11 w-full items-center justify-center text-[13px] font-bold tracking-[0.5px] text-white uppercase"
      >
        {submitLabel}
      </button>

      <p aria-live="polite" className="text-[13px] text-success empty:hidden">
        {message}
      </p>
    </form>
  );
}

/*
  autoComplete off: o formulário é de mentira, então o navegador não deve sugerir nem oferecer
  salvar dados reais. 16px abaixo de 601px evita o zoom automático do iOS ao focar o campo.
*/
function Field({ label, name, type = 'text', value, error, hint = '', onChange }) {
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold text-heading">
        {label}
      </label>
      <div className={`chamfer chamfer-field flex h-12 items-center px-3.5 ${error ? 'field-error' : ''}`}>
        <input
          id={inputId}
          name={name}
          type={type}
          autoComplete="off"
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-heading outline-none sm:text-[14px]"
        />
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-[12px] text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] text-danger">
          Erro: {error}
        </p>
      )}
    </div>
  );
}
