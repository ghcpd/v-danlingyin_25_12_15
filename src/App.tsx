import React from 'react'
import Dashboard from './dashboard/Dashboard'

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-900 text-white">
      <Dashboard />
    </div>
  )
}

export default App
