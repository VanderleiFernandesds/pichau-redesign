import { ArrowRight, ArrowUpRight, ChevronUp, Headset, MapPin } from 'lucide-react';
import PichauLogo from '../../ui/PichauLogo';
import BrandIcon from '../../ui/BrandIcon';
import DepartmentLink from '../../ui/DepartmentLink';
import FooterLinkGroup, { footerHeadingClass } from './FooterLinkGroup';
import NewsletterForm from './NewsletterForm';
import PaymentMethods from './PaymentMethods';
import ContactPanel from './ContactPanel';
import BusinessBanner from './BusinessBanner';
import { AUTHOR, FOOTER_DEPARTMENTS, HELP_TOPICS, OFFICIAL_SUPPORT, SOCIAL_LINKS } from '../../../data/footer';

const linkBaseClass = 'inline-flex min-h-10 items-center gap-2 text-[15px] underline-offset-4 transition-colors hover:underline';
const linkClass = `${linkBaseClass} text-soft hover:text-heading`;
const externalLinkClass =
  'inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-heading underline-offset-4 transition-colors hover:text-brand hover:underline';

// O id "support" é o destino do "Atendimento" da navegação.
export default function Footer({ onOpenHelp, onOpenDepartment, onShowAllDepartments }) {
  // Volta ao topo e leva o foco ao logo do header, para o teclado continuar do começo da página.
  function scrollToTop() {
    window.scrollTo({ top: 0 });
    document.querySelector('header a[aria-label="Pichau início"]')?.focus({ preventScroll: true });
  }

  return (
    <footer id="support" className="bg-footer pt-8 pb-6 text-soft sm:pt-12 sm:pb-8">
      <div className="wrap flex flex-col gap-3 sm:gap-4">
        {/*
          Ajuda e atendimento numa seção só: os canais oficiais da Pichau e, para o que é simulado
          aqui, a Central de ajuda do projeto. Evita repetir "Precisa de ajuda?" em dois lugares.
        */}
        <section aria-labelledby="footer-help" className="flex flex-col gap-3 sm:gap-4">
          <div className="flex flex-col gap-4 pb-1 px-(--box-padding) lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div>
              <h2 id="footer-help" className={`${footerHeadingClass} text-[24px] sm:text-[28px]`}>
                <span aria-hidden="true" className="slash-accent" />
                Precisa de ajuda?
              </h2>
              <p className="mt-2 max-w-[62ch] text-[15px] leading-relaxed">
                Fale com a Pichau pelos canais oficiais abaixo. Para saber o que é simulado neste projeto, abra a Central de
                ajuda.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onOpenHelp()}
              className="chamfer chip-button flex h-12 shrink-0 items-center justify-center gap-3 px-6 text-[14px] font-bold tracking-[0.5px] text-heading uppercase"
            >
              Central de ajuda
              <ArrowRight aria-hidden="true" className="size-4.5" />
            </button>
          </div>

          <div className="grid gap-3 sm:gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <ContactPanel icon={Headset} {...OFFICIAL_SUPPORT.online} />
            <ContactPanel
              icon={MapPin}
              {...OFFICIAL_SUPPORT.store}
              action={
                <a
                  href={OFFICIAL_SUPPORT.store.pageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="chamfer chamfer-outline flex h-11 items-center gap-2 px-5 text-[14px] font-bold text-heading"
                >
                  Ver loja
                  <ArrowUpRight aria-hidden="true" className="size-4.5" />
                  <span className="sr-only"> física da Pichau (abre em nova aba)</span>
                </a>
              }
            />
          </div>

          <BusinessBanner />

          <p className="text-center text-[13px] text-soft">
            Referência à loja oficial. Este projeto não oferece atendimento ou vendas.
          </p>
        </section>

        <div className="chamfer footer-panel px-(--box-padding) pt-6 pb-6 sm:pt-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)_minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-0">
            <div className="lg:pr-8">
              <a href="./" aria-label="Pichau início" className="inline-block">
                <PichauLogo className="h-[34px] w-auto sm:h-[40px]" />
              </a>
              <p className="mt-3 text-[15px]">Tecnologia para o seu próximo nível.</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.icon}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Pichau no ${social.name} (abre em nova aba)`}
                      className="chamfer chip-button grid size-11 place-items-center text-heading"
                    >
                      <BrandIcon name={social.icon} className="size-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:border-l lg:border-line lg:px-8">
              <FooterLinkGroup title="Departamentos">
                <ul>
                  {FOOTER_DEPARTMENTS.map((department) => (
                    <li key={department.id}>
                      <DepartmentLink department={department} onOpen={onOpenDepartment} className={linkClass}>
                        {department.name}
                      </DepartmentLink>
                    </li>
                  ))}
                  <li>
                    <button type="button" onClick={onShowAllDepartments} className={`${linkBaseClass} font-semibold text-heading hover:text-brand`}>
                      Ver todos
                      <ArrowRight aria-hidden="true" className="size-4" />
                    </button>
                  </li>
                </ul>
              </FooterLinkGroup>
            </div>

            <div className="lg:border-l lg:border-line lg:px-8">
              <FooterLinkGroup title="Informações">
                <ul>
                  {HELP_TOPICS.map((topic) => (
                    <li key={topic.id}>
                      <button type="button" onClick={() => onOpenHelp(topic.id)} className={linkClass}>
                        {topic.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </FooterLinkGroup>
            </div>

            <section aria-labelledby="footer-newsletter" className="lg:border-l lg:border-line lg:pl-8">
              <h2 id="footer-newsletter" className={footerHeadingClass}>
                <span aria-hidden="true" className="slash-accent" />
                Fique por dentro
              </h2>
              <p className="mt-2 mb-4 text-[15px]">Novidades para o seu setup.</p>
              <NewsletterForm />
            </section>
          </div>

          <div className="mt-8 border-t border-line pt-6">
            <PaymentMethods />
          </div>
        </div>

        <section
          aria-label="Sobre este projeto"
          className="chamfer footer-panel flex flex-col gap-4 px-(--box-padding) py-5 sm:flex-row sm:items-center sm:gap-6"
        >
          <div className="flex gap-3">
            <span aria-hidden="true" className="slash-accent mt-1" />
            <div>
              <p className="text-[15px] font-semibold text-heading">Projeto de estudo desenvolvido por {AUTHOR.name}.</p>
              <p className="mt-1 text-[13px] text-muted">Sem vínculo com a Pichau. Não realiza vendas.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:ml-auto">
            <a href={AUTHOR.github} target="_blank" rel="noopener noreferrer" className={externalLinkClass}>
              <BrandIcon name="github" className="size-4.5" />
              GitHub
              <ArrowUpRight aria-hidden="true" className="size-4" />
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Voltar ao topo"
              title="Voltar ao topo"
              className="chamfer chip-button ml-auto grid size-12 place-items-center text-heading sm:ml-0"
            >
              <ChevronUp aria-hidden="true" className="size-5" />
            </button>
          </div>
        </section>
      </div>
    </footer>
  );
}
