import React, { useState } from 'react'
import { useTestStore } from '@/store/testStore'

export const ExecutionControls: React.FC = () => {
  const { testSteps, clearTestSteps, logs, setCurrentTestId, setTestStatus, addLog } = useTestStore()
  const [isRunning, setIsRunning] = useState(false)
  const [testName, setTestName] = useState('')

  const runTest = async () => {
    if (testSteps.length === 0) {
      alert('Adicione pelo menos um comando antes de executar o teste.')
      return
    }

    if (!testName.trim()) {
      alert('Digite um nome para o teste.')
      return
    }

    setIsRunning(true)
    setTestStatus('queued')
    addLog('info', 'Preparando execução do teste...')

    try {
      const response = await fetch('/api/run-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          testName: testName.trim(),
          steps: testSteps.map(step => ({
            command: step.command,
            params: step.params
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao iniciar teste')
      }

      const data = await response.json()
      setCurrentTestId(data.testId)
      setTestStatus('queued')
      addLog('info', 'Teste iniciado com sucesso', { testId: data.testId })

      // Iniciar polling para status
      pollTestStatus(data.testId)
      
    } catch (error) {
      console.error('Erro ao executar teste:', error)
      setTestStatus('failed')
      addLog('error', 'Erro ao iniciar teste')
      setIsRunning(false)
    }
  }

  const pollTestStatus = async (testId: string) => {
    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/test-status/${testId}`)
        if (!response.ok) {
          throw new Error('Erro ao obter status')
        }

        const data = await response.json()
        
        // Atualizar logs
        data.logs.forEach((log: any) => {
          addLog(log.level, log.message, log.metadata)
        })

        if (data.status === 'success' || data.status === 'failed') {
          setTestStatus(data.status)
          setIsRunning(false)
          clearInterval(pollInterval)
          
          if (data.status === 'success') {
            addLog('success', 'Teste finalizado e aprovado')
          } else {
            addLog('error', 'Teste finalizado com erro')
          }
        } else if (data.status === 'running') {
          setTestStatus('running')
        }
        
      } catch (error) {
        console.error('Erro ao obter status:', error)
        setIsRunning(false)
        clearInterval(pollInterval)
      }
    }, 1000) // Poll a cada segundo
  }

  const exportLogs = () => {
    if (logs.length === 0) {
      alert('Nenhum log para exportar.')
      return
    }

    const logContent = logs.map(log => 
      `[${log.timestamp.toLocaleTimeString('pt-BR')}] [${log.level.toUpperCase()}] ${log.message}${log.metadata ? ' ' + JSON.stringify(log.metadata) : ''}`
    ).join('\n')

    const blob = new Blob([logContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-logs-${new Date().toISOString().slice(0, 19).replace(':', '-')}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Controles de Execução</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome do Teste
          </label>
          <input
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Digite um nome para o teste..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isRunning}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={runTest}
            disabled={isRunning}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isRunning ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Executando...</span>
              </div>
            ) : (
              'Executar Teste'
            )}
          </button>

          <button
            onClick={clearTestSteps}
            disabled={isRunning || testSteps.length === 0}
            className="px-6 py-2 text-sm font-medium text-white bg-red-500 border border-transparent rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Limpar Seleção
          </button>

          <button
            onClick={exportLogs}
            disabled={logs.length === 0}
            className="px-6 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Exportar Log
          </button>
        </div>

        {isRunning && (
          <div className="text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-md p-3">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span>Teste em execução. Aguarde...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}