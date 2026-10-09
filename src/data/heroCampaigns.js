import energyDrinkBackground from '../assets/pichau-camadas/energy-drink/fundo-1192x475.avif';
import energyDrinkLogo from '../assets/pichau-camadas/energy-drink/logo.avif';
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
import intelBackground from '../assets/pichau-camadas/intel-gamer-days/fundo-684x475.avif';
import intelTombRaider from '../assets/pichau-camadas/intel-gamer-days/tomb-raider.avif';
import intelGrid from '../assets/pichau-camadas/intel-gamer-days/grid.avif';
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
    scene  (desktop, card expandido) apoia o objeto num ponto do fundo, em px da imagem: x do
           centro, bottom (onde a base encosta) e width. Exige background.width e o stage
           alinhado à direita (100%), que coincide com a borda direita do card. O fundo tem a
           altura do card e aparece em 1:1, então o objeto fica sobre o mesmo bloco da arte
           em qualquer largura; o que passa da borda esquerda do card é cortado.
  Textos da coluna à esquerda do hero, trocados junto com o card expandido. Só usam informações
  reais dos banners da campanha; sem specs, preços ou benefícios que eles não anunciam.
    description  até três linhas
    highlights   até três destaques curtos (vazio quando não há o que destacar)
    details      oferta, data ou local; `type` escolhe o ícone (offer, date, location)
  shortTitle é o único texto dentro do card, visível quando ele está fechado.
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
        width: 900,
        height: 528,
        size: 100,
        collapsed: { x: '50%', y: '20%', scale: 0.78, layer: 4 },
        expanded: { x: '79%', y: '18%', scale: 0.3, layer: 4 },
        // Só o canto superior direito do card importa aqui, então não depende do enquadramento do fundo.
        scene: { x: 1108, bottom: 94, width: 120 },
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
    shortTitle: 'Energy Drink',
    eyebrow: 'PICHAU ENERGY DRINK',
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
      },
      {
        id: 'headset',
        src: corsairHeadset,
        width: 368,
        height: 496,
        size: 100,
        collapsed: { x: '50%', base: '430px', scale: 0.62, layer: 2 },
        expanded: { x: '14%', y: '57%', scale: 0.24, layer: 3 },
        scene: { x: 560, bottom: 304, width: 105 },
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
      },
      {
        id: 'logo',
        src: corsairLogo,
        width: 800,
        height: 186,
        size: 100,
        collapsed: { x: '50%', y: '19%', scale: 0.82, layer: 6 },
        expanded: { x: '79%', y: '16%', scale: 0.3, layer: 6 },
        scene: { x: 1104, bottom: 58, width: 128 },
      },
    ],
    shortTitle: 'Seleção Corsair',
    eyebrow: 'SELEÇÃO ESPECIAL',
    title: ['Seleção', 'Corsair'],
    description: 'Uma seleção especial de produtos Corsair na Pichau.',
    highlights: ['Hardware', 'Periféricos'],
    details: [],
    cta: { label: 'Ver seleção Corsair', href: '#offers', category: 'Hardware' },
  },
  intelGamerDays: {
    id: 'intel-gamer-days',
    name: 'Intel Gamer Days',
    background: { src: intelBackground, position: { collapsed: '95% 50%', expanded: '50% 50%', stage: '50% 50%' } },
    objects: [
      {
        id: 'tomb-raider',
        src: intelTombRaider,
        width: 899,
        height: 874,
        size: 104,
        collapsed: { x: '50%', y: '37%', scale: 1, layer: 2 },
        expanded: { x: '25%', y: '67%', scale: 0.52, layer: 1 },
      },
      {
        id: 'grid',
        src: intelGrid,
        width: 876,
        height: 903,
        size: 104,
        collapsed: { x: '50%', y: '69%', scale: 0.94, layer: 1 },
        expanded: { x: '73%', y: '65%', scale: 0.54, layer: 2 },
      },
    ],
    shortTitle: 'Gamer Days',
    eyebrow: 'INTEL GAMER DAYS',
    title: ['Receba', 'dois jogos'],
    description: 'Na compra de produtos elegíveis Intel®, você recebe dois jogos.',
    highlights: [],
    details: [{ type: 'date', text: 'Oferta válida até 11 de outubro de 2026' }],
    cta: { label: 'Ver produtos Intel', href: '#offers', category: 'Hardware' },
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
    shortTitle: '10 a 12 de outubro',
    eyebrow: 'PICHAU ARENA',
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
export const HERO_SLIDES = [HERO_CAMPAIGNS.energyDrink, HERO_CAMPAIGNS.corsair, HERO_CAMPAIGNS.intelGamerDays];
