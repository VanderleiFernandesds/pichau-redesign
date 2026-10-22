import separatorSource from '../../../assets/images/logos/nav-separator-penas.svg?raw';

/*
  Separador do navbar desktop (três penas). O SVG é renderizado inline com currentColor para usar o
  vermelho do tema, e não a cor fixa do arquivo. A caixa tem 16px, e 20px a partir de 1440px, para
  os sete itens caberem na linha desde 1001px.
*/
const VIEW_BOX = separatorSource.match(/viewBox="([^"]+)"/)[1];
const PATHS = [...separatorSource.matchAll(/\sd="([^"]+)"/g)].map((match) => match[1]);

export default function NavSeparator({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={VIEW_BOX}
      fill="currentColor"
      className={`pointer-events-none size-4 shrink-0 xl:size-5 text-brand ${className}`}
    >
      {PATHS.map((path) => (
        <path key={path} d={path} />
      ))}
    </svg>
  );
}
