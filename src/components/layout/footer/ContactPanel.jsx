import { Mail, Phone } from 'lucide-react';

const CONTACT_TYPES = {
  phone: { icon: Phone, name: 'Telefone' },
  email: { icon: Mail, name: 'E-mail' },
};

/*
  Os contatos quebram em linhas conforme o espaço, em vez de disputar uma linha só.
*/
export default function ContactPanel({ icon: Icon, title, city, hours, contacts, action }) {
  return (
    <section className="chamfer footer-panel relative flex flex-col gap-5 px-(--box-padding) py-5 sm:py-6">
      <span aria-hidden="true" className="corner-accents" />

      <div className="flex items-start gap-4">
        <Icon aria-hidden="true" className="mt-1 size-8 shrink-0 text-brand" strokeWidth={1.5} />
        <div className="min-w-0">
          <p className="text-[11px] font-semibold tracking-[1.5px] text-muted uppercase">Pichau oficial</p>
          <h3 className="mt-0.5 font-display text-[22px] leading-tight font-bold text-heading uppercase">
            {title}
            {/* No celular a cidade desce para a linha de baixo, em vez de quebrar no meio. */}
            {city && (
              <span className="block text-soft sm:inline">
                <span aria-hidden="true" className="hidden sm:inline">
                  {' · '}
                </span>
                {city}
              </span>
            )}
          </h3>
          <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[14px] text-soft">
            {hours.map(({ days, time }) => (
              <li key={days}>
                <span className="font-semibold text-text">{days}</span> <span className="whitespace-nowrap">{time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-4">
        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {contacts.map(({ type, label, href }) => {
            const { icon: ContactIcon, name } = CONTACT_TYPES[type];
            return (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex min-h-11 items-center gap-2.5 font-display text-[20px] font-semibold text-heading transition-colors hover:text-brand"
                >
                  <ContactIcon aria-hidden="true" className="size-5 text-brand" strokeWidth={1.75} />
                  <span className="sr-only">{name}: </span>
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
        {action}
      </div>
    </section>
  );
}
