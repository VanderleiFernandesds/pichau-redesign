import energyDrinkBackground from '../assets/pichau-camadas/energy-drink/fundo-1192x475.avif';
import energyDrinkLogo from '../assets/pichau-camadas/energy-drink/logo-pichau-drink-protein.svg';
import energyDrinkCan from '../assets/pichau-camadas/energy-drink/lata.avif';
import energyDrinkMascot from '../assets/pichau-camadas/energy-drink/mascote.avif';
import energyDrinkSamurai from '../assets/pichau-camadas/energy-drink/samurai.avif';
import corsairBackground from '../assets/pichau-camadas/corsair/fundo-1192x475.avif';
import corsairCase from '../assets/pichau-camadas/corsair/gabinete.avif';
import corsairMemory from '../assets/pichau-camadas/corsair/memorias.avif';
import corsairPowerSupply from '../assets/pichau-camadas/corsair/fonte.avif';
import corsairHeadset from '../assets/pichau-camadas/corsair/headset.avif';
import corsairKeyboard from '../assets/pichau-camadas/corsair/teclado.avif';
import corsairMouse from '../assets/pichau-camadas/corsair/mouse.avif';
import corsairLogo from '../assets/pichau-camadas/corsair/logo.avif';
import corsairLogoDark from '../assets/pichau-camadas/corsair/logo-escuro.avif';
import rogBackground from '../assets/pichau-camadas/rog/fundo-1192x475.avif';
import rogLogo from '../assets/pichau-camadas/rog/logo.svg';
import rogLogoDark from '../assets/pichau-camadas/rog/logo-escuro.svg';
import rogNotebook from '../assets/pichau-camadas/rog/notebook.avif';
import rogHandheld from '../assets/pichau-camadas/rog/portatil.avif';
import rogGraphicsCard from '../assets/pichau-camadas/rog/placa-video.avif';
import rogKeyboard from '../assets/pichau-camadas/rog/teclado.avif';
import rogHeadset from '../assets/pichau-camadas/rog/headset.avif';
import rogMouse from '../assets/pichau-camadas/rog/mouse.avif';
import arenaBackground from '../assets/pichau-camadas/pichau-arena/fundo-684x475.avif';
import arenaLogo from '../assets/pichau-camadas/pichau-arena/logo-arena.avif';
import arenaGamerGeek from '../assets/pichau-camadas/pichau-arena/gamer-geek.avif';


/*
  Campanhas dos painéis do hero: fundo (475 de altura; 684 ou 1192 de largura), objetos transparentes e textos do card.

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
    scene  (desktop, card expandido) apoia o objeto num ponto do fundo, em px da imagem: x do
           centro, bottom (onde a base encosta) e width. Exige background.width e o stage
           alinhado à direita (100%), que coincide com a borda direita do card. O fundo tem a
           altura do card e aparece em 1:1, então o objeto fica sobre o mesmo bloco da arte
           em qualquer largura; o que passa da borda esquerda do card é cortado.
    sceneMobile  o mesmo no celular, onde o texto fica sobre a arte: o fundo passa a ocupar só a
           faixa dos objetos, na base, alinhado à direita (exige background.height). Até 600px a
           faixa mostra só a parte direita da arte, então as posições são próprias; acima disso
           ela mostra a arte quase inteira e usa as de scene.
    sceneNarrow  (opcional) o mesmo no card expandido do desktop enquanto ele é estreito demais
           para scene (abaixo de ~640px) e mostra só a parte direita da arte, em 1:1.
  Textos da coluna à esquerda do hero, trocados junto com o card expandido. Só usam informações
  reais dos banners da campanha; sem specs, preços ou benefícios que eles não anunciam.
    logo         logo da marca acima do título, no lugar do eyebrow (texto curto acima do título);
                 width/height dão a proporção e displayWidth a largura no desktop (altura automática);
                 srcOnLight é a versão com texto escuro para o tema claro, quando o logo tem texto branco
    title        partes do título; com isTitleStacked, cada uma ocupa uma linha
    description  até três linhas
    highlights   até três destaques curtos (vazio quando não há o que destacar)
    details      oferta, data ou local; `type` escolhe o ícone (offer, date, location)
*/
export const HERO_CAMPAIGNS = {
  energyDrink: {
    id: 'energy-drink',
    name: 'Pichau Energy Drink Protein',
    background: {
      src: energyDrinkBackground,
      width: 1192,
      position: { collapsed: '64% 50%', expanded: '62% 50%', stage: '60% 50%' },
    },
    objects: [
      {
        id: 'logo',
        src: energyDrinkLogo,
        width: 1647,
        height: 955,
        size: 100,
        collapsed: { x: '50%', y: '12%', scale: 0.7, layer: 4 },
        expanded: null,
      },
      {
        id: 'samurai',
        src: energyDrinkSamurai,
        width: 856,
        height: 900,
        size: 100,
        collapsed: null,
        expanded: { x: '25%', y: '66%', scale: 0.42, layer: 1 },
      },
      {
        id: 'lata',
        src: energyDrinkCan,
        width: 479,
        height: 900,
        size: 100,
        collapsed: { x: '50%', y: '72%', scale: 0.75, layer: 3 },
        expanded: { x: '53%', y: '65%', scale: 0.38, layer: 3 },
      },
      {
        id: 'mascote',
        src: energyDrinkMascot,
        width: 607,
        height: 900,
        size: 100,
        collapsed: { x: '38%', y: '60%', scale: 1.3, layer: 2 },
        expanded: { x: '74%', y: '62%', scale: 0.5, layer: 2 },
      },
    ],
    logo: { src: energyDrinkLogo, width: 1647, height: 955, displayWidth: 112, alt: 'Pichau Energy Drink Protein' },
    title: ['Energy Drink', 'Protein'],
    description: 'Energético Pichau sabor Black Cherry, com 12g de proteína em cada lata de 350ml.',
    highlights: ['12g de proteína', 'Black Cherry'],
    details: [],
    cta: { label: 'Ver Energy Drink', href: '#offers' },
  },
  corsair: {
    id: 'corsair',
    name: 'Seleção Corsair',
    background: {
      src: corsairBackground,
      width: 1192,
      height: 475,
      position: { collapsed: '80% 50%', expanded: '62% 50%', stage: '100% 50%' },
    },
    objects: [
      {
        id: 'gabinete',
        src: corsairCase,
        width: 493,
        height: 539,
        size: 100,
        collapsed: { x: '50%', base: '332px', scale: 0.85, layer: 1 },
        expanded: { x: '60%', y: '52%', scale: 0.42, layer: 1 },
        scene: { x: 900, bottom: 330, width: 190 },
        sceneMobile: { x: 930, bottom: 332, width: 160 },
      },
      {
        id: 'memorias',
        src: corsairMemory,
        width: 439,
        height: 341,
        size: 100,
        collapsed: null,
        expanded: { x: '35%', y: '60%', scale: 0.24, layer: 2 },
        scene: { x: 700, bottom: 281, width: 110 },
        sceneMobile: { x: 752, bottom: 280, width: 95 },
      },
      {
        id: 'fonte',
        src: corsairPowerSupply,
        width: 393,
        height: 337,
        size: 100,
        collapsed: null,
        expanded: { x: '84%', y: '63%', scale: 0.28, layer: 2 },
        scene: { x: 1095, bottom: 334, width: 130 },
        sceneMobile: { x: 1105, bottom: 334, width: 115 },
      },
      {
        id: 'headset',
        src: corsairHeadset,
        width: 368,
        height: 496,
        size: 100,
        collapsed: { x: '50%', base: '430px', scale: 0.62, layer: 2 },
        expanded: { x: '14%', y: '57%', scale: 0.24, layer: 5 },
        scene: { x: 560, bottom: 304, width: 105 },
        sceneMobile: { x: 738, bottom: 440, width: 80 },
      },
      {
        id: 'teclado',
        src: corsairKeyboard,
        width: 624,
        height: 291,
        size: 100,
        collapsed: null,
        expanded: { x: '27%', y: '84%', scale: 0.6, layer: 4 },
        scene: { x: 700, bottom: 436, width: 300 },
        sceneMobile: { x: 850, bottom: 436, width: 290 },
      },
      {
        id: 'mouse',
        src: corsairMouse,
        width: 341,
        height: 271,
        size: 100,
        collapsed: null,
        expanded: { x: '56%', y: '88%', scale: 0.17, layer: 5 },
        scene: { x: 888, bottom: 436, width: 74 },
        sceneMobile: { x: 1015, bottom: 436, width: 58 },
      },
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
    title: ['Seleção', 'Corsair'],
    description: 'Uma seleção especial de produtos Corsair na Pichau.',
    highlights: ['Hardware', 'Periféricos'],
    details: [],
    cta: { label: 'Ver seleção Corsair', href: '#offers', category: 'Hardware' },
  },
  /*
    scene segue a composição da referência (1192 x 475): placa no bloco alto, fone no degrau,
    notebook na plataforma e o resto no chão. Ela só cabe no card largo; no card estreito (notebooks,
    sceneNarrow) e no celular (sceneMobile), que mostram só a parte direita da arte, os produtos
    ficam juntos ali, sobre os mesmos blocos; no celular, menores e mais espaçados.
  */
  asusRog: {
    id: 'asus-rog',
    name: 'ASUS ROG',
    background: {
      src: rogBackground,
      width: 1192,
      height: 475,
      position: { collapsed: '90% 50%', expanded: '100% 50%', stage: '100% 50%' },
    },
    objects: [
      {
        id: 'placa-video',
        src: rogGraphicsCard,
        width: 538,
        height: 273,
        size: 100,
        collapsed: { x: '50%', base: '222px', scale: 0.82, layer: 1 },
        expanded: { x: '72%', y: '30%', scale: 0.46, layer: 1 },
        scene: { x: 1015, bottom: 226, width: 310 },
        sceneMobile: { x: 1080, bottom: 222, width: 190 },
        sceneNarrow: { x: 1065, bottom: 224, width: 220 },
      },
      {
        id: 'notebook',
        src: rogNotebook,
        width: 637,
        height: 412,
        size: 100,
        collapsed: { x: '50%', base: '336px', scale: 0.86, layer: 2 },
        expanded: { x: '40%', y: '45%', scale: 0.56, layer: 2 },
        scene: { x: 690, bottom: 295, width: 410 },
        sceneMobile: { x: 848, bottom: 300, width: 230 },
        sceneNarrow: { x: 925, bottom: 302, width: 270 },
      },
      {
        id: 'headset',
        src: rogHeadset,
        width: 337,
        height: 376,
        size: 100,
        collapsed: null,
        expanded: { x: '85%', y: '62%', scale: 0.21, layer: 3 },
        scene: { x: 1058, bottom: 347, width: 137 },
        sceneMobile: { x: 1115, bottom: 336, width: 92 },
        sceneNarrow: { x: 1122, bottom: 345, width: 100 },
      },
      {
        id: 'teclado',
        src: rogKeyboard,
        width: 617,
        height: 387,
        size: 100,
        collapsed: null,
        expanded: { x: '26%', y: '74%', scale: 0.36, layer: 3 },
        scene: { x: 590, bottom: 398, width: 280 },
        sceneMobile: { x: 805, bottom: 410, width: 150 },
        sceneNarrow: { x: 880, bottom: 404, width: 165 },
      },
      {
        id: 'portatil',
        src: rogHandheld,
        width: 533,
        height: 264,
        size: 100,
        collapsed: { x: '50%', base: '440px', scale: 0.82, layer: 3 },
        expanded: { x: '50%', y: '80%', scale: 0.42, layer: 4 },
        scene: { x: 855, bottom: 410, width: 300 },
        sceneMobile: { x: 960, bottom: 440, width: 170 },
        sceneNarrow: { x: 1000, bottom: 430, width: 190 },
      },
      {
        id: 'mouse',
        src: rogMouse,
        width: 392,
        height: 257,
        size: 100,
        collapsed: null,
        expanded: { x: '86%', y: '86%', scale: 0.17, layer: 4 },
        scene: { x: 1067, bottom: 428, width: 127 },
        sceneMobile: { x: 1125, bottom: 450, width: 70 },
        sceneNarrow: { x: 1140, bottom: 444, width: 76 },
      },
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
    title: ['PARA AQUELES', 'QUE OUSAM.'],
    isTitleStacked: true,
    description: 'Explore notebooks, componentes e periféricos ROG.',
    highlights: [],
    details: [],
    cta: { label: 'EXPLORE A ROG', href: 'https://rog.asus.com/br/' },
  },
  // Configurada para quando a campanha entrar no carrossel; hoje os três slides usam as demais.
  pichauArena: {
    id: 'pichau-arena',
    name: 'Pichau Arena',
    background: { src: arenaBackground, position: { collapsed: '50% 50%', expanded: '50% 50%', stage: '50% 40%' } },
    objects: [
      {
        id: 'logo-arena',
        src: arenaLogo,
        width: 903,
        height: 785,
        size: 112,
        collapsed: { x: '50%', y: '34%', scale: 1, layer: 2 },
        expanded: { x: '24%', y: '79%', scale: 0.44, layer: 2 },
      },
      {
        id: 'gamer-geek',
        src: arenaGamerGeek,
        width: 847,
        height: 894,
        size: 108,
        collapsed: { x: '50%', y: '62%', scale: 1, layer: 1 },
        expanded: { x: '74%', y: '76%', scale: 0.48, layer: 1 },
      },
    ],
    logo: { src: arenaLogo, width: 903, height: 785, displayWidth: 51, alt: 'Pichau Arena' },
    title: ['Gamer', '& Geek'],
    description: 'O evento gamer e geek da Pichau Arena em Joinville–SC.',
    highlights: [],
    details: [
      { type: 'date', text: '10 a 12 de outubro' },
      { type: 'location', text: 'Joinville Square Garden, Joinville–SC' },
    ],
    cta: { label: 'Saiba mais sobre o evento', href: '#offers' },
  },
};

// Ordem inicial do carrossel do hero.
export const HERO_SLIDES = [HERO_CAMPAIGNS.energyDrink, HERO_CAMPAIGNS.corsair, HERO_CAMPAIGNS.asusRog];
