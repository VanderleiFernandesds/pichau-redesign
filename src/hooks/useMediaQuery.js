import { useSyncExternalStore } from 'react';

// Acompanha uma media query e re-renderiza quando ela passa a valer ou deixa de valer.
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener('change', onChange);
      return () => mediaQuery.removeEventListener('change', onChange);
    },
    () => window.matchMedia(query).matches,
  );
}
