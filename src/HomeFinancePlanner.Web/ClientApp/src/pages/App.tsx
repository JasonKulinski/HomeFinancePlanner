import { useState } from 'react'
import AffordabilityCalculator from '../components/AffordabilityCalculator'
import CreateFinanceProfilePage from '../components/CreateFinanceProfilePage'

type PageView = 'calculator' | 'create-profile'

export default function App() {
    const [currentPage, setCurrentPage] = useState<PageView>('calculator')

    return (
        <main className='page'>
            <header className='page-header'>
                <h1>Ledger</h1>
                <p className='tagline'>Work out what a home in your area actually costs you — to save for, and to keep.</p>
                <nav className='page-nav'>
                    <button
                        className={`nav-btn ${currentPage === 'calculator' ? 'active' : ''}`}
                        onClick={() => setCurrentPage('calculator')}
                    >
                        Calculator
                    </button>
                    <button
                        className={`nav-btn ${currentPage === 'create-profile' ? 'active' : ''}`}
                        onClick={() => setCurrentPage('create-profile')}
                    >
                        Create Profile
                    </button>
                </nav>
            </header>
            {currentPage === 'calculator' && <AffordabilityCalculator />}
            {currentPage === 'create-profile' && <CreateFinanceProfilePage />}
        </main>
    )
}
