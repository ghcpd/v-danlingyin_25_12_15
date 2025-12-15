import React, { useEffect, useRef, useState } from 'react'
import type { KpiMetric } from '../../ui_requirements'

export default function KpiCard({ metric }: { metric: KpiMetric }) {
  const { title, value, unit } = metric
  const [prev, setPrev] = useState<number>(value)
  const [pop, setPop] = useState(false)
  const prevRef = useRef<number>(value)

  useEffect(() => {
    if (prevRef.current !== value) {
      setPop(true)
      const t = setTimeout(() => setPop(false), 420)
      setPrev(prevRef.current)
      prevRef.current = value
      return () => clearTimeout(t)
    }
  }, [value])

  const delta = value - prev
  const deltaStr = delta === 0 ? '0' : `${delta > 0 ? '+' : ''}${delta}`

  return (
    <div className="bg-slate-800 rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div className="text-slate-400 text-sm">{title}</div>
        <div className="text-xs text-slate-500">Live</div>
      </div>

      <div className="flex items-baseline gap-3">
        <div
          className={`text-2xl font-semibold tracking-tight transition-transform ${pop ? 'animate-value-pop' : ''}`}
          aria-live="polite"
        >
          {unit}{typeof value === 'number' ? (Number.isInteger(value) ? value.toLocaleString() : value.toFixed(2)) : value}
        </div>
        <div className={`text-sm ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{deltaStr}</div>
      </div>

      <div className="h-2 bg-slate-700 rounded-full overflow-hidden mt-2">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-blue-500"
          style={{ width: `${Math.min(100, Math.abs(value) % 100)}%` }}
        />
      </div>
    </div>
  )
}
