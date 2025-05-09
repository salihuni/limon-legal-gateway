
import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText, Gavel, MapPin } from 'lucide-react';

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      id: 'corporate',
      title: t('services.corporate_law'),
      description: t('services.corporate_law_desc'),
      icon: <FileText className="h-12 w-12 text-limon-gold" />,
    },
    {
      id: 'family',
      title: t('services.family_law'),
      description: t('services.family_law_desc'),
      icon: <Gavel className="h-12 w-12 text-limon-gold" />,
    },
    {
      id: 'criminal',
      title: t('services.criminal_law'),
      description: t('services.criminal_law_desc'),
      icon: <Gavel className="h-12 w-12 text-limon-gold" />,
    },
    {
      id: 'real_estate',
      title: t('services.real_estate_law'),
      description: t('services.real_estate_law_desc'),
      icon: <MapPin className="h-12 w-12 text-limon-gold" />,
    },
    {
      id: 'labor',
      title: t('services.labor_law'),
      description: t('services.labor_law_desc'),
      icon: <FileText className="h-12 w-12 text-limon-gold" />,
    },
    {
      id: 'intellectual',
      title: t('services.intellectual_property'),
      description: t('services.intellectual_property_desc'),
      icon: <FileText className="h-12 w-12 text-limon-gold" />,
    },
    {
      id: 'tax',
      title: t('services.tax_law'),
      description: t('services.tax_law_desc'),
      icon: <FileText className="h-12 w-12 text-limon-gold" />,
    },
    {
      id: 'debt',
      title: t('services.debt_collection'),
      description: t('services.debt_collection_desc'),
      icon: <Gavel className="h-12 w-12 text-limon-gold" />,
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-limon-darkBlue overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=2070&auto=format&fit=crop')" 
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card hover:translate-y-[-5px]">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-limon-darkBlue font-playfair">
                  {service.title}
                </h3>
                <p className="text-gray-600">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-limon-darkBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            {t('common.book_appointment')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            {t('appointment.subtitle')}
          </p>
          <div className="flex justify-center">
            <a href="/appointment" className="btn-secondary">
              {t('common.book_appointment')}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
