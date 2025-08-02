import { useState } from 'react'
import BankHome from './components/BankHome'
import Transfer from './components/Transfer'
import TransactionHistory from './components/TransactionHistory'

type Screen = 'home' | 'transfer' | 'history'

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home')

  const navigateToHome = () => setCurrentScreen('home')
  const navigateToTransfer = () => setCurrentScreen('transfer')
  const navigateToHistory = () => setCurrentScreen('history')

  switch (currentScreen) {
    case 'home':
      return (
        <BankHome
          onNavigateToTransfer={navigateToTransfer}
          onNavigateToHistory={navigateToHistory}
        />
      )
    case 'transfer':
      return <Transfer onNavigateBack={navigateToHome} />
    case 'history':
      return <TransactionHistory onNavigateBack={navigateToHome} />
    default:
      return (
        <BankHome
          onNavigateToTransfer={navigateToTransfer}
          onNavigateToHistory={navigateToHistory}
        />
      )
  }
}

export default App
