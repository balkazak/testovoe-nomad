export interface Invoice {
  id: number
  number: string
  customer: string
  amount: number
  currency: string
  status: 'paid' | 'unpaid' | 'overdue'
  created_at: string
}

export type InvoiceSortField = 'number' | 'customer' | 'amount' | 'status' | 'created_at'
export type SortDirection = 'asc' | 'desc'

