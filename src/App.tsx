import React, { useState } from "react";
import { Header } from "./components/Header";
import { Stats } from "./components/Stats";
import { CoinList } from "./components/CoinList";
import { useCrypto } from "./hooks/useCrypto";
import { useTheme } from "./hooks/useTheme";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const { coins, loading, error } = useCrypto();
//   const { theme, toggleTheme } = useTheme(); // ✅ use theme values

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* ✅ Add ThemeToggle inside header (or navbar) */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        // rightContent={<ThemeToggle />} // pass toggle button to header if it accepts props
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {!loading && !error && coins.length > 0 && <Stats coins={coins} />}

        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : "Top Cryptocurrencies"}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            {searchQuery
              ? `${
                  coins.filter(
                    (coin) =>
                      coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length
                } results found`
              : "Tap any cryptocurrency to view detailed charts and market data"}
          </p>
        </div>

        <CoinList
          coins={coins}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
        />
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-8 sm:mt-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="text-center">
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              Data provided by CoinGecko API • Built with React, TypeScript & Tailwind CSS
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500 mt-1 sm:mt-2">
              AI-Powered Build Challenge - Professional Cryptocurrency Tracker
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
