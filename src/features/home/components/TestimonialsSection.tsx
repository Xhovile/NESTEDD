import React from 'react';

const testimonials = [
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
];

const TestimonialsSection: React.FC = () => {
  return (
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
          {testimonials.map((testimonial, i) => (
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
  );
};

export default TestimonialsSection;
