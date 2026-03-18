import { Search, MapPin, DollarSign, Home } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchBarProps {
  location: string;
  price: string;
  type: string;
  activeTab: string;
  onLocationChange: (value: string) => void;
  onPriceChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onTabChange: (value: string) => void;
  onSearch: (filters: SearchFilters) => void;
}

const tabs = [
  { id: 'rentals', label: 'Rentals' },
  { id: 'lodges', label: 'Lodges' },
  { id: 'hotels', label: 'Hotels' },
  { id: 'buy', label: 'Buy Property' },
];

export default function SearchBar({
  location,
  price,
  type,
  activeTab,
  onLocationChange,
  onPriceChange,
  onTypeChange,
  onTabChange,
  onSearch,
}: SearchBarProps) {
  return (
    <>
      <div className="flex gap-2 mb-8 pb-4 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
        <div className="text-left">
          <label className="block text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <MapPin size={14} className="text-orange-600" /> Location
          </label>
          <select
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
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
            onChange={(e) => onPriceChange(e.target.value)}
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
            onChange={(e) => onTypeChange(e.target.value)}
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
          onClick={() => onSearch({ location, price, type })}
          className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:bg-orange-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          <Search size={20} />
          Search
        </button>
      </div>
    </>
  );
}
