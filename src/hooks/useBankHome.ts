import { useState, useEffect } from 'react'
import {searchApi, userApi} from '../services/api'
import type {SearchResponse} from "@/types/search.ts";

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
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)

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

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      setSearchLoading(true)
      const result: SearchResponse = await searchApi.search(searchQuery)
      console.log('검색 결과:', result)

      // 검색 결과에 따른 액션 처리
      if (result.action_type === 'transfer') {
        // 송금 화면으로 이동 로직
        alert(`송금 액션: ${result.message}`)
      } else if (result.action_type === 'search') {
        // 검색 결과 화면으로 이동 로직
        alert(`검색 액션: ${result.message}`)
      } else if (result.action_type === 'menu') {
        // 메뉴 화면으로 이동 로직
        alert(`메뉴 액션: ${result.message}`)
      } else {
        alert(result.message || '검색 결과가 없습니다.')
      }

      // 검색 후 초기화
      setSearchQuery('')
      setShowSearch(false)
    } catch (error) {
      console.error('검색 실패:', error)
      alert('검색 중 오류가 발생했습니다.')
    } finally {
      setSearchLoading(false)
    }
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

  return {
    userInfo,
    recentTransactions,
    loading,
    showSearch,
    searchQuery,
    searchLoading,
    setShowSearch,
    setSearchQuery,
    handleSearch,
    formatAmount,
    formatDate,
  }
}
