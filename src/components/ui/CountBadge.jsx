/*
  Contador dos ícones do carrinho e dos favoritos: 18px de altura mínima, cresce na horizontal
  para dois dígitos e "99+". Vazio, não aparece. É só visual: o botão já diz a quantidade no
  nome acessível. tone="brand" (vermelho com texto branco) é o dos favoritos, com um anel da cor
  da página para não se fundir com o coração preenchido; tone="light" (branco com texto escuro) é
  o do carrinho, que fica sobre o botão vermelho ou verde.
*/
const TONES = {
  brand: 'bg-brand text-white shadow-[0_0_0_2px_var(--color-page)]',
  light: 'bg-white text-ink shadow-[0_1px_3px_rgb(0_0_0/0.35)]',
};

export default function CountBadge({ count, tone = 'brand', className = '' }) {
  if (count <= 0) return null;

  return (
    <i
      aria-hidden="true"
      className={`grid h-4.5 min-w-4.5 place-items-center rounded-full px-1 text-[11px] leading-none font-bold not-italic tabular-nums ${TONES[tone]} ${className}`}
    >
      {count > 99 ? '99+' : count}
    </i>
  );
}
