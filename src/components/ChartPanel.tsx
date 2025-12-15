import React, { useMemo } from 'react'

type ChartPanelProps = {
  trendData: number[]
}

export const ChartPanel: React.FC<ChartPanelProps> = ({ trendData }) => {
  const { maxValue, points, width, height } = useMemo(() => {
    const max = Math.max(...trendData)
    const chartWidth = 800
    const chartHeight = 250
    const padding = 40

    const points = trendData.map((value, index) => {
      const x = padding + (index / (trendData.length - 1)) * (chartWidth - padding * 2)
      const y = chartHeight - padding - (value / max) * (chartHeight - padding * 2)
      return { x, y, value }
    })

    return {
      maxValue: max,
      points,
      width: chartWidth,
      height: chartHeight,
    }
  }, [trendData])

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')

  const gradientId = `gradient-${Date.now()}`

  return (
    <div className="chart-panel">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Trend Analysis</h2>
        <p className="text-sm text-gray-400">7-day performance metric</p>
      </div>

      <div className="flex justify-center overflow-x-auto">
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(34, 197, 94, 0.5)" />
              <stop offset="100%" stopColor="rgba(34, 197, 94, 0.05)" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map((i) => {
            const y = 40 + (i / 4) * (height - 80)
            return (
              <line
                key={`grid-${i}`}
                x1="40"
                y1={y}
                x2={width - 40}
                y2={y}
                stroke="rgba(107, 114, 128, 0.2)"
                strokeDasharray="4"
              />
            )
          })}

          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const value = Math.round((maxValue / 4) * (4 - i))
            const y = 40 + (i / 4) * (height - 80)
            return (
              <text
                key={`label-${i}`}
                x="30"
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="rgba(156, 163, 175, 0.8)"
              >
                {value}
              </text>
            )
          })}

          {/* X-axis */}
          <line x1="40" y1={height - 40} x2={width - 40} y2={height - 40} stroke="rgba(107, 114, 128, 0.3)" strokeWidth="2" />

          {/* Area under the curve */}
          <path
            d={`${pathD} L ${points[points.length - 1].x} ${height - 40} L 40 ${height - 40} Z`}
            fill={`url(#${gradientId})`}
          />

          {/* Line chart */}
          <path d={pathD} stroke="rgba(34, 197, 94, 0.8)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data points */}
          {points.map((point, index) => (
            <circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="rgba(34, 197, 94, 1)"
              opacity="0.9"
            />
          ))}

          {/* Day labels on x-axis */}
          {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, i) => {
            const point = points[i]
            if (!point) return null
            return (
              <text
                key={`day-${i}`}
                x={point.x}
                y={height - 20}
                textAnchor="middle"
                fontSize="12"
                fill="rgba(156, 163, 175, 0.8)"
              >
                {day}
              </text>
            )
          })}
        </svg>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Min</p>
          <p className="text-xl font-semibold text-green-400">{Math.min(...trendData)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Avg</p>
          <p className="text-xl font-semibold text-green-400">
            {Math.round(trendData.reduce((a, b) => a + b, 0) / trendData.length)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Max</p>
          <p className="text-xl font-semibold text-green-400">{Math.max(...trendData)}</p>
        </div>
      </div>
    </div>
  )
}
