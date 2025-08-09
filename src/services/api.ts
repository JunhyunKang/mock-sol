import type {SearchRequest, SearchResponse} from "@/types/search.ts";

const API_BASE_URL = 'http://localhost:8000/api'

// API 호출 유틸리티 함수
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`)
  }

  return response.json()
}

// 사용자 API
export const userApi = {
  getUserInfo: (userId: string = 'default_user') =>
    apiCall(`/user/info?user_id=${userId}`),
}

// // 거래내역 API
// export const transactionApi = {
//   getTransactions: (params?: {
//     type?: string
//     start_date?: string
//     end_date?: string
//     sort_order?: string
//     limit?: number
//   }) => {
//     const searchParams = new URLSearchParams()
//     if (params) {
//       Object.entries(params).forEach(([key, value]) => {
//         if (value !== undefined) {
//           searchParams.append(key, value.toString())
//         }
//       })
//     }
//     const queryString = searchParams.toString()
//     return apiCall(`/transactions${queryString ? `?${queryString}` : ''}`)
//   },
//   getRecentTransactions: (limit: number = 3) =>
//     apiCall(`/transactions/recent?limit=${limit}`),
//   getTransaction: (id: string) => apiCall(`/transactions/${id}`),
// }
//
// // 송금 API
// export const transferApi = {
//   getRecentContacts: (limit: number = 10) =>
//     apiCall(`/transfer/contacts?limit=${limit}`),
//   findContactByName: (name: string) =>
//     apiCall(`/transfer/contacts/${encodeURIComponent(name)}`),
// }
//
// // 환전 API
// export const exchangeApi = {
//   getExchangeRates: () => apiCall('/exchange/rates'),
//   getExchangeRate: (currencyCode: string) =>
//     apiCall(`/exchange/rates/${currencyCode}`),
// }

// 검색 API
export const searchApi = {
  search: (query: string, userId?: string): Promise<SearchResponse> =>
      apiCall('/search', {
        method: 'POST',
        body: JSON.stringify({
          query,
          user_id: userId || 'default_user',
        } as SearchRequest),
      }),
}