import { useState } from 'react';
import AuthField from './AuthField';
import { validateEmail } from '../../utils/validation';

const MIN_PASSWORD_LENGTH = 8;
const EMPTY_VALUES = { name: '', email: '', password: '', confirmPassword: '' };

const SUCCESS_MESSAGES = {
  login: 'Login demonstrativo: os dados são válidos, mas nada foi enviado e você continua sem login.',
  signup: 'Cadastro demonstrativo: os dados são válidos, mas nada foi enviado ou salvo e nenhuma conta foi criada.',
};

function validate(view, values) {
  const errors = {};
  const isSignup = view === 'signup';
  if (isSignup && !values.name.trim()) errors.name = 'Informe seu nome completo.';

  const emailError = validateEmail(values.email.trim());
  if (emailError) errors.email = emailError;

  if (!values.password) errors.password = 'Informe sua senha.';
  else if (isSignup && values.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  if (isSignup) {
    if (!values.confirmPassword) errors.confirmPassword = 'Confirme sua senha.';
    else if (values.confirmPassword !== values.password) errors.confirmPassword = 'As senhas não são iguais.';
  }
  return errors;
}

/*
  Os dados só existem no estado deste formulário: nada é enviado nem salvo, e depois de validados
  os campos são limpos. noValidate troca o balão nativo por mensagens ligadas a cada campo.
  onNotice mostra a mensagem da demonstração (sucesso ou recurso indisponível) no AccountDialog.
*/
export default function AuthForm({ ref, view, onNotice }) {
  const [values, setValues] = useState(EMPTY_VALUES);
  const [errors, setErrors] = useState({});
  const isSignup = view === 'signup';

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // O erro do campo some assim que a pessoa começa a corrigir.
    setErrors((current) => ({ ...current, [name]: '' }));
    onNotice('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(view, values);
    const firstInvalid = Object.keys(nextErrors)[0];

    setErrors(nextErrors);
    if (firstInvalid) {
      onNotice('');
      event.currentTarget.elements[firstInvalid].focus();
      return;
    }

    setValues(EMPTY_VALUES);
    onNotice(SUCCESS_MESSAGES[view]);
  }

  return (
    <form ref={ref} noValidate onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      {isSignup && (
        <AuthField label="Nome completo" name="name" autoComplete="name" value={values.name} error={errors.name} onChange={handleChange} />
      )}
      <AuthField
        label="E-mail"
        name="email"
        type="email"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
      />
      <AuthField
        label="Senha"
        name="password"
        type="password"
        autoComplete={isSignup ? 'new-password' : 'current-password'}
        value={values.password}
        error={errors.password}
        hint={isSignup ? `Use pelo menos ${MIN_PASSWORD_LENGTH} caracteres.` : ''}
        onChange={handleChange}
      />
      {isSignup && (
        <AuthField
          label="Confirmar senha"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />
      )}

      {!isSignup && (
        <button
          type="button"
          onClick={() => onNotice('Recuperação de senha demonstrativa: nenhum e-mail será enviado.')}
          className="-mt-2 min-h-11 justify-self-end px-1 text-[13px] font-semibold text-link underline underline-offset-4 hover:no-underline"
        >
          Esqueceu sua senha?
        </button>
      )}

      <button
        type="submit"
        className="chamfer chamfer-accent mt-1 flex h-12 w-full items-center justify-center font-display text-[17px] font-bold tracking-[0.5px] text-white"
      >
        {isSignup ? 'Criar conta' : 'Entrar'}
      </button>
    </form>
  );
}
