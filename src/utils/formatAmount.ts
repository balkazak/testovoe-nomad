export function formatAmount(amount: number, currency: string): string {
  const formatted = (amount / 100).toFixed(2)
  return `${formatted} ${currency}`
}

