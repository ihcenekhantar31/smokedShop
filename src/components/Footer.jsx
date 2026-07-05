import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-[#0f0f0f] text-gray-300 py-16 border-t border-gray-800">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">

        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link to="/" className="font-serif text-2xl font-bold tracking-wider uppercase text-white mb-6">
            Smoked <span className="text-brand-orange italic">Shop</span>
          </Link>
          <p className="text-sm leading-relaxed max-w-xs">
            {t('footer.brand_desc')}
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-brand-orange font-serif text-xl mb-6">{t('footer.quick_links')}</h3>
          <ul className="space-y-3">
            <li><Link to="/" className="hover:text-white transition-colors text-sm uppercase tracking-wider">{t('footer.home')}</Link></li>
            <li><Link to="/categories" className="hover:text-white transition-colors text-sm uppercase tracking-wider">{t('footer.collections')}</Link></li>
            <li><Link to="/delivery" className="hover:text-white transition-colors text-sm uppercase tracking-wider">{t('footer.delivery')}</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors text-sm uppercase tracking-wider">{t('footer.our_story')}</Link></li>
          </ul>
        </div>
        {/* Follow Us */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-brand-orange font-serif text-xl mb-6">
            {t('footer.follow_us')}
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="https://www.tiktok.com/@smokedshop5"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange hover:underline transition-colors"
              >
                TikTok
              </a>
            </li>

            <li>
              <a
                href="https://www.instagram.com/smokedshop_mtl/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange hover:underline transition-colors"
              >
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61589282331735"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-orange hover:underline transition-colors"
              >
                Facebook
              </a>
            </li>

            <li>
              <a href="https://wa.me/14386861729" className="hover:text-white transition-colors">
                WhatsApp
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-brand-orange font-serif text-xl mb-6">{t('footer.contact_us')}</h3>
          <ul className="space-y-3 text-sm">
            <li>{t('footer.email')}: <a href="mailto:orders@smokedshop.ca" className="hover:text-white transition-colors">orders@smokedshop.ca</a></li>
            <li>{t('footer.phone')}: <a href="tel:4386861729" className="hover:text-white transition-colors">(438) 686-1729</a></li>
            <li className="mt-6">

            </li>
            <li className="mt-6 text-xs text-gray-500">© {new Date().getFullYear()} {t('footer.rights')}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
