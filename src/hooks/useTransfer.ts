import { useState } from 'react'
import type { TransferData } from '../types/bank'

const initialTransferData: TransferData = {
  accountNumber: '',
  bankName: '',
  recipientName: '',
  amount: '',
  memo: '',
}

export const useTransfer = () => {
  const [step, setStep] = useState(1)
  const [transferData, setTransferData] =
    useState<TransferData>(initialTransferData)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

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
