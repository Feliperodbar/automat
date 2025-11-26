import React from 'react'
import { useTestStore } from '@/store/testStore'

const commands = [
  {
    category: 'Navegação',
    items: [
      { command: 'visit', label: 'Visitar URL', icon: '🌐', description: 'Abrir uma página web' },
      { command: 'wait', label: 'Aguardar', icon: '⏱️', description: 'Esperar por tempo específico' }
    ]
  },
  {
    category: 'Interação',
    items: [
      { command: 'click', label: 'Clicar', icon: '🖱️', description: 'Clicar em elemento' },
      { command: 'type', label: 'Digitar', icon: '⌨️', description: 'Digitar texto em campo' },
      { command: 'check', label: 'Marcar', icon: '✅', description: 'Marcar checkbox' },
      { command: 'uncheck', label: 'Desmarcar', icon: '⬜', description: 'Desmarcar checkbox' },
      { command: 'select', label: 'Selecionar', icon: '📋', description: 'Selecionar opção' },
      { command: 'submit', label: 'Submeter', icon: '📤', description: 'Submeter formulário' },
      { command: 'login', label: 'Login', icon: '🔐', description: 'Realizar login completo' }
    ]
  },
  {
    category: 'Asserção',
    items: [
      { command: 'contains', label: 'Contém Texto', icon: '📝', description: 'Verificar se contém texto' },
      { command: 'assert', label: 'Assertiva', icon: '✔️', description: 'Verificar elemento' }
    ]
  }
]

export const CommandPalette: React.FC = () => {
  const { openModal } = useTestStore()

  const handleCommandClick = (command: string) => {
    openModal(command)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Comandos de Teste</h2>
      
      <div className="space-y-6">
        {commands.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="text-sm font-medium text-gray-700 mb-3">{category.category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {category.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={() => handleCommandClick(item.command)}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-md hover:bg-blue-50 hover:border-blue-300 transition-colors group"
                  title={item.description}
                >
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{item.label}</span>
                  <span className="text-xs text-gray-500 mt-1 font-mono">{item.command}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}