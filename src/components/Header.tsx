
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const { t, language, changeLanguage } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-limon-darkBlue font-playfair font-bold text-2xl">
            {t('common.firm_name')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active-link' : ''}`}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active-link' : ''}`}
          >
            {t('nav.about')}
          </Link>
          <Link 
            to="/services"
            className={`nav-link ${isActive('/services') ? 'active-link' : ''}`}
          >
            {t('nav.services')}
          </Link>
          <Link 
            to="/appointment" 
            className={`nav-link ${isActive('/appointment') ? 'active-link' : ''}`}
          >
            {t('nav.appointment')}
          </Link>
          <Link 
            to="/contact"
            className={`nav-link ${isActive('/contact') ? 'active-link' : ''}`}
          >
            {t('nav.contact')}
          </Link>
          <div className="ml-6 flex items-center space-x-2">
            <button 
              onClick={() => changeLanguage('tr')} 
              className={`p-1.5 rounded-full ${language === 'tr' ? 'bg-limon-gold/20 ring-1 ring-limon-gold' : ''}`}
              aria-label="Türkçe"
            >
              🇹🇷
            </button>
            <button 
              onClick={() => changeLanguage('en')} 
              className={`p-1.5 rounded-full ${language === 'en' ? 'bg-limon-gold/20 ring-1 ring-limon-gold' : ''}`}
              aria-label="English"
            >
              🇬🇧
            </button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => changeLanguage('tr')} 
              className={`p-1.5 rounded-full ${language === 'tr' ? 'bg-limon-gold/20 ring-1 ring-limon-gold' : ''}`}
              aria-label="Türkçe"
            >
              🇹🇷
            </button>
            <button 
              onClick={() => changeLanguage('en')} 
              className={`p-1.5 rounded-full ${language === 'en' ? 'bg-limon-gold/20 ring-1 ring-limon-gold' : ''}`}
              aria-label="English"
            >
              🇬🇧
            </button>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-limon-darkBlue p-2"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="container mx-auto py-3 px-4 flex flex-col space-y-3">
          <Link to="/" className="block py-2">
            {t('nav.home')}
          </Link>
          <Link to="/about" className="block py-2">
            {t('nav.about')}
          </Link>
          <Link to="/services" className="block py-2">
            {t('nav.services')}
          </Link>
          <Link to="/appointment" className="block py-2">
            {t('nav.appointment')}
          </Link>
          <Link to="/contact" className="block py-2">
            {t('nav.contact')}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
