import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  const values = [
    { 
      id: 'integrity', 
      title: t('about.values.integrity'),
      description: t('about.values.integrity_text'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    { 
      id: 'excellence', 
      title: t('about.values.excellence'),
      description: t('about.values.excellence_text'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    { 
      id: 'respect', 
      title: t('about.values.respect'),
      description: t('about.values.respect_text'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    { 
      id: 'innovation', 
      title: t('about.values.innovation'),
      description: t('about.values.innovation_text'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];

  const team = [
    {
      id: 1,
      name: 'Enes Alan',
      title: 'Senior Partner',
      image: '', // Empty image URL
      education: 'LL.M., Harvard Law School',
      specialty: 'Corporate Law',
      experience: '20+ years'
    },
    {
      id: 2,
      name: 'Esin Akçay Alan',
      title: 'Partner',
      image: '', // Empty image URL
      education: 'J.D., Istanbul University',
      specialty: 'Family Law',
      experience: '15+ years'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center bg-limon-darkBlue overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop')" 
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">{t('about.history_title')}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('about.history_text')}
              </p>
              <div className="flex flex-wrap gap-8 mt-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-limon-gold mb-2">2005</div>
                  <p className="text-sm text-gray-500">Founded</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-limon-gold mb-2">50+</div>
                  <p className="text-sm text-gray-500">Legal Professionals</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-limon-gold mb-2">1000+</div>
                  <p className="text-sm text-gray-500">Successful Cases</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-limon-gold mb-2">15+</div>
                  <p className="text-sm text-gray-500">Countries</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2070&auto=format&fit=crop" 
                alt="Law firm building" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="card">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-limon-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-limon-darkBlue font-playfair">
                {t('about.mission_title')}
              </h3>
              <p className="text-gray-600">
                {t('about.mission_text')}
              </p>
            </div>
            <div className="card">
              <div className="mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-limon-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-limon-darkBlue font-playfair">
                {t('about.vision_title')}
              </h3>
              <p className="text-gray-600">
                {t('about.vision_text')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('about.values_title')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value) => (
              <div key={value.id} className="card flex">
                <div className="mr-6 text-limon-darkBlue">
                  {value.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3 text-limon-darkBlue font-playfair">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">{t('about.team_section_title')}</h2>
            <p className="section-subtitle mx-auto">
              {t('about.team_section_subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {team.map((member) => (
              <div key={member.id} className="card text-center hover:translate-y-[-5px]">
                <div className="mb-6 overflow-hidden rounded-full w-32 h-32 mx-auto">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-4xl">{member.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1 text-limon-darkBlue font-playfair">
                  {member.name}
                </h3>
                <p className="text-limon-gold mb-2">{member.title}</p>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{member.education}</p>
                  <p>{member.specialty}</p>
                  <p>{member.experience}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
