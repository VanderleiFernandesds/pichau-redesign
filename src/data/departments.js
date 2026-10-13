import {
  Armchair,
  CircuitBoard,
  Cpu,
  Gamepad2,
  House,
  Laptop,
  Monitor,
  Mouse,
  Package,
  PcCase,
  Shirt,
  Wifi,
  Zap,
} from 'lucide-react';
import hardwareImage from '../assets/images/categories/hardware.avif';
import peripheralsImage from '../assets/images/categories/perifericos.avif';
import computersImage from '../assets/images/categories/computadores.avif';
import upgradeKitImage from '../assets/images/categories/kit-upgrade.avif';
import monitorsImage from '../assets/images/categories/monitores.avif';
import chairsImage from '../assets/images/categories/cadeiras.avif';
import notebooksImage from '../assets/images/categories/notebooks-portateis.avif';
import networkImage from '../assets/images/categories/redes-wifi.avif';
import gamesImage from '../assets/images/categories/games-consoles.avif';
import homeImage from '../assets/images/categories/casa-lazer.avif';
import apparelImage from '../assets/images/categories/vestuario-acessorios.avif';
import energyDrinksImage from '../assets/images/categories/energeticos.avif';
import openboxImage from '../assets/images/categories/openbox.avif';

/*
  Catálogo do menu de departamentos. `productCategory` liga o departamento ao filtro das ofertas
  (categorias que têm produtos na vitrine); sem ele, a loja conceito ainda não tem página para
  o departamento e o menu avisa que ele é demonstrativo. `image` (PNG recortado, em AVIF) aparece no
  carrossel "Na Pichau Tem!"; os departamentos sem foto usam o ícone.
*/
export const DEPARTMENT_GROUPS = [
  {
    title: 'Computadores e componentes',
    departments: [
      {
        id: 'hardware',
        image: hardwareImage,
        name: 'Hardware',
        icon: Cpu,
        description: 'Encontre os componentes para o seu PC.',
        productCategory: 'Hardware',
        sections: [
          { title: 'Processamento', items: ['Processadores', 'Placas-mãe', 'Memórias RAM'] },
          { title: 'Gráficos', items: ['Placas de vídeo', 'Placas de som'] },
          { title: 'Armazenamento', items: ['SSDs', 'HDs internos'] },
          { title: 'Energia e estrutura', items: ['Fontes de alimentação', 'Gabinetes', 'Cabos e acessórios'] },
          { title: 'Refrigeração', items: ['Coolers e watercoolers', 'Ventoinhas', 'Pasta térmica'] },
        ],
      },
      {
        id: 'computadores',
        image: computersImage,
        name: 'Computadores',
        icon: PcCase,
        description: 'PCs montados para jogar, trabalhar e criar.',
        productCategory: 'Computadores',
        sections: [
          { title: 'PCs prontos', items: ['PCs gamers', 'PCs para trabalho', 'PCs para criação'] },
          { title: 'Alto desempenho', items: ['Workstations', 'Servidores'] },
          { title: 'Compactos', items: ['Mini PCs', 'All-in-one'] },
        ],
      },
      {
        id: 'notebooks',
        image: notebooksImage,
        name: 'Notebooks e portáteis',
        icon: Laptop,
        description: 'Desempenho para levar a qualquer lugar.',
        sections: [
          { title: 'Notebooks', items: ['Notebooks gamer', 'Notebooks para trabalho', 'Ultrafinos'] },
          { title: 'Portáteis', items: ['Consoles portáteis', 'Tablets'] },
          { title: 'Acessórios', items: ['Bases e suportes', 'Mochilas e cases', 'Carregadores'] },
        ],
      },
      {
        id: 'kit-upgrade',
        image: upgradeKitImage,
        name: 'Kit upgrade',
        icon: CircuitBoard,
        description: 'Processador, placa-mãe e memória que já funcionam juntos.',
        productCategory: 'Kit upgrade',
        sections: [
          { title: 'Kits prontos', items: ['Processador e placa-mãe', 'Processador, placa-mãe e memória'] },
          { title: 'Por plataforma', items: ['Kits AMD', 'Kits Intel'] },
        ],
      },
    ],
  },
  {
    title: 'Setup e periféricos',
    departments: [
      {
        id: 'perifericos',
        image: peripheralsImage,
        name: 'Periféricos',
        icon: Mouse,
        description: 'Teclados, mouses, áudio e tudo para o seu setup.',
        productCategory: 'Periféricos',
        sections: [
          { title: 'Entrada', items: ['Teclados', 'Mouses', 'Mousepads'] },
          { title: 'Áudio', items: ['Headsets', 'Caixas de som', 'Microfones'] },
          { title: 'Streaming', items: ['Webcams', 'Placas de captura', 'Iluminação'] },
        ],
      },
      {
        id: 'monitores',
        image: monitorsImage,
        name: 'Monitores',
        icon: Monitor,
        description: 'Telas para jogar, trabalhar e criar.',
        productCategory: 'Monitores',
        sections: [
          { title: 'Por uso', items: ['Monitores gamer', 'Monitores profissionais', 'Monitores ultrawide'] },
          { title: 'Acessórios', items: ['Suportes e braços', 'Cabos de vídeo'] },
        ],
      },
      {
        id: 'cadeiras',
        image: chairsImage,
        name: 'Cadeiras e mesas',
        icon: Armchair,
        description: 'Conforto para longas sessões.',
        productCategory: 'Cadeiras',
        sections: [
          { title: 'Cadeiras', items: ['Cadeiras gamer', 'Cadeiras de escritório'] },
          { title: 'Mesas', items: ['Mesas gamer', 'Mesas de escritório'] },
          { title: 'Acessórios', items: ['Apoios de pés', 'Tapetes para cadeira'] },
        ],
      },
      {
        id: 'redes',
        image: networkImage,
        name: 'Redes e Wi-Fi',
        icon: Wifi,
        description: 'Conexão estável para jogar e trabalhar.',
        sections: [
          { title: 'Wi-Fi', items: ['Roteadores', 'Repetidores e mesh', 'Adaptadores Wi-Fi'] },
          { title: 'Cabeado', items: ['Switches', 'Placas de rede', 'Cabos de rede'] },
        ],
      },
    ],
  },
  {
    title: 'Lifestyle e outros',
    departments: [
      {
        id: 'games',
        image: gamesImage,
        name: 'Games e consoles',
        icon: Gamepad2,
        description: 'Consoles, controles e jogos.',
        productCategory: 'Games',
        sections: [
          { title: 'Consoles', items: ['Consoles de mesa', 'Consoles portáteis'] },
          { title: 'Acessórios', items: ['Controles', 'Volantes e simuladores'] },
          { title: 'Jogos', items: ['Jogos digitais', 'Gift cards'] },
        ],
      },
      {
        id: 'casa',
        image: homeImage,
        name: 'Casa e lazer',
        icon: House,
        description: 'Tecnologia para o dia a dia em casa.',
        productCategory: 'Casa e lazer',
        sections: [
          { title: 'Casa inteligente', items: ['Lâmpadas inteligentes', 'Câmeras de segurança', 'Assistentes virtuais'] },
          { title: 'Lazer', items: ['Smart TVs', 'Drones', 'Patinetes elétricos'] },
        ],
      },
      {
        id: 'vestuario',
        image: apparelImage,
        name: 'Vestuário e acessórios',
        icon: Shirt,
        description: 'Roupas e acessórios com a marca Pichau.',
        productCategory: 'Vestuário',
        sections: [
          { title: 'Vestuário', items: ['Camisetas', 'Moletons', 'Bonés'] },
          { title: 'Acessórios', items: ['Canecas', 'Chaveiros', 'Mochilas'] },
        ],
      },
      {
        id: 'energeticos',
        image: energyDrinksImage,
        name: 'Energéticos',
        icon: Zap,
        description: 'A linha de energéticos da Pichau.',
        productCategory: 'Energéticos',
        sections: [
          { title: 'Pichau Energy Drink', items: ['Energy Drink', 'Energy Drink Protein'] },
          { title: 'Kits', items: ['Kits e fardos'] },
        ],
      },
      {
        id: 'openbox',
        image: openboxImage,
        name: 'Openbox',
        icon: Package,
        description: 'Produtos revisados, com garantia e preço menor.',
        sections: [{ title: 'Produtos', items: ['Hardware', 'Periféricos', 'Monitores', 'Notebooks'] }],
      },
    ],
  },
];

// Ordem do carrossel "Na Pichau Tem!": primeiro os departamentos com foto, depois todos os outros.
const SHOWCASE_FIRST = ['hardware', 'perifericos', 'computadores', 'kit-upgrade', 'monitores', 'cadeiras'];
const ALL_DEPARTMENTS = DEPARTMENT_GROUPS.flatMap((group) => group.departments);

export const SHOWCASE_DEPARTMENTS = [
  ...SHOWCASE_FIRST.map((id) => ALL_DEPARTMENTS.find((department) => department.id === id)),
  ...ALL_DEPARTMENTS.filter(({ id }) => !SHOWCASE_FIRST.includes(id)),
];
