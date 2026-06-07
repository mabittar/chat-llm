import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import { sendChatMessage } from '@/api/chat.service'
import { createUuid, isValidUuid } from '@/utils/uuid'

function createChat(title = 'Novo Chat') {
  return {
    id: createUuid(),
    title,
    threadId: createUuid(),
    messages: [createWelcomeMessage()],
    createdAt: new Date().toISOString(),
  }
}

function createMessage(role, content) {
  return {
    id: createUuid(),
    role,
    content,
    createdAt: new Date().toISOString(),
  }
}

function createWelcomeMessage() {
  return createMessage(
    'assistant',
    'Olá sou seu assistente pessoal de operações do Pix. O que vamos fazer hoje?'
  )
}

export const useChatStore = defineStore('chat', () => {
  const chats = ref([])
  const activeChatId = ref(null)
  const isSending = ref(false)
  const lastError = ref('')

  const activeChat = computed(() => {
    return chats.value.find((chat) => chat.id === activeChatId.value) ?? null
  })

  function createNewChat() {
    const chat = createChat(`Conversa ${chats.value.length + 1}`)
    chats.value.unshift(chat)
    activeChatId.value = chat.id
    lastError.value = ''
    return chat
  }

  function setActiveChat(chatId) {
    const targetExists = chats.value.some((chat) => chat.id === chatId)
    if (targetExists) {
      activeChatId.value = chatId
      lastError.value = ''
    }
  }

  function ensureActiveChat() {
    if (!activeChat.value) {
      return createNewChat()
    }

    return activeChat.value
  }

  async function sendMessage(content) {
    const trimmedContent = content?.trim() ?? ''
    if (!trimmedContent) {
      return { ok: false, code: 'EMPTY_MESSAGE' }
    }

    const chat = ensureActiveChat()
    if (!isValidUuid(chat.threadId)) {
      chat.threadId = createUuid()
    }

    chat.messages.push(createMessage('user', trimmedContent))
    isSending.value = true
    lastError.value = ''

    try {
      const response = await sendChatMessage({
        question: trimmedContent,
        threadId: chat.threadId,
      })

      chat.threadId = response.threadId
      chat.messages.push(createMessage('assistant', response.answer))
      return { ok: true }
    } catch (error) {
      lastError.value = 'Nao foi possivel enviar sua mensagem. Tente novamente.'
      console.error('chat_request_failed', {
        endpoint: error.endpoint,
        status: error.status,
        timestamp: new Date().toISOString(),
      })
      return { ok: false, code: 'REQUEST_FAILED' }
    } finally {
      isSending.value = false
    }
  }

  return {
    chats,
    activeChatId,
    activeChat,
    isSending,
    lastError,
    createNewChat,
    setActiveChat,
    sendMessage,
  }
})
