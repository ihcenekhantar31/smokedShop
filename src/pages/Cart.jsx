import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const deliveryZones = {
  montreal: {
    name: "Montreal",
    prefixes: [
      "H1A", "H1B", "H1C", "H1E", "H1G", "H1H", "H1J", "H1K", "H1L", "H1M", "H1N", "H1P", "H1R", "H1S", "H1T", "H1V", "H1W", "H1X", "H1Y", "H1Z",
      "H2A", "H2B", "H2C", "H2E", "H2G", "H2H", "H2J", "H2K", "H2L", "H2M", "H2N", "H2P", "H2R", "H2S", "H2T", "H2V", "H2W", "H2X", "H2Y", "H2Z",
      "H3A", "H3B", "H3C", "H3E", "H3G", "H3H", "H3J", "H3K", "H3L", "H3M", "H3N", "H3P", "H3R", "H3S", "H3T", "H3V", "H3W", "H3X", "H3Y", "H3Z",
      "H4A", "H4B", "H4C", "H4E", "H4G", "H4H", "H4J", "H4K", "H4L", "H4M", "H4N", "H4P", "H4R", "H4S", "H4T", "H4V", "H4W", "H4X", "H4Y", "H4Z",
      "H5A", "H5B",
      "H8N", "H8P", "H8R", "H8S", "H8T", "H8Y", "H8Z",
      "H9A", "H9B", "H9C", "H9E", "H9G", "H9H", "H9J", "H9K", "H9P", "H9R", "H9S", "H9W", "H9X",
    ],
    fee: 5.99,
  },

  laval: {
    name: "Laval",
    prefixes: [
      "H7A", "H7B", "H7C", "H7E", "H7G", "H7H", "H7J", "H7K", "H7L", "H7M", "H7N", "H7P", "H7R", "H7S", "H7T", "H7V", "H7W", "H7X", "H7Y",
    ],
    fee: 5.99,
  },

  southShore: {
    name: "South Shore",
    prefixes: [
      "J3Y", "J3Z", "J4K", "J4L", "J4M", "J4N", "J4P", "J4R", "J4S", "J4T", "J4V", "J4W", "J4X", "J4Y", "J4Z",
    ],
    fee: 6.99,
  },

  northShore: {
    name: "North Shore",
    prefixes: [
      "J7A", "J7B", "J7C", "J7E", "J7G", "J7H", "J7J", "J7K", "J7P", "J7R",
    ],
    fee: 7.99,
  },
};

const normalizePostalCode = (value) => {
  return value.toUpperCase().replace(/\s+/g, "").trim();
};

const isValidCanadianPostalCode = (value) => {
  return /^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(value);
};

const calculateDeliveryFee = (postalCode) => {
  const cleanedPostalCode = normalizePostalCode(postalCode);

  if (!cleanedPostalCode) {
    return {
      success: false,
      message: "Please enter your postal code.",
      fee: 0,
    };
  }

  if (!isValidCanadianPostalCode(cleanedPostalCode)) {
    return {
      success: false,
      message: "Please enter a valid Canadian postal code.",
      fee: 0,
    };
  }

  const prefix = cleanedPostalCode.slice(0, 3);

  const zone = Object.values(deliveryZones).find((zone) =>
    zone.prefixes.includes(prefix)
  );

  if (!zone) {
    return {
      success: false,
      message: "Delivery is not available in your area yet. Contact us to confirm.",
      fee: 0,
    };
  }

  return {
    success: true,
    zone: zone.name,
    fee: zone.fee,
    message: `Delivery available in ${zone.name}.`,
  };
};

const Cart = () => {
  const { t } = useTranslation();
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  const [postalCode, setPostalCode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    paymentType: "cash-on-delivery",
  });

  const deliveryFee =
    cartTotal >= 200 ? 0 : deliveryResult?.success ? deliveryResult.fee : 0;

  const finalTotal = cartTotal + deliveryFee;

  const handleCalculateDelivery = () => {
    const result = calculateDeliveryFee(postalCode);
    setDeliveryResult(result);
  };

  const handleCustomerChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-40 pb-24 bg-brand-cream min-h-[70vh] flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-4xl font-serif font-bold mb-6">
            {t('cart.empty_title')}
          </h2>

          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            {t('cart.empty_desc')}
          </p>

          <Link to="/categories" className="btn-primary">
            {t('cart.explore_collections')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-40 pb-16 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        <h1 className="text-4xl font-serif font-bold mb-12 uppercase tracking-wide">
          {t('cart.title_your')}{" "}
          <span className="text-brand-orange italic">
            {t('cart.title_cart')}
          </span>
        </h1>

        <div className="space-y-10">
          {/* Products full width */}
          <div className="w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-100 text-sm font-semibold uppercase tracking-wider text-gray-500">
                <div className="col-span-6">{t('cart.col_product')}</div>
                <div className="col-span-3 text-center">{t('cart.col_quantity')}</div>
                <div className="col-span-2 text-right">{t('cart.col_total')}</div>
                <div className="col-span-1"></div>
              </div>

              <div className="divide-y divide-gray-100">
                {cartItems.map((item) => {
                  const name = t(`products.${item.id}.name`, {
                    defaultValue: item.name,
                  });

                  const category = t(`products.${item.id}.category`, {
                    defaultValue: item.category,
                  });

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-6 items-center"
                    >
                      <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div>
                          <div className="text-xs text-brand-orange font-bold uppercase tracking-wider mb-1">
                            {category}
                          </div>

                          <Link
                            to={`/product/${item.id}`}
                            className="font-serif text-lg font-bold hover:text-brand-orange transition-colors"
                          >
                            {name}
                          </Link>

                          <div className="text-gray-500 mt-1">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-3 flex justify-start md:justify-center items-center mt-4 md:mt-0">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-brand-orange transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>

                          <div className="w-12 text-center font-semibold">
                            {item.quantity}
                          </div>

                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-brand-orange transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="col-span-1 md:col-span-2 text-left md:text-right font-bold text-lg mt-2 md:mt-0">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>

                      <div className="col-span-1 flex justify-end mt-2 md:mt-0">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2"
                          title={t('cart.remove_item')}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              className={`free-shipping-message mt-3 ${cartTotal < 200 ? "free-shipping-visible" : "free-shipping-hidden"
                }`}
            >
              <div className="hidden md:grid grid-cols-12 items-center">
                <p className="col-start-7 col-span-3 text-sm font-serif italic tracking-wide text-gray-600">
                  Pour une livraison gratuite, il vous reste
                </p>

                <span className="col-start-11 col-span-1 text-right text-sm font-serif font-bold italic text-brand-orange">
                  ${Math.max(200 - cartTotal, 0).toFixed(2)}
                </span>
              </div>

              <div className="hidden md:grid grid-cols-12 mt-1">
                <Link
                  to="/categories"
                  className="col-start-7 col-span-5 text-sm font-serif italic tracking-wide text-brand-orange hover:underline"
                >
                  Check nos spéciaux de la semaine
                </Link>
              </div>

              <div className="md:hidden pl-4">
                <p className="text-sm font-serif italic tracking-wide text-gray-600">
                  Pour une livraison gratuite, il vous reste{" "}
                  <span className="font-bold text-brand-orange">
                    ${Math.max(200 - cartTotal, 0).toFixed(2)}
                  </span>
                </p>

                <Link
                  to="/categories"
                  className="mt-1 inline-block text-sm font-serif italic tracking-wide text-brand-orange hover:underline"
                >
                  Check nos spéciaux de la semaine
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
              <h2 className="text-2xl font-serif font-bold mb-6 text-brand-dark">
                Customer Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    First name
                  </label>

                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => handleCustomerChange("firstName", e.target.value)}
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Last name
                  </label>

                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => handleCustomerChange("lastName", e.target.value)}
                    placeholder="Last name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Cell phone
                  </label>

                  <input
                    type="tel"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerChange("phone", e.target.value)}
                    placeholder="514 000 0000"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Postal code
                  </label>

                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="H2X 1Y4"
                    maxLength="7"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Address
                  </label>

                  <textarea
                    value={customerInfo.address}
                    onChange={(e) => handleCustomerChange("address", e.target.value)}
                    placeholder="Street address, apartment, city"
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-600 mb-2">
                    Payment type
                  </label>

                  <select
                    value={customerInfo.paymentType}
                    onChange={(e) => handleCustomerChange("paymentType", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  >
                    <option value="cash-on-delivery">Cash on delivery</option>
                    <option value="online-payment">Payment online</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-100 text-sm text-gray-500">
                Please complete your information before checkout.
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-black text-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-serif font-bold mb-6">
                {t('cart.order_summary')}
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-300 mb-2">
                  Postal code
                </label>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="H2X 1Y4"
                    maxLength="7"
                    className="w-full px-4 py-3 rounded-lg bg-white text-black border border-gray-700 focus:outline-none focus:border-brand-orange"
                  />

                  <button
                    type="button"
                    onClick={handleCalculateDelivery}
                    className="px-4 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-brand-orange-light transition-colors"
                  >
                    Calculate
                  </button>
                </div>

                {deliveryResult && (
                  <div
                    className={`mt-3 rounded-lg p-3 text-sm ${deliveryResult.success
                        ? "bg-green-900/30 text-green-200 border border-green-800"
                        : "bg-red-900/30 text-red-200 border border-red-800"
                      }`}
                  >
                    <p className="font-semibold">{deliveryResult.message}</p>

                    {deliveryResult.success && (
                      <p className="mt-1">
                        Zone: {deliveryResult.zone} — Delivery fee: $
                        {deliveryFee.toFixed(2)}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-300">
                  <span>{t('cart.subtotal')}</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-300">
                  <span>{t('cart.shipping')}</span>
                  <span>
                    {cartTotal >= 200
                      ? "Free"
                      : deliveryResult?.success
                        ? `$${deliveryFee.toFixed(2)}`
                        : "Calculate"}
                  </span>
                </div>

                <div className="h-px bg-gray-800 my-4"></div>

                <div className="flex justify-between text-xl font-bold text-brand-orange">
                  <span>{t('cart.total')}</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-brand-orange hover:bg-brand-orange-light text-white font-bold uppercase tracking-wider py-4 rounded transition-colors flex items-center justify-center gap-2"
              >
                {t('cart.checkout')} <ArrowRight className="w-5 h-5" />
              </button>

              <div className="mt-6 text-center text-xs text-gray-500">
                {t('cart.taxes_note')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;