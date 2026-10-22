import { useId, useState } from 'react';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';

/*
  Campo com label visível e erro ligado por aria-describedby. Os de senha têm o botão de mostrar e
  ocultar, que só troca o type: colar continua liberado. 16px abaixo de 601px evita o zoom
  automático do iOS ao focar o campo.
*/
export default function AuthField({ label, name, type = 'text', autoComplete, value, error, hint = '', onChange }) {
  const inputId = useId();
  const hintId = useId();
  const errorId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPassword = type === 'password';
  const isEmail = type === 'email';
  const describedBy = [hint && hintId, error && errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={inputId} className="mb-1.5 block text-[13px] font-semibold text-heading sm:text-[14px]">
        {label}
      </label>
      <div
        className={`chamfer chamfer-field auth-field flex h-12 items-center pl-3.5 ${isPassword ? 'pr-1' : 'pr-3.5'} ${value ? 'is-filled' : ''} ${error ? 'field-error' : ''}`}
      >
        <input
          id={inputId}
          name={name}
          type={isPassword && isPasswordVisible ? 'text' : type}
          autoComplete={autoComplete}
          inputMode={isEmail ? 'email' : undefined}
          autoCapitalize={isEmail || isPassword ? 'none' : undefined}
          spellCheck={isEmail || isPassword ? false : undefined}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className="h-full min-w-0 flex-1 bg-transparent text-base text-heading outline-none sm:text-[15px]"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible((current) => !current)}
            aria-label={`Mostrar ${label.toLowerCase()}`}
            aria-pressed={isPasswordVisible}
            aria-controls={inputId}
            className="grid size-11 shrink-0 place-items-center text-muted transition-colors hover:text-heading focus-visible:text-heading"
          >
            {isPasswordVisible ? <EyeOff aria-hidden="true" className="size-5" /> : <Eye aria-hidden="true" className="size-5" />}
          </button>
        )}
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-[12px] text-muted sm:text-[13px]">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-start gap-1.5 text-[13px] leading-snug text-danger">
          <CircleAlert aria-hidden="true" className="mt-px size-4 shrink-0" />
          <span>Erro: {error}</span>
        </p>
      )}
    </div>
  );
}
