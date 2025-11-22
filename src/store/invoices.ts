import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { fetchInvoices } from '@/services/invoices'
import type { Invoice, InvoiceSortField, SortDirection } from '@/types/invoice'

export const useInvoicesStore = defineStore('invoices', () => {
  const invoices = ref<Invoice[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const searchQuery = ref('')
  const sortField = ref<InvoiceSortField | null>(null)
  const sortDirection = ref<SortDirection>('asc')

  const filteredAndSortedInvoices = computed(() => {
    let result = [...invoices.value]

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(
        (invoice) =>
          invoice.number.toLowerCase().includes(query) ||
          invoice.customer.toLowerCase().includes(query)
      )
    }

    if (sortField.value) {
      result.sort((a, b) => {
        const aValue = a[sortField.value!]
        const bValue = b[sortField.value!]

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection.value === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
        }

        return 0
      })
    }

    return result
  })

  async function loadInvoices() {
    loading.value = true
    error.value = null
    try {
      invoices.value = await fetchInvoices()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to load invoices'
    } finally {
      loading.value = false
    }
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function setSort(field: InvoiceSortField) {
    if (sortField.value === field) {
      sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortDirection.value = 'asc'
    }
  }

  return {
    invoices,
    loading,
    error,
    searchQuery,
    sortField,
    sortDirection,
    filteredAndSortedInvoices,
    loadInvoices,
    setSearchQuery,
    setSort
  }
})

