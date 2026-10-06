import { ArrowUpRight } from 'lucide-react';

const EXPLORE_LINKS = [
  { href: '#offers', label: 'Produtos e ofertas' },
  { href: '#choose', label: 'Encontre seu PC' },
  { href: '#builder', label: 'Monte seu setup' },
];

const headingClass = 'mb-3 text-[14px] font-bold text-white';
const linkClass = 'inline-flex items-center gap-1 py-1.5 text-[14px] underline-offset-4 transition-colors hover:text-white hover:underline';

export default function Footer() {
  return (
    <footer id="support" className="bg-ink text-[#c3c5cd]">
      <div className="wrap grid gap-10 pt-12 pb-10 sm:grid-cols-2 sm:gap-x-12 sm:pt-14 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:gap-x-20">
        <div className="sm:col-span-2 lg:col-span-1">
          <a href="./" className="text-[36px] font-black tracking-[-3px] text-white" aria-label="Pichau início">
            Pichau
          </a>
          <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed">Seu próximo nível começa aqui.</p>
          <p className="mt-4 max-w-[38ch] text-[13px] leading-relaxed text-[#9296a1]">
            Projeto conceitual independente.
            <br />
            Sem vínculo comercial com a Pichau.
            <br />
            Produtos e preços apenas demonstrativos.
          </p>
        </div>

        <nav aria-labelledby="footer-explore">
          <h2 id="footer-explore" className={headingClass}>
            Explore
          </h2>
          <ul>
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={headingClass}>Atendimento oficial</h2>
          <p className="max-w-[32ch] text-[14px] leading-relaxed">
            Para comprar, consultar estoque e obter suporte, acesse o site oficial.
          </p>
          <a href="https://www.pichau.com.br/" target="_blank" rel="noopener" className={`${linkClass} mt-2 font-bold text-white`}>
            Visitar a Pichau
            <ArrowUpRight aria-hidden="true" className="size-4" />
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        </div>
      </div>

      {/* A borda fica num elemento interno para acompanhar a largura do conteúdo, não o padding do container. */}
      <div className="wrap">
        <div className="flex flex-col gap-1 border-t border-[#ffffff15] py-6 text-[12px] text-[#9296a1] sm:flex-row sm:justify-between">
          <span>React · Vite · Tailwind</span>
          <span>Redesign conceitual / 2026</span>
        </div>
      </div>
    </footer>
  );
}
