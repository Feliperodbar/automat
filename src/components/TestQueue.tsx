import React, { useState } from 'react'
import { useTestStore } from '@/store/testStore'

export const TestQueue: React.FC = () => {
  const { testSteps, removeTestStep, reorderTestSteps } = useTestStore()
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      reorderTestSteps(draggedIndex, dropIndex)
    }
    setDraggedIndex(null)
  }

  const getCommandSummary = (step: any) => {
    switch (step.command) {
      case 'visit':
        return `URL: ${step.params.url}`
      case 'click':
        return `Seletor: ${step.params.selector}`
      case 'type':
        return `Campo: ${step.params.selector}, Texto: ${step.params.text}`
      case 'contains':
        return `Seletor: ${step.params.selector}, Texto: "${step.params.text}"`
      case 'check':
      case 'uncheck':
        return `Seletor: ${step.params.selector}`
      case 'select':
        return `Campo: ${step.params.selector}, Valor: ${step.params.value}`
      case 'wait':
        return `Tempo: ${step.params.timeout || 1000}ms`
      case 'submit':
        return `Seletor: ${step.params.selector || 'button[type="submit"]'}`
      case 'assert':
        return `Seletor: ${step.params.selector}${step.params.text ? `, Texto: "${step.params.text}"` : ''}`
      case 'login':
        return `Usuário: ${step.params.username}`
      default:
        return JSON.stringify(step.params)
    }
  }

  if (testSteps.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Fila de Testes</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Nenhum comando adicionado ainda.</p>
          <p className="text-xs mt-1">Clique nos comandos ao lado para começar.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Fila de Testes</h2>
      
      <div className="space-y-3">
        {testSteps.map((step, index) => (
          <div
            key={step.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            className="bg-gray-50 border border-gray-200 rounded-md p-4 cursor-move hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500 w-8">{index + 1}.</span>
                <div>
                  <span className="text-sm font-medium text-gray-900 capitalize">{step.command}</span>
                  <p className="text-xs text-gray-600 mt-1">{getCommandSummary(step)}</p>
                </div>
              </div>
              <button
                onClick={() => removeTestStep(step.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded"
                title="Remover comando"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>💡 Arraste e solte para reordenar os comandos</p>
      </div>
    </div>
  )
}