import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { SearchFilters } from '../types';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState('rentals');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('');

  const handleSearch = () => {
    onSearch({ location, price, type });
  };

  const tabs = [
    { id: 'rentals', label: 'Rentals' },
    { id: 'lodges', label: 'Lodges' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'buy', label: 'Buy Property' },
  ];

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
          {/* Tabs */}
          <div className="flex gap-2 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id 
                    ? 'bg-orange-600 text-white shadow-lg' 
                    : 'text-zinc-500 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
            <div className="text-left">
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <MapPin size={14} className="text-orange-600" /> Location
              </label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-zinc-100 font-semibold focus:border-orange-600 focus:ring-0 transition-all appearance-none"
              >
                <option value="">All locations</option>
                <option value="area-36">Area 36</option>
                <option value="area-47">Area 47</option>
                <option value="zomba">Zomba</option>
                <option value="kasungu">Kasungu</option>
                <option value="dowa">Dowa</option>
                <option value="mzuzu">Mzuzu</option>
                <option value="blantyre">Blantyre</option>
              </select>
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <DollarSign size={14} className="text-orange-600" /> Price Range
              </label>
              <select 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-zinc-100 font-semibold focus:border-orange-600 focus:ring-0 transition-all appearance-none"
              >
                <option value="">Any price</option>
                <option value="0-50000">MK0 - MK50,000</option>
                <option value="50000-100000">MK50,000 - MK100,000</option>
                <option value="100000-200000">MK100,000 - MK200,000</option>
                <option value="200000+">MK200,000+</option>
              </select>
            </div>

            <div className="text-left">
              <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Home size={14} className="text-orange-600" /> Property Type
              </label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-4 bg-zinc-50 dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-2xl text-zinc-900 dark:text-zinc-100 font-semibold focus:border-orange-600 focus:ring-0 transition-all appearance-none"
              >
                <option value="">All types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="self-contained">Self-contained</option>
                <option value="flat">Flat</option>
                <option value="hostel">Hostel</option>
              </select>
            </div>

            <button 
              onClick={handleSearch}
              className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <Search size={20} />
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
