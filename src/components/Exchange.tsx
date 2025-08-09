import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Euro,
  History,
  Calculator,
  Info,
  Bell,
  ChevronRight,
} from 'lucide-react'

interface ExchangeProps {
  onNavigateBack: () => void
  onNavigateToCalculator: () => void
  onNavigateToAlerts: () => void
}

interface ExchangeRate {
  currency: string
  code: string
  rate: number
  change: number
  icon: React.ReactNode
}

export default function Exchange({
                                   onNavigateBack,
                                   onNavigateToCalculator,
                                   onNavigateToAlerts
                                 }: ExchangeProps) {
  const exchangeRates: ExchangeRate[] = [
    {
      currency: '미국 달러',
      code: 'USD',
      rate: 1350.5,
      change: 2.3,
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      currency: '유로',
      code: 'EUR',
      rate: 1480.2,
      change: -1.5,
      icon: <Euro className="h-5 w-5" />,
    },
    {
      currency: '일본 엔',
      code: 'JPY',
      rate: 9.15,
      change: 0.25,
      icon: <Euro className="h-5 w-5" />,
    },
    {
      currency: '영국 파운드',
      code: 'GBP',
      rate: 1720.8,
      change: -3.2,
      icon: <Euro className="h-5 w-5" />,
    },
  ]

  const exchangeHistory = [
    {
      id: '1',
      from: 'KRW',
      to: 'USD',
      amount: 1000000,
      rate: 1350.5,
      date: '2024-01-15',
      status: 'completed',
    },
    {
      id: '2',
      from: 'USD',
      to: 'KRW',
      amount: 500,
      rate: 1352.3,
      date: '2024-01-10',
      status: 'completed',
    },
    {
      id: '3',
      from: 'KRW',
      to: 'EUR',
      amount: 500000,
      rate: 1480.2,
      date: '2024-01-05',
      status: 'completed',
    },
  ]

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
  }

  const exchangeServices = [
    {
      title: "환율계산기",
      description: "실시간 환율로 계산",
      icon: <Calculator className="h-6 w-6" />,
      color: "bg-blue-100 text-blue-600",
      onClick: onNavigateToCalculator
    },
    {
      title: "환율알림설정",
      description: "원하는 환율 알림",
      icon: <Bell className="h-6 w-6" />,
      color: "bg-green-100 text-green-600",
      onClick: onNavigateToAlerts
    }
  ]

  return (
      <div>
        {/* 헤더 */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <Button
                variant="ghost"
                size="sm"
                onClick={onNavigateBack}
                className="p-0"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">환전</h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="space-y-6 p-4 lg:p-6">
          {/* 환율 정보 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg lg:text-xl">실시간 환율</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {exchangeRates.map(rate => (
                  <div
                      key={rate.code}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 lg:p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 lg:h-12 lg:w-12">
                        {rate.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 lg:text-base">
                          {rate.currency}
                        </p>
                        <p className="text-xs text-gray-500 lg:text-sm">
                          {rate.code}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 lg:text-base">
                        {rate.rate.toFixed(2)}원
                      </p>
                      <div className="flex items-center space-x-1">
                        {rate.change > 0 ? (
                            <TrendingUp className="h-3 w-3 text-red-500" />
                        ) : (
                            <TrendingDown className="h-3 w-3 text-blue-500" />
                        )}
                        <p
                            className={`text-xs lg:text-sm ${
                                rate.change > 0 ? 'text-red-500' : 'text-blue-500'
                            }`}
                        >
                          {rate.change > 0 ? '+' : ''}
                          {rate.change.toFixed(2)}%
                        </p>
                      </div>
                    </div>
                  </div>
              ))}
            </CardContent>
          </Card>

          {/* 환전 서비스 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg lg:text-xl">환전 서비스</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {exchangeServices.map((service, index) => (
                    <Button
                        key={index}
                        variant="ghost"
                        onClick={service.onClick}
                        className="flex h-auto flex-col space-y-3 p-4 hover:bg-gray-50"
                    >
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${service.color}`}>
                        {service.icon}
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-900">
                          {service.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.description}
                        </p>
                      </div>
                    </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 환전 신청 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg lg:text-xl">환전 신청</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">외화 환전</p>
                      <p className="text-xs text-blue-700">은행 방문 또는 온라인 신청</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-blue-600" />
                  </div>
                </div>

                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  환전 신청하기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 환전 내역 */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-lg lg:text-xl">환전 내역</CardTitle>
              <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-700"
              >
                더보기
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {exchangeHistory.map(history => (
                  <div
                      key={history.id}
                      className="flex items-center justify-between rounded-lg bg-gray-50 p-3 lg:p-4"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 lg:h-12 lg:w-12">
                        <History className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 lg:text-base">
                          {history.from} → {history.to}
                        </p>
                        <p className="text-xs text-gray-500 lg:text-sm">
                          {history.date}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900 lg:text-base">
                        {formatAmount(history.amount)} {history.from}
                      </p>
                      <p className="text-xs text-gray-500 lg:text-sm">
                        환율: {history.rate.toFixed(2)}원
                      </p>
                    </div>
                  </div>
              ))}
            </CardContent>
          </Card>

          {/* 환전 안내 */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                <Info className="h-5 w-5 text-blue-600" />
                <span>환전 안내</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>• 환전은 평일 오전 9시 ~ 오후 3시까지 가능합니다.</p>
              <p>• 최소 환전 금액은 10,000원입니다.</p>
              <p>• 환전 수수료는 0.1%입니다.</p>
              <p>• 환전 신청 후 1-2일 내에 처리됩니다.</p>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}