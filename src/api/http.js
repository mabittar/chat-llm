import axios from 'axios'

import { APP_ENV } from '@/config/env'

const http = axios.create({
  baseURL: APP_ENV.apiBaseUrl,
  timeout: APP_ENV.requestTimeoutMs,
  headers: {
    'Content-Type': 'application/json',
  },
})

export function toTechnicalError(error) {
  const status = error?.response?.status ?? null
  const endpoint = error?.config?.url ?? 'unknown'

  const technicalError = new Error(
    `Chat request failed for endpoint '${endpoint}'. Expected HTTP 2xx.`
  )
  technicalError.name = 'ChatRequestError'
  technicalError.status = status
  technicalError.endpoint = endpoint
  technicalError.cause = error

  return technicalError
}

export default http
