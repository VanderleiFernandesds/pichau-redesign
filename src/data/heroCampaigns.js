import gamerKidsBackground from '../assets/pichau-camadas/gamer-kids/fundo-684x475.avif';
import gamerKidsPc from '../assets/pichau-camadas/gamer-kids/pc.avif';
import gamerKidsCharacter from '../assets/pichau-camadas/gamer-kids/personagem.avif';
import corsairBackground from '../assets/pichau-camadas/corsair/fundo-684x475.avif';
import corsairMemory from '../assets/pichau-camadas/corsair/memorias.avif';
import corsairPowerSupply from '../assets/pichau-camadas/corsair/fonte.avif';
import intelBackground from '../assets/pichau-camadas/intel-gamer-days/fundo-684x475.avif';
import intelTombRaider from '../assets/pichau-camadas/intel-gamer-days/tomb-raider.avif';
import intelGrid from '../assets/pichau-camadas/intel-gamer-days/grid.avif';
import arenaBackground from '../assets/pichau-camadas/pichau-arena/fundo-684x475.avif';
import arenaLogo from '../assets/pichau-camadas/pichau-arena/logo-arena.avif';
import arenaGamerGeek from '../assets/pichau-camadas/pichau-arena/gamer-geek.avif';

/*
  Campanhas dos painéis do hero: fundo (684x475), objetos transparentes e textos do card.

  background.position  object-position do fundo no card fechado, no expandido e no fundo ampliado
                       (stage), que cobre o texto e o card expandido no desktop.
  objects              cada PNG tem proporção própria (width/height naturais). Por estado:
    x, y   centro do objeto, em % da largura e da altura do card
    scale  escala sobre `size`, a largura base em cqmin (1% do menor lado do card), então o
           objeto já encolhe no card estreito e cresce junto com a expansão
    layer  z-index entre os objetos
  Textos da coluna à esquerda do hero, trocados junto com o card expandido. Só usam informações
  reais dos banners da campanha; sem specs, preços ou benefícios que eles não anunciam.
    description  até três linhas
    highlights   até três destaques curtos (vazio quando não há o que destacar)
    details      oferta, data ou local; `type` escolhe o ícone (offer, date, location)
  shortTitle é o único texto dentro do card, visível quando ele está fechado.
*/
export const HERO_CAMPAIGNS = {
  gamerKids: {
    id: 'gamer-kids',
    name: 'Gamer Kids',
    background: { src: gamerKidsBackground, position: { collapsed: '88% 50%', expanded: '50% 50%', stage: '50% 62%' } },
    objects: [
      {
        id: 'pc',
        src: gamerKidsPc,
        width: 899,
        height: 862,
        size: 108,
        collapsed: { x: '50%', y: '36%', scale: 1, layer: 1 },
        expanded: { x: '25%', y: '66%', scale: 0.52, layer: 1 },
      },
      {
        id: 'personagem',
        src: gamerKidsCharacter,
        width: 875,
        height: 871,
        size: 108,
        collapsed: { x: '52%', y: '68%', scale: 0.96, layer: 2 },
        expanded: { x: '73%', y: '64%', scale: 0.54, layer: 2 },
      },
    ],
    shortTitle: 'Gamer Kids',
    eyebrow: 'PROMOÇÃO PICHAU',
    title: ['Gamer', 'Kids'],
    description: 'Confira os produtos que fazem parte da promoção Gamer Kids.',
    highlights: [],
    details: [{ type: 'offer', text: 'Até 60% OFF' }],
    cta: { label: 'Ver promoção', href: '#offers' },
  },
  corsair: {
    id: 'corsair',
    name: 'Seleção Corsair',
    background: { src: corsairBackground, position: { collapsed: '82% 50%', expanded: '50% 50%', stage: '50% 60%' } },
    objects: [
      {
        id: 'memorias',
        src: corsairMemory,
        width: 899,
        height: 846,
        size: 108,
        collapsed: { x: '50%', y: '36%', scale: 1, layer: 2 },
        expanded: { x: '25%', y: '66%', scale: 0.52, layer: 2 },
      },
      {
        id: 'fonte',
        src: corsairPowerSupply,
        width: 862,
        height: 842,
        size: 108,
        collapsed: { x: '50%', y: '69%', scale: 0.92, layer: 1 },
        expanded: { x: '73%', y: '66%', scale: 0.54, layer: 1 },
      },
    ],
    shortTitle: 'Seleção Corsair',
    eyebrow: 'SELEÇÃO ESPECIAL',
    title: ['Seleção', 'Corsair'],
    description: 'Uma seleção especial de produtos Corsair na Pichau.',
    highlights: ['Memórias', 'Fontes'],
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
export const HERO_SLIDES = [HERO_CAMPAIGNS.gamerKids, HERO_CAMPAIGNS.corsair, HERO_CAMPAIGNS.intelGamerDays];
