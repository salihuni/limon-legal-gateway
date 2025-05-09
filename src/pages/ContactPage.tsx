
import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from 'lucide-react';
import { submitContactMessage } from '@/lib/supabase';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
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
    setSubmissionError(null);

    try {
      // Add logging to track submission flow
      console.log('Starting form submission process');
      
      // Submit the form data to Supabase
      const { success, error } = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      console.log('Form submission response:', { success, error });
      
      if (success) {
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
      } else {
        console.error('Error submitting form:', error);
        setSubmissionError(t('contact.form.error'));
        toast({
          title: t('contact.form.error'),
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Exception when submitting form:', error);
      setSubmissionError(t('contact.form.error'));
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.214727768627!2d29.041169!3d40.9988144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab868e91707e3%3A0x8f45d53677a12088!2sHasanpa%C5%9Fa%20Mah.%20Uzun%C3%A7ay%C4%B1r%20Cd.%20Konak%20%C4%B0%C5%9F%20Merkezi%20A%20Blok%20No%3A%2030%20K%3A2%20D%3A%2030%2C%2034722%20Kad%C4%B1k%C3%B6y!5e0!3m2!1str!2str!4v1721258093296!5m2!1str!2str"
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
                
                {/* Show error alert if there was a submission error */}
                {submissionError && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submissionError}</AlertDescription>
                  </Alert>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t('contact.form.name')} *
                    </label>
                    <Input
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
                    <Input
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
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      required
                      className="input-field"
                    />
                  </div>
                  <div>
                    <Button
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
                    </Button>
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
