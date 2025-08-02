import { useState } from 'react'
import BankHome from './components/BankHome'
import Transfer from './components/Transfer'
import TransactionHistory from './components/TransactionHistory'
import Exchange from './components/Exchange'

type Screen = 'home' | 'transfer' | 'history' | 'exchange'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')

  const navigateToHome = () => setCurrentScreen('home')
  const navigateToTransfer = () => setCurrentScreen('transfer')
  const navigateToHistory = () => setCurrentScreen('history')
  const navigateToExchange = () => setCurrentScreen('exchange')

  switch (currentScreen) {
    case 'home':
      return (
        <BankHome
          onNavigateToTransfer={navigateToTransfer}
          onNavigateToHistory={navigateToHistory}
          onNavigateToExchange={navigateToExchange}
        />
      )
    case 'transfer':
      return <Transfer onNavigateBack={navigateToHome} />
    case 'history':
      return <TransactionHistory onNavigateBack={navigateToHome} />
    case 'exchange':
      return <Exchange onNavigateBack={navigateToHome} />
    default:
      return (
        <BankHome
          onNavigateToTransfer={navigateToTransfer}
          onNavigateToHistory={navigateToHistory}
          onNavigateToExchange={navigateToExchange}
        />
      )
  }
}

export default App
