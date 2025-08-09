import { useState } from 'react'
import BankHome from './components/BankHome'
import Transfer from './components/Transfer'
import TransactionHistory from './components/TransactionHistory'
import Exchange from './components/Exchange'
import CardApplication from './components/CardApplication'
import LoanPage from './components/LoanPage'
import ExchangeCalculator from './components/ExchangeCalculator'
import ExchangeAlerts from './components/ExchangeAlerts'
import LoanDocuments from './components/LoanDocuments'
import LoanCalculator from './components/LoanCalculator'
import Layout from '@/components/Layout.tsx'

type Screen =
    | 'home'
    | 'transfer'
    | 'history'
    | 'exchange'
    | 'cardApplication'
    | 'loan'
    | 'exchangeCalculator'
    | 'exchangeAlerts'
    | 'loanDocuments'
    | 'loanCalculator'

interface ScreenState {
  screen: Screen
  data?: any // 화면 간 데이터 전달용
}

function App() {
  const [currentState, setCurrentState] = useState<ScreenState>({ screen: 'home' })

  const navigateToHome = () => setCurrentState({ screen: 'home' })
  const navigateToTransfer = (data?: any) => setCurrentState({ screen: 'transfer', data })
  const navigateToHistory = (data?: any) => setCurrentState({ screen: 'history', data })
  const navigateToExchange = () => setCurrentState({ screen: 'exchange' })
  const navigateToCardApplication = () => setCurrentState({ screen: 'cardApplication' })
  const navigateToLoan = () => setCurrentState({ screen: 'loan' })
  const navigateToExchangeCalculator = () => setCurrentState({ screen: 'exchangeCalculator' })
  const navigateToExchangeAlerts = () => setCurrentState({ screen: 'exchangeAlerts' })
  const navigateToLoanDocuments = () => setCurrentState({ screen: 'loanDocuments' })
  const navigateToLoanCalculator = () => setCurrentState({ screen: 'loanCalculator' })

  const renderScreen = () => {
    switch (currentState.screen) {
      case 'home':
        return (
            <BankHome
                onNavigateToTransfer={navigateToTransfer}
                onNavigateToHistory={navigateToHistory}
                onNavigateToExchange={navigateToExchange}
                onNavigateToCardApplication={navigateToCardApplication}
                onNavigateToLoan={navigateToLoan}
                onNavigateToExchangeCalculator={navigateToExchangeCalculator}
                onNavigateToExchangeAlerts={navigateToExchangeAlerts}
                onNavigateToLoanDocuments={navigateToLoanDocuments}
                onNavigateToLoanCalculator={navigateToLoanCalculator}
            />
        )
      case 'transfer':
        return <Transfer onNavigateBack={navigateToHome} prefilledData={currentState.data} />
      case 'history':
        return <TransactionHistory onNavigateBack={navigateToHome} appliedFilter={currentState.data} />
      case 'exchange':
        return (
            <Exchange
                onNavigateBack={navigateToHome}
                onNavigateToCalculator={navigateToExchangeCalculator}
                onNavigateToAlerts={navigateToExchangeAlerts}
            />
        )
      case 'cardApplication':
        return <CardApplication onNavigateBack={navigateToHome} />
      case 'loan':
        return (
            <LoanPage
                onNavigateBack={navigateToHome}
                onNavigateToDocuments={navigateToLoanDocuments}
                onNavigateToCalculator={navigateToLoanCalculator}
            />
        )
      case 'exchangeCalculator':
        return <ExchangeCalculator onNavigateBack={navigateToHome} />
      case 'exchangeAlerts':
        return <ExchangeAlerts onNavigateBack={navigateToHome} />
      case 'loanDocuments':
        return <LoanDocuments onNavigateBack={navigateToHome} />
      case 'loanCalculator':
        return <LoanCalculator onNavigateBack={navigateToHome} />
      default:
        return (
            <BankHome
                onNavigateToTransfer={navigateToTransfer}
                onNavigateToHistory={navigateToHistory}
                onNavigateToExchange={navigateToExchange}
                onNavigateToCardApplication={navigateToCardApplication}
                onNavigateToLoan={navigateToLoan}
                onNavigateToExchangeCalculator={navigateToExchangeCalculator}
                onNavigateToExchangeAlerts={navigateToExchangeAlerts}
                onNavigateToLoanDocuments={navigateToLoanDocuments}
                onNavigateToLoanCalculator={navigateToLoanCalculator}
            />
        )
    }
  }

  return <Layout>{renderScreen()}</Layout>
}

export default App