Mini Prime Dashboard

A minimal React + TypeScript + Tailwind dashboard built to the UI test requirements.

Installation

- Install using pnpm:

```bash
pnpm install
```

Run

```bash
pnpm dev
```

The app will be served by Vite (default port 5173).

UI structure

- `src/App.tsx` — Root wrapper and dark background.
- `src/dashboard/Dashboard.tsx` — Main dashboard layout. Uses `dashboardConfig` from `ui_requirements.ts`.
- `src/components/KpiCard.tsx` — KPI card (three cards displayed). Values animate briefly on change.
- `src/components/ChartPanel.tsx` — Line chart (SVG) visualizing `trend` data.
- `src/styles/index.css` — Tailwind entrypoint and base styles.

How data refresh works

- The refresh interval is read from `dashboardConfig.refreshIntervalMs` in `ui_requirements.ts`.
- `Dashboard` uses `setInterval` to update KPI numbers and append a new trend point every tick, emulating a real-time feed.
- Values are updated in-place and KPI cards show a short animation when the value changes.

Screenshot placeholder

_Add screenshots here after running the app and taking screenshots._

Notes

- The UI uses a dark background as required and a full-screen layout.
- No static screenshots are used — all components are rendered.
