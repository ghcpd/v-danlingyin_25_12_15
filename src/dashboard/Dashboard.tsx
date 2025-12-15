import React, { useEffect, useMemo, useState } from 'react'
import { dashboardConfig, initialData, DashboardData, KpiMetric } from '../../ui_requirements'
import KpiCard from '../components/KpiCard'
import ChartPanel from '../components/ChartPanel'

const { refreshIntervalMs, layout, theme } = dashboardConfig

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString()
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(initialData)

  // Simulate real-time-like refresh at interval from config
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        // randomize KPI values slightly
        const metrics = prev.metrics.map((m) => {
          const change = (Math.random() - 0.45) * (m.value * 0.03 + 1)
          const nextValue = Math.max(0, Number((m.value + change).toFixed(m.unit === '%' ? 2 : 0)))
          return { ...m, value: nextValue }
        })

        const lastTrend = prev.trend[prev.trend.length - 1] ?? 0
        const trendDelta = Math.round((Math.random() - 0.4) * 6)
        const trend = [...prev.trend.slice(-19), Math.max(0, lastTrend + trendDelta)]

        return { updatedAt: new Date().toISOString(), metrics, trend }
      })
    }, refreshIntervalMs)

    return () => clearInterval(id)
  }, [])

  const columns = layout.columns ?? 3

  const kpiCards = useMemo(() => {
    return data.metrics.map((m: KpiMetric) => (
      <KpiCard key={m.id} metric={m} />
    ))
  }, [data.metrics])

  return (
    <div className="flex h-full flex-col">
      <header
        className="flex items-center justify-between px-6"
        style={{ height: layout.headerHeight }}
      >
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center font-bold text-black">MP</div>
          <div>
            <div className="font-semibold text-lg">Mini Prime Dashboard</div>
            <div className="text-slate-400 text-sm">Theme: {theme}</div>
          </div>
        </div>
        <div className="text-sm text-slate-400">Updated: {formatDate(data.updatedAt)}</div>
      </header>

      <main className="flex-1 px-6 py-4">
        <section
          className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6`}
        >
          {kpiCards}
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 bg-slate-800 rounded-lg p-4">
            <h3 className="text-slate-200 font-medium mb-2">Trend (Line)</h3>
            <ChartPanel data={data.trend} />
          </div>

          <div className="bg-slate-800 rounded-lg p-4 h-[240px] flex flex-col gap-3">
            <h3 className="text-slate-200 font-medium">Details</h3>
            <div className="text-slate-400 text-sm flex-1">
              - Refresh interval: {refreshIntervalMs} ms
              <br />- Last update: {formatDate(data.updatedAt)}
              <br />- Columns: {columns}
            </div>
            <div>
              <button className="bg-indigo-500 hover:bg-indigo-600 px-3 py-1 rounded text-white text-sm">Refresh Now</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
