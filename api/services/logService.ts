interface LogEntry {
  id: string
  testExecutionId: string
  timestamp: Date
  level: 'info' | 'success' | 'error'
  message: string
  metadata?: Record<string, any>
}

export class LogService {
  private logs: Map<string, LogEntry[]> = new Map()

  addLog(
    testExecutionId: string, 
    level: 'info' | 'success' | 'error', 
    message: string, 
    metadata?: Record<string, any>
  ) {
    const logEntry: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      testExecutionId,
      timestamp: new Date(),
      level,
      message,
      metadata
    }

    if (!this.logs.has(testExecutionId)) {
      this.logs.set(testExecutionId, [])
    }

    this.logs.get(testExecutionId)!.push(logEntry)
    console.log(`[${level.toUpperCase()}] ${message}`, metadata || '')
  }

  getLogsForTest(testExecutionId: string): LogEntry[] {
    return this.logs.get(testExecutionId) || []
  }

  getLogsByLevel(testExecutionId: string, level: 'info' | 'success' | 'error'): LogEntry[] {
    const logs = this.logs.get(testExecutionId) || []
    return logs.filter(log => log.level === level)
  }

  clearLogs(testExecutionId: string) {
    this.logs.delete(testExecutionId)
  }

  exportLogs(testExecutionId: string): string {
    const logs = this.logs.get(testExecutionId) || []
    return logs.map(log => 
      `[${log.timestamp.toISOString()}] [${log.level.toUpperCase()}] ${log.message}${log.metadata ? ' ' + JSON.stringify(log.metadata) : ''}`
    ).join('\n')
  }
}