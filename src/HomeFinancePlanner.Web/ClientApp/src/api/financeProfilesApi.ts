const BASE_URL = 'https://localhost:50391/api/financeprofiles'

export interface FinanceProfile {
	id: number
	name?: string
	currentSavings: number
	monthlySavingsContribution: number
	annualGrossIncome: number
	monthlyDebtPayments: number
	targetDownPaymentPercent: number
	loanTermYears: number
	annualInterestRate: number
}

export interface CreateFinanceProfileRequest {
	name: string
	currentSavings?: number
	monthlySavingsContribution?: number
	annualGrossIncome?: number
	monthlyDebtPayments?: number
	targetDownPaymentPercent?: number
	loanTermYears?: number
	annualInterestRate?: number
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
