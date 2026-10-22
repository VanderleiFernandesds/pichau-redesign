// As fotos ficam em assets/images/products e são referenciadas pelo nome do arquivo, sem a extensão.
const productImages = import.meta.glob('../assets/images/products/*.avif', { eager: true, import: 'default' });

function productImage(fileName) {
  const image = productImages[`../assets/images/products/${fileName}.avif`];
  if (!image) throw new Error(`Foto de produto não encontrada: ${fileName}.avif`);
  return image;
}

/*
  `category` precisa coincidir com o `productCategory` dos departamentos para o filtro funcionar.
  Os preços são de demonstração (valor no Pix); os ids são guardados no carrinho e nos favoritos,
  então um produto existente não deve mudar de id.
*/
const catalog = [
  { id: 0, name: 'Monitor Gamer Pichau Athen', spec: '23,8″ · Full HD · 144 Hz', category: 'Monitores', price: 799.9, image: 'monitor-athen' },
  { id: 1, name: 'GeForce RTX 5080 Aorus', spec: '16 GB GDDR7 · Ray Tracing', category: 'Hardware', price: 14199.9, image: 'rtx-5080-aorus' },
  { id: 2, name: 'Teclado Corsair Vanguard', spec: 'Mecânico · RGB · Wireless', category: 'Periféricos', price: 1999.9, image: 'teclado-corsair-vanguard' },
  { id: 3, name: 'AMD Ryzen 5 7600X3D', spec: '6 núcleos · AM5 · Cache 102 MB', category: 'Hardware', price: 1699.9, image: 'ryzen-5-7600x3d' },
  { id: 4, name: 'Mouse Ajazz AJ159P', spec: 'Wireless · 12.000 DPI', category: 'Periféricos', price: 159.9, image: 'mouse-ajazz-aj159p' },
  { id: 5, name: 'SSD Sandisk Optimus 5100', spec: '500 GB · NVMe · 6.600 MB/s', category: 'Hardware', price: 829.9, image: 'ssd-sandisk-optimus' },
  { id: 6, name: 'Cadeira Pichau Office Lyse', spec: 'Full mesh · Braços 5D', category: 'Cadeiras', price: 1699.9, image: 'cadeira-office-lyse' },
  { id: 7, name: 'Placa-mãe Pichau Orion', spec: 'B850M · AM5 · DDR5', category: 'Hardware', price: 749.9, image: 'placa-mae-orion' },
  { id: 8, name: 'ASUS Prime GeForce RTX 5070 OC White', spec: '12 GB GDDR7 · Ray Tracing', category: 'Hardware', price: 4499.9, image: 'rtx-5070-asus-prime-white' },
  { id: 9, name: 'Monitor ASUS TUF Gaming VG27AQML5F', spec: '27″ · QHD · IPS · 320 Hz', category: 'Monitores', price: 2799.9, image: 'monitor-asus-tuf-vg27aqml5f' },

  { id: 10, name: 'AMD Ryzen 7 5800X3D', spec: '8 núcleos · AM4 · 3D V-Cache', category: 'Hardware', price: 1899.9, image: 'ryzen-7-5800x3d' },
  { id: 11, name: 'Gigabyte GeForce RTX 4080 Super Gaming OC', spec: '16 GB GDDR6X · Ray Tracing', category: 'Hardware', price: 8999.9, image: 'rtx-4080-super-gigabyte-gaming' },
  { id: 12, name: 'Placa-mãe ASUS TUF Gaming B650M-E WiFi', spec: 'AM5 · DDR5 · Wi-Fi 6', category: 'Hardware', price: 1199.9, image: 'placa-mae-asus-tuf-b650m-e' },
  { id: 13, name: 'Monitor Mancer Horizon 27″', spec: '27″ · Full HD · VA · 100 Hz', category: 'Monitores', price: 699.9, image: 'monitor-mancer-horizon-27' },
  { id: 14, name: 'Microfone Mancer Selkie', spec: 'USB · Iluminação RGB · Tripé', category: 'Periféricos', price: 239.9, image: 'microfone-mancer-selkie' },
  { id: 15, name: 'Fonte Corsair RM750e', spec: '750 W · 80 Plus Gold · Modular', category: 'Hardware', price: 699.9, image: 'fonte-corsair-rm750e' },
  { id: 16, name: 'SSD Kingston NV3 1 TB', spec: 'NVMe · PCIe 4.0', category: 'Hardware', price: 499.9, image: 'ssd-kingston-nv3-1tb' },
  { id: 17, name: 'Memória XPG Lancer Blade RGB 16 GB', spec: 'DDR5 · 5600 MHz', category: 'Hardware', price: 389.9, image: 'memoria-xpg-lancer-blade-16gb' },
  { id: 18, name: 'AMD Ryzen 7 5700X', spec: '8 núcleos · AM4', category: 'Hardware', price: 999.9, image: 'ryzen-7-5700x' },
  { id: 19, name: 'AMD Ryzen 5 5500', spec: '6 núcleos · AM4', category: 'Hardware', price: 499.9, image: 'ryzen-5-5500' },
  { id: 20, name: 'XFX Speedster SWFT 210 Radeon RX 7600', spec: '8 GB GDDR6', category: 'Hardware', price: 1699.9, image: 'rx-7600-xfx-swft-210' },
  { id: 21, name: 'Placa-mãe MSI A520M-A PRO', spec: 'AM4 · DDR4 · Micro-ATX', category: 'Hardware', price: 449.9, image: 'placa-mae-msi-a520m-a-pro' },
  { id: 22, name: 'Placa-mãe MSI MAG B660 Tomahawk WiFi', spec: 'LGA 1700 · ATX · Wi-Fi', category: 'Hardware', price: 1099.9, image: 'placa-mae-msi-b660-tomahawk' },
  { id: 23, name: 'Placa-mãe ASUS TUF Gaming B550M-Plus', spec: 'AM4 · DDR4 · Micro-ATX', category: 'Hardware', price: 899.9, image: 'placa-mae-asus-tuf-b550m-plus' },
  { id: 24, name: 'Memória T-Force Vulcan Z 8 GB', spec: 'DDR4 · 3200 MHz', category: 'Hardware', price: 129.9, image: 'memoria-tforce-vulcan-z-8gb' },
  { id: 25, name: 'SSD Lexar NM790 512 GB', spec: 'NVMe · PCIe 4.0', category: 'Hardware', price: 349.9, image: 'ssd-lexar-nm790-512gb' },
  { id: 26, name: 'Cooler DeepCool AK400', spec: 'Air cooler · Fan de 120 mm', category: 'Hardware', price: 249.9, image: 'cooler-deepcool-ak400' },
  { id: 27, name: 'Fonte MSI MAG', spec: 'ATX · Linha MAG', category: 'Hardware', price: 449.9, image: 'fonte-msi-mag' },
  { id: 28, name: 'Gabinete Gamer Corsair com Tela', spec: 'Mid Tower · Vidro temperado · RGB', category: 'Hardware', price: 1299.9, image: 'gabinete-corsair-tela' },
  { id: 29, name: 'Gabinete Gamer MSI Pano 130R MLG Edition', spec: 'Vidro panorâmico · Edição MLG', category: 'Hardware', price: 1199.9, image: 'gabinete-msi-pano-130r-mlg' },
  { id: 30, name: 'Gabinete Gamer Pichau Aquário com Arte', spec: 'Vidro temperado · Arte lateral', category: 'Hardware', price: 549.9, image: 'gabinete-pichau-aquario-arte' },
  { id: 31, name: 'Gabinete Gamer Pichau Aquário Preto', spec: 'Vidro temperado · Sem fans', category: 'Hardware', price: 399.9, image: 'gabinete-pichau-aquario' },
  { id: 32, name: 'Gabinete Gamer Pichau Compacto', spec: 'Vidro temperado · 2 fans RGB', category: 'Hardware', price: 299.9, image: 'gabinete-pichau-compacto' },
  { id: 33, name: 'Ventoinha Pichau VTN Branca', spec: 'ARGB · Unidade', category: 'Hardware', price: 59.9, image: 'ventoinha-pichau-vtn' },
  { id: 34, name: 'Ventoinha Pichau VTN-R Branca', spec: 'ARGB · Unidade', category: 'Hardware', price: 64.9, image: 'ventoinha-pichau-vtn-r' },
  { id: 35, name: 'Kit 3 Ventoinhas Pichau VTN Brancas', spec: 'ARGB · 3 unidades', category: 'Hardware', price: 159.9, image: 'kit-3-ventoinhas-pichau-vtn' },
  { id: 36, name: 'Kit 5 Ventoinhas Pichau VTN Brancas', spec: 'ARGB · 5 unidades', category: 'Hardware', price: 249.9, image: 'kit-5-ventoinhas-pichau-vtn' },
  { id: 37, name: 'Kit 3 Ventoinhas Pichau VTN-R Brancas', spec: 'ARGB · 3 unidades', category: 'Hardware', price: 169.9, image: 'kit-3-ventoinhas-pichau-vtn-r' },
  { id: 38, name: 'Kit de Chaves de Precisão Pichau', spec: 'Pontas magnéticas · Estojo', category: 'Hardware', price: 129.9, image: 'kit-chaves-precisao-pichau' },
  { id: 39, name: 'Mini PC Gigabyte AI TOP ATOM', spec: 'Supercomputador de IA compacto', category: 'Computadores', price: 39999.9, image: 'mini-pc-gigabyte-ai-top-atom' },
  { id: 40, name: 'PC Gamer Pichau Gladiator + Monitor Ariete', spec: 'Com monitor, teclado, mouse e headset', category: 'Computadores', price: 4999.9, image: 'pc-gamer-pichau-gladiator' },
  { id: 41, name: 'Kit Upgrade Ryzen 7 + B550M Aorus Elite', spec: 'Processador · Placa-mãe AM4', category: 'Kit upgrade', price: 2199.9, image: 'kit-upgrade-ryzen-7-b550m' },
  { id: 42, name: 'Mouse Ajazz AJ179P Branco', spec: 'Wireless · Base RGB', category: 'Periféricos', price: 199.9, image: 'mouse-ajazz-aj179p' },
  { id: 43, name: 'Fone KZ ED9 Pro', spec: 'In-ear · Com fio', category: 'Periféricos', price: 129.9, image: 'fone-kz-ed9-pro' },
  { id: 44, name: 'Webcam Pichau Indus', spec: 'USB · Microfone embutido', category: 'Periféricos', price: 199.9, image: 'webcam-pichau-indus' },
  { id: 45, name: 'Kit Gamer Pichau 4 em 1', spec: 'Teclado · Mouse · Headset · Mousepad', category: 'Periféricos', price: 249.9, image: 'kit-gamer-pichau' },
  { id: 46, name: 'Teclado Mecânico Gamer TGT', spec: 'Mecânico · RGB', category: 'Periféricos', price: 199.9, image: 'teclado-tgt-mecanico' },
  { id: 47, name: 'Teclado Gamer RGB', spec: 'Full size · RGB', category: 'Periféricos', price: 129.9, image: 'teclado-gamer-rgb' },
  { id: 48, name: 'Mesa Digitalizadora Zinnia', spec: 'Caneta inclusa · USB', category: 'Periféricos', price: 249.9, image: 'mesa-digitalizadora-zinnia' },
  { id: 49, name: 'Braço Articulado Zinnia G2 Lift', spec: 'Para microfone · Fixação por grampo', category: 'Periféricos', price: 149.9, image: 'braco-microfone-zinnia-g2-lift' },
  { id: 50, name: 'Suporte Articulado para 2 Monitores Branco', spec: 'Pistão a gás · Fixação na mesa', category: 'Monitores', price: 299.9, image: 'suporte-2-monitores-branco' },
  { id: 51, name: 'Suporte Articulado Pichau RGB', spec: 'Para 1 monitor · Iluminação RGB', category: 'Monitores', price: 249.9, image: 'suporte-monitor-pichau-rgb' },
  { id: 52, name: 'Suporte Articulado Zinnia para Monitor', spec: 'Para 1 monitor · Pistão a gás', category: 'Monitores', price: 199.9, image: 'suporte-monitor-zinnia' },
  { id: 53, name: 'Suporte Articulado Zinnia para 2 Monitores', spec: 'Para 2 monitores · Pistão a gás', category: 'Monitores', price: 349.9, image: 'suporte-2-monitores-zinnia' },
  { id: 54, name: 'Suporte de Mesa Zinnia com Haste', spec: 'Para 1 monitor · Fixação por grampo', category: 'Monitores', price: 129.9, image: 'suporte-monitor-haste-zinnia' },
  { id: 55, name: 'Suporte Zinnia para Monitor e Notebook', spec: 'Haste · Bandeja para notebook', category: 'Monitores', price: 179.9, image: 'suporte-monitor-notebook-zinnia' },
  { id: 56, name: 'Prateleira Zinnia para Monitor', spec: 'Encaixe sobre o monitor', category: 'Monitores', price: 89.9, image: 'prateleira-monitor-zinnia' },
  { id: 57, name: 'Cadeira Gamer Pichau Onix', spec: 'Reclinável · Apoio de braço', category: 'Cadeiras', price: 1199.9, image: 'cadeira-pichau-onix' },
  { id: 58, name: 'Cadeira Gamer TGT', spec: 'Reclinável · Almofadas', category: 'Cadeiras', price: 799.9, image: 'cadeira-tgt-gamer' },
  { id: 59, name: 'Cadeira Ergonômica Zinnia com Apoio para os Pés', spec: 'Mesh · Apoio de cabeça', category: 'Cadeiras', price: 1299.9, image: 'cadeira-zinnia-apoio-pes' },
  { id: 60, name: 'Cadeira de Escritório Zinnia Dax Preta', spec: 'Mesh · Apoio de cabeça', category: 'Cadeiras', price: 899.9, image: 'cadeira-zinnia-dax-preta' },
  { id: 61, name: 'Cadeira de Escritório Zinnia Dax Cinza', spec: 'Mesh · Apoio de cabeça', category: 'Cadeiras', price: 899.9, image: 'cadeira-zinnia-dax-cinza' },
  { id: 62, name: 'Cadeira de Escritório Zinnia em Mesh', spec: 'Mesh · Rodízios', category: 'Cadeiras', price: 349.9, image: 'cadeira-zinnia-mesh' },
  { id: 63, name: 'Mesa Pichau com Regulagem Elétrica de Altura', spec: 'Ajuste elétrico · Tampo preto', category: 'Cadeiras', price: 1799.9, image: 'mesa-pichau-regulagem-eletrica' },
  { id: 64, name: 'Mesa Gamer Mancer', spec: 'Porta-copo · Gancho para headset', category: 'Cadeiras', price: 599.9, image: 'mesa-mancer-gamer' },
  { id: 65, name: 'Mesa Gamer TGT', spec: 'Estrutura em aço · Tampo preto', category: 'Cadeiras', price: 549.9, image: 'mesa-tgt-gamer' },
  { id: 66, name: 'Mesa para Escritório Zinnia', spec: 'Estrutura em aço · Tampo preto', category: 'Cadeiras', price: 399.9, image: 'mesa-zinnia-escritorio' },
  { id: 67, name: 'Controle TGT T90 Verde', spec: 'Gamepad · Com fio', category: 'Games', price: 149.9, image: 'controle-tgt-t90' },
  { id: 68, name: 'Pokémon TCG Build & Battle', spec: 'Estampas Ilustradas · Kit de pré-lançamento', category: 'Games', price: 139.9, image: 'pokemon-build-battle' },
  { id: 69, name: 'Raquete de Padel', spec: 'Superfície texturizada', category: 'Casa e lazer', price: 399.9, image: 'raquete-padel' },
  { id: 70, name: 'Carrinho Organizador Zinnia', spec: '3 prateleiras · Rodízios', category: 'Casa e lazer', price: 199.9, image: 'carrinho-organizador-zinnia' },
  { id: 71, name: 'Camiseta Mancer Kira', spec: 'Oversized · Preta', category: 'Vestuário', price: 129.9, image: 'camiseta-mancer-kira' },
  { id: 72, name: 'Camiseta Pichau Reborn', spec: 'Oversized · Preta', category: 'Vestuário', price: 129.9, image: 'camiseta-pichau-reborn' },
  { id: 73, name: 'Copo Térmico Pichau', spec: 'Aço inox · Com tampa', category: 'Vestuário', price: 129.9, image: 'copo-termico-pichau' },
  { id: 74, name: 'Garrafa Térmica Pichau Preta', spec: 'Aço inox · Tampa com alça', category: 'Vestuário', price: 149.9, image: 'garrafa-termica-pichau' },
  { id: 75, name: 'Copo Térmico Pichau com Alça e Canudo', spec: 'Aço inox · Degradê', category: 'Vestuário', price: 159.9, image: 'copo-termico-pichau-alca' },
  { id: 76, name: 'Copo Térmico Pichau Azul', spec: 'Aço inox', category: 'Vestuário', price: 99.9, image: 'copo-termico-pichau-azul' },
  { id: 77, name: 'Pichau Energy Drink Açaí Zero', spec: 'Lata 350 ml · Zero açúcar', category: 'Energéticos', price: 9.9, image: 'energetico-pichau-acai-zero' },
  { id: 78, name: 'Pichau Energy Drink Protein', spec: 'Lata 350 ml', category: 'Energéticos', price: 11.9, image: 'energetico-pichau-protein' },
];

/*
  Avaliações fictícias, só para demonstrar o componente: o card as identifica como ilustrativas.
  `score` vai de 0 a 5 e `count` é o número de avaliações. Produtos fora daqui aparecem como
  "Sem avaliações".
*/
const ILLUSTRATIVE_RATINGS = {
  0: { score: 4.6, count: 212 },
  1: { score: 4.9, count: 57 },
  2: { score: 4.8, count: 128 },
  3: { score: 5, count: 34 },
  4: { score: 4.2, count: 389 },
  6: { score: 4, count: 76 },
  8: { score: 4.7, count: 91 },
  9: { score: 4.5, count: 143 },
};

export const products = catalog.map((product) => {
  const rating = ILLUSTRATIVE_RATINGS[product.id];
  return {
    ...product,
    image: productImage(product.image),
    rating: rating ? { ...rating, isIllustrative: true } : null,
  };
});
