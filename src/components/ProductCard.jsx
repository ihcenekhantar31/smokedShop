import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  const { addToCart } = useCart();

  const name = t(`products.${product.id}.name`, { defaultValue: product.name });
  const description = t(`products.${product.id}.description`, { defaultValue: product.description });
  const category = t(`products.${product.id}.category`, { defaultValue: product.category });
  const usesContainedImage = product.category === 'Frozen Veg Fruits' || product.category === 'Other Products';

  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100">
      <Link
        to={`/product/${product.id}`}
        className={`relative h-64 overflow-hidden ${usesContainedImage ? 'flex items-center justify-center bg-white p-4' : 'block bg-gray-50'}`}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-300" />
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-center transition-transform duration-700 ease-in-out ${usesContainedImage ? 'object-contain' : 'object-cover transform group-hover:scale-105'}`}
        />
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs text-brand-orange uppercase tracking-wider font-semibold mb-2">{category}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl font-bold text-brand-dark mb-2 hover:text-brand-orange transition-colors line-clamp-1">{name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 flex-grow">{description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="text-sm font-semibold uppercase tracking-wider px-4 py-2 border border-brand-orange text-brand-orange rounded hover:bg-brand-orange hover:text-white transition-colors"
          >
            {t('product.add_to_cart')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
