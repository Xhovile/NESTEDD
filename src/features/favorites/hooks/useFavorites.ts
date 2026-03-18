import { useEffect, useState } from 'react';

const FAVORITES_STORAGE_KEY = 'nestedd:favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed)) {
        setFavorites(parsed.filter((id): id is number => typeof id === 'number'));
      }
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: number) => favorites.includes(id);

  const addFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((favoriteId) => favoriteId !== id));
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favoriteId) => favoriteId !== id) : [...prev, id]));
  };

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
  };
}
