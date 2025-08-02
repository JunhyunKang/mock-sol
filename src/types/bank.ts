export interface TransferData {
  accountNumber: string
  bankName: string
  recipientName: string
  amount: string
  memo: string
}

export interface TransferState {
  step: number
  transferData: TransferData
  showConfirm: boolean
  isComplete: boolean
}

export const BANKS = [
  '국민은행',
  '신한은행',
  '우리은행',
  '하나은행',
  '카카오뱅크',
  '토스뱅크',
] as const

export const QUICK_AMOUNTS = [
  '10000',
  '50000',
  '100000',
  '300000',
  '500000',
  '1000000',
] as const
