import React, { useState } from 'react';
import { CryptoCurrency } from '../types/crypto';
import { CoinCard } from './CoinCard';
import { CoinModal } from './CoinModal';
import { LoadingSpinner } from './LoadingSpinner';

interface CoinListProps {
  coins: CryptoCurrency[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

export const CoinList: React.FC<CoinListProps> = ({ 
  coins, 
  loading, 
  error, 
  searchQuery 
}) => {
  const [selectedCoin, setSelectedCoin] = useState<CryptoCurrency | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCoinClick = (coin: CryptoCurrency) => {
    setSelectedCoin(coin);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCoin(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading cryptocurrency data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 text-lg mb-2">Error loading data</p>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredCoins.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            No cryptocurrencies found matching "{searchQuery}"
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCoins.map((coin, index) => (
          <CoinCard
            key={coin.id}
            coin={coin}
            onClick={() => handleCoinClick(coin)}
            isVanry={coin.symbol.toLowerCase() === 'vanry' || coin.id === 'vanar-chain' || index === 0}
          />
        ))}
      </div>

      <CoinModal
        coin={selectedCoin}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};