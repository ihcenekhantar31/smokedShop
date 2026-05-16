import React, { useState } from 'react';
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
    };
  }

  if (!isValidCanadianPostalCode(cleanedPostalCode)) {
    return {
      success: false,
      message: "Please enter a valid Canadian postal code.",
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
    };
  }

  return {
    success: true,
    zone: zone.name,
    finalFee: zone.fee,
    message: `Delivery available in ${zone.name}.`,
  };
};

const Delivery = () => {
  const { t } = useTranslation();

  const [postalCode, setPostalCode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);

  const handleCalculateDelivery = () => {
    const result = calculateDeliveryFee(postalCode);
    setDeliveryResult(result);
  };

  return (
    <div className="min-h-screen bg-brand-cream pt-40 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">

        <h1 className="text-4xl md:text-5xl font-serif font-bold text-center mb-16 uppercase tracking-wide">
          {t('delivery.title')} <span className="text-brand-orange italic">{t('delivery.policy')}</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
            <h2 className="text-2xl font-serif font-bold mb-6">
              {t('delivery.info_title')}
            </h2>

            <div className="space-y-5 text-gray-700 font-sans leading-relaxed mb-10">

              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-lg mb-2 text-brand-dark">
                  {t('delivery.info_title')}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {t('delivery.info_desc')}
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-lg mb-2 text-brand-dark">
                  {t('delivery.cost_title')}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {t('delivery.cost_desc')}
                </p>
              </div>

              <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                <h3 className="font-bold text-lg mb-2 text-brand-dark">
                  {t('delivery.free_title')}
                </h3>

                <p>
                  {t('delivery.free_desc')}
                </p>
              </div>

              <div className="p-6 bg-brand-dark text-white rounded-xl border border-gray-800">
                {t('delivery.confirmation')}
              </div>

            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-brand-orange"></div>

            <h2 className="text-2xl font-serif font-bold mb-6">
              {t('delivery.zones_title')}
            </h2>

            <p className="text-gray-600 mb-8 leading-relaxed">
              {t('delivery.zones_desc')}
            </p>

            <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-inner">
              <img
                src="/images/homepagemap.png.png"
                alt="Delivery zones map"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-brand-dark">
                {t('delivery.calculator_title')}
              </h3>

              <p className="text-sm text-gray-500 mb-4">
                {t('delivery.calculator_desc')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  placeholder={t('delivery.postal_code')}
                  maxLength="7"
                  className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                />

                <button
                  type="button"
                  onClick={handleCalculateDelivery}
                  className="px-6 py-3 bg-brand-orange text-white font-bold rounded-lg hover:bg-black transition-colors"
                >
                  {t('delivery.calculate')}
                </button>
              </div>

              {deliveryResult && (
                <div
                  className={`mt-5 rounded-xl p-5 border ${deliveryResult.success
                      ? "bg-green-50 border-green-200"
                      : "bg-orange-50 border-orange-200"
                    }`}
                >
                  <p className="font-bold text-gray-800 mb-3">
                    {deliveryResult.message}
                  </p>

                  {deliveryResult.success && (
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex justify-between gap-4">
                        <span>Zone</span>
                        <strong>{deliveryResult.zone}</strong>
                      </div>

                      <div className="flex justify-between gap-4 border-t pt-3 mt-3 text-base">
                        <span>Delivery fee</span>
                        <strong>${deliveryResult.finalFee.toFixed(2)}</strong>
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-3">
                {t('delivery.final_fee_note')}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Delivery;