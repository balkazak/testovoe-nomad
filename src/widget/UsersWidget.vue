<template>
  <div class="users-widget">
    <div class="users-widget__header">
      <h2>Пользователи</h2>
      <AppButton :disabled="loading" @click="handleRefresh">
        Обновить
      </AppButton>
    </div>

    <div class="users-widget__search">
      <AppInput
        v-model="searchQuery"
        placeholder="Поиск по имени или email..."
        @update:modelValue="store.setSearchQuery"
      />
    </div>

    <ErrorMessage :message="store.error" />

    <LoadingSpinner v-if="loading && !store.filteredUsers.length" message="Загрузка пользователей..." />

    <div v-else-if="store.filteredUsers.length" class="users-widget__content">
      <UserTable :users="store.filteredUsers" @select="handleUserSelect" />
    </div>

    <div v-else class="users-widget__empty">
      <p>Пользователи не найдены</p>
    </div>

    <AppModal v-model="showUserDetail" @update:modelValue="handleModalClose">
      <template #title>Детали пользователя</template>
      <div v-if="selectedUser" class="user-detail">
        <div class="user-detail__field">
          <strong>Имя:</strong> {{ selectedUser.name }}
        </div>
        <div class="user-detail__field">
          <strong>Email:</strong> {{ selectedUser.email }}
        </div>
        <div class="user-detail__field">
          <strong>Телефон:</strong> {{ selectedUser.phone }}
        </div>
        <div class="user-detail__field">
          <strong>Сайт:</strong>
          <a :href="`http://${selectedUser.website}`" target="_blank">
            {{ selectedUser.website }}
          </a>
        </div>
        <div class="user-detail__field">
          <strong>Адрес:</strong>
          {{ selectedUser.address.street }}, {{ selectedUser.address.suite }},
          {{ selectedUser.address.city }}, {{ selectedUser.address.zipcode }}
        </div>
        <div class="user-detail__field">
          <strong>Компания:</strong> {{ selectedUser.company.name }}
        </div>
      </div>
      <template #footer>
        <AppButton @click="showUserDetail = false">Закрыть</AppButton>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUsersStore } from '@/store/users'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import AppModal from '@/components/AppModal.vue'
import UserTable from '@/components/UserTable.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import type { User } from '@/types/user'

const store = useUsersStore()
const searchQuery = ref('')
const showUserDetail = ref(false)
const selectedUser = ref<User | null>(null)

const loading = computed(() => store.loading)

onMounted(() => {
  store.loadUsers()
})

function handleRefresh() {
  store.loadUsers()
}

function handleUserSelect(user: User) {
  selectedUser.value = user
  showUserDetail.value = true
}

function handleModalClose() {
  showUserDetail.value = false
  selectedUser.value = null
}
</script>

<style scoped>
.users-widget {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

.users-widget__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.users-widget__header h2 {
  margin: 0;
  font-size: 24px;
}

.users-widget__search {
  margin-bottom: 20px;
}

.users-widget__content {
  margin-top: 20px;
}

.users-widget__empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.user-detail {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-detail__field {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.user-detail__field:last-child {
  border-bottom: none;
}

.user-detail__field strong {
  display: inline-block;
  min-width: 100px;
  color: #333;
}

@media (max-width: 768px) {
  .users-widget {
    padding: 16px;
  }

  .users-widget__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>

