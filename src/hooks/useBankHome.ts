import { useState, useEffect } from 'react'
import { userApi } from '../services/api'

interface UserInfo {
  name: string
  account_number: string
  bank_name: string
  balance: number
}

interface RecentTransaction {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  description: string
  date: string
}

export const useBankHome = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const recentTransactions: RecentTransaction[] = [
    {
      id: '1',
      type: 'withdrawal',
      amount: 50000,
      description: '홍길동',
      date: '2025-08-03',
    },
    {
      id: '2',
      type: 'deposit',
      amount: 300000,
      description: '월급',
      date: '2025-08-01',
    },
    {
      id: '3',
      type: 'withdrawal',
      amount: 25000,
      description: '김철수',
      date: '2025-07-30',
    },
  ]

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true)
        const userInfoData = await userApi.getUserInfo()
        setUserInfo(userInfoData as UserInfo)
      } catch (error) {
        console.error('사용자 정보 로딩 실패:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    const month = d.getMonth() + 1
    const day = d.getDate()
    return `${month}/${day}`
  }

  return {
    userInfo,
    recentTransactions,
    loading,
    formatAmount,
    formatDate,
  }
}
