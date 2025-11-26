import { create } from 'zustand'

export interface TestStep {
  id: string
  command: string
  params: Record<string, any>
}

export interface LogEntry {
  id: string
  timestamp: Date
  level: 'info' | 'success' | 'error'
  message: string
  metadata?: Record<string, any>
}

interface TestState {
  testSteps: TestStep[]
  currentTestId: string | null
  testStatus: 'idle' | 'queued' | 'running' | 'success' | 'failed'
  logs: LogEntry[]
  logFilter: 'all' | 'info' | 'success' | 'error'
  isModalOpen: boolean
  currentCommand: string | null
  
  addTestStep: (command: string, params: Record<string, any>) => void
  removeTestStep: (id: string) => void
  updateTestStep: (id: string, command: string, params: Record<string, any>) => void
  reorderTestSteps: (startIndex: number, endIndex: number) => void
  clearTestSteps: () => void
  setCurrentTestId: (id: string | null) => void
  setTestStatus: (status: 'idle' | 'queued' | 'running' | 'success' | 'failed') => void
  addLog: (level: 'info' | 'success' | 'error', message: string, metadata?: Record<string, any>) => void
  clearLogs: () => void
  setLogFilter: (filter: 'all' | 'info' | 'success' | 'error') => void
  openModal: (command: string) => void
  closeModal: () => void
}

export const useTestStore = create<TestState>((set, get) => ({
  testSteps: [],
  currentTestId: null,
  testStatus: 'idle',
  logs: [],
  logFilter: 'all',
  isModalOpen: false,
  currentCommand: null,

  addTestStep: (command: string, params: Record<string, any>) => {
    const newStep: TestStep = {
      id: Math.random().toString(36).substr(2, 9),
      command,
      params
    }
    set(state => ({
      testSteps: [...state.testSteps, newStep]
    }))
  },

  removeTestStep: (id: string) => {
    set(state => ({
      testSteps: state.testSteps.filter(step => step.id !== id)
    }))
  },

  updateTestStep: (id: string, command: string, params: Record<string, any>) => {
    set(state => ({
      testSteps: state.testSteps.map(step => 
        step.id === id ? { ...step, command, params } : step
      )
    }))
  },

  reorderTestSteps: (startIndex: number, endIndex: number) => {
    set(state => {
      const steps = [...state.testSteps]
      const [removed] = steps.splice(startIndex, 1)
      steps.splice(endIndex, 0, removed)
      return { testSteps: steps }
    })
  },

  clearTestSteps: () => {
    set({ testSteps: [] })
  },

  setCurrentTestId: (id: string | null) => {
    set({ currentTestId: id })
  },

  setTestStatus: (status: 'idle' | 'queued' | 'running' | 'success' | 'failed') => {
    set({ testStatus: status })
  },

  addLog: (level: 'info' | 'success' | 'error', message: string, metadata?: Record<string, any>) => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      level,
      message,
      metadata
    }
    set(state => ({
      logs: [...state.logs, newLog]
    }))
  },

  clearLogs: () => {
    set({ logs: [] })
  },

  setLogFilter: (filter: 'all' | 'info' | 'success' | 'error') => {
    set({ logFilter: filter })
  },

  openModal: (command: string) => {
    set({ isModalOpen: true, currentCommand: command })
  },

  closeModal: () => {
    set({ isModalOpen: false, currentCommand: null })
  }
}))