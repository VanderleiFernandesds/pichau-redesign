// Header e Navbar compartilham um único painel sticky; o recorte fica na camada
// decorativa do .chamfer, então dropdowns e focos dos filhos não são cortados.
export default function SiteHeader({ children }) {
  return (
    // O wrapper tem altura zero para o painel flutuar sobre o hero em vez de empurrar a página,
    // e ignora cliques para não bloquear o conteúdo nas laterais do painel. Em telas baixas,
    // como celular deitado, o painel deixa de ser sticky para não cobrir metade da tela.
    <header className="pointer-events-none sticky top-4 z-20 h-0 [@media(height<500px)]:relative">
      <div className="wrap">
        <div className="chamfer header-bar pointer-events-auto">
          <span aria-hidden="true" className="header-glow" />
          <span aria-hidden="true" className="corner-accents" />
          <span aria-hidden="true" className="corner-accents corner-accents-mirrored" />
          {children}
        </div>
      </div>
    </header>
  );
}
