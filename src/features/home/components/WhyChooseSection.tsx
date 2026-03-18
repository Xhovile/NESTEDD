import React from 'react';
import { motion } from 'motion/react';
import { Search, MessageCircle, Bell, Sparkles, CheckCircle, Smartphone, Star } from 'lucide-react';

const reasons = [
  {
    title: 'Smart Search',
    icon: <Search />,
    desc: 'Filter by location, price, amenities, and more to find your perfect match quickly.'
  },
  {
    title: 'Direct Communication',
    icon: <MessageCircle />,
    desc: 'Chat directly with landlords and agents without intermediaries or hidden fees.'
  },
  {
    title: 'Instant Alerts',
    icon: <Bell />,
    desc: 'Get notified when new properties matching your preferences are listed.'
  },
  {
    title: 'Integrated Cleaning',
    icon: <Sparkles />,
    desc: 'Book move-in or move-out cleaning directly through the platform at competitive rates.'
  },
  {
    title: 'Verified Listings',
    icon: <CheckCircle />,
    desc: 'All properties are verified by our team to ensure quality and prevent scams.'
  }
];

const WhyChooseSection: React.FC = () => {
  return (
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
              {reasons.map((reason, i) => (
                <motion.div key={i} whileHover={{ x: 10 }} className="flex gap-6 group">
                  <div className="w-14 h-14 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-orange-600 shadow-md group-hover:bg-orange-600 group-hover:text-white transition-all">
                    {React.cloneElement(reason.icon as React.ReactElement, { size: 24 })}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{reason.title}</h4>
                    <p className="text-zinc-500 dark:text-zinc-400">{reason.desc}</p>
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
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
