import { SHOWCASE_DEPARTMENTS } from './departments';

// Endereços conferidos no llms.txt publicado pela Pichau (pichau.com.br/llms.txt).
export const SOCIAL_LINKS = [
  { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/pichauoficial' },
  { name: 'YouTube', icon: 'youtube', href: 'https://www.youtube.com/pichauinfo' },
  { name: 'X (Twitter)', icon: 'x', href: 'https://www.twitter.com/pichauinfo' },
  { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/pichauinfo' },
];

const FOOTER_DEPARTMENT_IDS = ['hardware', 'perifericos', 'computadores', 'monitores'];

export const FOOTER_DEPARTMENTS = SHOWCASE_DEPARTMENTS.filter(({ id }) => FOOTER_DEPARTMENT_IDS.includes(id));

export const AUTHOR = {
  name: 'Vanderlei Fernandes',
  github: 'https://github.com/VanderleiFernandesds',
};

export const OFFICIAL_STORE_URL = 'https://www.pichau.com.br/';

/*
  Tópicos da Central de ajuda. O site é um projeto de estudo: os textos explicam o que é simulado
  aqui e indicam o site oficial para compras, entregas e garantia reais.
*/
export const HELP_TOPICS = [
  {
    id: 'sobre',
    title: 'Sobre o projeto',
    paragraphs: [
      'Este site é um redesign conceitual da Pichau, criado como projeto de estudo de front-end.',
      'Não tem vínculo com a Pichau e não realiza vendas. Produtos, preços e campanhas são apenas demonstrativos.',
    ],
  },
  {
    id: 'como-comprar',
    title: 'Como comprar',
    paragraphs: [
      'Aqui a compra é só uma simulação: adicione produtos ao carrinho para ver as quantidades e o total no Pix. Nenhum pedido é criado e nenhum pagamento é processado.',
      'Para comprar de verdade, use o site oficial da Pichau.',
    ],
    hasStoreLink: true,
  },
  {
    id: 'entrega-garantia',
    title: 'Entrega e garantia',
    paragraphs: [
      'Como nada é vendido neste projeto, não há entrega, troca ou garantia.',
      'Prazos, fretes e garantia de produtos reais são informados no site oficial.',
    ],
    hasStoreLink: true,
  },
  {
    id: 'privacidade',
    title: 'Privacidade',
    paragraphs: [
      'O site não envia seus dados para nenhum servidor. Carrinho, favoritos e tema ficam salvos apenas no seu navegador.',
      'O cadastro da newsletter é demonstrativo: o e-mail não é enviado nem armazenado.',
    ],
  },
];
