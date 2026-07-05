import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useTranslation } from 'react-i18next';

const Categories = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');

  const categoriesList = [
    'All',
    'Smoked Collection',
    'Seafood',
    'Dumplings',
    'Sweet Delight',
    'Frozen Veg Fruits',
    'Other Products',
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');

    if (categoryFromUrl && categoriesList.includes(categoryFromUrl)) {
      setActiveCategory(categoryFromUrl);
    } else {
      setActiveCategory('All');
    }
  }, [location.search]);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const getCategoryTranslation = (cat) => {
    switch (cat) {
      case 'All':
        return t('categories.all');
      case 'Smoked Collection':
        return t('categories.smoked_collection');
      case 'Seafood':
        return t('categories.seafood');
      case 'Dumplings':
        return t('categories.dumplings');
      case 'Sweet Delight':
        return t('categories.sweet_delight');
      case 'Frozen Veg Fruits':
        return t('categories.frozen_veg_fruits');
      case 'Other Products':
        return t('categories.other_products');
      default:
        return cat;
    }
  };

  return (
    <div className="pt-40 pb-16 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-12 uppercase tracking-wide">
          {t('categories.title_our')}{' '}
          <span className="text-brand-orange italic">
            {t('categories.title_collections')}
          </span>
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categoriesList.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 uppercase tracking-wider text-sm font-semibold rounded transition-colors ${activeCategory === category
                  ? 'bg-brand-orange text-white'
                  : 'border border-gray-300 text-gray-600 hover:border-brand-orange hover:text-brand-orange'
                }`}
            >
              {getCategoryTranslation(category)}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-12 text-lg">
            {t('categories.no_products')}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
