export interface Transaction {
  id: string
  type: 'deposit' | 'withdrawal'
  amount: number
  balance: number
  description: string
  bank?: string
  accountNumber?: string
  date: string
  time: string
}

export type SortOrder = 'latest' | 'oldest'
export type TransactionType = 'all' | 'deposit' | 'withdrawal'

export interface TransactionFilter {
  sortOrder: SortOrder
  type: TransactionType
  startDate: string
  endDate: string
}

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    type: 'withdrawal',
    amount: 50000,
    balance: 1450000,
    description: '홍길동',
    bank: '카카오뱅크',
    accountNumber: '3333-01-1234567',
    date: '2024-08-03',
    time: '14:30',
  },
  {
    id: '2',
    type: 'deposit',
    amount: 300000,
    balance: 1500000,
    description: '월급',
    date: '2024-08-01',
    time: '09:00',
  },
  {
    id: '3',
    type: 'withdrawal',
    amount: 25000,
    balance: 1200000,
    description: '김철수',
    bank: '신한은행',
    accountNumber: '110-123-456789',
    date: '2024-07-30',
    time: '16:45',
  },
  {
    id: '4',
    type: 'deposit',
    amount: 100000,
    balance: 1225000,
    description: '용돈',
    date: '2024-07-28',
    time: '12:00',
  },
  {
    id: '5',
    type: 'withdrawal',
    amount: 15000,
    balance: 1125000,
    description: '스타벅스',
    date: '2024-07-25',
    time: '10:30',
  },
  {
    id: '6',
    type: 'withdrawal',
    amount: 80000,
    balance: 1140000,
    description: '이영희',
    bank: '우리은행',
    accountNumber: '1002-123-456789',
    date: '2024-07-23',
    time: '19:20',
  },
  {
    id: '7',
    type: 'deposit',
    amount: 200000,
    balance: 1220000,
    description: '부모님용돈',
    date: '2024-07-20',
    time: '08:15',
  },
  {
    id: '8',
    type: 'withdrawal',
    amount: 35000,
    balance: 1020000,
    description: '마트결제',
    date: '2024-07-18',
    time: '17:50',
  },
  {
    id: '9',
    type: 'deposit',
    amount: 500000,
    balance: 1055000,
    description: '보너스',
    date: '2024-07-15',
    time: '11:30',
  },
  {
    id: '10',
    type: 'withdrawal',
    amount: 120000,
    balance: 555000,
    description: '박민수',
    bank: '하나은행',
    accountNumber: '123-456789-001',
    date: '2024-07-10',
    time: '13:45',
  },
]
