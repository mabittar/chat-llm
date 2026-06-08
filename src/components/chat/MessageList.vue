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
  loadingStage: {
    type: Number,
    required: true,
  },
})

function toAssistantHtml(content) {
  return renderAssistantMessage(content)
}

const loadingMessages = {
  1: 'Estamos processando sua pergunta',
  2: 'Acessando seus dados',
  3: 'Formatando a sua resposta',
}

function getLoadingMessage(stage) {
  return loadingMessages[stage] ?? loadingMessages[1]
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

    <div v-if="isSending" class="loading-state" data-testid="loading-state">
      <p class="loading-line loading-line--active">
        <span class="loading-label">{{ getLoadingMessage(loadingStage) }}</span>
        <span class="loading-dots" aria-hidden="true"
          ><span>.</span><span>.</span><span>.</span></span
        >
      </p>
    </div>
  </section>
</template>
