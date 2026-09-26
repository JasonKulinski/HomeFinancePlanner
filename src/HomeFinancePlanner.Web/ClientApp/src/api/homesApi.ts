import { Profile } from '../components/AffordabilityCalculator'
import { House } from '../pages/Map'

const BASE_URL = 'https://localhost:50391/api/maps'

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

export async function fetchHome(id: number) {
    const res = await fetch(`${BASE_URL}/home?id=${encodeURIComponent(id)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error(`Failed to find a home with that id (${res.status})`)
    const jsonResult = await res.json()
    return jsonResult as House
}

export async function doCalculate(userId: number, houseId: number) {
    const res = await fetch(`${BASE_URL}/calculate?homeId=${encodeURIComponent(houseId)}&userId=${encodeURIComponent(userId)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    if (!res.ok) throw new Error(`Failed to calculate with that id (${res.status})`)
    const jsonResult = await res.json()
    return jsonResult as any
}
