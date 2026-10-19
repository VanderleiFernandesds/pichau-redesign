/*
  Torna a arte da campanha clicável, com o destino do CTA. Fica fora do Tab e da árvore de
  acessibilidade: o CTA em texto já é o link acessível, e este é só uma área de clique maior.
*/
export default function CampaignArtLink({ cta, className }) {
  const isExternal = cta.href.startsWith('http');
  return (
    <a
      href={cta.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      tabIndex={-1}
      aria-hidden="true"
      className={className}
    />
  );
}
