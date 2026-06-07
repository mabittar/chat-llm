<script setup>
import { ref } from 'vue'

const emit = defineEmits(['send'])

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const draftMessage = ref('')
const validationError = ref('')

function submitMessage() {
  const payload = draftMessage.value.trim()
  if (!payload) {
    validationError.value = 'Digite uma mensagem para continuar.'
    return
  }

  validationError.value = ''
  emit('send', payload)
  draftMessage.value = ''
}
</script>

<template>
  <form class="message-input-form" @submit.prevent="submitMessage">
    <label for="chat-message" class="sr-only">Mensagem</label>
    <input
      id="chat-message"
      v-model="draftMessage"
      class="message-input"
      placeholder="Digite sua pergunta..."
      autocomplete="off"
      data-testid="message-input"
      :disabled="disabled"
    />
    <button class="send-btn" type="submit" data-testid="send-button" :disabled="disabled">
      Enviar
    </button>
  </form>
  <p v-if="validationError" class="validation-error" data-testid="validation-error">
    {{ validationError }}
  </p>
</template>
