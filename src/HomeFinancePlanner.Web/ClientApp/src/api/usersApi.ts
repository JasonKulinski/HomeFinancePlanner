const BASE_URL = 'https://localhost:50391/api/users'

export interface User {
	id: number
	name: string
}

export interface CreateUserRequest {
	name: string
}

/** POST /api/users */
export async function addUser(name: string): Promise<User> {
	const res = await fetch(BASE_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ name }),
	})
	if (!res.ok) throw new Error(`Failed to add user (${res.status})`)
	return res.json()
}

/** GET /api/users/{id} */
export async function getUser(id: number): Promise<User> {
	const res = await fetch(`${BASE_URL}/${id}`)
	if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`)
	return res.json()
}

/** GET /api/users?name=John */
export async function getUserByName(name: string): Promise<User> {
	const res = await fetch(`${BASE_URL}?name=${encodeURIComponent(name)}`)
	if (!res.ok) throw new Error(`Failed to fetch user (${res.status})`)
	return res.json()
}
