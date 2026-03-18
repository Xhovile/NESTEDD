import { useMemo } from 'react';
import { SearchFilters } from '../../search/types';
import { Property } from '../types';

export function usePropertyFilters(properties: Property[], currentFilter: string, searchFilters: SearchFilters) {
  return useMemo(() => {
    let filtered = properties;

    if (currentFilter !== 'all') {
      filtered = filtered.filter((property) => property.type === currentFilter);
    }

    if (searchFilters.location) {
      filtered = filtered.filter((property) => property.locationId === searchFilters.location);
    }

    if (searchFilters.type) {
      filtered = filtered.filter((property) => property.type === searchFilters.type);
    }

    if (searchFilters.price) {
      const [minStr, maxStr] = searchFilters.price.split('-');
      const min = parseInt(minStr.replace('+', ''), 10);
      const max = maxStr ? parseInt(maxStr, 10) : Infinity;
      filtered = filtered.filter((property) => property.price >= min && property.price <= max);
    }

    return filtered;
  }, [properties, currentFilter, searchFilters]);
}
