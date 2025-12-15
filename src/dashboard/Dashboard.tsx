import React, { useEffect, useMemo, useState } from 'react'
import { dashboardConfig, initialData, KpiMetric, DashboardData } from '../../ui_requirements'
import KpiCard from '../components/KpiCard'
import ChartPanel from '../components/ChartPanel'

const { refreshIntervalMs, layout } = dashboardConfig

function randomDelta(value: number) {
  // small random change that's plausible
  const magnitude = Math.max(1, Math.abs(value) * 0.03)
  const change = (Math.random() - 0.5) * magnitude
  return Math.round(change * 100) / 100
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        // update metrics
        const metrics = prev.metrics.map(m => {
          const delta = randomDelta(m.value)
          let nextValue = Math.round((m.value + delta) * 100) / 100
          // keep conversion reasonable for percentage
          if (m.id === 'conversion') nextValue = Math.max(0, Math.min(100, nextValue))
          return { ...m, value: nextValue }
        })
        // update trend - shift and add new point based on last
        const last = prev.trend[prev.trend.length - 1] ?? 10
        const nextPoint = Math.max(0, Math.round((last + (Math.random() - 0.4) * 6) * 10) / 10)
        const trend = [...prev.trend.slice(-20), nextPoint]
        return {
          updatedAt: new Date().toISOString(),
          metrics,
          trend
        }
      })
    }, refreshIntervalMs)

    return () => clearInterval(interval)
  }, [])

  const headerHeight = layout.headerHeight ?? 64

  return (
    <div className="flex flex-col h-screen">
      <header
        className="flex items-center justify-between px-6"
        style={{ height: headerHeight }}
      >
        <div>
          <h1 className="text-2xl font-semibold">Digital Dashboard</h1>
          <p className="text-sm text-slate-400">Real-time KPI & trend overview</p>
        </div>

        <div className="text-right">
          <div className="text-xs text-slate-400">Last updated</div>
          <div className="text-sm">{new Date(data.updatedAt).toLocaleString()}</div>
        </div>
      </header>

      <main className="flex-1 px-6 pb-6">
        <section
          className="grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`,
            marginTop: 8
          }}
        >
          {data.metrics.map(metric => (
            <KpiCard key={metric.id} metric={metric} />
          ))}
        </section>

        <section className="mt-6 bg-slate-800 rounded-xl p-4 shadow-lg">
          <ChartPanel trend={data.trend} />
        </section>
      </main>
    </div>
  )
}
