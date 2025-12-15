import React, { useMemo } from 'react'

type Props = {
  trend: number[]
  title?: string
  chartType?: string
  ticks?: number
}

const ChartPanel: React.FC<Props> = ({ trend, title, chartType = 'line', ticks = 5 }) => {
  const width = 600
  const height = 240

  const padding = { t: 12, r: 12, b: 28, l: 36 }

  const data = trend || [0]

  const min = Math.min(...data)
  const max = Math.max(...data)

  const points = useMemo(() => {
    const w = width - padding.l - padding.r
    const h = height - padding.t - padding.b
    return data.map((d, i) => {
      const x = padding.l + (i / Math.max(1, data.length - 1)) * w
      const y = padding.t + h - ((d - min) / Math.max(1, max - min || 1)) * h
      return [x, y]
    })
  }, [data, min, max])

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

  const areaPath = (() => {
    if (points.length === 0) return ''
    const first = points[0]
    const last = points[points.length - 1]
    return `M ${first[0]} ${height - padding.b} L ${path.slice(2)} L ${last[0]} ${height - padding.b} Z`
  })()

  // Y axis ticks
  const yTicks = Array.from({ length: ticks }).map((_, i) => {
    const v = min + ((ticks - 1 - i) / Math.max(1, ticks - 1)) * (max - min)
    const y = padding.t + ((ticks - 1 - i) / Math.max(1, ticks - 1)) * (height - padding.t - padding.b)
    return { v: Math.round(v), y }
  })

  return (
    <div className="w-full h-full rounded-lg p-4 bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-[rgba(255,255,255,0.01)]">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-sm text-slate-300">{title}</div>
          <div className="text-xs text-slate-400">{chartType.toUpperCase()}</div>
        </div>
        <div className="text-xs text-slate-400">Last: {data[data.length - 1]}</div>
      </div>

      <div className="mt-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48">
          <defs>
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#4fd1c5" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="lineGrad" x1="0" x2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
          </defs>

          {/* Y grid and ticks */}
          {yTicks.map((t, i) => (
            <g key={i}>
              <line x1={padding.l} x2={width - padding.r} y1={t.y} y2={t.y} stroke="rgba(255,255,255,0.03)" />
              <text x={8} y={t.y + 4} fontSize={11} fill="#94a3b8">
                {t.v}
              </text>
            </g>
          ))}

          {/* area */}
          <path d={areaPath} fill="url(#areaGrad)" />

          {/* line */}
          <path
            d={path}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'stroke-dashoffset 600ms ease, opacity 300ms ease' }}
          />

          {/* points */}
          {points.map((p, i) => (
            <circle key={i} cx={p[0]} cy={p[1]} r={i === points.length - 1 ? 3.6 : 2.2} fill="#10b981" opacity={i === points.length - 1 ? 1 : 0.9} />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default ChartPanel
