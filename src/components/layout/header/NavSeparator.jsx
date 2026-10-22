import separatorSource from '../../../assets/images/logos/nav-separator-penas.svg?raw';

/*
  Separador decorativo do navbar desktop (três penas). O desenho vem do arquivo SVG; aqui só lemos o
  viewBox e os caminhos para renderizar o SVG inline com currentColor: assim ele usa o vermelho do
  tema (text-brand) em vez da cor fixa do arquivo. A proporção é preservada (meet) dentro da caixa,
  que tem 20px a partir de 1440px e 16px abaixo, para os sete itens caberem na linha desde 1001px.
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
