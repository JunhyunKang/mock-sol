import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ArrowLeft,
    Building,
    FileText,
    Calculator,
    ChevronRight,
    Calendar,
    AlertCircle,
    CheckCircle,
    Clock,
    Info,
} from 'lucide-react'

interface LoanProps {
    onNavigateBack: () => void
    onNavigateToDocuments: () => void
    onNavigateToCalculator: () => void
}

interface LoanInfo {
    id: string
    type: string
    amount: number
    balance: number
    interestRate: number
    startDate: string
    endDate: string
    monthlyPayment: number
    nextPaymentDate: string
    status: 'active' | 'completed' | 'overdue'
}

export default function LoanPage({
                                     onNavigateBack,
                                     onNavigateToDocuments,
                                     onNavigateToCalculator
                                 }: LoanProps) {
    const [loans] = useState<LoanInfo[]>([
        {
            id: '1',
            type: '주택담보대출',
            amount: 200000000,
            balance: 150000000,
            interestRate: 3.2,
            startDate: '2023-03-15',
            endDate: '2043-03-15',
            monthlyPayment: 950000,
            nextPaymentDate: '2025-02-15',
            status: 'active'
        },
        {
            id: '2',
            type: '신용대출',
            amount: 30000000,
            balance: 15000000,
            interestRate: 4.8,
            startDate: '2024-01-10',
            endDate: '2027-01-10',
            monthlyPayment: 800000,
            nextPaymentDate: '2025-02-15',
            status: 'active'
        }
    ])

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('ko-KR').format(amount)
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="h-5 w-5 text-green-600" />
            case 'overdue':
                return <AlertCircle className="h-5 w-5 text-red-600" />
            case 'completed':
                return <CheckCircle className="h-5 w-5 text-blue-600" />
            default:
                return <Clock className="h-5 w-5 text-gray-600" />
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'active':
                return '정상'
            case 'overdue':
                return '연체'
            case 'completed':
                return '완료'
            default:
                return '대기'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active':
                return 'bg-green-100 text-green-800'
            case 'overdue':
                return 'bg-red-100 text-red-800'
            case 'completed':
                return 'bg-blue-100 text-blue-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const getTotalLoanAmount = () => {
        return loans.reduce((total, loan) => total + loan.amount, 0)
    }

    const getTotalBalance = () => {
        return loans.reduce((total, loan) => total + loan.balance, 0)
    }

    const getTotalMonthlyPayment = () => {
        return loans.filter(loan => loan.status === 'active')
            .reduce((total, loan) => total + loan.monthlyPayment, 0)
    }

    const loanServices = [
        {
            title: "대출서류조회",
            description: "계약서 및 관련 서류",
            icon: <FileText className="h-6 w-6" />,
            color: "bg-blue-100 text-blue-600",
            onClick: onNavigateToDocuments
        },
        {
            title: "대출이자계산기",
            description: "이자 및 상환액 계산",
            icon: <Calculator className="h-6 w-6" />,
            color: "bg-green-100 text-green-600",
            onClick: onNavigateToCalculator
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
                    <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">대출관리</h1>
                    <div className="w-6"></div>
                </div>
            </div>

            <div className="space-y-6 p-4 lg:p-6">
                {/* 대출 요약 */}
                <Card className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <CardContent className="p-6 lg:p-8">
                        <h2 className="mb-4 text-lg font-semibold lg:text-xl">대출 현황</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-purple-100 lg:text-base">총 대출금액</p>
                                <p className="text-xl font-bold lg:text-2xl">
                                    {formatAmount(getTotalLoanAmount())}원
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-purple-100 lg:text-base">남은 잔액</p>
                                <p className="text-xl font-bold lg:text-2xl">
                                    {formatAmount(getTotalBalance())}원
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-purple-100 lg:text-base">월 상환액</p>
                            <p className="text-lg font-semibold lg:text-xl">
                                {formatAmount(getTotalMonthlyPayment())}원
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* 대출 서비스 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">대출 서비스</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                            {loanServices.map((service, index) => (
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

                {/* 진행중인 대출 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">진행중인 대출</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {loans.map(loan => (
                            <div
                                key={loan.id}
                                className="rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center space-x-3">
                                        <Building className="h-6 w-6 text-purple-600" />
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{loan.type}</h3>
                                            <div className="flex items-center space-x-2 mt-1">
                                                {getStatusIcon(loan.status)}
                                                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(loan.status)}`}>
                          {getStatusText(loan.status)}
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-600">대출금액</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatAmount(loan.amount)}원
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">남은 잔액</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatAmount(loan.balance)}원
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">금리</p>
                                        <p className="font-semibold text-gray-900">
                                            연 {loan.interestRate}%
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-600">월 상환액</p>
                                        <p className="font-semibold text-gray-900">
                                            {formatAmount(loan.monthlyPayment)}원
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-3 pt-3 border-t border-gray-100">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center space-x-1">
                                            <Calendar className="h-4 w-4 text-gray-500" />
                                            <span className="text-gray-600">다음 상환일</span>
                                        </div>
                                        <span className="font-medium text-gray-900">
                      {formatDate(loan.nextPaymentDate)}
                    </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm mt-1">
                                        <span className="text-gray-600">대출기간</span>
                                        <span className="text-gray-900">
                      {formatDate(loan.startDate)} ~ {formatDate(loan.endDate)}
                    </span>
                                    </div>
                                </div>

                                {/* 상환 진행률 */}
                                <div className="mt-3">
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-600">상환 진행률</span>
                                        <span className="text-gray-900">
                      {Math.round(((loan.amount - loan.balance) / loan.amount) * 100)}%
                    </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-purple-600 h-2 rounded-full"
                                            style={{
                                                width: `${((loan.amount - loan.balance) / loan.amount) * 100}%`
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* 대출 신청 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">새로운 대출</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <div className="rounded-lg bg-blue-50 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">대출 한도 조회</p>
                                        <p className="text-xs text-blue-700">나의 대출 가능 금액 확인</p>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-blue-600" />
                                </div>
                            </div>

                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                                대출 신청하기
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* 대출 안내 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                            <Info className="h-5 w-5 text-blue-600" />
                            <span>대출 안내</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                        <p>• 대출 상환일은 매월 15일입니다.</p>
                        <p>• 조기상환 시 별도의 수수료가 부과될 수 있습니다.</p>
                        <p>• 금리는 시장 상황에 따라 변동될 수 있습니다.</p>
                        <p>• 대출 관련 문의는 고객센터(1544-7000)로 연락주세요.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}