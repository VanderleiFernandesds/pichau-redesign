import PurposeCard from './PurposeCard';
import { PURPOSES } from '../../data/home';

export default function PurposeCards({ onFilter }) {
  return (
    <section
      id="choose"
      aria-label="Escolha seu computador"
      // Abaixo de 320px (celular estreito ou texto ampliado com zoom) duas colunas não cabem.
      className="grid grid-cols-2 gap-3 max-[319px]:grid-cols-1 sm:gap-3.5 lg:grid-cols-4"
    >
      {PURPOSES.map((purpose) => (
        <PurposeCard key={purpose.title} purpose={purpose} onFilter={onFilter} />
      ))}
    </section>
  );
}
