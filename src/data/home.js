import { Gamepad2, Headset, House, ListChecks, PcCase, Settings } from 'lucide-react';
import gpuImage from '../assets/images/products/rtx-5080-aorus.jpg';
import cpuImage from '../assets/images/products/ryzen-5-7600x3d.jpg';
import monitorImage from '../assets/images/products/monitor-athen.jpg';
import motherboardImage from '../assets/images/products/placa-mae-orion.jpg';

export const PURPOSES = [
  { title: 'PC Gamer', description: ['Desempenho máximo', 'para seus jogos.'], href: '#offers', category: 'Hardware', image: gpuImage, alt: 'Placa de vídeo gamer', isHighlighted: true },
  { title: 'Trabalho e criação', description: ['Potência para', 'suas ideias.'], href: '#offers', category: 'Hardware', image: cpuImage, alt: 'Processador AMD' },
  { title: 'Casa e escritório', description: ['Tecnologia para', 'o seu dia a dia.'], href: '#offers', category: 'Monitores', image: monitorImage, alt: 'Monitor' },
  { title: 'Monte seu PC', description: ['Escolha cada peça', 'do seu jeito.'], href: '#builder', image: motherboardImage, alt: 'Placa-mãe' },
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
