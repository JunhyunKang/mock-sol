import { useState, useEffect } from 'react'
import type { TransferData } from '../types/bank'

const initialTransferData: TransferData = {
  accountNumber: '',
  bankName: '',
  recipientName: '',
  amount: '',
  memo: '',
}

interface UseTransferProps {
  prefilledData?: {
    recipient_name?: string
    recipient_account?: string
    recipient_bank?: string
    amount?: number
    currency?: string
    last_transfer_date?: string
    last_transfer_amount?: number
  }
}

export const useTransfer = ({ prefilledData }: UseTransferProps = {}) => {

  // prefilledData가 있으면 초기값에서부터 반영
  const getInitialTransferData = (): TransferData => {
    if (prefilledData && Object.keys(prefilledData).length > 0) {
      console.log('🔧 초기값에 prefilledData 반영')
      return {
        accountNumber: prefilledData.recipient_account || '',
        bankName: prefilledData.recipient_bank || '',
        recipientName: prefilledData.recipient_name || '',
        amount: prefilledData.amount ? prefilledData.amount.toString() : '',
        memo: '',
      }
    }
    return initialTransferData
  }

  const getInitialStep = (): number => {
    if (prefilledData?.recipient_name && prefilledData?.recipient_account && prefilledData?.recipient_bank) {
      console.log('✅ 모든 정보가 있어서 초기 단계를 2로 설정')
      return 2
    }
    return 1
  }

  const [step, setStep] = useState(getInitialStep())
  const [transferData, setTransferData] = useState<TransferData>(getInitialTransferData())
  const [showConfirm, setShowConfirm] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // prefilledData 변경 감지 (혹시 나중에 업데이트되는 경우를 위해)
  useEffect(() => {
    if (prefilledData && Object.keys(prefilledData).length > 0) {
      console.log('🔧 prefilledData 업데이트 감지:', prefilledData)
    }
  }, [prefilledData])

  const updateTransferData = (updates: Partial<TransferData>) => {
    setTransferData(prev => ({ ...prev, ...updates }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      setShowConfirm(true)
    }
  }

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleTransfer = () => {
    setShowConfirm(false)
    setIsComplete(true)

    // 3초 후 초기화
    setTimeout(() => {
      setIsComplete(false)
      setStep(1)
      setTransferData(initialTransferData)
    }, 3000)
  }

  const canProceedStep1 = () => {
    return (
        transferData.bankName &&
        transferData.accountNumber &&
        transferData.recipientName
    )
  }

  const canProceedStep2 = () => {
    return transferData.amount && Number(transferData.amount) > 0
  }

  const formatAmount = (amount: string | number) => {
    return new Intl.NumberFormat('ko-KR').format(Number(amount))
  }

  const setQuickAmount = (amount: string) => {
    updateTransferData({ amount })
  }

  return {
    // State
    step,
    transferData,
    showConfirm,
    isComplete,

    // Actions
    updateTransferData,
    handleNext,
    handlePrevious,
    handleTransfer,
    setShowConfirm,
    setQuickAmount,

    // Validators
    canProceedStep1,
    canProceedStep2,

    // Utils
    formatAmount,
  }
}