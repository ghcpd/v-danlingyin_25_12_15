import React from 'react'

export type KpiMetric = {
  id: string
  title: string
  unit: string
  value: number
}

type KpiCardProps = {
  metric: KpiMetric
  isAnimating: boolean
}

export const KpiCard: React.FC<KpiCardProps> = ({ metric, isAnimating }) => {
  const formattedValue = metric.value.toLocaleString()

  return (
    <div className="metric-card">
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
          {metric.title}
        </h3>
      </div>
      <div className="flex items-baseline gap-2">
        <div
          className={`metric-value text-4xl font-bold text-white ${
            isAnimating ? 'animating' : ''
          }`}
        >
          {metric.unit && <span className="text-2xl mr-1">{metric.unit}</span>}
          {formattedValue}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        <div className="h-1 flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full opacity-60"></div>
        <span className="text-xs text-gray-500">Active</span>
      </div>
    </div>
  )
}
