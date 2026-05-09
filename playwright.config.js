import os from 'node:os'

const cpuCount = os.availableParallelism?.() ?? os.cpus().length

export default {
  fullyParallel: true,
  workers: Math.max(1, Math.min(process.env.CI ? 2 : 4, cpuCount - 1)),
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
