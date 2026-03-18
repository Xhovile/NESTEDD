import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SearchFilters } from '../types';
import SearchBar from './SearchBar';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState('rentals');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-zinc-900">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
          alt="Malawi Real Estate" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/80 to-blue-900/80 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-20 text-center text-white">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-6 tracking-tight"
        >
          Find Your Perfect Home <br className="hidden md:block" /> in Malawi
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl text-zinc-100 max-w-3xl mx-auto mb-12 font-medium opacity-90"
        >
          NESTÉDD connects you with the best rental properties, hotels, lodges and real estate across Malawi. Find your perfect space today.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-2xl relative"
        >
          <SearchBar
            activeTab={activeTab}
            location={location}
            price={price}
            type={type}
            onTabChange={setActiveTab}
            onLocationChange={setLocation}
            onPriceChange={setPrice}
            onTypeChange={setType}
            onSearch={onSearch}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
