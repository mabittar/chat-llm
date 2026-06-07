import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('@/api/chat.service', () => {
  return {
    sendChatMessage: vi.fn(),
  }
})

import { sendChatMessage } from '@/api/chat.service'
import { useChatStore } from '@/stores/chat.store'

describe('chat.store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('creates a new chat with valid thread id', () => {
    const store = useChatStore()

    const chat = store.createNewChat()

    expect(chat.id).toBeTruthy()
    expect(chat.threadId).toBeTruthy()
    expect(store.activeChat.id).toBe(chat.id)
    expect(chat.messages).toHaveLength(1)
    expect(chat.messages[0].role).toBe('assistant')
  })

  it('persists returned x-thread-id in active chat', async () => {
    sendChatMessage.mockResolvedValue({
      answer: 'Tudo certo',
      threadId: '4f8f0cf8-1a8e-4374-9890-7f491e508947',
    })

    const store = useChatStore()
    store.createNewChat()

    const result = await store.sendMessage('Mensagem')

    expect(result.ok).toBe(true)
    expect(store.activeChat.threadId).toBe('4f8f0cf8-1a8e-4374-9890-7f491e508947')
    expect(store.activeChat.messages).toHaveLength(3)
  })

  it('does not send when payload is empty', async () => {
    const store = useChatStore()
    store.createNewChat()

    const result = await store.sendMessage('   ')

    expect(result.ok).toBe(false)
    expect(sendChatMessage).not.toHaveBeenCalled()
  })
})
