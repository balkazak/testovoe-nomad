<template>
  <button
    :class="['app-button', { 'app-button--disabled': disabled }]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean
}>()

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<style scoped>
.app-button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}

.app-button:hover:not(:disabled) {
  background-color: #0056b3;
}

.app-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>

