const parsedTimeout = Number.parseInt(import.meta.env.VITE_REQUEST_TIMEOUT_MS ?? '', 10)

export const APP_ENV = {
  apiBaseUrl:
    import.meta.env.VITE_BANKING_LLM_URL ?? import.meta.env.VITE_API_URL ?? '',
  requestTimeoutMs: Number.isFinite(parsedTimeout) ? parsedTimeout : 30000,
}
