import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  const categories = [
    {
      title: t('categories.smoked_collection'),
      description: t('home.categories.smoked_collection_desc'),
      image: '/images/categories/smoked collection.jpg',
      link: '/categories?category=Smoked Collection',
    },
    {
      title: t('categories.seafood'),
      description: t('home.categories.seafood_desc'),
      image: '/images/categories/sea food.jpg',
      link: '/categories?category=Seafood',
    },
    {
      title: t('categories.dumplings'),
      description: t('home.categories.dumplings_desc'),
      image: '/images/categories/dumplings.jpg',
      link: '/categories?category=Dumplings',
    },
    {
      title: t('categories.sweet_delight'),
      description: t('home.categories.sweet_delight_desc'),
      image: '/images/categories/sweats.jpg',
      link: '/categories?category=Sweet Delight',
    },
  ];

  const specials = [
    {
      title: t('home.specials.smoked_salmon'),
      text: t('home.specials.smoked_salmon_desc'),
      image: '/images/smoked-collection/slice smoke salmon.jpg',
    },
    {
      title: t('home.specials.seafood'),
      text: t('home.specials.seafood_desc'),
      image: '/images/seafood/butterfly.jpg',
    },
    {
      title: t('home.specials.dumplings'),
      text: t('home.specials.dumplings_desc'),
      image: '/images/dumplings/GrandmasPerogies beef pelmeni.jpg',
    },
  ];

  return (
    <div className="bg-brand-cream overflow-hidden">

      {/* HERO */}
      <section className="relative min-h-screen pt-32 overflow-hidden bg-black">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/home page image.png"
            alt="Smoked salmon"
            className="w-full h-full object-cover object-center"
          />

          {/* Left dark only / right clear */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.90) 22%, rgba(0,0,0,0.50) 38%, rgba(0,0,0,0.12) 52%, rgba(0,0,0,0.02) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto px-6 min-h-[calc(100vh-8rem)] flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-white w-full max-w-[460px]"
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[72px] leading-[1.05] mb-8">
              {t('home.hero_title_1')}
              <br />
              <span className="italic text-brand-orange">
                {t('home.hero_title_accent')}
              </span>
              <br />
              {t('home.hero_title_2')}
            </h1>

            <div className="w-20 h-1 bg-brand-orange mb-8"></div>

            <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-10 max-w-[440px]">
              {t('home.hero_desc')}
            </p>

            <Link
              to="/categories"
              className="inline-block bg-brand-orange text-white px-8 py-4 rounded font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              {t('home.explore_menu')}
            </Link>
          </motion.div>
        </div>
      </section>
      {/* WEEKLY SPECIALS */}
      <section className="bg-brand-cream py-20 px-6">
        <div className="container mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10 mb-10 text-center"
          >
            <p className="text-brand-orange uppercase tracking-[0.3em] text-sm font-bold mb-3">
              {t('home.specials_tag')}
            </p>

            <h2 className="font-serif text-3xl md:text-5xl font-bold text-black mb-4">
              {t('home.specials_title')}
            </h2>

            <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {t('home.specials_desc')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specials.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 55 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: index * 0.15 }}
                className="bg-black rounded-2xl shadow-xl border border-brand-orange/50 overflow-hidden hover:-translate-y-2 transition-all duration-500"
              >
                <div className="h-56 bg-gray-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <p className="inline-block bg-brand-orange text-white uppercase tracking-widest text-xs font-bold px-4 py-2 rounded-full mb-4">
                    {t('home.special_badge')}
                  </p>

                  <h3 className="font-serif text-2xl font-bold text-white mb-3">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 text-sm">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-brand-cream py-20 px-6 text-black">
        <div className="container mx-auto max-w-6xl">

          <motion.div
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <p className="text-brand-orange uppercase tracking-[0.3em] text-sm font-bold mb-4">
              {t('home.collections_tag')}
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-black">
              {t('home.collections_title')}
            </h2>
          </motion.div>

          <div className="space-y-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
              >
                <div className={index % 2 !== 0 ? 'md:order-2' : ''}>
                  <div className="h-[360px] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                <div className={index % 2 !== 0 ? 'md:order-1' : ''}>
                  <p className="text-brand-orange uppercase tracking-[0.25em] text-sm font-bold mb-4">
                    {t('home.category_tag')}
                  </p>

                  <h3 className="font-serif text-4xl font-bold mb-6 text-black">
                    {category.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed mb-8 max-w-xl">
                    {category.description}
                  </p>

                  <Link
                    to={category.link}
                    className="inline-block border border-brand-orange text-brand-orange px-8 py-3 rounded uppercase tracking-widest text-sm font-bold hover:bg-brand-orange hover:text-white transition-all duration-300"
                  >
                    {t('home.view_products')}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* DELIVERY ZONE */}
      <section className="bg-black py-20 px-6 text-white">
        <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <motion.div
            initial={{ opacity: 0, x: -55 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-brand-orange uppercase tracking-[0.3em] text-sm font-bold mb-4">
              {t('home.logistics_tag')}
            </p>

            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">
              {t('home.delivery_title')}
            </h2>

            <p className="text-gray-300 leading-relaxed mb-8 max-w-xl">
              {t('home.delivery_desc')}
            </p>

            <ul className="space-y-5 text-gray-300 mb-10">
              <li className="flex items-start gap-4">
                <span className="w-2 h-2 mt-2 bg-brand-orange rounded-full flex-shrink-0"></span>
                <div>
                  <strong className="text-white block mb-1">{t('home.delivery_notice_title')}</strong>
                  {t('home.delivery_notice_text')}
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="w-2 h-2 mt-2 bg-brand-orange rounded-full flex-shrink-0"></span>
                <div>
                  <strong className="text-white block mb-1">{t('home.free_delivery_title')}</strong>
                  {t('home.free_delivery_text')}
                </div>
              </li>
            </ul>

            <Link
              to="/delivery"
              className="inline-block bg-brand-orange text-white px-8 py-4 rounded font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
            >
              {t('home.view_policy')}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 55 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-2xl"
          >
            <img
              src="/images/homepagemap.png.png"
              alt="Delivery zones map"
              className="w-full rounded-xl"
            />
          </motion.div>

        </div>
      </section>

    </div>
  );
};

export default Home;