import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Shield,
  Gift,
  Zap,
  Info,
  ChevronRight,
} from 'lucide-react'

interface CardApplicationProps {
  onNavigateBack: () => void
}

interface CardProduct {
  id: string
  name: string
  description: string
  benefits: string[]
  annualFee: number
  creditLimit: string
  image: string
  popular?: boolean
}

export default function CardApplication({
  onNavigateBack,
}: CardApplicationProps) {
  const [selectedCard, setSelectedCard] = useState<string>('')
  const [step, setStep] = useState<'select' | 'info' | 'confirm'>('select')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    job: '',
    income: '',
    purpose: '',
  })

  const cardProducts: CardProduct[] = [
    {
      id: 'shinhan-check',
      name: '신한 체크카드',
      description: '일상생활에서 편리하게 사용하는 기본 체크카드',
      benefits: ['연회비 없음', '온라인 쇼핑몰 할인', '교통비 할인'],
      annualFee: 0,
      creditLimit: '월 100만원',
      image: '💳',
      popular: true,
    },
    {
      id: 'shinhan-premium',
      name: '신한 프리미엄 체크카드',
      description: '고급 혜택과 서비스를 제공하는 프리미엄 카드',
      benefits: ['공항라운지 이용', '호텔 할인', '골프장 이용'],
      annualFee: 50000,
      creditLimit: '월 300만원',
      image: '💎',
    },
    {
      id: 'shinhan-youth',
      name: '신한 청년 체크카드',
      description: '20-30대를 위한 특별한 혜택이 있는 카드',
      benefits: ['영화관 할인', '카페 할인', '교통비 무료'],
      annualFee: 0,
      creditLimit: '월 50만원',
      image: '🎓',
    },
  ]

  const handleCardSelect = (cardId: string) => {
    setSelectedCard(cardId)
    setStep('info')
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = () => {
    setStep('confirm')
  }

  const handleConfirm = () => {
    // 실제로는 API 호출
    alert('카드 신청이 완료되었습니다!')
    onNavigateBack()
  }

  const selectedCardProduct = cardProducts.find(
    card => card.id === selectedCard,
  )

  if (step === 'info') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* 헤더 */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep('select')}
              className="p-0"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
              신청 정보 입력
            </h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="space-y-6 p-4 lg:p-6">
          {/* 선택된 카드 정보 */}
          {selectedCardProduct && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedCardProduct.image}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedCardProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedCardProduct.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 신청 정보 폼 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">신청자 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  placeholder="홍길동"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">휴대폰 번호</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={e => handleInputChange('phone', e.target.value)}
                  placeholder="010-1234-5678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">주소</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={e => handleInputChange('address', e.target.value)}
                  placeholder="서울시 강남구..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="job">직업</Label>
                <select
                  value={formData.job}
                  onChange={e => handleInputChange('job', e.target.value)}
                  className="mmt-1 w-full rounded-lg border bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">직업을 선택하세요</option>
                  <option value="회사원">회사원</option>
                  <option value="자영업자">자영업자</option>
                  <option value="학생">학생</option>
                  <option value="전문직">전문직</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="income">연소득</Label>
                <select
                  value={formData.income}
                  onChange={e => handleInputChange('income', e.target.value)}
                  className="mmt-1 w-full rounded-lg border bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">연소득을 선택하세요</option>
                  <option value="2000만원 미만">2000만원 미만</option>
                  <option value="2000만원-3000만원">2000만원-3000만원</option>
                  <option value="3000만원-5000만원">3000만원-5000만원</option>
                  <option value="5000만원 이상">5000만원 이상</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="purpose">카드 사용 목적</Label>
                <select
                  value={formData.purpose}
                  onChange={e => handleInputChange('purpose', e.target.value)}
                  className="mmt-1 w-full rounded-lg border bg-white p-3 text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">사용 목적을 선택하세요</option>
                  <option value="일상생활">일상생활</option>
                  <option value="온라인쇼핑">온라인쇼핑</option>
                  <option value="교통비">교통비</option>
                  <option value="레저활동">레저활동</option>
                  <option value="기타">기타</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* 약관 동의 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">약관 동의</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="terms" className="text-sm">
                  [필수] 개인정보 수집·이용 동의
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="marketing"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <Label htmlFor="marketing" className="text-sm">
                  [선택] 마케팅 정보 수신 동의
                </Label>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={!formData.name || !formData.phone}
          >
            신청하기
          </Button>
        </div>
      </div>
    )
  }

  if (step === 'confirm') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* 헤더 */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setStep('info')}
              className="p-0"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
              신청 확인
            </h1>
            <div className="w-6"></div>
          </div>
        </div>

        <div className="space-y-6 p-4 lg:p-6">
          {/* 신청 완료 메시지 */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-600" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                카드 신청이 완료되었습니다!
              </h3>
              <p className="text-sm text-gray-600">
                신청하신 정보를 확인해주세요.
              </p>
            </CardContent>
          </Card>

          {/* 신청 정보 요약 */}
          {selectedCardProduct && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg lg:text-xl">
                  신청 카드 정보
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedCardProduct.image}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {selectedCardProduct.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedCardProduct.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">연회비:</span>
                    <span className="font-medium">
                      {selectedCardProduct.annualFee === 0
                        ? '무료'
                        : `${selectedCardProduct.annualFee.toLocaleString()}원`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">한도:</span>
                    <span className="font-medium">
                      {selectedCardProduct.creditLimit}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 신청자 정보 요약 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg lg:text-xl">신청자 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">이름:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">휴대폰:</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">이메일:</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">직업:</span>
                <span className="font-medium">{formData.job}</span>
              </div>
            </CardContent>
          </Card>

          {/* 처리 안내 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
                <Info className="h-5 w-5 text-blue-600" />
                <span>처리 안내</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-600">
              <p>• 신청 후 3-5일 내에 심사 결과를 SMS로 안내드립니다.</p>
              <p>• 승인 시 카드는 7-10일 내에 발송됩니다.</p>
              <p>• 추가 서류가 필요한 경우 별도 연락드립니다.</p>
              <p>• 문의사항은 고객센터(1544-7000)로 연락주세요.</p>
            </CardContent>
          </Card>

          <Button
            onClick={handleConfirm}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            확인
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
          <h1 className="text-xl font-bold text-gray-900 lg:text-2xl">
            체크카드 신청
          </h1>
          <div className="w-6"></div>
        </div>
      </div>

      <div className="space-y-6 p-4 lg:p-6">
        {/* 카드 상품 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">카드 상품 선택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {cardProducts.map(card => (
              <div
                key={card.id}
                className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-blue-300 ${
                  selectedCard === card.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200'
                }`}
                onClick={() => handleCardSelect(card.id)}
              >
                {card.popular && (
                  <div className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs text-white">
                    인기
                  </div>
                )}
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{card.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{card.name}</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {card.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>
                        연회비:{' '}
                        {card.annualFee === 0
                          ? '무료'
                          : `${card.annualFee.toLocaleString()}원`}
                      </span>
                      <span>한도: {card.creditLimit}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {card.benefits.map((benefit, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 카드 혜택 안내 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg lg:text-xl">카드 혜택</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 rounded-lg bg-yellow-50 p-3">
                <Gift className="h-6 w-6 text-yellow-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">캐시백</p>
                  <p className="text-xs text-gray-600">최대 3%</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rounded-lg bg-green-50 p-3">
                <Zap className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">즉시 발급</p>
                  <p className="text-xs text-gray-600">온라인 발급</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rounded-lg bg-blue-50 p-3">
                <Shield className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">보안</p>
                  <p className="text-xs text-gray-600">3D Secure</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rounded-lg bg-purple-50 p-3">
                <Star className="h-6 w-6 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">포인트</p>
                  <p className="text-xs text-gray-600">최대 1%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 신청 안내 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-lg lg:text-xl">
              <Info className="h-5 w-5 text-blue-600" />
              <span>신청 안내</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• 만 18세 이상 신한은행 고객이신 분만 신청 가능합니다.</p>
            <p>• 신청 시 본인인증이 필요합니다.</p>
            <p>• 연회비는 카드 발급 시점에 차감됩니다.</p>
            <p>• 카드 한도는 신용도에 따라 조정될 수 있습니다.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
