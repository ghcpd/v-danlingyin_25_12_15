import React, { useEffect, useRef, useState } from 'react'
import type { KpiMetric } from '../../ui_requirements'

type Props = { metric: KpiMetric }

function useAnimatedNumber(target: number, ms = 600) {
  const [display, setDisplay] = useState<number>(target)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const fromRef = useRef<number>(target)

  useEffect(() => {
    const start = performance.now()
    startRef.current = start
    const from = fromRef.current
    const delta = target - from

    const step = (now: number) => {
      const t = Math.min(1, (now - startRef.current!) / ms)
      setDisplay(Number((from + delta * t).toFixed(2)))
      if (t < 1) rafRef.current = requestAnimationFrame(step)
      else {
        fromRef.current = target
      }
    }

    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(step)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, ms])

  return display
}

export default function KpiCard({ metric }: Props) {
  const animated = useAnimatedNumber(metric.value, 700)
  const prevRef = useRef<number>(metric.value)
  useEffect(() => {
    prevRef.current = metric.value
  }, [metric.value])

  const delta = metric.value - prevRef.current
  const isPositive = delta >= 0

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow-md flex flex-col justify-between h-28">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-400">{metric.title}</div>
          <div className="text-2xl font-semibold mt-1">
            {metric.unit === '$' ? (
              <span>
                <span className="mr-1">{metric.unit}</span>
                <span>{formatNumber(animated, metric.unit)}</span>
              </span>
            ) : metric.unit === '%' ? (
              <span>{formatNumber(animated, metric.unit)}</span>
            ) : (
              <span>
                <span className="mr-1">{metric.unit}</span>
                <span>{formatNumber(animated, metric.unit)}</span>
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div
            className={`text-sm font-medium px-2 py-1 rounded-md text-white ${
              isPositive ? 'bg-green-600' : 'bg-red-600'
            }`}
            aria-hidden
          >
            {isPositive ? '▲' : '▼'} {Math.abs(delta).toFixed(2)}
          </div>
          <div className="text-xs text-slate-400 mt-2">Updated</div>
        </div>
      </div>

      <div className="mt-2 h-1 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500" style={{ width: `${Math.min(100, Math.abs((metric.value % 100) / 1))}%` }} />
      </div>
    </div>
  )
}

function formatNumber(n: number, unit: string) {
  // If percent, show one decimal
  if (unit === '%') return `${n.toFixed(1)}%`
  // If unit has $, prefix
  if (unit === '$') return n.toLocaleString()
  return n % 1 === 0 ? n.toLocaleString() : n.toString()
}
