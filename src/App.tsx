import { useEffect, useMemo, useState } from 'react';

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;
const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

const sentimentBuckets = ['Bullish', 'Neutral', 'Bearish'];
const narratives = ['AI memecoin wave', 'Layer 2 liquidity hunt', 'NFT utility lift', 'DeFi composability', 'Gaming token rotation'];
const sectors = ['L2', 'Oracle', 'Gaming', 'DeFi', 'Infrastructure'];
const nftThemes = ['On-chain communities', 'AI-generated art', 'Fractional collectibles', 'Music collectibles'];

const getRandomItem = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

function generateTweets(): string[] {
  const tweets = [
    'Zeph is seeing the wind shift toward L2 liquidity—prepare for a breakout in momentum.',
    'Crypto Twitter sentiment is heating around DeFi yield farming and vault rebalancing.',
    'Watch the smart contracts moving stablecoin liquidity into DEX pools; the next alpha is forming.',
    'NFT hype is rotating to utility-native collections with strong treasury flows.',
    'Sniper alert: low-cap launch shows strong buy-side depth across socials and wallets.',
    'Narrative rotation detected: staking utility is trading stronger than speculative memecoins.',
    'Liquidity flow is aligning with momentum on the beta tape—this looks like a wind flow breakout.',
    'Alpha distribution is favoring infrastructure and oracle narratives over crowded NFT chatter.',
  ];

  return Array.from({ length: 4 }, () => getRandomItem(tweets));
}

function App() {
  const [sentiment, setSentiment] = useState('Neutral');
  const [score, setScore] = useState(58);
  const [momentum, setMomentum] = useState(0.72);
  const [trend, setTrend] = useState('Ascending');
  const [liquidityFlow, setLiquidityFlow] = useState(0.68);
  const [rotation, setRotation] = useState('Sector rotation toward Infrastructure');
  const [hype, setHype] = useState('NFT utility hype is building');
  const [walletEdge, setWalletEdge] = useState('Whale accumulation on chain detected');
  const [sniperAlert, setSniperAlert] = useState('No immediate snipes—scanning new pairs');
  const [yieldSuggestion, setYieldSuggestion] = useState('Consider stablecoin vault plus Delta-neutral collateral strategy');
  const [nftForecast, setNftForecast] = useState('NFT demand shifting to on-chain events and memberships');
  const [tweets, setTweets] = useState<string[]>(generateTweets());

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSentiment(getRandomItem(sentimentBuckets));
      setScore(clamp(Math.round(score + randomBetween(-6, 6)), 20, 95));
      setMomentum(clamp(parseFloat((momentum + randomBetween(-0.08, 0.08)).toFixed(2)), 0.2, 0.98));
      setTrend(getRandomItem(['Ascending', 'Sideways', 'Descending']));
      setLiquidityFlow(clamp(parseFloat((liquidityFlow + randomBetween(-0.09, 0.09)).toFixed(2)), 0.12, 0.97));
      setRotation(`Narrative rotation: ${getRandomItem(narratives)}`);
      setHype(getRandomItem(['Hype spike in gaming NFTs', 'Stablecoin yield narrative re-energizes', 'Layer 2 momentum builds']));
      setWalletEdge(getRandomItem(['Whale accumulation on-chain detected', 'Smart contract flow shows redistribution to DEX pools', 'Liquidity migration into stable pools observed']));
      setSniperAlert(getRandomItem(['Potential snipe: new token with buy-side size and low sell pressure', 'Watching a token pair showing strong liquidity delta', 'No immediate snipes—scanning new pools']));
      setYieldSuggestion(getRandomItem(['Combine curved stablecoin farming with call overlay', 'Pivot to variable APY vaults while market confidence rises', 'Lock a portion in yield aggregator strategy on high-speed L2']));
      setNftForecast(getRandomItem(['NFT trend expanding into utility tokens and DAO access', 'Collectibles with real-world access are gaining attention', 'AI-native NFT collections drawing higher social liquidity']));
      setTweets(generateTweets());
    }, 4200);

    return () => window.clearInterval(interval);
  }, [score, momentum, liquidityFlow]);

  const scoreLabel = useMemo(() => {
    if (score > 75) return 'Strong Alpha';
    if (score > 50) return 'Watch closely';
    return 'Caution advised';
  }, [score]);

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="brand">
          <span className="logo">Zephyrus</span>
          <p className="tagline">West Wind of Crypto Twitter</p>
        </div>
        <nav className="nav-links">
          <a href="#alpha-carrier">Alpha Carrier</a>
          <a href="#alpha-distribution">Alpha Distribution</a>
          <a href="#onchain">On-Chain</a>
          <a href="#sniping">Sniping</a>
          <a href="#nft">NFT</a>
          <a href="#tweets">Tweets</a>
        </nav>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">Zephyrus (Zeph)</p>
          <h1>West Wind of Crypto Twitter</h1>
          <p className="hero-copy">
            Zephyrus is the website home for the crypto intelligence app. It brings sentiment, chart
            analysis, narrative rotation, wallet flow, yield strategy, NFT signals, and sniping alerts together.
          </p>
        </div>
        <div className="hero-card">
          <strong>Live Zeph Metrics</strong>
          <dl>
            <div>
              <dt>Sentiment</dt>
              <dd>{sentiment}</dd>
            </div>
            <div>
              <dt>Alpha score</dt>
              <dd>{score} / 100</dd>
            </div>
            <div>
              <dt>Momentum</dt>
              <dd>{momentum}</dd>
            </div>
            <div>
              <dt>Trend</dt>
              <dd>{trend}</dd>
            </div>
            <div>
              <dt>Liquidity flow</dt>
              <dd>{liquidityFlow}</dd>
            </div>
          </dl>
        </div>
      </section>

      <main>
        <section id="alpha-carrier">
          <h2>Alpha Carrier</h2>
          <p>Real-time sentiment analysis across Crypto Twitter and chart momentum through a "wind flow" framework.</p>
          <div className="grid">
            <article>
              <h3>Crypto Twitter Sentiment</h3>
              <p>Zeph interprets live narrative tone and social velocity to predict whether markets are bullish, neutral, or bearish.</p>
              <strong>{sentiment}</strong>
            </article>
            <article>
              <h3>Wind Flow Chart Analysis</h3>
              <p>Momentum, trend direction, and liquidity flows are combined into a single directional score for fast decisions.</p>
              <strong>{scoreLabel}</strong>
            </article>
            <article>
              <h3>Trend and Liquidity</h3>
              <p>Liquidity movement into pools, DEX depth, and trend slope are summarized for a 360° market read.</p>
              <strong>{liquidityFlow >= 0.75 ? 'High flow' : liquidityFlow >= 0.45 ? 'Moderate flow' : 'Low flow'}</strong>
            </article>
          </div>
        </section>

        <section id="alpha-distribution">
          <h2>Alpha Distribution</h2>
          <p>Predict narrative rotations, sector shifts, and hype cycles across the crypto ecosystem.</p>
          <div className="grid">
            <article>
              <h3>Narrative Rotation</h3>
              <p>{rotation}</p>
            </article>
            <article>
              <h3>Hype Cycle</h3>
              <p>{hype}</p>
            </article>
            <article>
              <h3>Sector Rotation</h3>
              <p>{getRandomItem(sectors)}</p>
            </article>
          </div>
        </section>

        <section id="onchain">
          <h2>On-Chain Mastery</h2>
          <p>Analyze wallets, smart contracts, and liquidity flows with god-like precision.</p>
          <div className="grid">
            <article>
              <h3>Wallet Analysis</h3>
              <p>{walletEdge}</p>
            </article>
            <article>
              <h3>Smart Contract Flow</h3>
              <p>Liquidity movement into major contracts and DEX routing reveals where alpha is being sourced.</p>
            </article>
            <article>
              <h3>DeFi Yield Optimization</h3>
              <p>{yieldSuggestion}</p>
            </article>
          </div>
        </section>

        <section id="sniping">
          <h2>Real-Time Sniping</h2>
          <p>Receive token sniping alerts from new pair launches, volume spikes, and liquidity imbalances.</p>
          <div className="alert-box">{sniperAlert}</div>
        </section>

        <section id="nft">
          <h2>NFT Trend Forecasting</h2>
          <p>Forecast NFT momentum and thematic rotations before Crypto Twitter locks in on the next wave.</p>
          <div className="alert-box">{nftForecast}</div>
        </section>

        <section id="tweets">
          <h2>Tweet Engine</h2>
          <p>High-quality 4–8 tweets/day crafted to amplify market insights and drive narrative momentum.</p>
          <button className="button" onClick={() => setTweets(generateTweets())}>Refresh Tweets</button>
          <ul className="tweet-list">
            {tweets.map((tweet, index) => (
              <li key={`${tweet}-${index}`}>{tweet}</li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>Zephyrus is your West Wind of Crypto Twitter. Built for insight, speed, and data-driven alpha.</p>
      </footer>
    </div>
  );
}

export default App;
