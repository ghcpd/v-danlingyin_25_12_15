/**
 * UI REQUIREMENTS — DIGITAL DASHBOARD
 * This file is the single source of truth.
 */

export type KpiMetric = {
  id: string
  title: string
  unit: string
  value: number
}

export type DashboardData = {
  updatedAt: string
  metrics: KpiMetric[]
  trend: number[]
}

export const dashboardConfig = {
  theme: "dark",
  refreshIntervalMs: 3000,
  layout: {
    headerHeight: 64,
    columns: 3
  }
}

export const initialData: DashboardData = {
  updatedAt: "2025-01-01T00:00:00Z",
  metrics: [
    {
      id: "orders",
      title: "Total Orders",
      unit: "",
      value: 12093
    },
    {
      id: "revenue",
      title: "Revenue",
      unit: "$",
      value: 98321
    },
    {
      id: "conversion",
      title: "Conversion Rate",
      unit: "%",
      value: 2.4
    }
  ],
  trend: [10, 14, 13, 18, 21, 25, 30]
}

export const uiRules = {
  mustBeFullscreen: true,
  mustUseDarkBackground: true,
  mustAnimateValueChange: true,
  chartType: "line",
  forbidden:
    "Do not use mock screenshots or static images instead of real components"
}
