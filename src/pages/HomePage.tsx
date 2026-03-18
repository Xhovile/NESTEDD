import React, { useState, useEffect } from 'react';

import Navbar from '../layout/Navbar';
import Hero from '../features/search/components/Hero';
import PropertyModal from '../features/properties/components/PropertyModal';
import Footer from '../layout/Footer';
import NotificationModal from '../features/notifications/components/NotificationModal';
import OffersSection from '../features/home/components/OffersSection';
import FeaturedListingsSection from '../features/home/components/FeaturedListingsSection';
import CtaSection from '../features/home/components/CtaSection';
import ServicesSection from '../features/home/components/ServicesSection';
import TestimonialsSection from '../features/home/components/TestimonialsSection';
import WhyChooseSection from '../features/home/components/WhyChooseSection';
import FloatingChatButton from '../features/home/components/FloatingChatButton';
import { PROPERTIES } from '../features/properties/data/properties';
import { Property } from '../features/properties/types';
import { SearchFilters } from '../features/search/types';
import { useFavorites } from '../features/favorites/hooks/useFavorites';
import { useNotifications } from '../features/notifications/hooks/useNotifications';
import { useSearchFilters } from '../features/search/hooks/useSearchFilters';
import { usePropertyFilters } from '../features/properties/hooks/usePropertyFilters';

export default function HomePage() {
  const [isDark, setIsDark] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { notification, showNotification, closeNotification } = useNotifications();
  const { searchFilters, applySearchFilters, resetSearchFilters } = useSearchFilters();

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handleToggleFavorite = (id: number) => {
    const isAdding = !isFavorite(id);
    toggleFavorite(id);

    showNotification({
      title: isAdding ? 'Added to Favorites' : 'Removed from Favorites',
      message: isAdding
        ? 'Property added to your favorites list.'
        : 'Property removed from your favorites list.',
      type: isAdding ? 'success' : 'info'
    });
  };

  const filteredProperties = usePropertyFilters(PROPERTIES, currentFilter, searchFilters);

  const handleSearch = (filters: SearchFilters) => {
    applySearchFilters(filters);
    setCurrentFilter('all');

    // Scroll to rentals section
    const rentalsSection = document.getElementById('rentals');
    if (rentalsSection) {
      rentalsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAction = (title: string, message: string, type: 'info' | 'success') => {
    showNotification({ title, message, type });
  };

  const handleResetAllFilters = () => {
    resetSearchFilters();
    setCurrentFilter('all');
  };

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main id="home">
        <Hero onSearch={handleSearch} />
        <OffersSection />

        <FeaturedListingsSection
          currentFilter={currentFilter}
          onFilterChange={setCurrentFilter}
          filteredProperties={filteredProperties}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          onSelectProperty={setSelectedProperty}
          onResetAllFilters={handleResetAllFilters}
        />

        <CtaSection />
        <ServicesSection />
        <TestimonialsSection />
        <WhyChooseSection />
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

      <FloatingChatButton
        onClick={() =>
          handleAction(
            'Chat Support',
            "Chat support will be available soon! We're working on bringing you real-time assistance.",
            'info'
          )
        }
      />
    </div>
  );
}
