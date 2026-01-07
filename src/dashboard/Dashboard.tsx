import React, { useState, useEffect } from 'react'
import { KpiCard } from '../components/KpiCard'
import { ChartPanel } from '../components/ChartPanel'
import { dashboardConfig, initialData } from '../../ui_requirements'
import type { KpiMetric, DashboardData } from '../../ui_requirements'

type AnimatingMetrics = {
  [key: string]: boolean
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData>(initialData)
  const [animatingMetrics, setAnimatingMetrics] = useState<AnimatingMetrics>({})

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => ({
        ...prevData,
        updatedAt: new Date().toISOString(),
        metrics: prevData.metrics.map((metric) => ({
          ...metric,
          value: metric.value + Math.floor(Math.random() * 100) - 25,
        })),
        trend: [
          ...prevData.trend.slice(1),
          prevData.trend[prevData.trend.length - 1] + Math.floor(Math.random() * 10) - 3,
        ],
      }))

      setAnimatingMetrics({
        orders: true,
        revenue: true,
        conversion: true,
      })

      setTimeout(() => {
        setAnimatingMetrics({})
      }, 600)
    }, dashboardConfig.refreshIntervalMs)

    return () => clearInterval(interval)
  }, [])

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
  }

  return (
    <div
      className="w-screen h-screen bg-dark-900 overflow-hidden flex flex-col"
      style={{
        backgroundImage:
          'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.05) 0%, transparent 50%)',
      }}
    >
      {/* Header */}
      <header
        className="border-b border-gray-700 bg-dark-800 bg-opacity-80 backdrop-blur-sm flex items-center justify-between px-8 flex-shrink-0"
        style={{ height: `${dashboardConfig.layout.headerHeight}px` }}
      >
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-bold text-white">Digital Dashboard</h1>
        </div>
        <div className="text-sm text-gray-400">
          Last updated: <span className="font-mono text-gray-300">{formatDate(data.updatedAt)}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* KPI Cards Grid */}
          <div className="dashboard-grid">
            {data.metrics.map((metric: KpiMetric) => (
              <KpiCard
                key={metric.id}
                metric={metric}
                isAnimating={animatingMetrics[metric.id] || false}
              />
            ))}
          </div>

          {/* Chart Panel */}
          <ChartPanel trendData={data.trend} />

          {/* Footer Info */}
          <div className="border-t border-gray-700 pt-4">
            <p className="text-xs text-gray-500">
              Dashboard auto-refreshes every {dashboardConfig.refreshIntervalMs}ms. Theme: {dashboardConfig.theme.toUpperCase()}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
