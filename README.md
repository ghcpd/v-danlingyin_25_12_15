# Digital Dashboard

A full-screen, real-time digital dashboard built with React, TypeScript, and Tailwind CSS. This project demonstrates modern frontend architecture with data visualization, animated KPI cards, and a responsive layout optimized for large screens.

## 📋 Features

- **Full-screen Dashboard Layout**: Immersive dark-themed UI optimized for monitoring and display
- **Real-time Data Simulation**: Auto-refreshing metrics every 3 seconds
- **3 KPI Metric Cards**:
  - Total Orders
  - Revenue
  - Conversion Rate
- **Animated Value Changes**: Smooth count-up animations when values update
- **Interactive Line Chart**: Canvas-based trend visualization with gradient fill
- **Live Clock**: Real-time display with date and timestamp

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **pnpm** - Fast, disk-efficient package manager

## 📦 Installation

### Prerequisites

- Node.js 16+ 
- pnpm (if not installed: `npm install -g pnpm`)

### Steps

1. Install dependencies:
```bash
pnpm install
```

2. Run the development server:
```bash
pnpm dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
grok-fast/
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── pnpm-lock.yaml            # Lock file for reproducible installs
├── tsconfig.json             # TypeScript configuration
├── tsconfig.node.json        # TypeScript config for Node scripts
├── vite.config.ts            # Vite build configuration
├── tailwind.config.ts        # Tailwind CSS theme customization
├── postcss.config.js         # PostCSS plugins (Tailwind)
├── ui_requirements.ts        # Business requirements & data schema
├── src/
│   ├── main.tsx              # Application entry point
│   ├── App.tsx               # Root component
│   ├── styles/
│   │   └── index.css         # Global styles & Tailwind directives
│   ├── dashboard/
│   │   └── Dashboard.tsx     # Main dashboard container
│   └── components/
│       ├── KpiCard.tsx       # Metric card component
│       └── ChartPanel.tsx    # Line chart visualization
└── README.md
```

## 🎨 UI Structure

### Layout

The dashboard uses a responsive grid layout with:
- **Header**: 64px height with title and live clock
- **KPI Cards Grid**: 3 columns displaying key metrics
- **Chart Panel**: Full-width trend visualization
- **Footer**: Status indicator with refresh info

### Component Breakdown

#### `Dashboard.tsx`
- Main container managing state and data refresh logic
- Uses `setInterval` to simulate real-time data updates every 3000ms
- Maintains current and previous metric values for change detection
- Implements full-screen layout with header, grid, chart, and footer

#### `KpiCard.tsx`
- Displays individual KPI metrics (orders, revenue, conversion)
- Animates value changes with `animate-count-up` effect
- Shows directional indicators (↑/↓) when values change
- Gradient accent bar for visual polish

#### `ChartPanel.tsx`
- Canvas-based line chart with responsive sizing
- Renders trend data with gradient fill and grid lines
- Plots data points with animated transitions
- Y-axis labels showing value scale

## 🔄 Data Refresh Mechanism

The dashboard simulates live data using React's `useEffect` and `setInterval`:

1. **Initial State**: Loaded from `ui_requirements.ts` (initialData)
2. **Refresh Interval**: 3000ms (configurable via `dashboardConfig.refreshIntervalMs`)
3. **Update Logic**:
   - Orders: Random increment/decrement by ±20-100
   - Revenue: Random change by ±1000-5000
   - Conversion: Small percentage adjustment ±0.5%
   - Trend: Rolling 7-day window, adds new value and removes oldest
4. **Animation**: Previous values tracked to trigger count-up animations

## 🎯 Key Implementation Details

### Tailwind Customization

The `tailwind.config.ts` includes:
- Custom color palette for dashboard theme
- Animation keyframes for fade-in and count-up effects
- Utility classes for glows and shadows

### TypeScript Types

All data structures defined in `ui_requirements.ts`:
- `KpiMetric`: Individual metric shape
- `DashboardData`: Complete dashboard state
- `dashboardConfig`: Layout and behavior settings

### Responsive Design

- Full viewport coverage (`w-screen h-screen`)
- Overflow hidden for immersive experience
- Grid layout adapts to configured column count

## 📸 Screenshots

> **Note**: Run the application to see the live dashboard in action. The UI features:
> - Dark gradient background (#0a0e1a)
> - Blue/cyan accent colors
> - Animated metric cards with glow effects
> - Smooth line chart with gradient fill
> - Live updating clock and data refresh indicator

## 🚀 Build for Production

```bash
pnpm build
```

This generates optimized static files in the `dist/` directory.

Preview the production build:
```bash
pnpm preview
```

## 📝 Configuration

Edit `ui_requirements.ts` to customize:
- Refresh interval (`refreshIntervalMs`)
- Initial metric values
- Layout columns
- Theme settings

## 🧪 Development Notes

- Hot Module Replacement (HMR) enabled for fast development
- Strict TypeScript mode for type safety
- CSS utilities via Tailwind for maintainable styling
- No external component libraries - all UI built from scratch

## 📄 License

This project is a demonstration/test case for UI engineering evaluation.

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
