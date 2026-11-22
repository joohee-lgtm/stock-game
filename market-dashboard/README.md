# Market Dashboard (Next.js)

This is an independent Next.js application inside the existing stock-game repository. The original Vite game and its Cloudflare Workers deployment are unchanged.

## Run

```bash
cd market-dashboard
npm install
npm run dev
```

Visit http://localhost:3000. The server parses `data/kospi.csv` and `data/cnn-fear-greed.csv`, then requests NASDAQCOM CSV from FRED when `data/nasdaq.csv` is absent. If outbound FRED access is blocked, NASDAQ stays missing (no fabricated values). To provide an offline copy, add `data/nasdaq.csv` with `date,close` headers and daily NASDAQ Composite closing prices. Do not use NASDAQ-100.

Data is grouped at the last available trading date of each even-numbered month, while CNN is averaged across the month. Both stock indices are normalized to 2021-02 = 100. KOSPI source snapshot ends 2026-10-23, not the full month.

Sources: https://github.com/kuthy9/korea-market-data and https://github.com/whit3rabbit/fear-greed-data and https://fred.stlouisfed.org/series/NASDAQCOM.

## Deploy

Deploy `market-dashboard` as a separate Next.js Node.js service (for example Vercel with Root Directory `market-dashboard`). The existing Cloudflare Workers static Vite deployment does not run a Next.js Node server.
