import { ArrowUpRight, CalendarDays, MapPin, Tag } from 'lucide-react';

const DETAIL_ICONS = { offer: Tag, date: CalendarDays, location: MapPin };

/*
  Textos da campanha do card expandido. Os de todas as campanhas ocupam a mesma célula do grid,
  então a área reservada é a da maior: trocar de campanha não move o botão nem o resto da página.
  As inativas ficam com visibility: hidden, fora do Tab e da árvore de acessibilidade.
*/
export default function HeroCampaignCopy({ campaigns, shownId, isAnnounced, onFilter }) {
  function visibility(campaignId) {
    return campaignId === shownId ? '' : 'invisible opacity-0';
  }

  return (
    <div className="hero-copy max-w-[590px]">
      <div className="grid" aria-live={isAnnounced ? 'polite' : 'off'}>
        {campaigns.map(({ id, eyebrow, logo, title, isTitleStacked, description, highlights, details }) => (
          <div key={id} className={`hero-fade col-start-1 row-start-1 ${visibility(id)}`}>
            {logo ? (
              // Largura fixa e altura automática, para a proporção vir sempre da arte; no celular o logo
              // fica com 73% da largura. O max-width deixa livre o canto das setas (abaixo de 1001px).
              <img
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                style={{ '--logo-width': `${logo.displayWidth}px` }}
                className="block h-auto w-[calc(var(--logo-width)*0.73)] max-w-[calc(100%-6rem)] sm:w-(--logo-width)"
              />
            ) : (
              <span className="eyebrow text-[#e7a3ae]">{eyebrow}</span>
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
            <p className="line-clamp-3 max-w-[36ch] text-[14px] leading-[1.5] text-[#e1dfe3] sm:text-[16px]">{description}</p>

            {highlights.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-2" aria-label="Destaques">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-[4px] border border-[#ffffff26] bg-[#ffffff0d] px-2.5 py-1 text-[12px] font-semibold text-[#e1dfe3]"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {details.length > 0 && (
              <ul className="mt-3 grid gap-1.5 text-[13px] text-[#b8b9bf]">
                {details.map(({ type, text }) => {
                  const Icon = DETAIL_ICONS[type];
                  // A oferta é a informação principal da lista; data e local ficam discretos.
                  const isOffer = type === 'offer';
                  return (
                    <li
                      key={text}
                      className={`flex items-center gap-2 ${isOffer ? 'text-[18px] font-semibold text-white' : ''}`}
                    >
                      <Icon aria-hidden="true" className={`shrink-0 text-brand ${isOffer ? 'size-5' : 'size-4'}`} />
                      {text}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-(--hero-gap) flex">
        <div className="grid">
          {campaigns.map(({ id, cta }) => {
            // Links para o site da marca abrem em outra aba, sem tirar o cliente da loja.
            const isExternal = cta.href.startsWith('http');
            return (
              <a
                key={id}
                href={cta.href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                onClick={cta.category ? () => onFilter(cta.category) : undefined}
                className={`button hero-fade col-start-1 row-start-1 justify-between ${visibility(id)}`}
              >
                {cta.label}
                {isExternal && <span className="sr-only"> (abre em nova aba)</span>}
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
