import { ArrowUpRight, CalendarDays, MapPin, Tag } from 'lucide-react';

const DETAIL_ICONS = { offer: Tag, date: CalendarDays, location: MapPin };

// Chanfrado vermelho como o carrinho e o Departamentos. Não usa .button: o fundo dele apareceria
// nos cantos recortados. Links para o site da marca abrem em outra aba, sem tirar o cliente da loja.
function CampaignCta({ cta, label, onFilter, className }) {
  const isExternal = cta.href.startsWith('http');
  return (
    <a
      href={cta.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={cta.category ? () => onFilter(cta.category) : undefined}
      className={`chamfer chamfer-accent inline-flex items-center justify-between font-bold whitespace-nowrap text-white ${className}`}
    >
      {label}
      {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
      <ArrowUpRight aria-hidden="true" className="size-4" />
    </a>
  );
}

/*
  Os textos de todas as campanhas ocupam a mesma célula do grid, que fica com a altura da maior:
  trocar de campanha não move o resto da página. As inativas ficam com visibility: hidden, fora do
  Tab e da árvore de acessibilidade. No celular o botão vai dentro de cada bloco, logo abaixo da
  descrição, para a campanha de texto mais curto não ficar com um vão até ele.
*/
export default function HeroCampaignCopy({ campaigns, shownId, isAnnounced, onFilter, theme }) {
  function visibility(campaignId) {
    return campaignId === shownId ? '' : 'invisible opacity-0';
  }

  return (
    <div className="hero-copy max-w-[590px]">
      <div className="grid" aria-live={isAnnounced ? 'polite' : 'off'}>
        {campaigns.map(({ id, eyebrow, logo, title, isTitleStacked, description, details, cta }) => (
          <div key={id} className={`hero-fade col-start-1 row-start-1 ${visibility(id)}`}>
            {logo ? (
              // Largura fixa e altura automática, para a proporção vir sempre da arte; no celular o logo
              // fica com 73% da largura. O max-width deixa livre o canto das setas (abaixo de 1001px).
              <img
                src={theme === 'light' && logo.srcOnLight ? logo.srcOnLight : logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                style={{ '--logo-width': `${logo.displayWidth}px` }}
                className="block h-auto w-[calc(var(--logo-width)*0.73)] max-w-[calc(100%-6rem)] sm:w-(--logo-width)"
              />
            ) : (
              <span className="eyebrow text-brand">{eyebrow}</span>
            )}
            {/* No desktop o tamanho e a linha única vêm de .hero-copy h1 (index.css); abaixo disso quebra. */}
            <h1
              className={`my-4 font-display text-[clamp(32px,10.5vw,40px)] leading-[1] font-bold sm:my-5 sm:text-[50px] ${isTitleStacked ? 'is-stacked' : ''}`}
            >
              {title.map((part, index) => (
                <span key={part} className="hero-title-part">
                  {index > 0 && ' '}
                  {part}
                </span>
              ))}
            </h1>
            <p className="line-clamp-3 max-w-[36ch] text-[14px] leading-[1.5] text-text sm:text-[16px]">{description}</p>

            {details.length > 0 && (
              <ul className="mt-3 grid gap-1.5 text-[13px] text-soft">
                {details.map(({ type, text }) => {
                  const Icon = DETAIL_ICONS[type];
                  // A oferta é a informação principal da lista; data e local ficam discretos.
                  const isOffer = type === 'offer';
                  return (
                    <li
                      key={text}
                      className={`flex items-center gap-2 ${isOffer ? 'text-[18px] font-semibold text-heading' : ''}`}
                    >
                      <Icon aria-hidden="true" className={`shrink-0 text-brand ${isOffer ? 'size-5' : 'size-4'}`} />
                      {text}
                    </li>
                  );
                })}
              </ul>
            )}

            <CampaignCta
              cta={cta}
              label={cta.mobileLabel ?? cta.label}
              onFilter={onFilter}
              className="mt-(--hero-gap) min-h-11 gap-4 px-5 text-[14px] sm:hidden"
            />
          </div>
        ))}
      </div>

      <div className="mt-(--hero-gap) flex max-sm:hidden">
        <div className="grid">
          {campaigns.map(({ id, cta }) => (
            <CampaignCta
              key={id}
              cta={cta}
              label={cta.label}
              onFilter={onFilter}
              className={`hero-fade col-start-1 row-start-1 gap-6 px-5.5 py-3.5 text-[13px] ${visibility(id)}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
