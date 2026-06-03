import os from 'node:os'

const cpuCount = os.availableParallelism?.() ?? os.cpus().length
//const workerCount = Math.max(1, Math.min(process.env.CI ? 2 : 4, cpuCount - 1))
const workerCount = Math.max(1, cpuCount - 1)

export default {
  fullyParallel: true,
  reporter: 'line',
  workers: workerCount,
  webServer: {
    command: 'node sonic serve',
    url: 'http://localhost:8000',
    reuseExistingServer: true,
  },
  use: {
    baseURL: 'http://localhost:8000',
    screenshot: 'off',
    video: 'off',
    trace: 'off',
  },
}
