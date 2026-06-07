import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 120000,
  use: {
    baseURL: 'http://127.0.0.1:4174',
    headless: true,
  },
  webServer: {
    command:
      'BANKING_LLM_PROXY_TARGET=http://localhost:8000 VITE_BANKING_LLM_URL= VITE_REQUEST_TIMEOUT_MS=120000 npm run dev -- --host 127.0.0.1 --port 4174',
    port: 4174,
    reuseExistingServer: true,
    timeout: 120000,
  },
})
