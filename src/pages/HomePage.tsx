import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Hotel, 
  Sparkles, 
  Search, 
  MapPin, 
  DollarSign, 
  Shield, 
  MessageCircle, 
  Bell, 
  CheckCircle, 
  Smartphone,
  ChevronRight,
  Star
} from 'lucide-react';

import Navbar from '../layout/Navbar';
import Hero from '../features/search/components/Hero';
import PropertyCard from '../features/properties/components/PropertyCard';
import PropertyModal from '../features/properties/components/PropertyModal';
import Footer from '../layout/Footer';
import NotificationModal from '../features/notifications/components/NotificationModal';
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

  if (!isLoaded) return null;

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      
      <main id="home">
        <Hero onSearch={handleSearch} />

        {/* Features Section */}
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
              {[
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
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all group"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-8">
                    <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/20 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">{feature.title}</h3>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">{feature.desc}</p>
                    <button className="text-orange-600 font-bold flex items-center gap-2 group/btn">
                      Explore {feature.title.split(' ')[0]}
                      <ChevronRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Listings Section */}
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
                {['all', 'apartment', 'house', 'self-contained', 'hostel'].map((filter) => (
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
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <PropertyCard 
                      key={property.id}
                      property={property}
                      isFavorite={isFavorite(property.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onClick={setSelectedProperty}
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
                      onClick={() => {
                        resetSearchFilters();
                        setCurrentFilter('all');
                      }}
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

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900 p-12 md:p-24 text-center text-white">
              <div className="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" alt="List Property" className="w-full h-full object-cover opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/40 to-blue-900/40"></div>
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold font-display mb-6 tracking-tight">
                  List Your Property on NESTÉDD
                </h2>
                <p className="text-lg md:text-xl text-zinc-300 mb-12 leading-relaxed">
                  Whether you're a landlord with a single property or an agent with multiple listings, NESTÉDD makes it easy to connect with potential tenants.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-10 py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-xl hover:bg-orange-700 transition-all">
                    List Your Property
                  </button>
                  <button className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
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
              {[
                { title: 'Rental Listings', icon: <Home />, desc: 'Find your perfect rental home with our comprehensive listings across Malawi.' },
                { title: 'Hotels & Lodges', icon: <Hotel />, desc: 'Book short-term accommodation while you search for your permanent home.' },
                { title: 'Real Estate', icon: <MapPin />, desc: 'Browse properties for sale from trusted real estate agencies across Malawi.' },
                { title: 'Cleaning Services', icon: <Sparkles />, desc: 'Professional move-in and move-out cleaning services at competitive prices.' },
                { title: 'Agent Services', icon: <Shield />, desc: 'Premium tools for property agents to manage listings and clients.' },
                { title: 'Direct Communication', icon: <MessageCircle />, desc: 'Connect directly with landlords, agents, or tenants through our platform.' }
              ].map((service, i) => (
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

        {/* Testimonials Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold font-display text-zinc-900 dark:text-zinc-100 mb-4 tracking-tight">
                What Our Users Say
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-lg">
                Read testimonials from tenants, landlords, and agents who use NESTÉDD
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: 'Chimwemwe Banda',
                  role: 'Tenant, Lilongwe',
                  text: 'I found my perfect apartment in Lilongwe within just 3 days of using NESTÉDD. The filters made it easy to find exactly what I was looking for, and I could contact the landlord directly.',
                  img: 'https://randomuser.me/api/portraits/women/43.jpg'
                },
                {
                  name: 'James Phiri',
                  role: 'Landlord, Blantyre',
                  text: 'As a landlord with multiple properties, NESTÉDD has made finding quality tenants much easier. I also use their cleaning services between tenants. Highly recommended!',
                  img: 'https://randomuser.me/api/portraits/men/32.jpg'
                },
                {
                  name: 'Grace Mhango',
                  role: 'Property Agent, Zomba',
                  text: 'The premium tools for agents have streamlined my property management business. I can manage all my listings in one place and get more leads than through traditional methods.',
                  img: 'https://randomuser.me/api/portraits/women/65.jpg'
                }
              ].map((testimonial, i) => (
                <div key={i} className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-xl relative">
                  <div className="text-orange-600/20 absolute top-8 left-8 text-8xl font-serif leading-none">"</div>
                  <p className="text-zinc-600 dark:text-zinc-400 italic mb-8 relative z-10 leading-relaxed">
                    {testimonial.text}
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 rounded-full border-4 border-white dark:border-zinc-800 shadow-md" />
                    <div>
                      <h5 className="font-bold text-zinc-900 dark:text-zinc-100">{testimonial.name}</h5>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* App Features Section */}
        <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold font-display text-zinc-900 dark:text-zinc-100 mb-8 tracking-tight">
                  Why Choose NESTÉDD?
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-12 leading-relaxed">
                  NESTÉDD is more than just a rental platform. We're building a complete ecosystem for housing in Malawi with unique features that set us apart.
                </p>

                <div className="space-y-8">
                  {[
                    { title: 'Smart Search', icon: <Search />, desc: 'Filter by location, price, amenities, and more to find your perfect match quickly.' },
                    { title: 'Direct Communication', icon: <MessageCircle />, desc: 'Chat directly with landlords and agents without intermediaries or hidden fees.' },
                    { title: 'Instant Alerts', icon: <Bell />, desc: 'Get notified when new properties matching your preferences are listed.' },
                    { title: 'Integrated Cleaning', icon: <Sparkles />, desc: 'Book move-in or move-out cleaning directly through the platform at competitive rates.' },
                    { title: 'Verified Listings', icon: <CheckCircle />, desc: 'All properties are verified by our team to ensure quality and prevent scams.' }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex gap-6 group"
                    >
                      <div className="w-14 h-14 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-orange-600 shadow-md group-hover:bg-orange-600 group-hover:text-white transition-all">
                        {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{item.title}</h4>
                        <p className="text-zinc-500 dark:text-zinc-400">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-blue-900/20 blur-3xl rounded-full"></div>
                <motion.img 
                  whileHover={{ y: -20, scale: 1.02 }}
                  src="https://cdn.dribbble.com/users/1615584/screenshots/15750960/media/28331a918e138bb246a2a3e8e7e1f1cb.jpg" 
                  alt="NESTÉDD App" 
                  className="relative z-10 rounded-[3rem] shadow-2xl border-8 border-white dark:border-zinc-800"
                />
                
                <div className="absolute -bottom-10 -right-10 z-20 bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-2xl hidden md:block">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center text-emerald-600">
                      <Smartphone size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Mobile App</div>
                      <div className="text-xs text-zinc-500">Coming Soon</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
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

      {/* Floating Chat Button */}
      <button 
        onClick={() => handleAction('Chat Support', "Chat support will be available soon! We're working on bringing you real-time assistance.", 'info')}
        className="fixed bottom-8 right-8 z-[90] w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all group"
      >
        <MessageCircle size={32} />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-950 animate-bounce">
          3
        </span>
        <div className="absolute bottom-full right-0 mb-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Need help finding a home?</p>
          <p className="text-xs text-zinc-500">Our agents are online</p>
        </div>
      </button>
    </div>
  );
}
