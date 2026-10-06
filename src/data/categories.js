import { Armchair, Cpu, Keyboard, LayoutGrid, Monitor } from 'lucide-react';

export const ALL_CATEGORIES = 'Todos';

export const DEPARTMENTS = ['Hardware', 'Periféricos', 'Monitores', 'Cadeiras'];

export const OFFER_TABS = [ALL_CATEGORIES, 'Hardware', 'Periféricos', 'Monitores'];

export const CATEGORY_SHORTCUTS = [
  { label: 'Hardware', category: 'Hardware', icon: Cpu },
  { label: 'Periféricos', category: 'Periféricos', icon: Keyboard },
  { label: 'Monitores', category: 'Monitores', icon: Monitor },
  { label: 'Cadeiras', category: 'Cadeiras', icon: Armchair },
  { label: 'Todos os produtos', category: ALL_CATEGORIES, icon: LayoutGrid },
];
