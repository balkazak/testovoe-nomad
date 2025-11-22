import { describe, it, expect } from 'vitest'
import { formatAmount } from '../formatAmount'

describe('formatAmount', () => {
  it('should format amount correctly', () => {
    expect(formatAmount(145000, 'KZT')).toBe('1450.00 KZT')
    expect(formatAmount(28990, 'KZT')).toBe('289.90 KZT')
    expect(formatAmount(500000, 'KZT')).toBe('5000.00 KZT')
  })

  it('should handle zero amount', () => {
    expect(formatAmount(0, 'KZT')).toBe('0.00 KZT')
  })

  it('should handle small amounts', () => {
    expect(formatAmount(100, 'KZT')).toBe('1.00 KZT')
    expect(formatAmount(50, 'KZT')).toBe('0.50 KZT')
  })

  it('should work with different currencies', () => {
    expect(formatAmount(100000, 'USD')).toBe('1000.00 USD')
    expect(formatAmount(100000, 'EUR')).toBe('1000.00 EUR')
  })
})

