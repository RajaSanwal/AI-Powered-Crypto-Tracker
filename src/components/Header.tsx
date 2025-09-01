import React from 'react';
import { TrendingUp, Search, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  searchQuery, 
  onSearchChange, 
  onClearSearch 
}) => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 sm:h-16 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                CryptoTracker Pro
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Real-time cryptocurrency prices
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search cryptocurrencies..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full sm:w-48 md:w-64 pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
              />
              {searchQuery && (
                <button
                  onClick={onClearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                </button>
              )}
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};