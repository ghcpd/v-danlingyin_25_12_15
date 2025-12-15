import { useEffect, useRef } from 'react'

interface ChartPanelProps {
  data: number[]
  title?: string
}

export default function ChartPanel({ data, title = 'Trend Analysis' }: ChartPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    
    ctx.scale(dpr, dpr)
    
    const width = rect.width
    const height = rect.height
    const padding = 40

    ctx.clearRect(0, 0, width, height)

    if (data.length < 2) return

    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue || 1

    const stepX = (width - padding * 2) / (data.length - 1)
    const stepY = (height - padding * 2) / range

    ctx.strokeStyle = '#3b82f6'
    ctx.lineWidth = 3
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)')
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.05)')

    ctx.beginPath()
    data.forEach((value, index) => {
      const x = padding + index * stepX
      const y = height - padding - (value - minValue) * stepY

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    const lastPoint = {
      x: padding + (data.length - 1) * stepX,
      y: height - padding - (data[data.length - 1] - minValue) * stepY
    }

    ctx.stroke()

    ctx.lineTo(lastPoint.x, height - padding)
    ctx.lineTo(padding, height - padding)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.strokeStyle = '#2a3142'
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    
    for (let i = 0; i <= 4; i++) {
      const y = padding + (height - padding * 2) * (i / 4)
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }
    
    ctx.setLineDash([])

    ctx.fillStyle = '#3b82f6'
    data.forEach((value, index) => {
      const x = padding + index * stepX
      const y = height - padding - (value - minValue) * stepY

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = '#1e293b'
      ctx.lineWidth = 2
      ctx.stroke()
    })

    ctx.fillStyle = '#9ca3af'
    ctx.font = '12px sans-serif'
    ctx.textAlign = 'right'
    
    for (let i = 0; i <= 4; i++) {
      const value = maxValue - (range * i / 4)
      const y = padding + (height - padding * 2) * (i / 4)
      ctx.fillText(Math.round(value).toString(), padding - 10, y + 4)
    }

  }, [data])

  return (
    <div className="bg-card-bg border border-card-border rounded-lg p-6 card-glow">
      <h3 className="text-gray-400 text-sm font-medium mb-4 uppercase tracking-wider">
        {title}
      </h3>
      <div className="relative w-full h-64">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  )
}
