import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import PropertyCard from '../../properties/components/PropertyCard';
import { Property } from '../../properties/types';

interface FeaturedListingsSectionProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
  filteredProperties: Property[];
  isFavorite: (id: number) => boolean;
  onToggleFavorite: (id: number) => void;
  onSelectProperty: (property: Property) => void;
  onResetAllFilters: () => void;
}

const filters = ['all', 'apartment', 'house', 'self-contained', 'hostel'];

const FeaturedListingsSection: React.FC<FeaturedListingsSectionProps> = ({
  currentFilter,
  onFilterChange,
  filteredProperties,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
  onResetAllFilters
}) => {
  return (
    <section className="py-24" id="rentals">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
              Featured Properties
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-lg">
              Discover our top rental properties across Malawi
            </p>
          </div>

          <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-2xl overflow-x-auto no-scrollbar">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  currentFilter === filter
                    ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={isFavorite(property.id)}
                  onToggleFavorite={onToggleFavorite}
                  onClick={onSelectProperty}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem]"
              >
                <Search size={64} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-6" />
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">No properties found</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8">Try adjusting your filters or search criteria</p>
                <button
                  onClick={onResetAllFilters}
                  className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg"
                >
                  Reset All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {filteredProperties.length > 0 && (
          <div className="mt-16 text-center">
            <button className="px-12 py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-2xl shadow-xl hover:scale-105 transition-all">
              View All Properties
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListingsSection;
