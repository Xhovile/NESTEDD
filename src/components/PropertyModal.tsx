import React from 'react';
import { X, MapPin, Bed, Bath, Maximize, Phone, MessageCircle, Calendar, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property } from '../types';

interface PropertyModalProps {
  property: Property | null;
  onClose: () => void;
  onAction: (title: string, message: string, type: 'info' | 'success') => void;
}

const PropertyModal: React.FC<PropertyModalProps> = ({ property, onClose, onAction }) => {
  if (!property) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          className="relative w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-20 p-2 bg-white/90 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <X size={24} />
          </button>

          <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
            <img 
              src={property.image} 
              alt={property.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
            <div className="flex items-center gap-2 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4">
              <MapPin size={14} />
              {property.location}
            </div>
            
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4 leading-tight">
              {property.title}
            </h2>

            <div className="text-3xl font-black text-orange-600 mb-8">
              MK {property.price.toLocaleString()} <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">/month</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
              <div className="text-center">
                <Bed size={20} className="mx-auto text-orange-600 mb-2" />
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{property.bedrooms} Bed{property.bedrooms !== 1 ? 's' : ''}</div>
              </div>
              <div className="text-center">
                <Bath size={20} className="mx-auto text-orange-600 mb-2" />
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{property.bathrooms > 0 ? `${property.bathrooms} Bath` : 'Shared'}</div>
              </div>
              <div className="text-center">
                <Maximize size={20} className="mx-auto text-orange-600 mb-2" />
                <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">{property.size}m²</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">Description</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {property.description}
              </p>
            </div>

            {property.virtualTour && (
              <button 
                onClick={() => onAction('Virtual Tour', 'Virtual tour feature coming soon! You will be able to explore properties in 3D.', 'info')}
                className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white font-bold rounded-2xl mb-6 hover:shadow-lg transition-all"
              >
                <Play size={20} fill="currentColor" />
                Virtual Tour Available
              </button>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onAction('Contact Owner', 'Contact feature coming soon! You will be able to message property owners directly.', 'info')}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all"
              >
                <MessageCircle size={20} />
                Contact Owner
              </button>
              <button 
                onClick={() => onAction('Schedule Visit', 'Visit scheduling feature coming soon! You will be able to book property viewings online.', 'info')}
                className="flex-1 flex items-center justify-center gap-2 p-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold rounded-2xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all"
              >
                <Calendar size={20} />
                Schedule Visit
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PropertyModal;
