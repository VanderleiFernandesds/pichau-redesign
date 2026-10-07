import { Cpu, Gamepad2, Headset, House, ListChecks, Monitor, Palette, PcCase, Settings } from 'lucide-react';

// Cada card aceita `image` (PNG/WebP com fundo transparente) e `alt`; sem imagem, o `icon`
// ocupa o lugar. As fotos de produto atuais têm fundo branco e não servem para o fundo escuro.
export const PURPOSES = [
  { title: 'PC Gamer', description: ['Desempenho máximo', 'para seus jogos.'], href: '#offers', category: 'Hardware', icon: Gamepad2, isHighlighted: true },
  { title: 'Trabalho e criação', description: ['Potência para', 'suas ideias.'], href: '#offers', category: 'Hardware', icon: Palette },
  { title: 'Casa e escritório', description: ['Tecnologia para', 'o seu dia a dia.'], href: '#offers', category: 'Monitores', icon: Monitor },
  { title: 'Monte seu PC', description: ['Escolha cada peça', 'do seu jeito.'], href: '#builder', icon: Cpu },
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
