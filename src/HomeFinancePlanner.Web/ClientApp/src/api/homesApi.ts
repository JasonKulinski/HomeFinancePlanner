import { Profile } from '../components/AffordabilityCalculator'

const BASE_URL = 'https://localhost:50391/api/homes'

/** GET /api/homes?zip=04101 */
export async function fetchHomes(zip: string) {
    const res = await fetch(`${BASE_URL}?zip=${encodeURIComponent(zip)}`)
    if (!res.ok) throw new Error(`Failed to load homes (${res.status})`)
    return res.json()
}

/** POST /api/homes/affordability?zip=04101 */
export async function fetchAffordability(zip: string, financeProfile: Profile) {
    const res = await fetch(`${BASE_URL}/affordability?zip=${encodeURIComponent(zip)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(financeProfile),
    })
    if (!res.ok) throw new Error(`Failed to calculate affordability (${res.status})`)
    const jsonResult = await res.json()
    return jsonResult as any[]
}
