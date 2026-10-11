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

/*
  Catálogo do menu de departamentos. `productCategory` liga o departamento ao filtro das ofertas
  (categorias que têm produtos na vitrine); sem ele, a loja conceito ainda não tem página para
  o departamento e o menu avisa que ele é demonstrativo.
*/
export const DEPARTMENT_GROUPS = [
  {
    title: 'Computadores e componentes',
    departments: [
      {
        id: 'hardware',
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
        name: 'Computadores',
        icon: PcCase,
        description: 'PCs montados para jogar, trabalhar e criar.',
        sections: [
          { title: 'PCs prontos', items: ['PCs gamers', 'PCs para trabalho', 'PCs para criação'] },
          { title: 'Alto desempenho', items: ['Workstations', 'Servidores'] },
          { title: 'Compactos', items: ['Mini PCs', 'All-in-one'] },
        ],
      },
      {
        id: 'notebooks',
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
        name: 'Kit upgrade',
        icon: CircuitBoard,
        description: 'Processador, placa-mãe e memória que já funcionam juntos.',
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
        name: 'Games e consoles',
        icon: Gamepad2,
        description: 'Consoles, controles e jogos.',
        sections: [
          { title: 'Consoles', items: ['Consoles de mesa', 'Consoles portáteis'] },
          { title: 'Acessórios', items: ['Controles', 'Volantes e simuladores'] },
          { title: 'Jogos', items: ['Jogos digitais', 'Gift cards'] },
        ],
      },
      {
        id: 'casa',
        name: 'Casa e lazer',
        icon: House,
        description: 'Tecnologia para o dia a dia em casa.',
        sections: [
          { title: 'Casa inteligente', items: ['Lâmpadas inteligentes', 'Câmeras de segurança', 'Assistentes virtuais'] },
          { title: 'Lazer', items: ['Smart TVs', 'Drones', 'Patinetes elétricos'] },
        ],
      },
      {
        id: 'vestuario',
        name: 'Vestuário e acessórios',
        icon: Shirt,
        description: 'Roupas e acessórios com a marca Pichau.',
        sections: [
          { title: 'Vestuário', items: ['Camisetas', 'Moletons', 'Bonés'] },
          { title: 'Acessórios', items: ['Canecas', 'Chaveiros', 'Mochilas'] },
        ],
      },
      {
        id: 'energeticos',
        name: 'Energéticos',
        icon: Zap,
        description: 'A linha de energéticos da Pichau.',
        sections: [
          { title: 'Pichau Energy Drink', items: ['Energy Drink', 'Energy Drink Protein'] },
          { title: 'Kits', items: ['Kits e fardos'] },
        ],
      },
      {
        id: 'openbox',
        name: 'Openbox',
        icon: Package,
        description: 'Produtos revisados, com garantia e preço menor.',
        sections: [{ title: 'Produtos', items: ['Hardware', 'Periféricos', 'Monitores', 'Notebooks'] }],
      },
    ],
  },
];
