/*
  Divisória do topo das seções da home. Só os trechos retos esticam; o chanfro e a ponta têm
  medidas fixas para não deformar em larguras diferentes. Os trechos fixos desenham um pouco além
  da própria caixa (overflow visível) para as quinas emendarem sem fresta.
*/
export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="section-divider">
      <svg viewBox="0 0 10 28" preserveAspectRatio="none" className="w-[clamp(64px,15%,180px)]">
        <path d="M0 5H10" className="stroke-brand" strokeWidth="2" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 18 28" overflow="visible" className="w-[18px]">
        <path d="M0 5L18 23H20" className="stroke-divider" strokeWidth="1" />
        <path d="M-2 5H0L18 23" className="stroke-brand" strokeWidth="2" />
      </svg>
      <svg viewBox="0 0 10 28" preserveAspectRatio="none" className="flex-1">
        <path d="M0 23H10" className="stroke-divider" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 10 28" className="w-[10px]">
        <path d="M0 21H4L10 27H6Z" className="fill-brand" />
      </svg>
    </div>
  );
}
