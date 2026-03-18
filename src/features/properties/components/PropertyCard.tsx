import React from 'react';
import { MapPin, Bed, Bath, Maximize, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onClick: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ 
  property, 
  isFavorite, 
  onToggleFavorite, 
  onClick 
}) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-zinc-100 dark:border-zinc-800 group cursor-pointer"
      onClick={() => onClick(property)}
    >
      <div className="relative h-64 overflow-hidden">
        {property.tag && (
          <span className="absolute top-4 left-4 z-10 bg-orange-600 text-white px-4 py-1.5 rounded-xl text-xs font-bold shadow-md">
            {property.tag}
          </span>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md transition-all ${
            isFavorite 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 dark:bg-zinc-800/80 text-zinc-400 hover:text-red-500'
          }`}
        >
          <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest mb-3">
          <MapPin size={14} className="text-orange-600" />
          {property.location}
        </div>
        
        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 line-clamp-1 group-hover:text-orange-600 transition-colors">
          {property.title}
        </h3>

        <div className="text-2xl font-black text-orange-600 mb-6">
          MK {property.price.toLocaleString()} <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">/month</span>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Bed size={18} className="text-orange-600" />
            <span className="text-sm font-bold">{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Bath size={18} className="text-orange-600" />
            <span className="text-sm font-bold">{property.bathrooms > 0 ? `${property.bathrooms} Bath` : 'Shared'}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Maximize size={18} className="text-orange-600" />
            <span className="text-sm font-bold">{property.size}m²</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
