import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Send,
  History,
  Bell,
  Settings,
  CreditCard,
  PiggyBank,
  TrendingUp,
  DollarSign,
} from 'lucide-react'
import { useBankHome } from '../hooks/useBankHome'

interface HomeProps {
  onNavigateToTransfer: () => void
  onNavigateToHistory: () => void
  onNavigateToExchange: () => void
  onNavigateToCardApplication: () => void
}

export default function BankHome({
  onNavigateToTransfer,
  onNavigateToHistory,
  onNavigateToExchange,
  onNavigateToCardApplication,
}: HomeProps) {
  const [showBalance] = useState(true)
  const { userInfo, recentTransactions, loading, formatAmount, formatDate } =
    useBankHome()

  const quickMenus = [
    {
      icon: <Send className="h-6 w-6 lg:h-7 lg:w-7" />,
      title: '송금',
      description: '계좌이체',
      onClick: onNavigateToTransfer,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: <History className="h-6 w-6 lg:h-7 lg:w-7" />,
      title: '입출금내역',
      description: '거래조회',
      onClick: onNavigateToHistory,
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: <DollarSign className="h-6 w-6 lg:h-7 lg:w-7" />,
      title: '환전',
      description: '외화환전',
      onClick: onNavigateToExchange,
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: <CreditCard className="h-6 w-6 lg:h-7 lg:w-7" />,
      title: '카드관리',
      description: '한도설정',
      onClick: () => {},
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: <CreditCard className="h-6 w-6 lg:h-7 lg:w-7" />,
      title: '체크카드',
      description: '신청하기',
      onClick: onNavigateToCardApplication,
      color: 'bg-indigo-100 text-indigo-600',
    },
    {
      icon: <PiggyBank className="h-6 w-6 lg:h-7 lg:w-7" />,
      title: '적금',
      description: '상품가입',
      onClick: () => {},
      color: 'bg-orange-100 text-orange-600',
    },
  ]
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  if (!userInfo) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">데이터를 불러올 수 없습니다.</div>
      </div>
    )
  }
  return (
    <div>
      {/* 헤더 */}
      <div className="bg-white shadow-sm">
        <div className="flex items-center justify-between p-4 lg:p-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
              {userInfo.name}
            </h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5 lg:h-6 lg:w-6" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-5 w-5 lg:h-6 lg:w-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-6 p-4 lg:p-6">
        {/* 계좌 잔액 카드 */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-6 lg:p-8">
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-sm text-blue-100 lg:text-base">내 계좌</p>
                <p className="text-lg font-semibold lg:text-xl">
                  {userInfo.bank_name}
                </p>
                <p className="text-xs text-blue-100 lg:text-sm">
                  {userInfo.account_number}
                </p>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-sm text-blue-100 lg:text-base">잔액</p>
              <p className="text-2xl font-bold lg:text-3xl">
                {showBalance
                  ? `${formatAmount(userInfo.balance)}원`
                  : '••••••••원'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 빠른 메뉴 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg lg:text-xl">빠른 서비스</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {quickMenus.map((menu, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={menu.onClick}
                  className="flex h-auto flex-col space-y-2 p-4 hover:bg-gray-50 lg:p-6"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full lg:h-14 lg:w-14 ${menu.color}`}
                  >
                    {menu.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900 lg:text-base">
                      {menu.title}
                    </p>
                    <p className="text-xs text-gray-500 lg:text-sm">
                      {menu.description}
                    </p>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 최근 거래 내역 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-lg lg:text-xl">최근 거래</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onNavigateToHistory}
              className="text-blue-600 hover:text-blue-700"
            >
              더보기
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map(transaction => (
              <div
                key={transaction.id}
                className="flex items-center justify-between rounded-lg bg-gray-50 p-3 lg:p-4"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12 ${
                      transaction.amount > 0
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {transaction.amount > 0 ? (
                      <TrendingUp className="h-5 w-5 lg:h-6 lg:w-6" />
                    ) : (
                      <Send className="h-5 w-5 lg:h-6 lg:w-6" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 lg:text-base">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500 lg:text-sm">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-sm font-semibold lg:text-base ${
                    transaction.amount > 0 ? 'text-blue-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  {formatAmount(Math.abs(transaction.amount))}원
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
