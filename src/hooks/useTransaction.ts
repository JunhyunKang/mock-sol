import { useState, useMemo, useEffect } from 'react'
import { MOCK_TRANSACTIONS } from '../types/transaction'
import type { TransactionFilter, Transaction } from '../types/transaction'

const today = new Date().toISOString().split('T')[0]
const oneMonthAgo = new Date(Date.now() - 1 * 12 * 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split('T')[0]

interface UseTransactionProps {
  appliedFilter?: {
    merchant?: string | null
    recipient?: string | null
    type?: string
    transactions?: Transaction[]
  }
}

export const useTransaction = (props?: UseTransactionProps) => {
  const [filter, setFilter] = useState<TransactionFilter>({
    sortOrder: 'latest',
    type: 'all',
    startDate: oneMonthAgo,
    endDate: today,
  })

  const [baseTransactions, setBaseTransactions] = useState(MOCK_TRANSACTIONS)
  const [searchApplied, setSearchApplied] = useState(false)

  // 외부에서 전달받은 필터나 거래내역 적용
  useEffect(() => {
    if (props?.appliedFilter) {
      const { merchant, recipient, type, transactions } = props.appliedFilter

      // 특정 거래내역이 전달된 경우 (검색 결과)
      if (transactions && transactions.length > 0) {
        setBaseTransactions(transactions)
        setSearchApplied(true)
      }

      // 필터 조건 적용
      const newFilter: Partial<TransactionFilter> = {}

      if (type && type !== 'all') {
        newFilter.type = type as 'all' | 'deposit' | 'withdrawal'
      }

      if (Object.keys(newFilter).length > 0) {
        setFilter(prev => ({ ...prev, ...newFilter }))
      }

      // 추가 정보 표시를 위한 상태 (UI에서 활용 가능)
      if (merchant || recipient) {
        setSearchApplied(true)
      }
    }
  }, [props?.appliedFilter])

  const filteredTransactions = useMemo(() => {
    let filtered = [...baseTransactions]

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
  }, [filter, baseTransactions])

  const updateFilter = (updates: Partial<TransactionFilter>) => {
    setFilter(prev => ({ ...prev, ...updates }))
  }

  const resetToDefault = () => {
    setBaseTransactions(MOCK_TRANSACTIONS)
    setSearchApplied(false)
    setFilter({
      sortOrder: 'latest',
      type: 'all',
      startDate: oneMonthAgo,
      endDate: today,
    })
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

  const getFilterSummary = () => {
    const summaryParts = []

    if (props?.appliedFilter?.merchant) {
      summaryParts.push(`가맹점: ${props.appliedFilter.merchant}`)
    }

    if (props?.appliedFilter?.recipient) {
      summaryParts.push(`받는분: ${props.appliedFilter.recipient}`)
    }

    if (filter.type !== 'all') {
      summaryParts.push(`타입: ${filter.type === 'deposit' ? '입금' : '출금'}`)
    }

    return summaryParts.length > 0 ? summaryParts.join(', ') : null
  }

  return {
    transactions: filteredTransactions,
    filter,
    updateFilter,
    formatAmount,
    formatDate,
    searchApplied,
    resetToDefault,
    getFilterSummary,
    appliedFilter: props?.appliedFilter || null,
  }
}