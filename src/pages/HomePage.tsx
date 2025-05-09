
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CalendarClock, Gavel, FileText } from 'lucide-react';

const HomePage: React.FC = () => {
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
    }
  ];

  const team = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      title: 'Senior Partner',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=300&auto=format&fit=crop',
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      title: 'Partner',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop',
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      title: 'Associate',
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=300&auto=format&fit=crop',
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center bg-limon-darkBlue overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop')" 
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-playfair mb-6 animate-slide-up">
            {t('home.hero_title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('home.hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/appointment" className="btn-secondary">
              {t('common.book_appointment')}
            </Link>
            <Link to="/contact" className="btn-primary">
              {t('common.contact_us')}
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">{t('home.intro_title')}</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('home.intro_text')}
              </p>
              <Link to="/about" className="btn-primary inline-block">
                {t('common.more')}
              </Link>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2472&auto=format&fit=crop" 
                alt="Law office interior" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.services_title')}</h2>
            <p className="section-subtitle mx-auto">
              {t('home.services_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="card hover:translate-y-[-5px]">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-limon-darkBlue font-playfair">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <Link to="/services" className="text-limon-darkBlue font-medium inline-flex items-center hover:text-limon-gold">
                  {t('common.more')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/services" className="btn-primary">
              {t('common.more')}
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('home.team_title')}</h2>
            <p className="section-subtitle mx-auto">
              {t('home.team_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.id} className="card text-center hover:translate-y-[-5px]">
                <div className="mb-6 overflow-hidden rounded-full w-32 h-32 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-1 text-limon-darkBlue font-playfair">
                  {member.name}
                </h3>
                <p className="text-limon-gold text-sm mb-4">{member.title}</p>
                <Link to="/about" className="text-limon-darkBlue font-medium inline-flex items-center hover:text-limon-gold">
                  {t('common.more')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 bg-limon-darkBlue text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">
            {t('common.book_appointment')}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
            {t('appointment.subtitle')}
          </p>
          <div className="flex justify-center">
            <Link to="/appointment" className="btn-secondary inline-flex items-center">
              <CalendarClock className="mr-2 h-5 w-5" />
              {t('common.book_appointment')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
