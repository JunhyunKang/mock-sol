import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ArrowLeft,
    FileText,
    Download,
    Eye,
    Calendar,
    Building,
    Shield,
    // CheckCircle,
    // Clock,
    Search,
    Filter,
} from 'lucide-react'

interface LoanDocumentsProps {
    onNavigateBack: () => void
}

interface Document {
    id: string
    title: string
    type: 'contract' | 'statement' | 'certificate' | 'notice'
    loanType: string
    issueDate: string
    status: 'available' | 'processing' | 'expired'
    fileSize: string
}

export default function LoanDocuments({ onNavigateBack }: LoanDocumentsProps) {
    const [documents] = useState<Document[]>([
        {
            id: '1',
            title: '주택담보대출 계약서',
            type: 'contract',
            loanType: '주택담보대출',
            issueDate: '2023-03-15',
            status: 'available',
            fileSize: '2.4MB'
        },
        {
            id: '2',
            title: '대출잔액증명서',
            type: 'certificate',
            loanType: '주택담보대출',
            issueDate: '2025-01-15',
            status: 'available',
            fileSize: '156KB'
        },
        {
            id: '3',
            title: '신용대출 계약서',
            type: 'contract',
            loanType: '신용대출',
            issueDate: '2024-01-10',
            status: 'available',
            fileSize: '1.8MB'
        },
        {
            id: '4',
            title: '2024년 12월 대출명세서',
            type: 'statement',
            loanType: '신용대출',
            issueDate: '2024-12-31',
            status: 'available',
            fileSize: '324KB'
        },
        {
            id: '5',
            title: '금리변동 안내서',
            type: 'notice',
            loanType: '주택담보대출',
            issueDate: '2024-11-20',
            status: 'available',
            fileSize: '512KB'
        },
        {
            id: '6',
            title: '대출이용약관 변경사항',
            type: 'notice',
            loanType: '전체',
            issueDate: '2024-10-15',
            status: 'available',
            fileSize: '892KB'
        }
    ])

    const [filter, setFilter] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`
    }

    const getDocumentIcon = (type: string) => {
        switch (type) {
            case 'contract':
                return <Building className="h-5 w-5 text-blue-600" />
            case 'statement':
                return <FileText className="h-5 w-5 text-green-600" />
            case 'certificate':
                return <Shield className="h-5 w-5 text-purple-600" />
            case 'notice':
                return <Calendar className="h-5 w-5 text-orange-600" />
            default:
                return <FileText className="h-5 w-5 text-gray-600" />
        }
    }

    const getDocumentTypeText = (type: string) => {
        switch (type) {
            case 'contract':
                return '계약서'
            case 'statement':
                return '명세서'
            case 'certificate':
                return '증명서'
            case 'notice':
                return '안내서'
            default:
                return '문서'
        }
    }

    // const getStatusIcon = (status: string) => {
    //     switch (status) {
    //         case 'available':
    //             return <CheckCircle className="h-4 w-4 text-green-600" />
    //         case 'processing':
    //             return <Clock className="h-4 w-4 text-yellow-600" />
    //         case 'expired':
    //             return <Clock className="h-4 w-4 text-red-600" />
    //         default:
    //             return <Clock className="h-4 w-4 text-gray-600" />
    //     }
    // }

    const getStatusText = (status: string) => {
        switch (status) {
            case 'available':
                return '이용가능'
            case 'processing':
                return '처리중'
            case 'expired':
                return '만료됨'
            default:
                return '알 수 없음'
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'available':
                return 'bg-green-100 text-green-800'
            case 'processing':
                return 'bg-yellow-100 text-yellow-800'
            case 'expired':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    const filteredDocuments = documents.filter(doc => {
        const matchesFilter = filter === 'all' || doc.type === filter
        const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.loanType.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const documentCategories = [
        { value: 'all', label: '전체', count: documents.length },
        { value: 'contract', label: '계약서', count: documents.filter(d => d.type === 'contract').length },
        { value: 'statement', label: '명세서', count: documents.filter(d => d.type === 'statement').length },
        { value: 'certificate', label: '증명서', count: documents.filter(d => d.type === 'certificate').length },
        { value: 'notice', label: '안내서', count: documents.filter(d => d.type === 'notice').length },
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
                    <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">대출서류조회</h1>
                    <div className="w-6"></div>
                </div>
            </div>

            <div className="space-y-6 p-4 lg:p-6">
                {/* 검색 */}
                <Card>
                    <CardContent className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="문서명 또는 대출종류로 검색..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* 필터 */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center space-x-2 overflow-x-auto">
                            <Filter className="h-4 w-4 text-gray-500 shrink-0" />
                            {documentCategories.map(category => (
                                <Button
                                    key={category.value}
                                    variant={filter === category.value ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setFilter(category.value)}
                                    className="shrink-0"
                                >
                                    {category.label} ({category.count})
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* 문서 목록 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">
                            대출 관련 서류 ({filteredDocuments.length}건)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {filteredDocuments.length === 0 ? (
                            <div className="text-center py-8">
                                <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-500">검색 조건에 맞는 문서가 없습니다.</p>
                            </div>
                        ) : (
                            filteredDocuments.map(document => (
                                <div
                                    key={document.id}
                                    className="rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-3 flex-1">
                                            <div className="mt-0.5">
                                                {getDocumentIcon(document.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <h3 className="font-medium text-gray-900 truncate">
                                                        {document.title}
                                                    </h3>
                                                    <span className={`px-2 py-1 rounded-full text-xs shrink-0 ${getStatusColor(document.status)}`}>
                            {getStatusText(document.status)}
                          </span>
                                                </div>
                                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span className="flex items-center space-x-1">
                            <span>{getDocumentTypeText(document.type)}</span>
                          </span>
                                                    <span>{document.loanType}</span>
                                                    <span>{formatDate(document.issueDate)}</span>
                                                    <span>{document.fileSize}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 ml-4">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={document.status !== 'available'}
                                                className="text-blue-600 hover:text-blue-700 disabled:text-gray-400"
                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                disabled={document.status !== 'available'}
                                                className="text-green-600 hover:text-green-700 disabled:text-gray-400"
                                            >
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>

                {/* 서류 발급 신청 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">서류 발급 신청</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-auto p-4">
                                <div className="text-center">
                                    <Shield className="mx-auto h-6 w-6 text-purple-600 mb-2" />
                                    <p className="text-sm font-medium">잔액증명서</p>
                                    <p className="text-xs text-gray-500">현재 대출 잔액</p>
                                </div>
                            </Button>
                            <Button variant="outline" className="h-auto p-4">
                                <div className="text-center">
                                    <FileText className="mx-auto h-6 w-6 text-green-600 mb-2" />
                                    <p className="text-sm font-medium">거래내역서</p>
                                    <p className="text-xs text-gray-500">상환 내역</p>
                                </div>
                            </Button>
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                            기타 서류 발급 신청
                        </Button>
                    </CardContent>
                </Card>

                {/* 안내사항 */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg lg:text-xl">이용 안내</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm text-gray-600">
                        <p>• 문서는 PDF 형태로 다운로드됩니다.</p>
                        <p>• 다운로드된 문서는 30일간 보관됩니다.</p>
                        <p>• 증명서 발급에는 1-2일이 소요될 수 있습니다.</p>
                        <p>• 문서 관련 문의는 고객센터(1544-7000)로 연락주세요.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}