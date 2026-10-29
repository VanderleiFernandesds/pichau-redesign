import { ArrowUpRight } from 'lucide-react';
import DepartmentLink from '../../components/ui/DepartmentLink';

// Maior largura que a foto ocupa no card: até ~132px no celular e ~210px nas telas maiores.
const IMAGE_SIZES = '(width < 601px) 132px, 210px';

/*
  Mesmo card chanfrado do purpose-card, sem o brilho no hover. O card inteiro é o link (ou botão);
  a seta é só indicação. Departamentos sem foto mostram o ícone do menu na mesma área, para os
  cards ficarem alinhados.
*/
export default function DepartmentCard({ department, isImageDeferred = false, onOpen }) {
  const Icon = department.icon;

  return (
    <DepartmentLink department={department} onOpen={onOpen} className="chamfer purpose-card department-card text-heading">
      <span aria-hidden="true" className="corner-accents" />

      <span className="flex h-32 w-full items-center justify-center sm:h-36">
        {department.image ? (
          // Sem lazy: dentro da trilha horizontal o navegador só baixa a foto quando o card chega perto
          // da tela, e os últimos apareciam vazios por um instante. Até o load da página a foto fica sem
          // src, para as ~330 KB não disputarem a banda com o LCP; ver DepartmentShowcase.
          <img
            src={isImageDeferred ? undefined : department.image}
            srcSet={isImageDeferred ? undefined : department.imageSrcSet}
            sizes={IMAGE_SIZES}
            alt=""
            decoding="async"
            className="h-full w-full object-contain"
          />
        ) : (
          <Icon aria-hidden="true" className="size-14 text-muted" strokeWidth={1.25} />
        )}
      </span>

      {/*
        A área do nome tem altura de duas linhas, para as setas ficarem alinhadas entre os cards; nome
        e seta ficam centralizados na vertical, mesmo quando o nome ocupa uma linha só.
      */}
      <span className="department-card-label mt-4 flex w-full items-center gap-2 font-display leading-tight font-bold">
        <span className="flex min-h-[2lh] min-w-0 flex-1 items-center">
          <span className="department-card-name line-clamp-2 text-left transition-colors">{department.name}</span>
        </span>
        {/* No celular e nos cards estreitos o nome precisa da largura toda; o toque no card já é o atalho. */}
        <span aria-hidden="true" className="chamfer purpose-card-arrow grid size-6 shrink-0 place-items-center max-sm:hidden @max-[126px]:hidden">
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </DepartmentLink>
  );
}
