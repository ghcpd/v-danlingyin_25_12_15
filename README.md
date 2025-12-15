# OSWE Mini — Digital Dashboard

This project is a minimal, runnable React + TypeScript digital dashboard built to the provided `ui_requirements.ts` specification.

Tech stack
- React + TypeScript
- Vite (dev server)
- Tailwind CSS
- pnpm (package manager)

Mandatory files included
- `package.json`
- `pnpm-lock.yaml`
- `tailwind.config.ts`
- `src/main.tsx`
- `src/App.tsx`
- `src/dashboard/Dashboard.tsx`
- `src/components/KpiCard.tsx`
- `src/components/ChartPanel.tsx`
- `src/styles/index.css`
- `ui_requirements.ts` (provided)

Getting started

1. Install dependencies

```bash
pnpm install
```

2. Run the development server

```bash
pnpm dev
```

The app will be available at http://localhost:5173 by default.

UI structure
- `src/dashboard/Dashboard.tsx` — The main dashboard layout. Uses values from `ui_requirements.ts` (theme, layout, refresh interval, initial data).
- `src/components/KpiCard.tsx` — KPI card component. Displays title, formatted value and a small sparkline. Animates on value change (fade/scale).
- `src/components/ChartPanel.tsx` — Lightweight SVG line chart and area fill used for trend visualization.
- `src/styles/index.css` — Tailwind directives and small custom styles for the big-screen look.

How the implementation follows `ui_requirements.ts`
- Full-screen dashboard layout: the app uses a full-viewport dark background and header with the specified `headerHeight`.
- At least 3 KPI cards: the dashboard renders the `initialData.metrics` (3 metrics) using `KpiCard`.
- At least 1 chart component: `ChartPanel` renders a line chart for the `trend` array.
- Real-time-like data refresh: the dashboard reads `dashboardConfig.refreshIntervalMs` and runs a simulation interval that updates metrics, trend and `updatedAt`.
- UI rules honored: dark background, animated KPI value changes, line chart type. The project does not use static screenshots or mock images.

How data refresh works
- The dashboard initializes state from `initialData` in `ui_requirements.ts`.
- A timer runs at the interval specified by `dashboardConfig.refreshIntervalMs` (3,000ms by default) and calls a simulation routine:
  - Each metric value is adjusted slightly (a small random percent change).
  - The trend array shifts and a new noisy point is appended to simulate evolving data.
  - `updatedAt` is set to the current timestamp.
- KPI cards detect value changes and run a brief scale/color animation to surface updates.

Developer notes
- Tailwind config is provided as `tailwind.config.ts`. A small `tailwind.config.cjs` helper is included to enable runtime loading of the TypeScript config via `ts-node`.
- No external chart library is used; charts are implemented with plain SVG to keep the project small and dependency-free.

Screenshot placeholder

> Add screenshots here after running the app. Example suggestions:

- `screenshot-dashboard.png` — Full viewport showing KPI cards and charts
- `screenshot-kpi.png` — Close-up of one KPI card with animation

License
MIT
