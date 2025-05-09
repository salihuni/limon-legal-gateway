
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import trText from '../data/tr.json';
import enText from '../data/en.json';

type LanguageContextType = {
  language: 'tr' | 'en';
  t: (key: string) => string;
  changeLanguage: (lang: 'tr' | 'en') => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const texts = { tr: trText, en: enText };

  // Update HTML lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string) => {
    const keys = key.split('.');
    let value = texts[language] as any;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    
    return value || key;
  };

  const changeLanguage = (lang: 'tr' | 'en') => {
    setLanguage(lang);
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
