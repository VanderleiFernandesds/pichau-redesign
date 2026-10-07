import PurposeCard from './PurposeCard';
import { PURPOSES } from '../../data/home';

export default function PurposeCards({ onFilter }) {
  return (
    <section
      id="choose"
      aria-label="Escolha seu computador"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-4"
    >
      {PURPOSES.map((purpose) => (
        <PurposeCard key={purpose.title} purpose={purpose} onFilter={onFilter} />
      ))}
    </section>
  );
}
