import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    ArrowLeft,
    Calculator,
    RefreshCw,
    TrendingUp,
    TrendingDown,
    Info,
} from 'lucide-react'

interface ExchangeCalculatorProps {
    onNavigateBack: () => void
}

export default function ExchangeCalculator({ onNavigateBack }: ExchangeCalculatorProps) {
    const [amount, setAmount] = useState('')

    type CurrencyCode = 'USD' | 'EUR' | 'JPY' | 'GBP' | 'CNY' | 'KRW'

    interface CurrencyData {
        rate: number
        change: number
        name: string
    }

// 환율 데이터
    const exchangeRates: Record<CurrencyCode, CurrencyData> = {
        'USD': { rate: 1350.5, change: 2.3, name: '미국 달러' },
        'EUR': { rate: 1480.2, change: -1.5, name: '유로' },
        'JPY': { rate: 9.15, change: 0.25, name: '일본 엔' },
        'GBP': { rate: 1720.8, change: -3.2, name: '영국 파운드' },
        'CNY': { rate: 185.4, change: 1.8, name: '중국 위안' },
        'KRW': { rate: 1, change: 0, name: '한국 원' }
    }

// state 타입도 수정
    const [fromCurrency, setFromCurrency] = useState<CurrencyCode>('KRW')
    const [toCurrency, setToCurrency] = useState<CurrencyCode>('USD')


    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount)
    }

    const calculateExchange = () => {
        if (!amount) return 0
        const fromRate = exchangeRates[fromCurrency]?.rate ?? 1
        const toRate = exchangeRates[toCurrency]?.rate ?? 1

        if (fromCurrency === 'KRW') {
            return parseFloat(amount) / toRate
        } else if (toCurrency === 'KRW') {
            return parseFloat(amount) * fromRate
        } else {
            // 외화 간 환전
            const krwAmount = parseFloat(amount) * fromRate
            return krwAmount / toRate
        }
    }

    const getExchangeRate = () => {
        if (fromCurrency === toCurrency) return 1

        const fromRate = exchangeRates[fromCurrency]?.rate ?? 1
        const toRate = exchangeRates[toCurrency]?.rate ?? 1

        if (fromCurrency === 'KRW') {
            return 1 / toRate
        } else if (toCurrency === 'KRW') {
            return fromRate
        } else {
            return fromRate / toRate
        }
    }

    const getRateChange = () => {
        const toCurrencyData = exchangeRates[toCurrency]
        return toCurrencyData?.change ?? 0
    }

    const currencies = Object.entries(exchangeRates).map(([code, data]) => ({
        code,
        name: data.name
    }))

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
                    <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">환율계산기</h1>
                    <div className="w-6"></div>
                </div>
            </div>

            <div className="space-y-6 p-4 lg:p-6">
                {/* 환율 계산기 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                            <Calculator className="h-5 w-5 text-blue-600" />
                            <span>실시간 환율계산</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="amount">환전 금액</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="환전할 금액을 입력하세요"
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="text-lg"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>보내는 통화</Label>
                                <select
                                    value={fromCurrency}
                                    onChange={e => setFromCurrency(e.target.value as CurrencyCode)}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    {currencies.map(currency => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.code} ({currency.name})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>받는 통화</Label>
                                <select
                                    value={toCurrency}
                                    onChange={e => setToCurrency(e.target.value as CurrencyCode)}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
                                >
                                    {currencies.map(currency => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.code} ({currency.name})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* 환율 정보 */}
                        <div className="rounded-lg bg-gray-50 p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-600">현재 환율</p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        1 {fromCurrency} = {getExchangeRate().toFixed(4)} {toCurrency}
                                    </p>
                                </div>
                                <div className="flex items-center space-x-1">
                                    {getRateChange() > 0 ? (
                                        <TrendingUp className="h-4 w-4 text-red-500" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4 text-blue-500" />
                                    )}
                                    <span className={`text-sm ${getRateChange() > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                    {getRateChange() > 0 ? '+' : ''}{getRateChange().toFixed(2)}%
                  </span>
                                </div>
                            </div>
                        </div>

                        {/* 계산 결과 */}
                        {amount && (
                            <div className="rounded-lg bg-blue-50 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">환전 결과</p>
                                        <p className="text-xl font-bold text-blue-900">
                                            {formatAmount(calculateExchange())} {toCurrency}
                                        </p>
                                    </div>
                                    <Calculator className="h-8 w-8 text-blue-600" />
                                </div>
                                <p className="mt-2 text-xs text-gray-500">
                                    {formatAmount(parseFloat(amount))} {fromCurrency} → {formatAmount(calculateExchange())} {toCurrency}
                                </p>
                            </div>
                        )}

                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    const temp = fromCurrency
                                    setFromCurrency(toCurrency)
                                    setToCurrency(temp)
                                }}
                                className="flex-1"
                            >
                                <RefreshCw className="mr-2 h-4 w-4" />
                                통화 바꾸기
                            </Button>
                            <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                                환전 신청
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 주요 환율 정보 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">주요 환율 정보</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Object.entries(exchangeRates)
                            .filter(([code]) => code !== 'KRW')
                            .map(([code, data]) => (
                                <div
                                    key={code}
                                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            {data.name} ({code})
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            1 {code} = {data.rate.toFixed(2)} KRW
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold text-gray-900">
                                            {data.rate.toFixed(2)}원
                                        </p>
                                        <div className="flex items-center justify-end space-x-1">
                                            {data.change > 0 ? (
                                                <TrendingUp className="h-3 w-3 text-red-500" />
                                            ) : (
                                                <TrendingDown className="h-3 w-3 text-blue-500" />
                                            )}
                                            <span className={`text-xs ${data.change > 0 ? 'text-red-500' : 'text-blue-500'}`}>
                        {data.change > 0 ? '+' : ''}{data.change.toFixed(2)}%
                      </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </CardContent>
                </Card>

                {/* 계산기 안내 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                            <Info className="h-5 w-5 text-blue-600" />
                            <span>계산기 안내</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                        <p>• 환율은 실시간으로 업데이트됩니다.</p>
                        <p>• 실제 환전 시 우대율이 적용될 수 있습니다.</p>
                        <p>• 환전 수수료는 별도로 부과됩니다.</p>
                        <p>• 계산 결과는 참고용이며 실제 환전 금액과 다를 수 있습니다.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}