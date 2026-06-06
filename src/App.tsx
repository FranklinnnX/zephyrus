import { useEffect, useMemo, useState } from 'react';
import { fetchTopMarketCoins, fetchTrendingCoins, MarketCoin, TrendingCoin } from './services/coingecko';

const sentimentBuckets = ['Bullish', 'Neutral', 'Bearish'];
const sectors = ['L2', 'Oracle', 'Gaming', 'DeFi', 'Infrastructure'];

const getRandomItem = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

function formatPercent(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function buildHypedTweet(coin: TrendingCoin | MarketCoin) {
  const signals = [
    'Social volume is spiking.',
    'On-chain liquidity looks ready to rotate.',
    'Whale wallets are accumulating.',
    'Market chatter is pushing this narrative higher.',
    'This token has breakout momentum on the hourly tape.',
  ];

  const mention = 'coin' in coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : `${coin.name} (${coin.symbol.toUpperCase()})`;
  return `${mention}: ${getRandomItem(signals)} #crypto #Zephyrus`;
}

function App() {
  const [trending, setTrending] = useState<TrendingCoin[]>([]);
  const [marketCoins, setMarketCoins] = useState<MarketCoin[]>([]);
  const [statusMessage, setStatusMessage] = useState('Loading live crypto intelligence...');
  const [lastUpdated, setLastUpdated] = useState('');
  const [tweets, setTweets] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const refreshLiveData = async () => {
    try {
      setError(null);
      setStatusMessage('Fetching live crypto scans...');
      const [trendingData, marketData] = await Promise.all([fetchTrendingCoins(), fetchTopMarketCoins()]);
      setTrending(trendingData);
      setMarketCoins(marketData);
      setLastUpdated(new Date().toLocaleTimeString());
      setTweets([
        buildHypedTweet(trendingData[0] ?? marketData[0]),
        buildHypedTweet(marketData[1] ?? trendingData[1]),
        buildHypedTweet(marketData[2] ?? trendingData[2]),
        buildHypedTweet(trendingData[2] ?? marketData[3]),
      ]);
      setStatusMessage('Live crypto intelligence refreshed.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load live data.');
      setStatusMessage('Unable to load live crypto data.');
    }
  };

  useEffect(() => {
    refreshLiveData();
    const interval = window.setInterval(refreshLiveData, 30000);
    return () => window.clearInterval(interval);
  }, []);

  const topGainers = useMemo(
    () => marketCoins.filter((coin) => coin.price_change_percentage_24h > 4).slice(0, 5),
    [marketCoins],
  );

  const hypeSignals = useMemo(() => {
    const coins = trending.slice(0, 3).map((coin) => `${coin.name} (${coin.symbol.toUpperCase()})`);
    if (!coins.length) return ['Waiting for live trending token scans.'];
    return coins.map((label) => `Hype detected: ${label} appearing in top search volume.`);
  }, [trending]);

  const activeAlerts = useMemo(() => {
    if (!marketCoins.length) return ['Scanning for fast-growth tokens.'];
    return marketCoins.slice(0, 4).map((coin) => {
      const direction = coin.price_change_percentage_24h >= 0 ? 'up' : 'down';
      return `${coin.name} is ${direction} ${formatPercent(coin.price_change_percentage_24h)} with ${Math.round(coin.total_volume / 1_000_000)}M USD volume.`;
    });
  }, [marketCoins]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="brand">
          <span className="logo">Zephyrus</span>
          <p className="tagline">West Wind of Crypto Twitter</p>
        </div>
        <nav className="nav-links">
          <a href="#live">Live Scan</a>
          <a href="#hype">Hyped Tokens</a>
          <a href="#gainers">Growth Scan</a>
          <a href="#tweets">Tweets</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Zephyrus Live</p>
          <h1>Real-Time Hyped Token & Tweet Scanner</h1>
          <p className="hero-copy">
            Scanning Crypto Twitter hype, trending tokens, and market growth signals in real time with live CoinGecko data.
          </p>
          <p style={{ marginTop: 16, color: '#a8c9e5' }}>{statusMessage}</p>
          <p style={{ marginTop: 8, color: '#8eaacc' }}>Last updated: {lastUpdated || '—'}</p>
        </div>
        <div className="hero-card">
          <strong>Live Scan Summary</strong>
          <dl>
            <div>
              <dt>Trending coins</dt>
              <dd>{trending.length}</dd>
            </div>
            <div>
              <dt>Top gainers</dt>
              <dd>{topGainers.length}</dd>
            </div>
            <div>
              <dt>Alerts active</dt>
              <dd>{activeAlerts.length}</dd>
            </div>
            <div>
              <dt>Refresh interval</dt>
              <dd>30s</dd>
            </div>
          </dl>
        </div>
      </section>

      <main>
        <section id="live">
          <h2>Live Token Scan</h2>
          <p>Real market momentum and trending coin signals powered by live public crypto data.</p>
          {error ? <div className="alert-box">{error}</div> : null}
          <div className="grid">
            {marketCoins.slice(0, 4).map((coin) => (
              <article key={coin.id}>
                <h3>{coin.name}</h3>
                <p>{coin.symbol.toUpperCase()} · Rank #{coin.market_cap_rank}</p>
                <p>Price: ${coin.current_price.toLocaleString()}</p>
                <p>24h: {formatPercent(coin.price_change_percentage_24h)}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="hype">
          <h2>Hyped Tweets Scanner</h2>
          <p>Scanning social velocity and trending tokens to surface the fastest-moving narratives.</p>
          <div className="grid">
            {hypeSignals.map((signal, index) => (
              <article key={index}>
                <h3>Signal {index + 1}</h3>
                <p>{signal}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="gainers">
          <h2>Growth Scan</h2>
          <p>Detect fast-growth tokens by price gains, volume, and trending market attention.</p>
          <div className="grid">
            {topGainers.length ? (
              topGainers.map((coin) => (
                <article key={coin.id}>
                  <h3>{coin.name}</h3>
                  <p>Price: ${coin.current_price.toLocaleString()}</p>
                  <p>24h Gain: {formatPercent(coin.price_change_percentage_24h)}</p>
                  <p>Volume: ${Math.round(coin.total_volume / 1_000_000)}M</p>
                </article>
              ))
            ) : (
              <article>
                <h3>No hot gainers</h3>
                <p>Waiting for the next breakout signal.</p>
              </article>
            )}
          </div>
        </section>

        <section id="tweets">
          <h2>Live Tweet Feed</h2>
          <p>Hypothetical tweet alerts generated from live trending crypto scan results.</p>
          <button className="button" onClick={refreshLiveData}>Refresh Now</button>
          <ul className="tweet-list">
            {tweets.map((tweet, index) => (
              <li key={`${tweet}-${index}`}>{tweet}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>Zephyrus scans live token hype and market growth across Crypto Twitter and real-time market data.</p>
      </footer>
    </div>
  );
}

export default App;
