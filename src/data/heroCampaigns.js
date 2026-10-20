import energyDrinkBackground from '../assets/images/banners/energy-drink/fundo-1985x792.avif';
import energyDrinkBackgroundMobile from '../assets/images/banners/energy-drink/fundo-celular-1122x1402.avif';
import energyDrinkLogo from '../assets/images/banners/energy-drink/logo-pichau-energy-drink.svg';
import energyDrinkBackgroundClosed from '../assets/images/banners/energy-drink/fundo-fechado-322x996.avif';
import corsairBackground from '../assets/images/banners/corsair/fundo-1986x792.avif';
import corsairBackgroundMobile from '../assets/images/banners/corsair/fundo-celular-1122x1402.avif';
import corsairBackgroundClosed from '../assets/images/banners/corsair/fundo-fechado-322x892.avif';
import corsairLogo from '../assets/images/banners/corsair/logo.avif';
import corsairLogoDark from '../assets/images/banners/corsair/logo-escuro.avif';
import rogBackground from '../assets/images/banners/rog/fundo-1986x792.avif';
import rogBackgroundMobile from '../assets/images/banners/rog/fundo-celular-1122x1402.avif';
import rogBackgroundClosed from '../assets/images/banners/rog/fundo-fechado-322x742.avif';
import rogLogo from '../assets/images/banners/rog/logo.svg';
import rogLogoDark from '../assets/images/banners/rog/logo-escuro.svg';


/*
  Campanhas dos painéis do hero: fundo (a arte da campanha, com ou sem os produtos), objetos
  transparentes e textos do card.

  background.position  object-position do fundo no card fechado, no expandido e no fundo ampliado
                       (stage), que cobre o texto e o card expandido no desktop.
  objects              cada PNG tem proporção própria (width/height naturais). Por estado:
    x, y   centro do objeto, em % da largura e da altura do card
    scale  escala sobre `size`, a largura base em cqmin (1% do menor lado do card), então o
           objeto já encolhe no card estreito e cresce junto com a expansão
    layer  z-index entre os objetos
    base   (só no fechado, no lugar de y) altura onde a base do objeto encosta, para apoiá-lo
           num bloco do fundo: o card fechado tem a altura da arte, então o ponto não muda
    collapsed: null  o objeto aparece só no card expandido
    expanded: null   só no card fechado do desktop (logos: no aberto e no celular o logo fica acima do título)
  background.productArea  para artes que já trazem os produtos (top e bottom em px da imagem, do
                       topo dos produtos até o fim da base onde se apoiam). Abaixo de 1001px a arte
                       é dimensionada para essa faixa caber inteira sob o texto; o que fica abaixo
                       de bottom é cortado. Exige background.width e background.height. A arte
                       cobre a largura do card; com isWholeArt, ela fica no máximo com essa
                       largura, sem cortar as laterais.
  background.mobile    (opcional) arte própria abaixo de 1001px (celular e tablet): src, width, height e productArea.
  background.closed    (opcional) arte própria do card fechado do desktop: src, width e height.
                       Ocupa a largura do card, encostada na base, sem cortar os produtos.
  Textos da coluna à esquerda do hero, trocados junto com o card expandido. Só usam informações
  reais dos banners da campanha; sem specs, preços ou benefícios que eles não anunciam.
    logo         logo da marca acima do título, no lugar do eyebrow (texto curto acima do título);
                 width/height dão a proporção e displayWidth a largura no desktop (altura automática);
                 srcOnLight é a versão com texto escuro para o tema claro, quando o logo tem texto branco
    title        partes do título; com isTitleStacked, cada uma ocupa uma linha
    description  até três linhas
    details      oferta, data ou local; `type` escolhe o ícone (offer, date, location)
    cta          chamada (label, href e, opcional, a categoria que filtra as ofertas); mobileLabel
                 é um texto mais curto para o botão do celular
*/
export const HERO_CAMPAIGNS = {
  /*
    As artes já trazem as latas, então só o logo é objeto. closed é o painel vertical (Original,
    Zero e Açaí) sem o logo, a seta e a moldura que vinham nele. stage centraliza a lata Original
    (x ~1215, 134px à direita do centro da arte na altura do card) no trecho do card expandido, à
    direita do texto; o clamp impede que a arte deixe uma faixa vazia nas bordas.
  */
  energyDrink: {
    id: 'energy-drink',
    name: 'Pichau Energy Drink',
    background: {
      src: energyDrinkBackground,
      width: 1985,
      height: 792,
      position: {
        collapsed: '50% 50%',
        expanded: '50% 50%',
        stage: 'clamp(100%, 50% + (var(--copy-width) + var(--copy-gap)) / 2 - 134px, 0%) 50%',
      },
      productArea: { top: 165, bottom: 700 },
      mobile: {
        src: energyDrinkBackgroundMobile,
        width: 1122,
        height: 1402,
        productArea: { top: 610, bottom: 1260 },
      },
      closed: { src: energyDrinkBackgroundClosed, width: 322, height: 996 },
    },
    objects: [
      {
        id: 'logo',
        src: energyDrinkLogo,
        width: 1647,
        height: 690,
        size: 100,
        collapsed: { x: '50%', y: '10%', scale: 0.72, layer: 4 },
        expanded: null,
      },
    ],
    logo: { src: energyDrinkLogo, width: 1647, height: 690, displayWidth: 150, alt: 'Pichau Energy Drink' },
    title: ['Escolha seu sabor.', 'Entre no jogo.'],
    isTitleStacked: true,
    description: 'Conheça a linha e encontre o seu favorito.',
    details: [],
    cta: { label: 'Explorar sabores', href: 'https://www.pichau.com.br/search?q=energetico%20pichau' },
  },
  /*
    Como no ROG, as três artes já trazem os produtos (gabinete, cadeira, fonte, teclado, mouse e
    headset), então só o logo é objeto. closed é a arte estreita sem o logo, a seta e a moldura que
    vinham nela. stage põe o gabinete (x ~1140, 88px à direita do centro da arte na altura do
    card) 100px à esquerda do centro do card expandido, para a cadeira e o headset caberem à
    direita. Só a borda direita é limitada, e em telas largas a arte passa da
    borda esquerda, sob a parte opaca do degradê. Em notebooks as pontas ficam cortadas.
  */
  corsair: {
    id: 'corsair',
    name: 'Seleção Corsair',
    background: {
      src: corsairBackground,
      width: 1986,
      height: 792,
      position: {
        collapsed: '50% 50%',
        expanded: '50% 50%',
        stage: 'max(100%, 50% + (var(--copy-width) + var(--copy-gap)) / 2 - 188px) 50%',
      },
      productArea: { top: 21, bottom: 775 },
      mobile: {
        src: corsairBackgroundMobile,
        width: 1122,
        height: 1402,
        productArea: { top: 560, bottom: 1280 },
      },
      closed: { src: corsairBackgroundClosed, width: 322, height: 892 },
    },
    objects: [
      {
        id: 'logo',
        src: corsairLogo,
        srcOnLight: corsairLogoDark,
        width: 800,
        height: 186,
        size: 100,
        collapsed: { x: '50%', y: '8%', scale: 0.82, layer: 6 },
        expanded: null,
      },
    ],
    logo: { src: corsairLogo, srcOnLight: corsairLogoDark, width: 800, height: 186, displayWidth: 189, alt: 'Corsair' },
    title: ['Seu setup.', 'Sem limites.'],
    isTitleStacked: true,
    description: 'Explore componentes e periféricos Corsair para completar seu espaço gamer.',
    details: [],
    cta: { label: 'Explorar Corsair', href: 'https://www.pichau.com.br/marca/corsair' },
  },
  /*
    As três artes já trazem os produtos (monitor, placa, ROG Ally, teclado e headset), então só o
    logo é objeto. closed é a arte estreita sem o logo, a seta e a moldura que vinham nela. stage
    põe o monitor (x ~1238, 147px à direita do centro da arte na altura do card) 100px à esquerda
    do centro do card expandido, para a placa e o headset ganharem espaço, e a arte cobre o card. Só a borda direita é
    limitada: em telas largas a arte passa da borda esquerda, onde o degradê do fundo ampliado já
    é opaco, e o ROG Ally entra no card. Em notebooks o card não comporta todos os produtos e as
    pontas (Ally e headset) ficam cortadas ou sob o texto.
  */
  asusRog: {
    id: 'asus-rog',
    name: 'ASUS ROG',
    background: {
      src: rogBackground,
      width: 1986,
      height: 792,
      position: {
        collapsed: '50% 50%',
        expanded: '50% 50%',
        stage: 'max(100%, 50% + (var(--copy-width) + var(--copy-gap)) / 2 - 247px) 50%',
      },
      productArea: { top: 35, bottom: 700 },
      mobile: {
        src: rogBackgroundMobile,
        width: 1122,
        height: 1402,
        productArea: { top: 585, bottom: 1190 },
      },
      closed: { src: rogBackgroundClosed, width: 322, height: 742 },
      // No celular o Ally e o headset ficam na borda da arte: ela não pode ser cortada nas laterais.
      isWholeArt: true,
    },
    objects: [
      {
        id: 'logo',
        src: rogLogo,
        srcOnLight: rogLogoDark,
        width: 200,
        height: 37,
        size: 100,
        collapsed: { x: '50%', y: '7.5%', scale: 0.8, layer: 6 },
        expanded: null,
      },
    ],
    logo: { src: rogLogo, srcOnLight: rogLogoDark, width: 200, height: 37, displayWidth: 220, alt: 'ASUS Republic of Gamers' },
    title: ['Seu próximo nível', 'começa aqui.'],
    isTitleStacked: true,
    description: 'Explore hardware e periféricos ASUS ROG para o seu setup.',
    details: [],
    cta: { label: 'Explorar ASUS ROG', href: 'https://www.pichau.com.br/marca/asus' },
  },
};

// O primeiro slide é o LCP: o index.html pré-carrega o fundo dele, então os dois mudam juntos.
export const HERO_SLIDES = [HERO_CAMPAIGNS.energyDrink, HERO_CAMPAIGNS.corsair, HERO_CAMPAIGNS.asusRog];
