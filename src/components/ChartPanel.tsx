import React, { useMemo } from 'react'

type Props = {
  trend: number[]
}

export default function ChartPanel({ trend }: Props) {
  const width = 800
  const height = 240
  const padding = 24

  const points = useMemo(() => {
    const max = Math.max(...trend, 1)
    const min = Math.min(...trend, 0)
    const range = max - min || 1
    return trend.map((v, i) => {
      const x = padding + (i / Math.max(1, trend.length - 1)) * (width - padding * 2)
      const y = padding + (1 - (v - min) / range) * (height - padding * 2)
      return { x, y, v }
    })
  }, [trend])

  const pathD = useMemo(() => {
    if (points.length === 0) return ''
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  }, [points])

  const areaD = useMemo(() => {
    if (points.length === 0) return ''
    const top = pathD
    const last = points[points.length - 1]
    const first = points[0]
    return `${top} L ${last.x} ${height - padding} L ${first.x} ${height - padding} Z`
  }, [pathD, points])

  const max = Math.max(...trend, 1)
  const min = Math.min(...trend, 0)

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm text-slate-400">Trend</div>
          <div className="text-lg font-semibold">Last {trend.length} points</div>
        </div>
        <div className="text-right text-sm text-slate-400">
          <div>Min: {min}</div>
          <div>Max: {max}</div>
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="240" preserveAspectRatio="none">
          <defs>
            <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* area */}
          <path d={areaD} fill="url(#grad)" opacity={0.6} />

          {/* line */}
          <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

          {/* points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={3} fill="#7c3aed" />
          ))}

          {/* x grid lines */}
          {points.map((p, i) => (
            <line key={`g${i}`} x1={p.x} x2={p.x} y1={padding} y2={height - padding} stroke="rgba(255,255,255,0.03)" />
          ))}
        </svg>
      </div>
    </div>
  )
}
