import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import PropertyCard from '../features/properties/components/PropertyCard';
import PropertyModal from '../features/properties/components/PropertyModal';
import NotificationModal from '../features/notifications/components/NotificationModal';

import { PROPERTIES } from '../features/properties/data/properties';
import { Property } from '../features/properties/types';
import { SearchFilters } from '../features/search/types';

import { useFavorites } from '../features/favorites/hooks/useFavorites';
import { useNotifications } from '../features/notifications/hooks/useNotifications';
import { useSearchFilters } from '../features/search/hooks/useSearchFilters';
import { usePropertyFilters } from '../features/properties/hooks/usePropertyFilters';

const filters = ['all', 'apartment', 'house', 'self-contained', 'hostel'];

export default function ListingsPage() {
  const [isDark, setIsDark] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const { isFavorite, toggleFavorite } = useFavorites();
  const { notification, showNotification, closeNotification } = useNotifications();
  const { searchFilters, resetSearchFilters } = useSearchFilters();

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;

      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return next;
    });
  };

  const filteredProperties = usePropertyFilters(PROPERTIES, currentFilter, searchFilters);

  const handleToggleFavorite = (id: number) => {
    const isAdding = !isFavorite(id);
    toggleFavorite(id);

    showNotification({
      title: isAdding ? 'Added to Favorites' : 'Removed from Favorites',
      message: isAdding
        ? 'Property added to your favorites list.'
        : 'Property removed from your favorites list.',
      type: isAdding ? 'success' : 'info',
    });
  };

  const handleAction = (title: string, message: string, type: 'info' | 'success') => {
    showNotification({ title, message, type });
  };

  const handleResetAllFilters = () => {
    resetSearchFilters();
    setCurrentFilter('all');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main className="pt-10 pb-24">
        <section className="container mx-auto px-4">
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 mb-4"
            >
              ← Back to Home
            </Link>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
              Browse Listings
            </h1>

            <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl">
              Explore rental properties, hostels, houses, and self-contained units on NESTÉDD.
            </p>
          </div>

          <div className="flex gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 rounded-2xl overflow-x-auto no-scrollbar mb-10">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setCurrentFilter(filter)}
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

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  isFavorite={isFavorite(property.id)}
                  onToggleFavorite={handleToggleFavorite}
                  onClick={setSelectedProperty}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full py-20 text-center bg-zinc-50 dark:bg-zinc-900/50 rounded-[3rem]">
              <Search size={64} className="mx-auto text-zinc-300 dark:text-zinc-700 mb-6" />
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                No properties found
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                Try adjusting your filters or search criteria.
              </p>
              <button
                onClick={handleResetAllFilters}
                className="px-8 py-3 bg-orange-600 text-white font-bold rounded-xl shadow-lg"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <PropertyModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        onAction={handleAction}
      />

      <NotificationModal
        notification={notification}
        onClose={closeNotification}
      />
    </div>
  );
}
