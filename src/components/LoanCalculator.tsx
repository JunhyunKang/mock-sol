import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    ArrowLeft,
    Calculator,
    TrendingUp,
    PieChart,
    BarChart3,
    Info,
    RefreshCw,
} from 'lucide-react'

interface LoanCalculatorProps {
    onNavigateBack: () => void
}

export default function LoanCalculator({ onNavigateBack }: LoanCalculatorProps) {
    const [loanAmount, setLoanAmount] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [loanPeriod, setLoanPeriod] = useState('')
    const [repaymentType, setRepaymentType] = useState('equal') // equal: 원리금균등, principal: 원금균등

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(Math.round(amount))
    }

    // 원리금균등상환 계산
    const calculateEqualPayment = () => {
        if (!loanAmount || !interestRate || !loanPeriod) return null

        const principal = parseFloat(loanAmount)
        const monthlyRate = parseFloat(interestRate) / 100 / 12
        const months = parseInt(loanPeriod) * 12

        if (monthlyRate === 0) {
            return {
                monthlyPayment: principal / months,
                totalPayment: principal,
                totalInterest: 0
            }
        }

        const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
        const totalPayment = monthlyPayment * months
        const totalInterest = totalPayment - principal

        return {
            monthlyPayment,
            totalPayment,
            totalInterest
        }
    }

    // 원금균등상환 계산
    const calculatePrincipalPayment = () => {
        if (!loanAmount || !interestRate || !loanPeriod) return null

        const principal = parseFloat(loanAmount)
        const monthlyRate = parseFloat(interestRate) / 100 / 12
        const months = parseInt(loanPeriod) * 12

        const monthlyPrincipal = principal / months
        const firstMonthInterest = principal * monthlyRate
        const firstMonthPayment = monthlyPrincipal + firstMonthInterest
        const lastMonthPayment = monthlyPrincipal + (monthlyPrincipal * monthlyRate)
        const totalInterest = monthlyPrincipal * monthlyRate * (months + 1) / 2 * months
        const totalPayment = principal + totalInterest

        return {
            firstMonthPayment,
            lastMonthPayment,
            monthlyPrincipal,
            totalPayment,
            totalInterest
        }
    }

    const getCalculationResult = () => {
        if (repaymentType === 'equal') {
            return calculateEqualPayment()
        } else {
            return calculatePrincipalPayment()
        }
    }

    const result = getCalculationResult()

    const clearAll = () => {
        setLoanAmount('')
        setInterestRate('')
        setLoanPeriod('')
    }

    const loanTypes = [
        { name: '주택담보대출', rate: '3.2 ~ 4.5%', description: '주택 구매 시' },
        { name: '신용대출', rate: '4.8 ~ 15.0%', description: '무담보 대출' },
        { name: '전세자금대출', rate: '3.0 ~ 4.2%', description: '전세 보증금' },
        { name: '자동차대출', rate: '5.5 ~ 8.9%', description: '자동차 구매' }
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
                    <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">대출이자계산기</h1>
                    <div className="w-6"></div>
                </div>
            </div>

            <div className="space-y-6 p-4 lg:p-6">
                {/* 계산기 입력 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                            <Calculator className="h-5 w-5 text-blue-600" />
                            <span>대출 조건 입력</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="loanAmount">대출금액 (원)</Label>
                            <Input
                                id="loanAmount"
                                type="number"
                                placeholder="예: 200000000"
                                value={loanAmount}
                                onChange={e => setLoanAmount(e.target.value)}
                                className="text-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="interestRate">연 이자율 (%)</Label>
                            <Input
                                id="interestRate"
                                type="number"
                                step="0.1"
                                placeholder="예: 3.5"
                                value={interestRate}
                                onChange={e => setInterestRate(e.target.value)}
                                className="text-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="loanPeriod">대출기간 (년)</Label>
                            <Input
                                id="loanPeriod"
                                type="number"
                                placeholder="예: 20"
                                value={loanPeriod}
                                onChange={e => setLoanPeriod(e.target.value)}
                                className="text-lg"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>상환방식</Label>
                            <div className="grid grid-cols-2 gap-2">
                                <Button
                                    variant={repaymentType === 'equal' ? 'default' : 'outline'}
                                    onClick={() => setRepaymentType('equal')}
                                    className="text-sm"
                                >
                                    원리금균등상환
                                </Button>
                                <Button
                                    variant={repaymentType === 'principal' ? 'default' : 'outline'}
                                    onClick={() => setRepaymentType('principal')}
                                    className="text-sm"
                                >
                                    원금균등상환
                                </Button>
                            </div>
                            <p className="text-xs text-gray-500">
                                {repaymentType === 'equal'
                                    ? '매월 동일한 금액을 상환하는 방식'
                                    : '매월 원금은 동일하고 이자가 줄어드는 방식'}
                            </p>
                        </div>

                        <Button
                            onClick={clearAll}
                            variant="outline"
                            className="w-full"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            초기화
                        </Button>
                    </CardContent>
                </Card>

                {/* 계산 결과 */}
                {result && (
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                                <BarChart3 className="h-5 w-5 text-green-600" />
                                <span>계산 결과</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {repaymentType === 'equal' ? (
                                <div className="space-y-3">
                                    <div className="rounded-lg bg-blue-50 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm text-gray-600">월 상환액</p>
                                                <p className="text-2xl font-bold text-blue-900">
                                                    {formatAmount('monthlyPayment' in result ? result.monthlyPayment : 0)}원
                                                </p>
                                            </div>
                                            <TrendingUp className="h-8 w-8 text-blue-600" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-sm text-gray-600">총 상환액</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {formatAmount(result.totalPayment)}원
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-sm text-gray-600">총 이자</p>
                                            <p className="text-lg font-semibold text-red-600">
                                                {formatAmount(result.totalInterest)}원
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-blue-50 p-3">
                                            <p className="text-sm text-gray-600">첫 회 상환액</p>
                                            <p className="text-lg font-bold text-blue-900">
                                                {formatAmount('firstMonthPayment' in result ? result.firstMonthPayment : 0)}원
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-green-50 p-3">
                                            <p className="text-sm text-gray-600">마지막 회 상환액</p>
                                            <p className="text-lg font-bold text-green-900">
                                                {formatAmount('lastMonthPayment' in result ? result.lastMonthPayment : 0)}원
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <p className="text-sm text-gray-600">월 원금상환액</p>
                                        <p className="text-lg font-semibold text-gray-900">
                                            {formatAmount('monthlyPrincipal' in result ? result.monthlyPrincipal : 0)}원
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-sm text-gray-600">총 상환액</p>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {formatAmount(result.totalPayment)}원
                                            </p>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-3">
                                            <p className="text-sm text-gray-600">총 이자</p>
                                            <p className="text-lg font-semibold text-red-600">
                                                {formatAmount(result.totalInterest)}원
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 상환 비율 */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">원금 대비 이자 비율</span>
                                    <span className="font-medium">
                    {((result.totalInterest / parseFloat(loanAmount)) * 100).toFixed(1)}%
                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div className="flex h-3 rounded-full overflow-hidden">
                                        <div
                                            className="bg-blue-600"
                                            style={{ width: `${(parseFloat(loanAmount) / result.totalPayment) * 100}%` }}
                                        ></div>
                                        <div
                                            className="bg-red-500"
                                            style={{ width: `${(result.totalInterest / result.totalPayment) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-xs text-gray-500">
                                    <span>원금: {formatAmount(parseFloat(loanAmount))}원</span>
                                    <span>이자: {formatAmount(result.totalInterest)}원</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* 대출 상품 금리 정보 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                            <PieChart className="h-5 w-5 text-purple-600" />
                            <span>대출 상품별 금리</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {loanTypes.map((loan, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {loan.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {loan.description}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">
                                        {loan.rate}
                                    </p>
                                    <p className="text-xs text-gray-500">연이율</p>
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
                        <p>• <strong>원리금균등상환:</strong> 매월 동일한 금액을 상환하여 계획적인 관리가 가능합니다.</p>
                        <p>• <strong>원금균등상환:</strong> 초기 상환 부담이 크지만 총 이자 부담이 적습니다.</p>
                        <p>• 실제 대출 조건은 신용도, 담보가치 등에 따라 달라질 수 있습니다.</p>
                        <p>• 계산 결과는 참고용이며 실제 상환 계획과 다를 수 있습니다.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}