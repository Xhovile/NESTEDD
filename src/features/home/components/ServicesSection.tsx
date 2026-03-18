import React from 'react';
import { motion } from 'motion/react';
import { Home, Hotel, MapPin, Sparkles, Shield, MessageCircle } from 'lucide-react';

const services = [
  {
    title: 'Rental Listings',
    icon: <Home />,
    desc: 'Find your perfect rental home with our comprehensive listings across Malawi.'
  },
  {
    title: 'Hotels & Lodges',
    icon: <Hotel />,
    desc: 'Book short-term accommodation while you search for your permanent home.'
  },
  {
    title: 'Real Estate',
    icon: <MapPin />,
    desc: 'Browse properties for sale from trusted real estate agencies across Malawi.'
  },
  {
    title: 'Cleaning Services',
    icon: <Sparkles />,
    desc: 'Professional move-in and move-out cleaning services at competitive prices.'
  },
  {
    title: 'Agent Services',
    icon: <Shield />,
    desc: 'Premium tools for property agents to manage listings and clients.'
  },
  {
    title: 'Direct Communication',
    icon: <MessageCircle />,
    desc: 'Connect directly with landlords, agents, or tenants through our platform.'
  }
];

const ServicesSection: React.FC = () => {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
            NESTÉDD offers a range of services to make housing easier for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-lg hover:shadow-2xl transition-all border-b-4 border-transparent hover:border-orange-600 group"
            >
              <div className="w-20 h-20 bg-orange-50 dark:bg-orange-900/20 rounded-3xl flex items-center justify-center mb-8 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                {React.cloneElement(service.icon as React.ReactElement, { size: 36 })}
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{service.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">{service.desc}</p>
              <button className="w-full py-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-bold rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
