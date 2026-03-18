import React from 'react';
import { motion } from 'motion/react';
import { Home, Hotel, Sparkles, ChevronRight } from 'lucide-react';

const offers = [
  {
    title: 'Rental Properties',
    desc: 'Find houses, apartments, self-contained rooms, and hostels across Malawi with detailed information and photos.',
    icon: <Home className="text-orange-600" size={32} />,
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Lodges & Short Stays',
    desc: 'Book lodges, guest houses and motels for short-term accommodation while you search for your permanent home.',
    icon: <Hotel className="text-orange-600" size={32} />,
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Cleaning Services',
    desc: 'Professional move-in, move-out, and deep cleaning services for tenants and landlords at competitive prices.',
    icon: <Sparkles className="text-orange-600" size={32} />,
    img: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const OffersSection: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
            What NESTÉDD Offers
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            We provide a comprehensive platform for all your housing needs in Malawi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img src={offer.img} alt={offer.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="p-8">
                <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                  {offer.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{offer.title}</h3>
                <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">{offer.desc}</p>
                <button className="text-orange-600 font-bold flex items-center gap-2 group/btn">
                  Explore {offer.title.split(' ')[0]}
                  <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
