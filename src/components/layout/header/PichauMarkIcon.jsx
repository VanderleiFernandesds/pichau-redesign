import markSource from '../../../assets/images/logos/pichau-marca.svg?raw';

/*
  Símbolo da Pichau no item "Empresas" do navbar. Como no NavSeparator, o SVG é renderizado inline
  com currentColor para seguir a cor do item. O desenho não ocupa o viewBox inteiro, então a caixa
  tem 24px, contra 20px dos ícones do lucide, para o peso visual ficar parecido.
*/
const VIEW_BOX = markSource.match(/viewBox="([^"]+)"/)[1];
const PATHS = [...markSource.matchAll(/\sd="([^"]+)"/g)].map((match) => match[1]);

/*
  Decorativo: o texto do link já o identifica. O tamanho é fixo e ignora o size-5 que o Navbar
  passa aos outros ícones.
*/
export default function PichauMarkIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={VIEW_BOX}
      fill="currentColor"
      className="size-6 shrink-0"
    >
      {PATHS.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
