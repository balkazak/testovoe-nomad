<template>
  <div class="invoices-page">
    <div class="invoices-page__header">
      <h1>Счета</h1>
      <AppButton :disabled="loading" @click="handleRefresh">
        Обновить
      </AppButton>
    </div>

    <div class="invoices-page__search">
      <AppInput
        v-model="searchQuery"
        placeholder="Поиск по номеру или клиенту..."
        @update:modelValue="store.setSearchQuery"
      />
    </div>

    <ErrorMessage :message="store.error" />

    <LoadingSpinner v-if="loading && !store.filteredAndSortedInvoices.length" message="Загрузка счетов..." />

    <div v-else-if="store.filteredAndSortedInvoices.length" class="invoices-page__content">
      <div class="invoices-table">
        <table>
          <thead>
            <tr>
              <th @click="handleSort('number')" class="invoices-table__sortable">
                Номер
                <span v-if="store.sortField === 'number'">
                  {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="handleSort('customer')" class="invoices-table__sortable">
                Клиент
                <span v-if="store.sortField === 'customer'">
                  {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="handleSort('amount')" class="invoices-table__sortable">
                Сумма
                <span v-if="store.sortField === 'amount'">
                  {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="handleSort('status')" class="invoices-table__sortable">
                Статус
                <span v-if="store.sortField === 'status'">
                  {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th @click="handleSort('created_at')" class="invoices-table__sortable">
                Дата
                <span v-if="store.sortField === 'created_at'">
                  {{ store.sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="invoice in store.filteredAndSortedInvoices"
              :key="invoice.id"
            >
              <td>{{ invoice.number }}</td>
              <td>{{ invoice.customer }}</td>
              <td>{{ formatAmount(invoice.amount, invoice.currency) }}</td>
              <td>
                <span :class="['status-badge', `status-badge--${invoice.status}`]">
                  {{ getStatusLabel(invoice.status) }}
                </span>
              </td>
              <td>{{ formatDate(invoice.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-else class="invoices-page__empty">
      <p>Счета не найдены</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useInvoicesStore } from '@/store/invoices'
import AppButton from '@/components/AppButton.vue'
import AppInput from '@/components/AppInput.vue'
import LoadingSpinner from '@/components/LoadingSpinner.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import { formatAmount } from '@/utils/formatAmount'
import type { InvoiceSortField } from '@/types/invoice'

const store = useInvoicesStore()
const searchQuery = ref('')

const loading = computed(() => store.loading)

onMounted(() => {
  store.loadInvoices()
})

function handleRefresh() {
  store.loadInvoices()
}

function handleSort(field: InvoiceSortField) {
  store.setSort(field)
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    paid: 'Оплачен',
    unpaid: 'Не оплачен',
    overdue: 'Просрочен'
  }
  return labels[status] || status
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.invoices-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.invoices-page__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.invoices-page__header h1 {
  margin: 0;
  font-size: 28px;
}

.invoices-page__search {
  margin-bottom: 24px;
}

.invoices-page__content {
  margin-top: 24px;
}

.invoices-page__empty {
  text-align: center;
  padding: 40px;
  color: #666;
}

.invoices-table {
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

.invoices-table__sortable {
  cursor: pointer;
  user-select: none;
  position: relative;
}

.invoices-table__sortable:hover {
  background-color: #e9ecef;
}

.invoices-table__sortable span {
  margin-left: 4px;
  color: #007bff;
}

.status-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge--paid {
  background-color: #d4edda;
  color: #155724;
}

.status-badge--unpaid {
  background-color: #fff3cd;
  color: #856404;
}

.status-badge--overdue {
  background-color: #f8d7da;
  color: #721c24;
}

@media (max-width: 768px) {
  .invoices-page {
    padding: 16px;
  }

  .invoices-page__header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  table {
    font-size: 14px;
  }

  th,
  td {
    padding: 8px;
  }
}
</style>

