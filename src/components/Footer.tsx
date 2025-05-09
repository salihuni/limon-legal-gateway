
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-limon-darkBlue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Firm Info */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-playfair text-2xl font-bold text-limon-gold mb-4">
              {t('common.firm_name')}
            </h3>
            <p className="mb-6 text-gray-300">
              {t('home.intro_text').replace('2023', '2023').replace('vermekteyiz', 'vermektedir').substring(0, 100)}...
            </p>
          </div>
          
          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-playfair text-xl font-semibold mb-4">
              {t('nav.home')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="footer-link block">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link block">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="footer-link block">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="footer-link block">
                  {t('nav.appointment')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link block">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-playfair text-xl font-semibold mb-4">
              {t('services.title')}
            </h3>
            <ul className="space-y-2">
              <li className="footer-link">{t('services.corporate_law')}</li>
              <li className="footer-link">{t('services.family_law')}</li>
              <li className="footer-link">{t('services.criminal_law')}</li>
              <li className="footer-link">{t('services.real_estate_law')}</li>
              <li className="footer-link">{t('services.labor_law')}</li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="font-playfair text-xl font-semibold mb-4">
              {t('nav.contact')}
            </h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-1 text-limon-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{t('contact.address')}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-limon-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{t('contact.phone')}</span>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-limon-gold" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{t('contact.email')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            {t('footer.rights')}
          </p>
          <div className="flex mt-4 md:mt-0 space-x-4">
            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
              {t('footer.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
