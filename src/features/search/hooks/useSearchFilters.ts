import { useState } from 'react';
import { SearchFilters } from '../types';

export function useSearchFilters(initialFilters: SearchFilters = {}) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>(initialFilters);

  const applySearchFilters = (nextFilters: SearchFilters) => {
    setSearchFilters(nextFilters);
  };

  const resetSearchFilters = () => {
    setSearchFilters({});
  };

  return {
    searchFilters,
    applySearchFilters,
    resetSearchFilters,
  };
}
