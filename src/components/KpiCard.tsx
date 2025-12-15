import React, { useEffect, useRef, useState } from 'react'
import type { KpiMetric } from '../../ui_requirements'

interface KpiCardProps {
  metric: KpiMetric
  animate?: boolean
}

const KpiCard: React.FC<KpiCardProps> = ({ metric, animate = false }) => {
  const [isAnimating, setIsAnimating] = useState(false)
  const prevValueRef = useRef<number>(metric.value)

  useEffect(() => {
    if (!animate) return
    if (prevValueRef.current !== metric.value) {
      setIsAnimating(true)
      const tid = setTimeout(() => setIsAnimating(false), 500)
      return () => clearTimeout(tid)
    }
  }, [metric.value, animate])

  useEffect(() => {
    prevValueRef.current = metric.value
  }, [metric.value])

  return (
    <div
      className={`p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700 ${isAnimating ? 'animate-change' : ''}`}
    >
      <div className="text-sm text-gray-400 uppercase mb-1">{metric.title}</div>
      <div className="text-3xl font-bold">{metric.unit}{metric.value}</div>
    </div>
  )
}

export default KpiCard
