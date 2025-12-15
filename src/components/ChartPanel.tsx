import React, { useMemo } from 'react'

function pointsFromData(data: number[], width: number, height: number, padding = 8) {
  if (!data.length) return ''
  const max = Math.max(...data)
  const min = Math.min(...data)
  const span = Math.max(1, max - min)
  const step = (width - padding * 2) / Math.max(1, data.length - 1)
  return data.map((v, i) => {
    const x = padding + i * step
    const y = height - padding - ((v - min) / span) * (height - padding * 2)
    return `${x},${y}`
  }).join(' ')
}

export default function ChartPanel({ data }: { data: number[] }) {
  const width = 740
  const height = 300

  const points = useMemo(() => pointsFromData(data, width, height), [data])

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="300" className="rounded-md">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* area fill: approximate using polygon */}
        <polyline
          fill="url(#g1)"
          stroke="none"
          points={`${points} ${width - 8},${height - 8} 8,${height - 8}`}
        />

        <polyline
          fill="none"
          stroke="#06b6d4"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
        />

        {/* dots */}
        {data.map((v, i) => {
          const parts = points.split(' ')
          const [x, y] = parts[i]?.split(',').map(Number) ?? [0, 0]
          return <circle key={i} cx={x} cy={y} r={3} fill="#06b6d4" />
        })}

      </svg>
    </div>
  )
}
