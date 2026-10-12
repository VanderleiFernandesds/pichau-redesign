import { useEffect, useState } from 'react';

/*
  Devolve o id da seção que cruza uma faixa estreita perto do meio da tela, ou null quando nenhuma
  cruza (topo da página, espaço entre seções). Marcar pelo #hash não serve: o link continuaria
  ativo depois de a pessoa rolar para outra seção.
*/
export function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(null);
  const idsKey = sectionIds.join(',');

  useEffect(() => {
    const sections = idsKey
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const visibleIds = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleIds.add(entry.target.id);
          else visibleIds.delete(entry.target.id);
        }
        // Na faixa de 10% só cabe uma seção por vez; a ordem do array desempata a transição.
        setActiveId(sections.find((section) => visibleIds.has(section.id))?.id ?? null);
      },
      { rootMargin: '-40% 0px -50% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [idsKey]);

  return activeId;
}
