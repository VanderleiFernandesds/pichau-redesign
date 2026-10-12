import { ArrowUpRight } from 'lucide-react';
import DepartmentLink from '../../components/ui/DepartmentLink';

/*
  Mesmo card chanfrado dos cards de escolha do hero (purpose-card): cantos vermelhos, brilho e seta
  no hover e no foco. Departamentos sem foto mostram o ícone do menu na mesma área, para os cards
  ficarem alinhados.
*/
export default function DepartmentCard({ department, onOpen }) {
  const Icon = department.icon;

  return (
    <DepartmentLink department={department} onOpen={onOpen} className="chamfer purpose-card department-card text-heading">
      <span aria-hidden="true" className="corner-accents" />

      <span className="flex h-32 w-full items-center justify-center sm:h-36">
        {department.image ? (
          <img src={department.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-contain" />
        ) : (
          <Icon aria-hidden="true" className="size-14 text-muted" strokeWidth={1.25} />
        )}
      </span>

      {/*
        A área do nome tem altura de duas linhas, para as setas ficarem alinhadas entre os cards; nome
        e seta ficam centralizados na vertical, mesmo quando o nome ocupa uma linha só.
      */}
      <span className="mt-4 flex w-full items-center gap-2 font-display text-[15px] leading-tight font-bold lg:text-[16px]">
        <span className="flex min-h-[2lh] min-w-0 flex-1 items-center">
          <span className="line-clamp-2 text-left">{department.name}</span>
        </span>
        <span aria-hidden="true" className="chamfer purpose-card-arrow grid size-6 shrink-0 place-items-center">
          <ArrowUpRight className="size-3.5" />
        </span>
      </span>
    </DepartmentLink>
  );
}
