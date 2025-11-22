import type { Invoice } from '@/types/invoice'

export async function fetchInvoices(): Promise<Invoice[]> {
  const response = await fetch('/data/invoices.json')
  if (!response.ok) {
    throw new Error(`Failed to load invoices: ${response.statusText}`)
  }
  return response.json()
}

