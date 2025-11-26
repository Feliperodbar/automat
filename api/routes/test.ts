import express from 'express'
import { TestService } from '../services/testService.js'
import { LogService } from '../services/logService.js'

export const testRouter = express.Router()
const testService = new TestService()
const logService = new LogService()

testRouter.post('/run-test', async (req, res) => {
  try {
    const { testName, steps } = req.body
    
    if (!testName || !steps || !Array.isArray(steps)) {
      return res.status(400).json({ error: 'Invalid request body' })
    }

    const testId = await testService.createTestExecution(testName, steps)
    
    res.json({ testId, status: 'queued' })
    
    testService.executeTest(testId, steps)
  } catch (error) {
    console.error('Error creating test:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

testRouter.get('/test-status/:testId', (req, res) => {
  try {
    const { testId } = req.params
    const status = testService.getTestStatus(testId)
    const logs = logService.getLogsForTest(testId)
    
    res.json({ testId, status, logs })
  } catch (error) {
    console.error('Error getting test status:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

testRouter.get('/test-results/:testId', (req, res) => {
  try {
    const { testId } = req.params
    const results = testService.getTestResults(testId)
    
    res.json(results)
  } catch (error) {
    console.error('Error getting test results:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})