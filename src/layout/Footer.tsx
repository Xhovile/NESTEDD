import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'NESTÉDD',
      links: ['About Us', 'Our Services', 'Contact Us', 'Careers', 'Privacy Policy']
    },
    {
      title: 'For Tenants',
      links: ['Search Rentals', 'Book Cleaning', 'Find Hotels', 'Find Lodges', 'Saved Properties']
    },
    {
      title: 'For Landlords',
      links: ['List Property', 'Landlord Dashboard', 'Request Cleaning', 'Tenant Screening', 'Pricing & Fees']
    },
    {
      title: 'For Agents',
      links: ['Agent Portal', 'Subscription Plans', 'Featured Listings', 'Marketing Tools', 'Success Stories']
    }
  ];

  return (
    <footer className="bg-zinc-900 text-white pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 w-full h-20 bg-zinc-900 -translate-y-1/2 rounded-[100%] scale-x-110"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="text-lg font-bold mb-6 relative inline-block">
                {column.title}
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-orange-600 rounded-full"></span>
              </h4>
              <ul className="flex flex-col gap-4">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-zinc-400 hover:text-orange-600 transition-colors flex items-center gap-2 group">
                      <span className="w-0 h-0.5 bg-orange-600 transition-all group-hover:w-3"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-orange-600 rounded-full"></span>
            </h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-center gap-3 text-zinc-400">
                <Mail size={20} className="text-orange-600" />
                <a href="mailto:support@nestedd.mw" className="hover:text-white transition-colors">support@nestedd.mw</a>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <Phone size={20} className="text-orange-600" />
                <a href="tel:+265888123456" className="hover:text-white transition-colors">+265 888 123 456</a>
              </li>
              <li className="flex items-center gap-3 text-zinc-400">
                <MapPin size={20} className="text-orange-600" />
                <span>Area 47, Lilongwe, Malawi</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-2xl font-bold font-display text-white tracking-tight">
            NEST<span className="text-orange-600">ÉDD</span>
          </div>

          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-orange-600 hover:scale-110 transition-all"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>

          <div className="text-sm text-zinc-500 font-medium">
            &copy; 2024 NESTÉDD. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
