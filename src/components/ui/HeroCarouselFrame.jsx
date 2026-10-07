// Moldura em paralelogramo para o carrossel do hero. O contorno e a área interna
// usam o mesmo formato via clip-path: o conteúdo é recortado, nunca inclinado (sem skew).
// Tamanho, inclinação, espessura e cores ficam nas variáveis --frame-* de .hero-frame.
export default function HeroCarouselFrame({ children, className = '' }) {
  return (
    <div className={`hero-frame ${className}`}>
      <div aria-hidden="true" className="hero-frame-layer hero-frame-line" />
      <div className="hero-frame-layer hero-frame-content">{children}</div>
    </div>
  );
}
