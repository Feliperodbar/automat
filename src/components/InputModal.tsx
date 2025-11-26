import React, { useState } from 'react'
import { useTestStore } from '@/store/testStore'

export const InputModal: React.FC = () => {
  const { isModalOpen, currentCommand, addTestStep, closeModal } = useTestStore()
  const [formData, setFormData] = useState<Record<string, any>>({})

  const getCommandFields = (command: string) => {
    switch (command) {
      case 'visit':
        return [
          { name: 'url', label: 'URL', type: 'text', placeholder: 'https://exemplo.com', required: true }
        ]
      case 'click':
        return [
          { name: 'selector', label: 'Seletor CSS', type: 'text', placeholder: 'button, .classe, #id', required: true }
        ]
      case 'type':
        return [
          { name: 'selector', label: 'Seletor CSS', type: 'text', placeholder: 'input[name="campo"]', required: true },
          { name: 'text', label: 'Texto', type: 'text', placeholder: 'Texto a ser digitado', required: true }
        ]
      case 'contains':
        return [
          { name: 'selector', label: 'Seletor CSS', type: 'text', placeholder: 'body, .texto', required: true },
          { name: 'text', label: 'Texto esperado', type: 'text', placeholder: 'Texto que deve conter', required: true }
        ]
      case 'check':
      case 'uncheck':
        return [
          { name: 'selector', label: 'Seletor CSS', type: 'text', placeholder: 'input[type="checkbox"]', required: true }
        ]
      case 'select':
        return [
          { name: 'selector', label: 'Seletor CSS', type: 'text', placeholder: 'select[name="campo"]', required: true },
          { name: 'value', label: 'Valor', type: 'text', placeholder: 'Valor a ser selecionado', required: true }
        ]
      case 'wait':
        return [
          { name: 'timeout', label: 'Tempo (ms)', type: 'number', placeholder: '1000', required: false }
        ]
      case 'submit':
        return [
          { name: 'selector', label: 'Seletor CSS (opcional)', type: 'text', placeholder: 'button[type="submit"]', required: false }
        ]
      case 'assert':
        return [
          { name: 'selector', label: 'Seletor CSS', type: 'text', placeholder: '.elemento', required: true },
          { name: 'text', label: 'Texto esperado (opcional)', type: 'text', placeholder: 'Texto que deve existir', required: false }
        ]
      case 'login':
        return [
          { name: 'usernameSelector', label: 'Seletor do usuário', type: 'text', placeholder: 'input[name="username"]', required: true },
          { name: 'username', label: 'Nome de usuário', type: 'text', placeholder: 'usuario@email.com', required: true },
          { name: 'passwordSelector', label: 'Seletor da senha', type: 'text', placeholder: 'input[name="password"]', required: true },
          { name: 'password', label: 'Senha', type: 'password', placeholder: '••••••••', required: true },
          { name: 'submitSelector', label: 'Seletor do botão (opcional)', type: 'text', placeholder: 'button[type="submit"]', required: false }
        ]
      default:
        return []
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentCommand) {
      addTestStep(currentCommand, formData)
      setFormData({})
      closeModal()
    }
  }

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const fields = currentCommand ? getCommandFields(currentCommand) : []

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 capitalize">
            Adicionar Comando: {currentCommand}
          </h3>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          ))}

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Adicionar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}