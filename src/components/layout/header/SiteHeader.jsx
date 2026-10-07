// Header e Navbar compartilham um único painel sticky; o recorte fica na camada
// decorativa do .chamfer, então dropdowns e focos dos filhos não são cortados.
export default function SiteHeader({ children }) {
  return (
    // O wrapper é transparente e ignora cliques para não bloquear o conteúdo nas laterais do painel.
    <header className="pointer-events-none sticky top-4 z-20 my-4">
      <div className="wrap">
        <div className="chamfer header-bar pointer-events-auto">
          <span aria-hidden="true" className="header-glow" />
          {children}
        </div>
      </div>
    </header>
  );
}
