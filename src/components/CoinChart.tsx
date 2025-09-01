import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCoinHistory } from '../hooks/useCrypto';
import { LoadingSpinner } from './LoadingSpinner';
import { formatPrice } from '../utils/formatters';

interface CoinChartProps {
  coinId: string;
  days: number;
}

export const CoinChart: React.FC<CoinChartProps> = ({ coinId, days }) => {
  const { history, loading, error } = useCoinHistory(coinId, days);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

  if (!history) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500 dark:text-gray-400">No chart data available</p>
      </div>
    );
  }

  const chartData = history.prices.map(([timestamp, price]) => ({
    time: new Date(timestamp).toLocaleDateString(),
    price: price,
    timestamp
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">
            Price: {formatPrice(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64 sm:h-80 lg:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            className="opacity-30" 
            stroke="currentColor"
          />
          <XAxis 
            dataKey="time" 
            tick={{ fontSize: 10, fill: 'currentColor' }}
            axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
            interval="preserveStartEnd"
          />
          <YAxis 
            tick={{ fontSize: 10, fill: 'currentColor' }}
            axisLine={{ stroke: 'currentColor', opacity: 0.3 }}
            tickFormatter={(value) => formatPrice(value)}
            width={60}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#3B82F6" 
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4, fill: '#3B82F6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};