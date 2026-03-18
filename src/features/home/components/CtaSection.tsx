import React from 'react';

const CtaSection: React.FC = () => {
  return (
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
  );
};

export default CtaSection;
