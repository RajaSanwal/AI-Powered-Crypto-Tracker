import { CryptoCurrency, CoinHistory } from "../types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

// Generic fetch with retries + optional caching
async function fetchWithRetry<T>(
  endpoint: string,
  { retries = 3, delay = 1000, cacheKey }: { retries?: number; delay?: number; cacheKey?: string } = {}
): Promise<T> {
  // If cached, return from cache
  if (cacheKey) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }
  }

  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = (await response.json()) as T;

      // Cache result if needed
      if (cacheKey) {
        localStorage.setItem(cacheKey, JSON.stringify(data));
      }

      return data;
    } catch (err) {
      console.warn(`Fetch failed (attempt ${attempt + 1}/${retries}):`, err);
      if (attempt < retries - 1) {
        await new Promise((res) => setTimeout(res, delay * (attempt + 1))); // exponential backoff
      } else {
        throw new Error("Failed to fetch data after retries.");
      }
    }
  }

  throw new Error("Unexpected error in fetchWithRetry"); // should never hit
}

class CryptoService {
  async getCoins(
    vs_currency = "usd",
    order = "market_cap_desc",
    per_page = 100,
    page = 1
  ): Promise<CryptoCurrency[]> {
    const params = new URLSearchParams({
      vs_currency,
      order,
      per_page: per_page.toString(),
      page: page.toString(),
      sparkline: "false",
      price_change_percentage: "24h",
    });

    const coins = await fetchWithRetry<CryptoCurrency[]>(
      `/coins/markets?${params}`,
      { retries: 3, delay: 1500, cacheKey: `coins_${vs_currency}_${page}` }
    );

    // Ensure Vanry is always first
    const vanryIndex = coins.findIndex(
      (coin: CryptoCurrency) =>
        coin.symbol.toLowerCase() === "vanry" || coin.id === "vanar-chain"
    );
    if (vanryIndex > 0) {
      const vanryCoin = coins.splice(vanryIndex, 1)[0];
      coins.unshift(vanryCoin);
    }

    return coins;
  }

  async getCoinHistory(coinId: string, days = 7): Promise<CoinHistory> {
    const params = new URLSearchParams({
      vs_currency: "usd",
      days: days.toString(),
      interval: days <= 1 ? "hourly" : "daily",
    });

    return fetchWithRetry<CoinHistory>(
      `/coins/${coinId}/market_chart?${params}`,
      { retries: 3, delay: 1200, cacheKey: `history_${coinId}_${days}` }
    );
  }

  async getCoinDetails(coinId: string): Promise<CryptoCurrency> {
    const data = await fetchWithRetry<any>(`/coins/${coinId}`, {
      retries: 3,
      delay: 1500,
      cacheKey: `details_${coinId}`,
    });

    return {
      id: data.id,
      symbol: data.symbol,
      name: data.name,
      image: data.image.large,
      current_price: data.market_data.current_price.usd,
      market_cap: data.market_data.market_cap.usd,
      market_cap_rank: data.market_cap_rank,
      fully_diluted_valuation:
        data.market_data.fully_diluted_valuation?.usd || null,
      total_volume: data.market_data.total_volume.usd,
      high_24h: data.market_data.high_24h.usd,
      low_24h: data.market_data.low_24h.usd,
      price_change_24h: data.market_data.price_change_24h,
      price_change_percentage_24h:
        data.market_data.price_change_percentage_24h,
      market_cap_change_24h: data.market_data.market_cap_change_24h,
      market_cap_change_percentage_24h:
        data.market_data.market_cap_change_percentage_24h,
      circulating_supply: data.market_data.circulating_supply,
      total_supply: data.market_data.total_supply,
      max_supply: data.market_data.max_supply,
      ath: data.market_data.ath.usd,
      ath_change_percentage: data.market_data.ath_change_percentage.usd,
      ath_date: data.market_data.ath_date.usd,
      atl: data.market_data.atl.usd,
      atl_change_percentage: data.market_data.atl_change_percentage.usd,
      atl_date: data.market_data.atl_date.usd,
      last_updated: data.last_updated,
    };
  }

  async searchCoins(query: string): Promise<any[]> {
    const params = new URLSearchParams({ query });

    const data = await fetchWithRetry<{ coins: any[] }>(
      `/search?${params}`,
      { retries: 3, delay: 1000, cacheKey: `search_${query}` }
    );

    return data.coins.slice(0, 10); // Limit to top 10 results
  }
}

export const cryptoService = new CryptoService();
