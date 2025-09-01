import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';
import { CryptoCurrency } from '../types/crypto';
import { CoinChart } from './CoinChart';
import { formatPrice, formatMarketCap, formatPercentage } from '../utils/formatters';

interface CoinModalProps {
  coin: CryptoCurrency | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CoinModal: React.FC<CoinModalProps> = ({ coin, isOpen, onClose }) => {
  const [selectedDays, setSelectedDays] = useState(7);

  if (!isOpen || !coin) return null;

  const isPositive = coin.price_change_percentage_24h >= 0;
  
  const timeRanges = [
    { label: '1D', days: 1 },
    { label: '7D', days: 7 },
    { label: '30D', days: 30 },
    { label: '90D', days: 90 },
    { label: '1Y', days: 365 }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white dark:bg-gray-800 px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <img 
                  src={coin.image} 
                  alt={coin.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
                />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                    {coin.name}
                  </h2>
                  <p className="text-base sm:text-lg text-gray-500 dark:text-gray-400 uppercase">
                    {coin.symbol}/USDT
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="self-end sm:self-auto p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              <div className="md:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Price Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Current Price</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatPrice(coin.current_price)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">24h Change</span>
                      <div className={`flex items-center space-x-1 ${
                        isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {isPositive ? (
                          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                        ) : (
                          <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4" />
                        )}
                        <span className="font-semibold text-sm sm:text-base">
                          {formatPercentage(coin.price_change_percentage_24h)}
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">24h High</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatPrice(coin.high_24h)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">24h Low</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatPrice(coin.low_24h)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 mt-3 sm:mt-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4">
                    Market Data
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Market Cap</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatMarketCap(coin.market_cap)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Volume 24h</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatMarketCap(coin.total_volume)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Rank</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        #{coin.market_cap_rank}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-600 dark:text-gray-400">All Time High</span>
                      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {formatPrice(coin.ath)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                        Price Chart
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {timeRanges.map((range) => (
                        <button
                          key={range.days}
                          onClick={() => setSelectedDays(range.days)}
                          className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 ${
                            selectedDays === range.days
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                          }`}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <CoinChart coinId={coin.id} days={selectedDays} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};