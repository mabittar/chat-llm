<template>
  <header class="chat-header">
    <div>
      <p class="chat-eyebrow">Banking LLM</p>
      <h1 class="chat-title">Canal de Atendimento</h1>
    </div>

    <button type="button" class="new-chat-btn" @click="$emit('new-chat')">Novo Chat</button>
  </header>
</template>
