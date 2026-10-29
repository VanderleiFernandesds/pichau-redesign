import PurposeCard from './PurposeCard';
import { PURPOSES } from '../../data/home';
import { useAfterPageLoad } from '../../hooks/useAfterPageLoad';
import { useMediaQuery } from '../../hooks/useMediaQuery';

// Mesma media query do hero: abaixo dela a arte do slide ocupa a primeira tela e os cards ficam
// abaixo, então as imagens deles só são pedidas depois do load. No desktop ficam à mostra.
const MOBILE_MEDIA = '(width < 1001px)';

export default function PurposeCards({ onFilter }) {
  const isPageLoaded = useAfterPageLoad();
  const isMobile = useMediaQuery(MOBILE_MEDIA);

  return (
    <section
      id="choose"
      aria-label="Escolha seu computador"
      // Abaixo de 320px (celular estreito ou texto ampliado com zoom) duas colunas não cabem.
      className="grid grid-cols-2 gap-x-3 gap-y-4 max-[319px]:grid-cols-1 sm:gap-3.5 lg:grid-cols-4"
    >
      {PURPOSES.map((purpose) => (
        <PurposeCard
          key={purpose.title}
          purpose={purpose}
          isImageDeferred={isMobile && !isPageLoaded}
          onFilter={onFilter}
        />
      ))}
    </section>
  );
}
