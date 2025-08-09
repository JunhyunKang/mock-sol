// 검색 요청 타입
export interface SearchRequest {
    query: string
    user_id?: string
}

// 검색 응답 타입
export interface SearchResponse {
    // 기본 정보
    success: boolean
    action_type: 'transfer' | 'search' | 'menu' | 'unknown'

    // 화면 이동 정보
    redirect_url: string
    screen_data: Record<string, any>

    // 추가 정보
    confidence?: number
    message?: string
    suggestions?: string[]
}

// 액션 타입별 화면 데이터 타입
export interface TransferScreenData {
    recipient_name: string
    recipient_account: string
    recipient_bank: string
    amount?: number
    currency?: string
    last_transfer_date?: string
    last_transfer_amount?: number
}

export interface SearchScreenData {
    transactions: any[]
    filter: Record<string, any>
    total_count: number
}

export interface MenuScreenData {
    menu_id: string
    menu_title: string
    menu_description: string
    menu_category: string
    alternative_menus?: any[]
}

export interface UnknownScreenData {
    original_query: string
    recent_contacts?: any[]
    popular_menus?: any[]
    help_examples?: string[]
}