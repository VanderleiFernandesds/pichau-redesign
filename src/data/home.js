import { Gamepad2, Headset, House, ListChecks, PcCase, Settings } from 'lucide-react';
import pcGamerImage from '../assets/pc-gamer.png';
import workstationImage from '../assets/workstation.png';
import homeOfficeImage from '../assets/casa-escritorio.png';
import buildPcImage from '../assets/monte-seu-pc.png';

/*
  Os PNGs têm bastante margem transparente. `imageFrame` marca a área ocupada pelo produto (em px
  da imagem original) para o card enquadrar o produto, não a tela inteira. Se uma imagem for
  trocada, o tamanho de origem e essa área precisam ser medidos de novo.
*/
const WIDE_SOURCE = { sourceWidth: 1536, sourceHeight: 1024 };
const SQUARE_SOURCE = { sourceWidth: 1254, sourceHeight: 1254 };

export const PURPOSES = [
  {
    title: 'PC Gamer',
    description: ['Desempenho máximo', 'para seus jogos.'],
    href: '#offers',
    category: 'Hardware',
    image: pcGamerImage,
    imageFrame: { ...SQUARE_SOURCE, x: 171, y: 37, width: 958, height: 1136 },
  },
  {
    title: 'Trabalho e criação',
    description: ['Potência para', 'suas ideias.'],
    href: '#offers',
    category: 'Hardware',
    image: workstationImage,
    imageFrame: { ...SQUARE_SOURCE, x: 205, y: 41, width: 850, height: 1135 },
  },
  {
    title: 'Casa e escritório',
    description: ['Tecnologia para', 'o seu dia a dia.'],
    href: '#offers',
    category: 'Monitores',
    image: homeOfficeImage,
    imageFrame: { ...WIDE_SOURCE, x: 86, y: 30, width: 1406, height: 920 },
  },
  {
    title: 'Monte seu PC',
    description: ['Escolha cada peça', 'do seu jeito.'],
    href: '#builder',
    image: buildPcImage,
    imageFrame: { ...WIDE_SOURCE, x: 12, y: 40, width: 1521, height: 957 },
  },
];

export const BUILDER_GOALS = [
  { label: 'Jogos e performance', category: 'Hardware', icon: Gamepad2 },
  { label: 'Trabalho e criação', category: 'Hardware', icon: Settings },
  { label: 'Casa e escritório', category: 'Monitores', icon: House },
];

export const BENEFITS = [
  { icon: PcCase, title: 'Seu setup completo', description: 'Hardware e periféricos em um lugar' },
  { icon: ListChecks, title: 'Escolha com clareza', description: 'Especificações fáceis de comparar' },
  { icon: Headset, title: 'Precisa de ajuda?', description: 'Encontre os canais oficiais' },
];
