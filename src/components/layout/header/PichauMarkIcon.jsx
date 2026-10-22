import markSource from '../../../assets/images/logos/pichau-marca.svg?raw';

/*
  Símbolo da Pichau (as penas) no item "Empresas" do navbar. Como no NavSeparator, o desenho vem do
  arquivo SVG e é renderizado inline com currentColor, para seguir a cor do item como os outros
  ícones, em vez do preenchimento escuro fixo do arquivo. O símbolo não ocupa o viewBox inteiro,
  então a caixa é um pouco maior que a dos ícones do lucide (24px contra 20px) para o peso visual
  ficar parecido.
*/
const VIEW_BOX = markSource.match(/viewBox="([^"]+)"/)[1];
const PATHS = [...markSource.matchAll(/\sd="([^"]+)"/g)].map((match) => match[1]);

/*
  O texto do link já o identifica: o símbolo é decorativo. O tamanho é fixo, sem a classe que o
  Navbar passa aos ícones (size-5), justamente por ser o que precisa ser diferente aqui.
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
