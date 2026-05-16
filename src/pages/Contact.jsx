import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-40 pb-16 bg-brand-cream min-h-screen flex items-center">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

          <div className="flex-1 bg-black text-white p-12 md:p-16 flex flex-col justify-center relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange rounded-bl-full opacity-20"></div>
            <h2 className="text-4xl font-serif font-bold mb-6">{t('contact.get_in')} <span className="text-brand-orange italic">{t('contact.touch')}</span></h2>
            <p className="text-gray-400 mb-12 leading-relaxed">
              {t('contact.desc')}
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-brand-orange text-sm uppercase tracking-wider font-semibold mb-1">{t('contact.email')}</h4>
                <p className="text-lg">orders@smokedshop.ca</p>
              </div>
              <div>
                <h4 className="text-brand-orange text-sm uppercase tracking-wider font-semibold mb-1">{t('contact.phone')}</h4>
                <p className="text-lg">(438) 686-1729</p>
              </div>
              <div>
                <h4 className="text-brand-orange text-sm uppercase tracking-wider font-semibold mb-1">{t('contact.hours')}</h4>
                <p className="text-lg text-gray-300">{t('contact.hours_time')}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 p-12 md:p-16">
            <h3 className="text-2xl font-bold mb-8">{t('contact.send_message')}</h3>
            {submitted ? (
              <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-200">
                <h4 className="font-bold mb-2">{t('contact.thank_you')}</h4>
                <p>{t('contact.success_msg')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">{t('contact.label_name')}</label>
                  <input required type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors" placeholder={t('contact.placeholder_name')} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">{t('contact.label_phone')}</label>
                  <input
                    required
                    type="tel"
                    placeholder={t('contact.placeholder_phone')}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">{t('contact.label_message')}</label>
                  <textarea required rows="4" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-colors" placeholder={t('contact.placeholder_message')}></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">{t('contact.submit')}</button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
