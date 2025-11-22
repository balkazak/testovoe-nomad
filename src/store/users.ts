import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { usersApi } from '@/services/api'
import type { User, UserFormData } from '@/types/user'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const selectedUser = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')

  const filteredUsers = computed(() => {
    if (!searchQuery.value) {
      return users.value
    }
    const query = searchQuery.value.toLowerCase()
    return users.value.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    )
  })

  async function loadUsers() {
    loading.value = true
    error.value = null
    try {
      users.value = await usersApi.getUsers()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load users'
    } finally {
      loading.value = false
    }
  }

  async function loadUser(id: number) {
    loading.value = true
    error.value = null
    try {
      selectedUser.value = await usersApi.getUser(id)
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load user'
    } finally {
      loading.value = false
    }
  }

  async function updateUser(id: number, data: UserFormData) {
    loading.value = true
    error.value = null
    try {
      const updated = await usersApi.updateUser(id, data)
      const index = users.value.findIndex((u) => u.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...updated }
      }
      if (selectedUser.value?.id === id) {
        selectedUser.value = { ...selectedUser.value, ...updated }
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to update user'
      throw err
    } finally {
      loading.value = false
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSelectedUser(user: User | null) {
    selectedUser.value = user
  }

  return {
    users,
    selectedUser,
    loading,
    error,
    searchQuery,
    filteredUsers,
    loadUsers,
    loadUser,
    updateUser,
    setSearchQuery,
    setSelectedUser
  }
})

