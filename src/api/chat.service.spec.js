import { describe, expect, it, vi } from 'vitest'

vi.mock('@/api/http', () => {
  return {
    default: {
      post: vi.fn(),
    },
    toTechnicalError: vi.fn((error) => error),
  }
})

import http from '@/api/http'
import { sendChatMessage } from '@/api/chat.service'

describe('chat.service', () => {
  it('returns answer and thread id from response header', async () => {
    http.post.mockResolvedValue({
      data: { answer: 'Resposta' },
      headers: { 'x-thread-id': 'new-thread-id' },
    })

    const result = await sendChatMessage({
      question: 'Oi',
      threadId: 'old-thread-id',
    })

    expect(result.answer).toBe('Resposta')
    expect(result.threadId).toBe('new-thread-id')
  })

  it('keeps existing thread id when response has no header', async () => {
    http.post.mockResolvedValue({
      data: { answer: 'Sem header' },
      headers: {},
    })

    const result = await sendChatMessage({
      question: 'Oi',
      threadId: 'existing-thread-id',
    })

    expect(result.threadId).toBe('existing-thread-id')
  })

  it('fails fast for invalid payload', async () => {
    await expect(sendChatMessage({ question: ' ', threadId: 'abc' })).rejects.toThrow(
      'Expected a non-empty string'
    )
  })
})
