import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { CryptoCurrency } from '../types/crypto';
import { formatPrice, formatMarketCap, formatPercentage } from '../utils/formatters';

interface CoinCardProps {
  coin: CryptoCurrency;
  onClick: () => void;
  isVanry?: boolean;
}

export const CoinCard: React.FC<CoinCardProps> = ({ coin, onClick, isVanry }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-1 ${
        isVanry ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
      }`}
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
        {/* Left side: logo + text */}
        <div className="flex items-center space-x-3">
          <img
            src={coin.image}
            alt={coin.name}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                {coin.name}
              </h3>
              {isVanry && (
                <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full whitespace-nowrap">
                  Featured
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 uppercase">
              {isVanry ? 'VANRY/USDT' : `${coin.symbol.toUpperCase()}/USDT`}
            </p>
          </div>
        </div>

        {/* Right side: price + percentage */}
        <div className="text-left sm:text-right w-full sm:w-auto">
          <p className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
            {formatPrice(coin.current_price)}
          </p>
          <div
            className={`flex items-center justify-start sm:justify-end space-x-1 ${
              isPositive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">
              {formatPercentage(coin.price_change_percentage_24h)}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Market Cap</p>
          <p className="font-semibold text-gray-900 dark:text-white truncate">
            {formatMarketCap(coin.market_cap)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Volume 24h</p>
          <p className="font-semibold text-gray-900 dark:text-white truncate">
            {formatMarketCap(coin.total_volume)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">24h High</p>
          <p className="font-semibold text-gray-900 dark:text-white truncate">
            {formatPrice(coin.high_24h)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">24h Low</p>
          <p className="font-semibold text-gray-900 dark:text-white truncate">
            {formatPrice(coin.low_24h)}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          <span>Rank #{coin.market_cap_rank}</span>
          <span className="hidden sm:inline">Click for details</span>
        </div>
      </div>
    </div>
  );
};
