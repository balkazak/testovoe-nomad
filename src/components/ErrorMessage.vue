<template>
  <div v-if="message" class="error-message">
    <span class="error-message__icon">⚠</span>
    <span class="error-message__text">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string | null
}>()
</script>

<style scoped>
.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  margin-bottom: 16px;
}

.error-message__icon {
  font-size: 18px;
}

.error-message__text {
  flex: 1;
}
</style>

