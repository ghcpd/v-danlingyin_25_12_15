# Digital Dashboard (React + TypeScript + Tailwind)

A small, full-screen digital dashboard built with React, TypeScript, Vite and Tailwind CSS. The UI follows the specification in `ui_requirements.ts` and simulates real-time data updates.

## Features
- Full-screen dark dashboard layout
- 3 KPI cards (Total Orders, Revenue, Conversion Rate)
- Line chart showing a rolling trend
- Real-time-like refresh simulation using configured interval from `ui_requirements.ts`
- Smooth numeric animations and simple visual indicators for KPI changes

## Tech Stack
- React 18 + TypeScript
- Tailwind CSS
- Vite + pnpm

## Installation

1. Install dependencies (requires pnpm):

```bash
pnpm install
```

2. Run development server:

```bash
pnpm dev
```

Open http://localhost:5173/ (Vite default) if it does not open automatically.

## Project structure
- `src/main.tsx` - entry point
- `src/App.tsx` - root application wrapper
- `src/dashboard/Dashboard.tsx` - layout + data refresh logic
- `src/components/KpiCard.tsx` - KPI card with animated value changes
- `src/components/ChartPanel.tsx` - lightweight SVG-based line chart
- `src/styles/index.css` - Tailwind layers and small global styles
- `ui_requirements.ts` - business requirements & initial data (single source of truth)

## How data refresh works
The app reads `dashboardConfig.refreshIntervalMs` from `ui_requirements.ts` and uses a setInterval to mutate the dataset at that interval. On each tick:
- Each KPI receives a small randomized delta to mimic live changes
- Trend data shifts and adds a new point
- `updatedAt` is updated with the current timestamp

KPI numeric changes are animated using a requestAnimationFrame-based interpolator to provide a smooth transition between values.

## UI structure explanation
- Header: title and last updated timestamp (height controlled by `dashboardConfig.layout.headerHeight`)
- KPI section: a 3-column grid (controlled by `dashboardConfig.layout.columns`) with cards showing metrics
- Chart section: a single large panel rendering the trend as a line + area fill

## Screenshot placeholder
(Insert screenshots here when available)


---

This project strictly follows the constraints in `ui_requirements.ts` and avoids using static images as components. It uses Tailwind utility classes for styling and keeps the UI responsive and functional.
