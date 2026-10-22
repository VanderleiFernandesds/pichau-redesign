import logo from '../../assets/images/logos/logo-pichau.svg';
import pigeonImage from '../../assets/images/account/pombo-gamer-login.avif';

/*
  O painel é escuro nos dois temas, por isso usa sempre a versão branca do logo. O loading lazy
  evita baixar a imagem com a página: o modal fica no DOM desde o carregamento.
*/
export default function AuthShowcase({ title, description, isLeaving }) {
  return (
    <div className="auth-showcase">
      <img src={pigeonImage} alt="" width="1108" height="1420" loading="lazy" decoding="async" className="auth-showcase-image" />
      <img src={logo} alt="Pichau" width="412" height="97" className="auth-showcase-logo" />
      <div key={title} className={`auth-showcase-copy auth-view ${isLeaving ? 'is-leaving' : ''}`}>
        <p className="font-display text-[clamp(26px,2.4vw,34px)] leading-tight font-bold text-balance text-white">{title}</p>
        <p className="mt-2 text-[15px] leading-snug text-[#d7d8dd]">{description}</p>
      </div>
    </div>
  );
}
