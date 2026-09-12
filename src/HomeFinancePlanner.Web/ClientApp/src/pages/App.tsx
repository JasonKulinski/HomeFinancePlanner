import AffordabilityCalculator from '../components/AffordabilityCalculator'

export default function App() {
    return (
        <main className='page'>
            <header className='page-header'>
                <h1>Ledger</h1>
                <p className='tagline'>Work out what a home in your area actually costs you — to save for, and to keep.</p>
            </header>
            <AffordabilityCalculator />
        </main>
    )
}
