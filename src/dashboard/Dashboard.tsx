import React, { useEffect, useMemo, useState } from 'react'
import { initialData, dashboardConfig, uiRules, KpiMetric, DashboardData } from '../../ui_requirements'
import KpiCard from '../components/KpiCard'
import ChartPanel from '../components/ChartPanel'

const { layout, refreshIntervalMs } = dashboardConfig

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>(initialData)
  const [tick, setTick] = useState(0)

  // Derived layout styles
  const columns = layout?.columns ?? 3

  // Simulate real-time data updates using refreshIntervalMs
  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => simulateUpdate(prev))
      setTick((t) => t + 1)
    }, refreshIntervalMs ?? 3000)

    return () => clearInterval(interval)
  }, [])

  // Simulate an update of metrics and trend
  function simulateUpdate(prev: DashboardData): DashboardData {
    const newMetrics: KpiMetric[] = prev.metrics.map((m) => {
      const changeFactor = randomBetween(-0.03, 0.06) // -3% .. +6%
      let newValue = m.value

      if (m.unit === '$') {
        newValue = Math.round(m.value * (1 + changeFactor))
      } else if (m.unit === '%') {
        // Keep one decimal place
        const delta = +(m.value * changeFactor).toFixed(2)
        newValue = Math.max(0, Math.round((m.value + delta) * 10) / 10)
      } else {
        // generic numeric metric
        newValue = Math.max(0, Math.round(m.value * (1 + changeFactor)))
      }

      return { ...m, value: newValue }
    })

    // trend: shift and add a new point based on last trend value
    const last = prev.trend[prev.trend.length - 1] ?? 10
    const noise = Math.round(randomBetween(-3, 6))
    const newPoint = Math.max(0, last + noise)
    const newTrend = prev.trend.slice(1).concat(newPoint)

    return {
      ...prev,
      metrics: newMetrics,
      trend: newTrend,
      updatedAt: new Date().toISOString()
    }
  }

  function randomBetween(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  const updatedAt = useMemo(() => new Date(data.updatedAt).toLocaleString(), [data.updatedAt])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header
        className="flex items-center justify-between px-8"
        style={{ height: layout?.headerHeight ?? 64 }}
      >
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-accent" />
          <h1 className="text-2xl font-semibold tracking-tight">Digital Dashboard</h1>
          <span className="ml-4 px-2 py-1 text-xs rounded bg-white/5 text-slate-200">{uiRules.chartType.toUpperCase()}</span>
        </div>
        <div className="text-sm text-slate-300">
          <div>Updated: <span className="font-medium text-slate-100">{updatedAt}</span></div>
          <div className="text-xs text-slate-400">Theme: {dashboardConfig.theme} • Columns: {columns}</div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* KPI Cards area: span columns depending on layout */}
          <section className="col-span-1 xl:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {data.metrics.map((m) => (
              <KpiCard key={m.id} metric={m} animateOnChange={uiRules.mustAnimateValueChange} />
            ))}
          </section>

          {/* Chart Panel */}
          <section className="col-span-1 xl:col-span-1">
            <ChartPanel trend={data.trend} title="7-day trend" chartType={uiRules.chartType} ticks={6} key={tick} />
          </section>
        </div>

        {/* Large chart / overview panel */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-lg bg-[rgba(255,255,255,0.03)] shadow-panel">
            <h2 className="text-sm text-slate-300 mb-4">Overview</h2>
            <div className="w-full h-56">
              <ChartPanel trend={data.trend} title="Activity" chartType={uiRules.chartType} ticks={8} />
            </div>
          </div>

          <aside className="p-6 rounded-lg bg-[rgba(255,255,255,0.02)] shadow-panel">
            <h3 className="text-sm text-slate-300">Snapshot</h3>
            <ul className="mt-4 space-y-3 text-slate-200">
              {data.metrics.map((m) => (
                <li key={m.id} className="flex items-baseline justify-between">
                  <div className="text-sm text-slate-400">{m.title}</div>
                  <div className="font-medium">
                    {m.unit}
                    {m.value}
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 text-xs text-slate-400">Data is simulated using refresh interval of {refreshIntervalMs}ms.</div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
