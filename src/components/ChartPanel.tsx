import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

interface ChartPanelProps {
  trend: number[]
}

const ChartPanel: React.FC<ChartPanelProps> = ({ trend }) => {
  const data = trend.map((v, i) => ({ x: i, y: v }))

  return (
    <div className="p-6 rounded-lg shadow-lg bg-gray-800 border border-gray-700 h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="x" tick={{ fill: '#aaa' }} />
          <YAxis tick={{ fill: '#aaa' }} />
          <Tooltip
            contentStyle={{ backgroundColor: '#222', border: 'none' }}
            labelStyle={{ color: '#fff' }}
            itemStyle={{ color: '#fff' }}
          />
          <Line type="monotone" dataKey="y" stroke="#4fd1c5" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartPanel
