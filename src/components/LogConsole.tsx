import React from 'react'
import { useTestStore } from '@/store/testStore'

export const LogConsole: React.FC = () => {
  const { logs, logFilter, setLogFilter } = useTestStore()

  const filteredLogs = logs.filter(log => {
    if (logFilter === 'all') return true
    return log.level === logFilter
  })

  const getLogColor = (level: string) => {
    switch (level) {
      case 'info':
        return 'text-blue-400'
      case 'success':
        return 'text-green-400'
      case 'error':
        return 'text-red-400'
      default:
        return 'text-gray-400'
    }
  }

  const formatTimestamp = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="bg-gray-900 rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Console de Logs</h2>
        <div className="flex space-x-2">
          {(['all', 'info', 'success', 'error'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setLogFilter(filter)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                logFilter === filter
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {filter === 'all' ? 'Todos' : filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 overflow-y-auto bg-black rounded-md p-4">
        {filteredLogs.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p className="text-sm">Nenhum log disponível.</p>
            <p className="text-xs mt-1">Execute um teste para ver os logs.</p>
          </div>
        ) : (
          <div className="space-y-2 font-mono text-sm">
            {filteredLogs.map((log) => (
              <div key={log.id} className="flex space-x-3">
                <span className="text-gray-500 flex-shrink-0">
                  {formatTimestamp(log.timestamp)}
                </span>
                <span className={`flex-shrink-0 font-bold ${getLogColor(log.level)}`}>
                  [{log.level.toUpperCase()}]
                </span>
                <span className="text-gray-300 flex-1">{log.message}</span>
                {log.metadata && (
                  <span className="text-gray-500 text-xs">
                    {JSON.stringify(log.metadata)}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}