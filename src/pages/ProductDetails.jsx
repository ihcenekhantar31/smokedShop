import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product && product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0].size);
    } else {
      setSelectedSize(null);
    }
  }, [id, product]);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-24 text-center min-h-[60vh]">
        <h2 className="text-3xl font-serif font-bold mb-6">{t('product.not_found')}</h2>
        <button onClick={() => navigate('/categories')} className="btn-primary">
          {t('product.return_to_collections')}
        </button>
      </div>
    );
  }

  const name = t(`products.${product.id}.name`, { defaultValue: product.name });
  const description = t(`products.${product.id}.description`, { defaultValue: product.description });
  const category = t(`products.${product.id}.category`, { defaultValue: product.category });
  const usesContainedImage = product.category === 'Frozen Veg Fruits' || product.category === 'Other Products';

  const activeVariant = product.sizes ? product.sizes.find(s => s.size === selectedSize) : null;
  const currentPrice = activeVariant ? activeVariant.price : product.price;

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      selectedSize: selectedSize || undefined,
      price: currentPrice
    };
    addToCart(productToAdd, quantity);
  };

  return (
    <div className="pt-40 pb-16 bg-white min-h-screen">
      <div className="container mx-auto px-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-brand-orange transition-colors mb-12 text-sm uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('product.back_to_collections')}
        </button>

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16">

          {/* Image */}
          <div className={`flex-1 rounded-2xl overflow-hidden shadow-lg border border-gray-100 ${usesContainedImage ? 'bg-white p-6 min-h-[420px] flex items-center justify-center' : 'bg-gray-50'}`}>
            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-full max-h-[520px] object-center transition-transform duration-700 ${usesContainedImage ? 'object-contain' : 'object-cover transform hover:scale-105'}`}
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 flex flex-col justify-center">

            <div className="text-brand-orange uppercase tracking-widest font-bold text-sm mb-4">
              {category}
            </div>

            <h1 className="font-serif text-5xl font-bold text-brand-dark mb-6">
              {name}
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {description}
            </p>

            {/* Size & Purchase Block */}
            <div className={`flex flex-col ${product.sizes ? 'md:flex-row md:items-end' : ''} gap-8 mb-10`}>
              {/* Size Selector */}
              {product.sizes && (
                <div className="w-full md:w-1/2">
                  <span className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                    {t('product.select_size') || 'Select Size'}:{' '}
                    <span className="text-brand-orange font-bold font-serif text-sm ml-1">
                      {activeVariant ? `${activeVariant.size} — ${t(activeVariant.labelKey, { defaultValue: activeVariant.label })}` : ''}
                    </span>
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {product.sizes.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => setSelectedSize(variant.size)}
                        className={`px-3 py-2 rounded-lg border font-bold text-xs tracking-wider transition-all duration-300 text-center ${
                          selectedSize === variant.size
                            ? 'border-brand-orange bg-brand-orange text-white shadow-md shadow-brand-orange/20'
                            : 'border-gray-200 text-gray-700 bg-gray-50 hover:border-brand-orange/50 hover:bg-brand-cream/30'
                        }`}
                      >
                        {variant.size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Purchase Details */}
              <div className={`w-full ${product.sizes ? 'md:w-1/2' : ''} flex flex-col justify-end`}>
                <div className="flex items-end gap-4 mb-4">
                  <p className="text-3xl font-light">
                    ${currentPrice.toFixed(2)}
                  </p>

                  <p className="text-sm text-gray-500 mb-1">
                    {t('product.weight_1lbs')}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center bg-white border border-brand-orange rounded-lg overflow-hidden h-[56px] flex-shrink-0">
                    <div className="flex flex-col border-r border-brand-orange">
                      <button
                        onClick={increaseQuantity}
                        className="w-10 h-7 bg-brand-orange text-black font-bold hover:bg-black hover:text-white transition-colors"
                      >
                        +
                      </button>

                      <button
                        onClick={decreaseQuantity}
                        className="w-10 h-7 bg-brand-orange text-black font-bold hover:bg-black hover:text-white transition-colors"
                      >
                        -
                      </button>
                    </div>

                    <div className="w-14 text-center text-black font-bold">
                      {quantity}
                    </div>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="flex-grow bg-brand-orange text-white px-4 py-4 rounded font-bold uppercase tracking-widest hover:bg-black transition-colors h-[56px] flex items-center justify-center text-xs sm:text-sm font-bold text-center"
                  >
                    {t('product.add_to_cart_price', { price: (currentPrice * quantity).toFixed(2) })}
                  </button>
                </div>
              </div>
            </div>

            {/* Product Notes */}
            <div className="mt-4 space-y-4 text-sm text-gray-500 bg-brand-cream p-6 rounded-xl">
              <p>✓ {t('product.quality_selected')}</p>
              <p>✓ {t('product.delivery_time')}</p>
              <p>✓ {t('product.delivery_fee')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
