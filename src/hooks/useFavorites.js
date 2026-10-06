import { useEffect, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

const FAVORITES_KEY = 'pichau-demo-favorites';

function loadFavorites() {
  const storedFavorites = readStorage(FAVORITES_KEY, []);
  return Array.isArray(storedFavorites) ? storedFavorites : [];
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(loadFavorites);

  useEffect(() => {
    writeStorage(FAVORITES_KEY, favorites);
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites((currentFavorites) =>
      currentFavorites.includes(id)
        ? currentFavorites.filter((favoriteId) => favoriteId !== id)
        : [...currentFavorites, id],
    );
  }

  return { favorites, toggleFavorite };
}
