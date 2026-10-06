import monitorAthen from '../assets/images/products/monitor-athen.jpg';
import rtx5080Aorus from '../assets/images/products/rtx-5080-aorus.jpg';
import tecladoCorsairVanguard from '../assets/images/products/teclado-corsair-vanguard.jpg';
import ryzen7600x3d from '../assets/images/products/ryzen-5-7600x3d.jpg';
import mouseAjazz from '../assets/images/products/mouse-ajazz-aj159p.jpg';
import ssdSandiskOptimus from '../assets/images/products/ssd-sandisk-optimus.jpg';
import cadeiraOfficeLyse from '../assets/images/products/cadeira-office-lyse.jpg';
import placaMaeOrion from '../assets/images/products/placa-mae-orion.jpg';

export const products = [
  { id: 0, name: 'Monitor Gamer Pichau Athen', spec: '23,8″ · Full HD · 144 Hz', category: 'Monitores', price: 799.9, image: monitorAthen, discount: 20 },
  { id: 1, name: 'GeForce RTX 5080 Aorus', spec: '16 GB GDDR7 · Ray Tracing', category: 'Hardware', price: 14199.9, image: rtx5080Aorus, discount: 12 },
  { id: 2, name: 'Teclado Corsair Vanguard', spec: 'Mecânico · RGB · Wireless', category: 'Periféricos', price: 1999.9, image: tecladoCorsairVanguard, discount: 23 },
  { id: 3, name: 'AMD Ryzen 5 7600X3D', spec: '6 núcleos · AM5 · Cache 102 MB', category: 'Hardware', price: 1699.9, image: ryzen7600x3d, discount: 18 },
  { id: 4, name: 'Mouse Ajazz AJ159P', spec: 'Wireless · 12.000 DPI', category: 'Periféricos', price: 159.9, image: mouseAjazz, discount: 16 },
  { id: 5, name: 'SSD Sandisk Optimus 5100', spec: '500 GB · NVMe · 6.600 MB/s', category: 'Hardware', price: 829.9, image: ssdSandiskOptimus, discount: 15 },
  { id: 6, name: 'Cadeira Pichau Office Lyse', spec: 'Full mesh · Braços 5D', category: 'Cadeiras', price: 1699.9, image: cadeiraOfficeLyse, discount: 17 },
  { id: 7, name: 'Placa-mãe Pichau Orion', spec: 'B850M · AM5 · DDR5', category: 'Hardware', price: 749.9, image: placaMaeOrion, discount: 10 },
];
