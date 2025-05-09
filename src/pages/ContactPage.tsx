
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from "../hooks/use-toast";
import { MapPin, Phone, Mail } from 'lucide-react';

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would normally connect to Supabase
    // Since we don't have Supabase connected yet, we're simulating a submission
    try {
      // Simulating API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      console.log('Contact form data:', formData);
      
      // Show success message
      toast({
        title: t('contact.form.success'),
        variant: "default",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.form.error'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center bg-limon-darkBlue overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=2070&auto=format&fit=crop')" 
          }}
        ></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white font-playfair mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-limon-darkBlue font-playfair">
                {t('contact.title')}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-limon-darkBlue rounded-full p-3 mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-limon-darkBlue font-playfair">
                      {t('common.address')}
                    </h3>
                    <p className="text-gray-600">{t('contact.address')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-limon-darkBlue rounded-full p-3 mr-4">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-limon-darkBlue font-playfair">
                      {t('common.phone')}
                    </h3>
                    <p className="text-gray-600">{t('contact.phone')}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-limon-darkBlue rounded-full p-3 mr-4">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-limon-darkBlue font-playfair">
                      {t('common.email')}
                    </h3>
                    <p className="text-gray-600">{t('contact.email')}</p>
                  </div>
                </div>
              </div>
              
              {/* Google Map */}
              <div className="mt-10 rounded-2xl overflow-hidden shadow-md h-[300px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.25494434628!2d28.99408327582669!3d41.066763372385455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6fe1fe3de7f%3A0x612cfa10466a6c7c!2zTWVjaWRpeWVrw7Z5LCBCw7x5w7xrZGVyZSBDZC4sIDM0Mzg3IMWeacWfbGkvxLBzdGFuYnVs!5e0!3m2!1sen!2str!4v1715182986358!5m2!1sen!2str"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Limon Law Office Location"
                ></iframe>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-limon-darkBlue font-playfair">
                  {t('contact.subtitle')}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="input-field"
                    ></textarea>
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`btn-secondary w-full ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          {t('common.submit')}
                        </div>
                      ) : (
                        t('contact.form.submit')
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
