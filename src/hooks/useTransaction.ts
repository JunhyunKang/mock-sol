import { useState, useMemo } from 'react'
import { MOCK_TRANSACTIONS } from '../types/transaction'
import type { TransactionFilter } from '../types/transaction'

const today = new Date().toISOString().split('T')[0]
const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split('T')[0]

export const useTransaction = () => {
  const [filter, setFilter] = useState<TransactionFilter>({
    sortOrder: 'latest',
    type: 'all',
    startDate: oneMonthAgo,
    endDate: today,
  })

  const filteredTransactions = useMemo(() => {
    let filtered = [...MOCK_TRANSACTIONS]

    // 날짜 필터링
    filtered = filtered.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      const startDate = new Date(filter.startDate)
      const endDate = new Date(filter.endDate)
      return transactionDate >= startDate && transactionDate <= endDate
    })

    // 타입 필터링
    if (filter.type !== 'all') {
      filtered = filtered.filter(
        transaction => transaction.type === filter.type,
      )
    }

    // 정렬
    filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`)
      const dateB = new Date(`${b.date} ${b.time}`)

      if (filter.sortOrder === 'latest') {
        return dateB.getTime() - dateA.getTime()
      } else {
        return dateA.getTime() - dateB.getTime()
      }
    })

    return filtered
  }, [filter])

  const updateFilter = (updates: Partial<TransactionFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }))
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${month}/${day}`
  }

  const getTransactionStats = () => {
    const deposits = filteredTransactions
      .filter(t => t.type === 'deposit')
      .reduce((sum, t) => sum + t.amount, 0)

    const withdrawals = filteredTransactions
      .filter(t => t.type === 'withdrawal')
      .reduce((sum, t) => sum + t.amount, 0)

    return { deposits, withdrawals, total: deposits - withdrawals }
  }

  return {
    transactions: filteredTransactions,
    filter,
    updateFilter,
    formatAmount,
    formatDate,
    getTransactionStats,
  }
}
