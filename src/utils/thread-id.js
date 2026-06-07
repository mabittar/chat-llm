const THREAD_HEADER_NAME = 'X-Thread-ID'

function getHeaderValue(headers, headerName) {
  if (!headers) {
    return null
  }

  if (typeof headers.get === 'function') {
    return headers.get(headerName) ?? headers.get(headerName.toLowerCase())
  }

  return headers[headerName] ?? headers[headerName.toLowerCase()] ?? null
}

export function readThreadIdFromHeaders(headers) {
  const headerValue = getHeaderValue(headers, THREAD_HEADER_NAME)
  if (typeof headerValue !== 'string') {
    return null
  }

  const trimmed = headerValue.trim()
  return trimmed.length > 0 ? trimmed : null
}

export function buildThreadHeader(threadId) {
  return {
    [THREAD_HEADER_NAME]: threadId,
  }
}
