import React from 'react';
import { TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react';
import { CryptoCurrency } from '../types/crypto';
import { formatMarketCap } from '../utils/formatters';

interface StatsProps {
  coins: CryptoCurrency[];
}

export const Stats: React.FC<StatsProps> = ({ coins }) => {
  const totalMarketCap = coins.reduce((sum, coin) => sum + coin.market_cap, 0);
  const totalVolume = coins.reduce((sum, coin) => sum + coin.total_volume, 0);
  const gainers = coins.filter(coin => coin.price_change_percentage_24h > 0).length;
  const topGainer = coins.reduce((prev, current) => 
    prev.price_change_percentage_24h > current.price_change_percentage_24h ? prev : current
  );

  const stats = [
    {
      title: 'Total Market Cap',
      value: formatMarketCap(totalMarketCap),
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: '24h Volume',
      value: formatMarketCap(totalVolume),
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'Gainers',
      value: `${gainers}/${coins.length}`,
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      title: 'Top Gainer',
      value: `${topGainer.symbol.toUpperCase()} +${topGainer.price_change_percentage_24h.toFixed(2)}%`,
      icon: Activity,
      color: 'purple'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200"
        >
          <div className="flex items-center">
            <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="ml-3 sm:ml-4 min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-base sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};