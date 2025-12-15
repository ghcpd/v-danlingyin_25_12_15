import { useState, useEffect } from 'react'
import { initialData, dashboardConfig, type DashboardData, type KpiMetric } from '../../ui_requirements'
import KpiCard from '../components/KpiCard'
import ChartPanel from '../components/ChartPanel'

export default function Dashboard() {
  const [data, setData] = useState<DashboardData>(initialData)
  const [prevMetrics, setPrevMetrics] = useState<KpiMetric[]>(initialData.metrics)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        setPrevMetrics(prevData.metrics)

        const newMetrics = prevData.metrics.map((metric) => {
          let newValue = metric.value
          
          if (metric.id === 'orders') {
            newValue = metric.value + Math.floor(Math.random() * 100) - 20
          } else if (metric.id === 'revenue') {
            newValue = metric.value + Math.floor(Math.random() * 5000) - 1000
          } else if (metric.id === 'conversion') {
            newValue = Math.max(0.1, Math.min(10, metric.value + (Math.random() - 0.5) * 0.5))
            newValue = Math.round(newValue * 10) / 10
          }

          return { ...metric, value: Math.max(0, newValue) }
        })

        const newTrendValue = prevData.trend[prevData.trend.length - 1] + Math.floor(Math.random() * 10) - 3
        const newTrend = [...prevData.trend.slice(1), Math.max(0, newTrendValue)]

        return {
          updatedAt: new Date().toISOString(),
          metrics: newMetrics,
          trend: newTrend,
        }
      })
    }, dashboardConfig.refreshIntervalMs)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="w-screen h-screen bg-dashboard-dark overflow-hidden">
      <div className="flex flex-col h-full p-8 gap-6">
        <header 
          className="flex justify-between items-center border-b border-card-border pb-4"
          style={{ height: `${dashboardConfig.layout.headerHeight}px` }}
        >
          <div>
            <h1 className="text-4xl font-bold text-white text-glow">
              Digital Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {formatDate(currentTime)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-mono font-bold text-primary-cyan">
              {formatTime(currentTime)}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Last update: {new Date(data.updatedAt).toLocaleTimeString()}
            </div>
          </div>
        </header>

        <div 
          className="grid gap-6 flex-1"
          style={{ gridTemplateColumns: `repeat(${dashboardConfig.layout.columns}, 1fr)` }}
        >
          {data.metrics.map((metric, index) => (
            <KpiCard
              key={metric.id}
              metric={metric}
              prevValue={prevMetrics[index]?.value}
            />
          ))}
        </div>

        <div className="flex-1">
          <ChartPanel data={data.trend} title="Performance Trend (7 Days)" />
        </div>

        <footer className="text-center text-gray-500 text-xs border-t border-card-border pt-4">
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent-green rounded-full animate-pulse-slow"></span>
            <span>Live Data • Auto-refresh every {dashboardConfig.refreshIntervalMs / 1000}s</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
