import { useState, useEffect } from 'react';
import { cryptoService } from '../services/cryptoService';
import { CryptoCurrency, CoinHistory } from '../types/crypto';

export const useCrypto = () => {
  const [coins, setCoins] = useState<CryptoCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await cryptoService.getCoins();
      setCoins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    
    // Auto refresh every 60 seconds
    const interval = setInterval(fetchCoins, 60000);
    return () => clearInterval(interval);
  }, []);

  return { coins, loading, error, refetch: fetchCoins };
};

export const useCoinHistory = (coinId: string, days: number = 7) => {
  const [history, setHistory] = useState<CoinHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      if (!coinId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await cryptoService.getCoinHistory(coinId, days);
        setHistory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [coinId, days]);

  return { history, loading, error };
};