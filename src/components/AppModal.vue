<template>
  <Teleport to="body">
    <div v-if="modelValue" class="app-modal" @click.self="close">
      <div class="app-modal__content">
        <div class="app-modal__header">
          <h3 class="app-modal__title">
            <slot name="title" />
          </h3>
          <button class="app-modal__close" @click="close">×</button>
        </div>
        <div class="app-modal__body">
          <slot />
        </div>
        <div v-if="$slots.footer" class="app-modal__footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

function close() {
  emit('update:modelValue', false)
}
</script>

<style scoped>
.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.app-modal__content {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.app-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
}

.app-modal__title {
  margin: 0;
  font-size: 20px;
}

.app-modal__close {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-modal__close:hover {
  color: #000;
}

.app-modal__body {
  padding: 20px;
}

.app-modal__footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>

