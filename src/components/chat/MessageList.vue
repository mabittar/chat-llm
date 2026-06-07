<script setup>
import { renderAssistantMessage } from '@/utils/markdown'

defineProps({
  messages: {
    type: Array,
    required: true,
  },
  isSending: {
    type: Boolean,
    required: true,
  },
})

function toAssistantHtml(content) {
  return renderAssistantMessage(content)
}
</script>

<template>
  <section class="message-list" data-testid="message-list">
    <div v-if="messages.length === 0" class="empty-state">
      Comece sua conversa com o assistente bancario.
    </div>

    <article v-for="message in messages" :key="message.id" class="message" :class="message.role">
      <p class="message-role">{{ message.role === 'user' ? 'Voce' : 'Assistente' }}</p>
      <p v-if="message.role === 'user'" class="message-content">{{ message.content }}</p>
      <div
        v-else
        class="message-content markdown-content"
        v-html="toAssistantHtml(message.content)"
      ></div>
    </article>

    <p v-if="isSending" class="loading-state" data-testid="loading-state">
      Processando resposta...
    </p>
  </section>
</template>
