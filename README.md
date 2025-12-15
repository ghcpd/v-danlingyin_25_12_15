# Digital Dashboard

A small React + TypeScript dashboard built with **Vite**, **Tailwind CSS** and **Recharts**.

## 📦 Project setup (pnpm)

```bash
# install dependencies
pnpm install

# start dev server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The dev server supports hot-reload.

## 🔧 UI structure (as per `ui_requirements.ts`)

- **Full-screen layout** — The app renders a full-screen dashboard with a dark background and a fixed header (`headerHeight: 64`).
- **Three KPI cards** — `KpiCard` components show the metric title, unit and value.
- **Chart** — A line chart rendered by Recharts (`chartType: "line"`) that shows a simple trend.
- **Real-time refresh simulation** — The dashboard updates every `refreshIntervalMs` (3000ms) and updates metric values and the trend timeline. When values change, they animate (per `mustAnimateValueChange`).

## 📊 How data refresh works

`Dashboard` component uses a `setInterval` every `dashboardConfig.refreshIntervalMs` to simulate live updates:

- Metrics: each metric value changes by up to ±10% each interval.
- Trend: new random data points are appended to a rolling series (max 20 points).

In a real app, this could be replaced with a WebSocket or polling to a backend.

## 🖼️ Screenshot

> Replace this block with an actual screenshot of the running app.

```
[Insert screenshot here]
```

## 🔎 Files included

- `src/main.tsx` — app entry point
- `src/App.tsx` — top-level layout
- `src/dashboard/Dashboard.tsx` — dashboard
- `src/components/KpiCard.tsx` — KPI card
- `src/components/ChartPanel.tsx` — chart
- `src/styles/index.css` — Tailwind CSS imports

The project must run in a browser on `pnpm dev`.
