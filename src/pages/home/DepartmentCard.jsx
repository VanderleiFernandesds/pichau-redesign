import { ArrowUpRight } from 'lucide-react';
import DepartmentLink from '../../components/ui/DepartmentLink';

/*
  Mesmo card chanfrado dos cards de escolha do hero (purpose-card), com destaque mais contido: no
  hover e no foco só a borda, o nome e a seta ficam vermelhos. A seta é só indicação; o card inteiro
  é o link (ou botão). Departamentos sem foto mostram o ícone do menu na mesma área, para os cards
  ficarem alinhados.
*/
export default function DepartmentCard({ department, onOpen }) {
  const Icon = department.icon;

  return (
    <DepartmentLink department={department} onOpen={onOpen} className="chamfer purpose-card department-card text-heading">
      <span aria-hidden="true" className="corner-accents" />

      <span className="flex h-32 w-full items-center justify-center sm:h-36">
        {department.image ? (
          // Sem lazy: dentro da trilha horizontal o navegador só baixa a foto quando o card chega perto
          // da tela, e os últimos apareciam vazios por um instante. São fotos pequenas (~260 KB juntas).
          <img src={department.image} alt="" decoding="async" className="h-full w-full object-contain" />
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
        {/* No celular o card estreito precisa da largura toda para o nome; o toque no card já é o atalho. */}
        <span aria-hidden="true" className="chamfer purpose-card-arrow grid size-6 shrink-0 place-items-center max-sm:hidden">
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </DepartmentLink>
  );
}
