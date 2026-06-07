<script setup>
import { computed, onMounted } from 'vue'

import { useChatSession } from '@/composables/useChatSession'
import ChatHeader from '@/components/chat/ChatHeader.vue'
import MessageInput from '@/components/chat/MessageInput.vue'
import MessageList from '@/components/chat/MessageList.vue'

const { activeChat, chats, createNewChat, setActiveChat, sendMessage, isSending, lastError } =
  useChatSession()

const activeMessages = computed(() => activeChat.value?.messages ?? [])

function handleSendMessage(content) {
  sendMessage(content)
}

onMounted(() => {
  if (!activeChat.value) {
    createNewChat()
  }
})
</script>

<template>
  <main class="chat-shell">
    <aside class="chat-sidebar">
      <ChatHeader @new-chat="createNewChat" />

      <ul class="chat-list" data-testid="chat-list">
        <li v-for="chat in chats" :key="chat.id">
          <button
            type="button"
            class="chat-list-item"
            :class="{ active: chat.id === activeChat?.id }"
            @click="setActiveChat(chat.id)"
          >
            <span>{{ chat.title }}</span>
          </button>
        </li>
      </ul>
    </aside>

    <section class="chat-main">
      <MessageList :messages="activeMessages" :is-sending="isSending" />
      <p v-if="lastError" class="request-error" data-testid="request-error">{{ lastError }}</p>
      <MessageInput :disabled="isSending" @send="handleSendMessage" />
    </section>
  </main>
</template>
