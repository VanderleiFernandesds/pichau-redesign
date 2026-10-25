import { LucideProvider } from 'lucide-react';
import Storefront from './pages/Storefront';

// Padrão dos ícones: acompanham o font-size do contexto (1em) com traço 2;
// cada uso ajusta o tamanho com classes size-* quando precisa.
export default function App() {
  return (
    <LucideProvider size="1em" strokeWidth={2} className="shrink-0">
      <Storefront />
    </LucideProvider>
  );
}
