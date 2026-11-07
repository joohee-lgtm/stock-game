# Stock Survival

Mobile stock survival game: $100 starting balance, LONG/SHORT, 1×/2×/3×/5× leverage, 25%/50%/100% stake, and 10 rounds.

## Local development

```bash
npm install
npm run dev
```

## Cloudflare Pages

Connect `joohee-lgtm/stock-game`. Production branch: `master`. Build command: `npm run build`. Output directory: `dist`.

## Historical data

The included default dataset is synthetic, not actual stock market data. Import one or more CSV files containing `Date,Close` with at least 11 trading days. Each file represents a company. No automatic market data API is connected.

Educational simulation: margin loss capped at 100%; no transaction fees, financing charges or intraday liquidation.
