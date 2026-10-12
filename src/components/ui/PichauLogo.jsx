import logoLight from '../../assets/images/logos/logo-pichau.svg';
import logoDark from '../../assets/images/logos/logo-pichau-escuro.svg';

// As duas versões ficam no HTML e o CSS mostra a do tema atual (theme-dark-only/theme-light-only),
// então o logo troca junto com o resto da página, sem depender do estado do React.
export default function PichauLogo({ className = '' }) {
  return (
    <>
      <img src={logoLight} alt="" width="412" height="97" className={`theme-dark-only ${className}`} />
      <img src={logoDark} alt="" width="412" height="97" className={`theme-light-only ${className}`} />
    </>
  );
}
