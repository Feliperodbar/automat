import React from 'react'
import { CommandPalette } from './components/CommandPalette'
import { TestQueue } from './components/TestQueue'
import { LogConsole } from './components/LogConsole'
import { ExecutionControls } from './components/ExecutionControls'
import { InputModal } from './components/InputModal'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistema de Automação de Testes
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Crie e execute scripts de teste automatizados com interface visual
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-1">
            <CommandPalette />
          </div>
          <div className="lg:col-span-2">
            <TestQueue />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div>
            <ExecutionControls />
          </div>
          <div>
            <LogConsole />
          </div>
        </div>
      </main>

      <InputModal />
    </div>
  )
}

export default App