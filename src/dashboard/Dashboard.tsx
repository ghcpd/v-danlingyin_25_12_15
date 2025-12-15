import React, { useEffect, useState, useRef } from 'react'
import { dashboardConfig, initialData, uiRules } from '../../ui_requirements'
import KpiCard from '../components/KpiCard'
import ChartPanel from '../components/ChartPanel'
import type { DashboardData } from '../../ui_requirements'

const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>(initialData)

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newUpdatedAt = new Date().toISOString()
        const newMetrics = prev.metrics.map(m => {
          const change = (Math.random() - 0.5) * 0.1 * m.value // up to 10% change
          let newVal = m.value + change
          if (m.unit === '%') {
            newVal = Math.max(0, Math.min(100, parseFloat(newVal.toFixed(1))))
          } else {
            newVal = Math.round(newVal)
          }
          return { ...m, value: newVal }
        })
        const newTrend = [...prev.trend]
        const last = newTrend[newTrend.length - 1] || 0
        const next = Math.max(0, Math.round(last + (Math.random() - 0.5) * 5))
        newTrend.push(next)
        if (newTrend.length > 20) newTrend.shift()

        return { updatedAt: newUpdatedAt, metrics: newMetrics, trend: newTrend }
      })
    }, dashboardConfig.refreshIntervalMs)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`${uiRules.mustUseDarkBackground ? 'bg-gray-900' : 'bg-white'} h-full`}>
      <header className="h-[64px] flex items-center px-6 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">Digital Dashboard</h1>
        <div className="ml-auto text-sm text-gray-400">
          Updated at: {new Date(data.updatedAt).toLocaleTimeString()}
        </div>
      </header>
      <main className="p-6 grid gap-6" style={{ gridTemplateColumns: `repeat(${dashboardConfig.layout.columns}, minmax(0, 1fr))` }}>
        {data.metrics.map(m => (
          <KpiCard key={m.id} metric={m} animate={uiRules.mustAnimateValueChange} />
        ))}
        <div className="col-span-3 md:col-span-3 lg:col-span-3">
          <ChartPanel trend={data.trend} />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
