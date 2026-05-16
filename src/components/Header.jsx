import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Globe } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { cartCount } = useCart();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const headerBg = (isHome && !isScrolled) 
    ? 'bg-gradient-to-b from-black/80 via-black/40 to-transparent' 
    : 'bg-black shadow-lg';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 text-white ${headerBg}`}>
      <div className="container mx-auto px-6 h-[110px] flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <div className="w-[105px] h-[105px] rounded-full overflow-hidden bg-white shadow-xl flex items-center justify-center">
            <img
              src="/images/logo final.png"
              alt="Smoked Shop Logo"
              className="w-full h-full object-contain scale-[1.02]"
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-lg uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.home')}</Link>
          <Link to="/categories" className="text-lg uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.categories')}</Link>
          <Link to="/delivery" className="text-lg uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.delivery')}</Link>
          <Link to="/about" className="text-lg uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="text-lg uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.contact')}</Link>
        </nav>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2">
            <Globe className="w-4 h-4 text-gray-400" />
            <select
              value={i18n.language}
              onChange={changeLanguage}
              className="bg-transparent text-white border-none text-sm outline-none cursor-pointer uppercase tracking-widest appearance-none hover:text-brand-orange transition-colors"
            >
              <option value="en" className="bg-black text-white">EN</option>
              <option value="fr" className="bg-black text-white">FR</option>
              <option value="ru" className="bg-black text-white">RU</option>
              <option value="uk" className="bg-black text-white">UK</option>
            </select>
          </div>

          <Link to="/cart" className="relative flex items-center hover:text-brand-orange transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[110px] left-0 w-full bg-black/95 backdrop-blur-md text-white py-6 flex flex-col items-center gap-6 border-t border-gray-800 shadow-2xl">
          <Link to="/" className="text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.home')}</Link>
          <Link to="/categories" className="text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.categories')}</Link>
          <Link to="/delivery" className="text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.delivery')}</Link>
          <Link to="/about" className="text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.about')}</Link>
          <Link to="/contact" className="text-sm uppercase tracking-widest hover:text-brand-orange transition-colors">{t('nav.contact')}</Link>
          
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-800 w-1/2 justify-center">
            <Globe className="w-4 h-4 text-gray-400" />
            <select
              value={i18n.language}
              onChange={changeLanguage}
              className="bg-transparent text-white border-none text-sm outline-none cursor-pointer uppercase tracking-widest appearance-none"
            >
              <option value="en" className="bg-black text-white">EN</option>
              <option value="fr" className="bg-black text-white">FR</option>
              <option value="ru" className="bg-black text-white">RU</option>
              <option value="uk" className="bg-black text-white">UK</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
