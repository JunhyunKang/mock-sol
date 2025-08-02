import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ArrowLeft, User, CreditCard, Send, Check } from 'lucide-react'
import { useTransfer } from '../hooks/useTransfer'
import { BANKS, QUICK_AMOUNTS } from '../types/bank'

export default function BankTransferApp() {
  const {
    step,
    transferData,
    showConfirm,
    isComplete,
    updateTransferData,
    handleNext,
    handlePrevious,
    handleTransfer,
    setShowConfirm,
    setQuickAmount,
    canProceedStep1,
    canProceedStep2,
    formatAmount,
  } = useTransfer()

  // 완료 화면
  if (isComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <Card className="mx-auto w-full max-w-sm text-center">
          <CardContent className="p-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">송금 완료</h2>
            <p className="mb-4 text-gray-600">
              {transferData.recipientName}님께
              <br />
              {formatAmount(transferData.amount)}원이
              <br />
              성공적으로 송금되었습니다.
            </p>
            <p className="text-sm text-gray-500">거래번호: 2024080212345</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* 헤더 */}
      <div className="border-b bg-white shadow-sm">
        <div className="flex items-center p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrevious}
            className="mr-3"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold">송금</h1>
        </div>

        {/* 진행 단계 */}
        <div className="px-4 pb-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3].map(num => (
              <div key={num} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {num}
                </div>
                {num < 3 && (
                  <div
                    className={`mx-2 h-1 w-12 ${
                      step > num ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>받는분 정보</span>
            <span>송금 금액</span>
            <span>송금 확인</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Step 1: 받는분 정보 */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-blue-600" />
                받는분 정보 입력
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="bankName">은행</Label>
                <select
                  className="mt-1 w-full rounded-lg border p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  value={transferData.bankName}
                  onChange={e =>
                    updateTransferData({ bankName: e.target.value })
                  }
                >
                  <option value="">은행을 선택하세요</option>
                  {BANKS.map(bank => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="accountNumber">계좌번호</Label>
                <Input
                  id="accountNumber"
                  placeholder="계좌번호를 입력하세요"
                  value={transferData.accountNumber}
                  onChange={e =>
                    updateTransferData({ accountNumber: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="recipientName">받는분 성함</Label>
                <Input
                  id="recipientName"
                  placeholder="받는분 성함을 입력하세요"
                  value={transferData.recipientName}
                  onChange={e =>
                    updateTransferData({ recipientName: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!canProceedStep1()}
              >
                다음
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: 송금 금액 */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2 h-5 w-5 text-blue-600" />
                송금 금액 입력
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="amount">송금액</Label>
                <div className="relative mt-1">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={transferData.amount}
                    onChange={e =>
                      updateTransferData({ amount: e.target.value })
                    }
                    className="pr-8 text-right text-xl font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-500">
                    원
                  </span>
                </div>
                {transferData.amount && (
                  <p className="mt-1 text-sm text-gray-600">
                    {formatAmount(transferData.amount)}원
                  </p>
                )}
              </div>

              {/* 빠른 금액 선택 */}
              <div>
                <Label>빠른 선택</Label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {QUICK_AMOUNTS.map(amount => (
                    <Button
                      key={amount}
                      variant="outline"
                      size="sm"
                      onClick={() => setQuickAmount(amount)}
                      className="text-xs"
                    >
                      {formatAmount(amount)}원
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="memo">받는분 통장표시 (선택)</Label>
                <Input
                  id="memo"
                  placeholder="예: 생일축하금"
                  value={transferData.memo}
                  onChange={e => updateTransferData({ memo: e.target.value })}
                  className="mt-1"
                  maxLength={10}
                />
                <p className="mt-1 text-xs text-gray-500">
                  {transferData.memo.length}/10자
                </p>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!canProceedStep2()}
              >
                다음
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: 송금 확인 */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Send className="mr-2 h-5 w-5 text-blue-600" />
                송금 정보 확인
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 rounded-lg bg-gray-50 p-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">받는분</span>
                  <span className="font-medium">
                    {transferData.recipientName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">받는계좌</span>
                  <span className="font-medium">
                    {transferData.bankName} {transferData.accountNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">송금액</span>
                  <span className="text-lg font-bold text-blue-600">
                    {formatAmount(transferData.amount)}원
                  </span>
                </div>
                {transferData.memo && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">받는분통장표시</span>
                    <span className="font-medium">{transferData.memo}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">수수료</span>
                  <span className="font-medium">무료</span>
                </div>
              </div>

              <div className="rounded-lg bg-blue-50 p-4">
                <p className="text-sm text-blue-800">
                  • 송금 후 취소가 불가능합니다.
                  <br />• 받는분 정보를 다시 한 번 확인해 주세요.
                </p>
              </div>

              <Button
                onClick={handleNext}
                className="w-full bg-blue-600 py-3 text-lg hover:bg-blue-700"
              >
                {formatAmount(transferData.amount)}원 송금하기
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* 송금 확인 모달 */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent className="mx-auto w-[90%] max-w-sm">
          <DialogHeader>
            <DialogTitle>송금 확인</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center">
              <span className="font-bold">{transferData.recipientName}</span>
              님께
              <br />
              <span className="text-xl font-bold text-blue-600">
                {formatAmount(transferData.amount)}원
              </span>
              을<br />
              송금하시겠습니까?
            </p>

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                className="flex-1"
              >
                취소
              </Button>
              <Button
                onClick={handleTransfer}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                송금
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
