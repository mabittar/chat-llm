import { storeToRefs } from 'pinia'

import { useChatStore } from '@/stores/chat.store'

export function useChatSession() {
  const chatStore = useChatStore()
  const { activeChat, chats, isSending, lastError } = storeToRefs(chatStore)

  return {
    activeChat,
    chats,
    isSending,
    lastError,
    createNewChat: chatStore.createNewChat,
    setActiveChat: chatStore.setActiveChat,
    sendMessage: chatStore.sendMessage,
  }
}
