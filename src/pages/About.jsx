import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="w-full bg-brand-cream text-white overflow-hidden">
      {/* Title Bar */}
      <div className="w-full bg-brand-cream text-center pt-40 pb-6">
        <h1 className="font-serif text-5xl md:text-6xl font-light uppercase tracking-[0.18em] text-brand-orange italic">
          {t('about.title')}
        </h1>
      </div>

      {/* Section 1 */}
      <section className="w-full bg-black grid grid-cols-1 md:grid-cols-[40%_60%] h-[560px] overflow-hidden">
        {/* Left text area */}
        <div className="relative bg-black h-[560px] px-8 md:px-14 lg:px-20 py-8 flex items-center border-r-4 border-white/70 overflow-hidden">
          <div className="max-w-xl">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="font-serif text-4xl md:text-5xl lg:text-5xl leading-tight mb-10"
            >
              {t('about.art_of')} <br />
              <span className="italic text-brand-orange font-light">
                {t('about.smoked_selection')}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: -45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.15 }}
              className="text-gray-200 text-lg leading-relaxed mb-5"
            >
              {t('about.desc_1')}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: -45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.9, ease: 'easeOut', delay: 0.35 }}
              className="text-gray-400 leading-relaxed"
            >
              {t('about.desc_2')}
            </motion.p>
          </div>
        </div>

        {/* Right image area */}
        <div className="relative h-[560px] bg-black">
          <motion.img
            src="/images/about-chef.png"
            alt="Chef preparing premium food"
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            className="w-full h-full object-contain bg-black"
          />

          <div className="absolute inset-0 bg-black/10"></div>
        </div>
      </section>

      {/* Section 2 - Signature Values */}
      <section className="w-full bg-brand-cream py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-16"
          >
            <p className="text-brand-orange uppercase tracking-[0.35em] text-sm font-bold mb-4">
              {t('about.values_tag')}
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-black">
              {t('about.values_title')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <span className="text-brand-orange text-4xl font-serif">01</span>

              <h3 className="font-serif text-2xl font-bold text-black mt-6 mb-4">
                {t('about.val_1_title')}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {t('about.val_1_desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <span className="text-brand-orange text-4xl font-serif">02</span>

              <h3 className="font-serif text-2xl font-bold text-black mt-6 mb-4">
                {t('about.val_2_title')}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {t('about.val_2_desc')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
              className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
              <span className="text-brand-orange text-4xl font-serif">03</span>

              <h3 className="font-serif text-2xl font-bold text-black mt-6 mb-4">
                {t('about.val_3_title')}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {t('about.val_3_desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;