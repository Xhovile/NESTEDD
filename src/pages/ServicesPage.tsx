import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Hotel, Sparkles, Shield, Camera, CheckCircle } from 'lucide-react';

import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';

const services = [
  {
    title: 'Rental Listings',
    description: 'Connect tenants with available houses, apartments, self-contained rooms, and hostels.',
    icon: Home,
  },
  {
    title: 'Hotels & Lodges',
    description: 'Short-stay accommodation options for travelers, students, and temporary residents.',
    icon: Hotel,
  },
  {
    title: 'Cleaning Services',
    description: 'Move-in, move-out, and deep cleaning support for tenants, landlords, and property owners.',
    icon: Sparkles,
  },
  {
    title: 'Agent Support',
    description: 'Tools and visibility for property agents managing multiple listings and enquiries.',
    icon: Shield,
  },
  {
    title: 'Property Photography',
    description: 'Professional listing visuals to improve trust, presentation, and conversion.',
    icon: Camera,
  },
  {
    title: 'Verification Workflow',
    description: 'A trust-first system to improve listing quality and reduce fake or misleading posts.',
    icon: CheckCircle,
  },
];

export default function ServicesPage() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;

      if (next) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return next;
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-300 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />

      <main className="pt-10 pb-24">
        <section className="container mx-auto px-4">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-semibold text-orange-600 hover:text-orange-700 mb-4"
          >
            ← Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight mb-3">
            Services
          </h1>

          <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mb-12">
            NESTÉDD is being built as more than a listing platform. These are the core service layers being developed around the housing ecosystem.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.title}
                  className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] shadow-lg border border-zinc-100 dark:border-zinc-800"
                >
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center mb-6">
                    <Icon size={28} />
                  </div>

                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                    {service.title}
                  </h2>

                  <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
 }
