import { chromium, Browser, Page } from 'playwright'
import { LogService } from './logService.js'
import { v4 as uuidv4 } from 'uuid'

interface TestExecution {
  id: string
  name: string
  status: 'queued' | 'running' | 'success' | 'failed'
  startTime?: Date
  endTime?: Date
  steps: TestStep[]
  result?: any
}

interface TestStep {
  command: string
  params: Record<string, any>
  status?: 'pending' | 'running' | 'success' | 'failed'
  error?: string
}

export class TestService {
  private executions: Map<string, TestExecution> = new Map()
  private logService: LogService

  constructor() {
    this.logService = new LogService()
  }

  async createTestExecution(name: string, steps: any[]): Promise<string> {
    const id = uuidv4()
    const execution: TestExecution = {
      id,
      name,
      status: 'queued',
      steps: steps.map(step => ({
        command: step.command,
        params: step.params,
        status: 'pending'
      }))
    }
    
    this.executions.set(id, execution)
    return id
  }

  async executeTest(testId: string, steps: any[]) {
    const execution = this.executions.get(testId)
    if (!execution) return

    execution.status = 'running'
    execution.startTime = new Date()
    
    this.logService.addLog(testId, 'info', 'Iniciando execução do teste')

    let browser: Browser | null = null
    let page: Page | null = null

    try {
      browser = await chromium.launch({ headless: false })
      page = await browser.newPage()

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        execution.steps[i].status = 'running'
        
        this.logService.addLog(testId, 'info', `Executando comando: ${step.command}`, {
          step: i + 1,
          command: step.command,
          params: step.params
        })

        try {
          await this.executeCommand(page, step.command, step.params)
          execution.steps[i].status = 'success'
          
          this.logService.addLog(testId, 'success', `Comando ${step.command} executado com sucesso`)
        } catch (error) {
          execution.steps[i].status = 'failed'
          execution.steps[i].error = error instanceof Error ? error.message : String(error)
          
          this.logService.addLog(testId, 'error', `Erro ao executar comando ${step.command}: ${execution.steps[i].error}`)
          throw error
        }
      }

      execution.status = 'success'
      execution.endTime = new Date()
      this.logService.addLog(testId, 'success', 'Teste finalizado e aprovado')
      
    } catch (error) {
      execution.status = 'failed'
      execution.endTime = new Date()
      this.logService.addLog(testId, 'error', 'Teste finalizado com erro')
      
    } finally {
      if (page) await page.close()
      if (browser) await browser.close()
    }
  }

  private async executeCommand(page: Page, command: string, params: Record<string, any>) {
    switch (command) {
      case 'visit':
        await page.goto(params.url)
        break
        
      case 'click':
        await page.click(params.selector)
        break
        
      case 'type':
        await page.fill(params.selector, params.text)
        break
        
      case 'contains':
        const text = await page.textContent(params.selector)
        if (!text?.includes(params.text)) {
          throw new Error(`Text "${params.text}" not found in selector "${params.selector}"`)
        }
        break
        
      case 'check':
        await page.check(params.selector)
        break
        
      case 'uncheck':
        await page.uncheck(params.selector)
        break
        
      case 'select':
        await page.selectOption(params.selector, params.value)
        break
        
      case 'wait':
        await page.waitForTimeout(params.timeout || 1000)
        break
        
      case 'submit':
        await page.click(params.selector || 'button[type="submit"]')
        break
        
      case 'assert':
        const element = await page.locator(params.selector)
        if (params.text) {
          await element.waitFor({ state: 'visible' })
          const actualText = await element.textContent()
          if (!actualText?.includes(params.text)) {
            throw new Error(`Assertion failed: expected "${params.text}" but got "${actualText}"`)
          }
        }
        break
        
      case 'login':
        await page.fill(params.usernameSelector, params.username)
        await page.fill(params.passwordSelector, params.password)
        await page.click(params.submitSelector || 'button[type="submit"]')
        break
        
      default:
        throw new Error(`Unknown command: ${command}`)
    }
  }

  getTestStatus(testId: string): string {
    const execution = this.executions.get(testId)
    return execution?.status || 'not_found'
  }

  getTestResults(testId: string) {
    const execution = this.executions.get(testId)
    if (!execution) {
      return { error: 'Test not found' }
    }
    
    return {
      id: execution.id,
      name: execution.name,
      status: execution.status,
      startTime: execution.startTime,
      endTime: execution.endTime,
      steps: execution.steps,
      result: execution.result
    }
  }
}