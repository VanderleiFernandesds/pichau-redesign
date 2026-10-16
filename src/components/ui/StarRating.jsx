import { Star } from 'lucide-react';

const MAX_SCORE = 5;
const scoreFormatter = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const countFormatter = new Intl.NumberFormat('pt-BR');

/*
  Avaliação só para leitura (não é um controle de voto). As estrelas, a nota e a contagem visíveis
  ficam fora da árvore de acessibilidade; o leitor de tela ouve uma frase só, como "Avaliado em 4,8
  de 5, com 128 avaliações". Sem `rating`, mostra "Sem avaliações" em vez de inventar uma nota.
*/
export default function StarRating({ rating, className = '' }) {
  if (!rating) {
    return <p className={`text-[12px] leading-snug text-muted sm:text-[13px] ${className}`}>Sem avaliações</p>;
  }

  const { score, count, isIllustrative } = rating;
  const formattedScore = scoreFormatter.format(score);
  const formattedCount = countFormatter.format(count);

  return (
    <div className={className}>
      {/* flex-wrap: no card mais estreito a contagem desce de linha em vez de ser cortada. */}
      <p className="flex flex-wrap items-center gap-x-1.5 text-[12px] leading-snug sm:text-[13px]">
        <span aria-hidden="true" className="flex">
          {Array.from({ length: MAX_SCORE }, (_, index) => (
            <StarFill key={index} fill={Math.min(Math.max(score - index, 0), 1)} />
          ))}
        </span>
        <span aria-hidden="true" className="flex gap-1">
          <span className="font-semibold text-heading">{formattedScore}</span>
          <span className="text-muted">({formattedCount})</span>
        </span>
        <span className="sr-only">
          Avaliado em {formattedScore} de {MAX_SCORE}, com {formattedCount} {count === 1 ? 'avaliação' : 'avaliações'}
        </span>
      </p>
      {isIllustrative && <p className="text-[11px] leading-snug text-muted">Avaliação ilustrativa</p>}
    </div>
  );
}

/*
  Estrela vazia por baixo e a cheia recortada por cima, proporcional à nota: 4,8 deixa a quinta
  estrela 80% preenchida. O desenho do lucide vai de x 2 a x 22 na caixa de 24, então o recorte é
  calculado sobre essa faixa, e não sobre a caixa inteira. O ícone de cima tem tamanho fixo, para
  o recorte não o encolher.
*/
function StarFill({ fill }) {
  return (
    <span className="relative size-3.5 sm:size-4">
      <Star className="star-empty absolute inset-0 size-full fill-current" strokeWidth={0} />
      <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${((2 + 20 * fill) / 24) * 100}%` }}>
        <Star className="star-full size-3.5 fill-current sm:size-4" strokeWidth={0} />
      </span>
    </span>
  );
}
