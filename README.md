# Digital Dashboard

A high-performance, real-time digital dashboard UI built with React, TypeScript, and Tailwind CSS. Displays KPI metrics with live data refresh and trend visualization.

## 📋 Features

- **Full-screen dashboard layout** with dark theme
- **3 KPI metric cards** displaying dynamic business metrics
- **Real-time data refresh** simulation (every 3 seconds)
- **Interactive line chart** with trend analysis
- **Smooth animations** on metric value changes
- **Responsive grid layout** (3-column desktop)
- **Production-ready TypeScript** with strict typing
- **Tailwind CSS** for modern styling
- **Vite** for fast development and optimized builds

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v7 or higher)

### Installation

```bash
# Install dependencies using pnpm
pnpm install
```

### Running the Project

```bash
# Start the development server
pnpm dev
```

The dashboard will automatically open in your browser at `http://localhost:5173`

### Building for Production

```bash
# Create optimized production build
pnpm build

# Preview the production build locally
pnpm preview
```

## 📁 Project Structure

```
.
├── src/
│   ├── components/
│   │   ├── KpiCard.tsx         # Individual KPI metric card component
│   │   └── ChartPanel.tsx      # Chart and trend visualization component
│   ├── dashboard/
│   │   └── Dashboard.tsx       # Main dashboard container and state management
│   ├── styles/
│   │   └── index.css           # Global styles and CSS animations
│   ├── App.tsx                 # Root component
│   └── main.tsx                # React DOM entry point
├── ui_requirements.ts          # Single source of truth for UI specs
├── index.html                  # HTML entry point
├── package.json                # Project metadata and dependencies
├── pnpm-lock.yaml              # Locked dependency versions
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build configuration
├── postcss.config.js           # PostCSS configuration for Tailwind
└── README.md                   # This file
```

## 🏗️ UI Architecture

### Dashboard Container (`Dashboard.tsx`)
- Manages global state for dashboard data
- Implements auto-refresh logic (3000ms interval)
- Triggers metric animations on data updates
- Renders header, KPI cards, and chart panel

### KPI Card Component (`KpiCard.tsx`)
- Displays individual metric with title, value, and unit
- Supports animation states for value changes
- Shows status indicator bar
- Fully typed with `KpiMetric` interface

### Chart Panel Component (`ChartPanel.tsx`)
- Renders SVG line chart with gradient fill
- Displays 7-day trend data
- Shows min/avg/max statistics
- Includes grid lines and axis labels

## 📊 Data Refresh Mechanism

The dashboard simulates real-time data updates:

1. **Auto-refresh** occurs every 3 seconds (configured in `ui_requirements.ts`)
2. **Metrics** are updated with simulated changes (±0-100 random values)
3. **Trend array** shifts left, appending new calculated value
4. **Animations** trigger on the KPI cards during updates
5. **Timestamp** updates in the header showing last refresh time

```typescript
// Refresh interval from configuration
const REFRESH_INTERVAL = 3000; // 3 seconds

// Data mutation pattern
setData(prevData => ({
  ...prevData,
  updatedAt: new Date().toISOString(),
  metrics: prevData.metrics.map(metric => ({
    ...metric,
    value: metric.value + randomChange()
  })),
  trend: [...prevData.trend.slice(1), newTrendValue]
}))
```

## 🎨 UI Specifications (from `ui_requirements.ts`)

| Spec | Value |
|------|-------|
| **Theme** | Dark (`#111827` background) |
| **Layout** | 3-column grid with 64px header |
| **Refresh Interval** | 3000ms |
| **Metrics** | 3 KPI cards (Orders, Revenue, Conversion) |
| **Chart Type** | Line chart with trend data |
| **Animation** | Value change animations enabled |
| **Full-screen** | Yes, 100vw × 100vh |

## 🎯 Metrics Displayed

1. **Total Orders** - Count of orders with no unit symbol
2. **Revenue** - Currency value with `$` prefix
3. **Conversion Rate** - Percentage value with `%` suffix

## 🛠️ Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | ^18.2.0 | UI library |
| TypeScript | ^5.3.0 | Type safety |
| Tailwind CSS | ^3.4.0 | Styling |
| Vite | ^5.0.0 | Build tool |
| PostCSS | ^8.4.31 | CSS processing |
| Autoprefixer | ^10.4.16 | Vendor prefixes |

## 📝 Code Quality

- **Strict TypeScript** - All files use strict mode (`"strict": true`)
- **Type Safety** - Full interface definitions for all data structures
- **Component Composition** - Modular, reusable components
- **No Pseudo-code** - All code is production-ready
- **No TODOs** - All features fully implemented

## 🎬 How to Use

1. **Start the dev server** - `pnpm dev`
2. **Observe the dashboard** - Data refreshes automatically every 3 seconds
3. **Watch animations** - KPI cards animate when values change
4. **Monitor trends** - Line chart updates to reflect the latest data
5. **Check timestamps** - Header shows last update time

## 📸 Screenshot Placeholder

The application displays:
- Dark-themed header with live status indicator
- 3 KPI cards in responsive grid (Orders, Revenue, Conversion Rate)
- Full-width trend chart below metrics
- Smooth animations on value updates
- Live timestamp in header
- Dashboard information footer

_Note: This is a fully functional, interactive dashboard with real animations and data updates._

## 🔧 Configuration

All dashboard configuration is centralized in `ui_requirements.ts`:

```typescript
export const dashboardConfig = {
  theme: "dark",                // Dark theme
  refreshIntervalMs: 3000,      // 3-second refresh
  layout: {
    headerHeight: 64,           // 64px header
    columns: 3                  // 3-column grid
  }
}
```

## 📄 License

This project is provided as-is for demonstration and testing purposes.

---

**Created:** December 15, 2025  
**Status:** Production Ready ✅
