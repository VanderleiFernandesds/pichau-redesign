import { useEffect, useState } from 'react';

// true quando a página rolou mais que `offset` px a partir do topo.
export function useIsScrolledPast(offset) {
  const [isScrolledPast, setIsScrolledPast] = useState(() => window.scrollY > offset);

  useEffect(() => {
    function handleScroll() {
      setIsScrolledPast(window.scrollY > offset);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return isScrolledPast;
}
