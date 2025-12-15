import React, { useEffect, useRef, useState } from 'react'
import type { KpiMetric } from '../../ui_requirements'

type Props = {
  metric: KpiMetric
  animateOnChange?: boolean
}

const formatValue = (m: KpiMetric) => {
  if (m.unit === '$') return `${m.unit}${m.value.toLocaleString()}`
  if (m.unit === '%') return `${m.value}%`
  return m.value.toLocaleString()
}

const KpiCard: React.FC<Props> = ({ metric, animateOnChange = true }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const prev = useRef<number>(metric.value)

  useEffect(() => {
    if (!animateOnChange) return
    if (prev.current !== metric.value) {
      setIsUpdating(true)
      const t = setTimeout(() => setIsUpdating(false), 650)
      prev.current = metric.value
      return () => clearTimeout(t)
    }
  }, [metric.value, animateOnChange])

  const valueDisplay = formatValue(metric)

  return (
    <div className="p-5 rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/4 shadow-panel">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-300">{metric.title}</div>
          <div className="mt-2 flex items-baseline gap-3">
            <div
              className={`text-2xl font-bold tracking-tight transition-transform duration-300 ${
                isUpdating ? 'transform scale-105 text-accent' : 'text-white'
              }`}
            >
              {valueDisplay}
            </div>
            <div className="text-xs text-slate-400">{metric.unit && metric.unit !== '$' ? metric.unit : ''}</div>
          </div>
        </div>

        <div className="w-16 h-12 flex items-center justify-center">
          {/* mini sparkline */}
          <Sparkline value={metric.value} />
        </div>
      </div>
    </div>
  )
}

function Sparkline({ value }: { value: number }) {
  // A deterministic but varied sparkline based on value
  const points = Array.from({ length: 8 }).map((_, i) => {
    const jitter = Math.sin((value + i) * 0.5) * 6
    return 12 + i * 6 + jitter
  })

  const w = 64
  const h = 40
  const step = w / (points.length - 1)
  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - p}`)
    .join(' ')

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path d={path} stroke="url(#g1)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default KpiCard
