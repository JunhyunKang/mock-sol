import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  ArrowLeft,
  Filter,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  X,
} from 'lucide-react'
import { useTransaction } from '../hooks/useTransaction'
import { useState } from 'react'

interface TransactionHistoryProps {
  onNavigateBack?: () => void
  appliedFilter?: any // 검색에서 전달받은 필터 데이터
}

export default function TransactionHistory({
                                             onNavigateBack,
                                             appliedFilter,
                                           }: TransactionHistoryProps) {
  const {
    transactions,
    filter,
    updateFilter,
    formatAmount,
    formatDate,
    searchApplied,
    resetToDefault,
    getFilterSummary,
  } = useTransaction({ appliedFilter })

  const [showFilter, setShowFilter] = useState(false)

  return (
      <div>
        {/* 헤더 */}
        <div className="border-b bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNavigateBack}
                  className="mr-3"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold lg:text-xl">입출금 내역</h1>
              {searchApplied && (
                  <div className="ml-2 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    검색 결과
                  </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {searchApplied && (
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={resetToDefault}
                      className="flex items-center text-xs"
                  >
                    <X className="mr-1 h-3 w-3" />
                    초기화
                  </Button>
              )}
              <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilter(true)}
                  className="flex items-center"
              >
                <Filter className="mr-1 h-4 w-4" />
                필터
              </Button>
            </div>
          </div>

          {/* 적용된 필터 표시 */}
          {(searchApplied || getFilterSummary()) && (
              <div className="px-4 pb-3">
                <div className="rounded-lg bg-blue-50 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">적용된 조건</p>
                      <p className="text-xs text-blue-700">
                        {getFilterSummary() || '검색 결과'}
                      </p>
                    </div>
                    <div className="text-xs text-blue-600">
                      {transactions.length}건
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>

        {/* 거래 내역 리스트 */}
        <div className="space-y-3 p-4 lg:p-6">
          {transactions.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center lg:p-12">
                  <p className="text-base text-gray-500 lg:text-lg">
                    {searchApplied
                        ? '검색 조건에 맞는 거래 내역이 없습니다.'
                        : '해당 기간에 거래 내역이 없습니다.'
                    }
                  </p>
                  {searchApplied && (
                      <Button
                          variant="outline"
                          onClick={resetToDefault}
                          className="mt-4"
                      >
                        전체 내역 보기
                      </Button>
                  )}
                </CardContent>
              </Card>
          ) : (
              transactions.map(transaction => (
                  <Card
                      key={transaction.id}
                      className="border-l-4 border-l-transparent transition-all hover:border-l-blue-500 hover:shadow-md"
                  >
                    <CardContent className="p-4 lg:p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 lg:space-x-4">
                          <div
                              className={`flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12 ${
                                  transaction.type === 'deposit'
                                      ? 'bg-blue-100 text-blue-600'
                                      : 'bg-red-100 text-red-600'
                              }`}
                          >
                            {transaction.type === 'deposit' ? (
                                <ArrowDownCircle className="h-5 w-5 lg:h-6 lg:w-6" />
                            ) : (
                                <ArrowUpCircle className="h-5 w-5 lg:h-6 lg:w-6" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 lg:text-base">
                              {transaction.description}
                            </p>
                            {transaction.bank && transaction.accountNumber && (
                                <p className="text-xs text-gray-500 lg:text-sm">
                                  {transaction.bank} {transaction.accountNumber}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 lg:text-sm">
                              {formatDate(transaction.date)} {transaction.time}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                              className={`text-sm font-semibold lg:text-base ${
                                  transaction.type === 'deposit'
                                      ? 'text-blue-600'
                                      : 'text-red-600'
                              }`}
                          >
                            {transaction.type === 'deposit' ? '+' : '-'}
                            {formatAmount(transaction.amount)}원
                          </p>
                          <p className="text-xs text-gray-500 lg:text-sm">
                            잔액 {formatAmount(transaction.balance)}원
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))
          )}
        </div>

        {/* 필터 모달 */}
        <Dialog open={showFilter} onOpenChange={setShowFilter}>
          <DialogContent className="mx-auto w-[90%] max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                필터 설정
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              {/* 정렬 순서 */}
              <div>
                <Label className="text-sm font-medium lg:text-base">
                  정렬 순서
                </Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button
                      variant={
                        filter.sortOrder === 'latest' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => updateFilter({ sortOrder: 'latest' })}
                      className="text-sm lg:text-base"
                  >
                    최신순
                  </Button>
                  <Button
                      variant={
                        filter.sortOrder === 'oldest' ? 'default' : 'outline'
                      }
                      size="sm"
                      onClick={() => updateFilter({ sortOrder: 'oldest' })}
                      className="text-sm lg:text-base"
                  >
                    과거순
                  </Button>
                </div>
              </div>

              {/* 거래 유형 */}
              <div>
                <Label className="text-sm font-medium lg:text-base">
                  거래 유형
                </Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <Button
                      variant={filter.type === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFilter({ type: 'all' })}
                      className="text-xs lg:text-sm"
                  >
                    전체
                  </Button>
                  <Button
                      variant={filter.type === 'deposit' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFilter({ type: 'deposit' })}
                      className="text-xs lg:text-sm"
                  >
                    입금
                  </Button>
                  <Button
                      variant={filter.type === 'withdrawal' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => updateFilter({ type: 'withdrawal' })}
                      className="text-xs lg:text-sm"
                  >
                    출금
                  </Button>
                </div>
              </div>

              {/* 조회 기간 */}
              <div>
                <Label className="flex items-center text-sm font-medium lg:text-base">
                  <Calendar className="mr-1 h-4 w-4" />
                  조회 기간
                </Label>
                <div className="mt-2 space-y-3">
                  <div>
                    <Label
                        htmlFor="startDate"
                        className="text-xs text-gray-600 lg:text-sm"
                    >
                      시작일
                    </Label>
                    <Input
                        id="startDate"
                        type="date"
                        value={filter.startDate}
                        onChange={e => updateFilter({ startDate: e.target.value })}
                        className="mt-1"
                    />
                  </div>
                  <div>
                    <Label
                        htmlFor="endDate"
                        className="text-xs text-gray-600 lg:text-sm"
                    >
                      종료일
                    </Label>
                    <Input
                        id="endDate"
                        type="date"
                        value={filter.endDate}
                        onChange={e => updateFilter({ endDate: e.target.value })}
                        className="mt-1"
                    />
                  </div>
                </div>
              </div>

              {/* 빠른 기간 선택 */}
              <div>
                <Label className="text-sm font-medium lg:text-base">
                  빠른 선택
                </Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const today = new Date().toISOString().split('T')[0]
                        const oneWeekAgo = new Date(
                            Date.now() - 7 * 24 * 60 * 60 * 1000,
                        )
                            .toISOString()
                            .split('T')[0]
                        updateFilter({ startDate: oneWeekAgo, endDate: today })
                      }}
                      className="text-xs lg:text-sm"
                  >
                    1주일
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const today = new Date().toISOString().split('T')[0]
                        const oneMonthAgo = new Date(
                            Date.now() - 30 * 24 * 60 * 60 * 1000,
                        )
                            .toISOString()
                            .split('T')[0]
                        updateFilter({ startDate: oneMonthAgo, endDate: today })
                      }}
                      className="text-xs lg:text-sm"
                  >
                    1개월
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const today = new Date().toISOString().split('T')[0]
                        const threeMonthsAgo = new Date(
                            Date.now() - 90 * 24 * 60 * 60 * 1000,
                        )
                            .toISOString()
                            .split('T')[0]
                        updateFilter({ startDate: threeMonthsAgo, endDate: today })
                      }}
                      className="text-xs lg:text-sm"
                  >
                    3개월
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const today = new Date().toISOString().split('T')[0]
                        const sixMonthsAgo = new Date(
                            Date.now() - 180 * 24 * 60 * 60 * 1000,
                        )
                            .toISOString()
                            .split('T')[0]
                        updateFilter({ startDate: sixMonthsAgo, endDate: today })
                      }}
                      className="text-xs lg:text-sm"
                  >
                    6개월
                  </Button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                    variant="outline"
                    onClick={() => setShowFilter(false)}
                    className="flex-1"
                >
                  취소
                </Button>
                <Button
                    onClick={() => setShowFilter(false)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  적용
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}