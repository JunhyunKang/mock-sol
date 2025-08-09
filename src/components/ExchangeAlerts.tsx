import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    ArrowLeft,
    Bell,
    Plus,
    Trash2,
    TrendingUp,
    TrendingDown,
    Info,
} from 'lucide-react'

interface ExchangeAlertsProps {
    onNavigateBack: () => void
}

interface Alert {
    id: string
    currency: string
    targetRate: number
    currentRate: number
    condition: 'above' | 'below'
    isActive: boolean
    createdDate: string
}

export default function ExchangeAlerts({ onNavigateBack }: ExchangeAlertsProps) {
    const [alerts, setAlerts] = useState<Alert[]>([
        {
            id: '1',
            currency: 'USD',
            targetRate: 1300,
            currentRate: 1350.5,
            condition: 'below',
            isActive: true,
            createdDate: '2025-01-15'
        },
        {
            id: '2',
            currency: 'EUR',
            targetRate: 1500,
            currentRate: 1480.2,
            condition: 'above',
            isActive: false,
            createdDate: '2025-01-10'
        }
    ])

    const [showAddAlert, setShowAddAlert] = useState(false)
    const [newAlert, setNewAlert] = useState({
        currency: 'USD',
        targetRate: '',
        condition: 'below' as 'above' | 'below'
    })

    const currencies = [
        { code: 'USD', name: '미국 달러', rate: 1350.5 },
        { code: 'EUR', name: '유로', rate: 1480.2 },
        { code: 'JPY', name: '일본 엔', rate: 9.15 },
        { code: 'GBP', name: '영국 파운드', rate: 1720.8 },
        { code: 'CNY', name: '중국 위안', rate: 185.4 }
    ]

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount)
    }

    const getCurrentRate = (currency: string) => {
        const currencyData = currencies.find(c => c.code === currency)
        return currencyData?.rate ?? 0
    }

    const getCurrencyName = (currency: string) => {
        const currencyData = currencies.find(c => c.code === currency)
        return currencyData?.name ?? currency
    }

    const handleAddAlert = () => {
        if (!newAlert.targetRate) return

        const alert: Alert = {
            id: Date.now().toString(),
            currency: newAlert.currency,
            targetRate: parseFloat(newAlert.targetRate),
            currentRate: getCurrentRate(newAlert.currency),
            condition: newAlert.condition,
            isActive: true,
            createdDate: new Date().toISOString().split('T')[0]
        }

        setAlerts([...alerts, alert])
        setNewAlert({ currency: 'USD', targetRate: '', condition: 'below' })
        setShowAddAlert(false)
    }

    const toggleAlert = (id: string) => {
        setAlerts(alerts.map(alert =>
            alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
        ))
    }

    const deleteAlert = (id: string) => {
        setAlerts(alerts.filter(alert => alert.id !== id))
    }

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
                    <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">환율 알림</h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowAddAlert(true)}
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="space-y-6 p-4 lg:p-6">
                {/* 현재 환율 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">현재 환율</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {currencies.map(currency => (
                            <div
                                key={currency.code}
                                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {currency.name} ({currency.code})
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        1 {currency.code} = {currency.rate} KRW
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {formatAmount(currency.rate)}원
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* 알림 목록 */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-3">
                        <CardTitle className="text-lg lg:text-xl">설정된 알림</CardTitle>
                        <Button
                            onClick={() => setShowAddAlert(true)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            <Plus className="mr-1 h-4 w-4" />
                            알림 추가
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {alerts.length === 0 ? (
                            <div className="text-center py-8">
                                <Bell className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-500">설정된 알림이 없습니다.</p>
                                <Button
                                    onClick={() => setShowAddAlert(true)}
                                    variant="outline"
                                    className="mt-4"
                                >
                                    첫 번째 알림 추가하기
                                </Button>
                            </div>
                        ) : (
                            alerts.map(alert => (
                                <div
                                    key={alert.id}
                                    className={`rounded-lg border-2 p-4 ${
                                        alert.isActive
                                            ? 'border-blue-200 bg-blue-50'
                                            : 'border-gray-200 bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <h3 className="font-medium text-gray-900">
                                                    {getCurrencyName(alert.currency)} ({alert.currency})
                                                </h3>
                                                <span className={`px-2 py-1 rounded-full text-xs ${
                                                    alert.isActive
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                          {alert.isActive ? '활성' : '비활성'}
                        </span>
                                            </div>
                                            <div className="mt-1 flex items-center space-x-2 text-sm text-gray-600">
                                                {alert.condition === 'below' ? (
                                                    <TrendingDown className="h-4 w-4 text-blue-500" />
                                                ) : (
                                                    <TrendingUp className="h-4 w-4 text-red-500" />
                                                )}
                                                <span>
                          {formatAmount(alert.targetRate)}원 {alert.condition === 'below' ? '이하' : '이상'} 시 알림
                        </span>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                현재: {formatAmount(alert.currentRate)}원 | 설정일: {alert.createdDate}
                                            </p>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => toggleAlert(alert.id)}
                                            >
                                                <Bell className={`h-4 w-4 ${alert.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteAlert(alert.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* 알림 추가 폼 */}
                {showAddAlert && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg lg:text-xl">새 알림 추가</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>통화</Label>
                                <select
                                    value={newAlert.currency}
                                    onChange={e => setNewAlert({ ...newAlert, currency: e.target.value })}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    {currencies.map(currency => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.name} ({currency.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>조건</Label>
                                <select
                                    value={newAlert.condition}
                                    onChange={e => setNewAlert({ ...newAlert, condition: e.target.value as 'above' | 'below' })}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="below">이하일 때</option>
                                    <option value="above">이상일 때</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>목표 환율</Label>
                                <div className="relative">
                                    <Input
                                        type="number"
                                        placeholder="목표 환율을 입력하세요"
                                        value={newAlert.targetRate}
                                        onChange={e => setNewAlert({ ...newAlert, targetRate: e.target.value })}
                                        className="pr-8"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    원
                  </span>
                                </div>
                                <p className="text-xs text-gray-500">
                                    현재 환율: {formatAmount(getCurrentRate(newAlert.currency))}원
                                </p>
                            </div>

                            <div className="flex space-x-3 pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowAddAlert(false)}
                                    className="flex-1"
                                >
                                    취소
                                </Button>
                                <Button
                                    onClick={handleAddAlert}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                    disabled={!newAlert.targetRate}
                                >
                                    알림 추가
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* 알림 안내 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                            <Info className="h-5 w-5 text-blue-600" />
                            <span>알림 안내</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                        <p>• 환율 알림은 실시간으로 확인되어 푸시 알림으로 발송됩니다.</p>
                        <p>• 한 번 발송된 알림은 환율이 다시 변동될 때까지 재발송되지 않습니다.</p>
                        <p>• 최대 10개까지 알림을 설정할 수 있습니다.</p>
                        <p>• 알림 설정은 언제든지 수정하거나 삭제할 수 있습니다.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}