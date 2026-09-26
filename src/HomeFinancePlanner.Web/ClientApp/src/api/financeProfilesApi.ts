const BASE_URL = 'https://localhost:50391/api/financeprofiles'

export interface FinanceProfile {
	id: number
	name?: string
	currentSavings: string
	monthlySavingsContribution: string
	annualGrossIncome: string
	monthlyDebtPayments: string
	targetDownPaymentPercent: string
	loanTermYears: string
	annualInterestRate: string
}

export interface CreateFinanceProfileRequest {
	name: string
	currentSavings?: string
	monthlySavingsContribution?: string
	annualGrossIncome?: string
	monthlyDebtPayments?: string
	targetDownPaymentPercent?: string
	loanTermYears?: string
	annualInterestRate?: string
}

/** POST /api/financeprofiles */
export async function createFinanceProfile(request: CreateFinanceProfileRequest): Promise<FinanceProfile> {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(request),
	})
	if (!res.ok) throw new Error(`Failed to create finance profile (${res.status})`)
	return res.json()
}

/** GET /api/financeprofiles/{id} */
export async function getFinanceProfile(id: number): Promise<FinanceProfile> {
	const res = await fetch(`${BASE_URL}/${id}`)
	if (!res.ok) throw new Error(`Failed to fetch finance profile (${res.status})`)
	return res.json()
}

/** GET /api/financeprofiles?name=John */
export async function getFinanceProfileByName(name: string): Promise<FinanceProfile> {
	const res = await fetch(`${BASE_URL}?name=${encodeURIComponent(name)}`)
	if (!res.ok) throw new Error(`Failed to fetch finance profile (${res.status})`)
	return res.json()
}
