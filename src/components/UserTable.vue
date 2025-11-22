<template>
  <div class="user-table">
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Email</th>
          <th>Компания</th>
          <th>Город</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="user-table__row"
          @click="$emit('select', user)"
        >
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.company.name }}</td>
          <td>{{ user.address.city }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '@/types/user'

defineProps<{
  users: User[]
}>()

defineEmits<{
  select: [user: User]
}>()
</script>

<style scoped>
.user-table {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

thead {
  background-color: #f8f9fa;
}

th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #dee2e6;
}

td {
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
}

.user-table__row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.user-table__row:hover {
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  table {
    font-size: 14px;
  }

  th,
  td {
    padding: 8px;
  }
}
</style>

