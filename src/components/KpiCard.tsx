import { KpiMetric } from '../../ui_requirements'

interface KpiCardProps {
  metric: KpiMetric
  prevValue?: number
}

export default function KpiCard({ metric, prevValue }: KpiCardProps) {
  const hasChanged = prevValue !== undefined && prevValue !== metric.value
  const isIncrease = prevValue !== undefined && metric.value > prevValue

  const formatValue = (value: number, unit: string) => {
    if (unit === '$') {
      return `${unit}${value.toLocaleString()}`
    } else if (unit === '%') {
      return `${value}${unit}`
    }
    return value.toLocaleString()
  }

  return (
    <div className="bg-card-bg border border-card-border rounded-lg p-6 card-glow hover:border-primary-blue transition-all duration-300">
      <div className="flex flex-col h-full">
        <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase tracking-wider">
          {metric.title}
        </h3>
        <div className="flex items-baseline gap-2 mt-auto">
          <span 
            className={`text-4xl font-bold text-white ${hasChanged ? 'animate-count-up' : ''}`}
            key={metric.value}
          >
            {formatValue(metric.value, metric.unit)}
          </span>
          {hasChanged && (
            <span 
              className={`text-sm font-semibold ${
                isIncrease ? 'text-accent-green' : 'text-red-400'
              } animate-fade-in`}
            >
              {isIncrease ? '↑' : '↓'}
            </span>
          )}
        </div>
        <div className="mt-4 h-1 bg-gradient-to-r from-primary-blue to-primary-cyan rounded-full"></div>
      </div>
    </div>
  )
}
