export interface TrendingCoin {
  id: string;
  name: string;
  symbol: string;
  marketCapRank: number;
  priceBtc: number;
}

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  market_cap_rank: number;
  total_volume: number;
}

const API_BASE = 'https://api.coingecko.com/api/v3';

export async function fetchTrendingCoins(): Promise<TrendingCoin[]> {
  const response = await fetch(`${API_BASE}/search/trending`);
  if (!response.ok) {
    throw new Error(`Trending fetch failed: ${response.status}`);
  }

  const data = await response.json();
  return data.coins.map((entry: any) => {
    const coin = entry.item;
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      marketCapRank: coin.market_cap_rank,
      priceBtc: coin.price_btc,
    } as TrendingCoin;
  });
}

export async function fetchTopMarketCoins(): Promise<MarketCoin[]> {
  const response = await fetch(
    `${API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false&price_change_percentage=24h`,
  );
  if (!response.ok) {
    throw new Error(`Market fetch failed: ${response.status}`);
  }

  return response.json();
}
